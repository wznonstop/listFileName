# listFileName
遍历打包之后的项目，生成配置文件

在package.json里新增script，
```shell
  "list": "node listfile.js",
```

执行
```shell
  npm run list
```

即可生成如下的配置文件：
```shell
  {"/static/umi.js":"/static/umi.5d16e536.js","/static/umi.css":"/static/umi.edb13819.css"}
```

