import path = require("path");
import * as vscode from "vscode";
import { fireLogProvider, globalContext } from "../extension";
import html from './poc/poc.html';

let currentPanel: vscode.WebviewPanel;

type IWebViewEvents<T = unknown> = {
  command: string;
  data: T;
};

type IFireComponent = {
  id: string;
  name: string;
  reactCode: string;
  style: string;
};

const mockReactCode = (_componentName: string) => `
import React from "react";

export const ${_componentName} = () => {
  return (
    <button>
      <p>Primary</p>
    </button>
  );
};`;

const mockCanvasCode = (
  innerImports: string,
  innerCode: string
) => `${innerImports}
  
export const Canvas = () => {
return (<div id="canvasContainer">${innerCode}</div>)
}`;

function randomId(prefix: string) {
  return `${prefix}-${Math.ceil(Math.random() * 87986576)}`;
}

const loadComponentList: IWebViewEvents<IFireComponent[]> = {
  command: "loadtree",
  data: [
    {
      id: randomId("ButtonTestPrimary"),
      name: "ButtonTestPrimary",
      reactCode: mockReactCode("ButtonTestPrimary"),
      style: "",
    },
    {
      id: randomId("Component2"),
      name: "Component2",
      reactCode: mockReactCode("Component2"),
      style: "",
    },
    {
      id: randomId("Component3"),
      name: "Component3",
      reactCode: mockReactCode("Component3"),
      style: "",
    },
    {
      id: randomId("Component4"),
      name: "Component4",
      reactCode: mockReactCode("Component4"),
      style: "",
    },
  ],
};

const replaceLabelCommand: IWebViewEvents<string> = {
  command: "replaceLabel",
  data: "DOUILLLLLLLE",
};

const mouseMoveCommand = () => {
  const columnToShowIn = vscode.window.activeTextEditor
    ? vscode.window.activeTextEditor.viewColumn
    : undefined;

  if (currentPanel) {
    currentPanel.reveal(columnToShowIn);
  } else {
    currentPanel = vscode.window.createWebviewPanel(
      "fireMouseMovePanel",
      "Mouse Move",
      //@ts-ignore
      columnToShowIn,
      { enableScripts: true }
    );

    const onDiskPathTreePanel = vscode.Uri.file(
      path.join(globalContext.extensionPath, "media", "treePanel.js")
    );
    const jsTreePanel = currentPanel.webview.asWebviewUri(onDiskPathTreePanel);

    const onDiskPathCode = vscode.Uri.file(
      path.join(globalContext.extensionPath, "media", "generateCode.js")
    );
    const jsCode = currentPanel.webview.asWebviewUri(onDiskPathCode);

    currentPanel.webview.html = `${html}`;
    currentPanel.webview.onDidReceiveMessage(handleReceiveMessage);
    postMessage({ command: "loadJs", data: jsTreePanel.toString() }); // loads REact dyanmicly
    postMessage({ command: "loadJs", data: jsCode.toString() }); // loads REact dyanmicly
    // postMessage(replaceLabelCommand);
    setTimeout(() => {
      postMessage({
        command: loadComponentList.command,
        data: JSON.stringify(loadComponentList.data),
      });
    }, 2000);

    globalContext.subscriptions.push(currentPanel);
  }
};

export const fireMouseMoveCommand = {
  name: "firecode.dev.wysiwyg",
  command: mouseMoveCommand,
};

const handleReceiveMessage = (message: IWebViewEvents) => {
  fireLogProvider.info(
    `mousemove.command.ts: handleReceiveMessage(): ${JSON.stringify(message)}`
  );
};

const postMessage = (message: IWebViewEvents) => {
  currentPanel.webview.postMessage(message);
  fireLogProvider.info(
    `mousemove.command.ts: handlePostMessage(): ${JSON.stringify(message)}`
  );
};
