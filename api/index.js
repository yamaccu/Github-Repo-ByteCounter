import * as dotenv from "dotenv";
import { renderTopLanguages } from "../src/cards/top-languages-card.js";
import {
  parseArray,
  parseBoolean,
  renderError,
} from "../src/common/utils.js";
import {
  logger,
  MissingParamError,
} from "../src/common/utils.js";
import axios from "axios";

dotenv.config();

export default async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    card_width,
    title_color,
    text_color,
    bg_color,
    theme,
    layout,
    langs_count,
    exclude_repo,
    custom_title,
    locale,
    border_radius,
    border_color,
  } = req.query;
  //res.setHeader("Content-Type", "image/svg+xml");
  //res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Type", "text/html");

  try {
    const topLangs = await fetchTopLanguages(
      username,
      parseArray(exclude_repo),
    );

    res.setHeader("Cache-Control", `public, max-age=86400`);

    return res.send(`
    <p>${Object.keys(topLangs)[0]}<p/>
    <p>${Object.keys(topLangs)[1]}<p/>
    <p>${Object.keys(topLangs)[2]}<p/>
    <p>${Object.keys(topLangs)[3]}<p/>
    <p>${Object.keys(topLangs)[4]}<p/>
    `);


    /*
    return res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none" role="img"
    aria-labelledby="descId">
    <title id="titleId">yamaccu's GitHub Stats, Rank: A+</title>
    <desc id="descId">Total Stars Earned: 2, Total Commits in 2022 : 2, Total PRs: 0, Total Issues: 2, Contributed to: 0
    </desc>
    <style>
        .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #2f80ed;
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
    <svg x="25" width="445">
        <g transform="translate(0, 60)">
            <text x="2" y="-5" class="lang-name">1</text>
            <rect height="14" fill="#e34c26" x="0" y="0" data-testid="lang-progress" width="100%" />
        </g>
        <g transform="translate(0, 95)">
            <text x="2" y="-5" class="lang-name">2</text>
            <rect height="14" fill="#e34c26" x="0" y="0" data-testid="lang-progress" width="80%" />
        </g>
        <g transform="translate(0, 130)">
            <text x="2" y="-5" class="lang-name">3</text>
            <rect height="14" fill="#e34c26" x="0" y="0" data-testid="lang-progress" width="40%" />
        </g>
        <g transform="translate(0, 165)">
            <text x="2" y="-5" class="lang-name">${topLangs.CSS.size}</text>
            <rect height="14" fill="#e34c26" x="0" y="0" data-testid="lang-progress" width="5%" />
        </g>
    </svg>
</svg>
     `
    );
    /*
      renderTopLanguages(topLangs, {
        custom_title,
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        card_width: parseInt(card_width, 10),
        hide: parseArray(hide),
        title_color,
        text_color,
        bg_color,
        theme,
        layout,
        langs_count,
        border_radius,
        border_color,
        locale: locale ? locale.toLowerCase() : null,
      }),
    )
    */
  } catch (err) {
    res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`); // Don't cache error responses.
    return res.send(renderError(err.message, err.secondaryMessage));
  }
};

async function fetchTopLanguages(username, exclude_repo = []) {
  if (!username) throw new MissingParamError(["username"]);

  const res = await requestGraphQL({ login: username });

  let repoNodes = res.data.data.user.repositories.nodes;
  let repoToHide = {};

  // populate repoToHide map for quick lookup
  // while filtering out
  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  // filter out repositories to be hidden
  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);

  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    // flatten the list of language nodes
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      // get the size of the language (bytes)
      let langSize = prev.size;

      // if we already have the language in the accumulator
      // & the current language name is same as previous name
      // add the size to the language size.
      if (acc[prev.node.name] && prev.node.name === acc[prev.node.name].name) {
        langSize = prev.size + acc[prev.node.name].size;
      }
      return {
        ...acc,
        [prev.node.name]: {
          name: prev.node.name,
          color: prev.node.color,
          size: langSize,
        },
      };
    }, {});

  const topLangs = Object.keys(repoNodes)
    .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
    .reduce((result, key) => {
      result[key] = repoNodes[key];
      return result;
    }, {});

  return topLangs;
}

const requestGraphQL = async (variables) => {
  const token = process.env[`PAT_1`];
  const data =
  {
    query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
    variables,
  };
  const headers =
  {
    Authorization: `token ${token}`,
  };

  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};
