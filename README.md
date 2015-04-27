# node-everyoneapi

[![Build](https://travis-ci.org/scottbarstow/node-everyoneapi.png)](https://travis-ci.org/scottbarstow/node-everyoneapi)

Node Client library for EveryoneApi

## Install

Run

```
npm install everyoneapi
```
## Getting Started

* Install `everyoneapi`,
* **Get account sid and auth token** - to use the Everyone API you need these data.  
* **Set account sid and auth  token** - see code below:

```js
var everyoneapi = require("everyoneapi");

everyoneapi.config.sid = "your account sid";
everyoneapi.config.token = "your auth token";
```
## Usage

```js
var everyoneapi = require("everyoneapi");

//Using only a phone number
everyoneapi.getInfo("+1234567890", function(err, res){});

//Using phone number with a data point
everyoneapi.getInfo("+1234567890", "name", function(err, res){});

//Using phone number with some data points
everyoneapi.getInfo("+1234567890", ["name", "cnam", "gender"], function(err, res){});
```
Read [Everyone  Api documentation](https://www.everyoneapi.com/docs) for more details



