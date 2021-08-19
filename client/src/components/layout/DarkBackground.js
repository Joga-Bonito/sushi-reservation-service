import React from 'react';
import styled, {css} from 'styled-components';

const Dbg = styled.div`
    display: none;
    position: fixed;
    z-index: 2999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.5);
    ${props => props.sidebarAppear &&
        css`
            display: block;
        `
    }
`;

const DarkBackground = ({sidebarAppear}) => {
    return(
        <Dbg sidebarAppear={sidebarAppear}/>
    )
}

export default DarkBackground;