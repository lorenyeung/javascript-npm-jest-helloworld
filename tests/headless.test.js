// These end-to-end tests use puppeteer and headless Chrome using the default jest-environment configuration.

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function check_truthy(page, js_expression_str) {
  const is_truthy = await page.evaluate(`!!(${js_expression_str})`);
  if (is_truthy) {
    console.log("truthy: " + js_expression_str);
  } else {
    console.log("FALSY: " + js_expression_str);
  }
}

describe("headless browser tests", () => {
  it("gets the browser version", async () => {
    const version = await browser.version();
    console.log("browser version: " + version);
    expect(version).toBeTruthy();
  });

  it("gets a page object", async () => {
    const page = await browser.newPage();
    console.log("page: " + page);
    expect(page).toBeTruthy();
  });

  // it("runs the debugger", async () => {
  //   await jestPuppeteer.debug();
  // });

  it("gets a page title", async () => {
    const page = await browser.newPage();
    const url = "http://127.0.0.1:3000/html/index.html";
    await page.goto(url);
    const title = await page.title();
    console.log("page title is: " + title);
    expect(title).toBe("Test page");
  });

  it(
    "calls the test function",
    async () => {
      const page = await browser.newPage();
      const url = "http://127.0.0.1:3000/html/index.html";
      await page.goto(url, { waitUntil: "networkidle2" });

      // Wait for jQuery to become available
      await page.waitForFunction(() => !!window.jQuery);

      const content = await page.evaluate(() => window.test_function());
      const expected_content = "hi there!";
      expect(content).toBe(expected_content);
    },
    120000 // timeout: 2 minutes
  );

  it(
    "sets the html using the plugin",
    async () => {
      const page = await browser.newPage();
      const url = "http://127.0.0.1:3000/html/index.html";
      await page.goto(url, { waitUntil: "networkidle2" });

      await page.waitForFunction(() => !!window.jQuery);
      await page.waitForFunction(() => !!window.jQuery.ready_for_tests);

      const content = await page.evaluate(() =>
        window.jQuery("#target").text()
      );
      const expected_content = "plugin is working";
      expect(content).toBe(expected_content);
    },
    120000 // timeout: 2 minutes
  );
});
