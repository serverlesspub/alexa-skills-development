const pizzaList = ['Margharita', 'Quattro Formaggi', 'Buffala'];

exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(pizzaList)
  };
};