require("dotenv").config();
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const algoliasearch = require("algoliasearch");

const client = algoliasearch(process.env.ALGOLIA_APP, process.env.ALGOLIA_SEARCH_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "search", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
  });

  eleventyConfig.addFilter("getResults", function (query) {
    return index.search(query, {
      attributesToRetrieve: ["allProviders.name", "allProviders.category", "allProviders.description"],

    }).then(res => {
      return res.hits;
    })
  });

    return {
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dir: {
        input: "src",
        output: "_site",
        layouts: "layouts",
        includes: "components",
        data: "data",
      }
    }
  };