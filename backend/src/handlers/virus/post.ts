import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { success } from '@libs/response';
import uuid from 'uuid';

var documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  const id = uuid();
  var params = {
    TableName: 'dojo-serverless-table',
    Item: {
      partitionKey: 'Virus',
      sortKey: id,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return success({ id });
};
