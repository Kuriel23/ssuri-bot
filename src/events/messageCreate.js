const path = '../messages/';

module.exports = async (client, message) => {
	if (message.guild === null || message.author.bot) return;

	if (message.channel.id === '957686890121814076')
		require(path + 'pingparceria')(client, message);

	if (
		message.content.startsWith('ss?') &&
		message.author.id === '354233941550694400'
	)
		require('../messages/' + message.content.replace('ss?', ''))(
			client,
			message,
		).catch(err => {
			return message.reply(err);
		});
};
