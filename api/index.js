import axios from "axios";

export default async (req, res) => {
  return res.send(
    retryer
    );
};

const retryer = async (variables = { login: "yamaccu" }, retries = 0) => {
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      process.env[`PAT_1`],
      retries,
    );

    // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";

    if (isBadCredential) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    } else {
      return err.response;
    }
  }
};

const fetcher = (variables, token) => {
  return request(
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
    },
    {
      Authorization: `token ${token}`,
    },
  );
};

function request(data, headers) {
  // @ts-ignore
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
}




/*
axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });

  {
    query: `
    fragment RepoInfo on Repository {
      name
      nameWithOwner
      isPrivate
      isArchived
      isTemplate
      stargazers {
        totalCount
      }
      description
      primaryLanguage {
        color
        id
        name
      }
      forkCount
    }
    query getRepo($login: String!, $repo: String!) {
      user(login: $login) {
        repository(name: $repo) {
          ...RepoInfo
        }
      }
      organization(login: $login) {
        repository(name: $repo) {
          ...RepoInfo
        }
      }
    }
  },
  {
    Authorization: `token ${token}`,
  }
  */