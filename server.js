var connect = require('connect'),
    serveStatic = require('serve-static'),
    PORT = process.env.PORT || 80;
var app = connect();
app.use(serveStatic("./"));
app.listen(PORT);
