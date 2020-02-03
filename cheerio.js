let html = `<TABLE BORDER=0 WIDTH='100%'><TR><TD><table><tr><td>Funding Opportunity ID: </td><td>323730</td></tr><tr><td>Opportunity Number: </td><td>SFOP0006368</td></tr><tr><td>Opportunity Title:</td><td>20.PMWRA.CambodiaUXOclearance.NOFO</td></tr><tr><td>Opportunity Category:</td><td>Discretionary</td></tr><tr><td>Opportunity Category Explanation:</td><td></td></tr><tr><td valign='top'>Funding Instrument Type: </td><td>Grant</td></tr><tr><td valign='top'>Category of Funding Activity: </td><td>Other (see text field entitled "Explanation of Other Category of Funding Activity" for clarification)</td></tr><tr><td valign='top'>Category Explanation: </td><td>Conventional Weapons Destruction (CWD)</td></tr><tr><td valign='top'>CFDA Number(s): </td><td>19.800</td></tr><tr><td valign='top'>Eligible Applicants:</td><td>Nonprofits having a 501(c)(3) status with the IRS, other than institutions of higher education</td></tr><tr><td valign='top'>Additional Information on Eligibility:</td><td>Domestic NGOs, Foreign NGOs, Foreign Public Entities (FPE)</td></tr><tr><td valign='top'>Agency Code:</td><td>DOS-PMWRA</td></tr><tr><td valign='top'>Agency Name:</td><td>Department of State<br>PM Weapons Removal and Abatement</td></tr><tr><td>Posted Date:</td><td>Jan 16, 2020</td></tr><tr><td>Close Date:</td><td>Mar 20, 2020 </td></tr><tr><td>Last Updated Date:</td><td>Jan 16, 2020</td></tr><tr><td>Award Ceiling:</td><td>$5,000,000</td></tr><tr><td>Award Floor:</td><td>$0</td></tr><tr><td>Estimated Total Program Funding:</td><td>$5,000,000</td></tr><tr><td>Expected Number of Awards:</td><td>1</td></tr><tr><td>Description:</td><td>The U.S. Department of State, Bureau of Political-Military Affairs, Office of Weapons Removal and Abatement (PM/WRA) is pleased to invite eligible organizations to submit applications for grants to conduct humanitarian demining and explosive ordnance disposal in Cambodia during fiscal year 2020. Specific goals, objectives, and technical requirements for application packages are detailed below. PM/WRA anticipates awarding a total of $5,000,000 across multiple awards under this grant opportunity.</td></tr><tr><td>Version:</td><td>1</td></tr></table></TD></TR></TABLE>`;

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
const $ = cheerio.load(html);
cheerioTableparser($);
const data = $("table").parsetable(false, false, true);

let json = [];
let obj = {};
for (let x = 1; x < data[0].length; x++) {
  obj[slugify(data[0][x])] = data[1][x];
}
json.push(obj);

console.log(json);
