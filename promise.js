const { w } = require("./");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    const promises = [];
    while (true) {
        for (let j = 0; j < 1e3; j++) {
            promises.push(w('Eu te amo pra caralho e nao sei explicar', './tmp/stream-promise.txt', 'utf8'))
        }
        await sleep(1.3)
        await Promise.all(promises)
        promises.length = 0;
    }

})()