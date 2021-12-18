import * as vscode from "vscode";
import { FireAuthProvider } from "./authentication/provider";
import { fireSignInCommand } from "./authentication/signin/signin.command";

export const fireAuthProvider = new FireAuthProvider();
export let globalContext: vscode.ExtensionContext;

export function activate(context: vscode.ExtensionContext) {
  globalContext = context;
  console.log("Firecode activated!");

  /**
   *
   * PROVIDERS
   */
  context.subscriptions.push(
    vscode.authentication.registerAuthenticationProvider(
      "Infinisoft",
      "Firecode",
      fireAuthProvider
    )
  );

  /***
   * COMMANDS
   */
  context.subscriptions.push(
    vscode.commands.registerCommand("firecode.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from firecode!");
	  vscode.authentication.getSession('Infinisoft', FireAuthProvider.scopes)
	  .then(r=> {
		  console.log(r)
	  })
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      fireSignInCommand.name,
      fireSignInCommand.command
    )
  );
}

export function deactivate() {}
