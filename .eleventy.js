const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");

const tailwind = require('tailwindcss');
const postCss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

require('dotenv').config();

const postcssFilter = (cssCode, done) => {
  // we call PostCSS here.
  postCss([tailwind(require('./tailwind.config')), autoprefixer(), cssnano({ preset: 'default' })])
    .process(cssCode, {
    // path to our CSS file
    from: './src/static/css/tailwind.css'
  })
  .then(
    (r) => done(null, r.css),
    (e) => done(e, null)
  );
};

module.exports = function (eleventyConfig) {
  // Via addWatchTarget we tell Eleventy that changes to this file should trigger a rebuild
  // if we are currently running the application locally with --serve.
  // The asynchronous filter ensures that we can convert our CSS
  eleventyConfig.addWatchTarget('./src/_includes/styles/tailwind.css');
  eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Make a ISO 8601 date here for the schema data
  eleventyConfig.addFilter("iso8601", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO(
      "yyyy-MM-dd"
    );
  }); 

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Markdown rendering options
  const md = new markdownIt({
    html: true,
  });

  // Add the new markdown filter (use when components render markdown)
  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  // Convert cm to inches (rounded)
  eleventyConfig.addFilter("cmToInches", (cm) => {
    if (!cm) return null;
    return Math.round(cm / 2.54);
  });

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/admin/imageComponent.js": "./admin/imageComponent.js",
    "./src/admin/buttonComponent.js": "./admin/buttonComponent.js",
    "./src/admin/videoComponent.js": "./admin/videoComponent.js",
    "./src/site.webmanifest": "./site.webmanifest"
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/_includes/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("./src/favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("./src/favicon.svg");
  eleventyConfig.addPassthroughCopy("./src/web-app-manifest-192x192.png");
  eleventyConfig.addPassthroughCopy("./src/web-app-manifest-512x512.png");
  

  // // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  const { minify } = require("terser");
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  // Return a list of tags in a given collection
  function getTagList(collection) {
    let tagSet = new Set();
    collection.forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet];
  }  

  // Create the posts object that contains tag information
  eleventyConfig.addCollection("productTags", function (collectionAPI) {
    let PRODUCTS = collectionAPI.getFilteredByGlob("./src/products/*.md");
    let collection = {};
    collection.tags = getTagList(PRODUCTS);
    return collection;
  });

  // Filter out specific item
  eleventyConfig.addFilter('itemFilter', function(collection, title) {
    if (!Array.isArray(collection)) return collection;
    if (!title) return collection;
    const filtered = collection.filter(item => item.data.title !== title);
    return filtered;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
