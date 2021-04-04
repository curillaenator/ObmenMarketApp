import { useState } from "react";
// import { fa } from "../../Utils/firebase";

import { LotsContainer } from "../Components/LotsContainer/LotsContainer";

import styles from "./profilelots.module.scss";

const Title = ({ name, title, active, setSelected, isOwner }) => {
  const activeHandler = () => setSelected(name);

  const titleClassName =
    active === name ? `${styles.title} ${styles.title_active}` : styles.title;

  const titlesStyle = isOwner ? { cursor: "pointer" } : {};

  return (
    <div className={titleClassName} onClick={activeHandler} style={titlesStyle}>
      {title}
    </div>
  );
};

export const ProfileLots = ({ ownerID, isOwner, matchedID }) => {
  const [selected, setSelected] = useState("published");

  const userID = matchedID ? matchedID : ownerID;

  const authored = isOwner ? "Мои лоты" : "Лоты автора";

  return (
    <>
      <div className={styles.titles}>
        <Title
          name="published"
          title={authored}
          active={selected}
          setSelected={setSelected}
          isOwner={isOwner}
        />

        {isOwner && (
          <Title
            name="drafts"
            title="Черновики"
            active={selected}
            setSelected={setSelected}
            isOwner={isOwner}
          />
        )}
      </div>

      <LotsContainer
        toRender="profile"
        selected={selected}
        matchedID={userID}
      />
    </>
  );
};
