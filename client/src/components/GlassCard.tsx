import React from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

interface GlassCardProps {
  children?: ReactNode; // 子组件
  hover?: boolean; // 是否启用悬停效果
}

/**
 * @description GlassCard样式容器
 * withConfig 用于忽略 hover 属性被默认写入DOM元素，避免React告警
 */
const CardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hover",
})<{ hover?: boolean }>`
  background: ${(props) => props.theme.cardBg};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  transition: ${(props) => props.theme.transition};
  overflow: hidden;

  ${(props) =>
    props.hover &&
    `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.15);
    }
  `}
`;

/**
 * @description 毛玻璃效果卡片组件
 * @param {ReactNode} children 子组件
 * @param {boolean} hover 是否启用悬停效果
 * @returns {JSX.Element}
 */
const GlassCard: React.FC<GlassCardProps> = ({ children, hover = true }) => {
  return <CardContainer hover={hover}>{children}</CardContainer>;
};

export default GlassCard;
