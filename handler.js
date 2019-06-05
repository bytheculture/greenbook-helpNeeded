'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const User = require('./models/help-requests.js');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      HelpRequest.create(JSON.parse(event.body))
        .then(helpRequest => callback(null, {
          statusCode: 200,
          body: JSON.stringify(helpRequest)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the help request.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      HelpRequest.findById(event.pathParameters.id)
        .then(helpRequest => callback(null, {
          statusCode: 200,
          body: JSON.stringify(helpRequest)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the help request.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      HelpRequest.find()
        .then(helpRequests => callback(null, {
          statusCode: 200,
          body: JSON.stringify(helpRequests)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the help requests.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      HelpRequest.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify(helpRequest)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the help requests.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      HelpRequest.findByIdAndRemove(event.pathParameters.id)
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed help request with id: ' + helpRequest._id, helpRequest: helpRequest })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the help request.'
        }));
    });
};
