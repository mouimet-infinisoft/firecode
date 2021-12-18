interface IAuthenticationResult {
    token: string
    refresh_token:string
}

interface IAuthenticator {
    login(email:string, password:string): Promise<IAuthenticationResult> | IAuthenticationResult
}