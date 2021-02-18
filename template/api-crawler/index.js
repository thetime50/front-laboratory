const dayjs = require('dayjs')
// var superagent = require('superagent');
// const http = require('http')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const pfs = require('fs/promises')
const ora = require('ora')
const path = require('path')

const {
    sleep,
    prm,
    saveFile,
} = require("./util.js");

const args = require('minimist')(process.argv.slice(2))

// console.log('**',args)

// const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'vue'
// 从参数对象获取标志
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s


const rootUrl = 'http://192.168.1.203:39015/docs/'
const distPatch = path.resolve(__dirname,'../docs')

function consoleTimestamp(...args){
    console.log( dayjs().format('YYYY-MM-DD HH:mm:ss SSS'), ...args,'\n')

}

let resCnt = 0
let reqlist = []
// {href,url,patch,parent,loaded,isFile}

async function getPage(reqObj){
    reqlist.push({reqObj})

    try {
        let url = reqObj.url.replace(/[^\/]+/g, (match, offset, string, NamedCaptureGroup) => {
            if (offset < rootUrl.length) {
                return match
            }
            return encodeURIComponent(match)
        })
        let response = await axios.get(url)
        if(response.status!=200){
            throw new Error(response)
        }

        if(reqObj.isFile){
            // console.log(response)
            // let fpath = reqObj.path.replace(/[^\/]&/, '')

            // console.log(fpath)
            let data = /\.json$/.test( reqObj.path )? JSON.stringify(response.data,null,'  ') : response.data
            await saveFile(reqObj.path, data)
        }else{
            let $ = cheerio.load(response.data);
            let hrefs = $('td a').map(( i, el,)=>{
                return  el.attribs.href //.replace(/\/$/,'')
            })
            hrefs = Array.from(hrefs)
        
            let reqs = hrefs.map((v, i, a) => {
                let href = v,
                    url = reqObj.url+v.replace(/^\.\//,''),
                    path_ = path.resolve(reqObj.path,v),
                    parent = reqObj,
                    loaded = false,
                    isFile = !/\/$/.test(v)
                return {
                    href,
                    url,
                    path: path_,
                    parent,
                    loaded,
                    isFile,
                }
            })
            
            // console.table(reqs, ["href", /* "url", "path", */"isFile"])

            reqs.forEach((v, i, a) => {
                getPage(v)
            })
        }
    } catch (error) {
        throw error
    }
    resCnt += 1
    reqObj.loaded = true
}

async function waitLoaded(timeOut = 5000){
    let tim = 0
    let interval = 200
    return new Promise((resolve,reject)=>{
        let ident = setInterval(() => {
            if(reqlist.length == resCnt){
                clearInterval(ident)
                resolve(true)
                return
            }
            tim += interval
            if(tim >= timeOut){
                reject(`timeout limit% ${timeOut}ms, used ${tim}ms`)
            }
        }, interval);
    })
}

;
(async () => {
    console.log('hello')
    const spinner = ora('api crawlering...')
    spinner.start()

    // 删除旧文件
    // consoleTimestamp()
    await prm(distPatch)
    // consoleTimestamp()

    // 爬取网页
    // let response = await http.get(rootUrl)
    // let response = await superagent.get(rootUrl)

    let rootReqObj = {
        href:'',
        url:rootUrl,
        path:distPatch,
        parent:null,
        loaded:false,
        isFile:false,
    }

    getPage(rootReqObj)
    await waitLoaded()
    await sleep(500)

    console.log('\nstop')
    spinner.stop()
})()
