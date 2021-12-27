import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Imageform from "../../components/Forms/Imageform/Imageform";
import Textform from "../../components/Forms/Textform/Textform";
import Nav from "../../components/Nav/Nav";
import BackLight from "../../components/StyleOnly/BackLight/BackLight";
import MapNumber from "../../components/StyleOnly/MapNumber/MapNumber";
import { ProjectPageStyleProps } from "../../types/types";
import Concept from "./components/Concept/Concept";
import Development from "./components/Development/Development";
import Summary from "./components/Summary/Summary";

const ProjectTotalContainer = styled.div`
  height: 400vh;
  transition: 1s;
  background: linear-gradient(90deg, #000000 5%, rgb(13, 41, 70) 65%);
  overflow-x: hidden;
  .one {
    z-index: 1;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
`;

const BackgroundGrad = styled.div<ProjectPageStyleProps>`
  position: absolute;
  top: 0;
  left: ${(props) => {
    return props.pageRender ? "-60%" : "-84.5%";
  }};
  width: 100%;
  height: 100vh;
  transform: skew(0deg);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 10%, #000311 70%);
  z-index: 0;
  transition: 1s;
  transition-timing-function: cubic-bezier(0.74, 0.22, 0.26, 1.01); //
`;

const Test = styled.div<ProjectPageStyleProps>``;

const ProjectPage = () => {
  const [isRender, setIsRender] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsRender(true);
    }, 50);
  }, []);

  const ProjectIndex = 2;
  const projectObject = {
    headText: `FIND RECIPES \nBOBPAGO`,
    summaryText: "Enjoy the Recipe that Alphago AI recommends.",
  };
  const imageSource: string = "/images/bobpago.png";

  return (
    <ProjectTotalContainer>
      <Nav />

      <div className="one">
        <BackgroundGrad pageRender={isRender} />
        <Textform
          headText={projectObject.headText}
          summaryText={projectObject.summaryText}
          indexMatch={false}
          pageIndex={0}
        />
        <Imageform
          indexMatch={false}
          imageSrc={imageSource}
          pageIndex={0}
          pageRender={isRender}
        />
        <MapNumber
          pageIndex={0}
          indexMatch={false}
          number={`0${ProjectIndex - 1}`}
          pageRender={isRender}
        />
      </div>
      <div className="test">
        <Test pageRender={isRender} />
        <BackLight animationOff={true} />
      </div>

      {/* 구성 */}
      <Summary />
      <Concept />
      <Development />
      {/* 구성 */}
    </ProjectTotalContainer>
  );
};

export default ProjectPage;
