import * as vscode from 'vscode';
import { fireAuthProvider, globalContext } from '../../extension';
import { fireSignInWebView } from './signin.webview';

let currentPanel: vscode.WebviewPanel;

const signInCommand = () => {
    const columnToShowIn = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (currentPanel) {
      currentPanel.reveal(columnToShowIn);
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        "fireAuthPanel",
        "Authentication",
        //@ts-ignore
        columnToShowIn,
        { enableScripts: true }
      );
      currentPanel.webview.html = fireSignInWebView();

      currentPanel.webview.onDidReceiveMessage(
        (message) => {
          fireAuthProvider
            .login(message.credentials.email, message.credentials.password)
            .then(()=>currentPanel?.dispose())
            .catch((err) => {
              vscode.window.showErrorMessage(`Error, authentication failed!`);
            });
        },
        undefined,
        globalContext.subscriptions
      );
      
      globalContext.subscriptions.push(currentPanel)
    }
  }

  export const fireSignInCommand = {
      name: 'firecode.openSignIn',
      command: signInCommand
  }