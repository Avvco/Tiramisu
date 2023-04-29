const TOKEN: string = 'access_token';
const NAME: string = 'user_name';

export function getAccessToken(): string{
  if(localStorage.getItem(TOKEN) != null){
    return localStorage.getItem(TOKEN) as string;
  }
  return "";
}

export function setAccessToken(value: string){
  localStorage.removeItem(TOKEN);
  localStorage.setItem(TOKEN, value);
}

export function removeAccessToken(){
  localStorage.removeItem(TOKEN);
}

export function getUserName(): string{
  if(localStorage.getItem(NAME) != null){
    return localStorage.getItem(NAME) as string;
  }
  return "";
}

export function setUserName(value: string){
  localStorage.removeItem(NAME);
  localStorage.setItem(NAME, value);
}

export function removeUserName(){
  localStorage.removeItem(NAME);
}