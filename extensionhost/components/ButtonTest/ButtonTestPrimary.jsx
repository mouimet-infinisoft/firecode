import React from "react";
import styles from "./ButtonTestPrimary.module.scss";

const ButtonTest = () => {
  return (
    <button className={styles.buttonTestPrimary}>
      <p className={styles.primary}>Primary</p>
    </button>
  );
};

export default ButtonTest;