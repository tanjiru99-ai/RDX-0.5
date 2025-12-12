const lockedThreads = new Set();

module.exports.config = {
  name: "chatlock",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "Sardar RDX",
  description: "Group chat ko lock/unlock karo",
  commandCategory: "group",
  usages: "[lock/unlock]",
  cooldowns: 3
};

module.exports.handleEvent = async function({ api, event }) {
  if (lockedThreads.has(event.threadID)) {
    if (event.senderID !== api.getCurrentUserID()) {
      try {
        await api.unsendMessage(event.messageID); 
      } catch (err) {
        console.log("Delete error:", err);
      }
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) return api.sendMessage("Use: chatlock lock/unlock", event.threadID);

  if (args[0].toLowerCase() === "lock") {
    lockedThreads.add(event.threadID);
    return api.sendMessage("🔒 Group chat is now LOCKED! Only admin commands work.", event.threadID);
  }

  if (args[0].toLowerCase() === "unlock") {
    lockedThreads.delete(event.threadID);
    return api.sendMessage("🔓 Group chat is now UNLOCKED! Everyone can chat.", event.threadID);
  }
};
