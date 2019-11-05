import { IButler, IButlerModule, Intent, ButlerState } from "~/types/butler";
import Ears from "./ears.client";
import Voice from "./voice.client";

export class Butler implements IButler {
  public state: ButlerState = ButlerState.LISTENING;
  private readonly ears: Ears;
  private readonly voice: Voice;
  public readonly modules: IButlerModule[] = [];

  /**
   *
   */
  constructor() {
    this.ears = new Ears();
    this.voice = new Voice();
  }

  add(butlerModule: IButlerModule) {
    this.modules.push(butlerModule);
  }

  async request(intent: Intent): Promise<void> {
    try {
      this.state = ButlerState.THINKING;
      const voicePromise = this.voice.speak("Give me a second");
      // do intent
      await Promise.all([voicePromise]);
    } catch (error) {
      this.state = ButlerState.LISTENING;
      console.error(error);
    }
  }
}
