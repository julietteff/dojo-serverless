import { APIGatewayProxyHandler } from 'aws-lambda';
import { v1, validate } from 'uuid';

export const main: APIGatewayProxyHandler = async event => {
  if (
    event.queryStringParameters != null &&
    validate(event.queryStringParameters.virusId)
  ) {
    return {
      statusCode: 200,
      body: JSON.stringify([
        { partitionKey: 'Virus', sortKey: event.queryStringParameters.virusId },
      ]),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify([
        { partitionKey: 'Virus', sortKey: v1() },
        { partitionKey: 'Virus', sortKey: v1() },
        { partitionKey: 'Virus', sortKey: v1() },
      ]),
    };
  }
};

export const kill: APIGatewayProxyHandler = async event => ({
  statusCode: 200,
  headers: {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    message: 'Your function executed successfully!',
    input: event,
  }),
});
