const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  rl.question('Enter the Instagram post URL: ', async (postURL) => {
    await page.goto(postURL);

    rl.question('Enter the keyword you want to search for in comments: ', async (keyword) => {
      // Scroll through the comment section to load comments (if necessary).
      // You can use the scrolling code mentioned earlier.

      // Wait for the main container with class "_ae65" to appear.
      await page.waitForSelector('._ae65'); // Make sure this selector is correct.

      // Traverse the DOM to reach the h1 element with class "_aac1" containing the text.
      const commentText = await page.evaluate(() => {
        const commentContainer = document.querySelector('._ae65 .x9f619 ._ae1k ._ae2s div:nth-child(3) ._ae5q ul ._a9z6 .x1qjc9v5 ._a9zj ._a9zm ._a9zn ._a9zr ._a9zc ._a9zs ._aac1');
        return commentContainer ? commentContainer.textContent : null;
      });

      if (commentText) {
        if (commentText.includes(keyword)) {
          console.log(`Comment text: ${commentText}`);
        } else {
          console.log(`The comment text does not contain the keyword: ${keyword}`);
        }
      } else {
        console.log('Comment section or the target element not found on the page.');
      }

      await browser.close();
      rl.close();
    });
  });
})();
