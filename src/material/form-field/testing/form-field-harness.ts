/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AsyncFactoryFn,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
  HarnessQuery,
  parallel,
  TestElement
} from '@angular/cdk/testing';
import {
  MatDatepickerInputHarness,
  MatDateRangeInputHarness,
} from '@angular/material/datepicker/testing';
import {MatFormFieldControlHarness} from '@angular/material/form-field/testing/control';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {FormFieldHarnessFilters} from './form-field-harness-filters';

// TODO(devversion): support support chip list harness
/** Possible harnesses of controls which can be bound to a form-field. */
export type FormFieldControlHarness =
  MatInputHarness|MatSelectHarness|MatDatepickerInputHarness|MatDateRangeInputHarness;

export abstract class _MatFormFieldHarnessBase<ControlHarness extends MatFormFieldControlHarness>
  extends ComponentHarness {
  protected abstract _prefixContainer: AsyncFactoryFn<TestElement|null>;
  protected abstract _suffixContainer: AsyncFactoryFn<TestElement|null>;
  protected abstract _label: AsyncFactoryFn<TestElement|null>;
  protected abstract _errors: AsyncFactoryFn<TestElement[]>;
  protected abstract _hints: AsyncFactoryFn<TestElement[]>;
  protected abstract _inputControl: AsyncFactoryFn<ControlHarness|null>;
  protected abstract _selectControl: AsyncFactoryFn<ControlHarness|null>;
  protected abstract _datepickerInputControl: AsyncFactoryFn<ControlHarness|null>;
  protected abstract _dateRangeInputControl: AsyncFactoryFn<ControlHarness|null>;

  /** Gets the appearance of the form-field. */
  abstract getAppearance(): Promise<string>;

  /** Whether the label is currently floating. */
  abstract isLabelFloating(): Promise<boolean>;

  /** Whether the form-field has a label. */
  abstract hasLabel(): Promise<boolean>;

  /** Gets the label of the form-field. */
  async getLabel(): Promise<string|null> {
    const labelEl = await this._label();
    return labelEl ? labelEl.text() : null;
  }

  /** Whether the form-field has errors. */
  async hasErrors(): Promise<boolean> {
    return (await this.getTextErrors()).length > 0;
  }

  /** Whether the form-field is disabled. */
  async isDisabled(): Promise<boolean> {
    return (await this.host()).hasClass('mat-form-field-disabled');
  }

  /** Whether the form-field is currently autofilled. */
  async isAutofilled(): Promise<boolean> {
    return (await this.host()).hasClass('mat-form-field-autofilled');
  }

  /**
   * Gets the harness of the control that is bound to the form-field. Only
   * default controls such as "MatInputHarness" and "MatSelectHarness" are
   * supported.
   */
  async getControl(): Promise<ControlHarness|null>;

  /**
   * Gets the harness of the control that is bound to the form-field. Searches
   * for a control that matches the specified harness type.
   */
  async getControl<X extends MatFormFieldControlHarness>(type: ComponentHarnessConstructor<X>):
      Promise<X|null>;

  /**
   * Gets the harness of the control that is bound to the form-field. Searches
   * for a control that matches the specified harness predicate.
   */
  async getControl<X extends MatFormFieldControlHarness>(type: HarnessPredicate<X>):
      Promise<X|null>;

  // Implementation of the "getControl" method overload signatures.
  async getControl<X extends MatFormFieldControlHarness>(type?: HarnessQuery<X>) {
    if (type) {
      return this.locatorForOptional(type)();
    }
    const [select, input, datepickerInput, dateRangeInput] = await parallel(() => [
      this._selectControl(),
      this._inputControl(),
      this._datepickerInputControl(),
      this._dateRangeInputControl()
    ]);

    // Match the datepicker inputs first since they can also have a `MatInput`.
    return datepickerInput || dateRangeInput || select || input;
  }

  /** Gets the theme color of the form-field. */
  async getThemeColor(): Promise<'primary'|'accent'|'warn'> {
    const hostEl = await this.host();
    const [isAccent, isWarn] = await parallel(() => {
      return [hostEl.hasClass('mat-accent'), hostEl.hasClass('mat-warn')];
    });
    if (isAccent) {
      return 'accent';
    } else if (isWarn) {
      return 'warn';
    }
    return 'primary';
  }

  /** Gets error messages which are currently displayed in the form-field. */
  async getTextErrors(): Promise<string[]> {
    const errors = await this._errors();
    return parallel(() => errors.map(e => e.text()));
  }

  /** Gets hint messages which are currently displayed in the form-field. */
  async getTextHints(): Promise<string[]> {
    const hints = await this._hints();
    return parallel(() => hints.map(e => e.text()));
  }

  /**
   * Gets a reference to the container element which contains all projected
   * prefixes of the form-field.
   * @deprecated Use `getPrefixText` instead.
   * @breaking-change 11.0.0
   */
  async getHarnessLoaderForPrefix(): Promise<TestElement|null> {
    return this._prefixContainer();
  }

  /** Gets the text inside the prefix element. */
  async getPrefixText(): Promise<string> {
    const prefix = await this._prefixContainer();
    return prefix ? prefix.text() : '';
  }

  /**
   * Gets a reference to the container element which contains all projected
   * suffixes of the form-field.
   * @deprecated Use `getSuffixText` instead.
   * @breaking-change 11.0.0
   */
  async getHarnessLoaderForSuffix(): Promise<TestElement|null> {
    return this._suffixContainer();
  }

  /** Gets the text inside the suffix element. */
  async getSuffixText(): Promise<string> {
    const suffix = await this._suffixContainer();
    return suffix ? suffix.text() : '';
  }

  /**
   * Whether the form control has been touched. Returns "null"
   * if no form control is set up.
   */
  async isControlTouched(): Promise<boolean|null> {
    if (!await this._hasFormControl()) {
      return null;
    }
    return (await this.host()).hasClass('ng-touched');
  }

  /**
   * Whether the form control is dirty. Returns "null"
   * if no form control is set up.
   */
  async isControlDirty(): Promise<boolean|null> {
    if (!await this._hasFormControl()) {
      return null;
    }
    return (await this.host()).hasClass('ng-dirty');
  }

  /**
   * Whether the form control is valid. Returns "null"
   * if no form control is set up.
   */
  async isControlValid(): Promise<boolean|null> {
    if (!await this._hasFormControl()) {
      return null;
    }
    return (await this.host()).hasClass('ng-valid');
  }

  /**
   * Whether the form control is pending validation. Returns "null"
   * if no form control is set up.
   */
  async isControlPending(): Promise<boolean|null> {
    if (!await this._hasFormControl()) {
      return null;
    }
    return (await this.host()).hasClass('ng-pending');
  }

  /** Checks whether the form-field control has set up a form control. */
  private async _hasFormControl(): Promise<boolean> {
    const hostEl = await this.host();
    // If no form "NgControl" is bound to the form-field control, the form-field
    // is not able to forward any control status classes. Therefore if either the
    // "ng-touched" or "ng-untouched" class is set, we know that it has a form control
    const [isTouched, isUntouched] =
        await parallel(() => [hostEl.hasClass('ng-touched'), hostEl.hasClass('ng-untouched')]);
    return isTouched || isUntouched;
  }
}

/** Harness for interacting with a standard Material form-field's in tests. */
export class MatFormFieldHarness extends _MatFormFieldHarnessBase<FormFieldControlHarness> {
  static hostSelector = '.mat-form-field';

  /**
   * Gets a `HarnessPredicate` that can be used to search for a `MatFormFieldHarness` that meets
   * certain criteria.
   * @param options Options for filtering which form field instances are considered a match.
   * @return a `HarnessPredicate` configured with the given options.
   */
  static with(options: FormFieldHarnessFilters = {}): HarnessPredicate<MatFormFieldHarness> {
    return new HarnessPredicate(MatFormFieldHarness, options)
      .addOption('floatingLabelText', options.floatingLabelText, async (harness, text) =>
          HarnessPredicate.stringMatches(await harness.getLabel(), text))
      .addOption('hasErrors', options.hasErrors, async (harness, hasErrors) =>
          await harness.hasErrors() === hasErrors);
  }

  protected _prefixContainer = this.locatorForOptional('.mat-form-field-prefix');
  protected _suffixContainer = this.locatorForOptional('.mat-form-field-suffix');
  protected _label = this.locatorForOptional('.mat-form-field-label');
  protected _errors = this.locatorForAll('.mat-error');
  protected _hints = this.locatorForAll('mat-hint, .mat-hint');
  protected _inputControl = this.locatorForOptional(MatInputHarness);
  protected _selectControl = this.locatorForOptional(MatSelectHarness);
  protected _datepickerInputControl = this.locatorForOptional(MatDatepickerInputHarness);
  protected _dateRangeInputControl = this.locatorForOptional(MatDateRangeInputHarness);

  /** Gets the appearance of the form-field. */
  async getAppearance(): Promise<'legacy'|'standard'|'fill'|'outline'> {
    const hostClasses = await (await this.host()).getAttribute('class');
    if (hostClasses !== null) {
      const appearanceMatch =
          hostClasses.match(/mat-form-field-appearance-(legacy|standard|fill|outline)(?:$| )/);
      if (appearanceMatch) {
        return appearanceMatch[1] as 'legacy' | 'standard' | 'fill' | 'outline';
      }
    }
    throw Error('Could not determine appearance of form-field.');
  }

  /** Whether the form-field has a label. */
  async hasLabel(): Promise<boolean> {
    return (await this.host()).hasClass('mat-form-field-has-label');
  }

  /** Whether the label is currently floating. */
  async isLabelFloating(): Promise<boolean> {
    const host = await this.host();
    const [hasLabel, shouldFloat] = await parallel(() => [
      this.hasLabel(),
      host.hasClass('mat-form-field-should-float'),
    ]);
    // If there is no label, the label conceptually can never float. The `should-float` class
    // is just always set regardless of whether the label is displayed or not.
    return hasLabel && shouldFloat;
  }
}
