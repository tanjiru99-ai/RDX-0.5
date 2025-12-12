module.exports.config = {
    name: "joinnoti",
    eventType: ["log:subscribe"],
    version: "1.0.0",
    credits: "SARDAR RDX",
    description: "Set bot nickname from config when bot joins group",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "chache", "joinvid");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    return;
}

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    const fs = require("fs-extra");
    const path = require("path");
    
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        const botID = api.getCurrentUserID();
        
        const botnick = global.config.BOTNICK || `{ ${global.config.PREFIX} } × ${global.config.BOTNAME || "bot"}`;
        
        try {
            await api.changeNickname(botnick, threadID, botID);
        } catch (e) {
            console.log("Nickname set error:", e);
        }
        
        const vidPath = path.join(__dirname, "chache", "joinvid");
        
        if (fs.existsSync(vidPath)) {
            const videos = fs.readdirSync(vidPath).filter(f => 
                f.endsWith('.mp4') || f.endsWith('.gif') || f.endsWith('.mov')
            );
            
            if (videos.length > 0) {
                const randomVid = videos[Math.floor(Math.random() * videos.length)];
                const vidFile = path.join(vidPath, randomVid);
                
                return api.sendMessage({
                    body: `✅ Bot nickname set to: ${botnick}`,
                    attachment: fs.createReadStream(vidFile)
                }, threadID);
            }
        }
        
        return api.sendMessage(`✅ Bot nickname set to: ${botnick}`, threadID);
    }
}
