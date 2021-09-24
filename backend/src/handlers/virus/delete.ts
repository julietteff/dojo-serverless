import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { success } from '@libs/response';

var documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async event => {
  console.log(event);
  const errorMessage = 'no id given';
  if (event.pathParameters == null) {
    return success({ errorMessage });
  }
  const id = event.pathParameters.id;
  var params = {
    TableName: 'dojo-serverless-table',
    Key: {
      partitionKey: 'Virus',
      sortKey: id,
    },
  };

  try {
    const data = await documentClient.delete(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return success({ id });
};
//     statusCode: 200,
//     headers: {
//       //'Access-Control-Allow-Headers': 'Content-Type,Origin',
//       //'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*', //'http://localhost:3000',
//       //'Access-Control-Allow-Methods': 'DELETE,OPTIONS',
//     },
//     body: JSON.stringify({
//       message: 'Your function executed successfully!',
//       input: event,
//     }),
//   };
