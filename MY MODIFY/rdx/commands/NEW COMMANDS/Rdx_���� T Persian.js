module.exports.config = {
	name: "persian",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "rdx zain",
	description: "Translate text to Persian (Farsi)",
	commandCategory: "TRANSLATE",
	usages: "PREFIX",
	cooldowns: 5,
	dependencies: {
		"request": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const request = global.nodemodule["request"];
	var content = args.join(" ");
	if (content.length == 0 && event.type != "message_reply") return global.utils.throwError(this.config.name, event.threadID, event.messageID);
	var translateThis = content.slice(0, content.indexOf(" ->"));
	var lang = 'fa'; // Persian
	if (event.type == "message_reply") {
		translateThis = event.messageReply.body;
	}
	return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
		if (err) return api.sendMessage("Translation failed.", event.threadID, event.messageID);
		var retrieve = JSON.parse(body);
		var text = '';
		retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
		api.sendMessage(`${text}`, event.threadID, event.messageID);
	});
}
