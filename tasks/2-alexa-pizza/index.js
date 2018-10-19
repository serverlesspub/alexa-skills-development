const Alexa = require('alexa-sdk'),
  helloMessage = 'Buongiorno, Pizzaiolo!';

const handlers = {
  'LaunchRequest': function () {
    this.emit('HelloIntent');
  },
  'HelloIntent': function () {
    this.response.speak(helloMessage);
    this.emit(':responseReady');
  }
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};