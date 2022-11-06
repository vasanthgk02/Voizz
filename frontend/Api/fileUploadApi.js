import apiClient from "./client";
import * as FileSystem from "expo-file-system";

const fileUpload = async (uri) => {
  const response = await FileSystem.uploadAsync(
    "http://192.168.29.246:5000/analyze",
    uri,
    {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    }
  );
  return response;
};

export default { fileUpload };
