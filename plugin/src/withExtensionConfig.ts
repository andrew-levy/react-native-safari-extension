import { ConfigPlugin } from "@expo/config-plugins";

export const withExtensionConfig: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  if (!config.ios?.bundleIdentifier) {
    throw new Error("You need to specify ios.bundleIdentifier in app.json.");
  }
  const extensionBundleIdentifier = `${config.ios.bundleIdentifier}.${folderName}`;

  const appExtensions =
    config.extra?.eas?.build?.experimental?.ios?.appExtensions;

  const safariExtensionConfig = appExtensions?.find(
    (extension: any) => extension.targetName === folderName
  );

  return {
    ...config,
    extra: {
      ...(config.extra ?? {}),
      eas: {
        ...(config.extra?.eas ?? {}),
        build: {
          ...(config.extra?.eas?.build ?? {}),
          experimental: {
            ...(config.extra?.eas?.build?.experimental ?? {}),
            ios: {
              ...(config.extra?.eas?.build?.experimental?.ios ?? {}),
              appExtensions: [
                {
                  ...(safariExtensionConfig ?? {
                    targetName: folderName,
                    bundleIdentifier: extensionBundleIdentifier,
                  }),
                  entitlements: {
                    ...safariExtensionConfig?.entitlements,
                    "com.apple.security.application-groups": [
                      `group.${config.ios.bundleIdentifier}`,
                    ],
                  },
                },
                ...(appExtensions?.filter(
                  (extension: any) => extension.targetName !== folderName
                ) ?? []),
              ],
            },
          },
        },
      },
    },
  };
};
