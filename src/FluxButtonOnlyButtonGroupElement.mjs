import { BUTTON_TYPE_BUTTON } from "./BUTTON_TYPE.mjs";
import css from "./FluxButtonOnlyButtonGroupElement.css" with { type: "css" };
import root_css from "./FluxButtonOnlyButtonGroupElementRoot.css" with { type: "css" };
import { FLUX_BUTTON_GROUP_ELEMENT_EVENT_INPUT, FluxButtonGroupElement } from "./FluxButtonGroupElement.mjs";

/** @typedef {import("./Button.mjs").Button} Button */
/** @typedef {import("./StyleSheetManager/StyleSheetManager.mjs").StyleSheetManager} StyleSheetManager */

export const FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_EVENT_CLICK = "flux-button-only-button-group-click";

export const FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX = "--flux-button-only-button-group-";

export class FluxButtonOnlyButtonGroupElement extends HTMLElement {
    /**
     * @type {FluxButtonGroupElement}
     */
    #flux_button_group_element;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {Button[] | null} buttons
     * @param {StyleSheetManager | null} style_sheet_manager
     * @returns {Promise<FluxButtonOnlyButtonGroupElement>}
     */
    static async new(buttons = null, style_sheet_manager = null) {
        if (style_sheet_manager !== null) {
            await style_sheet_manager.generateVariablesRootStyleSheet(
                FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX,
                {
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}active-button-background-color`]: "foreground-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}active-button-foreground-color`]: "background-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}background-color`]: "background-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}button-background-color`]: "accent-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}button-foreground-color`]: "accent-color-foreground-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}focus-button-outline-color`]: "foreground-color",
                    [`${FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_VARIABLE_PREFIX}focus-outline-color`]: "foreground-color"
                },
                true
            );

            await style_sheet_manager.addRootStyleSheet(
                root_css,
                true
            );
        } else {
            if (!document.adoptedStyleSheets.includes(root_css)) {
                document.adoptedStyleSheets.unshift(root_css);
            }
        }

        const flux_button_only_button_group_element = new this();

        flux_button_only_button_group_element.#shadow = flux_button_only_button_group_element.attachShadow({
            mode: "closed"
        });

        await style_sheet_manager?.addStyleSheetsToShadow(
            flux_button_only_button_group_element.#shadow
        );

        flux_button_only_button_group_element.#shadow.adoptedStyleSheets.push(css);

        flux_button_only_button_group_element.#flux_button_group_element = await FluxButtonGroupElement.new(
            null,
            style_sheet_manager
        );
        flux_button_only_button_group_element.#flux_button_group_element.classList.add("buttons");
        flux_button_only_button_group_element.#flux_button_group_element.addEventListener(FLUX_BUTTON_GROUP_ELEMENT_EVENT_INPUT, e => {
            flux_button_only_button_group_element.dispatchEvent(new CustomEvent(FLUX_BUTTON_ONLY_BUTTON_GROUP_ELEMENT_EVENT_CLICK, {
                detail: {
                    value: e.detail.value
                }
            }));
        });
        flux_button_only_button_group_element.#shadow.append(flux_button_only_button_group_element.#flux_button_group_element);

        flux_button_only_button_group_element.buttons = buttons ?? [];

        return flux_button_only_button_group_element;
    }

    /**
     * @private
     */
    constructor() {
        super();
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
