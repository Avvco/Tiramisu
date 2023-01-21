const TOKEN: string = 'access_token';

export function getAccessToken(): string{
  if(localStorage.getItem(TOKEN) != null){
    return localStorage.getItem(TOKEN) as string;
  }
  return "";
}

export function setAccessToken(value: string){
  localStorage.setItem(TOKEN, value);
}

export function removeAccessToken(){
  localStorage.removeItem(TOKEN);
}