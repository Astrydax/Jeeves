const fs = require("fs");

let users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

//console.log(users);
//var id = "270852774948896768";
var key;

var prop = "welcomed";
var value = false;

for (key in users) {
  if (users.hasOwnProperty(key)) {
    console.log(key);
    console.log("\n");
    users[key][prop] = value;

    console.log(users[key]);


  }
}

//var target = "property";
// var value = "value";
//
// for (var i = 0; i< users.length;i++)
// {
//   if (users[i].target) {
//     break;
//   }
//   users[i].property = value;
// }
//
//
//
//
// console.log("running");
//
fs.writeFile("./users.json", JSON.stringify(users), (err) => {if(err) console.error(err);});
