export declare function _closeDialogVia<R>(ref: MatDialogRef<R>, interactionType: FocusOrigin, result?: R): void;

export declare abstract class _MatDialogBase<C extends _MatDialogContainerBase> implements OnDestroy {
    readonly afterAllClosed: Observable<void>;
    get afterOpened(): Subject<MatDialogRef<any>>;
    get openDialogs(): MatDialogRef<any>[];
    constructor(_overlay: Overlay, _injector: Injector, _defaultOptions: MatDialogConfig | undefined, _parentDialog: _MatDialogBase<C> | undefined, _overlayContainer: OverlayContainer, scrollStrategy: any, _dialogRefConstructor: Type<MatDialogRef<any>>, _dialogContainerType: Type<C>, _dialogDataToken: InjectionToken<any>);
    _getAfterAllClosed(): Subject<void>;
    closeAll(): void;
    getDialogById(id: string): MatDialogRef<any> | undefined;
    ngOnDestroy(): void;
    open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
    open<T, D = any, R = any>(template: TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
    open<T, D = any, R = any>(template: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<_MatDialogBase<any>, never, never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<_MatDialogBase<any>, never>;
}

export declare abstract class _MatDialogContainerBase extends BasePortalOutlet {
    _animationStateChanged: EventEmitter<DialogAnimationEvent>;
    _ariaLabelledBy: string | null;
    protected _changeDetectorRef: ChangeDetectorRef;
    _closeInteractionType: FocusOrigin | null;
    _config: MatDialogConfig;
    protected _document: Document;
    protected _elementRef: ElementRef;
    protected _focusTrapFactory: FocusTrapFactory;
    _id: string;
    _portalOutlet: CdkPortalOutlet;
    attachDomPortal: (portal: DomPortal) => void;
    constructor(_elementRef: ElementRef, _focusTrapFactory: FocusTrapFactory, _changeDetectorRef: ChangeDetectorRef, _document: any,
    _config: MatDialogConfig, _focusMonitor?: FocusMonitor | undefined);
    _initializeWithAttachedContent(): void;
    _recaptureFocus(): void;
    protected _restoreFocus(): void;
    abstract _startExitAnimation(): void;
    protected _trapFocus(): void;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<_MatDialogContainerBase, never, never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<_MatDialogContainerBase, [null, null, null, { optional: true; }, null, null]>;
}

export interface DialogPosition {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
}

export declare type DialogRole = 'dialog' | 'alertdialog';

export declare const MAT_DIALOG_DATA: InjectionToken<any>;

export declare const MAT_DIALOG_DEFAULT_OPTIONS: InjectionToken<MatDialogConfig<any>>;

export declare const MAT_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;

export declare function MAT_DIALOG_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;

export declare const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
};

export declare function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy;

export declare class MatDialog extends _MatDialogBase<MatDialogContainer> {
    constructor(overlay: Overlay, injector: Injector,
    location: Location, defaultOptions: MatDialogConfig, scrollStrategy: any, parentDialog: MatDialog, overlayContainer: OverlayContainer);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialog, [null, null, { optional: true; }, { optional: true; }, null, { optional: true; skipSelf: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatDialog>;
}

export declare class MatDialogActions {
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogActions, "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogActions, never>;
}

export declare const matDialogAnimations: {
    readonly dialogContainer: AnimationTriggerMetadata;
};

export declare class MatDialogClose implements OnInit, OnChanges {
    _matDialogClose: any;
    ariaLabel: string;
    dialogRef: MatDialogRef<any>;
    dialogResult: any;
    type: 'submit' | 'button' | 'reset';
    constructor(dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    _onButtonClick(event: MouseEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogClose, "[mat-dialog-close], [matDialogClose]", ["matDialogClose"], { "ariaLabel": "aria-label"; "type": "type"; "dialogResult": "mat-dialog-close"; "_matDialogClose": "matDialogClose"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogClose, [{ optional: true; }, null, null]>;
}

export declare class MatDialogConfig<D = any> {
    ariaDescribedBy?: string | null;
    ariaLabel?: string | null;
    ariaLabelledBy?: string | null;
    autoFocus?: boolean;
    backdropClass?: string | string[];
    closeOnNavigation?: boolean;
    componentFactoryResolver?: ComponentFactoryResolver;
    data?: D | null;
    direction?: Direction;
    disableClose?: boolean;
    hasBackdrop?: boolean;
    height?: string;
    id?: string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    panelClass?: string | string[];
    position?: DialogPosition;
    restoreFocus?: boolean;
    role?: DialogRole;
    scrollStrategy?: ScrollStrategy;
    viewContainerRef?: ViewContainerRef;
    width?: string;
}

export declare class MatDialogContainer extends _MatDialogContainerBase {
    _state: 'void' | 'enter' | 'exit';
    _onAnimationDone({ toState, totalTime }: AnimationEvent): void;
    _onAnimationStart({ toState, totalTime }: AnimationEvent): void;
    _startExitAnimation(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatDialogContainer, "mat-dialog-container", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogContainer, never>;
}

export declare class MatDialogContent {
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogContent, "[mat-dialog-content], mat-dialog-content, [matDialogContent]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogContent, never>;
}

export declare class MatDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatDialogModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatDialogModule, [typeof i1.MatDialogContainer, typeof i2.MatDialogClose, typeof i2.MatDialogTitle, typeof i2.MatDialogActions, typeof i2.MatDialogContent], [typeof i3.OverlayModule, typeof i4.PortalModule, typeof i5.MatCommonModule], [typeof i1.MatDialogContainer, typeof i2.MatDialogClose, typeof i2.MatDialogTitle, typeof i2.MatDialogContent, typeof i2.MatDialogActions, typeof i5.MatCommonModule]>;
}

export declare class MatDialogRef<T, R = any> {
    _containerInstance: _MatDialogContainerBase;
    componentInstance: T;
    disableClose: boolean | undefined;
    readonly id: string;
    constructor(_overlayRef: OverlayRef, _containerInstance: _MatDialogContainerBase, id?: string);
    addPanelClass(classes: string | string[]): this;
    afterClosed(): Observable<R | undefined>;
    afterOpened(): Observable<void>;
    backdropClick(): Observable<MouseEvent>;
    beforeClosed(): Observable<R | undefined>;
    close(dialogResult?: R): void;
    getState(): MatDialogState;
    keydownEvents(): Observable<KeyboardEvent>;
    removePanelClass(classes: string | string[]): this;
    updatePosition(position?: DialogPosition): this;
    updateSize(width?: string, height?: string): this;
}

export declare const enum MatDialogState {
    OPEN = 0,
    CLOSING = 1,
    CLOSED = 2
}

export declare class MatDialogTitle implements OnInit {
    id: string;
    constructor(_dialogRef: MatDialogRef<any>, _elementRef: ElementRef<HTMLElement>, _dialog: MatDialog);
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatDialogTitle, "[mat-dialog-title], [matDialogTitle]", ["matDialogTitle"], { "id": "id"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatDialogTitle, [{ optional: true; }, null, null]>;
}

export declare function throwMatDialogContentAlreadyAttachedError(): void;
