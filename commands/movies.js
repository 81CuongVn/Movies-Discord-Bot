const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { result } = require('lodash');
const fetch = require('node-fetch');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('movies')
		.setDescription('Get info about a movie!')
        .addStringOption(option =>
            option.setName('movie')
                .setDescription('Name of movie')
                .setRequired(true)),
	async execute(interaction) {
        let option = interaction.options.get("movie");
       
		let response = await fetch("http://www.omdbapi.com/?t=" + option.value + "&apikey=7e8bdc5e");
        const data = await response.json();
        const exampleEmbed = {
            color: 0x0099ff,
            title: data['Title'],
            url: 'https://www.google.com/search?q=' + option.value,
            author: {
                name: 'Movies Bot',
                icon_url: 'https://images.discordapp.net/avatars/872130446849364048/573dfa5618b61decad9a964e9651c771.png?size=128',
                url: 'https://top.gg/bot/872130446849364048',
            },
            description: data['Plot'],
            thumbnail: {
                url: 'https://discordapp.com/assets/e4923594e694a21542a489471ecffa50.svg',
            },
            fields: [
                { name: 'Ratings', value: " ⭐"+ data['imdbRating'], },
                { name: 'Genre', value: data['Genre'], inline: true },
                { name: 'Cast', value: data['Director'] + ", " + data['Writer'] + ", " + data['Actors'], inline: true },
                { name: 'Release', value: "📆" + data['Released'], inline: true },
                { name: 'Duration', value: "🕛" + data['Runtime'], inline: true },
                { name: 'Country', value: data['Country'], inline: true }
            ],
            image: {
                url: data['Poster'],
            },
            timestamp: new Date(),
            footer: {
                text: 'Thanks OMDB API'
            },
        };
        if(data['Poster']=="N/A"){
            exampleEmbed.image.url=""
        }
        
        
        if(data["Response"]=="False"){
            interaction.reply("Movies not found")}
        else{interaction.reply({ embeds: [exampleEmbed] })}
        
	},
};
