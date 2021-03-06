import styled, { keyframes } from "styled-components";
import { SkillStylesProps } from "../../types/types";
import { ArrowBack } from "@styled-icons/boxicons-regular";

const BigAndSmall = keyframes`
  0% {
    transform: scale(1);
    color: #aaa;
  }

  50% {
    transform: scale(1.7);
    color: #fff;
  }

  100% {
    transform: scale(1);
    color: #aaa;
  }
`;

export const SKillContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const SkillMainContainer = styled.div`
  z-index: 10;
  cursor: none;
  height: 100%;
  display: flex;
  position: relative;
  #text {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const Text = styled.div<SkillStylesProps>`
  transition: 0.2s;
  color: ${(props) => {
    if (props.active[1] === true) {
      return "transparent";
    }
  }};
  z-index: 1;
`;

export const IntegratedContainer = styled.div<SkillStylesProps>`
  min-width: 0%;
  background-color: ${(props) => {
    return props.bgColor;
  }};
  flex: ${(props) => {
    if (props.active[0] !== props.index && props.active[1] === true) {
      return "0";
    }
    return props.isMouseover === props.index ? "2" : "1";
  }};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  transition: 1s;
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  @media only screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const BackArrow = styled(ArrowBack)<SkillStylesProps>`
  width: 40px;
  position: absolute;
  left: 30px;
  top: 30px;
  opacity: ${(props) => {
    return props.active[1] === true ? "1" : "0";
  }};
  color: #fff;
  transition: opacity 1s, transform 0.5s;
  z-index: 100;
  animation: ${BigAndSmall} 2s infinite;
  :hover {
    transform: scale(1.5);
    animation-play-state: paused;
  }
`;

export const Cursor = styled.div<SkillStylesProps>`
  width: ${(props) => {
    if (props.isBackMouseIn) {
      return "100px";
    }
    return props.mouseIn && !props.active[1] ? "100px" : "20px";
  }};
  height: ${(props) => {
    if (props.isBackMouseIn) {
      return "100px";
    }
    return props.mouseIn && !props.active[1] ? "100px" : "20px";
  }};
  border-radius: ${(props) => {
    if (props.index === 5) {
      return "20% 20% 100% 100%";
    }
    if (props.index === 4) {
      return "20%";
    }
    if (props.index === 3) {
      return "10% 50% 50% 10%";
    }
    if (props.index === 2) {
      return "15% 25% 15% 25%";
    }
    return props.index === 1 ? "0%" : "50%";
  }};
  border: 2px solid #fff;
  position: absolute;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
  transition: border-radius 1s, width 1s, height 1s, background-color 2s;
  background-color: ${(props) => {
    return props.mouseIn ? "#ffffff20" : "#000";
  }};
  z-index: 1000;
`;

export const HiddenText = styled.div<SkillStylesProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${(props) => {
    return props.active[0] === props.index ? "1" : "0";
  }};
  transition-delay: ${(props) => {
    return props.active[0] === props.index ? "2s" : "0s";
  }};
  transition: 0.2s;
  z-index: 0;
`;
