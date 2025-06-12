import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";

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
 * @description 主布局
 * @param {*} param
 * @returns {*}
 */
const MainLayout = ({ children, themeContext }: MainLayoutProps) => {
  const { theme, toggleTheme } = themeContext;

  return (
    <div>
      <GlassCard hover={false}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </GlassCard>
      {children}
    </div>
  );
};

export default MainLayout;
