import * as vscode from "vscode";
import { fireIntegrationOverlay } from "./authentication/integrations/overlay";
import { FireAuthProvider } from "./authentication/provider";
import { fireSignInCommand } from "./authentication/signin/signin.command";
import { LOGLEVEL, LogProvider } from "./logger/private";
import { fireLogWriter } from "./logger/writers/console";

const fireLogProvider = new LogProvider([fireLogWriter], LOGLEVEL.DEBUG);
export let fireAuthProvider: FireAuthProvider;
export let globalContext: vscode.ExtensionContext;

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
  fireLogProvider.debug("TESTING DEBUG");

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
  6;

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
  }
}

export function deactivate() {}
