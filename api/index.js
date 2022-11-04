export default function handler(req, res) {
  const { name = 'World' } = req.query;
  //    return res.send(`Hello ${name}!`);

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
              <text x="2" y="-5" class="lang-name">4</text>
              <rect height="14" fill="#e34c26" x="0" y="0" data-testid="lang-progress" width="5%" />
          </g>
      </svg>
  </svg>
       `);
}