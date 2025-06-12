import { createGlobalStyle } from "styled-components";

/**
 * @description 定义全局样式
 */
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", "SF Pro Display", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    line-height: 1.6;
    transition: ${(props) => props.theme.transition};
    background-image: radial-gradient(
        circle at 20% 20%,
        rgba(99, 102, 241, 0.15) 0%,
        transparent 25%
      ),
      radial-gradient(
        circle at 80% 60%,
        rgba(244, 63, 94, 0.1) 0%,
        transparent 30%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(16, 185, 129, 0.1) 0%,
        transparent 25%
      );
    background-attachment: fixed;
    background-size: 100% 100%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primaryColor};
    transition: ${(props) => props.theme.transition};
  }

  a:hover {
    color: ${(props) => props.theme.primaryDark};
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${(props) => props.theme.borderRadiusSm};
  }
`;
