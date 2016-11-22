# Serverless URL Shortener
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-url-shortener.svg)](https://badge.fury.io/js/serverless-url-shortener)
[![dependencies](https://david-dm.org/aletheia/serverless-url-shortener.svg)](https://david-dm.org/aletheia/serverless-url-shortener)
[![dev-dependencies](https://david-dm.org/aletheia/serverless-url-shortener/dev-status.svg)](https://david-dm.org/aletheia/serverless-url-shortener?type=dev)
[![bitHound Overall Score](https://www.bithound.io/github/aletheia/serverless-url-shortener/badges/score.svg)](https://www.bithound.io/github/aletheia/serverless-url-shortener)
[![coverage](https://codecov.io/gh/aletheia/serverless-url-shortener/branch/master/graph/badge.svg)](https://codecov.io/gh/aletheia/serverless-url-shortener)
[![license](https://img.shields.io/npm/l/amity-serverless-module-starter.svg)](https://www.npmjs.com/package/amity-serverless-module-starter)

Serverless URL shortener provides a set of services to shorten urls and track opening completely built on AWS Lambda and [Serverless 1.1 framework](https://serverless.com)

## Getting Started
In order to install and run examples you need an AWS account properly configured on your system. To get started with AWS account configuration, please follow this [link](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

Start using Serverless URL shortener is extremely easy

#### 01. Start cloning this repository
```bash
git clone https://github.com/aletheia/serverless-url-shortener path-to-my-folder
cd path-to-my-folder
```
#### 02. Install dependencies through NPM
```bash
npm install
```

#### 03. Deploy CloudFormation stack and functions
Serverless commands are exposed through ```npm run``` to provide ease of usage and consistency for continuous integration

```bash
npm run sls deploy --stage <any stage> --region <your region>
```

## Project structure
Serverless framework does not force any specific project structure, but relying on some conventions that can make you find your path across any project.

We usually use [npm](https://www.npmjs.com) and [GulpJS](http://gulpjs.com) due to the better support for configuration and parameter passing provided by Gulp, but we do not involve any file copy or packing. Whenever this is required, we think that deferring all the uglify/package stuff to [Webpack](https://webpack.github.io), maybe used as a serverless plugin, could be a great idea.

Going on, code that could be shared through multiple resources is stored into a shared folder, while 

## Archtiecture
Serverless does not mean architecture-less, moreover strong pattern culture is required since Serverless framework has an unopinionated view about Lambda function development. We have enforced some well-grounded principles into this project, making our code almost completely cloud-independent and enforcing segregation.

### A layered archietcture
We adopted a layered architecture as follows for :
![alt text](module-architecture.png "Services architecture")

#### handler
Receives Lambda event, handles AWS specific code and is injected with validator

#### validator
Perform event / input validation, enforcing constraints and rejecting invalid payloads. Additional permission checks should be implemented here

#### translator
Converts input data to business logic data, adding and building system consistent representation. Is injected with logic layer

#### logic
Implements Business Logic for a specific service. Works on Business Objects, being an equivalent of MVC Service layer. Is injected with the adapter

#### adapter
Converts data to a persistence actionable format, does not know about persistence concrete implementation, builds queries but does not initialize any connection to persistence. It is injected with repository.

#### repository
Implements direct API calls to underlying persistence system

#### AWS resources
Amazon Web Service persistence layer. It can be either dynamoDB, Redis, S3 or another microservice

## A note about languages
The serverless framework relies on AWS Lambda and supports a variety of development languages such as Python, Java, and NodeJS. To this particular project, we found NodeJS being the best solution, due to its special requirements regarding fast time to market. Moreover, we believe NodeJS and Python being first citizens in the Serverless world, thanks to their inner flexibility.
This code is written using ES5 and plain Javascript with a bit of Promise flavor, provided by Bluebird. The reason for this choice (instead of ES6) is related to the support Lambda is currently providing that is NodeJS 4.3.2. We do not believe that using transpillers (such as Babel) is a good idea in an environment where you do not have access to the file system (and cannot debug remote code directly). Call this a conservative move, but we think the risk is not worth the game.
