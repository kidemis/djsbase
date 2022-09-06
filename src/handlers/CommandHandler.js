async function commandHandler (interaction) {
    if(!interaction.isChatInputCommand()) return;

    const client = interaction.client;
    const commands = client.bot.commands;

    const commandName = interaction.commandName;
    const command = commands.get(commandName);

    if(!command) return await interaction.reply({ content: 'Command not found', ephemeral: true });

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({ content: 'Error!', ephemeral: true });
    }
}

module.exports = commandHandler;