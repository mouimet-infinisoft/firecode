/**
    * @description      : 
    * @author           : milie
    * @group            : 
    * @created          : 18/12/2021 - 18:19:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2021
    * - Author          : milie
    * - Modification    : 
**/
import { FirecodeSession } from "./provider";

export type IFireSignIn = (email:string, password:string)=> Promise<FirecodeSession> | FirecodeSession;

export interface IFireIntegration {
    scope: string
    signIn:IFireSignIn
}