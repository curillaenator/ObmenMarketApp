import { BrowserRouter } from "react-router-dom";
import { DemoCont } from "./Components/Demo";
import styles from "./obmen.module.scss";

function Obmen() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <DemoCont />
      </div>
    </BrowserRouter>
  );
}

export default Obmen;
