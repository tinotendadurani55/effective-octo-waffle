<div align="center">

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Ribeye&size=40&pause=900&color=FF69B4&center=true&vCenter=true&width=900&height=90&lines=MINIMA+V13;MINI+BOT.ZW;WhatsApp+Automation+Reimagined" alt="MINIMA V13">
</a>

# 🌸 MINIMA V13

**MINI BOT.ZW · A WhatsApp assistant by [t.Durani](https://github.com/t-Durani)**

<img src="https://img.shields.io/badge/VERSION-13-ff69b4?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Version 13">
<img src="https://img.shields.io/badge/RUNTIME-Node.js%2020%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/ENGINE-Baileys-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Baileys">
<img src="https://img.shields.io/badge/LICENSE-PROPRIETARY-red?style=for-the-badge&logo=github" alt="Proprietary license">

<br>

*A compact, single-file WhatsApp bot with AI conversation, media tools, group controls, games, voice notes and a custom command suite.*

[Commands](#-command-directory) · [Setup](#-quick-start) · [Configuration](#-environment-variables) · [License](#-license)

</div>

---

## ✦ At a glance

| Module | What's inside |
|:--|:--|
| 🤖 **AI assistant** | Natural conversation, chat memory, configurable AI access, owner rules and Victoria mode |
| 🎙️ **Voice** | Voice-note transcription and optional spoken replies through Piper / Google TTS |
| 📥 **Media** | Music, APK, social-video, sticker, view-once and wallpaper tools |
| 🛡️ **Groups** | Moderation, warnings, admin actions, anti-link, anti-delete and anti-edit |
| 🔐 **HeartCipher** | NV Talk encoding, decoding, lessons, quizzes and Scholar access |
| 🎮 **Entertainment** | Trivia, riddles, word chain, polls, reactions and action GIFs |
| 🌐 **Network** | Host, port, DNS, IP, subdomain and SSL information tools |
| ⚙️ **Operations** | Backups, error logs, status checks, scheduled tasks and emergency recovery |

---

## ⚡ Quick start

**Requirements:** Node.js 20+, npm, FFmpeg and yt-dlp. Some features also need API keys.

```bash
git clone https://github.com/t-Durani/minima-v13.git
cd minima-v13
npm install
```

Create your environment configuration, then start the bot:

```bash
node index.js
```

On first launch, provide `PAIR_NUMBER`. MINIMA sends a WhatsApp pairing code to that number. In WhatsApp, open **Linked Devices → Link with phone number** and enter the code.

For hosted deployments, configure the environment variables in your hosting dashboard. Keep the session and database files on persistent storage where your platform supports it.

### Docker

If your repository includes the project Dockerfile:

```bash
docker build -t minima-v13 .
docker run --env-file .env -p 8000:8000 minima-v13
```

---

## 📚 Command directory

**Default prefix:** `.`  
**Main menu:** `.menu`  
**Full command list:** `.menu all`  
**Category browser:** `.menu` then reply with a category number.  
Replace `.` if you set a different `PREFIX`.

> Commands marked **👑** are owner-restricted. Group administration commands require the relevant WhatsApp admin permissions. Some commands only make sense in groups or when replying to a message.

### 🤖 Bot & information

| Command | Purpose |
|:--|:--|
| `.menu` / `.help` / `.m` | Open the interactive command menu |
| `.ping` | Check response latency |
| `.uptime` | Show running time |
| `.status` / `.device` / `.system` | Show server, CPU and memory status |
| `.botinfo` | Show bot information |
| `.myid` / `.id` / `.jid` | Show your WhatsApp ID and group ID |
| `.contact` | Send the developer contact card |

### 📥 Downloads & media

| Command | Usage |
|:--|:--|
| `.play` | Search and download audio |
| `.music` | High-quality music download |
| `.apk` | Search for and download an Android app |
| `.tiktok` | Download TikTok media |
| `.fb` | Download Facebook media |
| `.ig` | Download Instagram media |
| `.twitter` / `.x` | Download X/Twitter media |
| `.video` | Download supported social video |
| `.sticker` | Reply to an image/video to create a sticker |
| `.toimage` | Reply to a sticker to convert it to an image |
| `.vv` | Retrieve supported view-once media |
| `.steal` | Reply to a status to save its media |
| `.wallpaper` | Search for an HD wallpaper |
| `.pp` | Get a profile picture |

### 🛡️ Group management

| Command | Purpose |
|:--|:--|
| `.groupinfo` | Show group information |
| `.grouplink` | Get the group invite link |
| `.revoke` | Reset the group invite link |
| `.add <number>` | Add a member |
| `.kick @user` | Remove a member |
| `.kickall` | Remove non-admin members |
| `.promote @user` | Promote a member to admin |
| `.demote @user` | Demote an admin |
| `.pin` / `.unpin` | Pin or unpin the replied message |
| `.close` / `.open` | Restrict or reopen group messaging |
| `.setname <text>` | Change the group name |
| `.setdesc <text>` | Change the group description |
| `.tagall` | Mention group members |
| `.tagadmins` | Mention group admins |
| `.tagactive` | Mention active members |
| `.warn @user` | Issue a warning |
| `.warnlist` | List active warnings |
| `.clearwarn @user` | Clear a member's warnings |
| `.antilink on/off` | Toggle anti-link protection |
| `.welcome on/off` | Toggle group welcome messages |
| `.antidelete on/off` 👑 | Toggle deleted-message recovery |
| `.antiedit on/off` 👑 | Toggle edited-message detection |
| `.afklist` | List AFK members |
| `.report` | Report a bug or issue |

### 🧠 AI, memory & auto-replies

| Command | Purpose |
|:--|:--|
| `.aion` / `.aioff` 👑 | Enable or disable AI in the current chat |
| `.aigroups on/off` 👑 | Toggle AI across groups |
| `.aidms on/off` 👑 | Toggle AI across private chats |
| `.aiglobalon` / `.aiglobaloff` 👑 | Enable or disable AI globally |
| `.aiclear` 👑 | Clear the current AI conversation memory |
| `.offline on/off` 👑 | Toggle the personal-assistant mode for DMs |
| `.addrule <instruction>` 👑 | Add a standing AI rule |
| `.rules` 👑 | List saved AI rules |
| `.delrule <number>` 👑 | Delete a saved AI rule |
| `.learn <trigger> \| <reply>` 👑 | Teach a custom auto-reply |
| `.unlearnreply <trigger>` 👑 | Remove a learned reply |
| `.listreplies` 👑 | List learned replies |
| `.victoria on/off` 👑 | Toggle the owner-only Victoria persona |

### 🎙️ Voice

MINIMA can process supported WhatsApp voice notes and can send spoken replies when the voice policy selects them.

| Engine | Role |
|:--|:--|
| Piper TTS | Local neural voice generation |
| Google TTS | Fallback voice generation |
| FFmpeg | Converts generated audio to WhatsApp-compatible Opus |
| Text fallback | Keeps the reply available if voice generation fails |

Voice output depends on the host having the required voice model, executable and FFmpeg. Voice-note transcription also requires a configured speech API provider.

### 🧰 Utilities

| Command | Purpose |
|:--|:--|
| `.weather <city>` | Get current weather information |
| `.convert <amount> <from> <to>` | Convert currencies |
| `.bible <reference>` | Fetch a Bible passage, for example `John 3:16` |
| `.remind <time> <message>` | Set a timed reminder (`30m`, `2h`, `10s`) |
| `.createlogo <text>` | Generate a simple logo image |
| `.shorten <url>` | Shorten a URL |
| `.news` | Fetch BBC World headlines |
| `.gift` | Send a surprise gift link |

### 🎮 Games

| Command | Purpose |
|:--|:--|
| `.game` | Start the 15-round group trivia game |
| `.answer <A-D>` | Submit an answer |
| `.score` | Show the scoreboard |
| `.hint` | Request an AI hint |
| `.clear` | End the active game (admin) |
| `.wordchain` | Start or manage a word-chain game |
| `.riddle` | Get a riddle; reply with your answer |

### 🎭 Fun & social

| Command | Purpose |
|:--|:--|
| `.joke` | Random joke |
| `.fact` | Random fact |
| `.quote` | Motivational quote |
| `.fortune` | Fortune message |
| `.8ball <question>` | Ask the magic 8-ball |
| `.ship <name1> & <name2>` | Compatibility meter |
| `.lovemeter` | Love meter |
| `.truth` | Truth question |
| `.wyr` | Would-you-rather question |
| `.funpoll` | Create a fun poll |
| `.pollresults` | Show the latest poll tally |
| `.roast` | Generate a roast |
| `.compliment` | Generate a compliment |
| `.mock <text>` | Convert text to mocking style |
| `.rate` | Rate a prompt or person |
| `.howmany <question>` | Random percentage |
| `.coinflip` | Flip a coin |
| `.dice` | Roll a die |
| `.afk [reason]` / `.unafk` | Set or clear your AFK status |

### ✨ Aesthetic

`.outfit` · `.tarot` · `.bestie` · `.sparkle <text>` · `.vapor <text>` · `.zodiac <sign>` · `.brocode [1-80]`

### 🎬 Action GIFs

Use an action command with a mention or reply where a target is required:

`.kiss` · `.hug` · `.slap` · `.punch` · `.kickgif` · `.kill` · `.cuddle` · `.holdhands` · `.handshake` · `.respect` · `.wave` · `.laugh` · `.cry` · `.blush` · `.sleep` · `.dancegirl` · `.danceguy` · `.weddingdance`

Owner GIF tools:

- `.gifcheck` — check configured GIF links.
- `.addgif <action> <Giphy link>` — add a GIF for an action. This can activate additional actions such as `pat`, `poke`, `bite`, `tickle`, `highfive` and `wink`.

### 🔐 NV Talk / HeartCipher

| Command | Purpose |
|:--|:--|
| `.nv <text>` | Encode text into NV Talk |
| `.nv <grade> <text>` | Encode using a selected grade |
| `.nvd <text>` | Decode NV Talk |
| `.teach [@user] [1/2/3]` | Send an NV Talk lesson |
| `.quiz [@user] [1/2/3]` | Start a cipher quiz |
| `.grant @user` 👑 | Grant Scholar access |
| `.reject @user` 👑 | Remove Scholar access |
| `.lockdown on/off` 👑 | Lock or unlock NV Talk |

### 🌐 Network toolkit

| Command | Purpose |
|:--|:--|
| `.hostest <domain>` | Run a multi-stage host check |
| `.port <host>` | Check selected open ports |
| `.ip <host>` | Show IP information |
| `.dns <domain>` | Inspect DNS records |
| `.sub <domain>` | Discover subdomains |
| `.host <domain>` | Inspect SSL certificate and host details |

### ⚙️ Owner & system controls

| Command | Purpose |
|:--|:--|
| `.public` / `.self` 👑 | Switch public or owner-only mode |
| `.callblock on/off` 👑 | Toggle incoming-call blocking |
| `.autoview on/off` 👑 | Toggle status auto-view/react |
| `.botquiet on/off` 👑 | Toggle automatic reactions in this chat |
| `.autoadmin on/off` 👑 | Toggle reactions to group-admin messages |
| `.angrymode on/off` 👑 | Toggle dark/angry mode |
| `.calmdown` 👑 | Restore the default mood |
| `.bot @user <message>` 👑 | Relay a message through the bot |
| `.bc <message>` 👑 | Broadcast to participating groups |
| `.ban @user` / `.unban @user` 👑 | Manage bot access |
| `.addprem @user` / `.delprem @user` 👑 | Grant or remove premium status |
| `.join <invite-link>` 👑 | Join a group |
| `.left` 👑 | Leave the current group |
| `.shieldstatus` 👑 | View or manage shield state |
| `.update` | View maintenance notices |
| `.addupdate <text>` 👑 | Add a maintenance notice |
| `.delupdate <number>` 👑 | Remove a maintenance notice |
| `.setkeeper` 👑 | Set the current group as the report/keeper group |
| `.cleancache` 👑 | Clear supported temporary caches |
| `.errorlog [clear]` 👑 | View or clear recent errors |
| `.backup` 👑 | Create a settings backup |
| `.restore` 👑 | Restore from a replied backup file |
| `.emergencystop confirm` 👑 | Activate the emergency stop |
| `.resume` 👑 | Resume after emergency stop |
| `.reset confirm` 👑 | Confirm a factory reset |
| `.darkmenu` 👑 | Open the dark protocol menu |

---

## 🔧 Environment variables

Set these in your `.env` file or hosting dashboard. Do not commit secrets.

| Variable | Required | Description |
|:--|:--:|:--|
| `PAIR_NUMBER` | First pairing | WhatsApp number to pair, digits only |
| `SESSION_ID` | Recommended | Saved session payload to avoid pairing again |
| `BOT_NAME` | No | Bot display name |
| `OWNER_NAME` | No | Owner display name |
| `PREFIX` | No | Command prefix; default `.` |
| `MODE` | No | `public` or `private` / self mode |
| `PORT` | Host-dependent | Health-server port |
| `SESSION_DIR` | No | Custom session directory |
| `SUB_OWNER_ID` / `SUB_OWNERS` | No | Additional owner numbers |
| `KEEPER_GROUP_ID` | No | Keeper/report group JID |
| `RESUME_TOKEN` | No | Secret for the HTTP resume endpoint |
| `GROQ_API_KEY` | AI features | Groq API access |
| `OPENROUTER_API_KEY` | AI fallback | OpenRouter API access |
| `GEMINI_API_KEY` | Optional AI | Gemini API access |
| `PIPER_BIN` | Voice optional | Piper executable path |
| `PIPER_VOICE` | Voice optional | Piper voice-model path |

---

## 🧱 Stack

| Component | Technology |
|:--|:--|
| WhatsApp connection | [Baileys](https://github.com/WhiskeySockets/Baileys) |
| Runtime | Node.js |
| HTTP health endpoint | Express |
| AI providers | Groq / OpenRouter / Gemini integration |
| Media downloads | yt-dlp |
| Audio conversion | FFmpeg |
| Voice generation | Piper TTS / Google TTS |
| Local persistence | JSON files |

### Project layout

```text
minima-v13/
├── index.js
├── package.json
├── Dockerfile
├── .dockerignore
├── database.json          # generated local settings store
├── chat-memory.json       # generated AI conversation memory
├── error-log.json         # generated rolling error log
├── minima-session/        # generated WhatsApp session (Termux)
└── downloads/             # temporary media and audio
```

Generated files and folders may differ by deployment platform.

---

## 🛡️ Operational notes

- Keep API keys and WhatsApp session data private.
- Use persistent storage for session and JSON data on hosts with ephemeral filesystems.
- Media downloads depend on upstream platform availability and may stop working when those platforms change their restrictions.
- Voice features require FFmpeg; Piper additionally requires its executable and voice model.
- Network diagnostics depend on outbound network access and the target host's response.
- Use group moderation commands only where you have the required admin permissions.

---

## 📄 License

**KIDJUSTIN-K Proprietary License**  
Copyright © 2026 **t.Durani**. All rights reserved.

- Personal, non-commercial use is permitted under the project license.
- Redistribution, resale, sublicensing, republishing and commercial use require written permission.
- Keep the original copyright and attribution notices intact.
- Software is provided “as is”, without warranty.

Full terms: [`LICENSE`](LICENSE) · [Hosted license](https://rentry.co/t-Durani-LICENSE)

---

## 📬 Contact

**Developer:** t.Durani · Zimbabwe 🇿🇼

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact%20Developer-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/263777426534)
[![GitHub](https://img.shields.io/badge/GitHub-t--Durani-181717?style=for-the-badge&logo=github)](https://github.com/t-Durani)

<div align="center">

**MINIMA V13 · MINI BOT.ZW**

*Built with precision. Maintained by t.Durani. 🇿🇼*

</div>
