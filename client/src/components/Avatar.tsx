import React from "react";
import styled from "styled-components";

/* 头像 */
const AvatarContainer = styled.div`
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

/**
 * @description 通用头像组件
 * @param src 头像图片地址
 * @returns 头像组件
 */
const Avatar = ({ src }: { src: string }) => {
  return (
    <AvatarContainer>
      <AvatarImage
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
        alt="头像"
      />
    </AvatarContainer>
  );
};

export default Avatar;
