const Alexa = require('alexa-sdk'),
  intentHandlers = require('./intent-handlers'); // a good chef is a tidy chef!

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(intentHandlers);
  alexa.execute();
};