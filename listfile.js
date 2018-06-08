const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, 'dist');

let files = {};

//遍历dist下的文件，获取文件路径
const ScanDir = (path) => {
  //如果是该路径是文件，执行下列操作
  if (fs.statSync(path).isFile()) {
    const shortPath = path.replace(rootDir, "");
    const pathArr = shortPath.split('.');
    const regType = /(.js|.css)$/;

    //因为只需要入口的js和css，其他都是在入口文件中引入的，所以只需匹配出入口js和css，类似 umi.5d16e536.js
    //此时依据 '.' 切分出来的文件名数组长度应为3
    if(pathArr.length === 3) {
      const pathName = pathArr[0] + '.' + pathArr[2];
      //判断文件名是否以'.js'或'.css'结尾
      if (regType.test(pathName)) {
        const pathObj = {};
        pathObj[pathName] = shortPath;
        files = Object.assign(files, pathObj);
      }
    }
    return files;
  }
  //如果路径是文件夹，继续遍历
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir.call(this, path + '/' + file)
    })
  } catch (e) {
    throw Error(e);
  }
}

//创建一个promise，在遍历文件名完成之后，再将结果写入列表文件
const listFile = function() {
  return new Promise(function(resolve, reject) {
    ScanDir(rootDir);
    resolve();
  });
};

listFile().then(function() {
  fs.writeFile('filelist.json', JSON.stringify(files), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}).catch(function(error) {
  console.log('oh no', error);
});
