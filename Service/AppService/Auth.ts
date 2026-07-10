import { getPrivate, postPublic } from "../apiService";

export default async function logOutallDeviceService() {
  try {
    return await getPrivate("/auth/logout-all-devices");
  } catch (error) {
    throw error;
  }
}

export async function loginService(payload: any) {
  try {
    return await postPublic("/auth/login", payload);
  } catch (error) {
    throw error;
  }
}

export async function ChangePasswordService(payload: any) {
  try {
    return await postPublic("/auth/change-password", payload);
  } catch (error) {
    throw error;
  }
}

export async function LogoutService() {
  try {
    return await getPrivate("/auth/logout");
  } catch (error) {
    throw error;
  }
}
