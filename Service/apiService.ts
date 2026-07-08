import api from "./api";

const postPrivate = async (url: string, payload?: any) => {
  const res = await api.post(url, payload);
  return res.data;
};

export default postPrivate;

export const getPrivate = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

export const postPublic = async (url: string, payload: any) => {
  const res = await api.post(url, payload);
  return res.data;
};

export const getPublic = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

export const uploadPrivate = async (url: string, payload: FormData) => {
  const res = await api.post(url, payload);
  return res.data;
};
