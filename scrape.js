const fs = require('fs');
const timer = require('timers');
const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');

const baseUrl = 'https://www.lanternpress.com/catalog/view/612?page='

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

for (let i=1; i<=41; i++) {
  let url = baseUrl + i;
  
  timer.setTimeout(() => {
    console.log(url)
    console.log('⏰', Date.now())
  }, 1000);
  // request(url, (error, response, html) => {
  //   if (!error) {
  //     const $ = cheerio.load(html);
  //     let images = [];
  //     
  //     $('td>div>a>img').each((i, el) => {
  //       let uri = $(el).attr('src');
  //       let filename = $(el).attr('alt') +'.jpg';
  //       
  //       download(uri, filename, () => console.log('✅'));
  //     })
  //   }
  // })
  
}
