import { IGapiModule, IGapi } from "~/types/gapi-module";

export interface GapiOptions {
  modules: Array<IGapiModule>;
}

export default class Gapi implements IGapi {
  [key: string]: any;
  public scope: string;
  private options: GapiOptions;

  /**
   * Creates a new instance of Gapi.
   */
  constructor(options: GapiOptions) {
    this.options = options;
    this.scope = this.options.modules.map(o => o.scope.join(" ")).join(" ");
  }

  async initialize(): Promise<void> {
    try {
      await this.loadScript();
      await this.loadApi();
      const promises = this.options.modules.map(o => this.loadModule(o));
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    }
  }

  private loadApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        gapi.load("client:auth2", resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  private loadScript() {
    return new Promise((resolve, reject) => {
      try {
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://apis.google.com/js/api.js";
        scriptElement.defer = true;
        scriptElement.async = true;
        scriptElement.onload = function() {
          scriptElement.onload = function() {};
          resolve();
        };
        document.head.appendChild(scriptElement);
      } catch (error) {
        reject(error);
      }
    });
  }

  public authenticate(): Promise<gapi.auth2.GoogleAuth> {
    return new Promise((resolve, reject) => {
      // if (localStorage.getItem("gapi-oauth2-token")) {
      // }

      gapi.auth2
        .init({
          client_id: process.env.GAPI_OAUTH2_CLIENT_ID,
          scope: this.scope
        })
        .then(
          function() {
            const GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.isSignedIn.listen(isSignedIn =>
              console.log(`isSignedIn=${isSignedIn}`)
            );
            resolve();
          },
          function(reason) {
            reject(reason.error);
          }
        );
    });
  }

  private loadModule(module: IGapiModule): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        var array = module.name.split(".");
        gapi.client.load(array[0], array[1], resolve);
      } catch (error) {
        reject(error);
      }
    });
  }
}
