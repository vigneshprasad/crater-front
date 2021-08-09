// @ts-check

const withFonts = require("next-fonts");

/**
 * @type {import("next/dist/next-server/server/config").NextConfig}
 **/
const nextConfig = {
  compression: true,
  reactStrictMode: true,
  experimental: {},
  future: {},
  i18n: {
    locales: ["en-IN"],
    defaultLocale: "en-IN",
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      const CircularDependencyPlugin = require("circular-dependency-plugin");

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
