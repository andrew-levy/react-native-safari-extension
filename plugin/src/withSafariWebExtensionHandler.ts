import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import * as fs from "fs";
import * as path from "path";

export const withSafariWebExtensionHandler: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const extensionHandlerPath = path.join(
        config.modRequest.projectRoot,
        folderName,
        "SafariWebExtensionHandler.swift"
      );
      const extensionHandlerExists = fs.existsSync(extensionHandlerPath);

      if (!extensionHandlerExists) {
        fs.writeFileSync(extensionHandlerPath, extensionHandlerContent);
      }

      return config;
    },
  ]);
};

const extensionHandlerContent = `
import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)

        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "Response to": message ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }
}

`;
