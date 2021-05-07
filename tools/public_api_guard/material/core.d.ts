export declare function _countGroupLabelsBeforeOption(optionIndex: number, options: QueryList<MatOption>, optionGroups: QueryList<MatOptgroup>): number;

export declare function _getOptionScrollPosition(optionOffset: number, optionHeight: number, currentScrollPosition: number, panelHeight: number): number;

export declare class _MatOptgroupBase extends _MatOptgroupMixinBase implements CanDisable {
    _inert: boolean;
    _labelId: string;
    label: string;
    constructor(parent?: MatOptionParentComponent);
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵdir: i0.ɵɵDirectiveDeclaration<_MatOptgroupBase, never, never, { "label": "label"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<_MatOptgroupBase, [{ optional: true; }]>;
}

export declare class _MatOptionBase implements FocusableOption, AfterViewChecked, OnDestroy {
    readonly _stateChanges: Subject<void>;
    get active(): boolean;
    get disableRipple(): boolean | undefined;
    get disabled(): any;
    set disabled(value: any);
    readonly group: _MatOptgroupBase;
    id: string;
    get multiple(): boolean | undefined;
    readonly onSelectionChange: EventEmitter<MatOptionSelectionChange>;
    get selected(): boolean;
    value: any;
    get viewValue(): string;
    constructor(_element: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _parent: MatOptionParentComponent, group: _MatOptgroupBase);
    _getAriaSelected(): boolean | null;
    _getHostElement(): HTMLElement;
    _getTabIndex(): string;
    _handleKeydown(event: KeyboardEvent): void;
    _selectViaInteraction(): void;
    deselect(): void;
    focus(_origin?: FocusOrigin, options?: FocusOptions): void;
    getLabel(): string;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    select(): void;
    setActiveStyles(): void;
    setInactiveStyles(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵdir: i0.ɵɵDirectiveDeclaration<_MatOptionBase, never, never, { "value": "value"; "id": "id"; "disabled": "disabled"; }, { "onSelectionChange": "onSelectionChange"; }, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<_MatOptionBase, never>;
}

export declare class AnimationCurves {
    static ACCELERATION_CURVE: string;
    static DECELERATION_CURVE: string;
    static SHARP_CURVE: string;
    static STANDARD_CURVE: string;
}

export declare class AnimationDurations {
    static COMPLEX: string;
    static ENTERING: string;
    static EXITING: string;
}

export interface CanColor {
    color: ThemePalette;
    defaultColor: ThemePalette | undefined;
}

export declare type CanColorCtor = Constructor<CanColor> & AbstractConstructor<CanColor>;

export interface CanDisable {
    disabled: boolean;
}

export declare type CanDisableCtor = Constructor<CanDisable> & AbstractConstructor<CanDisable>;

export interface CanDisableRipple {
    disableRipple: boolean;
}

export declare type CanDisableRippleCtor = Constructor<CanDisableRipple> & AbstractConstructor<CanDisableRipple>;

export interface CanUpdateErrorState {
    errorState: boolean;
    errorStateMatcher: ErrorStateMatcher;
    readonly stateChanges: Subject<void>;
    updateErrorState(): void;
}

export declare type CanUpdateErrorStateCtor = Constructor<CanUpdateErrorState> & AbstractConstructor<CanUpdateErrorState>;

export declare abstract class DateAdapter<D> {
    protected readonly _localeChanges: Subject<void>;
    protected locale: any;
    readonly localeChanges: Observable<void>;
    abstract addCalendarDays(date: D, days: number): D;
    abstract addCalendarMonths(date: D, months: number): D;
    abstract addCalendarYears(date: D, years: number): D;
    clampDate(date: D, min?: D | null, max?: D | null): D;
    abstract clone(date: D): D;
    compareDate(first: D, second: D): number;
    abstract createDate(year: number, month: number, date: number): D;
    deserialize(value: any): D | null;
    abstract format(date: D, displayFormat: any): string;
    abstract getDate(date: D): number;
    abstract getDateNames(): string[];
    abstract getDayOfWeek(date: D): number;
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    abstract getFirstDayOfWeek(): number;
    abstract getMonth(date: D): number;
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    abstract getNumDaysInMonth(date: D): number;
    getValidDateOrNull(obj: unknown): D | null;
    abstract getYear(date: D): number;
    abstract getYearName(date: D): string;
    abstract invalid(): D;
    abstract isDateInstance(obj: any): boolean;
    abstract isValid(date: D): boolean;
    abstract parse(value: any, parseFormat: any): D | null;
    sameDate(first: D | null, second: D | null): boolean;
    setLocale(locale: any): void;
    abstract toIso8601(date: D): string;
    abstract today(): D;
}

export declare const defaultRippleAnimationConfig: {
    enterDuration: number;
    exitDuration: number;
};

export declare class ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorStateMatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorStateMatcher>;
}

export interface GranularSanityChecks {
    doctype: boolean;
    theme: boolean;
    version: boolean;
}

export interface HasInitialized {
    _markInitialized: () => void;
    initialized: Observable<void>;
}

export declare type HasInitializedCtor = Constructor<HasInitialized>;

export interface HasTabIndex {
    defaultTabIndex: number;
    tabIndex: number;
}

export declare type HasTabIndexCtor = Constructor<HasTabIndex> & AbstractConstructor<HasTabIndex>;

export declare const MAT_DATE_FORMATS: InjectionToken<MatDateFormats>;

export declare const MAT_DATE_LOCALE: InjectionToken<string>;

export declare function MAT_DATE_LOCALE_FACTORY(): string;

export declare const MAT_NATIVE_DATE_FORMATS: MatDateFormats;

export declare const MAT_OPTGROUP: InjectionToken<MatOptgroup>;

export declare const MAT_OPTION_PARENT_COMPONENT: InjectionToken<MatOptionParentComponent>;

export declare const MAT_RIPPLE_GLOBAL_OPTIONS: InjectionToken<RippleGlobalOptions>;

export declare class MatCommonModule {
    protected _document: Document;
    constructor(highContrastModeDetector: HighContrastModeDetector, sanityChecks: any, document: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatCommonModule, [null, { optional: true; }, null]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatCommonModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatCommonModule, never, [typeof i1.BidiModule], [typeof i1.BidiModule]>;
}

export declare type MatDateFormats = {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthLabel?: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
};

export declare const MATERIAL_SANITY_CHECKS: InjectionToken<SanityChecks>;

export declare class MatLine {
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatLine, "[mat-line], [matLine]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatLine, never>;
}

export declare class MatLineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatLineModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatLineModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatLineModule, [typeof MatLine], [typeof i1.MatCommonModule], [typeof MatLine, typeof i1.MatCommonModule]>;
}

export declare class MatNativeDateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatNativeDateModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatNativeDateModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatNativeDateModule, never, [typeof NativeDateModule], never>;
}

export declare class MatOptgroup extends _MatOptgroupBase {
    static ɵcmp: i0.ɵɵComponentDeclaration<MatOptgroup, "mat-optgroup", ["matOptgroup"], { "disabled": "disabled"; }, {}, never, ["*", "mat-option, ng-container"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatOptgroup, never>;
}

export declare class MatOption extends _MatOptionBase {
    constructor(element: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, parent: MatOptionParentComponent, group: MatOptgroup);
    static ɵcmp: i0.ɵɵComponentDeclaration<MatOption, "mat-option", ["matOption"], {}, {}, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatOption, [null, null, { optional: true; }, { optional: true; }]>;
}

export declare class MatOptionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatOptionModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatOptionModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatOptionModule, [typeof i1.MatOption, typeof i2.MatOptgroup], [typeof i3.MatRippleModule, typeof i4.CommonModule, typeof i5.MatCommonModule, typeof i6.MatPseudoCheckboxModule], [typeof i1.MatOption, typeof i2.MatOptgroup]>;
}

export interface MatOptionParentComponent {
    disableRipple?: boolean;
    inertGroups?: boolean;
    multiple?: boolean;
}

export declare class MatOptionSelectionChange {
    isUserInput: boolean;
    source: _MatOptionBase;
    constructor(
    source: _MatOptionBase,
    isUserInput?: boolean);
}

export declare class MatPseudoCheckbox {
    _animationMode?: string | undefined;
    disabled: boolean;
    state: MatPseudoCheckboxState;
    constructor(_animationMode?: string | undefined);
    static ɵcmp: i0.ɵɵComponentDeclaration<MatPseudoCheckbox, "mat-pseudo-checkbox", never, { "state": "state"; "disabled": "disabled"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPseudoCheckbox, [{ optional: true; }]>;
}

export declare class MatPseudoCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatPseudoCheckboxModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatPseudoCheckboxModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatPseudoCheckboxModule, [typeof i1.MatPseudoCheckbox], [typeof i2.MatCommonModule], [typeof i1.MatPseudoCheckbox]>;
}

export declare type MatPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';

export declare class MatRipple implements OnInit, OnDestroy, RippleTarget {
    animation: RippleAnimationConfig;
    centered: boolean;
    color: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    radius: number;
    get rippleConfig(): RippleConfig;
    get rippleDisabled(): boolean;
    get trigger(): HTMLElement;
    set trigger(trigger: HTMLElement);
    unbounded: boolean;
    constructor(_elementRef: ElementRef<HTMLElement>, ngZone: NgZone, platform: Platform, globalOptions?: RippleGlobalOptions, _animationMode?: string | undefined);
    fadeOutAll(): void;
    fadeOutAllNonPersistent(): void;
    launch(config: RippleConfig): RippleRef;
    launch(x: number, y: number, config?: RippleConfig): RippleRef;
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatRipple, "[mat-ripple], [matRipple]", ["matRipple"], { "color": "matRippleColor"; "unbounded": "matRippleUnbounded"; "centered": "matRippleCentered"; "radius": "matRippleRadius"; "animation": "matRippleAnimation"; "disabled": "matRippleDisabled"; "trigger": "matRippleTrigger"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRipple, [null, null, null, { optional: true; }, { optional: true; }]>;
}

export declare class MatRippleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatRippleModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatRippleModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatRippleModule, [typeof i1.MatRipple], [typeof i2.MatCommonModule, typeof i3.PlatformModule], [typeof i1.MatRipple, typeof i2.MatCommonModule]>;
}

export declare function mixinColor<T extends AbstractConstructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): CanColorCtor & T;

export declare function mixinDisabled<T extends AbstractConstructor<{}>>(base: T): CanDisableCtor & T;

export declare function mixinDisableRipple<T extends AbstractConstructor<{}>>(base: T): CanDisableRippleCtor & T;

export declare function mixinErrorState<T extends AbstractConstructor<HasErrorState>>(base: T): CanUpdateErrorStateCtor & T;

export declare function mixinInitialized<T extends Constructor<{}>>(base: T): HasInitializedCtor & T;

export declare function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(base: T, defaultTabIndex?: number): HasTabIndexCtor & T;

export declare class NativeDateAdapter extends DateAdapter<Date> {
    useUtcForDisplay: boolean;
    constructor(matDateLocale: string, platform: Platform);
    addCalendarDays(date: Date, days: number): Date;
    addCalendarMonths(date: Date, months: number): Date;
    addCalendarYears(date: Date, years: number): Date;
    clone(date: Date): Date;
    createDate(year: number, month: number, date: number): Date;
    deserialize(value: any): Date | null;
    format(date: Date, displayFormat: Object): string;
    getDate(date: Date): number;
    getDateNames(): string[];
    getDayOfWeek(date: Date): number;
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getFirstDayOfWeek(): number;
    getMonth(date: Date): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getNumDaysInMonth(date: Date): number;
    getYear(date: Date): number;
    getYearName(date: Date): string;
    invalid(): Date;
    isDateInstance(obj: any): boolean;
    isValid(date: Date): boolean;
    parse(value: any): Date | null;
    toIso8601(date: Date): string;
    today(): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeDateAdapter, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NativeDateAdapter>;
}

export declare class NativeDateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeDateModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NativeDateModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NativeDateModule, never, [typeof i1.PlatformModule], never>;
}

export interface RippleAnimationConfig {
    enterDuration?: number;
    exitDuration?: number;
}

export declare type RippleConfig = {
    color?: string;
    centered?: boolean;
    radius?: number;
    persistent?: boolean;
    animation?: RippleAnimationConfig;
    terminateOnPointerUp?: boolean;
};

export interface RippleGlobalOptions {
    animation?: RippleAnimationConfig;
    disabled?: boolean;
    terminateOnPointerUp?: boolean;
}

export declare class RippleRef {
    config: RippleConfig;
    element: HTMLElement;
    state: RippleState;
    constructor(_renderer: {
        fadeOutRipple(ref: RippleRef): void;
    },
    element: HTMLElement,
    config: RippleConfig);
    fadeOut(): void;
}

export declare class RippleRenderer implements EventListenerObject {
    constructor(_target: RippleTarget, _ngZone: NgZone, elementOrElementRef: HTMLElement | ElementRef<HTMLElement>, platform: Platform);
    _removeTriggerEvents(): void;
    fadeInRipple(x: number, y: number, config?: RippleConfig): RippleRef;
    fadeOutAll(): void;
    fadeOutAllNonPersistent(): void;
    fadeOutRipple(rippleRef: RippleRef): void;
    handleEvent(event: Event): void;
    setupTriggerEvents(elementOrElementRef: HTMLElement | ElementRef<HTMLElement>): void;
}

export declare const enum RippleState {
    FADING_IN = 0,
    VISIBLE = 1,
    FADING_OUT = 2,
    HIDDEN = 3
}

export interface RippleTarget {
    rippleConfig: RippleConfig;
    rippleDisabled: boolean;
}

export declare type SanityChecks = boolean | GranularSanityChecks;

export declare function setLines(lines: QueryList<unknown>, element: ElementRef<HTMLElement>, prefix?: string): void;

export declare class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShowOnDirtyErrorStateMatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ShowOnDirtyErrorStateMatcher>;
}

export declare type ThemePalette = 'primary' | 'accent' | 'warn' | undefined;

export declare const VERSION: Version;
