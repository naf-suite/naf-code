'use strict';

const readline = require('readline');
const fs = require('fs');
const iconv = require('iconv-lite');
const MongoClient = require('mongodb').MongoClient;

// Connection URL
// const url = 'mongodb://root:Ziyouyanfa%23%40!@localhost:27017';
const url = 'mongodb://root:Ziyouyanfa%23%40!@192.168.18.100:27017';

// Database Name
const dbName = 'naf';


async function doWork() {
  const args = process.argv.splice(2);
  if (args.length !== 2) {
    console.log('请指定要导入的文件名和类别:\n node import.js xxxx.csv 31');
    return;
  }
  const category = args[1];

  console.log(`正在读取${args[0]}数据...`);
  const lines = await new Promise((resolve, reject) => {
    const res = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(args[0]).pipe(iconv.decodeStream('GBK')),
      crlfDelay: Infinity,
    });

    rl.on('line', async line => {
      // console.log(line);
      res.push(line);
    });
    rl.on('close', () => {
      resolve(res);
    });
    rl.on('error', err => {
      reject(err);
    });
  });
  console.log(`共读取数据${lines.length}条!`);
  console.log('正在保存数据...');
  // Use connect method to connect to the Server
  const client = await MongoClient.connect(url, { poolSize: 10 });
  const db = client.db(dbName).collection('naf_code_items');
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const cols = line.split(',');
    if (cols.length < 2) continue;
    const data = { code: cols[0], name: cols[1], category, group: '0', stauts: '0', order: 0 };

    console.log(line);
    try {
      const entity = await db.findOne({ code: cols[0], category });
      if (!entity) {
        await db.insertOne(data);
        count++;
      } else {
        await db.updateOne({ _id: entity._id }, { $set: data });
        console.log(`update: ${line}`);
      }
    } catch (err) {
      console.log(`处理错误： ${line}`);
      console.error(err);
    }
  }
  if (client) {
    client.close();
  }
  console.log(`导入完成，共导入${count}条数据！`);
}

doWork();
