import {Client, GatewayIntentBits, Guild} from 'discord.js';
import {config} from 'dotenv';
config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const Token = process.env.BOT_TOKEN;
client.login(Token);

client.on('ready', (client) => {
  console.log(`${client.user.tag} is online`);
});

client.on('guildMemberAdd', (member) => {
  member
    .send(`Welcome ${member.user.username} ! don't be shy, we don't bite ^^`)
    .then((message) => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
});

client.on('messageCreate', (message) => {
  if (message.content.includes('@everyone')) {
    message
      .delete()
      .then((msg) => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    message.reply(`Don't tag everyone !`);
  }
});

// literally lm9dm:

// client.on('presenceUpdate', (oldPresence, newPresence) => {
//   let botroom = client.channels.cache.get('1064132547103162368');

//   botroom.send(
//     `${newPresence.user.username}'s presence changed to ${newPresence.status}`
//   );
// });

client.on('messageDelete', (message) => {
  let botroom = client.channels.cache.get('794960072702033980');
  botroom.send(`${message.author} deleted his message: ${message.content}`);
});

// client.on('voiceStateUpdate', (oldState, newState) => {
//   let botroom = client.channels.cache.get('1064132547103162368');
//   const guild = new Guild(client.guilds.cache.get(0));
//   guild
//     .fetchAuditLogs()
//     .then((audit) => console.log(audit.entries.first()))
//     .catch(console.error);
//   botroom.send(`moved ${newState.member}`);
// });
