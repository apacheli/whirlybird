import { botCommand } from "../bot_command.js";

export default botCommand("error", () => {
  throw new Error("An error occurred.");
}, {
  description: "Throw an error. Developer only.",
  category: "dev",
  parseMode: 0,
  usage: null,
  dev: true,
});
