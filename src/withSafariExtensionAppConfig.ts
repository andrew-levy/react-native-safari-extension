import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";

import {
  getExtensionBundleIdentifier,
  getExtensionFolder,
} from "./withSafariExtension";

export const withSafariExtensionAppConfig: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const appBundleIdentifier = config.ios!.bundleIdentifier!;
      const extensionName = getExtensionFolder(config.modRequest.projectName!);
      const extensionBundleIdentifier = getExtensionBundleIdentifier(
        config.modRequest.projectName!
      );

      config.extra = {
        ...config.extra,
        eas: {
          ...config.extra?.eas,
          build: {
            ...config.extra?.eas?.build,
            experimental: {
              ...config.extra?.eas?.build?.experimental,
              ios: {
                ...config.extra?.eas?.build?.experimental?.ios,
                appExtensions: [
                  ...(config.extra?.eas?.build?.experimental?.ios
                    ?.appExtensions ?? []),
                  {
                    targetName: extensionName,
                    bundleIdentifier: `$(AppIdentifierPrefix)${extensionBundleIdentifier}`,
                    entitlements: {
                      "com.apple.developer.parent-application-identifiers": [
                        `$(AppIdentifierPrefix)${appBundleIdentifier}`,
                      ],
                      "com.apple.developer.on-demand-install-capable": true,
                    },
                  },
                ],
              },
            },
          },
        },
      };

      return config;
    },
  ]);
};
