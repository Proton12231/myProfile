import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Language } from "../utils/Enums";
import { useLanguage } from "../context/LanguageContext";

/**
 * @description 切换语言按钮
 */
const ChangeLanguageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  position: relative;
  z-index: 2;

  svg {
    transition: ${(props) => props.theme.transition};
  }

  &:hover svg {
    transform: scale(1.2);
  }

  @media (max-width: 576px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

/**
 * @description 语言选择气泡框
 */
const LanguagePopup = styled.div.withConfig({
  shouldForwardProp: (prop) => !["show", "position", "isRtl"].includes(prop),
})<{ show: boolean; position: "top" | "bottom"; isRtl: boolean }>`
  position: absolute;
  ${(props) => (props.position === "top" ? "bottom: 60px;" : "top: 60px;")}
  ${(props) => (props.isRtl ? "left: -12px;" : "right: -12px;")}
  background: ${(props) => props.theme.cardBg};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px;
  width: 150px;
  z-index: 1001;
  opacity: ${(props) => (props.show ? "1" : "0")};
  transform: ${(props) =>
    props.show
      ? "translateY(0)"
      : `translateY(${props.position === "top" ? "10px" : "-10px"})`};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: ${(props) => props.theme.transition};

  &:before {
    content: "";
    position: absolute;
    ${(props) => (props.position === "top" ? "bottom: -10px;" : "top: -10px;")}
    ${(props) => (props.isRtl ? "left: 20px;" : "right: 20px;")}
    width: 16px;
    height: 16px;
    background: ${(props) => props.theme.cardBg};
    border-right: 1px solid ${(props) => props.theme.borderColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    transform: ${(props) =>
      props.position === "top" ? "rotate(45deg)" : "rotate(225deg)"};
  }
`;

/**
 * @description 语言选项
 */
const LanguageOption = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  background: ${(props) =>
    props.active ? props.theme.primaryLight : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.primaryColor : props.theme.textColor};

  &:hover {
    background: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.primaryColor};
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

/**
 * @description 语言切换组件
 * @param {string} props.position - 气泡位置
 * @returns {JSX.Element} 语言切换组件
 */
const LanguageSwitcher: React.FC<{ popupPosition: "top" | "bottom" }> = ({
  popupPosition,
}) => {
  const { currentLanguage, setLanguage } = useLanguage(); // 语言上下文
  const [showLanguagePopup, setShowLanguagePopup] = useState(false); // 是否显示语言选择气泡框
  const languagePopupRef = useRef<HTMLDivElement>(null); // 语言选择气泡框引用
  const languageBtnRef = useRef<HTMLButtonElement>(null); // 语言选择按钮引用
  const isRtl = document.dir === "rtl"; // 是否为RTL布局

  // 监听点击事件，点击外部关闭语言选择气泡框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languagePopupRef.current &&
        languageBtnRef.current &&
        !languagePopupRef.current.contains(event.target as Node) &&
        !languageBtnRef.current.contains(event.target as Node)
      ) {
        setShowLanguagePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 切换语言选择气泡框显示状态
  const toggleLanguagePopup = () => {
    setShowLanguagePopup(!showLanguagePopup);
  };

  return (
    <ChangeLanguageButton ref={languageBtnRef} onClick={toggleLanguagePopup}>
      <FontAwesomeIcon icon={faLanguage} />
      <LanguagePopup
        show={showLanguagePopup}
        ref={languagePopupRef}
        position={popupPosition}
        isRtl={isRtl}
      >
        {Language?.map((lang) => (
          <LanguageOption
            key={lang.code}
            active={currentLanguage === lang.code}
            onClick={() => {
              setLanguage(lang.code);
              setShowLanguagePopup(false);
            }}
          >
            {lang.name}
            {currentLanguage === lang.code && (
              <FontAwesomeIcon icon={faCheck} size="sm" />
            )}
          </LanguageOption>
        ))}
      </LanguagePopup>
    </ChangeLanguageButton>
  );
};

export default LanguageSwitcher;
