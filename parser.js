var FeedParser = require("feedparser");
var feedparser = new FeedParser();
var request = require("request");
var htmlToText = require('html-to-text');

var url = "http://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=10";
var count = 1;

request(url).pipe(feedparser);
feedparser.on("error", function(error){
  msg.channel.sendMessage("failed reading feed: " + error);
});
var shown = 0;
feedparser.on("readable",function() {
  var stream = this;
  shown += 1;
  if(shown > count){
      return;
  }
  var item = stream.read();
msg.channel.sendMessage(item.title + " - " + item.link, function() {
      if(full == true){
          var text = htmlToText.fromString(item.description,{
              wordwrap:false,
              ignoreHref:true
          });
          msg.channel.sendMessage("hello word", {split:true});
          console.log(text);
      }
  });
  stream.alreadyRead = true;
});
