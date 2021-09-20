/* eslint-disable @typescript-eslint/no-var-requires */
const CircularDependencyPlugin = require("circular-dependency-plugin");
const withFonts = require("next-fonts");

// @ts-check

/**
 * @type {import("next/dist/next-server/server/config").NextConfig}
 **/
const nextConfig = {
  trailingSlash: true,
  compression: true,
  reactStrictMode: true,
  experimental: {},
  future: {},
  images: {
    domains: [
      "randomuser.me",
      "1worknetwork-dev.s3.amazonaws.com",
      "1worknetwork-prod.s3.ap-south-1.amazonaws.com",
      "1worknetwork-prod.s3.amazonaws.com",
      "1worknetwork-pre.s3.amazonaws.com",
      "1worknetwork-stage.s3.amazonaws.com",
    ],
  },
  i18n: {
    locales: ["en-IN"],
    defaultLocale: "en-IN",
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          failOnError: true,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        })
      );
    }

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
