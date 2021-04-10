const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://trekmovie.com/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let posts = await page.evaluate(() => {
        let frontPosts = document.querySelectorAll('article.post');
        let postList = [];

        for (let i = 0; i < frontPosts.length; i++){
            let blurbElement = frontPosts[i].querySelector('div.content-list-excerpt');
            let post = {
                title: frontPosts[i].querySelector('h3').innerText,
                date: frontPosts[i].querySelector('span.entry-meta-date').innerText.replace('|', ''),
                author: frontPosts[i].querySelector('span.author a').innerText,
                blurb: blurbElement ? blurbElement.innerText : 'Please refer to Article Title'
            }
            postList.push(post);
        }

        return postList;
    })

    console.log(posts);

    await browser.close();
})();