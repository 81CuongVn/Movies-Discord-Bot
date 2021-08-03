from discord import embeds      #import libraries
import requests
import json
import discord                 
from discord.ext import commands
from discord.ext.commands import bot
import asyncio



client = commands.Bot(command_prefix='.')


@client.command()
async def ping(ctx):
    await ctx.send('Pong! {0}'.format(round(bot.latency, 1)))

@client.event                 #message connect!
async def on_ready():
    print("Bot is ready")


@client.command()                                       
async def movies(ctx, *, arg):
    t=arg
    url = "http://www.omdbapi.com/?t="+t+"&apikey=YOURAPIKEY"
    response = requests.request("GET", url)
    json_data = response.json()
    try:
        json_data['Error']
        await ctx.send("Movies not found, retry and check spelling or change title")
    except KeyError:
        embedVar = discord.Embed(title=json_data['Title'], color=0x00ff00)
        embedVar.add_field(name="Description", value=json_data['Plot'], inline=False)
        embedVar.add_field(name="Ratings", value=" ⭐"+ json_data['imdbRating'], inline=False)
        embedVar.add_field(name="Genre", value= json_data['Genre'], inline=False)
        embedVar.add_field(name="Cast", value= json_data['Director'] + ", " + json_data['Writer'] + ", " + json_data['Actors'], inline=False)
        embedVar.add_field(name="Release", value= "📆" + json_data['Released'], inline=False)
        embedVar.add_field(name="Duration", value= "🕛" + json_data['Runtime'], inline=False)
        embedVar.add_field(name="State", value= json_data['Country'], inline=False)
        await ctx.send(embed=embedVar)
        await ctx.send(json_data['Poster'])
    

client.run('DISCORDTOKENBOT')
