import fetch from "node-fetch";
import { v4 } from 'uuid';
import { FirecodeAccount, FirecodeSession } from "../provider";
import { IFireIntegration } from "../types";

const config = {
    APIURL: "https://api.overlay-tech.com",
    ROUTES: {
      login: "api/login",
      projects: "api/projects",
      components: (projectId: string, componentId: string) =>
        `api/projects/${projectId}/component-sets/${componentId}/components`,
    },
  };
  
export const fireIntegrationOverlay:IFireIntegration = {
scope: "overlay",
signIn: async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {

      try {
        console.log(`Signing in onverlay...`);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // REMOVE FOR RELEASE

        const response = await fetch(
          `${config.APIURL}/${config.ROUTES.login}`,
          {
            method: "POST",
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const { refresh_token, token } =
          (await response.json())

        resolve(new FirecodeSession(
          v4(),
          token,
          refresh_token,
          new FirecodeAccount(v4(), email),
          ["overlay"]
        ))
      } catch (error) {
        reject(`AuthenticationError`);
      }
    });
  }}
