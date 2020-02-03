/* eslint-disable no-unused-vars */
// const axios = require("axios");
// var parser = require("rssparser2");

// let res = parser.parseURL("https://learnstartup.net/feed/", {});

let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  let feed = await parser.parseURL("https://learnstartup.net/feed/");
  console.log(JSON.stringify(feed));
})();
