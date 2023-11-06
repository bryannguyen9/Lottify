const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the page and get its outerHTML
  await page.goto('https://www.instagram.com/p/CzGu-IXOgZS/', { waitUntil: 'networkidle0' });
  
  const html = await page.evaluate(() => document.body.outerHTML);
  // console.log(html);

  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Use Cheerio to select and extract the text from <span> elements with specific class names
  const spansWithClass = $('span._aacl._aaco._aacu._aacx._aad7._aade');
  console.log(spansWithClass);
  spansWithClass.each((index, element) => {
    const text = $(element).text();
    console.log(text);
  });

  await browser.close();
})();


/*
(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://www.instagram.com/p/CzGu-IXOgZS/', { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);

    comments = await this.page.$$('span._aacl._aaco._aacu._aacx._aad7._aade');
    comments = comments.pop();
    comments = await comments.getProperty('innerText');
    comments = await comments.jsonValue();

    console.log(comments);

    // console.log(data);

    while (true) {
      const commentTextElements = await page.$$(
        'span._aacl._aaco._aacu._aacx._aad7._aade'
      );

      for (const element of commentTextElements) {
        const commentText = await element.evaluate((el) => el.textContent);
        console.log(commentText);

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
  } catch (err) {
    console.error(err);
  }
})();



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
          console.log(commentText);

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
*/