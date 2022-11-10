import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const token = process.env[`PAT_1`];

export default async (req, res) => {

    return res.send(
        axios({
            url: "https://api.github.com/graphql",
            method: "post",
            query: `
                query{
                    user(login:"yamaccu") {
                        repositories(first:100 ,isFork:false){
                            nodes{
                                name
                                languages(first:10) {
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
            `
            ,
            Authorization: `token ${token}`,
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