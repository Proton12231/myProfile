import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import MobileNavBar from "../components/MobileNavBar";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from "../components/LanguageSwitcher";

/**
 * @description 主布局类型
 * @returns {*}
 */
interface MainLayoutProps {
  children: React.ReactNode;
  themeContext: { theme: string; toggleTheme: () => void };
}

/**
 * @description 应用容器
 */
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacingMd};
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: hidden; /* 防止RTL模式下的溢出 */

  @media (min-width: 992px) {
    flex-direction: row;
    gap: ${(props) => props.theme.spacingLg};
    padding: ${(props) => props.theme.spacingLg};
  }

  /* 移动端时， 侧边栏固定， 内容区域自适应 */
  @media (max-width: 991px) {
    padding-top: ${(props) => props.theme.spacingMd};
    padding-bottom: ${(props) => `calc(${props.theme.spacingLg} *2 + 56px )`};
  }

  @media (max-width: 576px) {
    padding-left: ${(props) => props.theme.spacingSm};
    padding-right: ${(props) => props.theme.spacingSm};
  }
`;

const MainContainer = styled.main`
  flex: 1;
  padding: 0 ${(props) => props.theme.spacingMd};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacingLg};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacingLg};
  padding-bottom: ${(props) => props.theme.spacingMd};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.primaryColor},
    ${(props) => props.theme.secondaryColor}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacingMd};

  @media (max-width: 991px) {
    display: none;
  }
`;

const ThemeButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.cardBg};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.borderColor};

  i {
    font-size: 1.3rem;
    color: ${(props) => props.theme.textColor};
  }
`;

/**
 * @description 主布局
 * @param {*} param
 * @returns {*}
 */
const MainLayout = ({ children, themeContext }: MainLayoutProps) => {
  const [titleKey, setTitleKey] = useState<string>(); // 标题键名，用于i18n翻译
  const { t } = useTranslation(); // 引入翻译函数

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.includes("/posts")) {
      setTitleKey("posts");
    } else {
      setTitleKey("home");
    }
  }, []);

  return (
    <AppContainer>
      <SideBar setTitle={setTitleKey} />
      <MobileNavBar setTitle={setTitleKey} themeContext={themeContext} />
      <MainContainer>
        <Header>
          {/* 根据不同的页面，显示不同的标题，并应用多语言翻译 */}
          <Title>{t(`titles.${titleKey}`)}</Title>
          <Actions>
            <ThemeButton onClick={themeContext.toggleTheme}>
              <FontAwesomeIcon
                icon={themeContext.theme === "dark" ? faSun : faMoon}
              />
            </ThemeButton>
            <LanguageSwitcher popupPosition="bottom" />
          </Actions>
        </Header>
        {children}
      </MainContainer>
    </AppContainer>
  );
};

export default MainLayout;
