# PPT Resume Skill 🚀

> 🌌 **Interactive Space-Themed Presentation Resume & Portfolio Website Generator Skill for AI Coding Agents**

`ppt-resume-skill` 是一个为 AI 编程助手（如 Google Antigravity、Claude Code 等）设计的**自定义技能（Agent Skill）**。它能够引导 AI 助手根据你的个人经历、项目详情或 README 文档，自动从零生成一个高保真、响应式、极具太空科幻感的**单文件横向幻灯片网页简历（PPT Resume）**。

---

## 🌟 核心特性

- **🚀 自动智能生成**：只需提供简历数据（或让 AI 从你的项目中提取），AI 助手将遵循本 Skill 的指引，自动生成完整的网页简历。支持**单文件（All-in-one HTML）**或**多文件（HTML/CSS/JS 分离）**模式输出。
- **🌌 动态主题背景**：内置 Canvas 粒子星空引擎（太空科幻），并已扩展至动态拓扑网格地图（航海探索）引擎，支持自定义图形与渲染逻辑。
- **📱 全渠道交互控制**：
  - **键盘控制**：支持 `Space` / `ArrowRight` / `ArrowLeft` 切换，`Home` / `End` 边界跳转，`ESC` 打开系统索引。
  - **滑轮/手势**：支持鼠标滚轮段落过渡、移动端双向手势轻扫（Swipe）。
- **🔮 玻璃拟态与主题适配**：
  - 炫酷的暗黑宇宙模式（带霓虹发光边框）。
  - 柔和的亮色极简模式（温暖纸张色调与深色文字）。
- **🎯 沉浸式微动效**：
  - 内置了极具极客风格的**自定义游戏级准星光标（Custom Gaming Cursor）**。
  - **滚动入场动画**：支持通过 `.active-slide` 和 `.animate-fade-in` 触发元素的逐级入场淡入效果。
- **🎨 专属悬浮微动画**：根据项目技术栈，卡片可自动配备不同类型的微动画组件：
  - **Auto-Gen / 工作流**：霓虹扫描线 + 字符闪烁（`scan-line`）
  - **Multi-Agent / 多智能体**：多轨道星体绕核运动（`orbit`）
  - **RAG / 知识库**：四角星芒闪烁漂浮（`sparkle`）
  - **Chat / 助手**：气泡微粒序列徐徐上升（`chat`）
  - **Ops / 监控系统**：同心圆雷达波纹与数据流（`radar`）
- **🛠 仪表盘 HUD 挂件**：固定顶部的 HUD 控制台，包含 Canvas 渲染的 AI 助手头像、实时主题切换按钮和全局预览菜单。
- **🗺 ESC 导航总览网格**：一键激活覆盖全屏的页面卡片索引网格，可快速跳转到任意章节。

---

## 📂 项目结构

```text
ppt-resume-skill/
├── SKILL.md                  # AI 助手的技能指令（定义触发词、开发工作流与动画系统）
├── resources/
│   ├── deck-boilerplate.html # 网页的基础骨架（包含 CSS 变量、Canvas 背景和 JS 交互逻辑）
│   ├── map-demo.gif          # 地图主题展示动画
│   ├── ocean-demo.gif        # 海洋主题展示动画
│   ├── world-cup-demo.gif    # 世界杯主题展示动画
│   └── steampunk-demo.gif    # 蒸汽朋克主题展示动画
└── examples/
    ├── projects-sample.json  # 简历项目配置样本（供 AI 助手参考的数据结构）
    ├── map-explore-resume/   # 航海探索主题（多文件模式：HTML+CSS+JS）示例项目
    ├── ocean-resume/         # 深海潜航主题（单文件模式）示例项目
    ├── world-cup-resume/     # 绿茵战术板主题（多文件模式）示例项目
    └── steampunk-resume/     # 蒸汽朋克主题（多文件模式）示例项目
```

---

## ⚙️ 安装与配置

### 1. 引入到你的 AI 助手工作区

将此文件夹克隆或复制到你的 AI 助手所监控的自定义技能目录中。

* **对于支持 Agent Skill 的工作区**：
  将本项目的文件夹移动到你的项目根目录下的 `.agents/skills/` 文件夹中：
  ```bash
  mkdir -p .agents/skills
  cp -r ppt-resume-skill .agents/skills/
  ```

### 2. 提供你的简历数据

你可以在项目根目录中准备一个类似 `examples/projects-sample.json` 的 JSON 文件，或者直接在当前工作区放置你的中文简历/ README 文档。

---

## 🛠 使用方法

当你的 AI 编程助手加载了该技能后，你可以在对话中直接输入触发指令：

> **💡 提示词示例：**
> * *"帮我读取我工作区里的个人经历，利用 `ppt-resume-skill` 生成一个炫酷的太空风格网页简历。"*
> * *"请帮我基于 `examples/projects-sample.json` 的数据结构，生成我的个人数字星图 portfolio 网站。"*
> * *"基于我的 README.md 项目介绍，生成一个 PPT Resume 网页，开启 dark 模式，并且使用 orbit 和 radar 动画。"*

AI 助手将自动：
1. 读取 `resources/deck-boilerplate.html` 模板。
2. 提取或解析你的项目经验与个人信息。
3. 将数据组装到模板对应的幻灯片卡片中，并为每个项目匹配最契合的 hover 微动画。
4. 为防止代码量过大导致的网络中断，默认将输出解耦为**多文件结构（`index.html` + `styles.css` + `script.js`）**，完美适配移动端和 PC 端。

### 📌 示例展示一：地图探索主题 (Map Exploration Theme)

在最新加入的示例中，AI 成功基于本框架衍生出了**航海探索（Map Explore）**主题。用等高线与动态坐标网格代替了星空，用指南针和雷达代替了科幻光环：

![Map Exploration Theme Demo](resources/map-demo.gif)

_如果想要生成此主题，只需提示 AI ：“请使用 `ppt-resume-skill`，采用地图探索（Map Explore）主题，并使用多文件输出结构”。_

### 📌 示例展示二：深海潜航主题 (Ocean Abyss Theme)

AI 还扩展出了**深海潜航（Ocean Abyss）**主题。深海荧光配色、上升的气泡与浮游生物粒子特效，搭配鱼群洄游微动画，带来极致沉浸的浏览体验：

![Ocean Abyss Theme Demo](resources/ocean-demo.gif)

_如果想要生成此主题，只需提示 AI ：“请使用 `ppt-resume-skill`，做一个深海潜航（Ocean Abyss）主题”。_

### 📌 示例展示三：绿茵战术板主题 (World Cup Theme)

利用最新强制执行的多文件解耦架构，AI 构建出了**世界杯（World Cup）**主题。采用大视角的动态球场彩纸雨（Confetti）特效，将开发项目与中场（Workflow）、边锋（Multi-agent）、VAR（RAG）等战术角色完美结合：

![World Cup Theme Demo](resources/world-cup-demo.gif)

_如果想要生成此主题，只需提示 AI ：“请使用 `ppt-resume-skill`，帮我做一个世界杯主题的，将个人项目跟足球元素进行绑定”。_

### 📌 示例展示四：蒸汽朋克齿轮工坊 (Steampunk Workshop)

利用 CSS 微动效极限，AI 打造出了深邃重工业风的**蒸汽朋克（Steampunk）**主题。加入了升腾的蒸汽颗粒与受重力拉扯的火星（Sparks），带有机械咬合旋转效果的齿轮组件与抽动压力表针：

![Steampunk Theme Demo](resources/steampunk-demo.gif)

_（包含：首页引擎点火 -> 齿轮传动与压力表展示 -> ESC 全局蓝图战术面板）_

_如果想要生成此主题，只需提示 AI ：“请使用 `ppt-resume-skill`，帮我生成这个主题蒸汽朋克齿轮工坊”。_

---

## 🎨 视觉主题与动画定义

在 `SKILL.md` 中为 AI 规范了不同的项目卡片 hover 动画，你可以根据需求调整 JSON 中的 `animation_type`：

| 项目类型 | 视觉元素 | CSS 动画效果 |
|---|---|---|
| **Workflow / 流程引擎** | 霓虹扫描线 + 随机代码字符闪动 | 模拟代码段构建与检测 |
| **Agent / 多智能体** | Staggered 轨道小球围绕发光中心自转 | 模拟智能体协同与并发 |
| **RAG / 向量库** | 四角星光隐现 Twinkle 闪烁 | 模拟语义检索的精准触达 |
| **Essence / 健康/生活** | 渐变光晕膨胀 + 缓慢向上微粒 | 模拟生命与呼吸感 |
| **Chat / 问答助手** | 聊天气泡点阵从下向上滑动褪色 | 模拟多轮流式对话 |
| **Ops / 监控平台** | 双重同心圆声纳雷达 + 数据轨迹线 | 模拟实时状态观测与流式计算 |

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。欢迎提交 PR 和 Issue！

---

> 🌌 *"用一段代码，在浏览器中构建你专属的技术星图。"* - 欢迎 Star 关注本项目！
