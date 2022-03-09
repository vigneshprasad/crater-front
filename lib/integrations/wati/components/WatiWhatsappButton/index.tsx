import { useEffect } from "react";

export default function WatiWhatsappButton(): JSX.Element | null {
  useEffect(() => {
    const url =
      "https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?74821";
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = url;
    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#9145ff",
        ctaText: "Need Help?",
        borderRadius: "25",
        marginLeft: "0",
        marginBottom: "50",
        marginRight: "50",
        position: "right",
      },
      brandSetting: {
        brandName: "Crater.Club",
        brandSubTitle: "Typically replies within a few hours",
        brandImg:
          "https://1worknetwork-prod.s3.ap-south-1.amazonaws.com/media/logo_2.png",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText:
          "Hello, I have a question about my bid placed. I am currently on the {{page_title}} page and facing an issue.",
        backgroundColor: "#0e0e10",
        ctaText: "Start Chat",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "919930474469",
      },
    };
    s.onload = function () {
      // @ts-expect-error: lib function
      window.CreateWhatsappChatWidget(options);
    };
    const x = document.getElementsByTagName("script")[0];
    x?.parentNode?.insertBefore(s, x);
  }, []);

  return null;
}
