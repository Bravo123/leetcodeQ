export interface ErrorMessage {
    message: string;
    stack: Array<{
        line: number;
        column: number;
        filename: string;
    }>;
}

export function parseError(err: Error): ErrorMessage {
    const msg: ErrorMessage = {
        message: err.message,
        stack: []
    };

    if (!err.stack) {
        return msg;
    }

    const lines = err.stack.split(/\n+/g);

    const reg = /(http.*.(js|jsm)):(\d+):(\d+)/;
    lines.forEach(line => {
        const res = line.match(reg);
        if (res?.length) {
            msg.stack.push({
                line: +res[3],
                column: +res[4],
                filename: res[1]
            });
        }
    });

    return msg;
}
