import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";

const isApp = !!getClientConfig()?.isApp;

const cn = {
  WIP: "该功能仍在开发中……",
  Error: {
    Unauthorized: isApp
      ? "检测到无效 API Key，请前往[设置](/#/settings)页检查 API Key 是否配置正确。"
      : "未登录账号，请[登录](/#/auth)后使用",
    // : "访问密码不正确或为空，请前往[登录](/#/auth)页输入正确的访问密码，或者在[设置](/#/settings)页填入你自己的 OpenAI API Key。",
  },
  Auth: {
    Title: "欢迎使用",
    Tips: "未注册用户首次登陆后自动注册",
    SubTips: "或者输入你的 OpenAI API 密钥",
    Input: "在此处填写访问码",
    Confirm: "确认",
    Login: "登录",
    Later: "稍后再说",
    LoginTips: "登录/使用代表您已同意",
    LoginAnd: "和",
    Agreement: "《用户协议》",
    Privacy: "《隐私政策》",
    Phone: "手机号码",
    PhoneTips: "请输入你的手机号！",
    Password: "密码",
    PasswordTips: "密码错误，请检查！",
    PasswordTips2: "请输入8-16位, 同时至少一个数字和字母的密码",
    Code: "验证码",
    CodeTips: "验证码无效，请检查！",
    SendCode: "获取验证码",
    ResetPsw: "重置密码",
    ForgetPsw: "忘记密码",
    InputTips: "输入",
    AgreementContent:
      '咏昕科技用户协议本用户协议（以下简称"本协议"）由您与咏昕科技（以下简称"我们"或"咏昕科技"）共同缔结，本协议约定了您在使用咏昕科技提供的各项服务时，我们与您之间的权利义务关系。在您选择接受本协议或开始使用我们的任何服务时，即表示您已阅读、理解并同意接受本协议的全部内容，并愿在必要时接受本协议的相关变更。<br><br> 账户注册<br> 在您登录或使用我们的服务前，您应完成我们提供的用户注册流程，在该过程中，您应保证提供了真实、准确和完整的个人信息，并及时更新以保持信息的真实、准确和完整。<br><br> 使用规则<br> 您在使用我们的服务过程中，应遵守国家法律法规、行业惯例和社会公序良俗，不应通过我们的服务制作、复制、发布、传播任何违法、侮辱诽谤、淫秽色情、暴力血腥、恶意攻击、商业欺诈等侵害他人合法权益的内容。 <br><br>版权声明<br> 除非另行声明，我们的服务中使用的所有内容，包括但不限于文本、图像、声音、视频、软件、广告全文、商标、标识、视觉界面设计等，均属于咏昕科技所有。 服务终止 您有权随时注销您的账户或停止使用我们的服务。在必要时，我们也可以限制、暂停或终止向您提供全部或部分服务。 <br><br>免责条款<br> 我们对于任何间接、附带、特殊、惩罚性的或后果性损失（包括但不限于营业收入、预期收益、商誉或数据的损失）均不承担任何责任。 适用法律和争议解决 本协议的订立、执行和解释及争议的解决均适用中华人民共和国法律。如双方就本协议内容或执行发生任何争议，应首先友好协商，协商不成时，任何一方均可向我方所在地人民法院提起诉讼。 归咏昕科技所有, 我们将在法律允许的范围内修改、增加或削减本协议内容, 并在网站、APP或以其他方式的公告等形式通知用户。您继续使用我们的服务即视为接受修改后的协议。\n\n ——咏昕科技有限公司',
    PrivacyContent:
      "本隐私策略旨在帮助您理解我们如何收集，使用，存储和/或披露由您提供给我们的信息。\n\n 信息收集\n 当您使用我们的服务时，我们只会收集您提供的手机号。这是为了提供相关的服务和进行必要的通信。\n\n我们承诺, 未经您的同意我们不会用这些信息去做任何其他事情。 如何我们使用信息 我们会使用您的手机号提供所需服务，如发送验证码，服务更新通知等，以提升您的用户体验。 \n\n信息披露\n 除非得到您的明确同意，或因满足法规要求，我们不会将您的手机号出售，交易，或以其他方式向外部传递。保护您的信息是我们的首要责任。 \n\n信息保护\n 我们严格遵守各类信息保护法，实施各项安全措施，以确保您的手机号不被未经授权的第三方访问或滥用。 \n\n隐私策略更改\n 我们有权在任何时间更新或修改本隐私策略。任何更改将在发布后立即生效。您继续使用我们的服务将视为您接受了我们的修改后的隐私策略。 \n\n联系我们\n 如果您对此隐私政策有任何疑问，您可以通过在我们的网站上提供的联系信息与我们联系。 感谢您花时间阅读我们的隐私政策。我们重视您的隐私并承诺保护您的个人信息。\n\n 最后修改时间: 2023/12/25",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`,
  },
  Chat: {
    SubTitle: (count: number) => `共 ${count} 条对话`,
    EditMessage: {
      Title: "编辑消息记录",
      Topic: {
        Title: "聊天主题",
        SubTitle: "更改当前聊天主题",
      },
    },
    Actions: {
      ChatList: "查看消息列表",
      CompressedHistory: "查看压缩后的历史 Prompt",
      Export: "导出聊天记录",
      Copy: "复制",
      Stop: "停止",
      Retry: "重试",
      Pin: "固定",
      PinToastContent: "已将 1 条对话固定至预设提示词",
      PinToastAction: "查看",
      Delete: "删除",
      Edit: "编辑",
    },
    Commands: {
      new: "新建聊天",
      newm: "从角色新建聊天",
      next: "下一个聊天",
      prev: "上一个聊天",
      clear: "清除上下文",
      del: "删除聊天",
    },
    InputActions: {
      Stop: "停止响应",
      ToBottom: "滚到最新",
      Theme: {
        auto: "自动主题",
        light: "亮色模式",
        dark: "深色模式",
      },
      Prompt: "快捷指令",
      Masks: "所有角色",
      Clear: "清除聊天",
      Settings: "对话设置",
    },
    Rename: "重命名对话",
    Typing: "正在输入…",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} 发送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 换行";
      }
      return inputHints + "，/ 触发补全，: 触发命令";
    },
    Send: "发送",
    Config: {
      Reset: "清除记忆",
      SaveAs: "存为角色",
    },
    IsContext: "预设提示词",
  },
  Export: {
    Title: "分享聊天记录",
    Copy: "全部复制",
    Download: "下载文件",
    Share: "分享到 ShareGPT",
    MessageFromYou: "用户",
    MessageFromChatGPT: "ChatGPT",
    Format: {
      Title: "导出格式",
      SubTitle: "可以导出 Markdown 文本或者 PNG 图片",
    },
    IncludeContext: {
      Title: "包含角色上下文",
      SubTitle: "是否在消息中展示角色上下文",
    },
    Steps: {
      Select: "选取",
      Preview: "预览",
    },
    Image: {
      Toast: "正在生成截图",
      Modal: "长按或右键保存图片",
    },
  },
  Select: {
    Search: "搜索消息",
    All: "选取全部",
    Latest: "最近几条",
    Clear: "清除选中",
  },
  Memory: {
    Title: "历史摘要",
    EmptyContent: "对话内容过短，无需总结",
    Send: "自动压缩聊天记录并作为上下文发送",
    Copy: "复制摘要",
    Reset: "[unused]",
    ResetConfirm: "确认清空历史摘要？",
  },
  Home: {
    NewChat: "新的聊天",
    DeleteChat: "确认删除选中的对话？",
    DeleteToast: "已删除会话",
    Revert: "撤销",
  },
  Settings: {
    Title: "设置",
    SubTitle: "所有设置选项",

    Danger: {
      Reset: {
        Title: "重置所有设置",
        SubTitle: "重置所有设置项回默认值",
        Action: "立即重置",
        Confirm: "确认重置所有设置？",
      },
      Clear: {
        Title: "清除所有数据",
        SubTitle: "清除所有聊天、设置数据",
        Action: "立即清除",
        Confirm: "确认清除所有聊天、设置数据？",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有语言",
    },
    Avatar: "头像",
    Account: "账号",
    Logout: "退出登录",
    Balance: "算力",
    Recharge: "购买",
    FontSize: {
      Title: "字体大小",
      SubTitle: "聊天内容的字体大小",
    },
    InjectSystemPrompts: {
      Title: "注入系统级提示信息",
      SubTitle: "强制给每次请求的消息列表开头添加一个模拟 ChatGPT 的系统提示",
    },
    InputTemplate: {
      Title: "用户输入预处理",
      SubTitle: "用户最新的一条消息会填充到此模板",
    },
    Update: {
      Version: (x: string) => `当前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "检查更新",
      IsChecking: "正在检查更新...",
      FoundUpdate: (x: string) => `发现新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "发送键",
    Theme: "主题",
    TightBorder: "无边框模式",
    SendPreviewBubble: {
      Title: "预览气泡",
      SubTitle: "在预览气泡中预览 Markdown 内容",
    },
    AutoGenerateTitle: {
      Title: "自动生成标题",
      SubTitle: "根据对话内容生成合适的标题",
    },
    Sync: {
      CloudState: "云端数据",
      NotSyncYet: "还没有进行过同步",
      Success: "同步成功",
      Fail: "同步失败",

      Config: {
        Modal: {
          Title: "配置云同步",
          Check: "检查可用性",
        },
        SyncType: {
          Title: "同步类型",
          SubTitle: "选择喜爱的同步服务器",
        },
        Proxy: {
          Title: "启用代理",
          SubTitle: "在浏览器中同步时，必须启用代理以避免跨域限制",
        },
        ProxyUrl: {
          Title: "代理地址",
          SubTitle: "仅适用于本项目自带的跨域代理",
        },

        WebDav: {
          Endpoint: "WebDAV 地址",
          UserName: "用户名",
          Password: "密码",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "备份名称",
          Password: "UpStash Redis REST Token",
        },
      },

      LocalState: "本地数据",
      Overview: (overview: any) => {
        return `${overview.chat} 次对话，${overview.message} 条消息，${overview.prompt} 条提示词，${overview.mask} 个角色`;
      },
      ImportFailed: "导入失败",
    },
    Mask: {
      Splash: {
        Title: "角色启动页",
        SubTitle: "新建聊天时，展示角色启动页",
      },
      Builtin: {
        Title: "隐藏内置角色",
        SubTitle: "在所有角色列表中隐藏内置角色",
      },
    },
    Prompt: {
      Disable: {
        Title: "禁用提示词自动补全",
        SubTitle: "在输入框开头输入 / 即可触发自动补全",
      },
      List: "自定义提示词列表",
      ListCount: (builtin: number, custom: number) =>
        `内置 ${builtin} 条，用户定义 ${custom} 条`,
      Edit: "编辑",
      Modal: {
        Title: "提示词列表",
        Add: "新建",
        Search: "搜索提示词",
      },
      EditModal: {
        Title: "编辑提示词",
      },
    },
    AdvanceSetting: {
      Disable: {
        Title: "显示高级设置",
        SubTitle: "高级设置，默认使用不需要配置",
      },
    },
    HistoryCount: {
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
    },
    CompressThreshold: {
      Title: "历史消息长度压缩阈值",
      SubTitle: "当未压缩的历史消息超过该值时，将进行压缩",
    },

    Usage: {
      Title: "余额查询",
      SubTitle(used: any, total: any) {
        return `本月已使用 $${used}，订阅总额 $${total}`;
      },
      IsChecking: "正在检查…",
      Check: "重新检查",
      NoAccess: "输入 API Key 或访问密码查看余额",
    },

    Access: {
      AccessCode: {
        Title: "访问密码",
        SubTitle: "管理员已开启加密访问",
        Placeholder: "请输入访问密码",
      },
      CustomEndpoint: {
        Title: "自定义接口",
        SubTitle: "是否使用自定义 Azure 或 OpenAI 服务",
      },
      Provider: {
        Title: "模型服务商",
        SubTitle: "切换不同的服务商",
      },
      OpenAI: {
        ApiKey: {
          Title: "API Key",
          SubTitle: "使用自定义 OpenAI Key 绕过密码访问限制",
          Placeholder: "OpenAI API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "除默认地址外，必须包含 http(s)://",
        },
      },
      Azure: {
        ApiKey: {
          Title: "接口密钥",
          SubTitle: "使用自定义 Azure Key 绕过密码访问限制",
          Placeholder: "Azure API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "样例：",
        },

        ApiVerion: {
          Title: "接口版本 (azure api version)",
          SubTitle: "选择指定的部分版本",
        },
      },
      CustomModel: {
        Title: "自定义模型名",
        SubTitle: "增加自定义模型可选项，使用英文逗号隔开",
      },
    },

    Model: "模型 (model)",
    Temperature: {
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
    },
    TopP: {
      Title: "核采样 (top_p)",
      SubTitle: "与随机性类似，但不要和随机性一起更改",
    },
    MaxTokens: {
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
    },
    PresencePenalty: {
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
    },
    FrequencyPenalty: {
      Title: "频率惩罚度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重复字词",
    },
  },
  Store: {
    DefaultTopic: "新的聊天",
    BotHello: "有什么可以帮你的吗",
    Error: "出错了，稍后重试吧",
    Prompt: {
      History: (content: string) => "这是历史聊天总结作为前情提要：" + content,
      Topic:
        "使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下对话内容，用作后续的上下文提示 prompt，控制在 200 字以内",
    },
  },
  Copy: {
    Success: "已写入剪切板",
    Failed: "复制失败，请赋予剪切板权限",
  },
  Download: {
    Success: "内容已下载到您的目录。",
    Failed: "下载失败。",
  },
  Context: {
    Toast: (x: any) => `包含 ${x} 条预设提示词`,
    Edit: "当前对话设置",
    Add: "新增一条对话",
    Clear: "上下文已清除",
    Revert: "恢复上下文",
  },
  Plugin: {
    Name: "插件",
  },
  FineTuned: {
    Sysmessage: "你是一个助手",
  },
  Mask: {
    Name: "角色",
    Page: {
      Title: "预设角色",
      SubTitle: (count: number) => `${count} 个预设角色定义`,
      Search: "搜索角色",
      Create: "新建",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 条预设对话`,
      Chat: "对话",
      View: "查看",
      Edit: "编辑",
      Delete: "删除",
      DeleteConfirm: "确认删除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `编辑预设角色 ${readonly ? "（只读）" : ""}`,
      Download: "下载预设",
      Clone: "克隆预设",
    },
    Config: {
      Avatar: "角色头像",
      Name: "角色名称",
      Sync: {
        Title: "使用全局设置",
        SubTitle: "当前对话是否使用全局模型设置",
        Confirm: "当前对话的自定义设置将会被自动覆盖，确认启用全局设置？",
      },
      HideContext: {
        Title: "隐藏预设对话",
        SubTitle: "隐藏后预设对话不会出现在聊天界面",
      },
      Share: {
        Title: "分享此角色",
        SubTitle: "生成此角色的直达链接",
        Action: "复制链接",
      },
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "直接开始",
    NotShow: "不再展示",
    ConfirmNoShow: "确认禁用？禁用后可以随时在设置中重新启用。",
    Title: "挑选一个角色",
    SubTitle: "现在开始，与角色背后的灵魂思维碰撞",
    More: "查看全部",
  },

  URLCommand: {
    Code: "检测到链接中已经包含访问码，是否自动填入？",
    Settings: "检测到链接中包含了预制设置，是否自动填入？",
  },

  UI: {
    Confirm: "确认",
    Cancel: "取消",
    Close: "关闭",
    Create: "新建",
    Edit: "编辑",
    Export: "导出",
    Import: "导入",
    Sync: "同步",
    Config: "配置",
  },
  Exporter: {
    Description: {
      Title: "只有清除上下文之后的消息会被展示",
    },
    Model: "模型",
    Messages: "消息",
    Topic: "主题",
    Time: "时间",
  },
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;
