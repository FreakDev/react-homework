var getQueryParams = require('./get-query-params');

module.exports = function (req, res) {
    var params = getQueryParams(req.url);

    var max = 16;
    var r = parseInt(params.r, 10) || 0;

    var n = (r % max) + 1;
    res.writeHead(302, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Location': 'http://placekitten.com/320/200?image=' + n
    });
    res.end();
};
