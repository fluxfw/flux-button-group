import { BUTTON_TYPE_BUTTON } from "./BUTTON_TYPE.mjs";
import { FLUX_BUTTON_GROUP_EVENT_INPUT } from "./FLUX_BUTTON_GROUP_EVENT.mjs";
import { FLUX_BUTTON_ONLY_BUTTON_GROUP_EVENT_CLICK } from "./FLUX_BUTTON_ONLY_BUTTON_GROUP_EVENT.mjs";
import { flux_css_api } from "../../flux-css-api/src/FluxCssApi.mjs";
import { FluxButtonGroupElement } from "./FluxButtonGroupElement.mjs";

/** @typedef {import("./Button.mjs").Button} Button */

const root_css = await flux_css_api.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/FluxButtonOnlyButtonGroupElementRoot.css`
);

document.adoptedStyleSheets.unshift(root_css);

const css = await flux_css_api.import(
    `${import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))}/FluxButtonOnlyButtonGroupElement.css`
);

export class FluxButtonOnlyButtonGroupElement extends HTMLElement {
    /**
     * @type {FluxButtonGroupElement}
     */
    #flux_button_group_element;

    /**
     * @param {Button[] | null} buttons
     * @returns {FluxButtonOnlyButtonGroupElement}
     */
    static new(buttons = null) {
        return new this(
            buttons ?? []
        );
    }

    /**
     * @param {Button[]} buttons
     * @private
     */
    constructor(buttons) {
        super();

        const shadow = this.attachShadow({
            mode: "closed"
        });

        shadow.adoptedStyleSheets.push(css);

        this.#flux_button_group_element = FluxButtonGroupElement.new();
        this.#flux_button_group_element.classList.add("buttons");
        this.#flux_button_group_element.addEventListener(FLUX_BUTTON_GROUP_EVENT_INPUT, e => {
            this.dispatchEvent(new CustomEvent(FLUX_BUTTON_ONLY_BUTTON_GROUP_EVENT_CLICK, {
                detail: {
                    value: e.detail.value
                }
            }));
        });
        shadow.append(this.#flux_button_group_element);

        this.buttons = buttons;
    }

    /**
     * @returns {Button[]}
     */
    get buttons() {
        return this.#flux_button_group_element.buttons;
    }

    /**
     * @param {Button[]} buttons
     * @returns {void}
     */
    set buttons(buttons) {
        this.#flux_button_group_element.buttons = buttons.map(button => ({
            ...button,
            type: BUTTON_TYPE_BUTTON
        }));
    }

    /**
     * @returns {string[]}
     */
    get disabled() {
        return this.#flux_button_group_element.disabled;
    }

    /**
     * @param {string[] | boolean} values
     * @returns {void}
     */
    set disabled(values) {
        this.#flux_button_group_element.disabled = values;
    }
}

export const FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_TAG_NAME = "flux-button-only-button-group";

customElements.define(FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_TAG_NAME, FluxButtonOnlyButtonGroupElement);
