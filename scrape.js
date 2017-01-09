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

Promise.mapSeries([...Array(41)], (e,i) => {
    let url = baseUrl + i;
    
    console.log('⏰', new Date(Date.now()).toLocaleString())
    console.log('🌐', url)
    
    request(url, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);
        let images = [];
        
        $('td>div>a>img').each((i, el) => {
          let uri = $(el).attr('src');
          let filename = $(el).attr('alt') +'.jpg';
          
          download(uri, filename, () => console.log('✅'));
        })
      }
    })
  
    return Promise.delay(2000);
});
