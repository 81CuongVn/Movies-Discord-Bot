const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help for movies'),
	async execute(interaction) {
		await interaction.reply('use .movies+title of film');
	},
};
