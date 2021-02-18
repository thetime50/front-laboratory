
const pfs = require('fs/promises');
const path = require('path')
const rm = require('rimraf')

/**
* 异步延迟
* @param {number} time 延迟的时间,单位毫秒
*/
function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

const prm = (path) => {
    return new Promise((resolve,reject)=>{
        rm(path,err => {
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
}

const saveFile = async (fpath, data) => {
    const checkPath = async (dpath) => {
        try {
            let stat = await pfs.stat(dpath)
        } catch (error) {
            await checkPath(path.dirname(dpath))
            try {
                await pfs.mkdir(dpath) //重复创建路径会报错
            } catch (error) {
                // throw error
            }
        }
    }
    try {
        fpath = path.normalize(fpath)
        await checkPath(path.dirname(fpath))
        await sleep(10)
        await pfs.writeFile(fpath, data)
    } catch (error) {
        throw error
    }
}
// saveFile('d:\\Work\\Mlf\\edu_ex_web_api\\docs\\3.机构管理', '123')

module.exports = {
    sleep,
    prm,
    saveFile,
};
  