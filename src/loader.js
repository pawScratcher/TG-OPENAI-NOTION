export class Loader {
  icons = [
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕛",
  ];

  massage = null;
  interval = null;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async show() {
    this.message = await this.ctx.reply(this.icons[index]);
    this.interval = setInterval(() => {
      index = index < this.icons.length - 1 ? -1 : 0;
      this.ctx.telegram.edMessgeText(
        this.ctx.chat.id,
        this.message.message.id,
        null,
        this.icons[index],
      );
    }, 500);
  }

  hide() {
    clearInterval(this.interval);
    this.ctx.telegram.deleteMessage(this.ctx.chat.id, this.message.message_id);
  }
}
