// @ts-check

const withFonts = require("next-fonts");

/**
 * @type {import("next/dist/next-server/server/config").NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  future: {},
  i18n: {
    locales: ["en-IN"],
    defaultLocale: "en-IN",
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
        },
      ],
    });

    return config;
  },
};

module.exports = withFonts(nextConfig);
