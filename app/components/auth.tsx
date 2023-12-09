import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect, useState } from "react";
import { getClientConfig } from "../config/client";
import CloseIcon from "../icons/close.svg";
import { httpRequest } from "../client/server/api";

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

  function checkParams() {
    if (phone == "") {
      setPhoneTips("请输入手机号");
      return false;
    }
    if (loginPsw && password == "") {
      setPswTips("请输入密码");
      return false;
    }
    if ((!isLogin || !loginPsw) && verifyCode == "") {
      setCodeTips("请输入验证码");
      return false;
    }
    return true;
  }

  const onClickBtn = () => {
    console.log("todo login");
    if (!checkParams()) {
      return;
    }
    let data = {
      phone: phone,
      password: password,
      verify_code: verifyCode,
    };

    if (isLogin) {
      loginPsw ? delete data.verify_code : delete data.password;
    }

    const path = isLogin ? "/user/login" : "/user/reset_password";
    httpRequest(
      path,
      {
        data: data,
      },
      {
        onFinish: (data: any) => {
          console.log(data);
          localStorage.setItem("Authorization", "123");
          // navigate(Path.Home);
        },
        onError: (err: Error) => {
          console.error(err);
          setPswTips("network error");
        },
      },
    );
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
  const [phoneTips, setPhoneTips] = useState("");
  const [codeTips, setCodeTips] = useState("");
  const [passwordTips, setPswTips] = useState("");

  const [phone, setPhone] = useState(accessStore.phone);
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");

  const phoneRegex = /^1\d{10}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

  const sendVerifyCode = () => {
    if (afterSeconds > 0) {
      return;
    }
    if (phone == "") {
      setPhoneTips("请输入手机号");
      return false;
    }
    httpRequest(
      "/user/verify_code",
      {
        data: {
          phone: phone,
          code: isLogin ? 0 : 1,
        },
      },
      {
        onFinish: (data: any) => {
          console.log(data);
          // navigate(Path.Home);
        },
        onError: (err: Error) => {
          console.error(err);
          setPswTips("network error");
        },
      },
    );
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
            {Locale.Auth.Password + Locale.Auth.Login}
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
            {Locale.Auth.Code + Locale.Auth.Login}
          </span>
        </div>

        <div className={styles["auth-tips"]}>
          {Locale.Auth.Phone}
          <span>{phoneTips}</span>
          <input
            placeholder={Locale.Auth.InputTips + Locale.Auth.Phone}
            value={phone}
            onChange={(e) => {
              const inputValue = e.currentTarget.value;
              setPhone(inputValue);
              if (inputValue == "" || phoneRegex.test(inputValue)) {
                // 输入的内容符合手机号码格式，更新状态或执行其他操作
                setPhoneTips("");
                setPhone(inputValue);
                accessStore.update((access) => (access.phone = inputValue));
              } else {
                setPhoneTips(Locale.Auth.PhoneTips);
              }
            }}
          />
        </div>

        <div
          className={styles["auth-tips"]}
          style={{ display: isLogin && loginPsw ? "none" : "" }}
        >
          {Locale.Auth.Code}
          <span>{codeTips}</span>
          <div style={{ position: "relative" }}>
            <input
              placeholder={Locale.Auth.InputTips + Locale.Auth.Code}
              value={verifyCode}
              onChange={(e) => {
                setVerifyCode(e.currentTarget.value);
                if (e.currentTarget.value !== "") {
                  setCodeTips("");
                }
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
              {afterSeconds > 0 ? afterSeconds + " s" : Locale.Auth.SendCode}
            </a>
          </div>
        </div>

        <div
          className={styles["auth-tips"]}
          style={{ display: isLogin && !loginPsw ? "none" : "" }}
        >
          {Locale.Auth.Password}
          <span>{passwordTips}</span>
          <div style={{ position: "relative" }}>
            <input
              placeholder={Locale.Auth.InputTips + Locale.Auth.Password}
              value={password}
              type={showPassword ? "" : "password"}
              security={"true"}
              onChange={(e) => {
                var inputStr = e.currentTarget.value;
                setPassword(inputStr);
                if (passwordRegex.test(inputStr) || inputStr == "") {
                  // 输入的内容符合密码格式或为空，更新状态
                  setPswTips("");
                } else {
                  setPswTips(isLogin ? "" : Locale.Auth.PasswordTips2);
                }
              }}
            />
            <BotIcon
              className={styles["auth-show-password"]}
              onClick={() => {
                var show = !showPassword;
                setShowPassword(show);
              }}
            />
          </div>
        </div>

        <div className={styles["auth-login"]}>
          <IconButton
            text={isLogin ? Locale.Auth.Login : Locale.Auth.ResetPsw}
            type="primary"
            onClick={onClickBtn}
          />
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
              {Locale.Auth.Login}
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
              {Locale.Auth.ForgetPsw}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
