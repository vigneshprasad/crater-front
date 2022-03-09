import { AxiosError } from "axios";
import { GetSessionOptions } from "next-auth/client";

import API from "@/common/api";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { ApiResult } from "@/common/types/api";

import { Payment, StripePaymentIntent } from "../types/payments";

interface IPaymentApiClient {
  postPayment: (
    payment: Partial<Payment>
  ) => Promise<ApiResult<Payment, AxiosError>>;
  createStripePaymentIntent: (
    payment: number,
    amount: number,
    product_id: number
  ) => Promise<ApiResult<StripePaymentIntent, AxiosError>>;
  retrieveStripeIntent: (
    client_secret: string
  ) => Promise<ApiResult<StripePaymentIntent, AxiosError>>;
}

export default function PaymentApiClient(
  context?: GetSessionOptions
): IPaymentApiClient {
  const client = API(context);

  async function postPayment(
    payment: Partial<Payment>
  ): Promise<ApiResult<Payment, AxiosError>> {
    try {
      const { data } = await client.post<Payment>(
        API_URL_CONSTANTS.payments.postPayment,
        JSON.stringify(payment)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function createStripePaymentIntent(
    payment: number,
    amount: number,
    product_id: number
  ): Promise<ApiResult<StripePaymentIntent, AxiosError>> {
    try {
      const { data } = await client.post<StripePaymentIntent>(
        API_URL_CONSTANTS.payments.createStripeIntent,
        JSON.stringify({
          payment,
          amount: amount * 100,
          product_id,
        })
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  async function retrieveStripeIntent(
    client_secret: string
  ): Promise<ApiResult<StripePaymentIntent, AxiosError>> {
    try {
      const { data } = await client.get<StripePaymentIntent>(
        API_URL_CONSTANTS.payments.retrieveStripeIntent(client_secret)
      );
      return [data, undefined];
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return { postPayment, createStripePaymentIntent, retrieveStripeIntent };
}
