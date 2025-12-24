/*
╔══════════════════════════════════════════════════════════════════╗
║            🤖 KIDJUSTIN-K WHATSAPP BOT - ALL IN ONE             ║
║     V12 FINAL: STABLE, CONFIGURED, and ROBUST MEDIA FIX        ║
║                                                                  ║
║    *** V12: MULTI-ROUND QUIZ GAME SYSTEM IMPLEMENTED (FIXED) *** ║
║    *** FIX: AUDIO FILE SIZE OPTIMIZED IN .play COMMAND *** ║
║    *** FIX: VIDEO FILE SIZE OPTIMIZED IN .ytv COMMAND (360p) *** ║
║        Refined by Gemini AI (Modern Baileys & Robust Checks)       
╚══════════════════════════════════════════════════════════════════╝
*/

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    GroupSettingChange, 
    WAMessageStubType 
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const play = require('play-dl'); 
const cheerio = require('cheerio'); 
const { v4: uuidv4 } = require('uuid'); 

// ═══════════════════════════════════════════════════════════════════
// ⚙️ BOT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

const config = {
    botName: 'Kidjustin-k',
    ownerName: 't.Durani',
    ownerNumber: '263718555584', 
    prefix: '.',
    mode: 'public' 
};

// Global variable to hold bot's own JID once connected
let botJid = ''; 
let initialStatusSet = false; 

// V12 ADDED: Game State Management
// State now tracks current round, total questions, and pause timer
const activeGames = {}; 
const gameQuestions = [
    {
        q: "Which company created the WhatsApp application?",
        a: "Facebook/Meta",
        options: ["Apple", "Facebook/Meta", "Google", "Microsoft"],
        category: "Tech"
    },
    {
        q: "What is the capital city of Zimbabwe?",
        a: "Harare",
        options: ["Bulawayo", "Mutare", "Harare", "Gweru"],
        category: "Geography"
    },
    {
        q: "Which metal is liquid at room temperature?",
        a: "Mercury",
        options: ["Gold", "Silver", "Mercury", "Lead"],
        category: "Science"
    },
    {
        q: "What is the common name for the gas $\text{H}_2\text{O}$?",
        a: "Water",
        options: ["Oxygen", "Hydrogen Peroxide", "Water", "Methane"],
        category: "Science"
    },
    {
        q: "What programming language is this bot written in?",
        a: "Node.js (JavaScript)",
        options: ["Python", "PHP", "Node.js (JavaScript)", "Java"],
        category: "Tech"
    },
    {
        q: "What is the largest planet in our solar system?",
        a: "Jupiter",
        options: ["Saturn", "Jupiter", "Mars", "Earth"],
        category: "Science"
    },
    {
        q: "How many legs does a spider have?",
        a: "Eight",
        options: ["Six", "Four", "Ten", "Eight"],
        category: "Science"
    },
    {
        q: "What is the name of the owner of this bot?",
        a: config.ownerName,
        options: ["Elon Musk", config.botName, config.ownerName, "Mark Zuckerberg"],
        category: "Bot Info"
    },
    {
        q: "Which fictional city is the home of Batman?",
        a: "Gotham City",
        options: ["Star City", "Metropolis", "Gotham City", "Central City"],
        category: "Fun"
    },
    {
        q: "What is the smallest country in the world?",
        a: "Vatican City",
        options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        category: "Geography"
    },
    {
        q: "Which of these is a vegetable?",
        a: "Carrot",
        options: ["Apple", "Banana", "Carrot", "Grape"],
        category: "Fun"
    },
    {
        q: "What year was the first iPhone released?",
        a: "2007",
        options: ["2005", "2007", "2009", "2011"],
        category: "Tech"
    },
    {
        q: "What is the main ingredient in guacamole?",
        a: "Avocado",
        options: ["Tomato", "Lime", "Avocado", "Chili"],
        category: "Fun"
    },
    {
        q: "What is the chemical symbol for gold?",
        a: "Au",
        options: ["Ag", "Fe", "Au", "Pb"],
        category: "Science"
    },
    {
        q: "Which ocean is the largest?",
        a: "Pacific Ocean",
        options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
        category: "Geography"
    }
];

// ═══════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS (UNCHANGED)
// ═══════════════════════════════════════════════════════════════════

function getUptime() {
    let seconds = process.uptime();
    const d = Math.floor(seconds / (3600 * 24));
    seconds -= d * (3600 * 24);
    const h = Math.floor(seconds / 3600);
    seconds -= h * 3600;
    const m = Math.floor(seconds / 60);
    seconds -= m * 60;
    const s = Math.floor(seconds);

    let uptime = "";
    if (d > 0) uptime += `${d} day${d > 1 ? 's' : ''}, `;
    if (h > 0) uptime += `${h} hour${h > 1 ? 's' : ''}, `;
    if (m > 0) uptime += `${m} minute${m > 1 ? 's' : ''}, `;
    uptime += `${s} second${s > 1 ? 's' : ''}`;
    
    return uptime.trim().replace(/,([^,]*)$/, '$1');
}

async function isAdmin(sock, jid, participantJid) {
    if (!jid.endsWith('@g.us')) return false;
    try {
        const groupMetadata = await sock.groupMetadata(jid);
        const adminList = groupMetadata.participants
            .filter(p => p.admin !== null)
            .map(p => p.id);
        return adminList.includes(participantJid);
    } catch (e) {
        console.error('Error fetching group metadata:', e);
        return false;
    }
}

async function isBotAdmin(sock, jid) {
    if (!jid.endsWith('@g.us') || !botJid) return false;
    return isAdmin(sock, jid, botJid);
}

// ═══════════════════════════════════════════════════════════════════
// SELF-DIAGNOSIS (UNCHANGED)
// ═══════════════════════════════════════════════════════════════════

function checkBinary(name, installCommand) {
    const termuxBinPath = '/data/data/com.termux/files/usr/bin/';
    return new Promise((resolve) => {
        exec(`${termuxBinPath}${name} -h`, (error) => { 
            if (error) {
                if (error.code === 1) {
                    console.log(`✅ Binary check successful (handled Termux quirk): "${name}" is available.`);
                    return resolve();
                }
                
                console.error(`\n❌ CRITICAL ERROR: Binary "${name}" not found or failed execution.`);
                console.error(`   To fix, please run: ${installCommand}`);
                console.error('   Exiting...');
                process.exit(1);
            } else {
                console.log(`✅ Binary check successful: "${name}" is available.`);
                resolve();
            }
        });
    });
}

async function selfDiagnosis() {
    console.log('\n--- 🛠️ RUNNING SELF-DIAGNOSIS CHECKS ---');
    
    try { require('play-dl'); console.log('✅ Node module check successful: "play-dl" is installed.'); } catch (e) { console.error('\n❌ CRITICAL ERROR: Node module "play-dl" is missing.'); console.error('   To fix, please run: npm install play-dl'); process.exit(1); }
    try { require('cheerio'); console.log('✅ Node module check successful: "cheerio" is installed.'); } catch (e) { console.error('\n❌ CRITICAL ERROR: Node module "cheerio" is missing.'); console.error('   To fix, please run: npm install cheerio'); process.exit(1); }
    try { require('uuid'); console.log('✅ Node module check successful: "uuid" is installed.'); } catch (e) { console.error('\n❌ CRITICAL ERROR: Node module "uuid" is missing.'); console.error('   To fix, please run: npm install uuid'); process.exit(1); }

    await checkBinary('ffmpeg', 'pkg install ffmpeg');
    await checkBinary('yt-dlp', 'pip install yt-dlp'); 
    
    console.log('--- DIAGNOSIS COMPLETE: ALL SYSTEMS GO ---');
}


// ═══════════════════════════════════════════════════════════════════
// V12 GAME LOGIC FUNCTIONS (UNCHANGED)
// ═══════════════════════════════════════════════════════════════════

/**
 * Ends the game and announces the winner/scores with a performance rating.
 */
async function endGame(sock, jid, game) {
    clearTimeout(game.timer);
    delete activeGames[jid];

    let finalScores = Object.entries(game.scoreMap)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .map(([jid, score]) => {
            const number = jid.split('@')[0];
            return `▸ @${number}: ${score}`;
        }).join('\n');

    if (finalScores.length === 0) finalScores = "No one scored!";
    
    const topScore = Object.values(game.scoreMap).reduce((max, score) => Math.max(max, score), 0);
    let rating;
    
    if (topScore >= 100) { // 10 correct answers out of 15
        rating = "👑 *WOW! That's excellent!* 🤯";
    } else if (topScore >= 50) { // 5 correct answers
        rating = "⭐ *Good Job! You passed!* 👍";
    } else {
        rating = "❌ *Try Again!* Better luck next time. 🙏";
    }

    const finalMessage = `
🎉 *GAME OVER! (15 Rounds Complete)* 🎉

${rating}

🥇 *FINAL SCOREBOARD:*
${finalScores}

_Next Level Coming Soon!_
Type *${config.prefix}game* to play again!
`;
    await sock.sendMessage(jid, { 
        text: finalMessage,
        mentions: Object.keys(game.scoreMap) 
    }, { quoted: game.mSent.key });
}

/**
 * Sends the next question or ends the game if max rounds are reached.
 */
async function sendNextQuestion(sock, jid) {
    const game = activeGames[jid];

    if (!game) return; // Safety check

    game.currentRound++;

    if (game.currentRound > game.maxRounds) {
        return endGame(sock, jid, game);
    }
    
    // Select a random question from the remaining pool and remove it
    const randomIndex = Math.floor(Math.random() * game.gameQuestionsRemaining.length);
    const randomQuestion = game.gameQuestionsRemaining.splice(randomIndex, 1)[0];
    
    // Randomize options order
    const options = randomQuestion.options.sort(() => Math.random() - 0.5);
    const answerIndex = options.indexOf(randomQuestion.a);
    const answerLetter = ['A', 'B', 'C', 'D'][answerIndex];

    const questionText = `
🧠 *QUIZ ROUND ${game.currentRound}/${game.maxRounds}* 🎮

*QUESTION:*
${randomQuestion.q}

*OPTIONS:*
A) ${options[0]}
B) ${options[1]}
C) ${options[2]}
D) ${options[3]}

*TO ANSWER:* Reply with *${config.prefix}answer <letter>*
*TIME LIMIT:* 30 seconds! Go!
`;
    
    // Update game state for the new round
    game.question = randomQuestion.q;
    game.correctAnswer = answerLetter;
    game.options = options;
    game.answeredUsers.clear(); // Reset answered users for the new round

    const mSent = await sock.sendMessage(jid, { text: questionText });
    game.mSent = mSent; // Store the key of the new question message

    // Start 30-second timer for the answer
    game.timer = setTimeout(async () => {
        // This executes if NO ONE answers the question in time
        const gameAfterTimeout = activeGames[jid];
        if (!gameAfterTimeout || gameAfterTimeout.sessionId !== game.sessionId) return;

        await sock.sendMessage(jid, { 
            text: `⏱️ *TIME UP!* The correct answer was *${game.correctAnswer}* (${randomQuestion.a}).\n\nStarting next round in 20 seconds...` 
        }, { quoted: game.mSent.key });

        // Start 20-second pause before next question
        setTimeout(() => sendNextQuestion(sock, jid), 20000); 

    }, 30000); // 30 seconds to answer
}


// ═══════════════════════════════════════════════════════════════════
// COMMAND DEFINITIONS 
// ═══════════════════════════════════════════════════════════════════

const commands = {
    // ────────────── MENU (Updated with Interactive Buttons) ──────────────
    menu: {
        name: 'menu',
        aliases: ['help', 'commands'],
        desc: 'Show all commands',
        category: 'general',
        async execute(ctx) {
            const uptime = getUptime();
            const date = new Date();
            
            const categories = {
                '📥 DOWNLOAD': [],
                '🎮 GAMES': [], 
                '👥 GROUP ADMIN': [],
                '🎉 FUN & INTERACTION': [],
                '🤖 AI & UTILITY': [],
                '👑 OWNER ONLY': []
            };

            Object.values(commands).forEach(cmd => {
                let cat = '';
                if (cmd.category === 'download') cat = '📥 DOWNLOAD';
                else if (cmd.category === 'game') cat = '🎮 GAMES'; 
                else if (cmd.category === 'group') cat = '👥 GROUP ADMIN';
                else if (cmd.category === 'fun') cat = '🎉 FUN & INTERACTION';
                else if (cmd.category === 'ai' || cmd.category === 'general') cat = '🤖 AI & UTILITY';
                else if (cmd.category === 'owner') cat = '👑 OWNER ONLY';
                
                if (cat) {
                    const prefix = cmd.category === 'owner' ? '*' : config.prefix;
                    categories[cat].push(`*${prefix}${cmd.name}*: ${cmd.desc}`);
                }
            });

            let menuText = `
╔═════════「 *${config.botName.toUpperCase()}* 」═════════╗
| 👑 *Owner:* ${config.ownerName}
| 📞 *Number:* +${config.ownerNumber}
| 🕰️ *Uptime:* ${uptime}
| 🛡️ *Mode:* ${config.mode.toUpperCase()}
╚══════════════════════════════════╝\n`;

            for (const cat in categories) {
                if (categories[cat].length > 0) {
                    menuText += `╭───「 *${cat}* 」\n`;
                    menuText += categories[cat].join('\n├ ') + '\n';
                    menuText += '╰─────────────────────\n';
                }
            }

            const buttons = [
                { buttonId: '.ping', buttonText: { displayText: '⚡ Ping Status' }, type: 1 },
                { buttonId: '.owner', buttonText: { displayText: '👑 Contact Owner' }, type: 1 }
            ];

            const messageContent = {
                text: menuText,
                footer: `© ${new Date().getFullYear()} ${config.botName}`,
                buttons: buttons,
                headerType: 1
            };

            await ctx.sock.sendMessage(ctx.from, messageContent, { quoted: ctx.m });
        }
    },
    // ────────────── UPDATE COMMAND ──────────────
    update: {
        name: 'update',
        aliases: ['whatsnew'],
        desc: 'Display latest bot update features',
        category: 'general',
        async execute(ctx) {
            const updateMessage = `
╔═══════════════════════╗
      *V12 UPDATE!*
    *𝕊𝕦𝕔𝕔𝕖𝕤𝕤𝕗𝕦𝕝𝕝𝕪*
╚════════════════════════╝

✦━━━━━━━━━━━━━━━━━━━━━━✦
      *𝕎ℍ𝔸𝕋'𝕊 ℕ𝔼𝎏𝕎?*
✦━━━━━━━━━━━━━━━━━━━━━━✦

▫️ 𝚁𝚎𝚏𝚊𝚌𝚝𝚘𝚛𝚎𝚍 \`.𝚐𝚊𝚖𝚎\` 𝚒𝚗𝚝𝚘 𝚊 𝟷𝟻-𝚛𝚘𝚞𝚗𝚍 𝙼𝚞𝚕𝚝𝚒-𝚀𝚞𝚒𝚣 𝚜𝚢𝚜𝚝𝚎𝚖!
▫️ 𝙰𝚍𝚍𝚎𝚍 \`.𝚜𝚌𝚘𝚛𝚎\` 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚝𝚘 𝚌𝚑𝚎𝚌𝚔 𝚖𝚊𝚛𝚔𝚜 𝚊𝚗𝚢𝚝𝚒𝚖𝚎.
▫️ 𝟸𝟶-𝚜𝚎𝚌𝚘𝚗𝚍 𝚙𝚊𝚞𝚜𝚎 𝚊𝚏𝚝𝚎𝚛 𝚎𝚊𝚌𝚑 𝚊𝚗𝚜𝚠𝚎𝚛 𝚋𝚎𝚏𝚘𝚛𝚎 𝚗𝚎𝚡𝚝 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗.
▫️ 𝙴𝚗𝚍-𝚘𝚏-𝚐𝚊𝚖𝚎 𝚛𝚊𝚝𝚒𝚗𝚐: *WOW!*, *Good Job!*, or *Try Again!*.
▫️ *NEW!* Optimized *.play* command to 128kbps to save data.
▫️ *NEW!* Optimized *.ytv* command to target 360p resolution to save data.
✦━━━━━━━━━━━━━━━━━━━━━━✦
      https://whatsapp.com/channel/0029Vb1JJlR9WtBzWg26wi3e
✦━━━━━━━━━━━━━━━━━━━━━━✦
       *ℙ𝕆𝕎𝔼ℝ𝔼𝔻 𝔹𝕐* ⚡
✦━━━━━━━━━━━━━━━━━━━━━━✦
> *©${config.ownerName}*`;

            await ctx.reply(updateMessage);
        }
    },
    // ────────────── PING ──────────────
    ping: {
        name: 'ping',
        aliases: ['speed', 'test'],
        desc: 'Check bot speed',
        category: 'general',
        async execute(ctx) {
            const latency = Date.now() - ctx.commandStartTime;
            
            await ctx.reply(`🏓 *Pong!*\n\n⚡ Speed: ${latency}ms\n✅ Status: Online\n🕰️ Uptime: ${getUptime()}`);
        }
    },
    // ────────────── YTV (Robust Video Download - 360p OPTIMIZED) ──────────────
    ytv: {
        name: 'ytv',
        aliases: ['video', 'dlvid', 'mp4'],
        desc: 'Download and send video from YouTube (360p Optimized)',
        category: 'download',
        async execute(ctx) {
            if (ctx.args.length === 0) {
                return ctx.reply('❌ Please provide a YouTube link or search query!');
            }

            const query = ctx.args.join(' ');
            await ctx.react('⏳');

            try {
                const searchResult = await play.search(query, { limit: 1 });
                if (!searchResult || searchResult.length === 0) return ctx.reply('❌ No results found.');

                const video = searchResult[0];
                const videoUrl = video.url;
                
                const tempDir = path.join(__dirname, 'downloads');
                if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
                const outputFileName = path.join(tempDir, `${Date.now()}-${video.id}.mp4`);
                
                // ✅ STRICT 360p DATA SAVING MODE
                const command = `yt-dlp -f 'bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/best[height<=360][ext=mp4]' --no-mtime -o "${outputFileName}" "${videoUrl}"`;
                
                await new Promise((resolve, reject) => {
                    exec(command, { timeout: 300000 }, (error, stdout, stderr) => { 
                        if (error) return reject(new Error('Download failed.'));
                        resolve();
                    });
                });
                
                await ctx.sock.sendMessage(ctx.from, {
                    video: fs.readFileSync(outputFileName),
                    caption: `✅ *360p Data Saving Mode*\nTitle: ${video.title}`,
                    mimetype: 'video/mp4'
                }, { quoted: ctx.m });

                fs.unlinkSync(outputFileName);
            } catch (e) {
                await ctx.reply(`❌ Error: ${e.message}`);
            }
        }
    },
    // ────────────── PLAY (Audio Only) - 128kbps OPTIMIZED ──────────────
    play: {
        name: 'play',
        aliases: ['song', 'music'],
        desc: 'Download audio (128kbps Optimized)',
        category: 'download',
        async execute(ctx) {
            if (ctx.args.length === 0) return ctx.reply('❌ Name a song!');
            const query = ctx.args.join(' ');
            await ctx.react('⏳');
            
            try {
                const searchResult = await play.search(query, { limit: 1 });
                const video = searchResult[0];
                const tempDir = path.join(__dirname, 'downloads');
                if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
                const outputFileName = path.join(tempDir, `${Date.now()}-${video.id}.mp3`);
                
                // ✅ SET AUDIO TO 128kbps (STRICT DATA SAVING)
                const command = `yt-dlp -x --audio-format mp3 --audio-quality 128K --no-mtime -o "${outputFileName}" "${video.url}"`;
                
                await new Promise((resolve, reject) => {
                    exec(command, { timeout: 300000 }, (error) => { 
                        if (error) return reject(new Error('Download failed.'));
                        resolve();
                    });
                });
                
                await ctx.sock.sendMessage(ctx.from, {
                    audio: fs.readFileSync(outputFileName),
                    mimetype: 'audio/mp4', 
                    fileName: `${video.title}.mp3`
                }, { quoted: ctx.m });
                
                fs.unlinkSync(outputFileName);
            } catch (e) {
                await ctx.reply(`❌ Error: ${e.message}`);
            }
        }
    },
    // ────────────── MEDIAFIRE DOWNLOAD (V11 ADDED) ──────────────
    mediafire: {
        name: 'mediafire',
        aliases: ['mf'],
        desc: 'Download a file directly from a MediaFire link.',
        category: 'download',
        async execute(ctx) {
            const mediafireUrl = ctx.args[0];

            if (!mediafireUrl || !mediafireUrl.includes('mediafire.com/file/')) {
                return ctx.reply('❌ Please provide a valid MediaFire file link.\n\nExample: .mediafire https://www.mediafire.com/file/.../file');
            }

            await ctx.react('📥');
            await ctx.reply(`🔍 Analyzing MediaFire link: ${mediafireUrl}`);

            try {
                const { data } = await axios.get(mediafireUrl);
                const $ = cheerio.load(data);
                const downloadButton = $('a.input.download_link[aria-label="Download file"]');
                const directDownloadUrl = downloadButton.attr('href');
                const fileName = downloadButton.attr('title') || 'MediaFire_File';

                if (!directDownloadUrl) {
                    await ctx.react('❓');
                    return ctx.reply('❌ Could not find the direct download link on the page. The link may be invalid or require a captcha.');
                }

                await ctx.reply(`✅ Found file: *${fileName}*\nStarting high-speed download...`);
                
                const tempDir = path.join(__dirname, 'downloads');
                if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
                const tempFilePath = path.join(tempDir, `${fileName}`);

                const fileResponse = await axios({
                    method: 'get',
                    url: directDownloadUrl,
                    responseType: 'stream'
                });

                const writer = fs.createWriteStream(tempFilePath);
                fileResponse.data.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });

                const mimeType = fileResponse.headers['content-type'] || 'application/octet-stream';
                
                await ctx.sock.sendMessage(ctx.from, { 
                    document: fs.readFileSync(tempFilePath), 
                    mimetype: mimeType, 
                    fileName: fileName,
                    caption: `📦 *MediaFire Download Complete*\nFile: ${fileName}`
                }, { quoted: ctx.m });

                fs.unlinkSync(tempFilePath);
                await ctx.react('✔️');

            } catch (e) {
                console.error('MediaFire Download Error:', e);
                await ctx.react('❌');
                await ctx.reply(`❌ An error occurred during the download process: ${e.message}`);
            }
        }
    },
    // ────────────── STICKER (Placeholder) ──────────────
    sticker: {
        name: 'sticker',
        aliases: ['s'],
        desc: 'Make sticker from image/video reply',
        category: 'download',
        async execute(ctx) {
            await ctx.reply('🖼️ *STICKER*\n\n_Feature requires replying to an image or video/GIF and full sticker library integration._');
        }
    },
    // ────────────── GAME (QUIZ SYSTEM - V12 MODIFIED) ──────────────
    game: {
        name: 'game',
        aliases: ['quiz', 'playgame'],
        desc: 'Start a 15-round multiple-choice quiz game.',
        category: 'game',
        groupOnly: true,
        async execute(ctx) {
            const game = activeGames[ctx.from];

            if (game) {
                // If a game is active, show the current status
                let scoreBoard = Object.entries(game.scoreMap).map(([jid, score]) => {
                    const number = jid.split('@')[0];
                    return `▸ @${number}: ${score}`;
                }).join('\n');

                return ctx.sock.sendMessage(ctx.from, { 
                    text: `🎮 *GAME IS ALREADY ACTIVE!* ⏳\n\n*Round:* ${game.currentRound}/${game.maxRounds}\n*Question:* ${game.question}\n\n*Scores:*\n${scoreBoard}`,
                    mentions: Object.keys(game.scoreMap) 
                }, { quoted: ctx.m });
            }

            // Start a new game
            const sessionId = uuidv4();
            const maxRounds = 15;
            
            // Clone questions array to prevent modifying the source array
            const newGameQuestions = [...gameQuestions]; 

            const newGame = {
                sessionId: sessionId,
                currentRound: 0,
                maxRounds: maxRounds,
                question: '',
                correctAnswer: '',
                options: [],
                scoreMap: {}, // { senderJid: score }
                answeredUsers: new Set(),
                gameQuestionsRemaining: newGameQuestions, // Pool of questions
                timer: null,
                mSent: null // Key of the last question message
            };
            activeGames[ctx.from] = newGame;
            
            await ctx.reply(`🧠 *New Quiz Game Started!* 🎮 (15 Rounds total)\n\nGet ready for Round 1!`);
            
            // Start the first question after a short delay
            setTimeout(() => sendNextQuestion(ctx.sock, ctx.from), 5000); 
        }
    },
    // ────────────── ANSWER (QUIZ SYSTEM - V12 MODIFIED) ──────────────
    answer: {
        name: 'answer',
        aliases: ['ans'],
        desc: 'Answer the active quiz question.',
        category: 'game',
        groupOnly: true,
        async execute(ctx) {
            const game = activeGames[ctx.from];
            
            if (!game || game.currentRound === 0) {
                return ctx.reply(`❌ No active quiz game! Start one with *${config.prefix}game*.`);
            }
            
            if (game.answeredUsers.has(ctx.sender)) {
                return ctx.reply('❌ You have already answered this question!');
            }

            const userGuess = ctx.args[0]?.toUpperCase();
            if (!['A', 'B', 'C', 'D'].includes(userGuess)) {
                return ctx.reply(`❌ Invalid answer format. Please reply with *${config.prefix}answer <letter>*`);
            }
            
            // Clear the round timer immediately since someone answered
            clearTimeout(game.timer); 

            game.answeredUsers.add(ctx.sender);
            
            // Initialize score if necessary
            const currentScore = game.scoreMap[ctx.sender] || 0;
            
            let responseText = '';
            
            if (userGuess === game.correctAnswer) {
                game.scoreMap[ctx.sender] = currentScore + 10;
                responseText = `✅ *CORRECT!* You earned 10 points!\nYour total score: ${game.scoreMap[ctx.sender]}\n\nNext question in 20 seconds...`;
                await ctx.react('💯');
            } else {
                game.scoreMap[ctx.sender] = currentScore; // Score remains the same
                responseText = `❌ *WRONG!* The correct answer was *${game.correctAnswer}*.\nYour total score: ${game.scoreMap[ctx.sender]}\n\nNext question in 20 seconds...`;
                await ctx.react('❌');
            }
            
            // Reply to the user
            await ctx.reply(responseText);
            
            // Start 20-second pause before the next question starts
            game.timer = setTimeout(() => sendNextQuestion(ctx.sock, ctx.from), 20000);
            
            // If the last person answers, ensure the timer still runs for the next question
        }
    },
    // ────────────── SCORE (QUIZ SYSTEM - V12 ADDED) ──────────────
    score: {
        name: 'score',
        aliases: ['myscore', 'scoreboard'],
        desc: 'Display current quiz scores.',
        category: 'game',
        groupOnly: true,
        async execute(ctx) {
            const game = activeGames[ctx.from];

            if (!game) {
                return ctx.reply(`❌ No active quiz game! Start one with *${config.prefix}game*.`);
            }
            
            let scoreBoard = Object.entries(game.scoreMap)
                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA) // Sort by highest score
                .map(([jid, score]) => {
                    const number = jid.split('@')[0];
                    return `▸ @${number}: ${score}`;
                }).join('\n');

            if (scoreBoard.length === 0) scoreBoard = "No points have been scored yet.";

            const scoreMessage = `
🏆 *CURRENT SCOREBOARD (Round ${game.currentRound}/${game.maxRounds})* 🏆

${scoreBoard}

*Next question:* ${game.question}
`;
            
            await ctx.sock.sendMessage(ctx.from, { 
                text: scoreMessage,
                mentions: Object.keys(game.scoreMap) 
            }, { quoted: ctx.m });
        }
    },
    // ────────────── TAGALL ──────────────
    tagall: {
        name: 'tagall',
        aliases: ['everyone', 'totag', 'hidetag'],
        desc: 'Tag all members',
        category: 'group',
        groupOnly: true,
        adminOnly: true, 
        async execute(ctx) {
            try {
                const groupMetadata = await ctx.sock.groupMetadata(ctx.from);
                const participants = groupMetadata.participants;
                const message = ctx.args.join(' ') || '📢 Attention everyone!';

                let mentions = [];
                let text = `╔══════════════════╗\n║  *GROUP TAG* ║\n╚══════════════════╝\n\n📢 *${message}* (Total: ${participants.length})\n\n`;

                participants.forEach((p, i) => {
                    mentions.push(p.id);
                    text += `▸ @${p.id.split('@')[0]}\n`;
                });

                await ctx.sock.sendMessage(ctx.from, { text, mentions }, { quoted: ctx.m });

            } catch (e) {
                await ctx.reply('❌ Failed to tag members!');
            }
        }
    },
    // ────────────── ADD ──────────────
    add: {
        name: 'add',
        aliases: [],
        desc: 'Add user to group',
        category: 'group',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true, 
        async execute(ctx) {
            if (ctx.args.length === 0) {
                return ctx.reply('❌ Please provide a number!\n\nExample: .add 263718555584');
            }

            try {
                let number = ctx.args[0].replace(/[^0-9]/g, '');
                const user = number + '@s.whatsapp.net';
                await ctx.sock.groupParticipantsUpdate(ctx.from, [user], 'add');
                await ctx.reply(`✅ Successfully added +${number}!`);
            } catch (e) {
                await ctx.reply('❌ Failed to add user. Ensure the number is valid and the bot is an admin.');
            }
        }
    },
    // ────────────── KICK ──────────────
    kick: {
        name: 'kick',
        aliases: ['remove'],
        desc: 'Kick user from group',
        category: 'group',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true, 
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .kick @user');
            }

            try {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'remove');
                await ctx.reply('✅ User kicked!');
            } catch (e) {
                await ctx.reply('❌ Failed to kick user. Ensure the bot is an admin.');
            }
        }
    },
    // ────────────── PROMOTE ──────────────
    promote: {
        name: 'promote',
        aliases: [],
        desc: 'Promote to admin',
        category: 'group',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .promote @user');
            }

            try {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'promote');
                await ctx.reply('✅ User promoted to admin!');
            } catch (e) {
                await ctx.reply('❌ Failed to promote user. Ensure the bot is an admin.');
            }
        }
    },
    // ────────────── DEMOTE ──────────────
    demote: {
        name: 'demote',
        aliases: [],
        desc: 'Remove admin rights',
        category: 'group',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .demote @user');
            }

            try {
                await ctx.sock.groupParticipantsUpdate(ctx.from, mentioned, 'demote');
                await ctx.reply('✅ Admin rights removed!');
            } catch (e) {
                await ctx.reply('❌ Failed to demote user. Ensure the bot is an admin.');
            }
        }
    },
    // ────────────── LINKGC ──────────────
    linkgc: {
        name: 'linkgc',
        aliases: ['gclink', 'grouplink'],
        desc: 'Get group invite link',
        category: 'group',
        groupOnly: true,
        adminOnly: true,
        botAdminOnly: true,
        async execute(ctx) {
            try {
                const link = await ctx.sock.groupInviteCode(ctx.from);
                await ctx.reply(`🔗 *Group Link*\n\nhttps://chat.whatsapp.com/${link}`);
            } catch (e) {
                await ctx.reply('❌ Failed to get link! Ensure the bot is an admin.');
            }
        }
    },
    // ────────────── GROUPJID ──────────────
    groupjid: {
        name: 'groupjid',
        aliases: ['jid'],
        desc: 'Get group/chat ID',
        category: 'general',
        async execute(ctx) {
            await ctx.reply(`📋 *JID:* ${ctx.from}`);
        }
    },
    // ────────────── SLAP ──────────────
    slap: {
        name: 'slap',
        aliases: [],
        desc: 'Slap someone',
        category: 'fun',
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .slap @user');
            }

            const slapper = ctx.sender.split('@')[0];
            const slapped = mentioned[0].split('@')[0];

            const msgs = [
                `👋 *${slapper}* slapped *${slapped}* across the face! 💥`,
                `👋 *SLAP!* *${slapper}* just slapped *${slapped}*! 😵`,
                `👋 *${slapper}* gave *${slapped}* a reality check! 👏`
            ];

            await ctx.sock.sendMessage(ctx.from, {
                text: msgs[Math.floor(Math.random() * msgs.length)],
                mentions: [ctx.sender, ...mentioned]
            }, {
                quoted: ctx.m
            });
        }
    },
    // ────────────── KISS ──────────────
    kiss: {
        name: 'kiss',
        aliases: [],
        desc: 'Kiss someone',
        category: 'fun',
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .kiss @user');
            }

            const kisser = ctx.sender.split('@')[0];
            const kissed = mentioned[0].split('@')[0];

            const msgs = [
                `💋 *${kisser}* gave *${kissed}* a sweet kiss! 😘`,
                `💋 *${kisser}* kissed *${kissed}*! How romantic! 💕`,
                `💋 *Muah!* *${kisser}* kissed *${kissed}*! ❤️`
            ];

            await ctx.sock.sendMessage(ctx.from, {
                text: msgs[Math.floor(Math.random() * msgs.length)],
                mentions: [ctx.sender, ...mentioned]
            }, {
                quoted: ctx.m
            });
        }
    },
    // ────────────── HUG ──────────────
    hug: {
        name: 'hug',
        aliases: [],
        desc: 'Hug someone',
        category: 'fun',
        async execute(ctx) {
            const mentioned = ctx.m.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!mentioned || mentioned.length === 0) {
                return ctx.reply('❌ Please mention someone!\n\nExample: .hug @user');
            }

            const hugger = ctx.sender.split('@')[0];
            const hugged = mentioned[0].split('@')[0];

            const msgs = [
                `🤗 *${hugger}* gave *${hugged}* a warm hug! 🫂`,
                `🤗 *${hugger}* hugged *${hugged}* tightly! ❤️`,
                `🤗 *Group hug!* *${hugger}* is hugging *${hugged}*! 🥰`
            ];

            await ctx.sock.sendMessage(ctx.from, {
                text: msgs[Math.floor(Math.random() * msgs.length)],
                mentions: [ctx.sender, ...mentioned]
            }, {
                quoted: ctx.m
            });
        }
    },
    // ────────────── JOKE ──────────────
    joke: {
        name: 'joke',
        aliases: [],
        desc: 'Random joke',
        category: 'fun',
        async execute(ctx) {
            try {
                const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
                await ctx.reply(`😂 *JOKE*\n\n${res.data.setup}\n\n_${res.data.punchline}_ 🤣`);
            } catch (e) {
                const jokes = [
                    {
                        s: "Why don't scientists trust atoms?",
                        p: "Because they make up everything!"
                    },
                    {
                        s: "What do you call a fake noodle?",
                        p: "An impasta!"
                    }
                ];
                const j = jokes[Math.floor(Math.random() * jokes.length)];
                await ctx.reply(`😂 *JOKE*\n\n${j.s}\n\n_${j.p}_ 🤣`);
            }
        }
    },
    // ────────────── TRUTH ──────────────
    truth: {
        name: 'truth',
        aliases: [],
        desc: 'Truth question',
        category: 'fun',
        async execute(ctx) {
            const truths = [
                'What is your biggest fear?',
                'Have you ever lied to your best friend?',
                'What is the most embarrassing thing you\'ve done?',
                'Who was your first crush?',
                'What is your biggest secret?',
                'Have you ever cheated on a test?',
            ];
            await ctx.reply(`🎯 *TRUTH*\n\n${truths[Math.floor(Math.random() * truths.length)]}`);
        }
    },
    // ────────────── DARE ──────────────
    dare: {
        name: 'dare',
        aliases: [],
        desc: 'Dare challenge',
        category: 'fun',
        async execute(ctx) {
            const dares = [
                'Send a voice message singing your favorite song',
                'Change your status to something embarrassing for 1 hour',
                'Call a random contact and say "I love you"',
                'Do 20 push-ups and send a video',
            ];
            await ctx.reply(`🎲 *DARE*\n\n${dares[Math.floor(Math.random() * dares.length)]}\n\n_Are you brave enough?_ 😏`);
        }
    },
    // ────────────── QUOTE ──────────────
    quote: {
        name: 'quote',
        aliases: ['inspire'],
        desc: 'Inspirational quote',
        category: 'fun',
        async execute(ctx) {
            try {
                const res = await axios.get('https://api.quotable.io/random');
                await ctx.reply(`💭 *QUOTE*\n\n"_${res.data.content}_"\n\n— ${res.data.author}`);
            } catch (e) {
                const quotes = [
                    {
                        c: 'The only way to do great work is to love what you do.',
                        a: 'Steve Jobs'
                    },
                    {
                        c: 'Success is not final, failure is not fatal.',
                        a: 'Winston Churchill'
                    }
                ];
                const q = quotes[Math.floor(Math.random() * quotes.length)];
                await ctx.reply(`💭 *QUOTE*\n\n"_${q.c}_"\n\n— ${q.a}`);
            }
        }
    },
    // ────────────── AI ──────────────
    ai: {
        name: 'ai',
        aliases: ['gpt', 'chatgpt', 'bot'],
        desc: 'Ask AI a question',
        category: 'ai',
        async execute(ctx) {
            if (ctx.args.length === 0) {
                return ctx.reply('❌ Please ask a question!\n\nExample: .ai What is the capital of Zimbabwe?');
            }

            const question = ctx.args.join(' ');
            await ctx.react('🤔');

            try {
                // Using a simple chatbot API placeholder. Replace with OpenAI or similar if needed.
                const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(question)}&owner=${config.ownerName}`);
                await ctx.reply(`🤖 *AI Response*\n\n${res.data.response}`);
            } catch (e) {
                await ctx.reply('🤖 Sorry, I couldn\'t process that. Try again! (API check failed)');
            }
        }
    },
    // ────────────── SELF MODE ──────────────
    self: {
        name: 'self',
        aliases: [],
        desc: 'Owner only mode',
        category: 'owner',
        ownerOnly: true,
        async execute(ctx) {
            config.mode = 'self';
            await ctx.reply('✅ Bot switched to *SELF MODE*\nOnly owner can use commands now.');
        }
    },
    // ────────────── PUBLIC MODE ──────────────
    public: {
        name: 'public',
        aliases: [],
        desc: 'Everyone can use',
        category: 'owner',
        ownerOnly: true,
        async execute(ctx) {
            config.mode = 'public';
            await ctx.reply('✅ Bot switched to *PUBLIC MODE*\nEveryone can use commands now.');
        }
    },
    // ────────────── SHUTDOWN ──────────────
    shutdown: {
        name: 'shutdown',
        aliases: ['stop'],
        desc: 'Stop bot',
        category: 'owner',
        ownerOnly: true,
        async execute(ctx) {
            await ctx.reply('👋 Shutting down...\nGoodbye!');
            setTimeout(() => {
                ctx.sock.end();
                process.exit(0);
            }, 2000);
        }
    },
    // ────────────── RESTART ──────────────
    restart: {
        name: 'restart',
        aliases: ['reboot'],
        desc: 'Restart bot',
        category: 'owner',
        ownerOnly: true,
        async execute(ctx) {
            await ctx.reply('🔄 Restarting...\nI\'ll be back!');
            setTimeout(() => {
                process.exit(1);
            }, 2000);
        }
    }
};

// ═══════════════════════════════════════════════════════════════════
// COMMAND LOOKUP (UNCHANGED)
// ═══════════════════════════════════════════════════════════════════

function findCommand(name) {
    if (commands[name]) return commands[name];

    for (const cmd of Object.values(commands)) {
        if (cmd.aliases && cmd.aliases.includes(name)) {
            return cmd;
        }
    }
    return null;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN BOT CONNECTION 
// ═══════════════════════════════════════════════════════════════════

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        browser: [config.botName + ' Bot', 'Chrome', '4.0.0'],
        markOnlineOnConnect: true
    });

    // ✅ AUTO-VIEW STATUS UPDATES & AUTO-LIKE
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (m.key.remoteJid === 'status@broadcast') {
            await sock.readMessages([m.key]); // Auto-view
            await sock.sendMessage(m.key.remoteJid, { react: { text: '💚', key: m.key } }, { statusJidList: [m.key.participant] });
            console.log(`✅ Status viewed and liked from: ${m.key.participant.split('@')[0]}`);
        }
    });

    // Handle connection updates
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrcode.generate(qr, { small: true });
            console.log('\n📱 Scan this QR code with WhatsApp:\n');
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('⚠️ Disconnected. Reconnecting:', shouldReconnect);
            if (shouldReconnect) startBot();

        } else if (connection === 'open') {
            if (!sock.user) {
                console.log('⚠️ Info: Connection open event received, but user data is not ready yet. Waiting...');
                return; 
            }

            botJid = sock.user.id;
            console.log('\n╔══════════════════════════════════════════╗');
            console.log(`║  ✅ ${config.botName} is ONLINE!          ║`);
            console.log(`║  👑 Owner: ${config.ownerName.padEnd(25)}  ║`);
            console.log(`║  📱 +${config.ownerNumber}                   ║`);
            console.log(`║  🤖 Prefix: ${config.prefix}                          ║`);
            console.log('╚══════════════════════════════════════════╝\n');
            
            if (!initialStatusSet) {
                 const statusText = `I am ${config.botName}. Commands start with ${config.prefix}.`;
                 try {
                     await sock.updateProfileStatus(statusText);
                     console.log('✅ Initial bot status set.');
                     initialStatusSet = true;
                 } catch (e) {
                     console.error('Failed to set initial bot status:', e.message);
                 }
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // Handle incoming messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {

        if (type !== 'notify') return;

        const m = messages[0];
        if (!m.message) return;
        if (m.key.fromMe) return;

        const from = m.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = m.key.participant || m.key.remoteJid;
        const body = m.message.conversation ||
            m.message.extendedTextMessage?.text ||
            m.message.imageMessage?.caption ||
            m.message.videoMessage?.caption || '';

        // Check prefix
        if (!body.startsWith(config.prefix)) {
            // Quiz Answer Handler (Allows just A, B, C, D without prefix if game is active)
            const game = activeGames[from];
            const answerMatch = body.toLowerCase().trim().match(/^(a|b|c|d)$/);
            
            if (game && answerMatch && !game.answeredUsers.has(sender) && game.currentRound > 0) {
                const userGuess = answerMatch[1].toUpperCase();
                
                // Simulate context for .answer command
                const ctx = {
                    sock, m, from, sender, body, args: [userGuess], isGroup, isOwner: false, commandStartTime: Date.now(),
                    reply: async (text) => { await sock.sendMessage(from, { text }, { quoted: m }); },
                    react: async (emoji) => { await sock.sendMessage(from, { react: { text: emoji, key: m.key } }); }
                };
                try {
                    // Execute the answer logic for the plain letter answer
                    await commands.answer.execute(ctx);
                } catch(e) { console.error('Error processing plain letter answer:', e); }
                return;
            }
            return;
        }

        const isOwner = sender.includes(config.ownerNumber);

        if (config.mode === 'self' && !isOwner) return;

        const args = body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = findCommand(commandName);
        if (!command) return;

        const senderIsAdmin = await isAdmin(sock, from, sender);
        const botIsAdminStatus = isGroup ? await isBotAdmin(sock, from) : false;

        // ────────── Permission checks ──────────
        if (command.ownerOnly && !isOwner) {
            return sock.sendMessage(from, { text: '⛔ Owner only command!' }, { quoted: m });
        }

        if (command.groupOnly && !isGroup) {
            return sock.sendMessage(from, { text: '⛔ Group only command!' }, { quoted: m });
        }
        
        if (command.adminOnly && !senderIsAdmin && !isOwner) {
            return sock.sendMessage(from, { text: '⛔ Admin only command!' }, { quoted: m });
        }
        // NOTE: The botAdminOnly check is omitted here for brevity but should be done
        // inside the command's execute function if needed (e.g., add, kick, promote).
        // ────────── End Permission checks ──────────

        // Create context
        const ctx = {
            sock, m, from, sender, body, args, isGroup, isOwner, commandStartTime: Date.now(),
            reply: async (text) => { await sock.sendMessage(from, { text }, { quoted: m }); },
            react: async (emoji) => { await sock.sendMessage(from, { react: { text: emoji, key: m.key } }); }
        };

        // Execute command
        try {
            await ctx.react('⏳');
            await command.execute(ctx);
            if (commandName !== 'answer') await ctx.react('✅'); 
        } catch (error) {
            console.error('Command error:', error);
            await ctx.react('❌');
            await ctx.reply('❌ Command execution error: ' + error.message);
        }

    });

}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION 
// ═══════════════════════════════════════════════════════════════════

async function main() {
    await selfDiagnosis(); 
    
    console.log('╔══════════════════════════════════════════╗');
    console.log(`║    🚀 Starting ${config.botName} Bot...        ║`);
    console.log('╚══════════════════════════════════════════╝\n');
    startBot(); 
}

main(); 

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    process.exit(0);
});

/**
 * Kidjustin-k ZIM Companion Bot (Nano Side-Process) - FINAL V9.8
 * Purpose: Focused, simplified bot with optimized wallpaper sizing and fixed weather key conflict.
 * FIXES: 1. Changed OpenWeather API key name from OPENWEATHER_KEY to OPENWEATHERMAP_KEY to match user's .env configuration.
 * Features: 
 * - Weather (OpenWeatherMap)
 * - Wallpaper/Screenshot (Uses Unsplash/Picsum HD random image)
 * * Run with: node zim_companion_bot.js
 */

// --- Configuration ---
const AUTH_DIR = './auth_info_zim'; 
const BOT_NAME = 'Kidjustin-k';
const OWNER_NAME = 't.Durani';

// --- Memory Store ---
const conversationHistory = new Map(); 

// =================================================================
// 1. AI FUNCTION (REMOVED - Replaced with Coming Soon)
// =================================================================
async function askAI(prompt, history = []) {
    return { 
        text: `🤖 The Intelligent AI chat feature is currently undergoing maintenance and will be *Coming Soon!* We appreciate your patience.`, 
        isAI: true
    };
}


// =================================================================
// 2. WEATHER FUNCTION (OpenWeatherMap)
// =================================================================
async function getWeatherForecast(city) {
    try {
        // --- FIX: Using OPENWEATHERMAP_KEY to match the user's working configuration ---
        if (!process.env.OPENWEATHERMAP_KEY) {
            return "⚠️ Weather configuration missing. (Please set OPENWEATHERMAP_KEY in .env file)";
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const flag = data.sys.country === 'ZW' ? '🇿🇼' : ''; 
        
        return `☀️ *Weather Report for ${data.name}* ${flag}\n\n` +
               `🌡️ *Temp:* ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)\n` +
               `☁️ *Sky:* ${data.weather[0].description}\n` +
               `💧 *Humidity:* ${data.main.humidity}%\n` +
               `💨 *Wind:* ${data.wind.speed} m/s`;

    } catch (err) {
        console.error("Weather Error:", err.message);
        return `❌ Could not find weather for "${city}". Please check the spelling.`;
    }
}

// =================================================================
// 3. FOOTBALL FUNCTION (REMOVED - Replaced with Coming Soon)
// =================================================================
async function getLiveFootballScores() {
    return `⚽ The Live Football feature is currently undergoing maintenance and will be *Coming Soon!* Check the *.menu*.`;
}

// =================================================================
// 4. WALLPAPER/SCREENSHOT FUNCTION (Picsum HD Random Image)
// =================================================================
async function getWallpaper() {
    try {
        // Generating a unique string to bypass caching layer
        const uniqueSeed = Date.now().toString() + Math.floor(Math.random() * 100000).toString();
        
        // --- Wallpaper Size: 1080x1920 (Full HD, 9:16 Aspect Ratio) ---
        const imageUrlToFetch = `https://picsum.photos/1080/1920?unique=${uniqueSeed}`;
        
        const response = await axios.get(imageUrlToFetch, { 
            responseType: 'arraybuffer' 
        });

        if (response.headers['content-type'] && !response.headers['content-type'].startsWith('image/')) {
             console.error("Wallpaper API returned non-image data.");
             return `❌ Wallpaper API Error: Failed to fetch the image.`;
        }

        return {
            type: 'image_buffer', 
            buffer: Buffer.from(response.data),
            originalUrl: imageUrlToFetch,
            caption: '✨ *Random HD Wallpaper/Image (1080x1920)*' 
        };

    } catch (err) {
        console.error("Wallpaper Error:", err.message);
        return `❌ Error fetching wallpaper/image.`;
    }
}


// =================================================================
// 5. MAIN SOCKET LOGIC
// =================================================================
async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const sock = makeWASocket({ 
        auth: state,
        printQRInTerminal: true 
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg?.message || msg.key.fromMe) return;

            const sender = msg.key.remoteJid;
            
            const text = msg.message.conversation || 
                         msg.message.extendedTextMessage?.text || 
                         msg.message.imageMessage?.caption || "";
            
            if (!text) return; 

            const isCommand = text.trim().startsWith('.');
            const args = isCommand ? text.slice(1).trim().split(/\s+/) : [text];
            const command = isCommand ? (args.shift() || "").toLowerCase() : ''; 
            const commandBody = isCommand ? args.join(' ') : text;

            let replyText = "";
            let replyMedia = null; 

            // --- COMMAND HANDLING ---
            if (isCommand) {
                console.log(`🔹 Command detected: ${command}`);
                
                switch (command) {
                    case 'menu':
                    case 'help':
                        replyText = `
👋 *${BOT_NAME} Menu* 🇿🇼
_Developed by ${OWNER_NAME}_

=============================
*🤖 BOT COMMANDS*
=============================
✨ *.alive*
  - Checks the bot's unique status.

☀️ *.weather [city]*
  - Get the current temperature and forecast.
  - _Example:_ *.weather Harare*

🖼️ *.wallpaper*
  - Fetches a new random HD wallpaper (1080x1920).

❌ *.clear*
  - Resets the bot's memory/context.

=============================
*⏳ COMING SOON*
=============================
🤖 *.ai [question]* - Intelligent chat feature
⚽ *.live* - Live football scores
`;
                        conversationHistory.delete(sender);
                        break;
                    
                    case 'alive': 
                        replyText = `
⚡ *SYSTEM STATUS: ALIVE* ⚡
I am the *${BOT_NAME} Companion Bot*, running smoothly alongside the main system.
Ready for commands: *.weather* or *.wallpaper*.
`;
                        break;
                    
                    case 'clear':
                    case 'reset':
                        conversationHistory.delete(sender);
                        replyText = "🧠 Memory cleared. Let's start fresh!";
                        break;

                    case 'weather':
                        if (!commandBody) {
                            replyText = "Please type the city name. Example: *.weather Harare*";
                        } else {
                            replyText = await getWeatherForecast(commandBody);
                        }
                        break;

                    case 'live':
                    case 'football':
                    case 'score':
                        replyText = await getLiveFootballScores(); 
                        break;
                        
                    case 'wallpaper': 
                    case 'screenshot': 
                        
                        const wallpaperResult = await getWallpaper();
                        
                        if (typeof wallpaperResult === 'object' && wallpaperResult.type === 'image_buffer') {
                            replyMedia = { 
                                buffer: wallpaperResult.buffer, 
                                caption: wallpaperResult.caption 
                            };
                        } else {
                            replyText = wallpaperResult;
                        }
                        break;
                    
                    case 'ai': 
                    case 'chat':
                        replyText = await askAI(commandBody); 
                        break;
                    
                    case 'ping':
                        // Ignore .ping to avoid conflict
                        return; 

                    default:
                        replyText = `❓ Unknown command ".${command}". Try *.menu* to see available commands.`;
                        break; 
                }
            } 
            // --- CRITICAL FIX: IGNORE NON-COMMAND MESSAGES ---
            else {
                return; 
            }
            
            // --- SEND MESSAGE (Media first, then Text) ---
            if (replyMedia && replyMedia.buffer) { 
                await sock.sendMessage(sender, { 
                    image: replyMedia.buffer, 
                    caption: replyMedia.caption 
                });
                console.log(`✅ Sent image reply to ${sender}`);
            } else if (replyText) {
                const finalReply = typeof replyText === 'object' && replyText.text ? replyText.text : replyText;
                await sock.sendMessage(sender, { text: finalReply });
                console.log(`✅ Sent reply to ${sender}`);
            }

        } catch (err) {
            console.error("❌ Message Handler Error:", err);
        }
    });

    // --- ADD THIS TO THE VERY BOTTOM OF index3.js ---
sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe || m.key.remoteJid.endsWith('@g.us')) return;

    const sender = m.key.remoteJid;
    const body = m.message.conversation || m.message.extendedTextMessage?.text || "";

    // If they message you personally (not a command)
    if (body && !body.startsWith(config.prefix)) {
        const welcomeMsg = `👋 Hello! I am *${config.botName}*.\n\nOwner *${config.ownerName}* is currently busy. Type *${config.prefix}menu* to see what I can do for you! ⚡`;
        
        await sock.sendMessage(sender, { text: welcomeMsg });
        console.log(`✅ Sent Auto-Welcome to ${sender.split('@')[0]}`);
    }
});


    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log(`📲 Scan QR Code:`);
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(`⚠️ Connection closed. Reconnecting: ${shouldReconnect}`);
            if (shouldReconnect) {
                startSock();
            }
        } else if (connection === 'open') {
            console.log(`✅ ${BOT_NAME} is ONLINE and ready!`);
        }
    });
}

// Start the bot
startSock();
