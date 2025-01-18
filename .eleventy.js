module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('src/images')
  eleventyConfig.addPassthroughCopy('src/favicon.png')
  eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.js': './js/alpine.js'})
  eleventyConfig.addPassthroughCopy({'./node_modules/fslightbox/index.js': './js/fslightbox.js'})

  // PassthroughCopy for data
  eleventyConfig.addPassthroughCopy({'src/data/datocms_data_en.json': './datocms_data_en.json'})
  eleventyConfig.addPassthroughCopy({'src/data/datocms_data_de.json': './datocms_data_de.json'})
  eleventyConfig.addPassthroughCopy({'src/data/datocms_data_es.json': './datocms_data_es.json'})

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