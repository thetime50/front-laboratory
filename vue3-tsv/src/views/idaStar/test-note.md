
## 剪枝配置测试
### 5*5
#### boardDiAstarOpt
4,8,18,21,5,16,9,10,7,2,23,15,11,13,17,3,20,14,22,12,0,6,24,1,19
解
u,u,l,l,u,u,r,r,r,r,d,l,l,u,l,d,l,d,d,d,r,u,u,r,d,l,u,r,u,u,l,d,l,d,d,d,r,r,r,u,l,u,l,u,r,r,u,l,l,l,d,d,d,r,r,d,l,u,u,r,d,l,u,u,r,r,r,u,l,l,l,l,d,r,r,d,l,l,u,r,r,r,r,u,l,l,l,d,r,r,u,l,d,l,d,d,r,d,r,u,u,r,d,l,l,u,r,r,d,l,l,u,r,r,d,d

无: Done:还原路径116步,遍历状态13.374M,清理内存12659条,耗时125.217s,千次耗时9.363ms
USE_PDB: 
USE_MEET_BOUND: 
USE_MM: 
three_all: 
USE_FRONT_TO_FRONT: 
win 3x1: Done(开窗):还原路径220步,遍历状态0.024M,耗时0.270s,千次耗时11.464ms, 窗数10


4,8,11,24,6,23,18,5,7,12,21,15,22,2,14,1,20,19,17,3,9,0,10,16,13
解
d,d,d,l,d,l,u,u,l,d,r,u,u,l,d,d,d,r,u,r,u,l,d,l,u,r,u,r,u,r,d,r,d,d,l,l,d,r,u,u,l,l,d,r,u,r,d,l,d,r,u,u,l,l,d,r,r,u,l,u,r,d,r,u,l,l,l,d,r,r,u,u,l,l,l,d,r,r,r,u,r,d,l,u,l,d,r,u,l,l,l,d,r,r,d,r,u,u,l,d,r,r,u,l,l,d,r,d,l,d d,r,r,u,l,d,l,u,u,r,d,r,d

无: Done:还原路径123步,遍历状态15.139M,清理内存19018条,耗时144.263s,千次耗时9.529ms
USE_PDB Done:还原路径123步,遍历状态15.121M,清理内存19026条,耗时144.113s,千次耗时9.530ms
USE_MEET_BOUND: 已遍历24.050832M,耗时286.651s,千次耗时11.919ms...  Uncaught (in promise) RangeError: Too many properties to enumerate
USE_MM：已遍历16.106415M,耗时194.431s,千次耗时12.072ms... Uncaught (in promise) RangeError: Too many properties to enumerate
three_all: 已遍历16.106415M,耗时319.119s,千次耗时19.813ms... Uncaught (in promise) RangeError: Too many properties to enumerate
USE_FRONT_TO_FRONT: 已遍历31.366506M,耗时759.711s,千次耗时24.220ms... Uncaught (in promise) RangeError: Too many properties to enumerate
win 3x1: Done(开窗):还原路径245步,遍历状态0.099M,耗时0.803s,千次耗时8.137ms, 窗数10


?wc=5&hc=5&board=20,22,23,6,12,17,8,4,0,3,21,11,14,10,18,15,1,2,7,24,5,9,19,16,13
?wc=5&hc=5&board=20,22,23,6,12,24,17,8,4,0,3,21,11,14,10,18,15,1,2,7,5,9,19,16,13
无: 超时 已遍历31.929498M,耗时392.059s,千次耗时12.279ms...
USE_PDB: 已遍历31.306064M,耗时467.085s,千次耗时14.920ms...
USE_MEET_BOUND: 
USE_MM: 
three_all: 
USE_FRONT_TO_FRONT: 




**boardAstarWin**
解
d,d,r,r,r,u,r,d,l,u,l,d,r,d,l,l,l,u,u,r,d,l,d,r,u,r,r,u,r,u,l,u,r,d,d,d,d,l,l,l,u,r,r,r,u,l,u,l,d,r,u,u,l,d,l,d,r,u,r,r,d,d,d,l,l,u,u,u,r,u,l,l,d,r,u,l,d,l,u,r,r,d,l,d,l,d,d,r,r,u,u,r,u,l,u,r,d,l,d,d,r,u,u,l,d,r,r,d,d,l,u,u,r,d,l,u,u,r,d,d,l,l,l,u,l,d,r,r,u,u,l,l,d,r,u,r,r,d,d,l,l,d,l,u,u,r,d,d,l,u,r,r,u,l,l,d,r,u,r,d,d,l,u,l,d,r,r,r,r,u,l,d,l,u,r,r,d,l,u,l,d,r,r
win 4x4: Done(开窗):还原路径209步,遍历状态6.657M,耗时66.863s,千次耗时10.045ms, 窗数4
win 3x3: 开窗(0,0,3x3) 已遍历16.621361M,耗时183.822s,千次耗时11.059ms... Uncaught (in promise) RangeError: Too many properties to enumerate
win 3x2: Done(开窗):还原路径243步,遍历状态0.586M,耗时4.938s,千次耗时8.425ms, 窗数6
win 2x2: Done(开窗):还原路径251步,遍历状态0.111M,耗时0.861s,千次耗时7.752ms, 窗数9
win 1x1: Done(开窗):还原路径209步,**遍历状态0.035M**,耗时0.294s,千次耗时8.354ms, 窗数25
win 3x1: Done(开窗):还原路径185步,遍历状态0.096M,耗时0.631s,千次耗时6.563ms, 窗数10 ** 
win 2x1: Done(开窗):还原路径207步,遍历状态0.708M,耗时5.949s,千次耗时8.407ms, 窗数15
win 5x1: Done(开窗):**还原路径183步**,遍历状态0.650M,耗时5.992s,千次耗时9.220ms, 窗数5

**BoardAstarWasm**
3x1: Done(开窗):还原路径185步,遍历状态0.096M,耗时1.730s,千次耗时17.992ms, 窗数10
整数/字节 key（不要 string）、少分配、相邻距离增量更新:
Done(开窗):还原路径185步,遍历状态0.096M,耗时0.414s,千次耗时4.306ms, 窗数10

减少js_now_ms，emitTickWin
Done(开窗):还原路径185步,遍历状态0.096M,耗时0.420s,千次耗时4.368ms, 窗数10
编译参数:
Done(开窗):还原路径185步,遍历状态0.096M,耗时0.408s,千次耗时4.243ms, 窗数10
少 loadBoard,盘面 stride 用 n 不是 MAX_N
Done(开窗):还原路径185步,遍历状态0.096M,耗时0.333s,千次耗时3.463ms, 窗数10
visit 表 将 Map<u64,i32> 改成开地址哈希表（纯数组）（代码多效果不好撤销）
Done(开窗):还原路径185步,遍历状态0.096M,耗时0.343s,千次耗时3.567ms, 窗数10


**swindow**

**wasm swindow**
3x2: Done(开窗):还原路径193步,遍历状态0.867M,耗时5.580s,千次耗时6.436ms, 窗数8


### 6*6
?wc=6&hc=6&board=0,25,32,10,21,23,34,35,1,17,2,11,30,13,12,29,19,7,26,6,14,5,33,24,3,4,9,8,22,15,18,28,16,31,20,27
解 r,u,l,d,r,u,r,r,d,l,u,r,d,l,l,u,r,d,d,d,d,l,l,l,u,r,d,l,u,u,r,r,d,d,d,r,r,u,u,u,l,d,l,l,l,d,d,r,r,r,r,u,r,u,u,l,u,l,d,d,l,d,l,u,u,l,d,r,u,u,r,r,d,d,r,u,u,l,u,r,d,l,d,d,d,r,u,u,u,r,d,d,l,u,l,d,d,r,u,u,r,u,u,l,l,d,d,r,u,r,d,l,u,u,r,d,d,l,u,l,l,l,l,d,d,r,u,r,r,u,l,d,l,u,r,d,r,d,d,l,d,l,u,u,u,r,d,d,l,u,l,d,d,r,r,u,r,d,r,r,u,u,u,l,u,l,d,r,u,l,d,l,u,r,r,d,l,u,l,r,d,d,l,u,l,d,r,r,u,u,l,d,r,d,d,r,u,l,l,l,d,r,r,u,u,l,d,d,r,r,d,l,l,l,u,u,r,d,l,d,r,u,r,u,l,d,l,u,r,r,d,l,l,l,d,r,u,r,r,d,r,r,u,l,d,l,l,l,l,u,r,r,r,r,r,d,l,l,l,u,r,d,l,u,l,l,d,r,r,r,u,l,l,d,l,u,r,r,r,d,r,u,l,d,r,r,u,l,l,d,r,u,r,d

还原第二块的时候绕远路



js win 单向: Done(开窗):还原路径290步,遍历状态1.655M,耗时17.958s,千次耗时10.850ms, 窗数10
js win 双向: Done(开窗):还原路径288步,遍历状态3.214M,耗时39.440s,千次耗时12.270ms, 窗数10
**5*5**
单向 Done(开窗):还原路径193步,遍历状态0.867M,耗时7.842s,千次耗时9.044ms, 窗数8
双向 Done(开窗):还原路径153步,遍历状态1.227M,耗时11.939s,千次耗时9.728ms, 窗数8


**双向逻辑**对**开窗**没有太大优化，在两个做不到1+1>2
因为正向解出一个窗 和反向解出一个窗时他们窗外的状态并不相等，所以双向更看重全局逻辑，开窗这种局部优化思路上不上一致的
开窗是窗内强引导，窗外弱引导，来减少搜索空间
双向是全局向对向还原，直至中心相遇
对于开窗来说如果引入全局命中逻辑就失去了局部强引导减少搜索空间的优势的，而窗外的状态又混乱的 巨大的，双向来说就是巨大的搜索空间





当起始状态或者开窗内数字复位后，找空白格四周8格内的开窗区数字/已开窗区数字，如果没有，或者找到的都是复位状态，那么进入引导模式，由近到远找到第一个未复位的开窗数字（此时8格内已经找过了），直接生成路径将空白格移到这个数字旁边（避开已复位数字）

引导模式 变量控制开关
win行锁定 释放内存
