import styled from "styled-components";
import { TopStyleProps } from "../../types/types";

export const TopTotalContainer = styled.div`
  height: 100vh;
  background-color: transparent;
  position: relative;
  z-index: 5;
`;

export const NameTextContainer = styled.div`
  position: absolute;
  left: 0%;
  top: 30%;
  margin-left: 9.5%;
  width: 100%;
  overflow: hidden;
  height: 100%;
`;

export const NameText = styled.div<TopStyleProps>`
  width: 50%;
  font-size: 100px;
  font-weight: 500;
  letter-spacing: 8px;
  line-height: 1.1em;
  color: #fff;
  transform: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? "translateX(0%)"
      : "translateX(-100%)";
  }};
  transition: 1s;
  transition-delay: ${(props) => {
    return props.componentIndex === props.propsIndex ? "0.7s" : "0s";
  }};
  text-shadow: 0 0px 5px rgba(0, 0, 0, 0.45);
  opacity: 0;
`;

export const FrontendText = styled.div<TopStyleProps>`
  position: absolute;
  color: #fff;
  left: 0.2%;
  top: 42%;
  font-size: 28px;
  font-weight: 400;
  text-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
  transform: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? "translateX(0%)"
      : "translateX(-100.5%)";
  }};
  transition: 0.5s;
  transition-delay: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1.2s" : "0s";
  }};
  background-color: transparent;
`;

export const ScrolldownText = styled.div<TopStyleProps>`
  position: absolute;
  left: 2%;
  bottom: ${(props) => {
    return props.componentIndex === props.propsIndex ? "8%" : "-21%";
  }};
  opacity: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1" : "0";
  }};
  writing-mode: vertical-rl;
  color: #fff;
  background-color: transparent;
  letter-spacing: 5px;
  height: 10em;
  z-index: 10;
  transition: 1s;
  font-size: 12px;
  ::before {
    width: 1%;
    content: "";
    background-color: #fff;
    height: 30%;
    position: absolute;
    bottom: -50%;
    left: 50%;
  }
`;
