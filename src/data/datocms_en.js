#!/usr/bin/env node

require("dotenv").config();
const { promisify } = require("util");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

/**
 * Fetches data from DatoCMS and makes it available to Eleventy templates.
 * To reduce processing time, data is cached to a file and only fetched if
 * the cache file doesn't exist
 */
async function Cms() {  // No need to `module.exports` if you plan to run it in this file
  const token = process.env.DATO_API_TOKEN;
  const cachePath = path.join(__dirname, "datocms_data_en.json");
  const cache = await getCache(cachePath);

  if (cache) {
    console.log(">> Using cached data");
    return cache;
  } else {
    console.log(">> Fetching data from DatoCMS");
    const data = await fetchData(token);
    await writeFile(cachePath, JSON.stringify(data, null, 2));
    return data;
  }
};

async function fetchData(token) {
  const query = await readFile(path.join(__dirname, "query_en.graphql"));
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: query.toString(),
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Aborting: DatoCMS request failed with " + res.status);
    }
  });

  if (response.errors) {
    for (let error of response.errors) {
      console.error(error.message);
    }
    throw new Error("Aborting: DatoCMS errors");
  } else {
    return response.data;
  }
}

async function getCache(cachePath) {
  try {
    const cache = await readFile(cachePath);
    return JSON.parse(cache);
  } catch (err) {
    // If this fails, that means there is no cache. Return `undefined` to
    // fetch from the network
  }
}

// Only run the Cms function if this script is executed directly
if (require.main === module) {
  Cms().then(() => {
    console.log(">> DatoCMS data fetching complete");
  }).catch(err => {
    console.error(">> Error fetching DatoCMS data:", err);
  });
}

module.exports = Cms; // Export Cms if needed in another file
