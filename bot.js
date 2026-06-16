const { Telegraf } = require('telegraf');
const token = '8957971558:AAEaDLGM_dsMjWfhkkoI4CGMPG4STOWKuXU';
const bot = new Telegraf(token);

bot.start((ctx) => {
    ctx.reply('Привет, октагон!');
});

bot.on('text', (ctx) => {
    ctx.reply('Привет, октагон!');
});

bot.launch().then(() => {
    console.log('Бот успешно запущен и ждет сообщений...');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));