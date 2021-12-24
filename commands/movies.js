const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { result } = require('lodash');
const fetch = require('node-fetch');
var search = require('youtube-search');

var opts = {
  maxResults: 1,
  key: 'AIzaSyDbT0Qk07AIW5GeEDS4HaDvgBmeuLHial4'
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('movies')
		.setDescription('Get info about a movie!')
        .addStringOption(option =>
            option.setName('movies')
                .setDescription('Name of movie')
                .setRequired(true)),
	async execute(interaction) {
        let option = interaction.options.get("movies");
		let response = await fetch("http://www.omdbapi.com/?t=" + option.value + "&apikey=");
        const data = await response.json();

        search('jsconf', opts, function(err, results) {
            if(err) return console.log(err);
          
            global.film=results
          });
        let exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(data['Title'])
        .setURL('https://discord.js.org/')
        .setAuthor('Movies Bot', 'https://images.discordapp.net/avatars/872130446849364048/573dfa5618b61decad9a964e9651c771.png?size=128', 'https://top.gg/bot/872130446849364048')
        .setDescription(data['Plot'])
        .setThumbnail('https://discordapp.com/assets/e4923594e694a21542a489471ecffa50.svg')
        .addFields(
            { name: 'Ratings', value: " ⭐"+ data['imdbRating'], },
            { name: 'Genre', value: data['Genre'], inline: true },
            { name: 'Cast', value: data['Director'] + ", " + data['Writer'] + ", " + data['Actors'], inline: true },
            { name: 'Release', value: "📆" + data['Released'], inline: true },
            { name: 'Duration', value: "🕛" + data['Runtime'], inline: true },
            { name: 'Country', value: data['Country'], inline: true }
        )
        .setImage(data['Poster'])
        .setTimestamp()
        .setFooter('Thanks OMDB API');

        if(data['Type'] == "series"){
            MessageEmbed.addFields=(
            { name: 'Ratings', value: " ⭐"+ data['imdbRating'], },
            { name: 'Genre', value: data['Genre'], inline: true },
            { name: 'Cast', value: data['Director'] + ", " + data['Writer'] + ", " + data['Actors'], inline: true },
            { name: 'Release', value: "📆" + data['Released'], inline: true },
            { name: 'Duration', value: "🕛" + data['Runtime'], inline: true },
            { name: 'Country', value: data['Country'], inline: true },
            { name: 'Episodes', value: data['totalSeasons'], inline: true })
        }
        
        interaction.reply({ embeds: [exampleEmbed] })
        
	},
};
