const recipes = require('./recipes'),
  messages = require('./messages'),
  helloMessage = 'Buongiorno, Pizzaiolo!',
  pizzaList = ['Margharita', 'Quattro Formaggi', 'Buffala'];
  
module.exports = {
  'LaunchRequest': function () {
    this.emit('HelloIntent');
  },
  'HelloIntent': function () {
    this.response.speak(helloMessage);
    this.emit(':responseReady');
  },
  'ListPizzaIntent': function () {
    const pizzaMessage = `The pizzas I know are ${pizzaList.join(', ')}!`
    this.response.speak(pizzaMessage);
    this.emit(':responseReady');
  },
  'GetPizzaRecipeIntent': function () {
    const pizzaSlot = this.event.request.intent.slots.Pizza;
    let pizzaName;
    if (pizzaSlot && pizzaSlot.value) {
      pizzaName = pizzaSlot.value.toLowerCase();
    }

    const recipe = recipes[pizzaName];
    let speakOutput = '';

    if (recipe) {
      this.emit(':tell', recipe);
    } else {
      speakOutput = messages['RECIPE_NOT_FOUND_MESSAGE'];
      speakOutput += (pizzaName ? messages['RECIPE_NOT_FOUND_WITH_ITEM_NAME']+pizzaName : messages['RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME']);
      this.emit(':tell', speakOutput);
    }
  }
}