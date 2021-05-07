export declare function getMatIconFailedToSanitizeLiteralError(literal: SafeHtml): Error;

export declare function getMatIconFailedToSanitizeUrlError(url: SafeResourceUrl): Error;

export declare function getMatIconNameNotFoundError(iconName: string): Error;

export declare function getMatIconNoHttpProviderError(): Error;

export declare const ICON_REGISTRY_PROVIDER: {
    provide: typeof MatIconRegistry;
    deps: (Optional[] | typeof DomSanitizer | typeof ErrorHandler)[];
    useFactory: typeof ICON_REGISTRY_PROVIDER_FACTORY;
};

export declare function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry: MatIconRegistry, httpClient: HttpClient, sanitizer: DomSanitizer, errorHandler: ErrorHandler, document?: any): MatIconRegistry;

export interface IconOptions {
    viewBox?: string;
    withCredentials?: boolean;
}

export declare type IconResolver = (name: string, namespace: string) => (SafeResourceUrl | SafeResourceUrlWithIconOptions | null);

export declare const MAT_ICON_LOCATION: InjectionToken<MatIconLocation>;

export declare function MAT_ICON_LOCATION_FACTORY(): MatIconLocation;

export declare class MatIcon extends _MatIconMixinBase implements OnInit, AfterViewChecked, CanColor, OnDestroy {
    _svgName: string | null;
    _svgNamespace: string | null;
    get fontIcon(): string;
    set fontIcon(value: string);
    get fontSet(): string;
    set fontSet(value: string);
    get inline(): boolean;
    set inline(inline: boolean);
    get svgIcon(): string;
    set svgIcon(value: string);
    constructor(elementRef: ElementRef<HTMLElement>, _iconRegistry: MatIconRegistry, ariaHidden: string, _location: MatIconLocation, _errorHandler: ErrorHandler);
    _usingFontIcon(): boolean;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ngAcceptInputType_inline: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatIcon, "mat-icon", ["matIcon"], { "color": "color"; "inline": "inline"; "svgIcon": "svgIcon"; "fontSet": "fontSet"; "fontIcon": "fontIcon"; }, {}, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatIcon, [null, null, { attribute: "aria-hidden"; }, null, null]>;
}

export interface MatIconLocation {
    getPathname: () => string;
}

export declare class MatIconModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatIconModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatIconModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatIconModule, [typeof i1.MatIcon], [typeof i2.MatCommonModule], [typeof i1.MatIcon, typeof i2.MatCommonModule]>;
}

export declare class MatIconRegistry implements OnDestroy {
    constructor(_httpClient: HttpClient, _sanitizer: DomSanitizer, document: any, _errorHandler: ErrorHandler);
    addSvgIcon(iconName: string, url: SafeResourceUrl, options?: IconOptions): this;
    addSvgIconInNamespace(namespace: string, iconName: string, url: SafeResourceUrl, options?: IconOptions): this;
    addSvgIconLiteral(iconName: string, literal: SafeHtml, options?: IconOptions): this;
    addSvgIconLiteralInNamespace(namespace: string, iconName: string, literal: SafeHtml, options?: IconOptions): this;
    addSvgIconResolver(resolver: IconResolver): this;
    addSvgIconSet(url: SafeResourceUrl, options?: IconOptions): this;
    addSvgIconSetInNamespace(namespace: string, url: SafeResourceUrl, options?: IconOptions): this;
    addSvgIconSetLiteral(literal: SafeHtml, options?: IconOptions): this;
    addSvgIconSetLiteralInNamespace(namespace: string, literal: SafeHtml, options?: IconOptions): this;
    classNameForFontAlias(alias: string): string;
    getDefaultFontSetClass(): string;
    getNamedSvgIcon(name: string, namespace?: string): Observable<SVGElement>;
    getSvgIconFromUrl(safeUrl: SafeResourceUrl): Observable<SVGElement>;
    ngOnDestroy(): void;
    registerFontClassAlias(alias: string, className?: string): this;
    setDefaultFontSetClass(className: string): this;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatIconRegistry, [{ optional: true; }, null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MatIconRegistry>;
}

export interface SafeResourceUrlWithIconOptions {
    options: IconOptions;
    url: SafeResourceUrl;
}
