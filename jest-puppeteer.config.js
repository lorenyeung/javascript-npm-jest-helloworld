export default {
  server: {
    command: 'npx --yes http-server . -p 3000',
    port: 3000,
    launchTimeout: 60000
  },
  launch: {
    headless: true, // or false to see the browser
    slowMo: 30,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};