import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MkAppBar extends LitElement {
    /**
     * The number of times the button has been clicked.
     */
    mobileBreakpoint: number;
    private isMobile;
    private isSideOpen;
    private mq;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private updateIsMobile;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'mk-appbar': MkAppBar;
    }
}
