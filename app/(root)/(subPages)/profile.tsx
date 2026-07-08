import SubPageLayout from "@/app/layout/subPageLayout";
import { Approved } from "@/assets/svg/KYCPendingSVG";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toSentenceCase } from "@/lib/utils";
import { getPrivate } from "@/Service/apiService";
import {
  ArrowDownToLine,
  IdCardLanyard,
  MapPin,
  SquarePen,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const [profileData, setProfileData] = useState<any>({});
  const [billingAdderss, setBillingAddress] = useState<any>({});
  const [pickupAddress, setPickAddress] = useState<any>({});

  async function getProfileDetails() {
    try {
      const res = await getPrivate("/auth/get-profile");
      setProfileData(res?.data);
    } catch (error) {
      console.error("profile Error: ", error);
    }
  }

  async function getBillingAddress() {
    try {
      const res = await getPrivate("/auth/get-billing-address");
      setBillingAddress(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPickUpAddress() {
    try {
      const res = await getPrivate("/pickup/get-pickup-address");
      setPickAddress(res?.data?.[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const pickupAddressDisplay = [
    pickupAddress?.address_nickname,
    pickupAddress?.address,
    pickupAddress?.landmark,
    pickupAddress?.locality,
    pickupAddress?.city,
    pickupAddress?.state_name,
    pickupAddress?.postcode,
  ]
    .filter((part) => part)
    .map((part) => toSentenceCase(part))
    .join(", ");

  const billingAddressDisplay = [
    billingAdderss?.address,
    billingAdderss?.city,
    billingAdderss?.state_name,
    "INDIA",
    billingAdderss?.postcode,
  ]
    .filter((part) => part)
    .join(", ");

  useEffect(() => {
    getProfileDetails();
    getBillingAddress();
    getPickUpAddress();
  }, []);

  return (
    <SubPageLayout className="px-2">
      <View>
        <Text className="text-2xl font-semibold my-2">Profile</Text>
      </View>
      <Card className="bg-white border-transparent px-2">
        <View className="gap-y-4 border rounded-lg px-2 py-3 border-gray-300">
          <View className="flex-row items-center gap-x-2">
            <View className="p-3 rounded-full bg-blue-900 ">
              <User color={"white"} />
            </View>
            <View>
              <Text className="text-gray-500">Name</Text>
              <Text className="w-32 text-xs font-semibold text-gray-800">
                {profileData.firstname} {profileData.lastname}
              </Text>
            </View>
          </View>
          <View className="px-3">
            <Text className="font-semibold text-xs text-gray-500">
              Email Id
            </Text>
            <Text className="font-semibold text-xs">{profileData.email}</Text>
          </View>
          <View className="px-3">
            <Text className="font-semibold text-xs text-gray-500">
              Mobile Number
            </Text>
            <Text className="font-semibold text-xs">{profileData.mobile}</Text>
          </View>
        </View>
        <View className="border border-gray-300 px-3 py-1 rounded-lg">
          <View className="flex-row items-center justify-between h-11">
            <View className="flex-row items-center">
              <View className="bg-red-400/50 p-1.5 rounded-lg">
                <IdCardLanyard size={18} color={"red"} />
              </View>
              <Text className="text-base font-semibold ms-2">
                KYC Documents
              </Text>
            </View>
            <KycBadge kyc_status={profileData.kyc_status} />
          </View>
          <Separator className="bg-gray-300" />
          <View className="my-3">
            <KYCDocument documentName="Aadhar" provided="Not Provided" />
            <KYCDocument documentName="GST" provided="Not Provided" />
            <KYCDocument documentName="Company PAN" provided="Not Provided" />
            <KYCDocument documentName="Signature" provided="Not Provided" />
            <KYCDocument
              documentName="Merchant Agreement"
              provided="Not Provided"
            />
          </View>
        </View>
        <View className="border border-gray-300 px-3 py-1 rounded-lg">
          <View className="flex-row items-center justify-between h-11">
            <View className="flex-row items-center">
              <View className="bg-green-400/50 p-1.5 rounded-md">
                <MapPin size={18} color={"green"} />
              </View>
              <Text className="text-base font-semibold ms-1">
                Billing Address
              </Text>
            </View>
          </View>
          <Separator className="bg-gray-300" />
          <View className="my-3">
            <Text className="text-black font-semibold">
              {billingAdderss.company}
            </Text>
            <Text className="text-gray-700">{billingAddressDisplay}</Text>
          </View>
        </View>
        <View className="border border-gray-300 px-3 py-1 rounded-lg">
          <View className="flex-row items-center justify-between h-11">
            <View className="flex-row items-center">
              <View className="bg-red-400/50 p-1.5 rounded-md">
                <MapPin size={18} color={"red"} />
              </View>
              <Text className="text-base font-semibold ms-1">
                Pickup Address
              </Text>
            </View>
            <EditPickUpAddress pickupAddressDisplay={pickupAddressDisplay} />
          </View>
          <Separator className="bg-gray-300" />
          <View className="my-3">
            <Text className="text-black font-semibold">
              {pickupAddress.firstname} {pickupAddress.lastname} |
              {pickupAddress.mobile}
            </Text>
            <Text className="text-gray-700 ">{pickupAddressDisplay}</Text>
          </View>
        </View>
      </Card>
    </SubPageLayout>
  );
}

export function KYCDocument({
  documentName,
  provided,
}: {
  documentName: string;
  provided: string;
}) {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-gray-500">{documentName}</Text>
          <Text className="font-semibold text-xs">{provided}</Text>
        </View>
        <Button className="bg-transparent">
          <Text className="text-gray-600 text-xs">Download</Text>
          <ArrowDownToLine size={13} color={"gray"} />
        </Button>
      </View>
    </View>
  );
}

const KycBadge = ({ kyc_status }: { kyc_status: string }) => {
  const getKYCStatusClass = (status: string) => {
    switch (status) {
      case "rejected":
        return "bg-pink-100 border-pink-600 text-pink-600";
      case "submitted":
        return "bg-yellow-100 border-secondary text-secondary";
      case "partial":
        return "bg-orange-50 text-orange-600 border-orange-600";
      default:
        return "bg-green-50 text-green-600 border-green-600";
    }
  };
  return (
    <Badge
      className={`flex gap-x-2 ml-2 mt-0.5 font-medium ${getKYCStatusClass(kyc_status)}`}
    >
      <Text className={`${getKYCStatusClass(kyc_status)}`}>
        {toSentenceCase(kyc_status ? "Approved" : kyc_status)}
        {kyc_status === "approved" && <Approved />}
      </Text>
    </Badge>
  );
};

export function EditPickUpAddress({
  pickupAddressDisplay,
}: {
  pickupAddressDisplay: any;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent">
          <SquarePen size={20} color={"#1e3a8a"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] bg-white border-transparent">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Edit Pickup Address
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to edit the pickup address:
          </AlertDialogDescription>
          <AlertDialogTitle className="text-black text-xs">
            {pickupAddressDisplay}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <Button className="bg-blue-900">
            <Text className="text-white">Confirm</Text>
          </Button>
          <AlertDialogCancel asChild>
            <Button className="border border-blue-900 bg-transparent">
              <Text className="text-blue-900">Cancel</Text>
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
