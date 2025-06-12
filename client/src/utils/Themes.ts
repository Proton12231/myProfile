/**
 * @description 主题色
 * @returns {*}
 */
import type { DefaultTheme } from "styled-components";

// 亮色主题
export const lightTheme: DefaultTheme = {
  primaryColor: "#6366f1",
  primaryLight: "#a5b4fc",
  primaryDark: "#4f46e5",
  secondaryColor: "#f43f5e",
  secondaryLight: "#fda4af",
  accentColor: "#10b981",
  accentLight: "#6ee7b7",
  textColor: "#1e293b",
  textLight: "#64748b",
  bgColor: "#f8fafc",
  cardBg: "rgba(255, 255, 255, 0.7)",
  borderColor: "rgba(226, 232, 240, 0.8)",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  borderRadius: "16px",
  borderRadiusLg: "24px",
  borderRadiusSm: "12px",
  spacingXs: "4px",
  spacingSm: "8px",
  spacingMd: "16px",
  spacingLg: "24px",
  spacingXl: "32px",
  spacingXxl: "48px",
};

// 暗色主题
export const darkTheme: DefaultTheme = {
  primaryColor: "#818cf8",
  primaryLight: "#4f46e5",
  primaryDark: "#c7d2fe",
  secondaryColor: "#fb7185",
  secondaryLight: "#f43f5e",
  accentColor: "#34d399",
  accentLight: "#10b981",
  textColor: "#f1f5f9",
  textLight: "#cbd5e1",
  bgColor: "#0f172a",
  cardBg: "rgba(30, 41, 59, 0.7)",
  borderColor: "rgba(51, 65, 85, 0.8)",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  borderRadius: "16px",
  borderRadiusLg: "24px",
  borderRadiusSm: "12px",
  spacingXs: "4px",
  spacingSm: "8px",
  spacingMd: "16px",
  spacingLg: "24px",
  spacingXl: "32px",
  spacingXxl: "48px",
};
