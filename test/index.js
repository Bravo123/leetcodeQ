const { parseError } = require('../src/index.js');

console.log(parseError);

const test = (t, e) => {
    t = JSON.stringify(t);
    e = JSON.stringify(e);

    if (t !== e) {
        throw new Error(`${t} is not eq ${e}`);
    } else {
        console.log('pass');
    }
};

let e = new Error('Error raised');
e.stack = `TypeError: Error raised
at bar http://192.168.31.8:8000/c.js:2:9
at foo http://192.168.31.8:8000/b.js:4:15
at calc http://192.168.31.8:8000/a.js:4:3
at <anonymous>:1:11
at http://192.168.31.8:8000/a.js:22:3
`;

test(parseError(e), {
    message: 'Error raised',
    stack: [
        {
            line: 2,
            column: 9,
            filename: 'http://192.168.31.8:8000/c.js'
        },
        {
            line: 4,
            column: 15,
            filename: 'http://192.168.31.8:8000/b.js'
        },
        {
            line: 4,
            column: 3,
            filename: 'http://192.168.31.8:8000/a.js'
        },
        {
            line: 22,
            column: 3,
            filename: 'http://192.168.31.8:8000/a.js'
        }
    ]
});

e = new Error('Error raised');

e.stack = `
bar@http://192.168.31.8:8000/c.js:2:9
foo@http://192.168.31.8:8000/b.js:4:15
calc@http://192.168.31.8:8000/a.js:4:3
<anonymous>:1:11
http://192.168.31.8:8000/a.js:22:3
`;
test(parseError(e), {
    message: 'Error raised',
    stack: [
        {
            line: 2,
            column: 9,
            filename: 'http://192.168.31.8:8000/c.js'
        },
        {
            line: 4,
            column: 15,
            filename: 'http://192.168.31.8:8000/b.js'
        },
        {
            line: 4,
            column: 3,
            filename: 'http://192.168.31.8:8000/a.js'
        },
        {
            line: 22,
            column: 3,
            filename: 'http://192.168.31.8:8000/a.js'
        }
    ]
});
