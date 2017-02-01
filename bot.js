const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const moment = require("moment");
//var chalk = require("chalk");
const bot = new Discord.Client();
bot.login(config.token);

var version = "1.1.3";

var rssChannel;

//var users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
var rss = JSON.parse(fs.readFileSync("./rss.json", "utf8"));


bot.on("ready", () => {
  //say hello

  console.log(`Bot version ${version}`);
  console.log(`Logged in as ${bot.user.username}!`);
  rssChannel = bot.channels.get(config.rssChannelID);
  checkForRSS();
  setInterval(checkForRSS, 600*1000);
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

  if(message.content.includes("safe zone") || message.content.includes("safe-zone") || message.content.includes("fuck donald trump")){
    console.log("safe zone trigger");
    message.reply("https://aurorajalexander.files.wordpress.com/2017/01/snowflake.png");
  }

  // let userData = users[message.author.id];
  // if(!userData){
  //   userData = {name: message.author.username, points: 0, level: 0};
  //   // var result={};
  //   // // for(var key in userData) result[key]=userData[key];
  //   // // for(key in config.userINIT) result[key]=config.userINIT[key];
  //   // userData = result;
  //   users[message.author.id] = userData;
  // }
  // userData.points++;
  // fs.writeFile("./users.json", JSON.stringify(users), (err) => {if(err) console.error(err);});

  if(!message.content.startsWith(config.prefix)) return;
  const params = message.content.split(" ").slice(1);

  //************************COMMANDS START HERE************************
  // .# classchannel
  if(message.content.startsWith(config.prefix+"class")) {
     // get number of messages to prune
    var discordChannel;
    switch(params[0]) {
    case "death":
      discordChannel = "https://discord.gg/0ez1cFfUH3ingV96";
      break;
    case "demon":
      discordChannel = "https://discord.gg/zGGkNGC";
      break;
    case "druid":
      discordChannel = "https://discord.gg/0dWu0WkuetF87H9H";
      break;
    case "hunter":
      discordChannel = "https://discord.gg/yqer4BX";
      break;
    case "mage":
      discordChannel = " https://discord.gg/0gLMHikX2aZ23VdA";
      break;
    case "monk":
      discordChannel = " https://discord.gg/0dkfBMAxzTkWj21F";
      break;
    case "paladin":
      discordChannel = "https://discord.gg/0dvRDgpa5xZHFfnD";
      break;
    case "priest":
      discordChannel = "https://discord.gg/0f1Ta8lT8xXXEAIY";
      break;
    case "rogue":
      discordChannel = "https://discord.gg/0h08tydxoNhfDVZf";
      break;
    case "shaman":
      discordChannel = "https://discord.gg/0VcupJEQX0HuE5HH";
      break;
    case "warlock":
      discordChannel = "https://discord.gg/0onXDymd9Wpc2CEu";
      break;
    case "warrior":
      discordChannel = "https://discord.gg/0pYY7932lTH4FHW6";
      break;

    }
    message.channel.sendMessage(`The ${params[0]} discord channel can be found here: ${discordChannel}`);
  }


  // .# addfilter

  if(message.content.startsWith(config.prefix+"addfilter")) {
     // get number of messages to prune
    if(message.author.id == "119351283999047682" || message.author.id == "118792784642703360")
    {
      let filterStr = params[0];
      if(filterStr != "" || filterStr != null){
        rss.filters.push(filterStr);
        fs.writeFile("./rss.json", JSON.stringify(rss), (err) => {if(err) console.error(err);});
      }
    }
  }


  // .# Recruitment command
  if(message.content.startsWith(config.prefix + "recruit")){
    message.channel.sendMessage("Recruiting players in EAST TENNESSEE and surrounding areas for a localized PvE guild. An ever expanding community of WoW players located within an hours drive of one another. Participate in NH progression, guild meets, and a general good time. PST! ^_^");
  }




  // .# magicconch

  if(message.content.startsWith(config.prefix + "conch" || config.prefix + "magicconch")) {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply("Please be in a voice channel first!");
    }
    var file;
    var patrickRoll = Math.floor((Math.random() * 100) + 1);
    var conchRoll = Math.floor((Math.random() * 7));
    console.log("patrickRoll: " + patrickRoll);
    console.log("conchRoll: " + conchRoll);
    if(patrickRoll == 100){
      file = "./audio/nothisispatrick.wav";
    }else{
      switch(conchRoll) {
      case 0:
        file = "./audio/conch0.wav";
        break;
      case 1:
        file = "./audio/conch1.wav";
        break;
      case 2:
        file = "./audio/conch2.wav";
        break;
      case 3:
        file = "./audio/conch3.wav";
        break;
      case 4:
        file = "./audio/conch4.wav";
        break;
      case 5:
        file = "./audio/conch5.wav";
        break;
      case 6:
        file = "./audio/conch6.wav";
        break;
      default:
        file = "./audio/conch6.wav";
      }
    }

    voiceChannel.join()
        .then(connnection => {
          const dispatcher = connnection.playFile(file);
          dispatcher.on("end", () => {
            voiceChannel.leave();
          });
        });
  }

// .# fuckyou command
  if(message.content.startsWith(config.prefix + "fuckyou")) {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply("Please be in a voice channel first!");
    }
    voiceChannel.join()
      .then(connnection => {
        var file = "./audio/fuckyou.wav";
        const dispatcher = connnection.playFile(file);
        dispatcher.on("end", () => {
          voiceChannel.leave();
        });
      });
  }


// .# kill command
  if(message.content.startsWith(config.prefix + "kill")){
    console.log("!kill command was called... Now Exiting");
    process.exit();
  }


// .# RSS command DEPRECATED
  if(message.content.startsWith(config.prefix + "wownews")){
    var count = 1;
    var url = config.rssURL;
    if(parseInt(params[0]) != null && parseInt(params[0]) != "" && !isNaN(parseInt(params[0]))){
      count = parseInt(params[0]);
    }
    rssfeed(url,count);
  }

// .# spoiler command
  if(message.content.startsWith(config.prefix + "spoiler")){
    message.channel.sendMessage("LEAKED PATCH 7.2 TOMB OF SARGARAS ENDING \n https://www.youtube.com/watch?v=NOudUXxWPSs");
  }
// .# test command
  if(message.content.startsWith(config.prefix + "test")){
    //test command
    console.log("running test code");
  }
// .# website command
  if(message.content.startsWith(config.prefix + "website") || message.content.startsWith(config.prefix + "site")){
    message.channel.sendMessage("Official Guild Website:  http://www.hardknoxguild.com");
  }

// ,# pawn and simc command
  if (message.content.startsWith(config.prefix + "statvid") || message.content.startsWith(config.prefix + "pawnvid")) {
    message.channel.sendMessage("Here ya go! https://www.youtube.com/watch?v=XmtgInKDCos");
  }
  if (message.content.startsWith(config.prefix + "stats") || message.content.startsWith(config.prefix + "pawn")) {
       //bot.setPlayingGame("Drinking Cola", callback);
    message.channel.sendMessage("You should simulate your character. First install these programs and addons: \nSimulationcraft application: http://www.simulationcraft.org/download.html\nPawn: https://mods.curse.com/addons/wow/pawn \nSimulation craft  https://mods.curse.com/addons/wow/simulationcraft \n\nLogin to your Toon, Type /simc and copy the text. Paste this text into the simulationcraft simulate tab. Under options>Scaling make sure you enable scaling and check your relevant stats. Run the simulation. Next copy the resulting Pawn string, and import the string into your pawn addon.");
  }



//   let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
//   if(curLevel > userData.level) {
//     // Level up!
//     userData.level = curLevel;
//     message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
//   }
// // .# level Command
//   if(message.content.startsWith(config.prefix + "level")) {
//     message.reply(`You are  currently level ${userData.level}, with ${userData.points} points.`);
//   }
// .# silence command
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

// .# zip command
  if(message.content.startsWith(config.prefix+"zip") || message.content.startsWith(config.prefix+"zips")) {

    if(message.author.id == "119351283999047682" || message.author.id == "118792784642703360")
    {
      message.channel.sendMessage("http://pastebin.com/5mLN1dQx");
    }
  }



// .# prune command
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
  //fs.writeFile("./users.json", JSON.stringify(users), (err) => {if(err) console.error(err);});
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

    }else if (moment(item.date) <= moment(rss.lastItemDate)) {
      console.log("No new article found");
      return;
    }
    var htmlToText = require("html-to-text");
    var text = htmlToText.fromString(item.description,{wordwrap:false,ignoreHref:false, ignoreImage:false});
    //text=text.replace(/[\[\]"]+/g,"\n");
    rssChannel.sendMessage(item.title);
    rssChannel.sendMessage(item.date);
    console.log(item.date);
    parseFeed(text);

    stream.alreadyRead = true;
  });
}

function checkForRSS(){
  console.log("Checking RSS feed for new articles...");
  var count = 1;
  var url = config.rssURL;
  rssfeed(url,count);
}

function parseFeed(text){
  console.log("Posting Article");
  rssChannel.sendMessage('********************************************************************Article Start********************************************************************');
  var i = 0;
  //var lastWhiteSpaceIndex = 0;
  var lastOpenBrack = 0;
  var lastCloseBrack = 0;

  while (i < text.length) {
    let char = text.charAt(i);
    if(char == " "){
      //lastWhiteSpaceIndex = i;
    }
    if(char == "["){
      lastOpenBrack = i;
    }
    if(char == "]"){
      lastCloseBrack = i;
      //var wrappedLink = text.substring(lastOpenBrack, lastCloseBrack + 1);
      var rawLink = text.substring(lastOpenBrack + 1, lastCloseBrack);
      rssChannel.sendMessage(text.substring(0, lastOpenBrack)); //everything before the discovered link
      rssChannel.sendMessage(rawLink); // the raw link
      text = text.slice(lastCloseBrack + 2); // delete everything prior to the space after the first link
      i = -1; //reset index for newly trimmed string and continue looping
    }
    //dump the trailing text
    if(i == text.length -1){
      rssChannel.sendMessage(text);
    }
    i++;
  }
}
