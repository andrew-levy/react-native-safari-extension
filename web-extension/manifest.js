const manifest = () => {
  return {
    manifest_version: 2,
    default_locale: "en",

    name: "__MSG_extension_name__",
    description: "__MSG_extension_description__",
    version: "1.0",

    icons: {
      48: "public/images/icon/icon-48.png",
      96: "public/images/icon/icon-96.png",
      128: "public/images/icon/icon-128.png",
      256: "public/images/icon/icon-256.png",
      512: "public/images/icon/icon-512.png",
    },

    host_permissions: [
      "http://www.localhost:19000/",
      "https://www.localhost:19000/",
      "*://localhost/*",
    ],
    externally_connectable: {
      matches: ["http://localhost/*"],
    },

    // Implicit permissions
    permissions: [
        // Non-sensitive -- doesn't require any extra privileges
        "alarms", "clipboardWrite","menus",
        "nativeMessaging", "storage",
        // sensitive -- these include website identifying info
        "cookies", "tabs", "webNavigation",

        // Avoid alerts
        "activeTab"
    ],

    background: {
      scripts: ["public/index.background.js"],
      persistent: false,
    },

    // Injects the following script...
    content_scripts: [
      {
        // TODO: Static render to get the settings from the file
        js: ["public/index.content.js"],

        matches: ["*://*/*"],
        match_about_blank: true,
        all_frames: true,
        run_at: "document_start",
      },
    ],

    browser_action: {
      default_popup: "public/index.html",
      default_icon: {
        16: "public/images/toolbar/icon-16.png",
        19: "public/images/toolbar/icon-19.png",
        32: "public/images/toolbar/icon-32.png",
        38: "public/images/toolbar/icon-38.png",
        48: "public/images/toolbar/icon-48.png",
        72: "public/images/toolbar/icon-72.png",
      },
    },
  };
};

(() => {
  const fs = require("fs");
  const path = require("path");
  const contents = manifest();
  fs.writeFileSync(
    path.join(__dirname, "manifest.json"),
    JSON.stringify(contents, null, 2),
    "utf8"
  );
})();
