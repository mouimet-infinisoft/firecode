import path = require("path");
import { TextEncoder } from "util";
import * as vscode from "vscode";
import { globalContext } from "../../extension";
import { ILogWriter } from "../private";

export const vsCodeLogWriter: ILogWriter = {
  name: "VsCode Logs",
  write: async (message) => {
    const fileUri = vscode.Uri.joinPath(globalContext.logUri, "bobette1.log")
    let originalFile = "";

    try {
      const isFileExisting = await vscode.workspace.fs.stat(fileUri);
      await vscode.workspace.fs.writeFile(
        fileUri ,
        new TextEncoder().encode(originalFile.concat(`${message}\r\n`))
      );
      if (isFileExisting) {
        originalFile = (await vscode.workspace.fs.readFile(fileUri)).toString();
      }
    } catch (error) {
      console.error(`Logfile not exitsting`);
    } finally {
      await vscode.workspace.fs.writeFile(
        fileUri,
        new TextEncoder().encode(originalFile.concat(message))
      );
    }
  },
};
