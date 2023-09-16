const BROWSER_DATA_FIELDS: string[] = [
  'language',
  'appCodeName',
  'appName',
  'appVersion',
  'buildID',
  'cookieEnabled',
  'doNotTrack',
  'oscpu',
  'platform',
  'userAgent',
  'webdriver',
  'product',
  'hardwareConcurrency',
];

export async function doMagic() {
  const browserData: Record<string, any> = {};
  for (const key of BROWSER_DATA_FIELDS) {
    browserData[key] = navigator[key as keyof typeof navigator];
  }
  await fetch(import.meta.env.VITE_SERVER_URL + '/records', {
    method: 'POST',
    body: JSON.stringify({ browserData }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
