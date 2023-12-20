import { ConfigPlugin, withEntitlementsPlist } from "@expo/config-plugins";

export const withAppEntitlements: ConfigPlugin = (config) => {
  return withEntitlementsPlist(config, (config) => {
    config.modResults["com.apple.security.application-groups"] = [
      `group.${config.ios!.bundleIdentifier}`,
    ];
    return config;
  });
};
