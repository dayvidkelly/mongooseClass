//-------------------------------------------------------
const ROUTES = [
  {
    path: "/test",
    route: require("./routes/test"),
  },
];
const Server = require("./utilities/server");
const server = new Server(ROUTES);
server.start(true, "index.html");
//-------------------------------------------------------
