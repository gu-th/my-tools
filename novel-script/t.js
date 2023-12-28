/*
 * @Author       : guth
 * @Date         : 2023-12-28 18:48:31
 * @LastEditors  : guth
 * @LastEditTime : 2023-12-28 19:02:57
 * @FilePath     : /my-tools/novel-script/t.js
 * @Description  : 爬个小说的简单脚本，软件上的广告太烦了
 */
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const iconv = require('iconv-lite')
const config = require('./config')

const {
  UTF8,
  URL_START,
  FIRST_URL,
  TITLE_SELECTOR,
  CONTENT_SELECTOR,
  NEXT_URL_SELECTOR,
  END_URL,
  AXIOS_CONFIG,
  IS_TRANSFORM,
  FILE_PATH
} = config

const titleSet = new Set()

console.log('config: ', config)

requestApi(FIRST_URL)

function requestApi(url) {
  axios.get(url, AXIOS_CONFIG).then(res => {
    if (res.status === 200) {
      let htmlStr = res.data
      IS_TRANSFORM && (htmlStr = iconv.decode(res.data, 'gbk'))
      handleHtml(htmlStr)
    }
  }).catch(err => {
    console.error('request err', err)
    requestApi(url)
  })
}

function handleHtml(html) {
  const $ = cheerio.load(html)
  writeContent($)
  const nextUrl = getNextUrl($)
  if (nextUrl !== END_URL) {
    requestApi(URL_START + nextUrl)
  } else {
    console.log('finished')
  }
}

function writeContent($) {
  const title = $(TITLE_SELECTOR).text()
  const content = $(CONTENT_SELECTOR).text()
  let str = ''
  if (titleSet.has(title)) {
    str = content + '\n'
  } else {
    titleSet.add(title)
    str = title + '\n' + content + '\n'
  }
  fs.appendFileSync(FILE_PATH, str, UTF8)
  console.log(`write end ${title}`)
}

function getNextUrl($) {
  const nextUrl = $(NEXT_URL_SELECTOR)['0'].attribs.href
  console.log('next url: ', nextUrl)
  return nextUrl
}

