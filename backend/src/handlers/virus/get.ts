import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
// import uuid from 'uuid';
import { success } from '@libs/response';

var params = {
  TableName: 'dojo-serverless-table',
  KeyConditionExpression: 'partitionKey = :hkey',
  ExpressionAttributeValues: {
    ':hkey': 'Virus',
  },
};

var documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  // const viruses = [
  //   { id: uuid() },
  //   { id: uuid() },
  //   { id: uuid() },
  //   { id: uuid() },
  // ];

  var viruses;
  try {
    const data = await documentClient.query(params).promise();
    console.log(data);
    viruses = data.Items;
  } catch (err) {
    console.log(err);
  }

  return success({ viruses });
};
