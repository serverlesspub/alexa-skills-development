const helloMessage = 'Buongiorno, Pizzaiolo!',
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
  }
}