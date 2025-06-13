import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./utils/Themes";
import { GlobalStyle } from "./utils/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Posts from "./pages/posts";
import MainLayout from "./layout/MainLayout";
import styled from "styled-components";

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
 * @description 主题上下文类型
 */
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light"); // 主题

  /**
   * @description  更新主题状态
   */
  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  /**
   * @description 初始化主题
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
    }
  }, []);

  /**
   * @description 主题上下文, 用于传递给子组件
   */
  const themeContext: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <BrowserRouter>
          <MainLayout themeContext={themeContext}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
