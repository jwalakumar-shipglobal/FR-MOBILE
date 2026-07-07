import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import useProfileDetails from "../Zustand/useStore";
import { getPrivate } from "./Service/apiService";

export default function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const addProfileData = useProfileDetails(
    (state: any) => state.addProfileData,
  );
  const setBalance = useProfileDetails((state: any) => state.setBalance);

  async function BalanceApiCall() {
    try {
      const res = await getPrivate("/wallet/balance");
      setBalance(res?.data?.wallet_balance);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfileDeatils() {
    try {
      const res = await getPrivate("/auth/get-profile");
      if (res?.data) {
        addProfileData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkToken() {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken);
      if (storedToken) {
        await Promise.all([getProfileDeatils(), BalanceApiCall()]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
}
