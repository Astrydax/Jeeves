const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const moment = require("moment");
//var chalk = require("chalk");
const bot = new Discord.Client();

var rssChannel;


bot.login(config.token);

var users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
var rss = JSON.parse(fs.readFileSync("./rss.json", "utf8"));


bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}!`);
  rssChannel = bot.channels.get(config.rssChannelID);
  //console.log(rssChannel);
//  console.log(config.rssChannelID);

  //checkForRSS();
  //setInterval(checkForRSS, 60*1000);


  console.log("test has been called");
  var text = "these are the patchnotes to the lastest article on mmo-champion here is a super awseome image [http://media.mmo-champion.com/images/news/2017/january/thumb/PitofSaronDK.jpg] and here is another super awesome image [http://media.mmo-champion.com/images/news/2017/january/thumb/PitofSaronDK.jpg] now lets talk about things that are things because they are things.";
  var i = 0;

  text ="abc[defghijklmnop";
  console.log("true == false: ")
  console.log(true == false);
  console.log("text.charAt(3) == [ : ");
  console.log(text.charAt(3) == "[");





});


bot.on("voiceStateUpdate", (oldMember, member) => {
  let botRole = member.guild.roles.find("nane","bot");
  if(member.roles.has(botRole)) return;

  // console.log(`${member.user.username}  id: ${member.id} has trigged voicestateupdate.`);
  // let newbData = users[member.id];
  // if(!newbData || newbData.welcomed == false){
  // //  do the orientation
  // //  move to private channel
  //   member.setVoiceChannel("270109306668580865");
  //  play audio file

  //  mark orientation true in DB


});






bot.on("message", message => {
  if(message.author.bot) return;

  let userData = users[message.author.id];
  if(!userData){
    userData = {name: message.author.username, points: 0, level: 0};
    // var result={};
    // // for(var key in userData) result[key]=userData[key];
    // // for(key in config.userINIT) result[key]=config.userINIT[key];
    // userData = result;
    users[message.author.id] = userData;
  }
  userData.points++;
  fs.writeFile("./users.json", JSON.stringify(users), (err) => {if(err) console.error(err);});

  if(!message.content.startsWith(config.prefix)) return;
  const params = message.content.split(" ").slice(1);

  //************************COMMANDS START HERE************************
  if(message.content.startsWith(config.prefix + "wownews")){
    var count = 1;
    var url = "http://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=10";
    if(parseInt(params[0]) != null && parseInt(params[0]) != "" && !isNaN(parseInt(params[0]))){
      count = parseInt(params[0]);
    }
    rssfeed(url,count);
  }


  if(message.content.startsWith(config.prefix + "spoiler")){
    message.channel.sendMessage("LEAKED PATCH 7.2 TOMB OF SARGARAS ENDING \n https://www.youtube.com/watch?v=NOudUXxWPSs");
  }

  if(message.content.startsWith(config.prefix + "test")){



    //var lastWhiteSpace = 0;
    // while (i < text.length) {
    //   while (i < text.length && i < 2000 - 1) {
    //
    //
    //   }
    //
    // }
  }

  if(message.content.startsWith(config.prefix + "website") || message.content.startsWith(config.prefix + "site")){
    message.channel.sendMessage("Official Guild Website:  http://hardknox.enjin.com/");
  }


  if (message.content.startsWith(config.prefix + "statvid") || message.content.startsWith(config.prefix + "pawnvid")) {
    message.channel.sendMessage("Here ya go! https://www.youtube.com/watch?v=XmtgInKDCos");
  }
  if (message.content.startsWith(config.prefix + "stats") || message.content.startsWith(config.prefix + "pawn")) {
       //bot.setPlayingGame("Drinking Cola", callback);
    message.channel.sendMessage("You should simulate your character. First install these programs and addons: \nSimulationcraft application: http://www.simulationcraft.org/download.html\nPawn: https://mods.curse.com/addons/wow/pawn \nSimulation craft  https://mods.curse.com/addons/wow/simulationcraft \n\nLogin to your Toon, Type /simc and copy the text. Paste this text into the simulationcraft simulate tab. Under options>Scaling make sure you enable scaling and check your relevant stats. Run the simulation. Next copy the resulting Pawn string, and import the string into your pawn addon.");
  }



  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if(curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
  }

  if(message.content.startsWith(config.prefix + "level")) {
    message.reply(`You are  currently level ${userData.level}, with ${userData.points} points.`);
  }

  if(message.content.startsWith(config.prefix + "silence")) {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply("Please be in a voice channel first!");
    }
    voiceChannel.join()
      .then(connnection => {
        var file = "./audio/silence.wav";
        const dispatcher = connnection.playFile(file);
        dispatcher.on("end", () => {
          voiceChannel.leave();
        });
      });
  }


//prune command
  if(message.content.startsWith(config.prefix+"prune") || message.content.startsWith(config.prefix+"purge")) {
     // get number of messages to prune
    if(message.author.id == "119351283999047682" || message.author.id == "118792784642703360")
    {
      //check if command is being used from officer channel
      if(message.channel.id == "262343491542056962"){
        message.reply("Prune command cannot be used in officer channels in order to prevent accidental purging of important info");
      }else{
        let messagecount = parseInt(params[0]);

     // get the channel logs
        if(messagecount > 0){
          message.channel.fetchMessages({limit: 100})
          .then(messages => {
            let msg_array = messages.array();
       // filter the message to only your own
       // msg_array = msg_array.filter(m => m.author.id === bot.user.id);
       // limit to the requested number + 1 for the command message
            msg_array.length = messagecount + 1;
       // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
            msg_array.map(m => m.delete().catch(console.error));

          });}else{
          message.reply("\nusage:!purg |1-100| or !prune |1-100| . \n Example: typing   !prune 42   will delete the last 42 messages");
        }
      }
    }else{
      message.reply("I can't let you do that Dave. You do not have permission to use this command.");
    }
  }



  //console.log("\n" + chalk.cyan(JSON.stringify(users)));
  fs.writeFile("./users.json", JSON.stringify(users), (err) => {if(err) console.error(err);});
});

function rssfeed(url,count){


  var FeedParser = require("feedparser");
  var feedparser = new FeedParser();
  var request = require("request");
  request(url).pipe(feedparser);
  feedparser.on("error", function(error){
    console.log("failed reading feed: " + error);
  });
  var shown = 0;
  feedparser.on("readable",function() {
    var stream = this;
    var item = stream.read();

    shown += 1;
    if(shown > count){
      return;
    }
    //console.log("Shown: " + shown + "\nCount: " + count);



    if(moment(item.date) > moment(rss.lastItemDate)){
      console.log("New article found");
      //console.log("Feed date " + moment(item.date));
      //console.log("Saved Date " + moment(rss.lastItemDate));
    //  console.log("Last RSS Item Date old: " + rss.lastItemDate);
      rss.lastItemDate = moment(item.date);
    //  console.log("Last RSS Item Date new pre-save: " + rss.lastItemDate);
      console.log("Updating rrs.json with: " + moment(item.date));
      fs.writeFile("./rss.json", JSON.stringify(rss), (err) => {if(err) console.error(err);});
    //  console.log("Last RSS Item Date new: post-save" + rss.lastItemDate);

    }else if (moment(item.date) >= moment(rss.lastItemDate)) {
      console.log("No new article found");
      return;
    }


    var htmlToText = require("html-to-text");
    var text = htmlToText.fromString(item.description,{wordwrap:false,ignoreHref:false, ignoreImage:false});
    text=text.replace(/[\[\]"]+/g,"\n");
    rssChannel.sendMessage(item.title);
    rssChannel.sendMessage(item.date);
    console.log(item.date);
    console.log("Posting Article");
    rssChannel.sendMessage("**************** Article Start ****************");



    rssChannel.sendMessage(text, {split:true});


      // msg.channel.sendMessage(item.title + " - " + item.link, function() {
      //     if(full == true){
      //         var text2 = htmlToText.fromString(item.description,{
      //             wordwrap:false,
      //             ignoreHref:true
      //         });
      //         msg.channel.sendMessage(text2, {split:true});
			//
      //     }
      // });
    stream.alreadyRead = true;
  });
}

function checkForRSS(){
  console.log("Checking RSS feed for new articles...");
  var count = 1;
  var url = "http://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=10";
  rssfeed(url,count);

}
