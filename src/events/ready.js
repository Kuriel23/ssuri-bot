const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { readdirSync } = require('fs');
require('dotenv').config();
const { ChalkAdvanced } = require('chalk-advanced');
const schedule = require('node-schedule');

module.exports = async client => {
	const commandFiles = readdirSync('./src/commands/').filter(file =>
		file.endsWith('.js'),
	);

	const commands = [];

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({
		version: '10',
	}).setToken(process.env.TOKEN);

	(async () => {
		try {
			if (process.env.STATUS === 'PRODUCTION') {
				// If the bot is in production mode it will load slash commands for all guilds
				await rest.put(Routes.applicationCommands(client.user.id), {
					body: commands,
				});
				console.log(
					`${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green(
						'Sucesso registrado comandos globalmente',
					)}`,
				);
			} else {
				await rest.put(
					Routes.applicationGuildCommands(
						client.user.id,
						process.env.GUILD_ID,
					),
					{
						body: commands,
					},
				);

				console.log(
					`${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green(
						'Sucesso registrado comandos localmente',
					)}`,
				);
			}
		} catch (err) {
			if (err) console.error(err);
		}
	})();
	client.user.setPresence({
		activities: [{ name: `À sua disposição!`, type: 4 }],
		status: 'dnd',
	});

	schedulers();

	async function schedulers() {
		const not = await client.db.Guilds.findOne({ _id: '1' });
		if (not) {
			not.vipschedule.forEach(vips => {
				schedule.scheduleJob(vips.schedule, async function () {
					const cargo = vips.vip;

					const person = client.guilds.cache
						.get('1134267676538196009')
						.members.cache.get(vips._id);
					const docUser = await client.db.Users.findOne({
						_id: vips._id,
					});

					if (docUser?.vips?.roleid !== '') {
						client.guilds.cache
							.get('1134267676538196009')
							.roles.cache.find(r => r.id === docUser.vips.roleid)
							.delete();

						docUser.roleid = '';
						docUser.save();
					}
					if (person) person.roles.remove(cargo);
					not.vipschedule.pull({ _id: vips._id });
					await client.db.Guilds.findOneAndUpdate(
						{ _id: '1' },
						{ $pull: { vipschedule: { _id: vips._id } } },
						{ new: true },
					);
				});
			});
		}
	}
};
