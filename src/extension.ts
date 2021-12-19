import * as vscode from "vscode";
import { fireIntegrationOverlay } from "./authentication/integrations/overlay";
import { FireAuthProvider } from "./authentication/provider";
import { fireSignInCommand } from "./authentication/signin/signin.command";
import { LOGLEVEL, LogProvider } from "./logger/private";
import { fireLogWriter } from "./logger/writers/console";
import { FireToolsTreeProvider } from "./tools/treeview/provider";

const fireLogProvider = new LogProvider([fireLogWriter], LOGLEVEL.DEBUG);
export let fireAuthProvider: FireAuthProvider;
const fireToolsTreeProvider = new FireToolsTreeProvider()
export let globalContext: vscode.ExtensionContext;
export let fireStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  /**
   *
   * Initialization
   *
   */
  globalContext = context;
  fireAuthProvider = new FireAuthProvider({
    [fireIntegrationOverlay.scope]: fireIntegrationOverlay.signIn,
  });

  fireLogProvider.info("Firecode activated!");

  /**
   *
   * Providers
   *
   */
  context.subscriptions.push(
    vscode.authentication.registerAuthenticationProvider(
      "Infinisoft",
      "Firecode",
      fireAuthProvider
    )
  );

  context.subscriptions.push(vscode.window.registerTreeDataProvider('firecode.view.tools', fireToolsTreeProvider))

  /***
   *
   * Commands
   *
   */
  context.subscriptions.push(
    vscode.commands.registerCommand(
      fireSignInCommand.name,
      fireSignInCommand.command
    )
  );

  /***
   *
   * DEV COMMANDS
   *
   */
  if (context.extensionMode === vscode.ExtensionMode.Development) {
    context.subscriptions.push(
      vscode.commands.registerCommand("firecode.dev.getSession", () => {
        try {
          vscode.authentication
            .getSession("Infinisoft", [fireIntegrationOverlay.scope])
            .then((r) => {
              if (r) {
                fireLogProvider.info(`firecode.dev.getSession(): Got Session`)
                vscode.window.showInformationMessage("Got session!");
              } else {
                vscode.window.showErrorMessage("No session!");
              }
            });
        } catch (error) {
          console.log(error);
          vscode.window.showErrorMessage("Error, failed Get Session");
        }
      })
    );
    context.subscriptions.push(
      vscode.commands.registerCommand("firecode.dev.onChangeSession", () => {
        fireAuthProvider.onDidChangeSessions((event) => {
          vscode.window.showInformationMessage(
            `SESSION DID CHNAGE: payload: ${JSON.stringify(event)}`
          );
        });

        vscode.window.showInformationMessage(
          `Subscribed to firecode auth provider onchange event `
        );
      })
    );
    const devTestPopup = vscode.commands.registerCommand("firecode.dev.test.popUp", () => {
      vscode.window.showInformationMessage(
        `[Firecode]: firecode.dev.test.popUp(): Test!`
      );
    })
    context.subscriptions.push(devTestPopup);

  /***
   * 
   * Status bar DEV TEXT
   * 
   */

   fireStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
   fireStatusBarItem.command = "firecode.dev.test.popUp";
   fireStatusBarItem.text = "$(accounts-view-bar-icon) Firecode"
   fireStatusBarItem.show()
   context.subscriptions.push(fireStatusBarItem);
  }
  
}

export function deactivate() {}
