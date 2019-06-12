import { IButlerModule } from "~/types/butler";

export default class Ears implements IButlerModule {
  name: string = "butler.ears";
  readonly recognition: SpeechRecognition;

  /**
   * Constructs a new instance of Butler.Ears.
   */
  constructor() {
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = process.env.LANG as string;
    this.recognition.onstart = function() {};
    this.recognition.onresult = function(event: SpeechRecognitionEvent) {
      // event.
    };
    this.recognition.onerror = function(event: SpeechRecognitionError) {};
    this.recognition.onend = function() {};
  }

  Listen() {
    this.recognition.start();
  }
}
