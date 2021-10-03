module.exports = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  webpack5: true,

  images: {
    domains: ["openweathermap.org"],
  },

  webpack: (config, { dev, isServer, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: "esbuild-loader",
      options: { loader: "tsx", target: "esnext" },
    })

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    ) // Support JSX Transform per https://dev.to/rsa/speed-up-next-js-build-with-typescript-and-tailwind-css-418d

    return config
  },
}
