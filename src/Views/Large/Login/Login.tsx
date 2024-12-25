import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TextInput from "../../Small/TextInput/TextInput";
import Button from "../../Small/Button/Button";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithRedirect({
      appState: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Log In" type="submit" />
      </form>
    </div>
  );
};

export default Login;
