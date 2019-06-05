const mongoose = require('mongoose');
const HelpRequestsSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  location: String,
  pointOfContact: [{ name: String, phoneNumber: String, emailAddress: String }]
});
module.exports = mongoose.model('HelpRequests', HelpRequestsSchema);
