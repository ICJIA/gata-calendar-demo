/* eslint-disable no-unused-vars */
require("dotenv").config();
let axios = require("axios");
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

exports.handler = async (event, context) => {
  let events = await axios.get(
    `https://www.eventbriteapi.com/v3/users/me/events/?token=${EVENTBRITE_TOKEN}&page_size=100&expand=venue`
  );

  return {
    statusCode: 200,
    body: JSON.stringify(events.data)
  };
};
