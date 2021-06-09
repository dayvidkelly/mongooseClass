const express = require("express");
const app = express();
var os = require("os");
const port = 3000;
class Server {
  constructor(middleware) {
    this.initializeMiddleware(middleware);
  }
  /**
   *
   * @param {Boolean} clearConsole if set to true will clear console each time server is restart.
   * @param {*} pathToFile set the public file's name in the public folder
   */
  start(clearConsole = true, pathToFile = "") {
    this.initializeEnvironment();
    this.initializeParcer();
    this.initializeConnectionToDb();
    this.initializeListening(clearConsole);
    this.initializePublicFiles(pathToFile);
  }

  initializeEnvironment() {
    require("dotenv/config");
  }
  initializeParcer() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  }

  initializeConnectionToDb() {
    const mongoose = require("mongoose");
    mongoose.connect(
      process.env.DB_CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error, ok) => {
        if (!error) {
          console.log(
            `Connected to DB: TRUE: \x1b[36m${ok.connections[0]._hasOpened}\x1b[0m`
          );
          console.log(
            `Database connected: \x1b[36m${ok.connections[0].name}\x1b[0m`
          );
          console.log(
            `Port connected: \x1b[36m${ok.connections[0].port}\x1b[0m`
          );
        } else {
          console.error(
            `Connected to DB: \x1b[31m FALSE (One common reason is that you're trying to access the database from an IP that isn't whitelisted).\x1b[0m`
          );
        }
        console.log(
          "................................................................................................"
        );
      }
    );
  }

  initializeListening(clearConsole) {
    app.listen(port, () => {
      clearConsole ? console.clear() : false;
      console.log(
        "................................................................................................"
      );
      const ip = require("ip");
      console.log(`Host: \x1b[36m${os.hostname()}\x1b[0m`);
      console.log(`Port: \x1b[36m${port}\x1b[0m`);
      console.log(
        `URL: \x1b[36mhttp://localhost:${port}/\x1b[0m or \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m`
      );
    });
  }

  initializeMiddleware(array) {
    if (array) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        app.use(element.path, element.route);
      }
    } else {
      return false;
    }
  }

  initializePublicFiles(pathToFile = "") {
    if (pathToFile != "") {
      const path = require("path");
      app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, `../public/${pathToFile}`));
      });
    }
  }
}

// new Server();
/**
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
 */
module.exports = Server;
