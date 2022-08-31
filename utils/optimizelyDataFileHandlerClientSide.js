export async function fetchDatafile() {
  const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
  const response = await fetch(`https://cdn.optimizely.com/datafiles/${sdkKey}.json`);
  const dataFile = await response.json();
  console.log(`Fetching datafile client-side`, sdkKey, dataFile);

  return dataFile
}