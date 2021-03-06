# DICOM README

- 项目预览 https://thetime50.github.io/front-laboratory/dicom/dist/index.html#/demo/dicom  
  国内 http://thetime50.com/front-laboratory/dicom/dist/index.html#/demo/dicom
- cornerstoneWADOImageLoader demo https://thetime50.github.io/front-laboratory/dicom/dist/index.html#/cornerstone/dicomfile  
  国内 http://thetime50.com/front-laboratory/dicom/dist/index.html#/cornerstone/dicomfile
- ami demo https://thetime50.github.io/front-laboratory/dicom/dist/index.html#/ami/ami-start  
  国内 http://thetime50.com/front-laboratory/dicom/dist/index.html#/ami/ami-start

## 基础功能分析规划

- DICOM 数据
  - (本地文件读取和解析??)
  - json info
  - img
  - 服务(第二期)
    - 后端源文件预处理
- 3d show
  - three - image
  - 阵列 选中 显示
  - 高亮计算
  - 透明度计算
    - opencv
    - 其他库
    - three自带?
    - pixijs
  - 动画效果
    - step1 anime
    - step2 Three动画支持
- 图像处理 专业处理 分独立包 用不同实现

### v0.0.1
***（已完成 2020-08-04）***
- 文件解析 
- 3d 呈现
- 透明度模式
- 亮度线性区间
- 图片序列区间 单片
- demo文件下载和提示

### v0.0.2
- 骨骼 组织 着色
- 多文件和压缩包上传
- 亮度曲线
- 3d选中动画

## 技术点分析
- 矩阵运算
  - numjs
  - panda?
  - gl ?
  - other
- 图像处理

## 项目产品能力体现
- 专业领域信息收集
  - 更专业系统的信息? 广度? 细分?
- 应用实现技术栈整理 收集 构建
- 基本的产品专业功能规划设计

## 软件调研和功能分析
### 参考软件
- 参考软件
  - pc
    - RadiAnt DICOM Viewer (64-bit)
    - MicroDicom-3.4.7-x64
    - 小赛看看 DICOM Viewer
  - web
    - https://www.dicomgo.com/dgv/viewer#/view
    - http://yunyuepian.weiyunyingxiang.com/preview.html

- **基础功能**
  - 浏览文件夹
  - 分屏浏览 多屏同步
  - 根据密度?过滤 脑 骨 胸 肺 腹等(考虑设备参数?)
  - 缩放平移
  - 尺寸标注
  - 镜像
  - 播放
- **RadiAnt 特性**
  - 3D MPR (正交切片)
  - 3D 渲染重现(很惊讶于设备的精度，好像是毫米级的)
    - 保存视图
    - 标注
    - 区分组织 3D重现
    - 手术刀 (任意界面)
- **MicroDicom**
  - 打开文件夹有点费劲
  - 连接DICOM serve 过滤信息
  - 界面好看点,就没啥特点了
- **小赛看看**
  - 打开大量文件有点卡
  - MIP
- **dicomgo**
  - 基础功能
  - 文件夹上传查看没成功
- **weiyunyingxiang**
  - 基础功能
  - 选择多文件导入

### 目前采用下面的数据集做测试
- https://github.com/beamandrew/medical-data
- https://wiki.cancerimagingarchive.net/display/Public/CT+COLONOGRAPHY#
- https://wiki.cancerimagingarchive.net/display/Public/LIDC-IDRI#

## 开发日志

### 2020-07-25
详细分析查看[## 软件调研和功能分析](#软件调研和功能分析)
#### DICOM公开数据搜集
- [10大行业公开数据集免费下载：医疗行业](https://zhuanlan.zhihu.com/p/48415813)
- [有哪些获得公开的医疗数据的途径？](https://www.zhihu.com/question/19969750)
- [有哪些可以用于深度学习研究的公开医疗数据集？](https://www.zhihu.com/question/300750833/answer/1327705112)
- [医疗领域的机器学习公开数据集](https://zhuanlan.zhihu.com/p/85443984)
- [Medical Data for Machine Learning](https://github.com/beamandrew/medical-data)
#### DICOM Viewer软件调研
初步的调研 作为软件初步功能的参考

- [医学影像专业必备的DICOM Viewer软件](https://zhuanlan.zhihu.com/p/114763438)
- [Window系统有哪些好用的Dicom viewer软件，可以看彩图，并进行简单的后处理？](https://www.zhihu.com/question/293851236/answer/488435064)
- [医院的 CT 图像是如何生成的，原始图像要使用什么软件查看？](https://www.zhihu.com/question/21207956/answer/18977885)
- [医学胸部X光软件推荐： MDViewer 还是 Dicom Viewer 或者其他软件？](https://www.zhihu.com/question/63423193/answer/223216358)
- [来，带你见识一下CT三维重建](https://blog.csdn.net/fanhenghui/article/details/51036422)

### 2020-07-27
- .dcm
  - json
  - img?
    - 前端直接导入文件处理
    - 矩阵运算
  - diff 边缘检测?
    - 矩阵运算

https://github.com/cornerstonejs/cornerstone
https://github.com/search?l=JavaScript&q=medical+imaging&type=Repositories

- FNNDSC/ami 的功能挺完整的  
  [FNNDSC/ami](https://github.com/FNNDSC/ami)
- [cornerstone](https://github.com/cornerstonejs/cornerstone) 和  
  [cornerstoneWADOImageLoader](https://github.com/cornerstonejs/cornerstoneWADOImageLoader)

```cmd
::cnpm install --save ami.js
yarn add ami.js
```

yarn raw.githubusercontent.com 无法访问问题
- [配置Powershell命令行代理](https://www.dazhuanlan.com/2019/11/20/5dd55fabe0bce/)
```cmd
Set-Item Env:http_proxy "socks5://127.0.0.1:1080"
Set-Item Env:https_proxy "socks5://127.0.0.1:1080"

function set_proxy_variable {
	Set-Item Env:http_proxy "socks5://127.0.0.1:1080"  
	Set-Item Env:https_proxy "socks5://127.0.0.1:1080" 
}

function unset_proxy_variable {
    Remove-Item Env:http_proxy
    Remove-Item Env:https_proxy
}

New-Alias -Name spp -Value set_proxy_variable
New-Alias -Name upp -Value unset_proxy_variable

```
- [命令行代理]https://www.jianshu.com/p/15ddaef0ee94
```cmd
::window 命令行
set http_proxy=socks5://127.0.0.1:1080
set https_proxy=socks5://127.0.0.1:1080

::linux 命令行
export http_proxy=socks5://127.0.0.1:1080
export https_proxy=socks5://127.0.0.1:1080
```

### 2020-07-28 -29

cornerstoneWADOImageLoader 的 demo 使用的是旧版本的库,移植过来一直有问题，有些功能还没处理  
ami 的 demo 移植起来就很顺利

- cornerstoneWADOImageLoader demo https://thetime50.github.io/front-laboratory/laboratory/dist/index.html#/cornerstone/dicomfile
- ami demo https://thetime50.github.io/front-laboratory/laboratory/dist/index.html#/ami/ami-start


### 2020-07-30

- [] 读文件上传源码，获取 转换图片

### 2020-07-31

DicomThree.js整理 和视图重绘  
https://fnndsc.github.io/ami/doc/module-loaders_volumes.html

### 2020-08-01

分析 ami.VolumeLoader源码，了解数据格式和功能  
分析 cornerstoneWADOImageLoader.wadouri.fileManager.add 

### 2020-08-03

DICOM文件集阵列显示 坐标还原

### 2020-08-04

- [x] 图片序列区间 单片  
- [x] 透明度显示模式  
- [x] 亮度线性区间 getFormat  
- [x] demo文件下载的提示  

### 2020-10-28
```cmd
fatal: clone of 'git://git.code.sf.net/p/fonttools/code'
```
- Failing to build on npm
  https://github.com/FNNDSC/ami/issues/208
- Proxifier+Shadowshocks/v2ray系统全局代理  
  https://www.go2blog.cn/archives/797

使用 yarn + v2ary + proxifier 完成安装
