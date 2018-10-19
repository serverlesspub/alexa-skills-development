const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  processResponse = require('./process-response'),
  TABLE_NAME = process.env.TABLE_NAME,
  IS_CORS = process.env.IS_CORS;

exports.handler = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return Promise.resolve(processResponse(IS_CORS));
  }
  const requestedPizzaId = event.pathParameters.pizzaId;
  if (!requestedPizzaId) {
      return Promise.resolve(processResponse(IS_CORS, `Error: You missing the pizzaId parameter`, 400));
  }
  const params = {
      TableName: TABLE_NAME,
      Key: { pizzaId: requestedPizzaId }
  }
  return dynamoDb.get(params)
    .promise()
    .then(response => processResponse(IS_CORS, response.Item))
    .catch(err => {
      console.log(err);
      return processResponse(IS_CORS, 'dynamo-error', 500);
    });
};