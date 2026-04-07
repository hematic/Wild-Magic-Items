const MODULE_ID = "wild-magic-items";

const CHANGELOG = `
<h2>Wild Magic Items v1.2.4</h2>
<ul>
  <li>Added new wild magic items to the Menagerie pack</li>
  <li>Updated roll table descriptions</li>
  <li>Various text fixes</li>
</ul>
`;

Hooks.once("ready", async () => {
  // Only show to GMs
  if (!game.user.isGM) return;

  // Register the setting to track last seen version
  game.settings.register(MODULE_ID, "lastSeenVersion", {
    name: "Last Seen Version",
    scope: "client",
    config: false,
    type: String,
    default: "",
  });

  const currentVersion = game.modules.get(MODULE_ID).version;
  const lastSeen = game.settings.get(MODULE_ID, "lastSeenVersion");

  if (lastSeen === currentVersion) return;

  // Show the dialog
  new Dialog({
    title: "Wild Magic Items — What's New",
    content: CHANGELOG,
    buttons: {
      close: {
        label: "Got it!",
        callback: () => {
          game.settings.set(MODULE_ID, "lastSeenVersion", currentVersion);
        },
      },
    },
    default: "close",
  }).render(true);
});
