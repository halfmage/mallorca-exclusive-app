module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.js': './js/alpine.js'})
    
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