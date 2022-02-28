import { signin, SignInResponse, signOut } from "next-auth/client";
import { CredentialProviderId } from "pages/api/auth/[...nextauth]";

export async function Login(
  provider: CredentialProviderId,
  data: Record<string, unknown>
): Promise<SignInResponse | undefined> {
  if (provider === "phone-auth") {
    const { phoneNumber, otp, utmSource, utmCampaign, utmMedium, referrerId } =
      data;
    try {
      await signin<CredentialProviderId>("phone-auth", {
        username: phoneNumber,
        otp,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        utm_medium: utmMedium,
        referrer_id: referrerId,
        redirect: false,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  if (provider === "user-update") {
    const { user, token } = data;
    try {
      await signin<CredentialProviderId>("user-update", {
        user,
        token,
        redirect: false,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  return undefined;
}

export async function Logout(): Promise<void> {
  await signOut({ redirect: false });
}
