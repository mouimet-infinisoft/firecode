import React from "react";
import styles from "./ButtonTestPrimary.module.scss";

const ButtonTestPrimary = () => {
  return (
    <button className={styles.buttonTestPrimary}>
      <p className={styles.primary}>Primary</p>
    </button>
  );
};

export default ButtonTestPrimary;