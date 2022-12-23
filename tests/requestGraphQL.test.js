import requestGraphQL from "../src/requestGraphQL.js";
import axios from 'axios';

const test_data = {
  status: 200,
  statusText: "OK",
  data: {
    data: {
      user: {
        repositories: {
          pageInfo: {
            hasNextPage: false,
            endCursor: "endCuresor"
          },
          nodes: [
            {
              name: "test-repo-1",
              languages: {
                edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
              },
            },
            {
              name: "test-repo-2",
              languages: {
                edges: [{ size: 200, node: { color: "#0f0", name: "HTML" } }],
              },
            }
          ],
        },
      },
    },
  }
};

const test_data2 = [{
  data: {
    user: {
      repositories: {
        pageInfo: {
          hasNextPage: false,
          endCursor: "endCuresor"
        },
        nodes: [
          {
            name: "test-repo-1",
            languages: {
              edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
            },
          },
          {
            name: "test-repo-2",
            languages: {
              edges: [{ size: 200, node: { color: "#0f0", name: "HTML" } }],
            },
          }
        ],
      },
    },
  },
}];

jest.mock("axios");
axios.mockImplementation(() => test_data);

test("requestGraphQL", async () => {
  const data = await requestGraphQL({ login: "" });
  expect(data).toStrictEqual(test_data2);
});






/*



jest.mock('axios');


test('requestGraphQL', () => {
  //console.log(test_data);
  axios.post.mockResolvedValue(test_data);

  expect(requestGraphQL({ login: "yamaccu" })).toStrictEqual({
    data: {
      user: {
        repositories: {
          pageInfo: {
            hasNextPage: false,
            endCursor: "endCuresor"
          },
          nodes: [
            {
              name: "test-repo-1",
              languages: {
                edges: [{ size: 100, node: { color: "#0f0", name: "HTML" } }],
              },
            },
            {
              name: "test-repo-2",
              languages: {
                edges: [{ size: 200, node: { color: "#0f0", name: "HTML" } }],
              },
            }
          ],
        },
      },
    },
  })
});
*/