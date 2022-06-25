const { MessageEmbed } = require("discord.js");
const configF = require("../config");

class Command {
  constructor(SlashCommand) {
    this.data = SlashCommand;
  }

  send(
    interaction,
    content = undefined,
    embeds = undefined,
    components = undefined
  ) {
    return interaction.reply({
      content: content,
      embeds: embeds,
      components: components,
    });
  }

  async sendChannel(client, channelID, content) {
    return client.channels
      .fetch(channelID)
      .then((channel) => channel.send(content));
  }

  async getChannel(client, channelID) {
    return new Promise(async (resolve, reject) => {
      await client.channels.fetch(channelID).then((channel) => {
        resolve(channel);
      });
    });
  }

  async error(interaction, title, description, footer) {
    const config = await configF();

    const embedColor = config.successEmbedColor
      ? config.successEmbedColor
      : "#FF0000";
    const setTimestamp = config.setTimestamp ? config.setTimestamp : true;
    const embedFooter = config.footer ? config.footer : footer ? footer : null;

    const finalEmbed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(embedFooter)
      .setColor(embedColor);

    if (setTimestamp) {
      finalEmbed.setTimestamp();
    }

    this.send(interaction, ...Array(1), [finalEmbed]);
  }

  async success(interaction, title, description, footer) {
    const config = await configF();

    const embedColor = config.successEmbedColor
      ? config.successEmbedColor
      : "#00ff00";
    const setTimestamp = config.setTimestamp ? config.setTimestamp : true;
    const embedFooter = config.footer ? config.footer : footer ? footer : null;

    const finalEmbed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(embedFooter)
      .setColor(embedColor);

    if (setTimestamp) {
      finalEmbed.setTimestamp();
    }

    this.send(interaction, ...Array(1), [finalEmbed]);
  }
}

module.exports = Command;
