const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  rl.question('Enter the Instagram post URL: ', async (postURL) => {
    await page.goto(postURL);

    rl.question('Enter the keyword you want to search for in comments: ', async (keyword) => {
      let found = false;

      while (true) {
        const commentTextElements = await page.$$(
          'span._aacl._aaco._aacu._aacx._aad7._aade'
        );

        for (const element of commentTextElements) {
          const commentText = await element.evaluate((el) => el.textContent);

          if (commentText.includes(keyword)) {
            console.log(`Comment text: ${commentText}`);
            found = true;
          }
        }

        // Scroll down to load more comments.
        const comments = await page.$('.Mr508');
        if (comments) {
          await comments.evaluate(() => {
            const comments = document.querySelector('.Mr508');
            comments.scrollTop = comments.scrollHeight;
          });
        } else {
          break;
        }

        // Wait for some time after scrolling.
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay as needed.
      }

      if (!found) {
        console.log(`The keyword "${keyword}" was not found in any comment.`);
      }

      await browser.close();
      rl.close();
    });
  });
})();
