/*
 * @Author       : guth
 * @Date         : 2023-12-28 18:48:31
 * @LastEditors  : guth
 * @LastEditTime : 2023-12-28 19:08:19
 * @FilePath     : /my-tools/novel-script/config.js
 * @Description  : 爬小说的配置文件
 */
// 编码
const UTF8 = 'utf8'
// 小说名
const FILE_NAME = '朱雀书院'
// 小说路径
const FILE_PATH = `../resource/小说/${FILE_NAME}.txt`
// 小说网址
const URL_START = 'https://www.25zw.org/'
// 第一章地址
const FIRST_URL = 'https://www.25zw.org/147689/193366045.html'
// 标题选择器
const TITLE_SELECTOR = '.zhangjieming h1'
// 内容选择器
const CONTENT_SELECTOR = '#content > :not(:last-child)'
// const CONTENT_SELECTOR = '#htmlContent p'
// 下一章选择器
const NEXT_URL_SELECTOR = '.bottem a:nth-of-type(4)'
// 结束标志
const END_URL = '/book/147689.html'
// 是否需要转换编码
const IS_TRANSFORM = false
// 请求axios 配置
const AXIOS_CONFIG =  {
  responseType: IS_TRANSFORM ? 'arraybuffer' : UTF8, // 表示服务器响应的数据类型，设置为 buffer 类型
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}

module.exports = {
  UTF8,
  FILE_PATH,
  URL_START,
  FIRST_URL,
  TITLE_SELECTOR,
  CONTENT_SELECTOR,
  NEXT_URL_SELECTOR,
  END_URL,
  AXIOS_CONFIG,
  IS_TRANSFORM
}