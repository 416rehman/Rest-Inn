/*** I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been copied
 * manually or electronically from any other source (including web sites)
 * or distributed to other students. *
 *
 *      Name: Hayaturehman Ahmadzai
 *      Student ID: hahmadzai3
 *      Creation Date: 2022-01-24
 */

const morgan = require("morgan");
const chalk = require("chalk");

/** Colored morgan logger */
module.exports = morgan(function (tokens, req, res) {
    const statusColorHex =
        res.statusCode >= 500 ?     "#ff4949" :     // 500+
        res.statusCode >= 400 ?     "#ff9b49" :     // 400+
        res.statusCode >= 300 ?     "#49eaff" :     // 300+
                                    "#61ff49";      // 200+
    const methodColorHex =
        req.method === "GET" ?      "#5bb95d" :
        req.method === "POST" ?     "#b9935b" :
        req.method === "PUT" ?      "#5b68b9" :
        req.method === "DELETE" ?   "#b95b5b" :
                                    "#ff4949";
    return [
        chalk.hex(methodColorHex).bold(tokens.method(req, res)),
        chalk.hex('#bbbbbb').italic(tokens.url(req, res)),
        chalk.hex('#bbbbbb').italic(tokens['response-time'](req, res) + ' ms'),
        chalk.hex(statusColorHex).bold(tokens.status(req, res)),
    ].join(' ');
});
