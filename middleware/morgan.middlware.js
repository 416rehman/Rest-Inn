
const morgan = require("morgan");
const chalk = require("chalk");

/** Colored morgan logger */
module.exports = morgan(function (tokens, req, res) {
    const statusColorHex = res.statusCode >= 500 ? "#ff4949" : res.statusCode >= 400 ? "#ff9b49" : res.statusCode >= 300 ? "#49eaff" : "#61ff49";
    const methodColorHex = req.method === "GET" ? "#5b8fb9" : req.method === "POST" ? "#655bb9" : req.method === "PUT" ? "#975bb9" : req.method === "DELETE" ? "#b95b5b" : "#ff4949";
    return [
        chalk.hex(methodColorHex).bold(tokens.method(req, res)),
        chalk.hex('#bbbbbb').italic(tokens.url(req, res)),
        chalk.hex('#bbbbbb').italic(tokens['response-time'](req, res) + ' ms'),
        chalk.hex(statusColorHex).bold(tokens.status(req, res)),
    ].join(' ');
});
