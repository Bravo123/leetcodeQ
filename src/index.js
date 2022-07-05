'use strict';
exports.__esModule = true;
exports.parseError = void 0;
function parseError(err) {
    var msg = {
        message: err.message,
        stack: []
    };
    if (!err.stack) {
        return msg;
    }
    var lines = err.stack.split(/\n+/g);
    var reg = /(http.*.(js|jsm)):(\d+):(\d+)/;
    lines.forEach(function (line) {
        var res = line.match(reg);
        if (res === null || res === void 0 ? void 0 : res.length) {
            msg.stack.push({
                line: +res[3],
                column: +res[4],
                filename: res[1]
            });
        }
    });
    return msg;
}
exports.parseError = parseError;
