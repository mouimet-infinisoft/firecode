import { v4 } from "uuid";
import * as vscode from "vscode";
import { globalContext } from "../extension";
import { fireSignInCommand } from "./signin/signin.command";
import { IFireIntegration, IFireSignIn } from "./types";

export class FireAuthProvider implements vscode.AuthenticationProvider {
  private subscribers: { [id: string]: Function };
  private sessions: FirecodeSession[];

  constructor(private integrations:  { [id: string]: IFireSignIn } = {}) {
    this.subscribers = {};
    this.sessions = [];
    this.loadPersistentSessions();
  }

  onDidChangeSessions: vscode.Event<vscode.AuthenticationProviderAuthenticationSessionsChangeEvent> =
    (listener) => {
      const id = v4();
      this.subscribers[id] = listener;

      return {
        dispose: () => {
          delete this.subscribers[id];
        },
      };
    };

  emitOnDidChangeSessions: vscode.EventEmitter<vscode.AuthenticationProviderAuthenticationSessionsChangeEvent> =
    {
      fire: (payload) => {
        for (let subscriber in this.subscribers) {
          this.subscribers[subscriber](payload);
        }

        this.updatePersistentSessions()
      },
      dispose: () => {},
      event: this.onDidChangeSessions,
    };

  registerIntegration(newIntegration: IFireIntegration) {
    this.integrations[newIntegration.scope] = newIntegration.signIn;
  }

  async signIn(email: string, password: string, scope: string) {

    const newSession = await this.integrations[scope](email, password)
        
    this.sessions.push(newSession);
    this.createSession(newSession.scopes);    

    this.emitOnDidChangeSessions.fire({
      added: [newSession],
      removed: [],
      changed: [],
    });
  } 

  getSessions(
    scopes?: readonly string[]
  ): Thenable<readonly vscode.AuthenticationSession[]> {
    if (scopes) {
      Promise.resolve(this.findScopedSession(scopes) || []);
    }
    return Promise.resolve(this.sessions);
  }

  createSession(
    scopes: readonly string[]
  ): Thenable<vscode.AuthenticationSession> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = this.findScopedSession(scopes);
        if (result) {
          resolve(result);         
        } else {
          await vscode.commands.executeCommand<void>(fireSignInCommand.name);
          result = this.findScopedSession(scopes);
          if (result) {
            resolve(result);
          }

          reject(`[Firecode]: Authentication failed!`);
        }
      } catch (error) {
        reject(error);
        console.error(`[Firecode]: Error, create session failed!`);
      }
    });
  }

  findScopedSession(
    scopes: readonly string[]
  ): vscode.AuthenticationSession | undefined {
    const joinedScopes = scopes.join(" ");
    return this.sessions.find((session) =>
      session.scopes.some((sessionScop) => joinedScopes.includes(sessionScop))
    );
  }

  updatePersistentSessions(){
    globalContext.secrets.store("sessions", JSON.stringify(this.sessions))
  }

  loadPersistentSessions(){
    globalContext.secrets.get("sessions")
    .then(result => {
      this.sessions =  result ? JSON.parse(result) : []
    })       
  }

  removeSession(sessionId: string): Thenable<void> {
    const removed = [] as vscode.AuthenticationSession[];
    this.sessions = this.sessions.filter((s) => {
      if (s.id.includes(sessionId)) {
        removed.push(s);
      }
      return !s.id.includes(sessionId);
    });

    this.emitOnDidChangeSessions.fire({
      added: [],
      removed,
      changed: [],
    });
    return Promise.resolve();
  }
}

export class FirecodeSession implements vscode.AuthenticationSession {
  constructor(
    public readonly id: string,
    public readonly accessToken: string,
    private readonly refreshToken: string,
    public readonly account: vscode.AuthenticationSessionAccountInformation,
    public readonly scopes: readonly string[]
  ) {}

  private isTokenExpired = (token: string) =>
    Date.now() >=
    JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp *
      1000;
  private refreshAccessToken = () => {};
}

export class FirecodeAccount
  implements vscode.AuthenticationSessionAccountInformation
{
  constructor(public readonly id: string, public readonly label: string) {}
}
