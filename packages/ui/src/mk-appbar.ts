import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { classMap } from 'lit/directives/class-map.js'
import { MenuIcon } from './icons'
import MkButtonCss from './styles/mk-btn.css?raw'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('mk-appbar')
export class MkAppBar extends LitElement {

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  mobileBreakpoint = 600

  @state()
  private isMobile!: boolean
  
  @state()
  private isSideOpen: boolean = false
  

  private mq: MediaQueryList

  constructor() {
    super()
    this.mq = window.matchMedia(`(max-width: ${this.mobileBreakpoint}px)`)
    this.updateIsMobile(this.mq)
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.updateIsMobile(this.mq)
    console.log('connected')
    this.mq.addEventListener('change', mq => this.updateIsMobile(mq))
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.mq.removeEventListener('change', mq => this.updateIsMobile(mq))
  }

  private updateIsMobile(mq: MediaQueryList | MediaQueryListEvent) {
    this.isMobile = mq.matches
    this.classList.toggle('is-mobile', this.isMobile)
  }

  render() {
    return html`
      ${this.isMobile ? html`<button class="burger-menu-btn mk-btn" @click=${() => this.isSideOpen = true}>${unsafeHTML(MenuIcon)}</button>` : nothing}
      <div class="main-logo">
        <span class="matthias">MATTHIAS</span>
        <span class="kind">KIND</span>
      </div>
      ${!this.isMobile ? html`<slot name="navigation"></slot>` : nothing}
      ${this.isMobile ? html`<div class=${classMap({ 'side-menu-wrapper': true, 'is-open': this.isSideOpen })}>
        <div class="side-menu-bg" @click=${() => this.isSideOpen = false}></div>
        <aside class="side-menu">
          <slot name="navigation"></slot>
        </aside>
      </div>` : nothing }
    `
  }



  static styles = [
    css`${unsafeCSS(MkButtonCss)}`,
    css`
      :host {
        --mk-ab-h: var(--mk-appbar-height, 60px);
        display: grid;
        grid-template-columns: min-content auto;
        grid-template-rows: 100%;
        position: sticky;
        width: 100vw;
        height: var(--mk-ab-h);
        background-color: var(--mk-secondary, #646cff);
      }

      .side-menu-wrapper.is-open > .side-menu-bg {
        position: fixed;
        inset: 0;
        background-color: rgba(50, 50, 50, 0.5);
      }

      .side-menu-wrapper > .side-menu {
        position: fixed;
        inset: 0 auto 0 0;
        transform: translateX(-100%);
        padding: 2em;
        background-color: var(--mk-background);
        transition: transform 0.2s ease-out;
      }

      .side-menu-wrapper.is-open > .side-menu {
        transform: translateX(0);
      }

      .main-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1em;
      }

      .main-logo > .matthias {
        font-weight: lighter;
      }
      .main-logo > .kind {
        font-weight: bold;
      } 

      .burger-menu-btn {
        display: flex;
        aspect-ratio: 1 / 1;
        justify-content: center;
        align-items: center;
        margin: 8px;
        height: calc(var(--mk-ab-h) - 16px);
        
      }

      .burger-menu-btn > svg {
        width: 90%;
        height: 90%;
      }

      .burger-menu-btn:hover {
        background-color: var(--mk-primary);
      }
  `]
}

declare global {
  interface HTMLElementTagNameMap {
    'mk-appbar': MkAppBar
  }
}
