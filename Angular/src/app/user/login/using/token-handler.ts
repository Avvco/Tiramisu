export class tokenHandler{
    token: string;

    constructor(){
      this.token = 'access_token';
    }

    public getAccessToken(){
        return localStorage.getItem(this.token);
    }

    public setAccessToken(value: string){ 
        localStorage.setItem(this.token, value);
    }

    public removeAccessToken(){ 
        localStorage.removeItem(this.token);
    }
}