import * as vscode from "vscode";
import { ILogWriter } from "../private";

export const vsCodeLogWrtier: ILogWriter = {
  name: "VsCode Logs",
  write: (message) => {
    // const fileUri = new vscode.Uri(globalContext.logUri);

    vscode.workspace.fs.stat;
  },
};
