import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../utils/Enums";

/**
 * @description 创建语言上下文
 */
const LanguageContext = createContext<{
  currentLanguage: string;
  setLanguage: (language: string) => void;
}>({
  currentLanguage: "zh-CN",
  setLanguage: () => {},
});

/**
 * @description 封装自定义 Hook，供组件使用
 */
export const useLanguage = () => {
  return useContext(LanguageContext);
};

/**
 * @description Provider组件,用于提供语言上下文
 * @param children 子组件
 * @returns 语言上下文
 */
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  /**
   * @description 封装语言切换函数
   */
  const setLanguage = (receivedLanguage: string) => {
    i18n.changeLanguage(receivedLanguage);
    setCurrentLanguage(receivedLanguage);

    // 设置文档方向并保存到localStorage
    const direction = receivedLanguage === "ug-CN" ? "rtl" : "ltr";
    document.dir = direction;
    localStorage.setItem("documentDirection", direction);
  };

  /**
   * @description 读取文档方向
   */
  const saveDocumentDirection = () => {
    // 恢复保存的文档方向
    const savedDirection = localStorage.getItem("documentDirection");
    if (savedDirection) {
      document.dir = savedDirection;
    } else {
      // 如果没有保存的方向，根据当前语言设置方向
      document.dir = currentLanguage === "ug-CN" ? "rtl" : "ltr";
    }
  };

  /**
   * @description 检测浏览器语言是不是与当前配置的语言相同，如不相同，弹出切换提示框
   */
  const detectLanguage = () => {
    const browserLanguage = navigator.language;
    if (
      Language.find((lang) => lang.code === browserLanguage) &&
      browserLanguage !== i18n.language &&
      sessionStorage.getItem("languagePrompt") !== "true"
    ) {
      window.confirm("当前语言与浏览器语言不一致，请切换语言");
      sessionStorage.setItem("languagePrompt", "true");
    }
  };

  /**
   * @description 初始化时读取localStorage语言和方向设置
   */
  useEffect(() => {
    saveDocumentDirection();
    detectLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
