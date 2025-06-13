import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./utils/Themes";
import { GlobalStyle } from "./utils/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Posts from "./pages/posts";
import MainLayout from "./layout/MainLayout";

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
   * @description 监听标签页是否激活
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.title = "艾孜买提";
      } else {
        document.title = "欢迎再来👏";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      <BrowserRouter>
        <MainLayout themeContext={themeContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
