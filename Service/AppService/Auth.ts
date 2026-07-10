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
