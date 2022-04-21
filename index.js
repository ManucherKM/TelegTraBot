const axios = require("axios");

const TelegramApi = require("node-telegram-bot-api");

const token = "5370420504:AAHwhwjsOB-bM9AIDt0AgvWrmrKRrfBHoRw";

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "Запуск бота" },
    { command: "/info", description: "Информация о боте" },
])

bot.on("message", async msg => {

    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
        await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/6a3/497/6a34971d-6648-37c2-8f2b-8940f65ba906/5.webp");
        await bot.sendMessage(chatId, `Что может бот: \n\n/start - Запуск бота\n\n/info - Информация о боте\n\nДля перевода текста просто скинь любой текст на английском.`);
        return;
    } else if (text === "/info") {
        await bot.sendMessage(chatId, `Бот был разработан с целью перевода текста`);
        return;
    } else {
        await bot.sendMessage(chatId, `Вот твой текст: \n\n`);

        const options = {
            method: 'GET',
            url: 'https://just-translated.p.rapidapi.com/',
            params: { lang: 'en-ru', text: text },
            headers: {
                'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
                'X-RapidAPI-Key': '76d7e06148msh263d850659d08bdp1c483cjsnf26e619a4a8c'
            }
        };

        axios.request(options).then(async function (response) {
            let translate = response.data.text[0];
            await bot.sendMessage(chatId, translate);
        }).catch(function (error) {
            console.error(error);
        });

        return;
    }
})