import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";

type DownloadOptions = {
  response: any;
  defaultFileName?: string;
  openAfterDownload?: boolean;
};

export const downloadFile = async ({
  response,
  defaultFileName = "download",
  openAfterDownload = true,
}: DownloadOptions) => {
  try {
    let fileName = defaultFileName;
    const disposition = response.headers["content-disposition"];

    if (disposition) {
      const match = disposition.match(
        /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/i
      );

      if (match?.[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    const contentType = response.headers["content-type"] ?? "";

    // add extension if backend didn't send one
    if (!fileName.includes(".")) {
      if (contentType.includes("pdf")) fileName += ".pdf";
      else if (contentType.includes("png")) fileName += ".png";
      else if (contentType.includes("jpeg")) fileName += ".jpg";
      else if (contentType.includes("csv")) fileName += ".csv";
      else if (contentType.includes("spreadsheet")) fileName += ".xlsx";
      else if (contentType.includes("zip")) fileName += ".zip";
    }

    const bytes = Buffer.from(response.data);
    const base64 = bytes.toString("base64");
    const fileUri = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Saved:", fileUri);

    if (openAfterDownload && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(fileUri);
    }

    return fileUri;
  } catch (error) {
    console.log("Download Error:", error);
    throw error;
  }
};