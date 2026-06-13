const DESTINATIONS = [
  "n7kpierce@gmail.com",
  "n7dpagan@gmail.com"
];

const ROUTED_ALIASES = new Set([
  "founder@n7technologies.org",
  "contact@n7technologies.org",
  "help@n7technologies.org"
]);

export default {
  async email(message) {
    const recipient = message.to.toLowerCase();

    if (!ROUTED_ALIASES.has(recipient)) {
      message.setReject("Address is not configured for N7 email routing");
      return;
    }

    await Promise.all(
      DESTINATIONS.map(async destination => {
        try {
          const result = await message.forward(destination);
          console.log(`Forwarded ${recipient} to ${destination}`);
          return result;
        } catch (error) {
          console.error(
            `Failed to forward ${recipient} to ${destination}: ${error}`
          );
          throw error;
        }
      })
    );
  }
};
