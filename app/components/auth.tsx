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
import CloseIcon from "../icons/close.svg";
import { relative } from "path";

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
  const [loginPsw, setLoginPsw] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [afterSeconds, setAfterSeconds] = useState(0);

  const sendVerifyCode = () => {
    if (afterSeconds > 0) {
      return;
    }
    setAfterSeconds(60);
    const interval = setInterval(() => {
      setAfterSeconds((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000);
  };

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
        style={{ display: showDoc ? "none" : "", position: "relative" }}
      >
        <div style={{ right: 10, top: 10, position: "absolute" }}>
          <IconButton
            icon={<CloseIcon />}
            bordered
            onClick={() => navigate(Path.Home)}
          />
        </div>
        <div className={styles["auth-logo-div"]}>
          <span className={`no-dark ${styles["auth-logo"]}`}>
            <BotIcon />
          </span>
          <span className={styles["auth-title"]}>
            {isLogin ? Locale.Auth.Title : Locale.Auth.ResetPsw}
          </span>
        </div>
        <div
          className={styles["auth-tips"]}
          style={{ visibility: isLogin ? "visible" : "hidden" }}
        >
          {Locale.Auth.Tips}
        </div>

        <div
          className={styles["auth-login-type-block"]}
          style={{ display: isLogin ? "" : "none" }}
        >
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
          <span
            className={
              !loginPsw
                ? styles["auth-login-type-active"]
                : styles["auth-login-type"]
            }
            style={{ marginLeft: 32 }}
            onClick={() => {
              setLoginPsw(false);
            }}
          >
            验证码登录
          </span>
        </div>

        <div className={styles["auth-tips"]}>
          {Locale.Auth.Phone}
          <span>{Locale.Auth.PhoneTips}</span>
          <input
            placeholder={Locale.Auth.Phone}
            value={accessStore.phone}
            onChange={(e) => {
              accessStore.update(
                (access) => (access.phone = e.currentTarget.value),
              );
            }}
          />
        </div>

        <div
          className={styles["auth-tips"]}
          style={{ display: isLogin && loginPsw ? "none" : "" }}
        >
          {Locale.Auth.Code}
          <span>{Locale.Auth.CodeTips}</span>
          <div style={{ position: "relative" }}>
            <input
              placeholder={Locale.Auth.Code}
              value={accessStore.phone}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.phone = e.currentTarget.value),
                );
              }}
            />
            <a
              className={
                styles[
                  afterSeconds > 0
                    ? "auth-input-code"
                    : "auth-input-code-active"
                ]
              }
              onClick={(e) => {
                console.log("todo send code");
                sendVerifyCode();
              }}
            >
              {afterSeconds > 0 ? afterSeconds + " 秒" : Locale.Auth.SendCode}
            </a>
          </div>
        </div>

        <div
          className={styles["auth-tips"]}
          style={{ display: isLogin && !loginPsw ? "none" : "" }}
        >
          {Locale.Auth.Password}
          <span>
            {isLogin ? Locale.Auth.PasswordTips : Locale.Auth.PasswordTips2}
          </span>
          <div style={{ position: "relative" }}>
            <input
              placeholder={Locale.Auth.Password}
              value={accessStore.phone}
              onChange={(e) => {
                accessStore.update(
                  (access) => (access.phone = e.currentTarget.value),
                );
              }}
            />
            <BotIcon
              className={styles["auth-show-password"]}
              onClick={() => {
                var show = !showPassword;
                console.log("show psw: " + show);
                setShowPassword(show);
              }}
            />
          </div>
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
          <div className={styles["auth-action-div"]}>
            <span
              className={styles[isLogin ? "auth-action" : "auth-action-active"]}
              onClick={() => {
                isLogin ? {} : setIsLogin(true);
                setLoginPsw(true);
              }}
            >
              前往登录
            </span>
            <span className={styles["auth-action"]}> | </span>
            <span
              className={
                styles[!isLogin ? "auth-action" : "auth-action-active"]
              }
              onClick={() => {
                !isLogin ? {} : setIsLogin(false);
              }}
            >
              忘记密码
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
