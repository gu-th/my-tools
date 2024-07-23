const fs = require('fs')

const txt = fs.readFileSync('./resource/怒海镇渊.txt', 'utf8')
const title = ''
const readTxt = txt.split(title)[1]
const arr = readTxt.split('\n')

let i = 0
const timer = setInterval(() => {
  if (i == arr.length) clearInterval(timer)
  console.log(`%c ${arr[i]}`,'color:#0f0;font-size: 16px;')
  i++
}, 2000);
