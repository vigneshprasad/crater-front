/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosResponse } from "axios";

import ApiClient from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import toBase64 from "@/common/utils/image/toBase64";

import { IProfileFormProps } from "../components/forms/ProfileForm";
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
  async postUserProfile(data: IProfileFormProps): Promise<AxiosResponse> {
    try {
      const {
        photo,
        name,
        introduction,
        education_level,
        other_tag,
        years_of_experience,
        sector,
      } = data;

      let postData: Record<string, unknown> = {
        photo,
        name,
        introduction,
        education_level: education_level?.value,
        other_tag: other_tag?.pk,
        years_of_experience: years_of_experience?.value,
        sector: sector?.value,
      };

      if (data.cover) {
        const coverResult = await this.postUserCoverFile(data.cover);
        postData = {
          ...postData,
          cover: coverResult.data.pk,
        };
      }

      const res = await ApiClient.post<Profile>(
        API_URL_CONSTANTS.user.profile,
        postData
      );

      return res;
    } catch (err: unknown) {
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
