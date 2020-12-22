# DICOM2D

- 需求分析
  - 展示窗口
    - 二分屏
    - 四分屏
    - (自定义分屏 拖拽尺寸)
  - 文件列表
    - (文件/文件夹上传)  
      文件 文件夹选择 拖拽
  - 缩放工具按钮
  - 分屏布局工具
  - 标注工具
  - /---
  - 图像工具
    - 反相
    - 水平/垂直镜像
    - 平移
    - 同步缩放 独立缩放 
      以屏幕比例为准 
    - 放大镜
    - 测量


- 技术分析
  - 文件导入  
    使用amijs cornerstone没有用CND  
    amijs api学习  
    https://github.com/FNNDSC/ami/tree/master/examples/viewers_upload
  - 标注 测量
    使用zrender 方便交互
  - 反相
    canvas效果 <s>或者样式滤镜</s>


