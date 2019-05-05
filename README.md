# Interactive Canvas

Interactive Canvas is a platform for displaying content on Assistant-powered smart displays - anything from simple games to single page applications and more. If you can build a website, you can build an action for the Home Hub! To show off this new feature, Deeplocal partnered with Google to build a choose-your-own-adventure style game inspired by early text based games like Colossal Cave Adventure.

___
Here’s what you need to get started with Interactive Canvas and Jungle Dream:

- nodejs (we used node v10.15.3) & npm installed and available in your path

To get things up and running, clone the repo:

`$ git clone https://github.com/Deeplocal/io19-canvas-sample`

Next cd into the directory:

`$ cd io19-canvas-sample`

Install the dependencies:

`$ npm i`

Next create a firebase firestore database and set it up in the following way:

```
/metrics/finishes/ - {value: number}
/metrics/plays/ - {value: number}

/mode/speedmode/ - { mode: boolean (false) }

/questions/first/ - { playerid: string, time: firebase.firestore.Timestamp }
/questions/second/ - { playerid: string, time: firebase.firestore.Timestamp }

/votes/spaces/ - { value: number }
/votes/tabs/ - { value: number }
```

and download the json file with your api key, project id and auth domain. It should look like this:

```
{
    "API_KEY": "aisudhfliasuhdlfkuahsldifu",
    "AUTH_DOMAIN": "localhost",
    "PROJECT_ID": "some-google-project"
}
```

rename the file `.env.json` and place it in the `game/` directory.

___

Get the development server up and running:

`$ npm run dev`

Now you can start hacking away and making any desired changes. Here’s a handy link to get you going: http://localhost:1234

When you’re ready to test in the simulator (https://console.actions.google.com/project/YOUR_PROJECT_ID/simulator) or on a Home Hub, run a production build:

`$ npm run build`

Then simply host the site somewhere - we used Google App Engine.

_NOTE:_ Your website must be https enabled!

___
Once your game has a URL you can import the provided Dialogflow intents and connect your web content to an Assistant action. To get you started we’ve provided a zip (dialogflow.zip) of our intents which you can import into your Dialogflow project and adjust as accordingly.

Next, navigate to the fulfillment tab in the Dialogflow console and paste in the contents of the index.js file provided in the fulfillment directory.

Find this block in the index.js file and replace https://your.domain.com with your URL:
```
app.intent('Open Canvas', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      loadImmersiveUrl: 'https://your.domain.com/',
      updatedState: {
        sceneState: 'WELCOME'
      }
    }
  };
  conv.ask(immersiveCanvas);
});
```

Click deploy and give the firebase deployment a few minutes to get up and running.

Head on over to the actions simulator (https://console.actions.google.com/project/YOUR_PROJECT_ID/simulator) for your Actions on Google Project, select smart display, and then launch your app. You should see the interactive webpage load in the window on the right.
