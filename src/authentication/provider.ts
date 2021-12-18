import fetch from "node-fetch";
import { uuid } from "uuidv4";
import * as vscode from "vscode";
import { config } from "../config/internal";

export class FireAuthProvider implements vscode.AuthenticationProvider {
  static scopes = ["default"];
  private subscribers: { [id: string]: Function };
  private sessions: FirecodeSession[];

  constructor() {
    this.subscribers = {};
    this.sessions = [];
  }

  onDidChangeSessions: vscode.Event<vscode.AuthenticationProviderAuthenticationSessionsChangeEvent> =
    (listener) => {
      const id = uuid();
      this.subscribers[id] = listener;

      return {
        dispose: () => {
          delete this.subscribers[id];
        },
      };
    };

  isAuthenticated() {
    return this.sessions?.[0].isAuthenticated;
  }

  session() {
    return this.sessions?.[0];
  }

  login(email: string, password: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log(`Loging in...`);
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
          (await response.json()) as IAuthenticationResult;

          const newSession = new FirecodeSession(
            uuid(),
            token,
            refresh_token,
            true,
            new FirecodeAccount(uuid(), email),
            FireAuthProvider.scopes
          )
        this.sessions.push(newSession);

        this.createSession(FireAuthProvider.scopes);

        for (let subscriber in this.subscribers) {
          this.subscribers[subscriber]({added:[newSession]});
        }

        console.log(`Authentication Success!`);

        resolve();
      } catch (error) {
        console.error(`Error, authentication failed!`);
        reject(`AuthenticationError`);
      }
    });
  }

  getSessions(
    scopes?: readonly string[]
  ): Thenable<readonly vscode.AuthenticationSession[]> {
    return Promise.resolve(this.sessions);
  }

  createSession(
    scopes: readonly string[]
  ): Thenable<vscode.AuthenticationSession> {
    return Promise.resolve(this.session());
  }

  removeSession(sessionId: string): Thenable<void> {
    this.sessions = this.sessions.filter((s) => !s.id.includes(sessionId));
    return Promise.resolve();
  }
}

class FirecodeSession implements vscode.AuthenticationSession {
  constructor(
    public readonly id: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly isAuthenticated: boolean,
    public readonly account: vscode.AuthenticationSessionAccountInformation,
    public readonly scopes: readonly string[]
  ) {}
}

class FirecodeAccount
  implements vscode.AuthenticationSessionAccountInformation
{
  constructor(public readonly id: string, public readonly label: string) {}
}
