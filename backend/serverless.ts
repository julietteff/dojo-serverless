import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/ApiGatewayErrors';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.72',
  plugins: ['serverless-webpack', 'serverless-step-functions'],
  provider: {
    name: 'aws',
    runtime: 'nodejs10.x',
    region: 'eu-west-1',
    stage: 'dev',
    profile: 'dojo-serverless',
    usagePlan: {
      quota: {
        limit: 5000,
        offset: 2,
        period: 'MONTH',
      },
      throttle: {
        burstLimit: 200,
        rateLimit: 100,
      },
    },
  },
  functions: {
    hello: {
      handler: 'hello.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
    createVirus: {
      handler: 'createVirus.main',
      events: [{ schedule: 'rate(1 minute)' }],
    },
    virus: {
      handler: 'virus.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'virus',
            cors: true,
          },
        },
      ],
    },
    killVirus: {
      handler: 'virus.kill',
      events: [
        {
          http: {
            method: 'delete',
            path: 'virus/{id}',
            request: { parameters: { paths: { id: true } } },
            cors: {
              origins: 'http://localhost:3000',
            },
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
