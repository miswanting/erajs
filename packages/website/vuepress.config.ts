import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { path } from "@vuepress/utils";
import { defaultTheme, defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  base: "/erajs/",
  lang: "en-US",
  title: "Era.js Game Engine",
  description: "Next-generation Hypertext Game Engine.",
  theme: defaultTheme({
    logo: "/favicon.svg",
    repo: "miswanting/erajs",
    locales: {
      "/": {
        selectLanguageName: "English(WIP)",
      },
      "/ja/": {
        selectLanguageName: "日本語(WIP)",
        selectLanguageText: "言語",
        selectLanguageAriaLabel: "言語",
      },
      "/zh-CN/": {
        selectLanguageName: "简体中文",
        selectLanguageText: "语言",
        selectLanguageAriaLabel: "语言",
        editLinkText: "编辑此页",
        docsBranch: "dev",
        lastUpdatedText: "更新时间",
        contributorsText: "作者",
        backToHome: "返回首页",
        notFound: ["你要找的页面不见了！"],
      },
      "/zh-TW/": {
        selectLanguageName: "繁體中文(WIP)",
        selectLanguageText: "語言",
        selectLanguageAriaLabel: "語言",
      },
    },
  }),
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  port: 80,
  locales: {
    "/": {
      lang: "en-US",
      title: "Era.js Game Engine",
      description: "Next-generation Hypertext Game Engine",
    },
    "/ja/": {
      lang: "ja-JP",
      title: "Era.js Game Engine",
      description: "次世代ハイパーテキストゲームエンジン",
    },
    "/zh-CN/": {
      lang: "zh-CN",
      title: "Era.js Game Engine",
      description: "次世代超文本游戏引擎",
    },
    "/zh-TW/": {
      lang: "zh-TW",
      title: "Era.js Game Engine",
      description: "次世代超文本遊戲引擎",
    },
  },
  plugins: [
    mdEnhancePlugin({
      flowchart: true,
      tasklist: true,
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "components"),
    }),
  ],
});
