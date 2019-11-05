import { IButlerModule } from "~/types/butler";

export default class Voice implements IButlerModule {
  name: string = "butler.voice";
  readonly synth: SpeechSynthesis;

  /**
   * Constructs a new instance of Assisten.Voice.
   */
  constructor() {
    this.synth = window.speechSynthesis;
    if (!this.synth) {
      throw new Error("HTML5 SpeechSynthesis is unavailable!");
    }
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const voice = new SpeechSynthesisUtterance(text);
        voice.lang = process.env.LANG as string;
        this.synth.speak(voice);
        voice.onend = function() {
          resolve();
        };
        voice.onerror = function(err) {
          reject(err);
        };
      } catch (error) {
        reject(error);
      }
    });
  }
}
