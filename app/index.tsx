import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { getPrivate } from "../Service/apiService";
import useProfileDetails from "../Zustand/useStore";

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
    setLoading(true);
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
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="h-20 bg-white border-b border-gray-200 px-4 flex-row items-center justify-between">
          <View className="h-8 w-36 bg-gray-300 rounded-md" />
          <View className="flex-row items-center gap-4">
            <View className="h-6 w-24 bg-gray-300 rounded-md" />
            <View className="h-12 w-12 bg-gray-300 rounded-full" />
          </View>
        </View>
        <View className="flex-1 px-4 pt-4">
          <View className="flex-row justify-between items-center mb-4">
            <View className="h-8 w-36 bg-gray-300 rounded-md" />
            <View className="h-6 w-20 bg-gray-300 rounded-md" />
          </View>
          <View className="flex-row flex-wrap justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <View
                key={index}
                className={`h-48 bg-gray-300 rounded-2xl mb-4 ${
                  index === 4 ? "w-[48%]" : "w-[48%]"
                }`}
              />
            ))}
          </View>
          <View className="bg-white rounded-2xl p-4 mt-2">
            <View className="h-8 w-44 bg-gray-300 rounded-md mb-4" />
            <View className="h-32 bg-gray-300 rounded-xl" />
          </View>
        </View>
        <View className="h-20 bg-white border-t border-gray-200 flex-row justify-around items-center">
          {[1, 2, 3, 4].map((item) => (
            <View key={item} className="items-center">
              <View className="h-6 w-6 bg-gray-300 rounded-md mb-2" />
              <View className="h-3 w-12 bg-gray-300 rounded" />
            </View>
          ))}
          <View className="absolute self-center -top-6">
            <View className="h-16 w-16 bg-gray-400 rounded-full" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (token) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
}
