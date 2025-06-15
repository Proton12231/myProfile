import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faUser,
  faCamera,
  faMoon,
  faArrowUp,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from "./LanguageSwitcher";

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
 * @description 移动端导航栏
 * @param {ThemeContextProps} themeContext 主题上下文
 * @returns {JSX.Element} 移动端导航栏
 */
const MobileNavBar = ({
  themeContext,
  setTitle,
}: {
  themeContext: ThemeContextProps;
  setTitle: (title: string) => void;
}) => {
  const { theme, toggleTheme } = themeContext; // 主题上下文
  const [showBackToTop, setShowBackToTop] = useState(false); // 是否显示返回顶部按钮

  // 监听滚动事件，控制返回顶部按钮的显示
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MobileNavBarContainer>
      <Content>
        <NavLinkButton to="/" onClick={() => setTitle("home")}>
          <FontAwesomeIcon icon={faUser} />
        </NavLinkButton>
        <NavLinkButton to="/posts" onClick={() => setTitle("posts")}>
          <FontAwesomeIcon icon={faCamera} />
        </NavLinkButton>
        <Divider />
        <ThemeButton onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </ThemeButton>
        <LanguageSwitcher popupPosition="top" />
        <BackToTopButton show={showBackToTop} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </BackToTopButton>
      </Content>
    </MobileNavBarContainer>
  );
};

export default MobileNavBar;
