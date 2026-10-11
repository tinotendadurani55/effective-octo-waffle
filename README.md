<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Ribeye&size=42&pause=1000&color=FF69B4&center=true&width=910&height=100&lines=MINIMA+V13;MINI+BOT.ZW;Your+Personal+WhatsApp+Assistant" alt="Typing SVG">
  </a>
</div>

<div align="center">

# MINIMA V13
> ### 🌸 A feature-rich, single-file WhatsApp automation bot — built on Baileys
> *MINI BOT.ZW · Created by t.Durani*

<p>
  <img src="https://img.shields.io/badge/VERSION-V13-ff69b4?style=for-the-badge&logo=whatsapp" alt="Version">
  <img src="https://img.shields.io/badge/STATUS-OPERATIONAL-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</p>
<p>
  <img src="https://img.shields.io/badge/Platform-Koyeb%20%7C%20Render%20%7C%20HuggingFace%20%7C%20Termux-0055FF?style=for-the-badge" alt="Platform">
</p>

<blockquote>
  <b>One self-contained <code>index.js</code>. No database server, no microservices — just a single file that does everything from TikTok downloads to a built-in cipher language.</b>
</blockquote>

</div>

---

## 📌 Table of Contents
- [Features](#-features)
- [Command Reference](#-command-reference)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [Known Limitations](#-known-limitations)
- [Contact](#-contact)

---

## ✨ Features

### 🛡️ Group Management & Security
| Feature | Description |
|---|---|
| **Anti-Link** | Toggleable per-group link blocking |
| **Anti-Delete** | Catches deleted messages (text/image/audio/sticker/document) via WhatsApp's actual REVOKE signal and resends them |
| **Anti-Edit** | Catches edited messages |
| **Warnings** | Per-user warning system with list/clear |
| **Welcome Messages** | Toggleable per-group welcome messages |
| **Admin Tools** | Kick, add, promote, demote, tag-all/admins/active, group info & invite link management |

### 📥 Downloads
| Feature | Description |
|---|---|
| **YouTube Audio** | `.play` / `.music` — search-and-confirm download flow |
| **TikTok** | Watermark-aware video download via yt-dlp |
| **Facebook / Instagram / Twitter** | Video/reel download via yt-dlp |
| **Status Saver** | `.steal` — save someone's status media by replying to it |
| **Sticker Tools** | Image→sticker, sticker→image, view-once bypass |
| **HD Wallpaper** | Query-based wallpaper search |

### 🤖 AI & Personal Assistant
| Feature | Description |
|---|---|
| **Conversational AI** | Per-chat and global AI toggles, with owner-defined standing rules (`.addrule`) |
| **Offline Mode** | `.offline on` — MINIMA takes over DMs as a personal assistant persona while the owner is away, with a one-time session greeting |
| **🔮 Oracle AI Homework Solver** | `.hw` — answers questions from text *or* a photo of the question |
| **NV Talk / HeartCipher** | A custom encode/decode cipher language with gradewise lessons, a teachable quiz mode, and scholar-access permissions |
| **Auto-Reply Teaching** | Owner can teach custom trigger→response pairs (`.learn`) |
| **Text-to-Speech** | `.speak` — converts text to a voice note |

### 🎭 Status & Automation
| Feature | Description |
|---|---|
| **Auto Status View + React** | Silently views contacts' statuses and reacts with a neutral emoji, paced with randomized delays to avoid looking automated |
| **Auto-Status Posting** | `.autostatus on` — posts a random line (from a 50-rule "Brocode" bank or a scenario bank) to the bot's own Status roughly every 24h, with an instant confirmation post on enable |
| **Scheduled Reports & Backups** | Daily report, auto-backup, and keepalive pings on ephemeral hosts |
| **Maintenance Notices** | `.update` / `.addupdate` / `.delupdate` — owner-managed status notes shown when a download command is having issues, instead of a raw error |

### 🎮 Games & Fun
| Feature | Description |
|---|---|
| **15-Round Trivia** | `.game` with live scoreboard and AI-generated hints |
| **Word Chain** | `.wordchain` — plain-text word game, each word must start with the last letter of the previous one |
| **Riddles** | `.riddle` — plain-text answer guessing |
| **Party Games** | Truth/dare, would-you-rather, never-have-I-ever, 8-ball, compatibility/love meters, roast/compliment generators, and more |

### 🌐 Network Toolkit
| Feature | Description |
|---|---|
| **Host/Port Scanning** | `.hostest`, `.port`, `.ip`, `.dns`, `.sub`, `.host` — domain and network diagnostics |

### ⚙️ Reliability
| Feature | Description |
|---|---|
| **Emergency Stop** | `.emergencystop` silences the bot entirely; `.resume` (WhatsApp command or HTTP endpoint) brings it back |
| **Session Self-Healing** | Clears stale Signal session files on boot to reduce decryption errors |
| **safeSend Wrapper** | Mirrors a failed owner DM into a designated "keeper" group so nothing silently vanishes |
| **Shield System** | `.shieldstatus` — armed/reset system-level protection state |
| **Error Logging & Backups** | `.errorlog`, `.backup` / `.restore` for settings |

---

## 📋 Command Reference

> Default prefix: `.` — change with `PREFIX` env var.
> Full, always-current command list: send **`.menu`** to the bot — it shows a category picker (reply with a number to drill in, or `.menu all` for everything).

<details>
<summary><b>📥 Downloads</b></summary>

`.play` `.music` `.tiktok` `.fb` `.ig` `.twitter` `.sticker` `.toimage` `.vv` `.steal` `.wallpaper`
</details>

<details>
<summary><b>✨ Aesthetic</b></summary>

`.outfit` `.tarot` `.bestie` `.sparkle` `.zodiac` `.brocode`
</details>

<details>
<summary><b>🧠 Auto-Reply & Voice</b></summary>

`.learn` `.unlearnreply` `.listreplies` `.speak` `.say`
</details>

<details>
<summary><b>🛡️ Group Tools</b></summary>

`.revoke` `.kick` `.add` `.promote` `.demote` `.warn` `.clearwarn` `.warnlist` `.close` `.open` `.tagall` `.tagadmins` `.tagactive` `.setname` `.setdesc` `.groupinfo` `.grouplink` `.afklist` `.report` `.kickall` `.antilink` `.welcome` `.antidelete` `.antiedit`
</details>

<details>
<summary><b>🤖 Utility</b></summary>

`.weather` `.bible` `.define` `.calc` `.trs` `.hw` `.remind` `.ping` `.status` `.uptime` `.botinfo` `.myid` `.createlogo` `.shorten` `.news`
</details>

<details>
<summary><b>🎮 Fun</b></summary>

`.scenario` `.joke` `.fact` `.quote` `.fortune` `.8ball` `.ship` `.lovemeter` `.truth` `.dare` `.wyr` `.nhie` `.roast` `.compliment` `.mock` `.rate` `.howmany` `.coinflip` `.dice` `.afk` `.unafk`
</details>

<details>
<summary><b>🔬 Network Toolkit</b></summary>

`.hostest` `.port` `.ip` `.dns` `.sub` `.host`
</details>

<details>
<summary><b>🔐 NV Talk / HeartCipher</b></summary>

`.grant` `.reject` `.lockdown` `.teach` `.nv` `.nvd` `.quiz`
</details>

<details>
<summary><b>🎁 Minima Special</b></summary>

`.gift` `.contact`
</details>

<details>
<summary><b>🎮 Games & Fun</b></summary>

`.game` `.answer` `.score` `.hint` `.clear` `.wordchain` `.riddle`
</details>

<details>
<summary><b>⚙️ System & Owner (👑 owner-only)</b></summary>

`.aion` `.aioff` `.aiclear` `.aiglobalon` `.aiglobaloff` `.offline` `.autostatus` `.addrule` `.rules` `.delrule` `.update` `.addupdate` `.delupdate` `.setkeeper` `.cleancache` `.errorlog` `.backup` `.restore` `.emergencystop` `.resume` `.reset` `.angrymode` `.calmdown` `.autoview` `.callblock` `.public` `.self` `.bot` `.bc` `.ban` `.unban` `.addprem` `.delprem` `.left` `.join` `.botquiet` `.darkmenu` `.shieldstatus`
</details>

---

## 🚀 Deployment

MINIMA V13 runs on any Node.js host and auto-detects its environment (Termux vs. server paths for `ffmpeg`/`yt-dlp`). Confirmed working on:

- **Koyeb**
- **Render**
- **HuggingFace Spaces**
- **Termux** (on-device, Android)

### Linking
On first launch with no saved session, the bot requests a **WhatsApp pairing code** (not a QR scan) for the configured number — link via *WhatsApp → Linked Devices → Link with Phone Number*. Encode the resulting session as `SESSION_ID` to skip re-pairing on restart.

### Manual Setup

```bash
# Prerequisites
pip install yt-dlp
sudo apt install ffmpeg   # or: pkg install ffmpeg yt-dlp   (Termux)

# Install & run
npm install
node index.js
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_ID` | Recommended | Base64-encoded WhatsApp session — skips re-pairing on restart |
| `PAIR_NUMBER` | ✅ (first run) | The WhatsApp number to pair, digits only |
| `OWNER_NAME` | Optional | Display name (default: `t.Durani`) |
| `BOT_NAME` | Optional | Display name (default: `MINIMA V13`) |
| `PREFIX` | Optional | Command prefix (default: `.`) |
| `MODE` | Optional | `public` or `private` (default: `public`) |
| `PORT` | Optional | Health-check server port (default: `7860`) |
| `SUB_OWNER_ID` / `SUB_OWNERS` | Optional | Additional owner-level numbers |
| `KEEPER_GROUP_ID` | Optional | Group JID for error mirroring + keepalive pings |
| `RESUME_TOKEN` | Optional | Secret for the HTTP `/resume` endpoint (clears emergency stop) |
| `SESSION_DIR` | Optional | Override the session storage path |
| `GROQ_API_KEY` / `GEMINI_API_KEY` / `OPENROUTER_API_KEY` | Optional | AI provider keys (`.hw`, conversational AI, hints) |

> No database server required — all settings, rules, and history persist to a local `database.json`, with automatic backups.

---

## 🏗️ Architecture

```
/
├── index.js          # Everything — connection, command router, all ~140 commands, schedulers
├── database.json      # Local persistence (settings, rules, updates, known contacts, etc.)
├── chat-memory.json   # AI conversation memory, persisted across restarts
├── error-log.json     # Recent error history
└── downloads/         # Temporary media (auto-purged)
```

**Tech Stack**

| Layer | Technology |
|---|---|
| WhatsApp Client | [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) |
| Runtime | Node.js (CommonJS) |
| Health Check | Express |
| Media Processing | FFmpeg + yt-dlp |
| Persistence | Local JSON file, no external DB |
| AI | Groq / Gemini / OpenRouter (configurable) |

Deliberately single-file: every command, scheduler, and helper lives in one `index.js`. No build step, no module graph to debug — easy to read top-to-bottom, easy to deploy anywhere Node runs.

---

## ⚠️ Known Limitations

Documented honestly rather than swept under the rug:

- **TikTok downloads** are at the mercy of an ongoing, unresolved upstream fight between `yt-dlp` and TikTok's anti-scraping changes. Keep `yt-dlp` updated (`yt-dlp -U`); this can still break without warning regardless.
- **New-status posting** (`.autostatus`) has a known open bug in Baileys where the send call can report success with no error, yet nothing appears on Status. A fix (adding `backgroundColor`/`font` fields) is in place, but treat any "posted" confirmation as unverified until you've checked the Status tab yourself.
- **Occasional "Bad MAC" / session decrypt errors** against specific contacts are a known Baileys/Signal-session limitation, not a bug in this codebase. The bot clears stale session files on boot as a mitigation; a persistently affected contact may need to log out/in on their end to force a fresh handshake.

---

## 📬 Contact

**t.Durani** — Bot Developer · Zimbabwe 🇿🇼

<p align="left">
  <a href="https://wa.me/263777426534">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>
</p>

---

<p align="center">
  Built by <strong>t.Durani</strong> · MINI BOT.ZW 🇿🇼
</p>
