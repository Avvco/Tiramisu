import axios from 'axios'

import { getAccessToken } from './UserTokenHandler';


const BASE: string = "https://spring-boot.tiramisu.localhost";

const LOGIN_REQUEST = axios.create({
  baseURL: BASE + "/login",
});

const LOGOUT_REQUEST = axios.create({
  baseURL: BASE + "/logout",
  headers: {
    Authorization: getAccessToken()
  }
});

const REGISTER_REQUEST = axios.create({
  baseURL: BASE + "/register",
});

const RECORD_REQUEST = axios.create({
  baseURL: BASE + "/forward_to_fhir/Patient",
  headers: {
    Authorization: getAccessToken()
  }
});

const OBSERVATION_REQUEST = axios.create({
  baseURL: BASE + "/forward_to_fhir/Observation",
  headers: {
    Authorization: getAccessToken()
  }
});

const MEDICATION_REQUEST = axios.create({
  baseURL: BASE + "/forward_to_fhir/Medication",
  headers: {
    Authorization: getAccessToken()
  }
});

export const POST_LOGIN_API = (data: any) => LOGIN_REQUEST.post("", data);

export const GET_LOGOUT_API = () => LOGOUT_REQUEST.get("");

export const POST_REGISTER_API = (data: any) => REGISTER_REQUEST.post("", data);

export const POST_RECORD_API = (data: any) => RECORD_REQUEST.post("", data);

export const GET_RECORD_API = (searchVal: string) => RECORD_REQUEST.get("?identifier=" + searchVal);

export const GET_ALL_RECORD_API = () => RECORD_REQUEST.get("/$everything?_count=200");

export const POST_OBSERVATION_API = (data: any) => OBSERVATION_REQUEST.post("", data);

export const GET_OBSERVATION_API = (searchVal: string) => OBSERVATION_REQUEST.get("/_search?identifier=" + searchVal);

export const POST_MEDICATION_API = (data: any) => MEDICATION_REQUEST.post("", data);

export const GET_MEDICATION_API = (searchVal: string) => MEDICATION_REQUEST.get("/_search?identifier=" + searchVal);