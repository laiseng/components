import {LiveAnnouncer} from '@angular/cdk/a11y';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {
  Component,
  Directive,
  Inject,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {ComponentFixture, fakeAsync, flush, inject, TestBed, tick} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_SNACK_BAR_DATA,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSimpleSnackBar,
  MatSnackBar,
  MatSnackBarConfig, MatSnackBarContainer,
  MatSnackBarModule,
  MatSnackBarRef,
} from './index';
import {Platform} from '@angular/cdk/platform';

describe('MatSnackBar', () => {
  let snackBar: MatSnackBar;
  let liveAnnouncer: LiveAnnouncer;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  let simpleMessage = 'Burritos are here!';
  let simpleActionLabel = 'pickup';

  const announceDelay = 150;
  const animationFrameDelay = 16;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, SnackBarTestModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(inject([MatSnackBar, LiveAnnouncer, OverlayContainer],
      (sb: MatSnackBar, la: LiveAnnouncer, oc: OverlayContainer) => {
        snackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    liveAnnouncer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('should open with content first in the inert region', () => {
    snackBar.open('Snack time!', 'Chew');
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const inertElement = containerElement.querySelector('[aria-hidden]')!;

    expect(inertElement.getAttribute('aria-hidden'))
      .toBe('true', 'Expected the non-live region to be aria-hidden');
    expect(inertElement.textContent).toContain('Snack time!',
        'Expected non-live region to contain the snack bar content');

    const liveElement = containerElement.querySelector('[aria-live]')!;
    expect(liveElement.childNodes.length)
        .toBe(0, 'Expected live region to not contain any content');
  });

  it('should move content to the live region after 150ms', fakeAsync(() => {
    snackBar.open('Snack time!', 'Chew');
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;
    tick(announceDelay);

    expect(liveElement.textContent).toContain('Snack time!',
        'Expected live region to contain the snack bar content');

    const inertElement = containerElement.querySelector('[aria-hidden]')!;
    expect(inertElement).toBeFalsy('Expected non-live region to not contain any content');
    flush();
  }));

  it('should preserve focus when moving content to the live region', fakeAsync(() => {
    snackBar.open('Snack time!', 'Chew');
    viewContainerFixture.detectChanges();
    tick(animationFrameDelay);

    const actionButton = overlayContainerElement
        .querySelector('.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-action')! as HTMLElement;
    actionButton.focus();
    expect(document.activeElement)
        .toBe(actionButton, 'Expected the focus to move to the action button');

    flush();
    expect(document.activeElement)
        .toBe(actionButton, 'Expected the focus to remain on the action button');
  }));

  it('should have aria-live of `assertive` with an `assertive` politeness if no announcement ' +
      'message is provided', () => {
    snackBar.openFromComponent(BurritosNotification,
        {announcementMessage: '', politeness: 'assertive'});

    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('aria-live')).toBe('assertive',
        'Expected snack bar container live region to have aria-live="assertive"');
  });

  it('should have aria-live of `polite` with an `assertive` politeness if an announcement ' +
      'message is provided', () => {
    snackBar.openFromComponent(BurritosNotification,
        {announcementMessage: 'Yay Burritos', politeness: 'assertive'});
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('aria-live'))
        .toBe('polite', 'Expected snack bar container live region to have aria-live="polite"');
  });

  it('should have aria-live of `polite` with a `polite` politeness', () => {
    snackBar.openFromComponent(BurritosNotification, {politeness: 'polite'});
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('aria-live'))
        .toBe('polite', 'Expected snack bar container live region to have aria-live="polite"');
  });

  it('should have aria-live of `off` if the politeness is turned off', () => {
    snackBar.openFromComponent(BurritosNotification, {politeness: 'off'});
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('aria-live'))
        .toBe('off', 'Expected snack bar container live region to have aria-live="off"');
  });

  it('should have role of `alert` with an `assertive` politeness (Firefox only)', () => {
    const platform = TestBed.inject(Platform);
    snackBar.openFromComponent(BurritosNotification, {politeness: 'assertive'});
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('role'))
      .toBe(platform.FIREFOX ? 'alert' : null);
  });

  it('should have role of `status` with an `polite` politeness (Firefox only)', () => {
    const platform = TestBed.inject(Platform);
    snackBar.openFromComponent(BurritosNotification, {politeness: 'polite'});
    viewContainerFixture.detectChanges();

    const containerElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    const liveElement = containerElement.querySelector('[aria-live]')!;

    expect(liveElement.getAttribute('role'))
      .toBe(platform.FIREFOX ? 'status' : null);
  });

  it('should have exactly one MDC label element when opened through simple snack bar', () => {
    let config: MatSnackBarConfig = {viewContainerRef: testViewContainerRef};
    snackBar.open(simpleMessage, simpleActionLabel, config);
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('.mdc-snackbar__label').length).toBe(1);
  });

  it('should open and close a snackbar without a ViewContainerRef', fakeAsync(() => {
    let snackBarRef = snackBar.open('Snack time!', 'Chew');
    viewContainerFixture.detectChanges();

    let messageElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    expect(messageElement.textContent).toContain('Snack time!',
        'Expected snack bar to show a message without a ViewContainerRef');

    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.childNodes.length)
        .toBe(0, 'Expected snack bar to be dismissed without a ViewContainerRef');
  }));

  it('should open a simple message with a button', () => {
    let config: MatSnackBarConfig = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, simpleActionLabel, config);

    viewContainerFixture.detectChanges();

    expect(snackBarRef.instance instanceof MatSimpleSnackBar)
        .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
    expect(snackBarRef.instance.snackBarRef)
        .toBe(snackBarRef,
            'Expected the snack bar reference to be placed in the component instance');

    let messageElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    expect(messageElement.textContent)
        .toContain(simpleMessage, `Expected the snack bar message to be '${simpleMessage}'`);

    let buttonElement = overlayContainerElement.querySelector('button.mat-mdc-button')!;
    expect(buttonElement.tagName)
        .toBe('BUTTON', 'Expected snack bar action label to be a <button>');
    expect((buttonElement.textContent || '').trim())
        .toBe(simpleActionLabel,
            `Expected the snack bar action label to be '${simpleActionLabel}'`);
  });

  it('should open a simple message with no button', () => {
    let config: MatSnackBarConfig = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, undefined, config);

    viewContainerFixture.detectChanges();

    expect(snackBarRef.instance instanceof MatSimpleSnackBar)
        .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
    expect(snackBarRef.instance.snackBarRef)
        .toBe(snackBarRef,
            'Expected the snack bar reference to be placed in the component instance');

    let messageElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    expect(messageElement.textContent)
        .toContain(simpleMessage, `Expected the snack bar message to be '${simpleMessage}'`);
    expect(overlayContainerElement.querySelector('button.mat-mdc-button'))
        .toBeNull('Expected the query selection for action label to be null');
  });

  it('should dismiss the snack bar and remove itself from the view', fakeAsync(() => {
    let config: MatSnackBarConfig = {viewContainerRef: testViewContainerRef};
    let dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');

    let snackBarRef = snackBar.open(simpleMessage, undefined, config);
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount)
        .toBeGreaterThan(0, 'Expected overlay container element to have at least one child');

    snackBarRef.afterDismissed().subscribe({complete: dismissCompleteSpy});

    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();
    const messageElement = overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;
    expect (messageElement.hasAttribute('mat-exit'))
        .toBe(true, 'Expected the snackbar container to have the "exit" attribute upon dismiss');

    flush();

    expect(dismissCompleteSpy).toHaveBeenCalled();
    expect(overlayContainerElement.childElementCount)
        .toBe(0, 'Expected the overlay container element to have no child elements');
  }));


  it('should clear the announcement message if it is the same as main message', fakeAsync(() => {
    spyOn(liveAnnouncer, 'announce');

    snackBar.open(simpleMessage, undefined, {announcementMessage: simpleMessage});
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount)
        .toBe(1, 'Expected the overlay with the default announcement message to be added');

    expect(liveAnnouncer.announce).not.toHaveBeenCalled();
  }));

  it('should be able to specify a custom announcement message', fakeAsync(() => {
    spyOn(liveAnnouncer, 'announce');

    snackBar.open(simpleMessage, '', {
      announcementMessage: 'Custom announcement',
      politeness: 'assertive'
    });
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount)
        .toBe(1, 'Expected the overlay with a custom `announcementMessage` to be added');

    expect(liveAnnouncer.announce).toHaveBeenCalledWith('Custom announcement', 'assertive');
  }));

  it('should be able to get dismissed through the service', fakeAsync(() => {
    snackBar.open(simpleMessage);
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    snackBar.dismiss();
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount).toBe(0);
  }));

  it('should clean itself up when the view container gets destroyed', fakeAsync(() => {
    snackBar.open(simpleMessage, undefined, { viewContainerRef: testViewContainerRef });
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    viewContainerFixture.componentInstance.childComponentExists = false;
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount)
        .toBe(0, 'Expected snack bar to be removed after the view container was destroyed');
  }));

  it('should open a new snackbar after dismissing a previous snackbar', fakeAsync(() => {
    let config: MatSnackBarConfig = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, 'Dismiss', config);

    viewContainerFixture.detectChanges();

    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();

    // Wait for the snackbar dismiss animation to finish.
    flush();
    snackBar.open('Second snackbar');
    viewContainerFixture.detectChanges();

    // Wait for the snackbar open animation to finish.
    flush();
    expect(overlayContainerElement.textContent!.trim()).toBe('Second snackbar');
  }));

  it('should remove past snackbars when opening new snackbars', fakeAsync(() => {
    snackBar.open('First snackbar');
    viewContainerFixture.detectChanges();

    snackBar.open('Second snackbar');
    viewContainerFixture.detectChanges();
    flush();

    snackBar.open('Third snackbar');
    viewContainerFixture.detectChanges();
    flush();

    expect(overlayContainerElement.textContent!.trim()).toBe('Third snackbar');
  }));

  it('should remove snackbar if another is shown while its still animating open', fakeAsync(() => {
    snackBar.open('First snackbar');
    viewContainerFixture.detectChanges();

    snackBar.open('Second snackbar');
    viewContainerFixture.detectChanges();

    flush();
    expect(overlayContainerElement.textContent!.trim()).toBe('Second snackbar');
  }));

  it('should dismiss the snackbar when the action is called, notifying of both action and dismiss',
      fakeAsync(() => {
        const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
        const actionCompleteSpy = jasmine.createSpy('action complete spy');
        const snackBarRef = snackBar.open('Some content', 'Dismiss');
        viewContainerFixture.detectChanges();

        snackBarRef.afterDismissed().subscribe({complete: dismissCompleteSpy});
        snackBarRef.onAction().subscribe({complete: actionCompleteSpy});

        let actionButton =
            overlayContainerElement.querySelector('button.mat-mdc-button') as HTMLButtonElement;
        actionButton.click();
        viewContainerFixture.detectChanges();
        flush();

        expect(dismissCompleteSpy).toHaveBeenCalled();
        expect(actionCompleteSpy).toHaveBeenCalled();
      }));

  it('should allow manually dismissing with an action', fakeAsync(() => {
    const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
    const actionCompleteSpy = jasmine.createSpy('action complete spy');
    const snackBarRef = snackBar.open('Some content');
    viewContainerFixture.detectChanges();

    snackBarRef.afterDismissed().subscribe({complete: dismissCompleteSpy});
    snackBarRef.onAction().subscribe({complete: actionCompleteSpy});

    snackBarRef.dismissWithAction();
    flush();

    expect(dismissCompleteSpy).toHaveBeenCalled();
    expect(actionCompleteSpy).toHaveBeenCalled();
  }));

  it('should indicate in `afterClosed` whether it was dismissed by an action', fakeAsync(() => {
    const dismissSpy = jasmine.createSpy('dismiss spy');
    const snackBarRef = snackBar.open('Some content');
    viewContainerFixture.detectChanges();

    snackBarRef.afterDismissed().subscribe(dismissSpy);
    snackBarRef.dismissWithAction();
    flush();

    expect(dismissSpy).toHaveBeenCalledWith(jasmine.objectContaining({dismissedByAction: true}));
  }));

  it('should complete the onAction stream when not closing via an action', fakeAsync(() => {
    const actionCompleteSpy = jasmine.createSpy('action complete spy');
    const snackBarRef = snackBar.open('Some content');
    viewContainerFixture.detectChanges();

    snackBarRef.onAction().subscribe({complete: actionCompleteSpy});
    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();
    flush();

    expect(actionCompleteSpy).toHaveBeenCalled();
  }));

  it('should dismiss automatically after a specified timeout', fakeAsync(() => {
    let config = new MatSnackBarConfig();
    config.duration = 250;
    let snackBarRef = snackBar.open('content', 'test', config);
    let afterDismissSpy = jasmine.createSpy('after dismiss spy');
    snackBarRef.afterDismissed().subscribe(afterDismissSpy);

    tick(100);
    expect(afterDismissSpy).not.toHaveBeenCalled();

    tick(1000);
    flush();
    expect(afterDismissSpy).toHaveBeenCalled();
  }));

  it('should clear the dismiss timeout when dismissed before timeout expiration', fakeAsync(() => {
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    snackBar.open('content', 'test', config);

    setTimeout(() => snackBar.dismiss(), 500);

    tick(600);
    flush();

    expect(viewContainerFixture.isStable()).toBe(true);
  }));

  it('should clear the dismiss timeout when dismissed with action', fakeAsync(() => {
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    const snackBarRef = snackBar.open('content', 'test', config);

    setTimeout(() => snackBarRef.dismissWithAction(), 500);

    tick(600);
    viewContainerFixture.detectChanges();
    tick();

    expect(viewContainerFixture.isStable()).toBe(true);
  }));

  it('should add extra classes to the container', () => {
    snackBar.open(simpleMessage, simpleActionLabel, { panelClass: ['one', 'two'] });
    viewContainerFixture.detectChanges();

    let containerClasses =
        overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!.classList;

    expect(containerClasses).toContain('one');
    expect(containerClasses).toContain('two');
  });

  it('should set the layout direction', () => {
    snackBar.open(simpleMessage, simpleActionLabel, { direction: 'rtl' });
    viewContainerFixture.detectChanges();

    let pane = overlayContainerElement.querySelector('.cdk-global-overlay-wrapper')!;

    expect(pane.getAttribute('dir')).toBe('rtl', 'Expected the pane to be in RTL mode.');
  });

  it('should be able to override the default config', fakeAsync(() => {
    overlayContainer.ngOnDestroy();
    viewContainerFixture.destroy();

    TestBed
        .resetTestingModule()
        .overrideProvider(MAT_SNACK_BAR_DEFAULT_OPTIONS, {
          deps: [],
          useFactory: () => ({panelClass: 'custom-class'})
        })
        .configureTestingModule({imports: [MatSnackBarModule, NoopAnimationsModule]})
        .compileComponents();

    inject([MatSnackBar, OverlayContainer], (sb: MatSnackBar, oc: OverlayContainer) => {
      snackBar = sb;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    snackBar.open(simpleMessage);
    flush();

    expect(overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!.classList)
        .toContain('custom-class', 'Expected class applied through the defaults to be applied.');
  }));

  it('should dismiss the open snack bar on destroy', fakeAsync(() => {
    const snackBarRef = snackBar.open(simpleMessage);
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    const foundation = (snackBarRef.containerInstance as MatSnackBarContainer)._mdcFoundation;
    spyOn(foundation, 'destroy').and.callThrough();

    snackBar.ngOnDestroy();
    flush();

    expect(overlayContainerElement.childElementCount).toBe(0);
    expect(foundation.destroy).toHaveBeenCalled();
  }));

  it('should cap the timeout to the maximum accepted delay in setTimeout', fakeAsync(() => {
    snackBar.open('content', 'test', {duration: Infinity});
    viewContainerFixture.detectChanges();
    tick(100);
    spyOn(window, 'setTimeout').and.callThrough();
    tick(100);

    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), Math.pow(2, 31) - 1);

    flush();
  }));

  describe('with custom component', () => {
    it('should open a custom component', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification);

      expect(snackBarRef.instance instanceof BurritosNotification)
          .toBe(true, 'Expected the snack bar content component to be BurritosNotification');
      expect(overlayContainerElement.textContent!.trim())
          .toBe('Burritos are on the way.', 'Expected component to have the proper text.');
    });

    it('should inject the snack bar reference into the component', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification);

      expect(snackBarRef.instance.snackBarRef)
          .toBe(snackBarRef, 'Expected component to have an injected snack bar reference.');
    });

    it('should have exactly one MDC label element', () => {
      snackBar.openFromComponent(BurritosNotification);
      viewContainerFixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.mdc-snackbar__label').length).toBe(1);
    });

    it('should be able to inject arbitrary user data', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification, {
        data: {
          burritoType: 'Chimichanga'
        }
      });

      expect(snackBarRef.instance.data).toBeTruthy('Expected component to have a data object.');
      expect(snackBarRef.instance.data.burritoType)
          .toBe('Chimichanga',
              'Expected the injected data object to be the one the user provided.');
    });

    it('should allow manually dismissing with an action', fakeAsync(() => {
      const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
      const actionCompleteSpy = jasmine.createSpy('action complete spy');
      const snackBarRef = snackBar.openFromComponent(BurritosNotification);
      viewContainerFixture.detectChanges();

      snackBarRef.afterDismissed().subscribe({complete: dismissCompleteSpy});
      snackBarRef.onAction().subscribe({complete: actionCompleteSpy});

      snackBarRef.dismissWithAction();
      flush();

      expect(dismissCompleteSpy).toHaveBeenCalled();
      expect(actionCompleteSpy).toHaveBeenCalled();
    }));

  });

  describe('with TemplateRef', () => {
    let templateFixture: ComponentFixture<ComponentWithTemplateRef>;

    beforeEach(() => {
      templateFixture = TestBed.createComponent(ComponentWithTemplateRef);
      templateFixture.detectChanges();
    });

    it('should be able to open a snack bar using a TemplateRef', () => {
      templateFixture.componentInstance.localValue = 'Pizza';
      snackBar.openFromTemplate(templateFixture.componentInstance.templateRef);
      templateFixture.detectChanges();

      const containerElement =
          overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;

      expect(containerElement.textContent).toContain('Fries');
      expect(containerElement.textContent).toContain('Pizza');

      templateFixture.componentInstance.localValue = 'Pasta';
      templateFixture.detectChanges();

      expect(containerElement.textContent).toContain('Pasta');
    });

    it('should be able to pass in contextual data when opening with a TemplateRef', () => {
      snackBar.openFromTemplate(templateFixture.componentInstance.templateRef, {
        data: {value: 'Oranges'}
      });
      templateFixture.detectChanges();

      const containerElement =
          overlayContainerElement.querySelector('mat-mdc-snack-bar-container')!;

      expect(containerElement.textContent).toContain('Oranges');
    });

  });

});

describe('MatSnackBar with parent MatSnackBar', () => {
  let parentSnackBar: MatSnackBar;
  let childSnackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<ComponentThatProvidesMatSnackBar>;
  let liveAnnouncer: LiveAnnouncer;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, SnackBarTestModule, NoopAnimationsModule],
      declarations: [ComponentThatProvidesMatSnackBar],
    }).compileComponents();
  }));

  beforeEach(inject([MatSnackBar, LiveAnnouncer, OverlayContainer],
      (sb: MatSnackBar, la: LiveAnnouncer, oc: OverlayContainer) => {
        parentSnackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();

        fixture = TestBed.createComponent(ComponentThatProvidesMatSnackBar);
        childSnackBar = fixture.componentInstance.snackBar;
        fixture.detectChanges();
      }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    liveAnnouncer.ngOnDestroy();
  });

  it('should close snackBars opened by parent when opening from child', fakeAsync(() => {
    parentSnackBar.open('Pizza');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a snackBar to be opened');

    childSnackBar.open('Taco');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Taco', 'Expected parent snackbar msg to be dismissed by opening from child');
  }));

  it('should close snackBars opened by child when opening from parent', fakeAsync(() => {
    childSnackBar.open('Pizza');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a snackBar to be opened');

    parentSnackBar.open('Taco');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Taco', 'Expected child snackbar msg to be dismissed by opening from parent');
  }));

  it('should not dismiss parent snack bar if child is destroyed', fakeAsync(() => {
    parentSnackBar.open('Pizza');
    fixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    childSnackBar.ngOnDestroy();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
  }));
});

describe('MatSnackBar Positioning', () => {
  let snackBar: MatSnackBar;
  let liveAnnouncer: LiveAnnouncer;
  let overlayContainer: OverlayContainer;
  let overlayContainerEl: HTMLElement;

  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  let simpleMessage = 'Burritos are here!';
  let simpleActionLabel = 'pickup';

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, SnackBarTestModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(inject([MatSnackBar, LiveAnnouncer, OverlayContainer],
      (sb: MatSnackBar, la: LiveAnnouncer, oc: OverlayContainer) => {
        snackBar = sb;
        liveAnnouncer = la;
        overlayContainer = oc;
        overlayContainerEl = oc.getContainerElement();
      }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    liveAnnouncer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);
    viewContainerFixture.detectChanges();
  });

  it('should default to bottom center', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel);

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
    expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should be in the bottom left corner', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
    expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
  }));

  it('should be in the bottom right corner', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
    expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
    expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should be in the bottom center', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('0px', 'Expected margin-bottom to be "0px"');
    expect(overlayPaneEl.style.marginTop).toBe('', 'Expected margin-top to be ""');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should be in the top left corner', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'left'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
  }));

  it('should be in the top right corner', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should be in the top center', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should handle start based on direction (rtl)', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'start',
      direction: 'rtl',
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

  it('should handle start based on direction (ltr)', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'start',
      direction: 'ltr',
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
  }));

  it('should handle end based on direction (rtl)', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      direction: 'rtl',
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('', 'Expected margin-right to be ""');
    expect(overlayPaneEl.style.marginLeft).toBe('0px', 'Expected margin-left  to be "0px"');
  }));

  it('should handle end based on direction (ltr)', fakeAsync(() => {
    snackBar.open(simpleMessage, simpleActionLabel, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      direction: 'ltr',
    });

    viewContainerFixture.detectChanges();
    flush();

    const overlayPaneEl = overlayContainerEl.querySelector('.cdk-overlay-pane') as HTMLElement;
    expect(overlayPaneEl.style.marginBottom).toBe('', 'Expected margin-bottom to be ""');
    expect(overlayPaneEl.style.marginTop).toBe('0px', 'Expected margin-top to be "0px"');
    expect(overlayPaneEl.style.marginRight).toBe('0px', 'Expected margin-right to be "0px"');
    expect(overlayPaneEl.style.marginLeft).toBe('', 'Expected margin-left  to be ""');
  }));

});


@Directive({selector: 'dir-with-view-container'})
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container *ngIf="childComponentExists"></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  childComponentExists: boolean = true;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  selector: 'arbitrary-component-with-template-ref',
  template: `
    <ng-template let-data>
      Fries {{localValue}} {{data?.value}}
    </ng-template>
  `,
})
class ComponentWithTemplateRef {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  localValue: string;
}

/** Simple component for testing ComponentPortal. */
@Component({template: '<p>Burritos are on the way.</p>'})
class BurritosNotification {
  constructor(
      public snackBarRef: MatSnackBarRef<BurritosNotification>,
      @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}

@Component({
  template: '',
  providers: [MatSnackBar]
})
class ComponentThatProvidesMatSnackBar {
  constructor(public snackBar: MatSnackBar) {}
}

/**
 * Simple component to open snack bars from.
 * Create a real (non-test) NgModule as a workaround forRoot
 * https://github.com/angular/angular/issues/10760
 */
const TEST_DIRECTIVES = [ComponentWithChildViewContainer,
  BurritosNotification,
  DirectiveWithViewContainer,
  ComponentWithTemplateRef];
@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [ComponentWithChildViewContainer, BurritosNotification],
})
class SnackBarTestModule { }
