import Collection from "@discordjs/collection";
import {Player, PlayerEvents} from "discord-player";
import {PlayerEvent} from "./event";

class CustomPlayer extends Player {
	private readonly events: Collection<
		string,
		{
			name: keyof PlayerEvents;
			listener: PlayerEvents[keyof PlayerEvents];
		}
	> = new Collection();

	public onCustom<K extends keyof PlayerEvents>(
		file: string,
		event: K,
		listener: PlayerEvents[K],
		once: boolean = false
	): this {
		this.events.set(file, {
			name: event,
			listener
		});
		return once ? this.once(event, listener) : this.on(event, listener);
	}

	public reloadEvent(newEvent: PlayerEvent, file: string): this {
		if (newEvent.once) return;
		const oldEvent = this.events.get(file);
		this.events.delete(file);
		return this.off(oldEvent.name, oldEvent.listener).onCustom(file, newEvent.name, newEvent.run);
	}
}

export {CustomPlayer};
