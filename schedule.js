/* eslint-disable no-unused-vars */
let schedule = require("node-schedule");
let Parser = require("rss-parser");
let parser = new Parser();
const jsonfile = require("jsonfile");

let getFeed = async () => {
  let feed = await parser.parseURL(
    "https://www.grants.gov/rss/GG_NewOppByCategory.xml"
  );
  return feed;
};

schedule.scheduleJob("*/1 * * * *", async () => {
  try {
    let res = await getFeed();
    
    jsonfile.writeFileSync("./public/api/grants-dot-gov.json", res);
    console.log("file written");
  } catch (e) {
    console.log(e);
  }
});
