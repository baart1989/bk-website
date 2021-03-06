/* eslint-disable @typescript-eslint/no-var-requires */
const aws = require('aws-sdk');

module.exports.getApi = async apiName => {
  const result = await new aws.AppSync().listGraphqlApis({ maxResults: 10 }).promise();

  return result.graphqlApis.find(api => {
    const found = api.name.includes(apiName);
    console.log({ name: api.name, apiName, found });
    return found;
  });
};

module.exports.getApiKey = async apiId => {
  const result = await new aws.AppSync().listApiKeys({ apiId, maxResults: 10 }).promise();
  console.log({ result });
  return result.apiKeys[0];
};

module.exports.getCognitoPool = async poolName => {
  const result = await new aws.CognitoIdentityServiceProvider()
    .listUserPools({ MaxResults: 10 })
    .promise();

  return result.UserPools.find(pool => pool.Name.indexOf(poolName) !== -1);
};

module.exports.getCognitoPoolClient = async UserPoolId => {
  if (!UserPoolId) {
    return Promise.resolve({ ClientId: '' });
  }

  const result = await new aws.CognitoIdentityServiceProvider()
    .listUserPoolClients({ UserPoolId })
    .promise();

  return result.UserPoolClients[0];
};

module.exports.getApiSchema = async apiId => {
  const result = await new aws.AppSync().getIntrospectionSchema({ apiId, format: 'SDL' }).promise();
  return result.schema;
};
