import React from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import MobileNavBar from "../components/MobileNavBar";

/**
 * @description 主题上下文类型
 * @returns {*}
 */
interface ThemeContextProps {
  /**
   * @description 子组件
   */
  children: React.ReactNode;
  /**
   * @description 主题上下文
   */
  themeContext: { theme: string; toggleTheme: () => void };
}

/**
 * @description 主布局类型
 * @returns {*}
 */
interface MainLayoutProps {
  children: React.ReactNode;
  themeContext: ThemeContextProps;
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

/**
 * @description 主布局
 * @param {*} param
 * @returns {*}
 */
const MainLayout = ({ children, themeContext }: MainLayoutProps) => {
  return (
    <AppContainer>
      <SideBar />
      <MobileNavBar themeContext={themeContext} />
      {children}
    </AppContainer>
  );
};

export default MainLayout;
