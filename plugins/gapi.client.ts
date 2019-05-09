const SCOPES = ["https://www.googleapis.com/auth/calendar.events.readonly"];

function loadScript() {
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

async function load() {
  try {
    await loadScript();
    await loadGapi();
    await loadGapiCalendar();
    await authenticate();
  } catch (error) {
    console.error(error);
  }
}

async function get() {
  let events: gapi.client.calendar.Event[] | undefined;
  try {
    const options = {
      singleEvents: true,
      orderBy: "startTime",
      calendarId: process.env.GAPI_CALENDAR_ID as string,
      timeMin: new Date().toISOString(),
      maxResults: 5
    };
    const response = await gapi.client.calendar.events.list(options);
    events = response.result.items;
  } catch (error) {
    console.error(error);
  } finally {
    return events;
  }
}
function loadGapiCalendar(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      gapi.client.load("calendar", "v3", resolve);
    } catch (error) {
      reject(error);
    }
  });
}
function loadGapi(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      gapi.load("client:auth2", resolve);
    } catch (error) {
      reject(error);
    }
  });
}

function authenticate(): Promise<gapi.auth2.GoogleAuth> {
  return new Promise((resolve, reject) => {
    var immediate = false;
    if (localStorage.getItem("gapi-oauth2-token")) {
    }
    gapi.auth2
      .init({
        client_id: process.env.GAPI_OAUTH2_CLIENT_ID,
        scope: SCOPES.join(" ")
      })
      .then(auth => {
        console.log(auth);
        resolve(auth);
      });

    // gapi.auth.authorize(

    //   authResult => {
    //     console.log("authResult", authResult);
    //     if (authResult && !authResult.error) {
    //       resolve(authResult);
    //     } else {
    //       console.log("Auth failed", authResult.error);
    //       reject(authResult.error);
    //     }
    //   }
    // );
  });
}

export { load, get };
