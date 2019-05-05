const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');

const app = dialogflow();

app.intent('Open Canvas', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      loadImmersiveUrl: 'https://canvas.highfive.host/',
      updatedState: {
        sceneState: 'WELCOME'
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('cut the vines', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'cut',
        item: 'vines',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('take the chainsaw', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'pick_up',
        item: 'chainsaw',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('look closer', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'look_closer',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('close eyes', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'close_eyes',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('go north', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'go_north',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('hello world', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'hello_world',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('fallback', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'fallback',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('dijkstra', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'dijkstra',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('cupcake', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'cupcake',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('hide debugger', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'hide_logs',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('enter temple', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'enter_temple',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('show debugger', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'show_logs',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('turn on lights', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'turn_on_lights',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('spaces', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'spaces',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('tabs', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'tabs',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('jump', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'jump',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('cross', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'cross',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('place artifact', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'place_artifact',
      }
    }
  };
  conv.ask(immersiveCanvas);
});


app.intent('pixel 3', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'pixel',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('player id', (conv, {id}) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'playerid',
        playerid: id
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('teleport', (conv, {level}) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'teleport',
        level: level 
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('start', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'start',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('build number', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'build_number',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('zero', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'zero',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

app.intent('speed mode', (conv) => {
  const immersiveCanvas = {
    immersiveResponse: {
      updatedState: {
        action: 'toggle_speed_mode',
      }
    }
  };
  conv.ask(immersiveCanvas);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);