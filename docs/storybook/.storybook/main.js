function storiesPath(component) {
  return `../../../packages/${component}/stories/*.mdx`;
}

module.exports = {
  core: {
    builder: "webpack5",
  },
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    "@apptane/react-ui-storybook-dark-mode",
  ],
  stories: [
    storiesPath("avatar"),
    storiesPath("badge"),
    storiesPath("banner"),
    storiesPath("behaviors"),
    storiesPath("bullet"),
    storiesPath("button"),
    storiesPath("calendar"),
    storiesPath("charts"),
    storiesPath("cue"),
    storiesPath("dialog"),
    storiesPath("divider"),
    storiesPath("form"),
    storiesPath("gauge"),
    storiesPath("icon"),
    storiesPath("input"),
    storiesPath("layout"),
    storiesPath("menu"),
    storiesPath("pane"),
    storiesPath("progress"),
    storiesPath("scroller"),
    storiesPath("selector"),
    storiesPath("side-panel"),
    storiesPath("sidebar"),
    storiesPath("skeleton"),
    storiesPath("spinner"),
    storiesPath("tableview"),
    storiesPath("tabs"),
    storiesPath("tag"),
    storiesPath("theme"),
    storiesPath("toaster"),
    storiesPath("toggle-group"),
    storiesPath("tooltip"),
    storiesPath("typography"),
    storiesPath("virtual-list"),
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
      },
      resolve: {
        ...config.resolve,
        exportsFields: ["devExports", "exports"],
      },
    };
  },
};
