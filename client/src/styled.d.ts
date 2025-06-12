/**
 * @description 定义主题类型
 * @returns {*}
 */
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string; // 主色
    primaryLight: string; // 主色浅色
    primaryDark: string; // 主色深色
    secondaryColor: string; // 次色
    secondaryLight: string; // 次色浅色
    accentColor: string; // 强调色
    accentLight: string; // 强调色浅色
    textColor: string; // 文本色
    textLight: string; // 文本色浅色
    bgColor: string; // 背景色
    cardBg: string; // 卡片背景色
    borderColor: string; // 边框色
    boxShadow: string; // 阴影
    transition: string; // 过渡
    borderRadius: string; // 圆角
    borderRadiusLg: string; // 大圆角
    borderRadiusSm: string; // 小圆角
    spacingXs: string; // 极小间距
    spacingSm: string; // 小间距
    spacingMd: string; // 中间距
    spacingLg: string; // 大间距
    spacingXl: string; // 极大间距
    spacingXxl: string; // 极大间距
  }
}
