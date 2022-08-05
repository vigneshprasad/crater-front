import { Profile, User } from "next-auth";

import { PastStreamListItem, Webinar } from "@/community/types/community";

interface ISocialShareUtilsProps {
  user?: User;
  webinar?: Webinar | PastStreamListItem;
  profile?: Profile;
  customUrl?: string;
}

interface ISocialShareUtils {
  getLinkedInShareLink: () => string;
  getTwitterShareLink: () => string;
  getWhatsappShareLink: () => string;
}

export default function SocialShareUtils({
  webinar,
  user,
  profile,
  customUrl,
}: ISocialShareUtilsProps): ISocialShareUtils {
  const url = new URL(window.location.href);
  url.searchParams.delete("tab");

  const shareText = `Watch livestream on "${webinar?.topic_detail.name}" on Crater.\n\n`;

  function getLinkedInShareLink(): string {
    const utmSource = "LinkedIn";
    url.searchParams.set("utm_source", utmSource);
    user && url.searchParams.set("referrer_id", user.pk);
    const shareUrl = customUrl ?? url.toString();

    return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      shareUrl
    )}&title=${webinar?.topic_detail?.name}`;
  }

  function getTwitterShareLink(): string {
    const utmSource = "Twitter";
    url.searchParams.set("utm_source", utmSource);
    user && url.searchParams.set("referrer_id", user.pk);
    const shareUrl = customUrl ?? url.toString();

    return `https://twitter.com/share?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
  }

  function getWhatsappShareLink(): string {
    const utmSource = "WhatsApp";
    url.searchParams.set("utm_source", utmSource);
    user && url.searchParams.set("referrer_id", user.pk);
    const shareUrl = customUrl ?? url.toString();

    return `https://api.whatsapp.com/send?text=${
      user && !profile?.is_creator
        ? encodeURIComponent(`${shareText}\n\n`)
        : encodeURIComponent(`${shareText}\n\n`)
    }${encodeURIComponent(shareUrl)}`;
  }

  return {
    getLinkedInShareLink,
    getTwitterShareLink,
    getWhatsappShareLink,
  };
}
