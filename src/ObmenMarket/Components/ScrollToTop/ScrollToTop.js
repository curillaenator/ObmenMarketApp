import ScrollTop from "react-scrolltop-button";
import styled from "styled-components";
import { colors } from "../../../Utils/palette";

const StyledScrollTop = styled(ScrollTop)`
    position: fixed;
    display: none;
    align-items: flex-start;
    left: 0px;
    bottom: 0px;
    background-color: ${colors.chatbox};
    border: none;
    width: 6vw;
    height: 100vh;
    border-radius: 0;
    transition: 0.32s ease-in-out;

    &:hover {
        background-color: #f3f1f5;
        color: ${colors.primary};
    }

    @media (min-width: 1140px) {
        display: flex;
    }
`;

export const ScrollToTop = ( props ) => {

    return (
        <StyledScrollTop
            text="наверх"
            distance={400}
            breakpoint={1140}
            className="scroll-to-top"
            speed={160}
            target={0}
        />  
    );
};