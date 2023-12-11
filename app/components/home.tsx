"use client";

import { position } from "unist-util-position";

require("../polyfill");

import { useState, useEffect } from "react";

import styles from "./home.module.scss";

import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import CloseIcon from "../icons/close.svg";
import RechargePopTipsImg from "../../public/recharge-pop-tips.png";
import LogoImg from "../icons/chatgpt.png";
import LightingIcon from "../icons/lightning-fill.svg";

import { getCSSVar, useMobileScreen } from "../utils";

import dynamic from "next/dynamic";
import { Path, SlotID } from "../constant";
import { ErrorBoundary } from "./error";

import { getISOLang, getLang } from "../locales";

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
import { AuthPage } from "./auth";
import { getClientConfig } from "../config/client";
import { api } from "../client/api";
import { useAccessStore } from "../store";
import UploadIcon from "@/app/icons/upload.svg";
import Locale from "@/app/locales";
import { IconButton } from "./button";
import Image from "next/image";
import AddIcon from "@/app/icons/add.svg";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const NewChat = dynamic(async () => (await import("./new-chat")).NewChat, {
  loading: () => <Loading noLogo />,
});

const MaskPage = dynamic(async () => (await import("./mask")).MaskPage, {
  loading: () => <Loading noLogo />,
});

export function useSwitchTheme() {
  const config = useAppConfig();

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (config.theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--theme-color");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}

function useHtmlLang() {
  useEffect(() => {
    const lang = getISOLang();
    const htmlLang = document.documentElement.lang;

    if (lang !== htmlLang) {
      document.documentElement.lang = lang;
    }
  }, []);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const loadAsyncGoogleFont = () => {
  const linkEl = document.createElement("link");
  const proxyFontUrl = "/google-fonts";
  const remoteFontUrl = "https://fonts.googleapis.com";
  const googleFontUrl =
    getClientConfig()?.buildMode === "export" ? remoteFontUrl : proxyFontUrl;
  linkEl.rel = "stylesheet";
  linkEl.href =
    googleFontUrl +
    "/css2?family=" +
    encodeURIComponent("Noto Sans:wght@300;400;700;900") +
    "&display=swap";
  document.head.appendChild(linkEl);
};

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  const isAuth = location.pathname === Path.Auth;
  const isMobileScreen = useMobileScreen();
  const shouldTightBorder =
    getClientConfig()?.isApp || (config.tightBorder && !isMobileScreen);
  const [popRecharge, setPopRecharge] = useState(false);

  useEffect(() => {
    loadAsyncGoogleFont();
  }, []);

  return (
    <div
      className={
        styles.container +
        ` ${shouldTightBorder ? styles["tight-container"] : styles.container} ${
          getLang() === "ar" ? styles["rtl-screen"] : ""
        }`
      }
    >
      {isAuth ? (
        <>
          <AuthPage />
        </>
      ) : (
        <>
          <div className={styles["page-header"]}>
            <div className={styles["logo-container"]}>
              <div>
                <Image src={LogoImg} alt={""} width={35} height={35} />
              </div>
              <div className={styles["logo-text"]}>
                <div className={styles["logo-text-line1"]}>EasyChat</div>
                <div className={styles["logo-text-line2"]}>
                  让每个人都能享受ai带来的便利
                </div>
              </div>
            </div>
            <IconButton
              icon={<LightingIcon />}
              text={"4w"}
              className={styles["watt-btn"]}
              onClick={() => {
                setPopRecharge(true);
              }}
            />
          </div>
          <SideBar className={isHome ? styles["sidebar-show"] : ""} />

          <div className={styles["window-content"]} id={SlotID.AppBody}>
            <Routes>
              <Route path={Path.Home} element={<Chat />} />
              <Route path={Path.NewChat} element={<NewChat />} />
              <Route path={Path.Masks} element={<MaskPage />} />
              <Route path={Path.Chat} element={<Chat />} />
              <Route path={Path.Settings} element={<Settings />} />
            </Routes>
          </div>
        </>
      )}
      {popRecharge ? (
        <>
          <div
            className={styles["recharge-pop-mask"]}
            onClick={() => {
              setPopRecharge(false);
            }}
          ></div>
          <div className={popRecharge ? styles["recharge-pop"] : ""}>
            <div className={styles["recharge-pop-head"]}>
              <div className={styles["recharge-pop-user-info"]}>
                <div className={styles["recharge-pop-user-info-phone"]}>
                  账号：13021015362
                </div>
                <div className={styles["recharge-pop-user-info-watt"]}>
                  剩余算力：
                  <span className={styles["recharge-pop-user-info-watt-num"]}>
                    15132
                  </span>
                </div>
              </div>
              <div className={styles["recharge-pop-close"]}>
                <IconButton
                  icon={<CloseIcon />}
                  className={styles["recharge-pop-close-icon"]}
                  onClick={() => {
                    setPopRecharge(false);
                  }}
                />
              </div>
            </div>
            <div className={styles["recharge-pop-body"]}>
              <div className={styles["recharge-pop-body-title"]}>
                <div>购买算力</div>
                <div className={styles["recharge-pop-body-title-question"]}>
                  常见问题
                </div>
              </div>
              <div className={styles["recharge-pop-body-other"]}>
                <div className={styles["recharge-pop-body-other-left"]}>
                  <Image
                    src={RechargePopTipsImg}
                    alt={""}
                    width={322}
                    height={469}
                    className={styles["recharge-pop-body-tips"]}
                  />
                </div>
                <div className={styles["recharge-pop-body-other-right"]}>
                  <div className={styles["recharge-pop-plan"]}></div>
                  <div className={styles["recharge-pop-pay"]}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export function useLoadData() {
  const config = useAppConfig();

  useEffect(() => {
    (async () => {
      const models = await api.llm.models();
      config.mergeModels(models);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function Home() {
  useSwitchTheme();
  useLoadData();
  useHtmlLang();

  useEffect(() => {
    console.log("[Config] got config from build time", getClientConfig());
    useAccessStore.getState().fetch();
  }, []);

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Screen />
      </Router>
    </ErrorBoundary>
  );
}
