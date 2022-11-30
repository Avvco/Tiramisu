export class TokenHandler{
    token: string;

    constructor(){
      this.token = 'access_token';
    }

    public getAccessToken(): string{
      if(localStorage.getItem(this.token) != null){
        return localStorage.getItem(this.token) as string;
      }
      return "";
    }

    public setAccessToken(value: string){ 
        localStorage.setItem(this.token, value);
    }

    public removeAccessToken(){ 
        localStorage.removeItem(this.token);
    }
}