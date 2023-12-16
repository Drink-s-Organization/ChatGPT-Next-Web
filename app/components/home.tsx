"use client";

import { position } from "unist-util-position";

require("../polyfill");

import { useState, useEffect, useRef } from "react";

import styles from "./home.module.scss";

import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";
import CloseIcon from "../icons/close.svg";
import RechargePopTipsImg from "../../public/recharge-pop-tips.png";
import LogoImg from "../icons/chatgpt.png";
import LightingIcon from "../icons/lightning-fill.svg";
import WeChatPayIcon from "../icons/wechat-pay.svg";
import AlipayIcon from "../icons/alipay.svg";
import CouponIcon from "../icons/coupon.svg";

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
  useNavigate,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
import { AuthPage } from "./auth";
import { getClientConfig } from "../config/client";
import { api } from "../client/api";
import { useAccessStore } from "../store";
import { IconButton } from "./button";
import Image from "next/image";
import { httpRequest } from "@/app/client/server/api";
import QRCode from "react-qr-code";

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
  const navigate = useNavigate();
  const accessStore = useAccessStore();
  const [popRecharge, setPopRecharge] = useState(false);
  const [popRechargePurchase, setPopRechargePurchase] = useState(true);
  const purchaseWattPlan = [
    {
      tips: "4k算力≈20w字",
      goods_count: 4000,
      now_amount: 15.99,
      origin_amount: 20.0,
      discount: 4.01,
    },
    {
      tips: "1w算力≈50w字",
      goods_count: 10000,
      now_amount: 39.99,
      origin_amount: 50.0,
      discount: 10.01,
    },
    {
      tips: "2w算力≈100w字",
      goods_count: 20000,
      now_amount: 69.99,
      origin_amount: 100.0,
      discount: 30.01,
    },
  ];
  const [choosePurchasePlan, setChoosePurchasePlan] = useState(0);
  const [choosePayWay, setChoosePayWay] = useState(1);
  const [wechatPayCodeUrl, setWechatPayCodeUrl] = useState("");
  const [alipayCodeUrl, setAlipayCodeUrl] = useState("");
  const isLogin = localStorage.getItem("Authorization") != null;
  const choosePurchasePlanRef = useRef(choosePurchasePlan);
  const choosePayWayRef = useRef(choosePayWay);
  const popRechargeRef = useRef(popRecharge);
  const getPayQRCode = () => {
    let requestParams = {
      channel: choosePayWay,
      amount: Number(
        (purchaseWattPlan[choosePurchasePlan].now_amount - 10).toFixed(2),
      ),
      goods_name: purchaseWattPlan[choosePurchasePlan].tips,
      goods_count: purchaseWattPlan[choosePurchasePlan].goods_count,
      out_trade_no:
        choosePayWay == 1
          ? accessStore.outTradeNo[choosePurchasePlan].wechat_pay
          : accessStore.outTradeNo[choosePurchasePlan].alipay,
    };
    httpRequest(
      "/order/prepay",
      { data: requestParams },
      {
        onFinish: (resp: any) => {
          if (choosePayWay == 1) {
            setWechatPayCodeUrl(resp["data"]["code_url"]);
            accessStore.outTradeNo[choosePurchasePlan].wechat_pay =
              resp["data"]["out_trade_no"];
          } else if (choosePayWay == 2) {
            setAlipayCodeUrl(resp["data"]["code_url"]);
            accessStore.outTradeNo[choosePurchasePlan].alipay =
              resp["data"]["out_trade_no"];
          }
        },
      },
    );
  };

  const getPayOrderStatus = () => {
    if (!popRechargeRef.current) {
      return;
    }
    let outTradeNo =
      choosePayWayRef.current == 1
        ? accessStore.outTradeNo[choosePurchasePlanRef.current].wechat_pay
        : accessStore.outTradeNo[choosePurchasePlanRef.current].alipay;
    if (outTradeNo == "") {
      setTimeout(getPayOrderStatus, 1000);
      return;
    }
    let url = "/order/status?out_trade_no=" + outTradeNo;
    httpRequest(
      url,
      {
        method: "GET",
      },
      {
        onFinish: (resp: any) => {
          let order_status = resp["data"]["order_status"];
          if (order_status == 2) {
            console.log("订单完成，跳转");
          } else if (order_status == 1) {
            console.log("订单未完成，跳转");
          } else {
            setTimeout(getPayOrderStatus, 1000);
          }
        },
      },
    );
  };

  useEffect(() => {
    loadAsyncGoogleFont();
  }, []);
  useEffect(() => {
    choosePayWayRef.current = choosePayWay;
    choosePurchasePlanRef.current = choosePurchasePlan;
    getPayQRCode();
  }, [choosePayWay, choosePurchasePlan]);
  useEffect(() => {
    popRechargeRef.current = popRecharge;
    if (popRecharge) {
      getPayOrderStatus();
    }
  }, [popRecharge]);

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
                  让人人享受AI带来的便利
                </div>
              </div>
            </div>
            <IconButton
              icon={<LightingIcon />}
              text={String(accessStore.Watt)}
              className={styles["watt-btn"]}
              noDark={true}
              onClick={() => {
                if (isLogin) {
                  setPopRecharge(true);
                  getPayQRCode();
                } else {
                  navigate(Path.Auth);
                }
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
                  账号{accessStore.phone}
                </div>
                <div className={styles["recharge-pop-user-info-watt"]}>
                  剩余算力
                  <span className={styles["recharge-pop-user-info-watt-num"]}>
                    {accessStore.Watt}
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
                <div
                  className={
                    popRechargePurchase
                      ? styles["recharge-pop-body-title-choose"]
                      : ""
                  }
                  onClick={() => {
                    setPopRechargePurchase(true);
                  }}
                >
                  购买算力
                </div>
                <div
                  className={
                    styles["recharge-pop-body-title-question"] +
                    ` ${
                      !popRechargePurchase
                        ? styles["recharge-pop-body-title-choose"]
                        : ""
                    }`
                  }
                  onClick={() => {
                    setPopRechargePurchase(false);
                  }}
                >
                  常见问题
                </div>
              </div>
              {popRechargePurchase ? (
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
                    <div className={styles["recharge-pop-plan"]}>
                      <div
                        className={
                          styles["recharge-pop-plan-item"] +
                          ` ${
                            choosePurchasePlan == 0
                              ? styles["recharge-pop-plan-item-choose"]
                              : ""
                          }`
                        }
                        onClick={() => {
                          setChoosePurchasePlan(0);
                        }}
                      >
                        <div className={styles["recharge-pop-plan-item-joule"]}>
                          {purchaseWattPlan[0].tips}
                        </div>
                        <div className={styles["recharge-pop-plan-item-price"]}>
                          ¥{purchaseWattPlan[0].now_amount}
                        </div>
                        <div
                          className={
                            styles["recharge-pop-plan-item-origin-price"]
                          }
                        >
                          ¥{purchaseWattPlan[0].origin_amount}
                        </div>
                        <div
                          className={styles["recharge-pop-plan-item-discount"]}
                        >
                          立减{purchaseWattPlan[0].discount}
                        </div>
                      </div>
                      <div
                        className={
                          styles["recharge-pop-plan-item"] +
                          ` ${
                            choosePurchasePlan == 1
                              ? styles["recharge-pop-plan-item-choose"]
                              : ""
                          }`
                        }
                        onClick={() => {
                          setChoosePurchasePlan(1);
                        }}
                      >
                        <div className={styles["recharge-pop-plan-item-joule"]}>
                          {purchaseWattPlan[1].tips}
                        </div>
                        <div className={styles["recharge-pop-plan-item-price"]}>
                          ¥{purchaseWattPlan[1].now_amount}
                        </div>
                        <div
                          className={
                            styles["recharge-pop-plan-item-origin-price"]
                          }
                        >
                          ¥{purchaseWattPlan[1].origin_amount}
                        </div>
                        <div
                          className={styles["recharge-pop-plan-item-discount"]}
                        >
                          立减{purchaseWattPlan[1].discount}
                        </div>
                      </div>
                      <div
                        className={
                          styles["recharge-pop-plan-item"] +
                          ` ${
                            choosePurchasePlan == 2
                              ? styles["recharge-pop-plan-item-choose"]
                              : ""
                          }`
                        }
                        onClick={() => {
                          setChoosePurchasePlan(2);
                        }}
                      >
                        <div className={styles["recharge-pop-plan-item-joule"]}>
                          {purchaseWattPlan[2].tips}
                        </div>
                        <div className={styles["recharge-pop-plan-item-price"]}>
                          ¥{purchaseWattPlan[2].now_amount}
                        </div>
                        <div
                          className={
                            styles["recharge-pop-plan-item-origin-price"]
                          }
                        >
                          ¥{purchaseWattPlan[2].origin_amount}
                        </div>
                        <div
                          className={styles["recharge-pop-plan-item-discount"]}
                        >
                          立减{purchaseWattPlan[2].discount}
                        </div>
                      </div>
                    </div>
                    <div className={styles["recharge-pop-pay"]}>
                      <div className={styles["recharge-pop-pay-title"]}>
                        <div
                          className={
                            styles["recharge-pop-pay-title-item"] +
                            " no-dark" +
                            ` ${
                              choosePayWay == 1
                                ? styles["recharge-pop-pay-title-item-choose"]
                                : ""
                            }`
                          }
                          onClick={() => {
                            setChoosePayWay(1);
                          }}
                        >
                          {
                            <WeChatPayIcon
                              className={
                                styles["recharge-pop-pay-title-item-icon"]
                              }
                            />
                          }
                          微信支付
                        </div>
                        <div
                          className={
                            styles["recharge-pop-pay-title-item"] +
                            " no-dark " +
                            ` ${
                              choosePayWay == 2
                                ? styles["recharge-pop-pay-title-item-choose"]
                                : ""
                            }`
                          }
                          onClick={() => {
                            setChoosePayWay(2);
                          }}
                        >
                          {
                            <AlipayIcon
                              className={
                                styles["recharge-pop-pay-title-item-icon"]
                              }
                            />
                          }
                          支付宝支付
                        </div>
                      </div>
                      <div className={styles["recharge-pop-pay-content"]}>
                        <div
                          className={styles["recharge-pop-pay-content-left"]}
                        >
                          <div className={styles["recharge-pop-pay-code"]}>
                            <QRCode
                              value={
                                choosePayWay == 1
                                  ? wechatPayCodeUrl
                                  : alipayCodeUrl
                              }
                              className={styles["pay-qrcode-image"]}
                            />
                          </div>
                          <div className={styles["recharge-pop-pay-code-tips"]}>
                            打开{choosePayWay == 1 ? "微信" : "支付宝"}扫一扫
                          </div>
                        </div>
                        <div
                          className={styles["recharge-pop-pay-content-right"]}
                        >
                          <div
                            className={
                              styles["recharge-pop-new-user-discount"] +
                              " no-dark"
                            }
                          >
                            {<CouponIcon width={18} height={15} />}
                            新用户首单优惠¥10
                          </div>
                          <div className={styles["recharge-pop-goods"]}>
                            购买商品：
                            <span className={styles["recharge-pop-goods-info"]}>
                              {purchaseWattPlan[choosePurchasePlan].goods_count}
                              算力
                            </span>
                          </div>
                          <div
                            className={
                              styles["recharge-pop-goods"] +
                              ` ${styles["recharge-pop-goods-margin-top"]}`
                            }
                          >
                            订单金额：
                            <span className={styles["recharge-pop-goods-info"]}>
                              ¥
                              {
                                purchaseWattPlan[choosePurchasePlan]
                                  .origin_amount
                              }
                              -¥{purchaseWattPlan[choosePurchasePlan].discount}
                              (限时优惠)-¥10(首单减免)
                            </span>
                          </div>
                          <div
                            className={
                              styles["recharge-pop-order-final-amount"]
                            }
                          >
                            <span
                              className={
                                styles["recharge-pop-order-final-amount-agree"]
                              }
                            >
                              同意并支付
                            </span>
                            <span
                              className={
                                styles["recharge-pop-order-final-amount-last"]
                              }
                            >
                              ¥
                              {(
                                purchaseWattPlan[choosePurchasePlan]
                                  .now_amount - 10
                              ).toFixed(2)}
                            </span>
                            <span
                              className={
                                styles["recharge-pop-order-final-amount-origin"]
                              }
                            >
                              ¥
                              {
                                purchaseWattPlan[choosePurchasePlan]
                                  .origin_amount
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles["recharge-pop-body-question"]}>
                  <div className={styles["recharge-pop-body-question-item"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-title"]
                      }
                    >
                      什么是算力？
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-content"]
                      }
                    >
                      「算力」是平台内部的货币。使用&nbsp;AI&nbsp;模型需要消耗一定算力。获得的算力不能提现或转赠给他人，只能在平台内部使用。
                    </div>
                  </div>
                  <div className={styles["recharge-pop-body-question-item"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-title"]
                      }
                    >
                      平台服务是否提供免费试用？
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-content"]
                      }
                    >
                      提供，我们为每一个新注册的用户提供99算力。此外首次购买将享受折上折，在原有打折的基础上立减10元。
                    </div>
                  </div>
                  <div className={styles["recharge-pop-body-question-item"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-title"]
                      }
                    >
                      我上个月没用完的算力会失效吗？
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-content"]
                      }
                    >
                      我们不同于其他平台,我们的算力不会按月重置,所有购买的算力只会在调用模型时消耗。
                    </div>
                  </div>
                  <div className={styles["recharge-pop-body-question-item"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-title"]
                      }
                    >
                      有时候会觉得算力消耗的比预期快，这是什么原因？
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-content"]
                      }
                    >
                      在连续对话时，会带入之前所有的提问和回复内容作为上下文，以生成连贯且有意义的句子。需要注意的是，随着对话的进行，每次提问所需的算力将会增加。因此，我们建议您针对不同的话题创建新的对话。
                    </div>
                  </div>
                  <div className={styles["recharge-pop-body-question-item"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-title"]
                      }
                    >
                      我可以开发票吗？
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-item-content"]
                      }
                    >
                      您可以联系平台客服或发送邮件到support@yoooxin.cn，主题为&ldquo;申请发票&rdquo;，并在邮件中注明你的注册手机号、开票订单和开票信息。我们会尽快为你处理。
                    </div>
                  </div>
                  <div className={styles["recharge-pop-body-question-contact"]}>
                    <div
                      className={
                        styles["recharge-pop-body-question-contact-title"]
                      }
                    >
                      联系我们
                    </div>
                    <div
                      className={
                        styles["recharge-pop-body-question-contact-content"]
                      }
                    >
                      <div
                        className={
                          styles[
                            "recharge-pop-body-question-contact-content-item"
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-image"
                            ]
                          }
                        >
                          <Image
                            src={LogoImg}
                            alt={""}
                            height={95}
                            width={95}
                          />
                        </div>
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-tips"
                            ]
                          }
                        >
                          客服微信
                        </div>
                      </div>
                      <div
                        className={
                          styles[
                            "recharge-pop-body-question-contact-content-item"
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-image"
                            ]
                          }
                        >
                          <Image
                            src={LogoImg}
                            alt={""}
                            height={95}
                            width={95}
                          />
                        </div>
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-tips"
                            ]
                          }
                        >
                          客服微信
                        </div>
                      </div>
                      <div
                        className={
                          styles[
                            "recharge-pop-body-question-contact-content-item"
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-image"
                            ]
                          }
                        >
                          <Image
                            src={LogoImg}
                            alt={""}
                            height={95}
                            width={95}
                          />
                        </div>
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-tips"
                            ]
                          }
                        >
                          客服微信
                        </div>
                      </div>
                      <div
                        className={
                          styles[
                            "recharge-pop-body-question-contact-content-item"
                          ]
                        }
                      >
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-image"
                            ]
                          }
                        >
                          <Image
                            src={LogoImg}
                            alt={""}
                            height={95}
                            width={95}
                          />
                        </div>
                        <div
                          className={
                            styles[
                              "recharge-pop-body-question-contact-content-item-tips"
                            ]
                          }
                        >
                          客服微信
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
