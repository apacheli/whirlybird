export const closeOnInterrupt = (gateway) => {
  Deno.addSignalListener("SIGINT", () => {
    gateway.disconnect(3003, "SIGINT");
  });
};
