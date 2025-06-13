import styled from "styled-components";
import GlassCard from "./GlassCard";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCamera,
  faCalendarAlt,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

/* 侧边栏容器 */
const SideBarContainer = styled.nav`
  width: 280px;
  padding: ${(props) => props.theme.spacingLg};
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.cardBg};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: ${(props) => props.theme.borderRadiusLg};
  margin-bottom: ${(props) => props.theme.spacingLg};
  position: sticky;
  top: ${(props) => props.theme.spacingLg};
  height: ${(props) => `calc(100vh - ${props.theme.spacingLg} * 2)`};

  @media (min-width: 992px) {
    margin-bottom: 0;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

/* 个人简介 */
const ProfileBrief = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacingLg};
  margin-bottom: ${(props) => props.theme.spacingLg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: ${(props) =>
      `linear-gradient(90deg, transparent, ${props.theme.borderColor}, transparent)`};
  }
`;

/* 头像 */
const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacingMd};
  border: 3px solid ${(props) => props.theme.primaryColor};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 3px;
    background: ${(props) =>
      `linear-gradient(45deg, ${props.theme.primaryColor}, ${props.theme.secondaryColor}, ${props.theme.accentColor})`};
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

/* 姓名 */
const Name = styled.h2`
  margin: ${(props) => props.theme.spacingSm} 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

/* 职位 */
const Title = styled.p`
  color: ${(props) => props.theme.textLight};
  font-size: 0.95rem;
  font-weight: 500;
`;

/* 导航菜单 */
const NavLinks = styled.ul`
  margin-bottom: auto;
`;

/* 导航链接 */
const StyledNavLink = styled(NavLink)`
  margin-bottom: ${(props) => props.theme.spacingSm};
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacingMd};
  border-radius: ${(props) => props.theme.borderRadiusSm};
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  transition: ${(props) => props.theme.transition};

  &:hover {
    background: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.primaryColor};
    transform: translateX(5px);
  }

  &.active {
    background: ${(props) => props.theme.primaryLight};
    color: ${(props) => props.theme.primaryColor};
  }
`;

/* 导航链接图标 */
const NavLinkIcon = styled.i`
  margin-right: ${(props) => props.theme.spacingMd};
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
`;

/* 网站信息区域 */
const SiteInfo = styled.div`
  padding-top: ${(props) => props.theme.spacingMd};
  position: relative;
  margin-top: ${(props) => props.theme.spacingMd};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: ${(props) =>
      `linear-gradient(90deg, transparent, ${props.theme.borderColor}, transparent)`};
  }
`;

/* 信息卡片容器 */
const InfoCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacingSm};
`;

/* 单个信息卡片 */
const InfoCard = styled.div`
  background: ${(props) => `rgba(${props.theme.primaryColor}11, 0.1)`};
  padding: ${(props) => props.theme.spacingSm};
  border-radius: ${(props) => props.theme.borderRadiusSm};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${(props) => props.theme.transition};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

/* 信息卡片标题 */
const InfoTitle = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textLight};
  margin-bottom: 4px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
    color: ${(props) => props.theme.primaryColor};
  }
`;

/* 信息卡片数值 */
const InfoValue = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: ${(props) => props.theme.primaryColor};
`;

/* 版权信息 */
const Copyright = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textLight};
  text-align: center;
  margin-top: ${(props) => props.theme.spacingMd};

  a {
    color: ${(props) => props.theme.primaryColor};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/** @description PC端侧边栏组件 */
const SideBar = () => {
  // 计算网站运行天数
  const [runningDays, setRunningDays] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 首次运行时计算网站运行天数和访客数
  useEffect(() => {
    const startDate = new Date("2025-06-13");
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    setRunningDays(dayDiff);

    setVisitorCount(Math.floor(Math.random() * 1000) + 500);
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 如果是移动设备，不渲染任何内容
  if (isMobile) return null;

  return (
    <GlassCard hover={false}>
      {/* 侧边栏容器 */}
      <SideBarContainer>
        {/* 个人简介 */}
        <ProfileBrief>
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
              alt="avatar"
            />
          </Avatar>
          <Name>陈明阳</Name>
          <Title>前端开发工程师</Title>
        </ProfileBrief>

        {/* 导航菜单 */}
        <NavLinks>
          <StyledNavLink to="/" end>
            <NavLinkIcon>
              <FontAwesomeIcon icon={faUser} />
            </NavLinkIcon>
            个人资料
          </StyledNavLink>
          <StyledNavLink to="/posts">
            <NavLinkIcon>
              <FontAwesomeIcon icon={faCamera} />
            </NavLinkIcon>
            个人动态
          </StyledNavLink>
        </NavLinks>

        {/* 网站信息 */}
        <SiteInfo>
          <InfoCards>
            <InfoCard>
              <InfoTitle>
                <FontAwesomeIcon icon={faCalendarAlt} /> 运行天数
              </InfoTitle>
              <InfoValue>{runningDays}</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoTitle>
                <FontAwesomeIcon icon={faEye} /> 访客数
              </InfoTitle>
              <InfoValue>{visitorCount}</InfoValue>
            </InfoCard>
          </InfoCards>
          <Copyright>
            © 2025-{new Date().getFullYear()} <br />
            Made with{" "}
            <FontAwesomeIcon icon={faHeart} style={{ color: "#f43f5e" }} /> by
            艾孜买提
          </Copyright>
        </SiteInfo>
      </SideBarContainer>
    </GlassCard>
  );
};

export default SideBar;
