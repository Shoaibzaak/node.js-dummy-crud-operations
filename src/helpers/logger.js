 
var fs = require('fs');
module.exports = {
    _log: function (text, type) {
        text = new Date() +': '+ text;
        var color = type == 'error' ? '\x1b[41m' : '\x1b[42m';
        console.log(color, '\x1b[40m', text);
        // fs.appendFile('log/' + type + '.log', text + '\n');
    },
    info: function (text) {
        if( typeof  text === 'object'){
            text = JSON.stringify( text );
        }
        this._log(text, 'info');
    },
    error: function (text) {
        this._log(text, 'error');
    }
};
