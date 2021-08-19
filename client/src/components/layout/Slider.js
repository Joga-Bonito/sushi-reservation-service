import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import sushi_img_3 from "../../img/sushi_img(3).jpeg";
import sushi_img_2 from "../../img/sushi_img(2).jpeg";
import sushi_img_1 from "../../img/sushi_img(1).jpeg";

const SliderBlock = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  margin: 0 auto;
  @media (min-width: 1024px) {
    max-width: 1024px;
    padding: 0 40px;
  }
`;
const SlideList = styled.div`
  overflow: hidden;
  width: 100%;
`;
const SlideTrack = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: transform 500ms ease 0.3s;
  ${props =>
    props.widthVal &&
    css`
      width: ${props.widthVal}px;
      transform: translate3d(-${props.translateRange}px, 0px, 0px);
    `}
`;
const SlideItem = styled.div`
  flex: 0 1 auto;
  img {
    width: 100%;
    height: 180px;
  }
  @media (min-width: 1024px) {
    img {
      height: 320px;
      border-radius: 20px;
    }
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    img {
      height: 500px;
    }
  }
  ${props =>
    props.widthVal &&
    css`
      width: ${props.widthVal}px;
    `}
`;

const TOTAL_SLIDES = 2;
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const slideItemWidth = windowWidth >= 1024 ? 944 : windowWidth;

  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // const prevSlide = () => {
  //     if(currentSlide === 0){
  //         setCurrentSlide(TOTAL_SLIDES);
  //     }else{
  //         setCurrentSlide(currentSlide - 1);
  //     }
  // }

  useEffect(() => {
    //slide
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    //resize
    const resizeFunc = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeFunc);
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, [windowWidth]);
  return (
    <SliderBlock>
      <SlideList>
        <SlideTrack
          ref={slideRef}
          widthVal={(TOTAL_SLIDES + 1) * windowWidth}
          translateRange={currentSlide * slideItemWidth}
        >
          <SlideItem widthVal={slideItemWidth}>
            <a href="!#">
              <img src={sushi_img_3} alt="item" />
            </a>
          </SlideItem>
          <SlideItem widthVal={slideItemWidth}>
            <a href="!#">
              <img src={sushi_img_2} alt="item" />
            </a>
          </SlideItem>
          <SlideItem widthVal={slideItemWidth}>
            <a href="!#">
              <img src={sushi_img_1} alt="item" />
            </a>
          </SlideItem>
        </SlideTrack>
      </SlideList>
    </SliderBlock>
  );
};

export default Slider;
