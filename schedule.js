/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
let schedule = require("node-schedule");
let Parser = require("rss-parser");
let parser = new Parser();
const jsonfile = require("jsonfile");

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

let getFeed = async () => {
  let feed = await parser.parseURL(
    "https://www.grants.gov/rss/GG_NewOppByCategory.xml"
  );
  return feed;
};

// schedule.scheduleJob("*/1 * * * *", async () => {
//   try {
//     let res = await getFeed();
//     let updatedRes = res.items.map(item => {
//       item.html = item["content:encoded"];
//       delete item["content:encoded"];
//       return item;
//     });

//     jsonfile.writeFileSync("./public/api/grants-dot-gov.json", updatedRes);
//     console.log("file written");
//   } catch (e) {
//     console.log(e);
//   }
// });

let init = async function() {
  try {
    let res = await getFeed();
    let updatedRes = res.items.map(item => {
      const $ = cheerio.load(item["content:encoded"]);
      cheerioTableparser($);
      const data = $("table").parsetable(false, false, true);
      let json = [];
      let obj = {};
      for (let x = 1; x < data[0].length; x++) {
        obj[slugify(data[0][x])] = data[1][x];
      }
      json.push(obj);
      item.details = json;
      delete item["content:encoded"];

      return item;
    });

    jsonfile.writeFileSync("./public/api/grants-dot-gov.json", updatedRes);
    console.log("file written");
  } catch (e) {
    console.log(e);
  }
};

init();
