## Site
https://www.be37.pl/


## Development setup

### Frontend - Gatsby

#### Getting Started.

You will need node and [Gatsby](https://www.gatsbyjs.org/tutorial/part-zero/) installed.

Start the project by

`gatsby develop`

And for the final build
`gatsby build`

Please refer package.json scripts for more commands.

####

Projects based on below gatsby-starter
- https://github.com/akzhy/gatsby-starter-elemental


### Backend

#### Generate AWS config

1. Export AWS enviroment variables
   `export AWS_SECRET_ACCESS_KEY=fake_secret`
   `export AWS_ACCESS_KEY_ID=fake_key_id`
   `export AWS_REGION=eu-west-1`
2. Generate config
   `npm run generate-config`

#### This will generate

- aws-exports.ts
- schema.graphql

#### Codegen

`npm run generate-codegen`
