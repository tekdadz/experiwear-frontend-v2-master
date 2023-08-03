
module.exports = {
  env: {
    CONFIG_ENV: process.env.CONFIG_ENV, // used to set config variables, since NODE_ENV is used to determine build type
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      });
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};
