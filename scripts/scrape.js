// REQUIRED PACKAGES
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com/", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];
        $("headlines.basic").each(function(i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s_)/gm, " "). trim();
                var sumNeat = sumreplace(/(\r\n|\n|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;