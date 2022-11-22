import axios from "axios";

const resGraphQL = await requestGraphQL({ login: "karaage0703" });
//console.log(resGraphQL);

const topLangs = await fetchTopLanguages(resGraphQL);
console.log(topLangs);

async function requestGraphQL(variables, endCursor, previousData = []){
  const token = `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`;
  const data =
  {
    query: `
      query userInfo($login: String!) {
        user(login: $login) {
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100, ${endCursor ? `after: "${endCursor}"` : ''}) {
            pageInfo{
              hasNextPage
              endCursor
            }
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
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

  let resData = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });

  const hasNextPage = resData.data.data.user.repositories.pageInfo.hasNextPage;
  endCursor = resData.data.data.user.repositories.pageInfo.endCursor;
  resData = [...previousData, ...resData.data.data.user.repositories.nodes]

  if(!hasNextPage)
  {
    console.log(resData);
    return resData;
  }


  return requestGraphQL(variables, endCursor, resData);
  //return resData;
};


async function fetchTopLanguages(repoNodes, exclude_repo = []) {
  let repoToHide = {};

  //console.log(repoNodes);

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
