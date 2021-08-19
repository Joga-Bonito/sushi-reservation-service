import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import sushi_icon from "../../img/sushi_icon(1).png";

const slideUp = keyframes`
  from {
    transform: translateX(300px);
  }
  to {
    transform: translateX(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(300px);
  }
`;

const SideBarMain = styled.div`
    position: fixed;
    right:0px;
    top: 0px;
    bottom: 0px;
    width: 300px;
    z-index: 3000;
    background-color: white;
    
    .wrapper{
        position: relative;
        height: 100%;
        width: 100%;
        padding: 2em;
        padding-top: 1.5em;
        overflow-y: auto;
        -webkit-box-sizig: border-box -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .wrapper > nav {
        margin-bottom : 24px;
    }
    ul.menu {
        margin: 0;
        padding: 20px 0 30px 0;
    }
    ul.menu > li {
        list-style : none;
        padding: 8px 0;
        margin: 4px 0;
        font-size: 20px;
        text-align: left;
    }
    ul.menu > li > a {
        text-decoration: none;
        display: block;
    }
    ul.menu > li > a > img{
        vertical-align : middle;
        display: inline-block;
        width: 32px;
    }
    .seperateLine {
        border-bottom: 1px solid #ddd;
        padding: 0;
        margin: 20px 0;
    }
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideDown};
    animation-fill-mode: forwards;
    ${props =>
      props.sidebarAppear &&
      css`
        animation-name: ${slideUp};
      `}
`;

const SideBar = ({ sidebarAppear, sideBarRef, setSidebarAppear }) => {
  useEffect(() => {
    const closeSideBar = e => {
      if (!sideBarRef.current.contains(e.target)) {
        setSidebarAppear(false);
      }
    };
    if (sidebarAppear) {
      document.addEventListener("click", closeSideBar);
    }
    return () => {
      if (sidebarAppear) {
        document.removeEventListener("click", closeSideBar);
      }
    };
  });

  return (
    <SideBarMain sidebarAppear={sidebarAppear} ref={sideBarRef}>
      <div className="wrapper">
        <nav>
          <ul className="menu">
            <li>
              <a href="!#">
                <img src={sushi_icon} alt="초밥집 소개" />
                <span>초밥집 소개</span>
              </a>
            </li>
            <li className="seperateLine"></li>
          </ul>
        </nav>
      </div>
    </SideBarMain>
  );
};

export default SideBar;
