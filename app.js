const express = require('express');
const compression = require('compression');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, "tmp", 'pedido.txt');

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=pedido.txt');

    const bufferSize = 64 * 1024;
    const options = { highWaterMark: bufferSize };

    const maxCacheSize = 1e4 * 1024 * 1024; // 10GB
    if (fs.constants && fs.constants.O_MAXIO) {
        fs.constants.O_MAXIO = maxCacheSize;
    } else if (fs.constants && fs.constants.F_SEAL_WRITE) {
        fs.constants.F_SEAL_WRITE = maxCacheSize;
    }

    const stream = fs.createReadStream(filePath, options);

    app.use(compression());

    stream.pipe(res);

    stream.on('error', (err) => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
});

// app.get('/:code', (req, res) => {
//     return res.status(req.params.code || 500).send({ message: req.params.code ? `O código enviado foi: ${req.params.code}` : "Nenhum código enviado :()" });
// });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});