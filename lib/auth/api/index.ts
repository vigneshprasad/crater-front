/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosResponse } from "axios";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import toBase64 from "@/common/utils/image/toBase64";

import { CoverFile, Profile } from "../types/auth";

const AuthApiClient = {
  async getPhoneOtp(
    phoneNumber: string
  ): Promise<AxiosResponse<{ message: string }>> {
    try {
      const res = await ApiClient.post<{ message: string }>(
        API_URL_CONSTANTS.auth.getOtp,
        {
          username: phoneNumber,
        }
      );
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  },
  async getUserProfile(pk: string): Promise<AxiosResponse<Profile>> {
    try {
      const res = await ApiClient.get<Profile>(
        `${API_URL_CONSTANTS.network.getUserProfile}${pk}/`
      );
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  },
  async postUserCoverFile(file: File): Promise<AxiosResponse<CoverFile>> {
    try {
      const base64File = await toBase64(file);
      const res = await ApiClient.post<CoverFile>(
        API_URL_CONSTANTS.auth.postProfileCoverFile,
        {
          file_base64: base64File,
        }
      );

      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  },
  async postProfilePicture(photo: File): Promise<AxiosResponse<Profile>> {
    try {
      const base64Image = await toBase64(photo);
      const res = await ApiClient.post<Profile>(
        API_URL_CONSTANTS.user.profile,
        {
          photo: base64Image,
        }
      );
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  },
  async postProfile(data: Partial<Profile>): Promise<AxiosResponse<Profile>> {
    try {
      const res = await ApiClient.post<Profile>(
        API_URL_CONSTANTS.user.profile,
        data
      );
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  },
};

export default AuthApiClient;
