import axios from 'axios'

import { TokenHandler } from '../using/token-handler';

let _TokenHandler = new TokenHandler();


const BASE: string = "https://spring-boot.tiramisu.localhost";

const LOGIN_REQUEST = axios.create({
  baseURL: BASE + "/login",
});

const LOGOUT_REQUEST = axios.create({
  baseURL: BASE + "/logout",
  headers:{
    Authorization: _TokenHandler.getAccessToken()
  }
});

const REGISTER_REQUEST = axios.create({
  baseURL: BASE + "/register",
});

const RECORD_REQUEST = axios.create({
  baseURL: BASE + "/forward_to_fhir/Patient",
  headers:{
    Authorization: _TokenHandler.getAccessToken()
  }
});

export const POST_LOGIN_API = (data: any) => LOGIN_REQUEST.post("", data);

export const GET_LOGOUT_API = () => LOGOUT_REQUEST.get("");

export const POST_REGISTER_API = (data: any) => REGISTER_REQUEST.post("", data);

export const POST_RECORD_API = (data: any) => RECORD_REQUEST.post("", data);

export const GET_RECORD_API = (searchVal: string) => RECORD_REQUEST.get("?identifier="+searchVal);
