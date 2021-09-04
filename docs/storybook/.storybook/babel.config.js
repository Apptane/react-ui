/**
 * Custom Babel configuration for Storybook
 *
 * This configuration is required for Storybook 6.x to function.
 * Storybook 6.x uses Emotion 10 internally and requires use of
 * "classic" way, while our library relies on "automatic" way
 * and Emotion 11
 */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "defaults",
      },
    ],
    "@emotion/babel-preset-css-prop",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
  ],
};
