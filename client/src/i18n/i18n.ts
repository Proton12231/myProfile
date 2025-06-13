import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language } from "../utils/Enums";

export const DEFAULT_LANGUAGE = "zh-CN";

export const initI18n = () => {
  i18n
    .use(initReactI18next) // 使用react-i18next插件
    .use(HttpBackend) // 使用i18next-http-backend插件
    .use(LanguageDetector) // 使用i18next-browser-languagedetector插件
    .init({
      fallbackLng: DEFAULT_LANGUAGE, // 默认语言
      supportedLngs: Language.map((lang) => lang.code), // 支持的语言列表
      interpolation: {
        escapeValue: false, // 不转义HTML实体
      },
      detection: {
        order: ["localStorage", "navigator"], // 优先从localStorage中获取语言设置，如果localStorage中没有，则从浏览器语言设置中获取
        caches: ["localStorage"], // 缓存语言设置到localStorage中
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // 加载语言文件的路径
      },
    });
};
