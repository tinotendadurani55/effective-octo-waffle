<div align="center">

  <img src="https://i.postimg.cc/htpZFLkb/IMG_20260328_WA0012.jpg" width="100%" alt="Kidjustin-k Banner">
  <br><br>

  <h1>🤖 KIDJUSTIN-K V13</h1>
  <p><i>The Master Planner's Ultimate WhatsApp Automation Suite</i><br>
  <b>Powered by Vortex Tech</b></p>

  <p>
    <a href="https://rentry.co/Kidjustin-license">
      <img src="https://img.shields.io/badge/LICENSE-PROPRIETARY-red?style=for-the-badge&logo=github" alt="License">
    </a>
    <a href="https://github.com/tinotendadurani55/effective-octo-waffle/releases">
      <img src="https://img.shields.io/badge/VERSION-v13.0.0--STABLE-blue?style=for-the-badge&logo=whatsapp" alt="Version">
    </a>
    <img src="https://img.shields.io/badge/STATUS-OPERATIONAL-brightgreen?style=for-the-badge" alt="Status">
  </p>

  <p>
    <a href="https://github.com/tinotendadurani55/effective-octo-waffle/stargazers">
      <img src="https://img.shields.io/github/stars/tinotendadurani55/effective-octo-waffle?style=for-the-badge&color=yellow" alt="Stars">
    </a>
    <a href="https://github.com/tinotendadurani55/effective-octo-waffle/network/members">
      <img src="https://img.shields.io/github/forks/tinotendadurani55/effective-octo-waffle?style=for-the-badge&color=orange" alt="Forks">
    </a>
    <a href="https://github.com/tinotendadurani55/effective-octo-waffle/issues">
      <img src="https://img.shields.io/github/issues/tinotendadurani55/effective-octo-waffle?style=for-the-badge&color=red" alt="Issues">
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Platform-Koyeb%20%7C%20Termux-0055FF?style=for-the-badge" alt="Platform">
  </p>

  <br>

  <blockquote>
    <b>Production-grade WhatsApp automation engine built on Baileys.<br>Engineered for reliability, built for scale.</b>
  </blockquote>

</div>

---

## 📌 Table of Contents
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Command Reference](#-command-reference)
- [Quick Deploy](#-quick-deploy-koyeb)
- [Manual Setup](#-manual-setup)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [Contact](#-contact)

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/menu.jpg" width="30%" alt="Command Categories Menu">
  <img src="screenshots/downloads.jpg" width="30%" alt="Downloads Menu">
  <img src="screenshots/games.jpg" width="30%" alt="Games & Fun Menu">
</p>
<p align="center">
  <em>Command Categories &nbsp;&nbsp;|&nbsp;&nbsp; Downloads Menu &nbsp;&nbsp;|&nbsp;&nbsp; Games & Fun Menu</em>
</p>

---

## ✨ Features

### 🛡️ Group Management & Security
| Feature | Description |
|---|---|
| **Anti-Link** | Automatically removes users who post unauthorized links in groups |
| **Anti-Flood** | Configurable spam detection with cooldown enforcement |
| **Call Blocker** | Auto-rejects incoming calls when enabled |
| **Blacklist** | Permanent ban list that persists across restarts |
| **Group Rules** | Set, list, and clear rules per group — stored in PostgreSQL |
| **Welcome Messages** | Custom per-group welcome messages with `{name}` and `{group}` placeholders |

### 📥 Media & Downloads
| Feature | Description |
|---|---|
| **YouTube** | Download audio (M4A) and video (360p) via yt-dlp |
| **TikTok** | Watermark-free video download |
| **Instagram** | Reel and post downloader |
| **MediaFire** | Direct cloud file retrieval |
| **Google Drive** | Direct link processor |

### 🎮 Games & Entertainment
| Feature | Description |
|---|---|
| **Quiz Game** | 15-round multi-choice trivia with live leaderboards |
| **Tic-Tac-Toe** | Real-time group TTT matches |
| **XP & Levelling** | Per-user XP tracking with auto level-up notifications |
| **Rep System** | Give reputation points to other users |
| **Wallpaper** | Random HD wallpaper generator |

### 🤖 AI & Automation
| Feature | Description |
|---|---|
| **Auto-Reply** | Built-in conversational responses + owner-teachable custom replies (`.learn`) |
| **AFK System** | Set away status with reason; auto-notifies anyone who mentions you |
| **Temp Mail** | Generate and read temporary email addresses |
| **Weather** | Live weather reports via OpenWeatherMap |
| **Poll System** | Create and vote on in-group polls |
| **Sticker Maker** | Convert images to WhatsApp stickers with custom pack metadata |
| **Auto Status View** | Silently reads all contacts' status updates |

### ⚙️ Bot Administration
| Feature | Description |
|---|---|
| **Premium Users** | Assign/revoke premium status — persisted across restarts |
| **Settings Per Group** | Toggle features independently per group |
| **PostgreSQL Persistence** | All settings, rules, and user data survive container restarts |
| **File Fallback** | Automatically falls back to local JSON if no DB is configured (Termux-friendly) |
| **Self-Diagnosis** | Startup checks for all required binaries and modules |
| **Anti-Crash** | Global uncaught exception handler ignores Baileys internal noise |

---

## 📋 Command Reference

> Default prefix: `.`  
> Owner commands require your number to match `OWNER_NUMBER`.

| Category | Commands |
|---|---|
| **🛡️ Admin** | `.admin` `.antilink` `.kick` `.warn` `.mute` `.promote` `.demote` `.tagall` `.ban` `.unban` |
| **📥 Downloads** | `.play` `.apk` `.tiktok` `.ig` `.fb` `.twitter` `.pinterest` `.mediafire` |
| **🎮 Games & Fun** | `.game` `.answer` `.score` `.ttt` `.del` `.8ball` `.poll` `.pollresults` `.endpoll` `.afk` `.joke` |
| **🤖 AI & Utility** | `.ai` `.speak` `.calc` `.screenshot` `.logo` `.weather` `.sticker` `.toimg` `.mail` `.wallpaper` |
| **👑 Owner & System** | `.owner` `.addprem` `.removeprem` `.join` `.gitclone` `.broadcast` `.restart` `.update` `.learn` `.forget` `.block` `.unblock` |
| **⚙️ Settings** | `.settings` `.callblock` `.autoview` `.antiflood` `.mode` `.setwelcome` `.setrules` `.clearrules` |

---

## 🚀 Quick Deploy — Koyeb

Click below for a one-click deployment. You will need to configure environment variables after deployment.

<p align="center">
  <a href="https://app.koyeb.com/deploy?type=git&repository=github.com/tinotendadurani55/effective-octo-waffle&branch=main&name=kidjustin-k">
    <img src="https://www.koyeb.com/static/images/deploy/button.svg" alt="Deploy to Koyeb" height="40">
  </a>
</p>

**Required after deploy:** Set your [environment variables](#-environment-variables) in the Koyeb dashboard under **Settings → Environment**.

---

## 🛠️ Manual Setup

### Prerequisites

- **Node.js** v20 or higher
- **FFmpeg** — for media processing
- **yt-dlp** — for YouTube/TikTok downloads

```bash
# Install yt-dlp
pip install yt-dlp

# Ubuntu/Debian — Install FFmpeg
sudo apt install ffmpeg

# Termux
pkg install ffmpeg yt-dlp
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tinotendadurani55/effective-octo-waffle.git
cd effective-octo-waffle

# 2. Install dependencies
npm install

# 3. Configure environment variables (see section below)
cp .env.example .env
nano .env

# 4. Start the bot
npm start
```

On first launch, a QR code will appear in the terminal. Scan it with WhatsApp to link your account.  
To avoid re-scanning on every restart, encode your session and set `SESSION_ID` in your environment variables.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_ID` | ✅ | Base64-encoded WhatsApp session for Koyeb restarts |
| `OWNER_NUMBER` | ✅ | Your WhatsApp number (digits only, e.g. `263777426534`) |
| `BOT_NAME` | ✅ | Display name of the bot |
| `OWNER_NAME` | ✅ | Your display name |
| `PREFIX` | ✅ | Command prefix (default: `.`) |
| `MODE` | ✅ | `public` (anyone can use) or `private` (owner only) |
| `PORT` | ✅ | Health check port (default: `8000`, auto-set by Koyeb) |
| `DATABASE_HOST` | ⚡ Recommended | PostgreSQL host for persistent storage |
| `DATABASE_NAME` | ⚡ Recommended | PostgreSQL database name |
| `DATABASE_USER` | ⚡ Recommended | PostgreSQL username |
| `DATABASE_PASSWORD` | ⚡ Recommended | PostgreSQL password |
| `OPENWEATHERMAP_KEY` | Optional | API key for `.weather` command |
| `REPORT_NUMBER` | Optional | Number to forward `.report` messages to |

> ⚡ **Without a database**, all settings reset on every container restart. For Koyeb, a free PostgreSQL provider such as [Neon](https://neon.tech) is strongly recommended.

---

## 🏗️ Architecture

```
effective-octo-waffle/
├── index.js            # Core — Baileys connection, event handlers, command router
├── package.json        # Dependencies and scripts
├── session/            # Encrypted WhatsApp auth state (auto-generated)
├── downloads/          # Temporary media files (auto-purged)
└── database.json       # Local persistence fallback (used when no DB is configured)
```

**Tech Stack**

| Layer | Technology |
|---|---|
| WhatsApp Client | [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) |
| Runtime | Node.js 20+ (CommonJS) |
| HTTP / Health Check | Express |
| Media Processing | FFmpeg + yt-dlp |
| Database | PostgreSQL (via `postgres.js`) with JSON file fallback |
| Hosting | Koyeb (also supports Termux) |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**t.Durani** — Full-Stack Developer · Bot Architect · System Engineer

<p align="left">
  <a href="mailto:tinotendadurani55@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="https://wa.me/263777426534">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
  <a href="https://github.com/tinotendadurani55">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

> For bugs and feature requests, please [open an issue](https://github.com/tinotendadurani55/effective-octo-waffle/issues) rather than sending a direct message.

---

<p align="center">
  Built with ❤️ by <strong>t.Durani</strong> · Zimbabwe 🇿🇼
</p>
