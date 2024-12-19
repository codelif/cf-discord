// Import discord.js
const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages
    ]
});

// Token for your bot (replace 'YOUR_BOT_TOKEN' with your actual bot token)
// const TOKEN = 'YOUR_BOT_TOKEN';
const TOKEN = process.env.DISCORD_TOKEN;

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for interactionCreate (to handle slash commands)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'deez') {
        await interaction.reply('NUTS!');
    }
});

// Register the slash command (one-time setup per guild)
client.on('ready', async () => {
    const guildId = process.env.DISCORD_GUILDID; // Replace with your server's guild ID
    
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        console.error('Guild not found! Make sure the bot is in the server.');
        return;
    }

    const command = new SlashCommandBuilder()
        .setName('deez')
        .setDescription('Replies with NUTS!');

    await guild.commands.create(command);
    console.log('Slash command /deez registered.');
});

// Login to Discord with your bot's token
client.login(TOKEN);
