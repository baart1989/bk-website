/* eslint-disable @typescript-eslint/no-var-requires */
const aws = require('aws-sdk');

module.exports.getApi = async apiName => {
  const result = await new aws.AppSync().listGraphqlApis({ maxResults: 10 }).promise();
  return result.graphqlApis.find(api => api.name.indexOf(apiName) !== -1);
};

module.exports.getApiKey = async apiId => {
  const result = await new aws.AppSync().listApiKeys({ apiId, maxResults: 10 }).promise();
  return result.apiKeys[0];
};

module.exports.getCognitoPool = async poolName => {
  const result = await new aws.CognitoIdentityServiceProvider()
    .listUserPools({ MaxResults: 10 })
    .promise();

  return result.UserPools.find(pool => pool.Name.indexOf(poolName) !== -1);
};

module.exports.getCognitoPoolClient = async UserPoolId => {
  const result = await new aws.CognitoIdentityServiceProvider()
    .listUserPoolClients({ UserPoolId })
    .promise();

  return result.UserPoolClients[0];
};

module.exports.getApiSchema = async apiId => {
  const result = await new aws.AppSync().getIntrospectionSchema({ apiId, format: 'SDL' }).promise();
  return result.schema;
};
