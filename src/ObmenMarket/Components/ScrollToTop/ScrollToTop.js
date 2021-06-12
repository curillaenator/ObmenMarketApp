import ScrollTop from "react-scrolltop-button";
import styled from "styled-components";
import { colors } from "../../../Utils/palette";

const StyledScrollTop = styled(ScrollTop)`
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: ${colors.chatbox};
    border: none;
    width: 6vw;
    height: 100vh;
    border-radius: 0;
    transition: 0.32s ease-in-out;
`;

export const ScrollToTop = ( props ) => {

    return (
        <StyledScrollTop
            title="наверх"
            distance={400}
            breakpoint={1140}
            className="scroll-to-top"
            speed={160}
            target={0}
        />  
    );
};