export function fetchTopLanguages(resGraphQL, exclude_repo = []) {
  let repoNodes = [];
  for(let i = 0; i < resGraphQL.length; i++)
  {
    repoNodes = [...repoNodes, ...resGraphQL[i].data.user.repositories.nodes];
  }  
  let repoToHide = {};

  if (exclude_repo) {
    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });
  }

  repoNodes = repoNodes
    .sort((a, b) => b.size - a.size)
    .filter((name) => !repoToHide[name.name]);

  repoNodes = repoNodes
    .filter((node) => node.languages.edges.length > 0)
    .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
    .reduce((acc, prev) => {
      let langSize = prev.size;

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
};


export default fetchTopLanguages;