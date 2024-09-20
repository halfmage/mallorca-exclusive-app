module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.js': './js/alpine.js'})
  eleventyConfig.addPassthroughCopy({'./node_modules/fslightbox/index.js': './js/fslightbox.js'})

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