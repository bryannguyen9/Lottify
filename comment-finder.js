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
      await page.waitForSelector('.comment-element-selector', { timeout: 10000 });

      const comments = await page.evaluate((keyword) => {
        const commentElements = document.querySelectorAll('.comment-element-selector');
        const filteredComments = Array.from(commentElements).filter(comment => comment.textContent.includes(keyword));
        
        return filteredComments.map(comment => {
          const commenter = comment.closest('.commenter-selector').querySelector('.commenter-name-selector').textContent;
          return {
            commenter,
            commentText: comment.textContent
          };
        });
      }, keyword);

      if (comments.length === 0) {
        console.log('No comments containing the specified keyword found.');
      } else {
        console.log('Comments containing the specified keyword:');
        console.log(comments);
      }

      await browser.close();
      rl.close();
    });
  });
})();
