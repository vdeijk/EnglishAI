import React from "react";
import Button from "../../Small/Button/Button";
import styles from "./Login.module.css";
import { signInWithGoogle } from "../../../Utils/googleAuth";

const Login: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Button label="Log In" onClick={signInWithGoogle} />
    </div>
  );
};

export default Login;
