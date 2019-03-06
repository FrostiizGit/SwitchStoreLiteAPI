const fs = require("fs");
let obj;

const nintendoUrl = "https://searching.nintendo-europe.com/";
const regionFR = "fr/";
let sql = "select?";

function createRequest(gameName, category, platform, promo, sorting, startNum, rowNum) {
    // Name of the game
    let name = "*";
    // Category: GAME or NEWS
    let cat = "GAME";
    // Category options: switch -> HAC promo -> discount true
    let p = "HAC";
    let opts = 'AND (playable_on_txt:"' + p + '")';
    // Sort
    let sort = "&sort=score desc";
    // Start 0 for beginning
    let start = "&start=0";
    // 24 Rows by default, as a placeholder we'll use 200 to fetch all games
    let rows = "&rows=200";

    if (gameName != null) {
        name = gameName;
    }
    if (category != null) {
        cat = category;
    }
    if (platform != null) {
        p = platform;
    }
    if (promo == true) {
        console.log('ded')
        opts = 'AND ((playable_on_txt:"' + platform + '") AND (price_has_discount_b:"true"))';
    }
    if (sorting != null) {
        sort = "&sort=" + sorting;
    }
    if (startNum != null) {
        start = "&start=" + startNum;
    }
    if (rowNum != null) {
        rows = "&rows=" + rowNum
    }

    let fullRequest = nintendoUrl + regionFR + "select?q=" + name + "&fq=type:" +
        cat + " " + opts + " AND sorting_title:* AND *:*" + sort + start +
        rows + "&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)";

    return fullRequest;
}

console.log(
    createRequest(null, "GAME", "HAC", true, "score desc", "0", "24")
);

/*fs.readFile('./200test.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj.response.numFound);
    const doc = obj.response.docs;
    for (let i = 0; i < doc.length; i++) {
        console.log('Num: ' + i + ' ' + doc[i].title)
    }
});*/

// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME AND sorting_title:* AND *:*&sort=score desc, date_from desc&start=0&rows=24&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)&json.wrf=nindo.net.jsonp.jsonpCallback_2083
// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME%20AND%20((playable_on_txt:%22HAC%22)%20AND%20(price_has_discount_b:%22true%22))%20AND%20sorting_title:*%20AND%20*:*&sort=date_from%20desc&start=0&rows=24&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)
// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME AND ((playable_on_txt:"HAC") AND (price_has_discount_b:"true")) AND sorting_title:* AND *:*&sort=date_from desc&start=24&rows=24&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)&json.wrf=nindo.net.jsonp.jsonpCallback_945386
// https://searching.nintendo-europe.com/fr/select?q=*&fq=type:GAME AND ((playable_on_txt:"HAC") AND (price_has_discount_b:"true")) AND sorting_title:* AND *:*&sort=score desc&start=0&rows=200&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)
// https://searching.nintendo-europe.com/fr/select?q=Fire em&fq=type:GAME AND ((playable_on_txt:"HAC") AND (price_has_discount_b:"true")) AND sorting_title:* AND *:*&sort=score desc&start=0&rows=200&wt=json&bf=linear(ms(priority,NOW/HOUR),1.1e-11,0)