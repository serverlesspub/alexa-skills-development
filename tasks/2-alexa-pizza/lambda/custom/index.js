/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core'),
  message = 'Buongiorno, Pizzaiolo!'

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const welcomeMessage = 'Welcome to the Serverless Pizza skill!';

    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .getResponse();
  },
};

const HelloIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(message)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(`Sorry, I can't understand the command. Please say again.`)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
