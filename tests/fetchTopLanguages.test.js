import fetchTopLanguages from "../src/fetchTopLanguages.js";

const test_data = [{
  data: {
    user: {
      repositories: {
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
          },
          {
            name: "test-repo-3",
            languages: {
              edges: [
                { size: 300, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
          {
            name: "test-repo-4",
            languages: {
              edges: [
                { size: 400, node: { color: "#0ff", name: "javascript" } },
              ],
            },
          },
        ],
      },
    },
  },
}];


test('fetchTopLanguages', () => {

  expect(fetchTopLanguages(test_data)).toStrictEqual({
      HTML: {
        color: "#0f0",
        name: "HTML",
        size: 300,
      },
      javascript: {
        color: "#0ff",
        name: "javascript",
        size: 700,
      },
    });
});

