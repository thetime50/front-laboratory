## 5*5 boardDiAstarOpt


### 剪枝配置测试

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


20,22,23,6,12,17,8,4,0,3,21,11,14,10,18,15,1,2,7,24,5,9,19,16,13 **
20,22,23,6,12,24,17,8,4,0,3,21,11,14,10,18,15,1,2,7,5,9,19,16,13 **
无: 超时 已遍历31.929498M,耗时392.059s,千次耗时12.279ms...
USE_PDB: 已遍历31.306064M,耗时467.085s,千次耗时14.920ms...
USE_MEET_BOUND: 
USE_MM: 
three_all: 
USE_FRONT_TO_FRONT: 




**boardBiAstarWin**
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

**boardBiAstarWasm**
3x1: Done(开窗):还原路径185步,遍历状态0.096M,耗时1.730s,千次耗时17.992ms, 窗数10


当起始状态或者有数字复位后，找空白格四周8格内的开窗区数字/已开窗区数字，如果没有，或者找到的都是复位状态，那么进入引导模式，由近到远找到第一个未复位的开窗数字（此时8格内已经找过了），直接生成路径将空白格移到这个数字旁边（避开已复位数字）