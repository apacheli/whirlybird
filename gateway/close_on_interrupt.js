export const closeOnInterrupt = (gateway) => {
  Deno.addSignalListener("SIGINT", () => {
    if (confirm("Disconnect shards?")) {
      gateway.disconnect(3003, "SIGINT");
    }
  });
};
