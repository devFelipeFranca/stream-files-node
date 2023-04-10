const { w } = require("./");

(async () => {
    const chunks = [];
    const chunk = 'Eu te amo pra caralho e nao sei explicar, casa comigo?'
    while (true) {
        while (chunks.length < 2e3) {
            chunks.push(chunk)
        }
        await w(chunks.join("\n"), "./tmp/pedido.txt", "utf8")
        chunks.length = 0;
    }

})();