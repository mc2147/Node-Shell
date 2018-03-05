var request = require('request');
var fs = require('fs');
var readline = require("readline");

// var output = {};

var pwdFunc = function(val, done, stdin) {
  var output = process.env.PWD;
  done(output);
}

var dateFunc = function(val, done, stdin) {
    var newDate = new Date();
    var output = newDate.toString();
    done(output);
}

var lsFunc = function(val, done, stdin) {
  var output = "";
  fs.readdir('.', function(err, files) {
    // if (err) throw err;
    // files.forEach(function(file) {
    //   process.stdout.write(file.toString() + "\n");
    // })
  });
  var syncedFilenames = fs.readdirSync('.');
  for (var i = 0; i < syncedFilenames.length; i ++) {
    output += syncedFilenames[i] + "\n";
  }
  done(output);
}

var testAsync = function() {
  var startTime = new Date; 
  setTimeout(function () {
    var endTime = new Date;
    console.log('Time elapsed: ', endTime - startTime, 'ms');
  }, 500);

  while (new Date - startTime < 1000) {};
}

var echoFunc = function(value, done, stdin) {
  var output = "";
  for (var i = 0; i < value.length; i++) {
    output += value[i] + " ";
  }
  done(output);
  // process.stdout.write(output);
}

var catFunc = function(fileName, done, stdin) {
  fs.readFile(fileName[0], function(error, data) {
    if (error) throw error;
    done(data);
    // process.stdout.write(data);
  })
}

var grepFunc = function(matchString, done, stdin) {
  console.log("in grepfunc")
  var output = ""; 
  if (stdin) {
    var arrayOfLines = String(stdin).split("\n"); 
    arrayOfLines.forEach((line) => {
      if (line.includes(matchString))
      {
        output += line + "\n";
      }
    })
  }
  done(output);
}

var headFunc = function(fileName, done, stdin) {
  // console.log(stdin);
  var output = ""; 
  if (stdin) {
    var arrayOfLines = String(stdin).split("\n"); 
    var count = 0;
    for (count = 0; count < 5; count ++) {
      output += arrayOfLines[count] + "\n";
      count ++;
    }
    // var Readable = require('stream').Readable;
    // let rl = new Readable();
    // rl.on("line", function (line) {
    //   if (count < 5) 
    //     output += line + "\n";
    //     // process.stdout.write(line + "\n");
    //     count++;
    // })
    // rl.push(stdin);
    // rl.push(null);

    setTimeout(function() {
      // output = "test head func";
      done(output);
    }, 500);
    console.log("head func");
    return
  }

  let rl = readline.createInterface({
    input: fs.createReadStream(fileName[0]),
    crlfDelay: Infinity
  });

  var count = 0;
  rl.on("line", function (line) {
    if (count < 5)
      output += line + "\n";
      // process.stdout.write(line + "\n");
    count++;
  })
  setTimeout(function() {
    done(output);
  }, 500);
}

var tailFunc = function(fileName, done, stdin) {
  var output = "";
  let rl = readline.createInterface({
    input: fs.createReadStream(fileName[0]),
    crlfDelay: Infinity
  });
  // for ()
  let fileLines = [];
  rl.on("line", function (line) {
    fileLines.push(line);
    // console.log(line);
  });
  // console.log(fileLines);
  setTimeout(function() {
    if (fileLines.length > 5) {
      fileLines = fileLines.slice(fileLines.length - 6);
    }
    // console.log(fileLines);
    fileLines.forEach((line) => {
      // process.stdout.write(line + "\n");
      output += line + "\n";
    })
    done(output);
  }, 500)
}

var sortFunc = function(fileName, done, stdin) {
  var output = "";
  let rl = readline.createInterface({
    input: fs.createReadStream(fileName[0]),
    crlfDelay: Infinity
  });
  // for ()
  let fileLines = [];
  rl.on("line", function (line) {
    fileLines.push(line);
  });
  // console.log(fileLines);
  setTimeout(function() {
    fileLines.sort();
    fileLines.forEach(function(elem) {
      process.stdout.write(elem + "\n");
    });
  }, 500)

}

var wcFunc = function(fileName, done, stdin) {
  var output = "";
  let rl = readline.createInterface({
    input: fs.createReadStream(fileName[0]),
    crlfDelay: Infinity
  });
  // for ()
  let fileLines = [];
  rl.on("line", function (line) {
    fileLines.push(line);
  });
  // console.log(fileLines);
  setTimeout(function() {
    output = fileLines.length;
    // process.stdout.write(String(fileLines.length));
    done(output);
  }, 500)

}

var curlFunc = function(args, done, stdin) {
  var output = "";
  var url = args[0];
  request(url, function(error, response, body) {
    // process.stdout.write(String(body));
    output = String(body);
    done(output);
  })
}

module.exports = {
  pwd: pwdFunc,
  date: dateFunc,
  ls: lsFunc,
  testAsync: testAsync,
  echo: echoFunc,
  cat: catFunc,
  head: headFunc,
  tail: tailFunc,
  sort: sortFunc,
  wc: wcFunc,
  curl: curlFunc,
  grep: grepFunc,
}

