import * as dotenv from "dotenv";
import requestGraphQL from "../src/requestGraphQL.js";
import fetchTopLanguages from "../src/fetchTopLanguages.js";

dotenv.config();

export default async (req, res) => {
  const {
    username,
    exclude,
  } = req.query;

  try {
    if (!username) throw new Error (`username not found`);

    const resGraphQL = await requestGraphQL({ login: username });
    const topLangs = fetchTopLanguages(
      resGraphQL,
      parseArray(exclude),
    );

    let rankColor = [];
    let graphLength = [];
    for(let i = 0; i < 4; i++)
    {
      rankColor[i] = calculateColor(topLangs[Object.keys(topLangs)[i]].size);
      graphLength[i] = 100 / topLangs[Object.keys(topLangs)[0]].size * topLangs[Object.keys(topLangs)[i]].size;
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=86400`);

    return res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none" role="img"
    aria-labelledby="descId">
    <title id="titleId">bytes Programmed</title>
    <desc id="descId">bytes Programmed</desc>
    <style>
        .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #dc143c
        }
        .lang-name {
            font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #434d58
        }
        .lang-bytes {
            font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #000000
        }
    </style>
    <rect x="0.5" y="0.5" rx="4.5" height="99%" stroke="#e4e2e2" width="494" fill="#fffefe" />
    <g transform="translate(20, 30)">
        <text class="header">Bytes Programmed</text>
    </g>
    <svg x="25" width="445">
        <g transform="translate(0, 60)">
            <text x="2" y="-5" class="lang-name">${Object.keys(topLangs)[0]}</text>
            <text x="${Object.keys(topLangs)[0].length <= 10 ? 75 : 120}" y="-5" class="lang-name">${topLangs[Object.keys(topLangs)[0]].size.toLocaleString()} bytes</text>
            <rect height="14" fill="${rankColor[0]}" x="0" y="0" data-testid="lang-progress" width="${graphLength[0]}%" />
        </g>
        <g transform="translate(0, 95)">
            <text x="2" y="-5" class="lang-name">${Object.keys(topLangs)[1]}</text>
            <text x="${Object.keys(topLangs)[1].length <= 10 ? 75 : 120}" y="-5" class="lang-name">${topLangs[Object.keys(topLangs)[1]].size.toLocaleString()} bytes</text>
            <rect height="14" fill="${rankColor[1]}" x="0" y="0" data-testid="lang-progress" width="${graphLength[1]}%" />
        </g>
        <g transform="translate(0, 130)">
            <text x="2" y="-5" class="lang-name">${Object.keys(topLangs)[2]}</text>
            <text x="${Object.keys(topLangs)[2].length <= 10 ? 75 : 120}" y="-5" class="lang-name">${topLangs[Object.keys(topLangs)[2]].size.toLocaleString()} bytes</text>
            <rect height="14" fill="${rankColor[2]}" x="0" y="0" data-testid="lang-progress" width="${graphLength[2]}%" />
        </g>
        <g transform="translate(0, 165)">
            <text x="2" y="-5" class="lang-name">${Object.keys(topLangs)[3]}</text>
            <text x="${Object.keys(topLangs)[3].length <= 10 ? 75 : 120}" y="-5" class="lang-name">${topLangs[Object.keys(topLangs)[3]].size.toLocaleString()} bytes</text>
            <rect height="14" fill="${rankColor[3]}" x="0" y="0" data-testid="lang-progress" width="${graphLength[3]}%" />
        </g>
    </svg>
</svg>
     `
    );
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    res.setHeader("Content-Type", "text/html");
    return res.send(
    `
    <p>${err}</p>
    `
    )
  }
};

function calculateColor(size){
  //#00ccff -> #0000ff / #ccff00 -> #00ff00 / #ffcc00 -> #ff0000
  let r;
  let g;
  let b;
  if(size < 100000)
  {
    g = 204 + Math.round(-204*size/100000);
    return `#00` + g.toString(16).padStart(2,'0') + `ff`;
  } 
  if(size < 1000000)
  {
    r = 204 + Math.round(-204*size/1000000);
    return `#` + r.toString(16).padStart(2,'0') + `ff00`;
  } 
  if(size < 10000000)
  {
    g = 204 + Math.round(-204*size/10000000);
    return `#ff` + g.toString(16).padStart(2,'0') + `00`;
  } 
  return '#ff0000'
};

function parseArray(str) {
  if (!str) return [];
  return str.split(`,`);
};