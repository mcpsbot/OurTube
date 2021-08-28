import {REST} from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ClientEvent, CustomClient } from "../client";
import { CustomConsole } from "../console";

module.exports = class extends ClientEvent {
	constructor(){
		super("ready", true);
	}

	async run(client: CustomClient<true>){
		const rest = new REST({version: "9"}).setToken(client.token),
			guildId = process.env.GUILD;

		try {
			const {user, commands} = client;

			CustomConsole.log(`Started refreshing ${commands.size} application (/) commands.`);

			const clientId = user.id,
				[globalCommands, guildCommands] = commands.partition(command => command.global);

			CustomConsole.log(`Refreshing ${globalCommands.size} global (/) commands.`);

			await rest.put(
				Routes.applicationCommands(clientId),
				{body: globalCommands.map(command => command.data.toJSON())}
			);

			CustomConsole.log(`Refreshing ${guildCommands.size} guild (/) commands.`);

			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{body: guildCommands.map(command => command.data.toJSON())}
			);

			CustomConsole.log(`Successfully reloaded ${commands.size} application (/) commands.`);
		} catch (error) {
			CustomConsole.log(error);
		}
		
		CustomConsole.log(`${client.user.username} is ready`);
	}
}