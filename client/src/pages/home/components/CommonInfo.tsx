import styled from "styled-components";
import GlassCard from "../../../components/GlassCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faQuoteLeft,
  faCalendarAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../../../context/LanguageContext";
import Avatar from "../../../components/Avatar";

const CommonInfoContainer = styled.div`
  grid-column: span 12;
  padding: ${(props) => props.theme.spacingLg};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.15),
      rgba(16, 185, 129, 0.15)
    );
    border-radius: 50%;
    z-index: 0;
    opacity: 0.6;
  }
`;

// PC端样式组件
const WebProfile = styled.div`
  position: relative;
  z-index: 1;
  display: block;

  @media (max-width: 991px) {
    display: none;
  }
`;

const InfoQuote = styled.div<{ dir: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacingMd};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuoteIcon = styled.i<{ dir: string }>`
  font-size: 2.5rem;
  color: ${(props) => props.theme.primaryColor};
  opacity: 0.8;
  transform: ${(props) =>
    props.dir === "rtl" ? "rotateY(180deg)" : "rotateY(0deg)"};

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: ${(props) => props.theme.spacingXs};
  }
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${(props) => props.theme.textColor};
  font-style: italic;
  font-weight: 500;
`;

const InfoDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${(props) => props.theme.borderColor},
    transparent
  );
  margin: ${(props) => props.theme.spacingMd} 0;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const ContactRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacingMd};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacingMd};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacingMd};
`;

const ContactItemIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.primaryLight};
  color: ${(props) => props.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${(props) => props.theme.primaryColor};
    color: white;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
  }
`;

const ContactItemText = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacingSm};
`;

const SocialLink = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: ${(props) => props.theme.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    background: ${(props) => props.theme.primaryColor};
    color: white;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  }

  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.primaryLight};
    font-size: 1.1rem;

    // 手机端移除hover效果
    &:hover {
      transform: none;
      background: ${(props) => props.theme.primaryLight};
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

// 手机端样式组件
const MobileProfile = styled.div`
  position: relative;
  z-index: 1;
  display: none;

  @media (max-width: 991px) {
    display: block;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacingMd};
`;

const MobileBasic = styled.div`
  flex: 1;
`;

const MobileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: ${(props) => props.theme.textColor};
`;

const MobilePosition = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textLight};
  margin-bottom: 8px;
`;

const MobileLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.textLight};
  gap: 5px;
`;

const LocationIcon = styled.i`
  color: ${(props) => props.theme.primaryColor};
`;

const MobileQuote = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadiusSm};
  padding: ${(props) => props.theme.spacingMd};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: ${(props) => props.theme.spacingMd};
`;

const MobileQuoteText = styled.div`
  font-size: 0.95rem;
  color: ${(props) => props.theme.textColor};
  font-style: italic;
  line-height: 1.6;
`;

const MobileQuoteIcon = styled.i<{ dir: string }>`
  font-size: 1.2rem;
  color: ${(props) => props.theme.primaryColor};
  opacity: 0.8;
  height: fit-content;
  display: inline-block;
  transform: ${(props) =>
    props.dir === "rtl" ? "rotateY(180deg)" : "rotateY(0deg)"};
  ${(props) =>
    props.dir === "rtl" ? "margin-left: 5px;" : "margin-right: 5px;"}
`;

const MobileContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacingMd};
`;

const MobileEmail = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadiusSm};
  padding: ${(props) => props.theme.spacingSm}
    ${(props) => props.theme.spacingMd};
  border: 1px solid ${(props) => props.theme.borderColor};
  gap: ${(props) => props.theme.spacingMd};
`;

const MobileEmailIcon = styled.i`
  color: ${(props) => props.theme.primaryColor};
  font-size: 1.2rem;
  padding-top: 2px;
`;

const MobileEmailText = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;

const MobileStats = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${(props) => props.theme.borderRadiusSm};
  padding: ${(props) => props.theme.spacingSm}
    ${(props) => props.theme.spacingMd};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const MobileStatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const MobileStatItemIcon = styled.i`
  color: ${(props) => props.theme.primaryColor};
  margin-right: ${(props) => props.theme.spacingSm};
  width: 20px;
  text-align: center;
`;

const MobileStatItemText = styled.span`
  color: ${(props) => props.theme.textLight};
  font-size: 0.9rem;
`;

const MobileStatItemStrong = styled.strong`
  color: ${(props) => props.theme.primaryColor};
  font-weight: 600;
`;

const MobileSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacingMd};
`;

// PC端基本信息卡片组件
const WebCommonInfo = () => {
  const { currentDirection } = useLanguage();

  return (
    <WebProfile>
      <InfoQuote dir={currentDirection}>
        <QuoteIcon dir={currentDirection}>
          <FontAwesomeIcon icon={faQuoteLeft} />
        </QuoteIcon>
        <QuoteText>
          致力于创造优秀的用户体验和高质量的前端产品，专注于现代Web技术的探索与实践。
        </QuoteText>
      </InfoQuote>

      <InfoDivider />

      <ContactInfo>
        <ContactRow>
          <ContactItem>
            <ContactItemIcon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </ContactItemIcon>
            <ContactItemText>深圳市南山区</ContactItemText>
          </ContactItem>

          <ContactItem>
            <ContactItemIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </ContactItemIcon>
            <ContactItemText>chenmy@example.com</ContactItemText>
          </ContactItem>
        </ContactRow>
        <SocialLinks>
          <SocialLink href="https://github.com/" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialLink>
          <SocialLink href="#">
            <FontAwesomeIcon icon={faWeixin} />
          </SocialLink>
        </SocialLinks>
      </ContactInfo>
    </WebProfile>
  );
};

// 手机端基本信息卡片组件
const MobileCommonInfo = () => {
  const { currentDirection } = useLanguage();

  return (
    <MobileProfile>
      <MobileHeader>
        <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" />
        <MobileBasic>
          <MobileName>陈明宇</MobileName>
          <MobilePosition>前端开发工程师</MobilePosition>
          <MobileLocation>
            <LocationIcon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </LocationIcon>
            深圳市南山区
          </MobileLocation>
        </MobileBasic>
      </MobileHeader>

      <MobileQuote>
        <MobileQuoteText>
          <MobileQuoteIcon dir={currentDirection}>
            <FontAwesomeIcon icon={faQuoteLeft} />
          </MobileQuoteIcon>
          致力于创造优秀的用户体验和高质量的前端产品，专注于现代Web技术的探索与实践。
        </MobileQuoteText>
      </MobileQuote>

      <MobileContact>
        <MobileEmail>
          <MobileEmailIcon>
            <FontAwesomeIcon icon={faEnvelope} />
          </MobileEmailIcon>
          <MobileEmailText>chenmy@example.com</MobileEmailText>
        </MobileEmail>

        <MobileStats>
          <MobileStatItem>
            <MobileStatItemIcon>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </MobileStatItemIcon>
            <MobileStatItemText>
              网站已运行: <MobileStatItemStrong>365</MobileStatItemStrong> 天
            </MobileStatItemText>
          </MobileStatItem>
          <MobileStatItem>
            <MobileStatItemIcon>
              <FontAwesomeIcon icon={faEye} />
            </MobileStatItemIcon>
            <MobileStatItemText>
              访客数: <MobileStatItemStrong>1234</MobileStatItemStrong>
            </MobileStatItemText>
          </MobileStatItem>
        </MobileStats>

        <MobileSocial>
          <SocialLink href="https://github.com/" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialLink>
          <SocialLink href="#">
            <FontAwesomeIcon icon={faWeixin} />
          </SocialLink>
        </MobileSocial>
      </MobileContact>
    </MobileProfile>
  );
};

const CommonInfo = () => {
  return (
    <GlassCard>
      <CommonInfoContainer>
        {/* pc端 */}
        <WebCommonInfo />
        {/* 手机端 */}
        <MobileCommonInfo />
      </CommonInfoContainer>
    </GlassCard>
  );
};

export default CommonInfo;
