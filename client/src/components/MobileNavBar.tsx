import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faUser,
  faCamera,
  faMoon,
  faArrowUp,
  faSun,
  faLanguage,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Language } from "../utils/Enums";
import { useLanguage } from "../context/LanguageContext";

/**
 * @description 主题上下文类型
 */
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

/**
 * @description 移动端导航栏容器
 */
const MobileNavBarContainer = styled.div`
  display: none;
  position: fixed;
  bottom: ${(props) => props.theme.spacingLg};
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.cardBg};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 50px;
  padding: 8px 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: auto;
  max-width: 90%;
  transition: ${(props) => props.theme.transition};
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 20px);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 576px) {
    padding: 6px 12px;
  }
`;

/**
 * @description 移动端导航栏内容
 */
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  transition: ${(props) => props.theme.transition};
  position: relative;

  @media (max-width: 576px) {
    gap: 12px;
  }
`;

/**
 * @description 移动端导航栏分割线
 */
const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${(props) => props.theme.borderColor};
`;

/**
 * @description 移动端导航栏按钮
 */
const NavLinkButton = styled(NavLink)`
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

  &.active {
    color: ${(props) => props.theme.primaryColor};
    background: ${(props) => props.theme.primaryLight};
  }

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
 * @description 移动端导航栏主题按钮
 */
const ThemeButton = styled.button`
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
 * @description 移动端导航栏返回顶部按钮的属性
 */
interface BackToTopButtonProps {
  show: boolean;
}

/**
 * @description 移动端导航栏返回顶部按钮
 */
const BackToTopButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "show",
})<BackToTopButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.show ? "40px" : "0")};
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
  font-size: 1.2rem;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transform: ${(props) => (props.show ? "scale(1)" : "scale(0)")};
  margin-left: ${(props) => (props.show ? "0" : "-8px")};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  position: relative;
  z-index: 2;

  svg {
    transition: ${(props) => props.theme.transition};
  }

  &:hover svg {
    transform: scale(1.2);
  }

  @media (max-width: 576px) {
    width: ${(props) => (props.show ? "36px" : "0")};
    height: 36px;
    font-size: 1.1rem;
  }
`;

/**
 * @description 移动端导航栏切换语言按钮
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
  shouldForwardProp: (prop) => prop !== "show",
})<{ show: boolean }>`
  position: absolute;
  bottom: 60px;
  right: -12px;
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
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(10px)")};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: ${(props) => props.theme.transition};

  &:before {
    content: "";
    position: absolute;
    bottom: -10px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: ${(props) => props.theme.cardBg};
    border-right: 1px solid ${(props) => props.theme.borderColor};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    transform: rotate(45deg);
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
 * @description 移动端导航栏
 * @param {ThemeContextProps} themeContext 主题上下文
 * @returns {JSX.Element} 移动端导航栏
 */
const MobileNavBar = ({
  themeContext,
}: {
  themeContext: ThemeContextProps;
}) => {
  const { theme, toggleTheme } = themeContext; // 主题上下文
  const { currentLanguage, setLanguage } = useLanguage(); // 语言上下文
  const [showBackToTop, setShowBackToTop] = useState(false); // 是否显示返回顶部按钮
  const [showLanguagePopup, setShowLanguagePopup] = useState(false); // 是否显示语言选择气泡框
  const languagePopupRef = useRef<HTMLDivElement>(null); // 语言选择气泡框引用
  const languageBtnRef = useRef<HTMLButtonElement>(null); // 语言选择按钮引用

  // 监听滚动事件，控制返回顶部按钮的显示
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 切换语言选择气泡框显示状态
  const toggleLanguagePopup = () => {
    setShowLanguagePopup(!showLanguagePopup);
  };

  return (
    <MobileNavBarContainer>
      <Content>
        <NavLinkButton to="/">
          <FontAwesomeIcon icon={faUser} />
        </NavLinkButton>
        <NavLinkButton to="/posts">
          <FontAwesomeIcon icon={faCamera} />
        </NavLinkButton>
        <Divider />
        <ThemeButton onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </ThemeButton>
        <ChangeLanguageButton
          ref={languageBtnRef}
          onClick={toggleLanguagePopup}
        >
          <FontAwesomeIcon icon={faLanguage} />
          <LanguagePopup show={showLanguagePopup} ref={languagePopupRef}>
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
        <BackToTopButton show={showBackToTop} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </BackToTopButton>
      </Content>
    </MobileNavBarContainer>
  );
};

export default MobileNavBar;
