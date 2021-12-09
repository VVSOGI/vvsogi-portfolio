import styled from "styled-components";
import { TopStyleProps, TopRockStyleProps } from "../../types/types";

export const TopTotalContainer = styled.div`
  height: 100vh;
  background-color: transparent;
  position: relative;
  z-index: 5;
`;

export const EarthImage = styled.img<TopStyleProps>`
  position: absolute;
  width: 30em;
  height: 30em;
  right: ${(props) => {
    return props.mosPos?.length ? `${100 - props.mosPos[0]}px` : "100px";
  }};
  top: ${(props) => {
    return props.mosPos?.length ? `${140 + props.mosPos[1]}px` : "140px";
  }};
  z-index: 2;
  transform: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? "translateX(0%) scale(1.3)"
      : "translateX(100%)";
  }};
  opacity: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1" : "0";
  }};
  transition: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1s" : "0.5s";
  }};
  transition-delay: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? `${props.isMouseMove ? "0s" : "0.5s"}`
      : "0s";
  }};
`;

export const PortfolioText = styled.div<TopStyleProps>`
  font-size: 64px;
  position: absolute;
  right: ${(props) => {
    return props.mosPos?.length ? `${230 - props.mosPos[0] * 0.4}px` : "230px";
  }};
  top: ${(props) => {
    return props.mosPos?.length ? `${340 + props.mosPos[1] * 0.4}px` : "340px";
  }};
  z-index: 3;
  font-weight: 600;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.893);
  letter-spacing: 8px;
  transform: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? "translateX(0%)"
      : "translateX(100%)";
  }};
  opacity: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1" : "0";
  }};
  transition: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1s" : "0.5s";
  }};
  transition-delay: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? `${props.isMouseMove ? "0s" : "0.5s"}`
      : "0s";
  }};
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
  text-shadow: 0 0px 5px rgba(235, 235, 235, 0.381);
`;

export const FrontendText = styled.div<TopStyleProps>`
  position: absolute;
  color: #fff;
  left: 0.2%;
  top: 42%;
  font-size: 24px;
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

export const RockImage = styled.img<TopRockStyleProps>`
  position: absolute;
  right: ${(props) => {
    return props.right && props.mospos
      ? `${props.right - props.mospos[0]}px`
      : `${props.right}px`;
  }};
  top: ${(props) => {
    return props.top && props.mospos
      ? `${props.top - props.mospos[1]}px`
      : `${props.top}px`;
  }};
  z-index: 10;
  transform: ${(props) => {
    if (props.scale && props.rotate) {
      return `${`rotate(${props.rotate}) scale(${props.scale}) translateX(${
        props.propsIndex === props.componentIndex ? "0%" : "100%"
      })`}`;
    }
  }};
  opacity: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1" : "0";
  }};
  transition: ${(props) => {
    return props.componentIndex === props.propsIndex ? "1s" : "0.5s";
  }};
  transition-delay: ${(props) => {
    return props.componentIndex === props.propsIndex
      ? `${props.isMouseMove ? "0s" : "0.5s"}`
      : "0s";
  }};
`;
