import httpService from "./httpservice";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";


export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

setTokenHeader();

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credentials) {
  const response = await httpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  setTokenHeader();

  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const usersService = {
  createUser,
  loginUser,
  logout,
  getJWT,
  getUser,
};

export default usersService;
