import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import { v1 } from 'uuid';
import { success } from '@libs/response';

const documentClient = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async () => {
  const virusId = v1();

  await documentClient
    .put({
      TableName: 'dojo-serverless-table',
      Item: { partitionKey: 'Virus', sortKey: virusId },
    })
    .promise();

  return success({ id: virusId });
};
