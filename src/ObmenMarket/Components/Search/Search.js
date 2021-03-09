import { useState } from "react";
import styles from "./search.module.scss";

export const Search = (props) => {
  const [searchText, watchSearchText] = useState("");
  const textHandler = (e) => watchSearchText(e.target.value);

  const [isFocused, setFocus] = useState(false);
  const onFocus = () => setFocus(true);
  const onBlur = () => {
    setFocus(false);
    watchSearchText("");
  };

  const unfocused = {
    left: "0",
    zIndex: -1,
  };
  const focused = {
    left: "calc(100% - 117px)",
  };

  const searchButtonTitle = isFocused ? "Найти" : "Поиск";
  const searchButtonPresent = isFocused ? focused : unfocused;

  return (
    <div className={styles.search}>
      <button
        className={styles.searchButton}
        disabled={!isFocused}
        style={searchButtonPresent}
      >
        {searchButtonTitle}
        {isFocused && props.icon}
      </button>
      <input
        type="text"
        onFocus={onFocus}
        onBlur={onBlur}
        value={searchText}
        onInput={textHandler}
      />
    </div>
  );
};
