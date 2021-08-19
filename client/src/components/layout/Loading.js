import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  .loading {
    display: flex;
    justify-content: center;

    div {
      width: 1rem;
      height: 1rem;
      margin: 10rem 0.3rem;
      background: #979fd0;
      border-radius: 50%;
      animation: 0.9s bounce infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }
  @keyframes bounce {
    to {
      opacity: 0.3;
      transform: translate3d(0, -1rem, 0);
    }
  }
`;

const Loading = () => {
  return (
    <Loader>
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Loader>
  );
};

export default Loading;
