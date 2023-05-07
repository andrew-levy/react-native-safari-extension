import { ConfigPlugin, withEntitlementsPlist } from "@expo/config-plugins";

export const withRemoveApsEntitlement: ConfigPlugin = (config) => {
  return withEntitlementsPlist(config, (mod) => {
    delete mod.modResults["aps-environment"];
    return mod;
  });
};
