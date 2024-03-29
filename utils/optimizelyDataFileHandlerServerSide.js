const fs = require('fs');
const fetch = require('node-fetch');

const DATAFILE_DIR = './lib/optimizely'

async function fetchAndSaveDatafile() {
  const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
  console.log(`Fetching datafile server-side for SDK Key: ${sdkKey}`);

  const response = await fetch(`https://cdn.optimizely.com/datafiles/${sdkKey}.json`);
  const responseJson = await response.text();

  if (!fs.existsSync(DATAFILE_DIR)){
      fs.mkdirSync(DATAFILE_DIR, { recursive: true });
  }

  fs.writeFileSync(`${DATAFILE_DIR}/datafile.json`, responseJson);

  console.log(`Optimizely Datafile fetched successfully`);
}

function withOptimizely(nextConfig = {}) {
  return {
    ... nextConfig,
    // Not actually overwriting rewrites. Just using the async function to fetch optimizely datafile.
    rewrites: async () => {
      await fetchAndSaveDatafile()
      return nextConfig.rewrites ? nextConfig.rewrites() : {}
    },
  }
}

module.exports = withOptimizely;