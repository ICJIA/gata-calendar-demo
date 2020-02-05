/* eslint-disable no-unused-vars */
require("dotenv").config();
let axios = require("axios");
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

exports.handler = async (event, context) => {
  let events = await axios.get(
    `https://www.eventbriteapi.com/v3/users/me/events/?token=${EVENTBRITE_TOKEN}&status=live&time_filter=current_future&page_size=100&expand=venue,format,ticket_classes&order_by=start_asc`
  );

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(events.data)
  };
};
