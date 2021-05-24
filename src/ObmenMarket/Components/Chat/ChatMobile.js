import { connect } from "react-redux";
import styled from "styled-components";

import { handleChatOn } from "../../../Redux/Reducers/chat";

import { ButtonIcon } from "../Button/ButtonIcon";

import { colors } from "../../../Utils/palette";

const ChatMobileStyled = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.chatbox};
  z-index: 800;

  .chat_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 116px;
    padding: 0 24px;

    .chat_header_title {
      font-weight: 800;
      font-size: 32px;
      letter-spacing: -0.32px;
      user-select: none;
    }
  }

  .chat_search {
    padding: 0 24px;
    padding-bottom: 16px;
    background-color: $chatbox;

    .chat_search_temp {
      width: 100%;
      height: 48px;
      background-color: #fff;
      border-radius: 24px;
    }
  }
`;

export const ChatMobile = ({ icons }) => {
  return (
    <ChatMobileStyled>
      <div className="chat_header">
        <div className="chat_header_title">Мессенджер</div>
        <ButtonIcon icon={icons.cancel} handler={handleChatOn} />
      </div>

      <div className="chat_search">
        <div className="chat_search_temp"></div>
      </div>

      <div className="chat_body"></div>
    </ChatMobileStyled>
  );
};

const mstp = (state) => ({
  icons: state.ui.icons,
});

export const ChatMobileCont = connect(mstp, { handleChatOn })(ChatMobile);
