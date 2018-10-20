/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core'),
  recipes = require('./recipes'),
  messages = require('./messages'),
  helloMessage = 'Buongiorno, Pizzaiolo!',
  pizzaList = ['Margharita', 'Quattro Formaggi', 'Bufala'];

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
      .speak(helloMessage)
      .getResponse();
  },
};

const ListPizzaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ListPizzaIntent';
  },
  handle(handlerInput) {
    const pizzaMessage = `The pizzas I know are ${pizzaList.join(', ')}!`;
    return handlerInput.responseBuilder
      .speak(pizzaMessage)
      .getResponse();
  },
};

const GetPizzaRecipeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetPizzaRecipeIntent';
  },
  handle(handlerInput) {

    const pizzaSlot = handlerInput.requestEnvelope.request.intent.slots.Pizza;
    let pizzaName;
    if (pizzaSlot && pizzaSlot.value) {
      pizzaName = pizzaSlot.value.toLowerCase();
    }

    const recipe = recipes[pizzaName];
    let speakMessage = '';

    if (recipe) {
      speakMessage = recipe;
      return handlerInput.responseBuilder
        .speak(speakMessage)
        .withSimpleCard(pizzaName, recipe)
        .getResponse();
    } else {
      speakMessage += (pizzaName ? messages['RECIPE_NOT_FOUND_MESSAGE'] + pizzaName : messages['RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME'])

      return handlerInput.responseBuilder
        .speak(speakMessage)
        .getResponse();
    }
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
    HelloIntentHandler,
    GetPizzaRecipeIntentHandler,
    ListPizzaIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
