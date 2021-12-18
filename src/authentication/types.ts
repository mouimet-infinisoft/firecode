import { FirecodeSession } from "./provider";

export type IFireSignIn = (email:string, password:string)=> Promise<FirecodeSession> | FirecodeSession

export interface IFireIntegration {
    scope: string
    signIn:IFireSignIn
}