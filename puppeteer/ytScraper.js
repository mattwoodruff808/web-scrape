const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://www.youtube.com/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let videos = await page.evaluate(() => {
        let pageContent = document.querySelectorAll('div#content.style-scope.ytd-rich-item-renderer');
        let videoList = [];

        for (let i = 0; i < pageContent.length; i++){
            let video = {
                title: pageContent[i].querySelector('a#video-title-link yt-formatted-string').innerText,
                author: pageContent[i].querySelector('a.yt-simple-endpoint.style-scope.yt-formatted-string').innerText,
                viewCount: pageContent[i].querySelector('span.style-scope.ytd-video-meta-block').innerText
            }

            videoList.push(video);
        }

        return videoList;
    })

    console.log(videos);
    console.log(videos.length);

    await browser.close();
})();