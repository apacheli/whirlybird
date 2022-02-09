// deno-lint-ignore-file camelcase

import type { Emoji } from "../resources/emoji.ts";

// https://discord.dev/interactions/message-components

export type NotActionRow = Button | SelectMenu | TextInput;

/** https://discord.dev/interactions/message-components#component-object */
export type Component = ActionRow<NotActionRow> | NotActionRow;

/** https://discord.dev/interactions/message-components#component-object-component-types */
export enum ComponentTypes {
  /** A container for other components */
  ActionRow = 1,
  /** A clickable button */
  Button,
  /** A select menu for picking from choices */
  SelectMenu,
  /** A text input object */
  TextInput,
}

/** https://discord.dev/interactions/message-components#action-rows */
export interface ActionRow<T extends NotActionRow> {
  /** `1` for an action row */
  type: ComponentTypes.ActionRow;
  /** a list of child components */
  components: [T?, T?, T?, T?, T?];
}

/** https://discord.dev/interactions/message-components#button-object */
export interface Button {
  /** `2` for a button */
  type: ComponentTypes.Button;
  /** one of [button styles](https://discord.dev/interactions/message-components#button-object-button-styles) */
  style: ButtonStyles;
  /** text that appears on the button, max 80 characters */
  label: string;
  /** `name`, `id`, and `animated` */
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  /** a developer-defined identifier for the button, max 100 characters */
  custom_id: string;
  /** a url for link-style buttons */
  url?: string;
  /** whether the button is disabled, default `false` */
  disabled?: boolean;
}

/** https://discord.dev/interactions/message-components#button-object-button-styles */
export enum ButtonStyles {
  /** blurple */
  Primary = 1,
  /** grey */
  Secondary,
  /** green */
  Success,
  /** red */
  Danger,
  /** grey, navigates to a URL */
  Link,
}

/** https://discord.dev/interactions/message-components#select-menu-object */
export interface SelectMenu {
  /** `3` for a select menu */
  type: ComponentTypes.SelectMenu;
  /** a developer-defined identifier for the button, max 100 characters */
  custom_id: string;
  /** the choices in the select, max 25 */
  options?: SelectOption[];
  /** custom placeholder text if nothing is selected, max 100 characters */
  placeholder?: string;
  /** the minimum number of items that must be chosen; default 1, min 0, max 25 */
  min_values?: number;
  /** the maximum number of items that can be chosen; default 1, max 25 */
  max_values?: number;
  /** disable the select, default false */
  disabled?: boolean;
}

/** https://discord.dev/interactions/message-components#select-menu-object-select-option-structure */
export interface SelectOption {
  /** the user-facing name of the option, max 100 characters */
  label: string;
  /** the dev-define value of the option, max 100 characters */
  value: string;
  /** an additional description of the option, max 100 characters */
  description?: string;
  /**` name`, `id`, and `animated` */
  emoji?: Pick<Emoji, "name" | "id" | "animated">;
  /** will render this option as selected by default */
  default?: boolean;
}

/** https://discord.dev/interactions/message-components#text-inputs */
export interface TextInput {
  /** `4` for a text input */
  type: ComponentTypes.TextInput;
  /** a developer-defined identifier for the input, max 100 characters */
  custom_id: string;
  /** the [Text Input Style](https://discord.dev/interactions/message-components#text-inputs-text-input-styles) */
  style: TextInputStyles;
  /** the label for this component */
  label: string;
  /** the minimum input length for a text input, min 0, max 4000 */
  min_length?: number;
  /** the maximum input length for a text input, min 1, max 4000 */
  max_length?: number;
  /** whether this component is required to be filled, default false */
  required?: boolean;
  /** a pre-filled value for this component, max 4000 characters */
  value?: string;
  /** custom placeholder text if the input is empty, max 100 characters */
  placeholder?: string;
}

/** https://discord.dev/interactions/message-components#text-inputs-text-input-styles */
export enum TextInputStyles {
  /** A single-line input */
  Short = 1,
  /** A multi-line input */
  Paragraph,
}
