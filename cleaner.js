const fs = require('fs');
const path = './index.js';

let content = fs.readFileSync(path, 'utf8');

// 1. Find the end of the startBot function
// This looks for the return sock; line which usually marks the end
const endOfFunctionPattern = /return sock;\s*\n\s*}/;

if (content.match(endOfFunctionPattern)) {
    console.log("🔍 Finding misplaced events...");

    // 2. Identify blocks starting with sock.ev.on that are AFTER the function ends
    const splitContent = content.split(endOfFunctionPattern);
    let mainBody = splitContent[0];
    let tail = splitContent[1];

    // Regex to find sock.ev.on blocks in the tail
    const eventPattern = /sock\.ev\.on\([\s\S]*?\}\);/g;
    const misplacedEvents = tail.match(eventPattern);

    if (misplacedEvents) {
        console.log(`✅ Found ${misplacedEvents.length} misplaced event blocks. Moving them...`);
        
        // Remove them from the tail
        let newTail = tail.replace(eventPattern, '');
        
        // Insert them before the 'return sock'
        let fixedContent = mainBody + 
                           "\n    // --- Restored by Cleaner ---\n    " + 
                           misplacedEvents.join('\n    ') + 
                           "\n    return sock;\n}" + 
                           newTail;

        fs.writeFileSync(path, fixedContent);
        console.log("🚀 index.js has been repaired!");
    } else {
        console.log("i️ No misplaced sock.ev.on blocks found in the tail.");
    }
} else {
    console.log("❌ Could not find the 'return sock;' line. Make sure your function structure is standard.");
}
