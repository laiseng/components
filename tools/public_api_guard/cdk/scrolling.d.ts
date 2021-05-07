export declare type _Bottom = {
    bottom?: number;
};

export declare type _End = {
    end?: number;
};

export declare function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir: CdkFixedSizeVirtualScroll): FixedSizeVirtualScrollStrategy;

export declare type _Left = {
    left?: number;
};

export declare type _Right = {
    right?: number;
};

export declare type _Start = {
    start?: number;
};

export declare type _Top = {
    top?: number;
};

export declare type _Without<T> = {
    [P in keyof T]?: never;
};

export declare type _XAxis = _XOR<_XOR<_Left, _Right>, _XOR<_Start, _End>>;

export declare type _XOR<T, U> = (_Without<T> & U) | (_Without<U> & T);

export declare type _YAxis = _XOR<_Top, _Bottom>;

export declare class CdkFixedSizeVirtualScroll implements OnChanges {
    _itemSize: number;
    _maxBufferPx: number;
    _minBufferPx: number;
    _scrollStrategy: FixedSizeVirtualScrollStrategy;
    get itemSize(): number;
    set itemSize(value: number);
    get maxBufferPx(): number;
    set maxBufferPx(value: number);
    get minBufferPx(): number;
    set minBufferPx(value: number);
    ngOnChanges(): void;
    static ngAcceptInputType_itemSize: NumberInput;
    static ngAcceptInputType_maxBufferPx: NumberInput;
    static ngAcceptInputType_minBufferPx: NumberInput;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkFixedSizeVirtualScroll, "cdk-virtual-scroll-viewport[itemSize]", never, { "itemSize": "itemSize"; "minBufferPx": "minBufferPx"; "maxBufferPx": "maxBufferPx"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkFixedSizeVirtualScroll, never>;
}

export declare class CdkScrollable implements OnInit, OnDestroy {
    protected dir?: Directionality | undefined;
    protected elementRef: ElementRef<HTMLElement>;
    protected ngZone: NgZone;
    protected scrollDispatcher: ScrollDispatcher;
    constructor(elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone, dir?: Directionality | undefined);
    elementScrolled(): Observable<Event>;
    getElementRef(): ElementRef<HTMLElement>;
    measureScrollOffset(from: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number;
    ngOnDestroy(): void;
    ngOnInit(): void;
    scrollTo(options: ExtendedScrollToOptions): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkScrollable, "[cdk-scrollable], [cdkScrollable]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkScrollable, [null, null, null, { optional: true; }]>;
}

export declare class CdkScrollableModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkScrollableModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CdkScrollableModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CdkScrollableModule, [typeof i1.CdkScrollable], never, [typeof i1.CdkScrollable]>;
}

export declare class CdkVirtualForOf<T> implements CdkVirtualScrollRepeater<T>, CollectionViewer, DoCheck, OnDestroy {
    _cdkVirtualForOf: DataSource<T> | Observable<T[]> | NgIterable<T> | null | undefined;
    get cdkVirtualForOf(): DataSource<T> | Observable<T[]> | NgIterable<T> | null | undefined;
    set cdkVirtualForOf(value: DataSource<T> | Observable<T[]> | NgIterable<T> | null | undefined);
    set cdkVirtualForTemplate(value: TemplateRef<CdkVirtualForOfContext<T>>);
    get cdkVirtualForTemplateCacheSize(): number;
    set cdkVirtualForTemplateCacheSize(size: number);
    get cdkVirtualForTrackBy(): TrackByFunction<T> | undefined;
    set cdkVirtualForTrackBy(fn: TrackByFunction<T> | undefined);
    readonly dataStream: Observable<readonly T[]>;
    readonly viewChange: Subject<ListRange>;
    constructor(
    _viewContainerRef: ViewContainerRef,
    _template: TemplateRef<CdkVirtualForOfContext<T>>,
    _differs: IterableDiffers,
    _viewRepeater: _RecycleViewRepeaterStrategy<T, T, CdkVirtualForOfContext<T>>,
    _viewport: CdkVirtualScrollViewport, ngZone: NgZone);
    measureRangeSize(range: ListRange, orientation: 'horizontal' | 'vertical'): number;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_cdkVirtualForTemplateCacheSize: NumberInput;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkVirtualForOf<any>, "[cdkVirtualFor][cdkVirtualForOf]", never, { "cdkVirtualForOf": "cdkVirtualForOf"; "cdkVirtualForTrackBy": "cdkVirtualForTrackBy"; "cdkVirtualForTemplate": "cdkVirtualForTemplate"; "cdkVirtualForTemplateCacheSize": "cdkVirtualForTemplateCacheSize"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkVirtualForOf<any>, [null, null, null, null, { skipSelf: true; }, null]>;
}

export declare type CdkVirtualForOfContext<T> = {
    $implicit: T;
    cdkVirtualForOf: DataSource<T> | Observable<T[]> | NgIterable<T>;
    index: number;
    count: number;
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
};

export interface CdkVirtualScrollRepeater<T> {
    readonly dataStream: Observable<readonly T[]>;
    measureRangeSize(range: ListRange, orientation: 'horizontal' | 'vertical'): number;
}

export declare class CdkVirtualScrollViewport extends CdkScrollable implements OnInit, OnDestroy {
    _contentWrapper: ElementRef<HTMLElement>;
    _totalContentHeight: string;
    _totalContentWidth: string;
    elementRef: ElementRef<HTMLElement>;
    get orientation(): 'horizontal' | 'vertical';
    set orientation(orientation: 'horizontal' | 'vertical');
    readonly renderedRangeStream: Observable<ListRange>;
    readonly scrolledIndexChange: Observable<number>;
    constructor(elementRef: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, _scrollStrategy: VirtualScrollStrategy, dir: Directionality, scrollDispatcher: ScrollDispatcher, viewportRuler: ViewportRuler);
    attach(forOf: CdkVirtualScrollRepeater<any>): void;
    checkViewportSize(): void;
    detach(): void;
    getDataLength(): number;
    getOffsetToRenderedContentStart(): number | null;
    getRenderedRange(): ListRange;
    getViewportSize(): number;
    measureRangeSize(range: ListRange): number;
    measureRenderedContentSize(): number;
    measureScrollOffset(from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number;
    ngOnDestroy(): void;
    ngOnInit(): void;
    scrollToIndex(index: number, behavior?: ScrollBehavior): void;
    scrollToOffset(offset: number, behavior?: ScrollBehavior): void;
    setRenderedContentOffset(offset: number, to?: 'to-start' | 'to-end'): void;
    setRenderedRange(range: ListRange): void;
    setTotalContentSize(size: number): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<CdkVirtualScrollViewport, "cdk-virtual-scroll-viewport", never, { "orientation": "orientation"; }, { "scrolledIndexChange": "scrolledIndexChange"; }, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkVirtualScrollViewport, [null, null, null, { optional: true; }, { optional: true; }, null, null]>;
}

export declare const DEFAULT_RESIZE_TIME = 20;

export declare const DEFAULT_SCROLL_TIME = 20;

export declare type ExtendedScrollToOptions = _XAxis & _YAxis & ScrollOptions;

export declare class FixedSizeVirtualScrollStrategy implements VirtualScrollStrategy {
    scrolledIndexChange: Observable<number>;
    constructor(itemSize: number, minBufferPx: number, maxBufferPx: number);
    attach(viewport: CdkVirtualScrollViewport): void;
    detach(): void;
    onContentRendered(): void;
    onContentScrolled(): void;
    onDataLengthChanged(): void;
    onRenderedOffsetChanged(): void;
    scrollToIndex(index: number, behavior: ScrollBehavior): void;
    updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number): void;
}

export declare class ScrollDispatcher implements OnDestroy {
    protected _document: Document;
    _globalSubscription: Subscription | null;
    scrollContainers: Map<CdkScrollable, Subscription>;
    constructor(_ngZone: NgZone, _platform: Platform, document: any);
    ancestorScrolled(elementOrElementRef: ElementRef | HTMLElement, auditTimeInMs?: number): Observable<CdkScrollable | void>;
    deregister(scrollable: CdkScrollable): void;
    getAncestorScrollContainers(elementOrElementRef: ElementRef | HTMLElement): CdkScrollable[];
    ngOnDestroy(): void;
    register(scrollable: CdkScrollable): void;
    scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollDispatcher, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScrollDispatcher>;
}

export declare class ScrollingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollingModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ScrollingModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ScrollingModule, [typeof i2.CdkFixedSizeVirtualScroll, typeof i3.CdkVirtualForOf, typeof i4.CdkVirtualScrollViewport], [typeof i5.BidiModule, typeof i6.PlatformModule, typeof CdkScrollableModule], [typeof i5.BidiModule, typeof CdkScrollableModule, typeof i2.CdkFixedSizeVirtualScroll, typeof i3.CdkVirtualForOf, typeof i4.CdkVirtualScrollViewport]>;
}

export declare class ViewportRuler implements OnDestroy {
    protected _document: Document;
    constructor(_platform: Platform, ngZone: NgZone, document: any);
    change(throttleTime?: number): Observable<Event>;
    getViewportRect(): ClientRect;
    getViewportScrollPosition(): ViewportScrollPosition;
    getViewportSize(): Readonly<{
        width: number;
        height: number;
    }>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewportRuler, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ViewportRuler>;
}

export interface ViewportScrollPosition {
    left: number;
    top: number;
}

export declare const VIRTUAL_SCROLL_STRATEGY: InjectionToken<VirtualScrollStrategy>;

export interface VirtualScrollStrategy {
    scrolledIndexChange: Observable<number>;
    attach(viewport: CdkVirtualScrollViewport): void;
    detach(): void;
    onContentRendered(): void;
    onContentScrolled(): void;
    onDataLengthChanged(): void;
    onRenderedOffsetChanged(): void;
    scrollToIndex(index: number, behavior: ScrollBehavior): void;
}
