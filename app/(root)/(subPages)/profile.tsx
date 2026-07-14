import SubPageLayout from "@/app/layout/subPageLayout";
import { Approved } from "@/assets/svg/KYCPendingSVG";
import AppAlertDialog from "@/components/Element/AlertDialogUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadFile, downloadFileByURL } from "@/lib/downloaderHelper";
import { formatDocumentValue, toSentenceCase } from "@/lib/utils";
import postPrivate, { getPrivate } from "@/Service/apiService";
import {
  ArrowDownToLine,
  IdCardLanyard,
  MapPin,
  SquarePen,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Profile() {
  const [profileData, setProfileData] = useState<any>({});
  const [billingAdderss, setBillingAddress] = useState<any>({});
  const [pickupAddress, setPickAddress] = useState<any>({});
  const [profileStatus, setProfileStatus] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const merchantAgreement =
    profileData?.agreement_documents_info?.["merchant-agreement"];

  async function getProfileDetails() {
    try {
      const res = await getPrivate("/auth/get-profile");
      setProfileData(res?.data);
    } catch (error) {
      throw error;
    }
  }

  async function getBillingAddress() {
    try {
      const res = await getPrivate("/auth/get-billing-address");
      setBillingAddress(res?.data);
    } catch (error) {
      throw error;
    }
  }

  async function getPickUpAddress() {
    try {
      const res = await getPrivate("/pickup/get-pickup-address");
      setPickAddress(res?.data?.[0]);
    } catch (error) {
      throw error;
    }
  }

  async function getStatuService() {
    try {
      const res = await getPrivate("/kyc/get-status");
      setProfileStatus(res?.data?.meta_data.kyc_documents);
    } catch (error) {
      throw error;
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

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        getProfileDetails(),
        getBillingAddress(),
        getPickUpAddress(),
        getStatuService(),
      ]);
    } catch (error: unknown) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SubPageLayout className="px-2">
      {loading ? (
        <View className="py-4 flex-col gap-y-5">
          <Skeleton className="h-14 w-1/3 rounded-lg bg-gray-300" />
          <Skeleton className="h-48 w-full rounded-lg bg-gray-300" />
          <Skeleton className="h-60 w-full rounded-lg bg-gray-300" />
          <Skeleton className="h-52 w-full rounded-lg bg-gray-300" />
        </View>
      ) : (
        <>
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
                <Text className="font-semibold text-xs">
                  {profileData.email}
                </Text>
              </View>
              <View className="px-3">
                <Text className="font-semibold text-xs text-gray-500">
                  Mobile Number
                </Text>
                <Text className="font-semibold text-xs">
                  {profileData.mobile}
                </Text>
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
                <KYCDocument
                  documentName="Aadhar"
                  documentkey="aadhar_front"
                  data={profileStatus}
                />
                <KYCDocument
                  documentName="GST"
                  documentkey="gst"
                  data={profileStatus}
                />
                <KYCDocument
                  documentName="Company PAN"
                  documentkey="pan"
                  data={profileStatus}
                />
                <KYCDocument
                  documentName="Signature"
                  documentkey="signature"
                  data={profileStatus}
                />
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-xs text-gray-500">
                      Merchant Agreement
                    </Text>
                    <Text className="font-semibold text-xs">
                      {merchantAgreement?.file_path ? "" : "Not Provided"}
                    </Text>
                  </View>
                  <Button
                    className="bg-transparent"
                    disabled={!merchantAgreement?.file_path}
                    onPress={() =>
                      downloadFileByURL(merchantAgreement.file_path)
                    }
                  >
                    <Text className="text-gray-600 text-xs">Download</Text>
                    <ArrowDownToLine size={13} color={"gray"} />
                  </Button>
                </View>
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
                <Text className="text-gray-700 text-xs">
                  {billingAddressDisplay}
                </Text>
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
                <EditPickUpAddress
                  pickupAddressDisplay={pickupAddressDisplay}
                />
              </View>
              <Separator className="bg-gray-300" />
              <View className="my-3">
                <Text className="text-black font-semibold">
                  {pickupAddress.firstname} {pickupAddress.lastname} |
                  {pickupAddress.mobile}
                </Text>
                <Text className="text-gray-700 text-xs">
                  {pickupAddressDisplay}
                </Text>
              </View>
            </View>
          </Card>
        </>
      )}
    </SubPageLayout>
  );
}

export function KYCDocument({
  documentName,
  documentkey,
  data,
}: {
  documentName: string;
  documentkey?: string;
  data: any;
}) {
  const document = Array.isArray(data)
    ? data.find((item) => item.document_type === documentkey)
    : undefined;

  async function handleDownload(uuid: string) {
    try {
      const response = await postPrivate("/kyc/download", {
        uuid,
      });

      await downloadFile({
        response,
        defaultFileName: "document",
      });

      Toast.show({
        type: "success",
        text1: "File downloaded successfully",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  }

  return (
    <View>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-gray-500">{documentName}</Text>
          <Text className="font-semibold text-xs">
            {formatDocumentValue(document?.document_value)}
          </Text>
        </View>
        <Button
          className="bg-transparent"
          onPress={() => {
            if (document?.uuid) {
              handleDownload(document.uuid);
            } else {
              Toast.show({
                type: "error",
                text1: "Document not found",
              });
            }
          }}
        >
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
    <AppAlertDialog
      title="Edit Pickup Address"
      description="Please verify the pickup address before continuing."
      actionText="Confirm"
      cancelText="Cancel"
      onAction={() => {
        console.log("Confirmed");
      }}
      contentClassName="bg-white rounded-3xl px-6 py-7 border-0"
      titleClassName="text-center text-xl font-bold text-slate-900"
      descriptionClassName="text-center text-gray-500 mt-2"
      footerClassName="mt-6"
      body={
        <View className="items-center mt-6">
          <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
            <MapPin size={30} color="#1e3a8a" />
          </View>
          <View className="mt-5 w-full rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <Text className="text-xs font-semibold text-blue-900 uppercase">
              Pickup Address
            </Text>

            <Text className="mt-2 text-[15px] leading-6 text-slate-700">
              {pickupAddressDisplay}
            </Text>
          </View>
        </View>
      }
    >
      <Button className="bg-transparent">
        <SquarePen size={20} color="#1e3a8a" />
      </Button>
    </AppAlertDialog>
  );
}
