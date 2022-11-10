import axios from "axios";

export default async (req, res) => {

  const accessToken = 'PAT_1'

  return res.send(

    axios({
      url: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
      method: 'POST',
      data: {
        query: `query { 
             repository(owner: "vuejs", name: "vue") { 
              name,
              description,
              license
            }
          }`
      }
    })



  );
};


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