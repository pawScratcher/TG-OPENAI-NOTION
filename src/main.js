import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "config";
import { chatGPT } from "./chatgpt.js";
import { create } from "./notion.js";
import { Loader } from "./loader.js";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {
  handlerTimeout: Infinity,
});

bot.command("start", (ctx) => {
  ctx.reply("Йоба боба, где ты был?");
});

bot.on(message("text"), async (ctx) => {
  try {
    const text = ctx.message.text;
    if (!text.trim()) ctx.reply("Text area can not be empty");

    const loader = new Loader(ctx);

    loader.show();

    const response = await chatGPT(text);

    if (!response) return ctx.reply("API error", response);

    const notionResponse = await create(text, response.content);

    loader.hide();

    ctx.reply(`Your page: ${notionResponse.url}`);
  } catch (e) {
    console.log("Error while proccessing text:", e.message);
  }
  // await chatGPT(ctx.message.text);
  // ctx.reply("test");
});

bot.launch();
