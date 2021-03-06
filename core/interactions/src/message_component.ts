import { ComponentTypes } from "../../types/src/interactions/message_components.ts";
import type {
  ActionRow,
  Button,
  ButtonStyles,
  NotActionRow,
  SelectMenu,
  SelectOption,
  TextInput,
  TextInputStyles,
} from "../../types/src/interactions/message_components.ts";

/** Action row message component */
export const actionRow = <T extends NotActionRow>(
  components: [T?, T?, T?, T?, T?],
): ActionRow<T> => ({
  components,
  type: ComponentTypes.ActionRow,
});

/** Button message component */
export const button = (
  customId: string,
  label: string,
  style: ButtonStyles,
  extra?: Omit<Button, "custom_id" | "label" | "style" | "type">,
): Button => ({
  custom_id: customId,
  label,
  style,
  type: ComponentTypes.Button,
  ...extra,
});

/** Select menu message component */
export const selectMenu = (
  customId: string,
  options: SelectOption[],
  extra?: Omit<SelectMenu, "custom_id" | "options" | "type">,
): SelectMenu => ({
  custom_id: customId,
  options,
  type: ComponentTypes.SelectMenu,
  ...extra,
});

/** Select menu option */
export const selectOption = (
  label: string,
  value: string,
  description?: string,
): SelectOption => ({
  description,
  label,
  value,
});

/** Text input message component */
export const textInput = (
  customId: string,
  label: string,
  style: TextInputStyles,
  extra?: Omit<TextInput, "custom_id" | "label" | "style" | "type">,
): TextInput => ({
  custom_id: customId,
  label,
  style,
  type: ComponentTypes.TextInput,
  ...extra,
});
