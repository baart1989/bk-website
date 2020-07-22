/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const aws = require('aws-sdk');
const queries = require('./queries');

const env = !!process.env.npm_config_stage ? process.env.npm_config_stage : 'dev';

console.log(`generate config for env: ${env} start`);

const reqEnvVarWithFallback = varName => {
  const v = process.env[varName];
  if (!v) throw Error(`Missing enviroment variable: ${varName}`);
  return v;
};

const accessKeyId = reqEnvVarWithFallback('AWS_ACCESS_KEY_ID');
const secretAccessKey = reqEnvVarWithFallback('AWS_SECRET_ACCESS_KEY');
const awsRegion = reqEnvVarWithFallback('AWS_REGION');
aws.config.update({ accessKeyId, secretAccessKey, awsRegion });

const baseName = `${env}-BiuroKonstrukcyjne`;

const { getApi, getApiKey, getApiSchema, getCognitoPool, getCognitoPoolClient } = queries;

const createConfigFile = async () => {
  const api = await getApi(baseName);
  const apiKey = await getApiKey(api.apiId);

  const pool = (await getCognitoPool(baseName)) || { Id: '', ClientId: '' };
  const poolClient = await getCognitoPoolClient(pool.Id);

  console.log({ api })

  const schema = await getApiSchema(api.apiId);
  const config = createConfig(
    env,
    awsRegion,
    pool.Id,
    poolClient.ClientId,
    api.uris['GRAPHQL'],
    apiKey.id,
    api.authenticationType,
  );

  fs.writeFileSync('schema.graphql', schema);
  fs.writeFileSync('aws-exports.ts', config);
};

const createConfig = (
  env,
  awsRegion,
  userPoolId,
  userPoolWebClientId,
  appsyncGraphqlEndpoint,
  appsyncGraphqlApiKey,
  appsyncAuthType,
) => `export const awsConfig = {
  aws_project_region: '${awsRegion}',
  aws_cognito_identity_pool_id: '',
  aws_cognito_region: '${awsRegion}',
  aws_user_pools_id: '${userPoolId}',
  aws_user_pools_web_client_id: '${userPoolWebClientId}',
  oauth: {},
  aws_user_files_s3_bucket: '',
  aws_user_files_s3_bucket_region: '${awsRegion}',
  aws_appsync_graphqlEndpoint:
    '${appsyncGraphqlEndpoint}',
  aws_appsync_region: '${awsRegion}',
  aws_appsync_authenticationType: '${appsyncAuthType}',
  aws_appsync_apiKey: '${appsyncGraphqlApiKey}',
};
`;

createConfigFile().then(() => console.log(`generate config for env: ${env} success`));
