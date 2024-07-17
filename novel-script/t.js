/*
 * @Author       : guth
 * @Date         : 2023-12-28 18:48:31
 * @LastEditors  : guth
 * @LastEditTime : 2024-05-30 14:34:06
 * @FilePath     : /tools/novel-script/t.js
 * @Description  : 爬个小说的简单脚本，软件上的广告太烦了
 */
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const iconv = require('iconv-lite')
const config = require('./config')

const qsbs = require('./qsbs')

const {
  UTF8,
  URL_START,
  FIRST_URL,
  TITLE_SELECTOR,
  REG_TITLE_RULE,
  CONTENT_SELECTOR,
  NEXT_URL_SELECTOR,
  END_URL,
  AXIOS_CONFIG,
  IS_TRANSFORM,
  FILE_PATH,
  DELETE_STR_ARR,
} = config

const titleSet = new Set()

console.log('config: ', config)
console.log('==================================================== start ====================================================')

requestApi(FIRST_URL)

function requestApi(url) {
  axios
    .get(url, AXIOS_CONFIG)
    .then((res) => {
      if (res.status === 200) {
        let htmlStr = res.data
        IS_TRANSFORM && (htmlStr = iconv.decode(res.data, 'gbk'))
        handleHtml(htmlStr, url)
      }
    })
    .catch((err) => {
      console.error(err)
      console.error('request err')
      requestApi(url)
    })
}

function handleHtml(html, curUrl) {
  const $ = cheerio.load(html)
  writeContent($)
  const nextUrl = getNextUrl($)
  console.log('curUrl:', curUrl)
  if (curUrl !== END_URL) {
    requestApi(URL_START + nextUrl)
  } else {
    console.log('finished')
  }
}

/**
 * @param {cheerio.CheerioAPI} $
 */
function writeContent($) {
  const orgin_title = $(TITLE_SELECTOR).text() + '\n'
  // const match = new RegExp(REG_TITLE_RULE).exec(orgin_title)
  const match = orgin_title.match(REG_TITLE_RULE)
  let title = orgin_title
  if (match) {
    title = orgin_title.replace(match[0], '')
  }
  // #region 内容分段
  let content = ''
  $(CONTENT_SELECTOR).each((i, el) => {
    if (URL_START === 'https://www.xywx.cc') {
      const scriptStr = Object.values(el.children)[0].data
      const pattern = /\'([^)]+)\'/g; // 匹配 '' 中间的内容
      const match = scriptStr.match(pattern)
      if (match) {
        content += qsbs.bb(match[0]).replaceAll(/\<\/?p\>/g, '') + '\n'
      }
    } else {
      // console.log('el', el.text());
      content += $(el).text() + '\n'
    }
  })
  // #endregion

  // #region 需要删除的内容
  if (DELETE_STR_ARR.length > 0) {
    DELETE_STR_ARR.forEach((item) => {
      content = content.replaceAll(item, '')
    })
  }
  content = content.replaceAll('    ', '\n')
  // #endregion

  let writeTxt = content
  if (!titleSet.has(title)) {
    writeTxt = title + content
    titleSet.add(title)
  }
  fs.appendFileSync(FILE_PATH, writeTxt, UTF8)
  console.log(`write end ${orgin_title}`)
}

/**
 * @param {cheerio.CheerioAPI} $
 */
function getNextUrl($) {
  let nextUrl = ''

  if (URL_START === 'https://69shu.net') {
    const scripts =  $('script').text()
    const arr = scripts.split(';')
    const scriptStr = arr.filter(item => item.includes('next_page'))[0]
    const pattern = /\"([^)]+)\"/g; // 匹配 '' 中间的内容
    nextUrl = pattern.exec(scriptStr)[1]
  } else {
    nextUrl = $(NEXT_URL_SELECTOR)['0'].attribs.href
  }
  console.log('next url: ', nextUrl)
  return nextUrl
}
