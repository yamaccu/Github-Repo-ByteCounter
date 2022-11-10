import axios from "axios";

export default async (req, res) => {

    return res.send(
        axios({
            url: "https://api.github.com/graphql",
            method: "post",
            data: {
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
                }
                `,
                Authorization: `bearer PAT_1`
            }
        })
    );
};