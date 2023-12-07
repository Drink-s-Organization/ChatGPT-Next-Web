import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect } from "react";
import { getClientConfig } from "../config/client";

export function AuthPage() {
  const navigate = useNavigate();
  const accessStore = useAccessStore();

  const goHome = () => navigate(Path.Home);
  const goChat = () => navigate(Path.Chat);
  const resetAccessCode = () => {
    accessStore.update((access) => {
      access.openaiApiKey = "";
      access.accessCode = "";
    });
  }; // Reset access code to empty string
  const login = () => {
    console.log("todo login");
    navigate(Path.Home);
  };

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-body"]}>
        <div className={styles["auth-logo-div"]}>
          <span className={`no-dark ${styles["auth-logo"]}`}>
            <BotIcon />
          </span>
          <span className={styles["auth-title"]}>{Locale.Auth.Title}</span>
        </div>
        <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

        <div style={{ height: 50 }}></div>

        <div className={styles["auth-tips"]}>
          {Locale.Auth.Phone}
          <span>{Locale.Auth.PhoneTips}</span>
        </div>
        <input
          className={styles["auth-input"]}
          placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
          value={accessStore.phone}
          onChange={(e) => {
            accessStore.update(
              (access) => (access.phone = e.currentTarget.value),
            );
          }}
        />

        <div className={styles["auth-tips"]}>
          {Locale.Auth.Code}
          <span>{Locale.Auth.CodeTips}</span>
        </div>

        <div style={{ position: "relative" }}>
          <input
            className={styles["auth-input"]}
            placeholder={Locale.Settings.Access.OpenAI.ApiKey.Placeholder}
            value={accessStore.tokenBalance}
            onChange={(e) => {
              accessStore.update(
                // todo value to code
                (access) => (access.tokenBalance = e.currentTarget.value),
              );
            }}
          />
          <span
            className={styles["auth-input-code"]}
            onClick={(e) => {
              console.log("todo send code");
            }}
          >
            {Locale.Auth.SendCode}
          </span>
        </div>

        <div className={styles["auth-login"]}>
          <IconButton text={Locale.Auth.Login} type="primary" onClick={login} />
          <div className={styles["auth-login-tips"]}>
            {Locale.Auth.LoginTips}
            <a
              onClick={() => {
                console.log("todo show agreement");
              }}
            >
              {Locale.Auth.Agreement}
            </a>
            {Locale.Auth.LoginAnd}
            <a
              onClick={() => {
                console.log("todo show privacy");
              }}
            >
              {Locale.Auth.Privacy}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
