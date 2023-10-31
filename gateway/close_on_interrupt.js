/**
 * Disconnect shards for the given gateway client when you press `CTRL+C`.
 *
 * @param {ClusterClient | GatewayClient} gateway
 */
export const closeOnInterrupt = (gateway) => {
  Deno.addSignalListener("SIGINT", () => {
    gateway.disconnect(3003, "SIGINT");
  });
};
