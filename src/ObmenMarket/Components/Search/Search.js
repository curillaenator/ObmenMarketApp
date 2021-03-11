import { useState } from "react";
import styles from "./search.module.scss";

export const Search = (props) => {
  const [searchText, watchSearchText] = useState("");
  const searchTextHandler = (e) => watchSearchText(e.target.value);

  const [isFocused, setFocus] = useState(false);
  const onFocus = (e) => setFocus(true);
  const onBlur = () => !searchText && setFocus(false);

  const findHandler = () => {
    watchSearchText("");
    setFocus(false);
  };

  const unfocused = {
    left: "0",
    zIndex: -1,
  };
  const focused = {
    left: "calc(100% - 117px)",
  };

  const searchButtonTitle = isFocused ? "найти" : "Поиск";
  const searchButtonPresent = isFocused ? focused : unfocused;

  return (
    <div className={styles.search}>
      <button
        className={styles.find}
        disabled={!searchText}
        style={searchButtonPresent}
        onClick={findHandler}
      >
        {searchButtonTitle}
        {isFocused && props.icon}
      </button>
      <input
        type="text"
        onFocus={onFocus}
        onBlur={onBlur}
        value={searchText}
        onInput={searchTextHandler}
      />
    </div>
  );
};
