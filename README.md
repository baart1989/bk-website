# Gatsby

## Getting Started.

You will need node and [Gatsby](https://www.gatsbyjs.org/tutorial/part-zero/) installed.

Start the project by

```gatsby develop```

And for the final build
```gatsby build```

## AWS-SDK as dev dependency
Ensure that this is not causing bundle size increase.

### Generate AWS config 
1. Export AWS enviroment variables
```export AWS_SECRET_ACCESS_KEY=fake_secret  ```
```export AWS_ACCESS_KEY_ID=fake_key_id  ```
```export AWS_REGION=eu-west-1 ```
2. Generate config
```npm run generate-config```

#### This will generate
- aws-exports.ts 
- schema.graphql

#### Codegen
```npm run generate-codegen```

