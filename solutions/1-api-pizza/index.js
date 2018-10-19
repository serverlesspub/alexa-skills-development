
exports.handler = async (event) => {
  const message = 'Buongiorno, Pizzaiolo!';
  return {
    statusCode: 200,
    body: message
  };
};