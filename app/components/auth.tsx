import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect, useState } from "react";
import { getClientConfig } from "../config/client";
import tr from "../locales/tr";

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

  const [showDoc, setShowDoc] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docText, setDocText] = useState("");
  const [loginPsw, setLoginPsw] = useState(false);

  return (
    <div className={styles["auth-page"]}>
      <div
        className={styles["auth-doc"]}
        style={{ display: showDoc ? "" : "none" }}
      >
        <h1>{docTitle}</h1>
        <div className={styles["auth-doc-text"]}>
          <span
            dangerouslySetInnerHTML={{ __html: docText.replace(/\n/g, "<br>") }}
          />
        </div>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={() => {
            setShowDoc(false);
            setDocText("");
            setDocTitle("");
          }}
        />
      </div>
      <div
        className={styles["auth-body"]}
        style={{ display: showDoc ? "none" : "" }}
      >
        <div className={styles["auth-logo-div"]}>
          <span className={`no-dark ${styles["auth-logo"]}`}>
            <BotIcon />
          </span>
          <span className={styles["auth-title"]}>{Locale.Auth.Title}</span>
        </div>
        <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

        <div className={styles["auth-login-type-block"]}>
          <span
            className={
              !loginPsw
                ? styles["auth-login-type-active"]
                : styles["auth-login-type"]
            }
            onClick={() => {
              setLoginPsw(false);
            }}
          >
            验证码登录
          </span>
          <span
            className={
              loginPsw
                ? styles["auth-login-type-active"]
                : styles["auth-login-type"]
            }
            onClick={() => {
              setLoginPsw(true);
            }}
          >
            账号密码登录
          </span>
        </div>

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
                setShowDoc(true);
                setDocTitle(
                  Locale.Auth.Agreement.replace("《", "").replace("》", ""),
                );
                setDocText(Locale.Auth.AgreementContent);
              }}
            >
              {Locale.Auth.Agreement}
            </a>
            {Locale.Auth.LoginAnd}
            <a
              onClick={() => {
                setShowDoc(true);
                setDocTitle(
                  Locale.Auth.Privacy.replace("《", "").replace("》", ""),
                );
                setDocText(Locale.Auth.PrivacyContent);
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
