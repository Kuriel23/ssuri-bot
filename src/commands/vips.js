const discord = require('discord.js');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('vips')
		.setDescription('Coisas para vips!')
		.setDefaultMemberPermissions(discord.PermissionFlagsBits.Administrator)
		.addSubcommand(subcommand =>
			subcommand
				.setName('register')
				.setNameLocalizations({
					'pt-BR': 'registrar',
					'en-US': 'register',
				})
				.setDescription('Registre alguém')
				.addUserOption(option =>
					option
						.setName('usuário')
						.setNameLocalizations({
							'pt-BR': 'usuário',
							'en-US': 'user',
						})
						.setDescription('Identifique o utilizador')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('vip')
						.setDescription('Identifique o cargo de vip')
						.setRequired(true)
						.setChoices(
							{ name: 'Minduim', value: 'Minduim' },
							{ name: 'Waku Waku', value: 'Waku Waku' },
							{ name: 'Twilight', value: 'Twilight' },
						),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove_vip')
				.setNameLocalizations({
					'pt-BR': 'remover_vip',
					'en-US': 'remove_vip',
				})
				.setDescription('Remova o vip de alguém')
				.addUserOption(option =>
					option
						.setName('usuário')
						.setNameLocalizations({
							'pt-BR': 'usuário',
							'en-US': 'user',
						})
						.setDescription('Identifique o utilizador')
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('create_role')
				.setNameLocalizations({
					'pt-BR': 'criar_cargo',
					'en-US': 'create_role',
				})
				.setDescription('Crie um cargo')
				.addStringOption(option =>
					option
						.setName('nome')
						.setNameLocalizations({
							'en-US': 'name',
							'pt-BR': 'nome',
						})
						.setDescription('Defina um nome ao seu cargo')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('hex')
						.setDescription('Defina um código Hex (Ex: #000000)')
						.setRequired(false),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('change_color')
				.setNameLocalizations({
					'pt-BR': 'editar_cor',
					'en-US': 'change_color',
				})
				.setDescription('Altere a cor do seu cargo')
				.addStringOption(option =>
					option
						.setName('hex')
						.setDescription(
							'Defina um código Hex para alterar a cor (Ex: #000000)',
						)
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('change_name')
				.setNameLocalizations({
					'pt-BR': 'editar_nome',
					'en-US': 'change_name',
				})
				.setDescription('Altere o nome do seu cargo')
				.addStringOption(option =>
					option
						.setName('nome')
						.setNameLocalizations({
							'en-US': 'name',
							'pt-BR': 'nome',
						})
						.setDescription(
							'Defina um nome novo para alterar o nome do seu cargo',
						)
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('share_role')
				.setNameLocalizations({
					'pt-BR': 'partilhar_cargo',
					'en-US': 'share_role',
				})
				.setDescription(
					'Partilhe para até no máximo 4 pessoas este cargo, basta só o usar.',
				)
				.addUserOption(option =>
					option
						.setName('amigo')
						.setNameLocalizations({
							'en-US': 'friend',
							'pt-BR': 'amigo',
						})
						.setDescription('Partilhe com um amigo o seu cargo.')
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Veja o registro de alguém')
				.addUserOption(option =>
					option
						.setName('usuário')
						.setNameLocalizations({
							'pt-BR': 'usuário',
							'en-US': 'user',
						})
						.setDescription('Identifique o utilizador')
						.setRequired(true),
				),
		),
	async execute(interaction, client) {
		const subcommand = interaction.options._subcommand;
		const membro = interaction.options.getMember('usuário') || null;
		switch (subcommand) {
			case 'register': {
				if (!interaction.member.permissions.has('ManageRoles'))
					return interaction.reply({
						content: 'Sem permissão',
						ephemeral: true,
					});
				const cargo = interaction.options.getString('vip');
				let cargoId;
				if (cargo === 'Minduim') cargoId = '1134267676575928417';
				if (cargo === 'Waku Waku') cargoId = '1137774730422800484';
				if (cargo === 'Twilight') cargoId = '1137912982056226879';
				const person = interaction.guild.members.cache.get(membro.id);
				person.roles.add(cargoId);
				const _date = new Date();
				_date.setMonth(_date.getMonth() + cargo === 'Minduim' ? 1 : 2);
				const date = new Date(_date);
				const guild = await client.db.Guilds.findOne({ _id: '1' });
				guild.vipschedule.push({
					_id: membro.id,
					vip: cargoId,
					schedule: date,
				});
				guild.save();
				const doc = await client.db.Users.findOne({ _id: membro.id });
				if (!doc) {
					new client.db.Users({
						_id: membro.id,
					}).save();
				}
				interaction.reply({ content: 'Operação bem sucedida!' });
				break;
			}
			case 'remove_vip': {
				if (!interaction.member.permissions.has('ManageRoles'))
					return interaction.reply({
						content:
							"Você não está permitido a retirar usuários como VIP's.",
						ephemeral: true,
					});

				const docGuild = await client.db.Guilds.findOne({
					_id: '1',
				});
				const docUser = await client.db.Users.findOne({
					_id: membro.id,
				});

				if (
					(docUser && docUser.vips.roleid) ||
					(docUser && docUser.vips.roleid !== '')
				) {
					interaction.guild.roles.cache
						.find(r => r.id === docUser.vips.roleid)
						.delete();

					docUser.roleid = '';
					docUser.save();
				}
				const cargo = interaction.guild.roles.cache.find(
					r => r.id === docGuild.vipschedule.vip,
				);

				const person = interaction.guild.members.cache.get(membro.id);

				interaction.reply({ content: 'Retirado com sucesso.' });

				person.roles.remove(cargo);
				docGuild.vipschedule.pull({ _id: membro.id });
				docGuild.save();
				break;
			}
			case 'info': {
				if (!interaction.member.permissions.has('ManageRoles'))
					return interaction.reply({
						content: 'Sem permissão',
						ephemeral: true,
					});
				const guild = await client.db.Guilds.findOne({ _id: '1' });
				const vip = guild.vipschedule.id(membro.id);
				if (!vip)
					return interaction.reply({
						content: 'Sem VIP detectado.',
						ephemeral: true,
					});
				const emb = new discord.EmbedBuilder()
					.setTitle('Vip de ' + membro.user.tag)
					.setColor(client.cor)
					.addFields(
						{ name: 'VIP', value: `<@&${vip.vip}>` },
						{
							name: 'Data de término',
							value: discord.time(vip.schedule, 'f'),
						},
					);
				interaction.reply({ embeds: [emb] });
				break;
			}
			case 'share_role': {
				if (!interaction.member.roles.has('1137912982056226879'))
					return interaction.reply({
						content:
							'O seu vip precisa ser do nível Twilight para esta vantagem.',
					});
				const amigo = interaction.options.getMember('amigo');
				const person2 = interaction.guild.members.cache.get(amigo.id);
				const doc = await client.db.Users.findOne({
					_id: interaction.member.id,
				});
				if (doc) {
					if (doc?.vips?.roleid === '')
						return interaction.reply({
							content:
								'Parece que não sei qual o id do seu cargo de vip, uma ação manual foi acionada para esse seu cargo.',
						});
					if (!person2.roles.has(doc.vips.roleid)) {
						person2.roles.add(doc.vips.roleid);
						doc.save();
						interaction.reply({
							content: 'Dei o cargo para o seu amigo!',
						});
					} else {
						person2.roles.remove(doc.vips.roleid);
						doc.save();
						interaction.reply({
							content: 'Removi o cargo para o seu amigo!',
						});
					}
				} else {
					return interaction.reply({
						content:
							'Que estranho seu dado não foi encontrado aqui.',
					});
				}
				break;
			}
			case 'change_name': {
				const nomea = interaction.options.getString('nome');
				const doc = await client.db.Users.findOne({
					_id: interaction.member.id,
				});
				if (!doc)
					return interaction.reply({
						content: 'Você não tem registro no meu banco de dados.',
					});
				if (doc?.vips?.roleid === '')
					return interaction.reply({
						content:
							'Parece que não sei qual o id do seu cargo de vip, uma ação manual foi acionada para esse seu cargo.',
					});
				const role = interaction.guild.roles.cache.find(
					r => r.id === doc.vips.roleid,
				);
				role.edit({ name: nomea });
				break;
			}
			case 'change_color': {
				const hexa = interaction.options.getString('hex');
				const doc = await client.db.Users.findOne({
					_id: interaction.member.id,
				});
				if (!doc)
					return interaction.reply({
						content: 'Você não tem registro no meu banco de dados.',
					});
				if (doc?.vips?.roleid === '')
					return interaction.reply({
						content:
							'Parece que não sei qual o id do seu cargo de vip, uma ação manual foi acionada para esse seu cargo.',
					});
				const role = interaction.guild.roles.cache.find(
					r => r.id === doc.vips.roleid,
				);
				if (!hexa.startsWith('#'))
					return interaction.reply({
						content: 'A cor definida não têm # no início.',
					});

				if (!isHexColor(hexa.replace('#', '')) === true) {
					return interaction.reply({
						content: 'Essa cor não está definida corretamente.',
					});
				}

				function isHexColor(hex) {
					return (
						typeof hex === 'string' &&
						hex.length === 6 &&
						!isNaN(Number('0x' + hex))
					);
				}
				role.setColor(hexa);
				break;
			}
			case 'create_role': {
				if (
					!interaction.member.roles.has('1137912982056226879') ||
					!interaction.member.roles.has('1137774730422800484')
				)
					return interaction.reply({
						content:
							'O seu vip precisa ser do nível Waku Waku ou superior para esta vantagem.',
					});
				const nome = interaction.options.getString('nome');
				const hex = interaction.options.getString('hex') || '#FFFFFF';
				if (!hex.startsWith('#'))
					return interaction.reply({
						content: 'A cor definida não têm # no início.',
					});

				if (!isHexColor(hex.replace('#', '')) === true) {
					return interaction.reply({
						content: 'Essa cor não está definida corretamente.',
					});
				}
				function isHexColor(hex) {
					return (
						typeof hex === 'string' &&
						hex.length === 6 &&
						!isNaN(Number('0x' + hex))
					);
				}
				const doc = await client.db.Users.findOne({
					_id: interaction.member.id,
				});
				if (doc?.vips?.roleid !== '')
					return interaction.reply({
						content: 'Você já criou um cargo antes.',
					});
				interaction.guild.roles
					.create({
						name: nome,
						color: hex,
						reason: "Novo cargo para VIP's",
					})
					.then(role => {
						interaction.member.roles.add(role);
						if (doc) {
							doc.vips.roleid = role.id;
							doc.save();
						} else {
							new client.db.Users({
								_id: interaction.member.id,
								vips: { roleid: role.id },
							}).save();
						}
						interaction.reply({
							content: 'Seu cargo foi criado com sucesso!',
						});
					});

				break;
			}
		}
	},
};
