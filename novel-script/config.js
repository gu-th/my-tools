/*
 * @Author       : guth
 * @Date         : 2023-12-28 18:48:31
 * @LastEditors  : guth
 * @LastEditTime : 2024-05-30 14:44:34
 * @FilePath     : /tools/novel-script/config.js
 * @Description  : 爬小说的配置文件
 */
// 编码
const UTF8 = 'utf8'
// 小说名
const FILE_NAME = '让你讨好女领导，你把人家娶了'
// 小说路径
const FILE_PATH = `./resource/${FILE_NAME}.txt`
// 小说网址
const URL_START = 'https://69shu.net'
// 第一章地址
const FIRST_URL = 'https://69shu.net/6/6476/4074940.html'
// 标题选择器
const TITLE_SELECTOR = 'h2'
// 正则过滤标题 1/2)
// const REG_TITLE_RULE = /\（第([\d]+)页\）/g;
const REG_TITLE_RULE = /\(\d(\/)\d\)/g
// 内容选择器
// const CONTENT_SELECTOR = '.text > :not(:nth-last-child(-n+3))'
// const CONTENT_SELECTOR = '.word_read > script:not(:nth-last-child(-n+3))'
const CONTENT_SELECTOR = '#novelcontent.novelcontent'
// 下一章选择器
const NEXT_URL_SELECTOR = '#next'
// const NEXT_URL_SELECTOR = '.bottem a:nth-of-type(4)'
// 结束标志
const END_URL = 'https://69shu.net/6/6476/4076396.html'
// 是否需要转换编码
const IS_TRANSFORM = true
// 请求axios 配置
const AXIOS_CONFIG = {
  responseType: IS_TRANSFORM ? 'arraybuffer' : UTF8, // 表示服务器响应的数据类型，设置为 buffer 类型
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
}
// 需要删除的字符串集合
const DELETE_STR_ARR = []

module.exports = {
  UTF8,
  FILE_PATH,
  URL_START,
  FIRST_URL,
  TITLE_SELECTOR,
  REG_TITLE_RULE,
  CONTENT_SELECTOR,
  NEXT_URL_SELECTOR,
  END_URL,
  AXIOS_CONFIG,
  IS_TRANSFORM,
  DELETE_STR_ARR,
}
