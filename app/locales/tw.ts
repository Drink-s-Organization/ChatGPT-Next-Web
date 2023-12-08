import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const tw: PartialLocaleType = {
  WIP: "該功能仍在開發中……",
  Error: {
    Unauthorized: "目前您的狀態是未授權，請前往[設定頁面](/#/auth)輸入授權碼。",
  },
  Auth: {
    Title: "歡迎使用",
    Tips: "未注册用戶首次登陸後自動注册",
    SubTips: "或者輸入你的OpenAI API金鑰",
    Input: "在此處填寫訪問碼",
    Confirm: "確認",
    Login: "登录",
    Later: "稍後再說",
    LoginTips: "登录/使用代表您已同意",
    LoginAnd: "和",
    Agreement: "《用戶協議》",
    Privacy: "《隱私政策》",
    Phone: "手機號碼",
    PhoneTips: "請輸入你的手機號！",
    Code: "驗證碼",
    CodeTips: "驗證碼無效，請檢查！",
    SendCode: "獲取驗證碼",
    Password: "密碼",
    ResetPsw: "重置密碼",
    ForgetPsw: "忘記密碼",
    InputTips: "輸入",
    PasswordTips: "密碼錯誤，請檢查！",
    PasswordTips2: "請輸入8-16位, 同時至少一個數位和字母的密碼",
    AgreementContent:
      '咏昕科技用户协议本用户协议（以下简称"本协议"）由您与咏昕科技（以下简称"我们"或"咏昕科技"）共同缔结，本协议约定了您在使用咏昕科技提供的各项服务时，我们与您之间的权利义务关系。在您选择接受本协议或开始使用我们的任何服务时，即表示您已阅读、理解并同意接受本协议的全部内容，并愿在必要时接受本协议的相关变更。<br><br> 账户注册<br> 在您登录或使用我们的服务前，您应完成我们提供的用户注册流程，在该过程中，您应保证提供了真实、准确和完整的个人信息，并及时更新以保持信息的真实、准确和完整。<br><br> 使用规则<br> 您在使用我们的服务过程中，应遵守国家法律法规、行业惯例和社会公序良俗，不应通过我们的服务制作、复制、发布、传播任何违法、侮辱诽谤、淫秽色情、暴力血腥、恶意攻击、商业欺诈等侵害他人合法权益的内容。 <br><br>版权声明<br> 除非另行声明，我们的服务中使用的所有内容，包括但不限于文本、图像、声音、视频、软件、广告全文、商标、标识、视觉界面设计等，均属于咏昕科技所有。 服务终止 您有权随时注销您的账户或停止使用我们的服务。在必要时，我们也可以限制、暂停或终止向您提供全部或部分服务。 <br><br>免责条款<br> 我们对于任何间接、附带、特殊、惩罚性的或后果性损失（包括但不限于营业收入、预期收益、商誉或数据的损失）均不承担任何责任。 适用法律和争议解决 本协议的订立、执行和解释及争议的解决均适用中华人民共和国法律。如双方就本协议内容或执行发生任何争议，应首先友好协商，协商不成时，任何一方均可向我方所在地人民法院提起诉讼。 归咏昕科技所有, 我们将在法律允许的范围内修改、增加或削减本协议内容, 并在网站、APP或以其他方式的公告等形式通知用户。您继续使用我们的服务即视为接受修改后的协议。\n\n ——咏昕科技有限公司',
    PrivacyContent:
      "本隐私策略旨在帮助您理解我们如何收集，使用，存储和/或披露由您提供给我们的信息。\n\n 信息收集\n 当您使用我们的服务时，我们只会收集您提供的手机号。这是为了提供相关的服务和进行必要的通信。\n\n我们承诺, 未经您的同意我们不会用这些信息去做任何其他事情。 如何我们使用信息 我们会使用您的手机号提供所需服务，如发送验证码，服务更新通知等，以提升您的用户体验。 \n\n信息披露\n 除非得到您的明确同意，或因满足法规要求，我们不会将您的手机号出售，交易，或以其他方式向外部传递。保护您的信息是我们的首要责任。 \n\n信息保护\n 我们严格遵守各类信息保护法，实施各项安全措施，以确保您的手机号不被未经授权的第三方访问或滥用。 \n\n隐私策略更改\n 我们有权在任何时间更新或修改本隐私策略。任何更改将在发布后立即生效。您继续使用我们的服务将视为您接受了我们的修改后的隐私策略。 \n\n联系我们\n 如果您对此隐私政策有任何疑问，您可以通过在我们的网站上提供的联系信息与我们联系。 感谢您花时间阅读我们的隐私政策。我们重视您的隐私并承诺保护您的个人信息。\n\n 最后修改时间: 2023/12/25",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 則對話`,
  },
  Chat: {
    SubTitle: (count: number) => `您已經與 ChatGPT 進行了 ${count} 則對話`,
    Actions: {
      ChatList: "檢視訊息列表",
      CompressedHistory: "檢視壓縮後的歷史 Prompt",
      Export: "匯出聊天紀錄",
      Copy: "複製",
      Stop: "停止",
      Retry: "重試",
      Delete: "刪除",
    },
    Rename: "重新命名對話",
    Typing: "正在輸入…",
    Input: (submitKey: string) => {
      var inputHints = `輸入訊息後，按下 ${submitKey} 鍵即可傳送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 鍵換行";
      }
      return inputHints;
    },
    Send: "傳送",
    Config: {
      Reset: "重設",
      SaveAs: "另存新檔",
    },
  },
  Export: {
    Title: "將聊天記錄匯出為 Markdown",
    Copy: "複製全部",
    Download: "下載檔案",
    MessageFromYou: "來自您的訊息",
    MessageFromChatGPT: "來自 ChatGPT 的訊息",
  },
  Memory: {
    Title: "上下文記憶 Prompt",
    EmptyContent: "尚未記憶",
    Copy: "複製全部",
    Send: "傳送記憶",
    Reset: "重設對話",
    ResetConfirm: "重設後將清除目前對話記錄以及歷史記憶，確認重設？",
  },
  Home: {
    NewChat: "新的對話",
    DeleteChat: "確定要刪除選取的對話嗎？",
    DeleteToast: "已刪除對話",
    Revert: "撤銷",
  },
  Settings: {
    Title: "設定",
    SubTitle: "設定選項",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有語言",
    },
    Avatar: "大頭貼",
    Account: "帳號：",
    Logout: "登出",
    Balance: "算力：",
    Recharge: "購買",
    FontSize: {
      Title: "字型大小",
      SubTitle: "聊天內容的字型大小",
    },
    InjectSystemPrompts: {
      Title: "匯入系統提示",
      SubTitle: "強制在每個請求的訊息列表開頭新增一個模擬 ChatGPT 的系統提示",
    },
    Update: {
      Version: (x: string) => `目前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "檢查更新",
      IsChecking: "正在檢查更新...",
      FoundUpdate: (x: string) => `發現新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "傳送鍵",
    Theme: "主題",
    TightBorder: "緊湊邊框",
    SendPreviewBubble: {
      Title: "預覽氣泡",
      SubTitle: "在預覽氣泡中預覽 Markdown 內容",
    },
    Mask: {
      Splash: {
        Title: "角色啟動頁面",
        SubTitle: "新增聊天時，呈現角色啟動頁面",
      },
    },
    Prompt: {
      Disable: {
        Title: "停用提示詞自動補齊",
        SubTitle: "在輸入框開頭輸入 / 即可觸發自動補齊",
      },
      List: "自定義提示詞列表",
      ListCount: (builtin: number, custom: number) =>
        `內建 ${builtin} 條，使用者定義 ${custom} 條`,
      Edit: "編輯",
      Modal: {
        Title: "提示詞列表",
        Add: "新增一條",
        Search: "搜尋提示詞",
      },
      EditModal: {
        Title: "編輯提示詞",
      },
    },
    HistoryCount: {
      Title: "附帶歷史訊息數",
      SubTitle: "每次請求附帶的歷史訊息數",
    },
    CompressThreshold: {
      Title: "歷史訊息長度壓縮閾值",
      SubTitle: "當未壓縮的歷史訊息超過該值時，將進行壓縮",
    },

    Usage: {
      Title: "帳戶餘額",
      SubTitle(used: any, total: any) {
        return `本月已使用 $${used}，訂閱總額 $${total}`;
      },
      IsChecking: "正在檢查…",
      Check: "重新檢查",
      NoAccess: "輸入 API Key 檢視餘額",
    },

    Model: "模型 (model)",
    Temperature: {
      Title: "隨機性 (temperature)",
      SubTitle: "值越大，回應越隨機",
    },
    MaxTokens: {
      Title: "單次回應限制 (max_tokens)",
      SubTitle: "單次互動所用的最大 Token 數",
    },
    PresencePenalty: {
      Title: "話題新穎度 (presence_penalty)",
      SubTitle: "值越大，越有可能拓展到新話題",
    },
    FrequencyPenalty: {
      Title: "頻率懲罰度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重複字詞",
    },
  },
  Store: {
    DefaultTopic: "新的對話",
    BotHello: "請問需要我的協助嗎？",
    Error: "出錯了，請稍後再嘗試",
    Prompt: {
      History: (content: string) =>
        "這是 AI 與使用者的歷史聊天總結，作為前情提要：" + content,
      Topic:
        "Use the language used by the user (e.g. en for english conversation, zh-hant for chinese conversation, etc.) to generate a title (at most 6 words) summarizing our conversation without any lead-in, quotation marks, preamble like 'Title:', direct text copies, single-word replies, quotation marks, translations, or brackets. Remove enclosing quotation marks. The title should make third-party grasp the essence of the conversation in first sight.",
      Summarize:
        "Use the language used by the user (e.g. en-us for english conversation, zh-hant for chinese conversation, etc.) to summarise the conversation in at most 200 words. The summary will be used as prompt for you to continue the conversation in the future.",
    },
  },
  Copy: {
    Success: "已複製到剪貼簿中",
    Failed: "複製失敗，請賦予剪貼簿權限",
  },
  Context: {
    Toast: (x: any) => `已設定 ${x} 條前置上下文`,
    Edit: "前置上下文和歷史記憶",
    Add: "新增一條",
  },
  Plugin: { Name: "外掛" },
  FineTuned: { Sysmessage: "你是一個助手" },
  Mask: {
    Name: "角色",
    Page: {
      Title: "預設角色角色",
      SubTitle: (count: number) => `${count} 個預設角色定義`,
      Search: "搜尋角色角色",
      Create: "新增",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 條預設對話`,
      Chat: "對話",
      View: "檢視",
      Edit: "編輯",
      Delete: "刪除",
      DeleteConfirm: "確認刪除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `編輯預設角色 ${readonly ? "（只讀）" : ""}`,
      Download: "下載預設",
      Clone: "複製預設",
    },
    Config: {
      Avatar: "角色頭像",
      Name: "角色名稱",
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "跳過",
    Title: "挑選一個角色",
    SubTitle: "現在開始，與角色背後的靈魂思維碰撞",
    More: "搜尋更多",
    NotShow: "不再呈現",
    ConfirmNoShow: "確認停用？停用後可以隨時在設定中重新啟用。",
  },
  UI: {
    Confirm: "確認",
    Cancel: "取消",
    Close: "關閉",
    Create: "新增",
    Edit: "編輯",
  },
  Exporter: {
    Model: "模型",
    Messages: "訊息",
    Topic: "主題",
    Time: "時間",
  },
};

export default tw;
