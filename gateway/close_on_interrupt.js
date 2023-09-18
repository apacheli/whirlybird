export const closeOnInterrupt = (gateway) => {
  Deno.addSignalListener("SIGINT", () => {
    if (confirm("Disconnect shards?")) {
      gateway.disconnect(3002, "SIGINT");
    }
  });
};
