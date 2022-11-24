import axios from "axios";

export async function requestGraphQL(variables) {
    let hasNextPage = true;
    let endCursor;
    let resData = [];
    const token = process.env[`PAT_1`];
    const headers =
    {
      Authorization: `token ${token}`,
    };
  
    let i = 0;
    while (hasNextPage) {
      let data =
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
    
      let res = await axios({
        url: "https://api.github.com/graphql",
        method: "post",
        headers,
        data,
      });
  
      hasNextPage = res.data.data.user.repositories.pageInfo.hasNextPage;
      endCursor = res.data.data.user.repositories.pageInfo.endCursor;
  
      resData[i] = res.data;
      i++;
    }
  
    return resData;
  };


export default requestGraphQL;