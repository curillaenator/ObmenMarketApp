import { useState } from "react";
import { fa } from "../../Utils/firebase";

import { LotsContainer } from "../Components/LotsContainer/LotsContainer";

import styles from "./profilelots.module.scss";

const Title = ({ name, title, active, setSelected }) => {
  const activeHandler = () => setSelected(name);

  const titleClassName =
    active === name ? `${styles.title} ${styles.title_active}` : styles.title;

  return (
    <div className={titleClassName} onClick={activeHandler}>
      {title}
    </div>
  );
};

export const ProfileLots = ({ isOwner, isFormModeOn, matchedID }) => {
  const [selected, setSelected] = useState("published");

  const userID = matchedID ? matchedID : fa.currentUser.uid;

  const authored = isOwner ? "Мои лоты" : "Лоты автора";

  return (
    <>
      <div className={styles.titles}>
        <Title
          name="published"
          title={authored}
          active={selected}
          setSelected={setSelected}
        />

        {isOwner && (
          <Title
            name="drafts"
            title="Черновики"
            active={selected}
            setSelected={setSelected}
          />
        )}
      </div>

      <LotsContainer
        isFormModeOn={isFormModeOn}
        toRender="profile"
        selected={selected}
        matchedID={userID}
      />
    </>
  );
};
