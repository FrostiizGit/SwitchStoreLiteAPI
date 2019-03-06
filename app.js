const fs = require('fs');
let obj;

const nintendoUrl = 'https://searching.nintendo-europe.com/';
const regionFR = 'fr/'
let sql = 'select?'



fs.readFile('./200test.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj.response.numFound);
    const doc = obj.response.docs;
    for (let i = 0; i < doc.length; i++) {
        console.log('Num: ' + i + ' ' + doc[i].title)
    }
});


// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME%20AND%20((playable_on_txt:%22HAC%22)%20AND%20(price_has_discount_b:%22true%22))%20AND%20sorting_title:*%20AND%20*:*&sort=date_from%20desc&start=0&rows=24&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)
// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME AND ((playable_on_txt:"HAC") AND (price_has_discount_b:"true")) AND sorting_title:* AND *:*&sort=date_from desc&start=24&rows=24&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)&json.wrf=nindo.net.jsonp.jsonpCallback_945386