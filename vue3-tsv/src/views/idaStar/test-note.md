
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


**双向逻辑**对**开窗**没有太大优化，在两个做不到1+1>2，甚至搜索空间爆炸
因为正向解出一个窗 和反向解出一个窗时他们窗外的状态并不相等，所以双向更看重全局逻辑，开窗这种局部优化思路上不上一致的
开窗是窗内强引导，窗外弱引导，来减少搜索空间
双向是全局向对向还原，直至中心相遇
对于开窗来说如果引入全局命中逻辑就失去了局部强引导减少搜索空间的优势的，而窗外的状态又混乱的 巨大的，双向来说就是巨大的搜索空间


**距离引导加边界引导** (6*6)
- 4dx?2b: Done(引导):还原路径334步,遍历状态1.537M,清理内存2177条,耗时24.451s,千次耗时15.913ms
- 4d+?2b: Done(引导):还原路径334步,遍历状态2.372M,清理内存6270条,耗时41.460s,千次耗时17.479ms
- 阶段清空 mustDone: Done(引导):还原路径348步,遍历状态6.946M,清理内存25871条,耗时80.386s,千次耗时11.573ms
- 阶段close mustDone: Done(引导):还原路径348步,遍历状态6.963M,清理内存25860条,耗时78.522s,千次耗时11.277ms

增加复位权重
- 阶段close: Done(引导):还原路径464步,遍历状态0.329M,清理内存0条,耗时3.432s,千次耗时10.422ms
- 阶段close mustDown: Done(引导):还原路径4758步,遍历状态0.028M,清理内存0条,耗时0.453s,千次耗时16.443ms
- 阶段close 增加reopen: Done(引导):还原路径15738步,遍历状态0.087M,清理内存0条,耗时1.151s,千次耗时13.239ms
- 阶段close 改为foruc add触发重启 而不是down:   
  Done(引导):还原路径288步,遍历状态0.458M,清理内存0条,耗时4.650s,千次耗时10.160ms


?wc=6&hc=6&board=10,12,2,9,21,13,29,25,17,8,32,11,34,19,1,6,23,0,22,26,16,15,24,33,14,3,35,30,31,7,28,4,18,5,27,20
- Done(开窗):还原路径354步,遍历状态1.683M,耗时13.521s,千次耗时8.034ms, 窗数15 winW 2 winH 1 ww 4
- Done(cell):还原路径412步,遍历状态0.827M,耗时8.159s,千次耗时9.869ms, 格数28 ew: 2, gw: 3
- Done(cell):还原路径332步,遍历状态0.628M,耗时6.387s,千次耗时10.176ms, 格数25 ew: 0.2, gw: 1.05
- Done(cgroup):还原路径334步,遍历状态1.132M,耗时11.411s,千次耗时10.078ms, 组数10 ew: 0.2, gw: 1.05, gs: 3
- Done(cgroup):还原路径318步,遍历状态1.113M,耗时9.829s,千次耗时8.829ms, 组数10 ew: 0.2, gw: 1.05, gs: 4
- Done(cgroup):还原路径296步,遍历状态3.468M,耗时37.455s,千次耗时10.801ms, 组数7 ew: 0.2, gw: 1.05, gs: 5
- Done(cgroup):还原路径278步,遍历状态3.963M,耗时42.393s,千次耗时10.697ms, 组数6 ew: 0.2, gw: 1.05, gs: 6
- Done(cgroup):还原路径274步,遍历状态4.368M,耗时47.091s,千次耗时10.782ms, 组数5 ew: 0.2, gw: 1.05, gs: 7

... 31,20,27
- Done(开窗):还原路径290步,遍历状态1.655M,耗时15.752s,千次耗时9.517ms, 窗数10 wiW: 3, wiH: 1, ww: 4
- Done(cell):还原路径334步,遍历状态1.194M,耗时11.499s,千次耗时9.633ms, 格数29 ew: 0.2, gw: 1.05
- Done(cgroup):还原路径252步,遍历状态0.094M,耗时0.828s,千次耗时8.786ms, 组数12 ew: 0.2, gw: 1.05, gs: 3
- Done(cgroup):还原路径298步,遍历状态0.879M,耗时8.471s,千次耗时9.632ms, 组数10 ew: 0.2, gw: 1.05, gs: 4
- Done(cgroup):还原路径228步,遍历状态0.358M,耗时3.475s,千次耗时9.706ms, 组数8 ew: 0.2, gw: 1.05, gs: 5
- Done(cgroup):还原路径242步,遍历状态0.164M,耗时1.487s,千次耗时9.080ms, 组数5 ew: 0.2, gw: 1.05, gs: 6
- Done(cgroup):还原路径252步,遍历状态0.154M,耗时1.332s,千次耗时8.648ms, 组数5 ew: 0.2, gw: 1.05, gs: 7

- http://localhost:3000/front-laboratory/vue3-tsv/dist/#/idaStar?wc=7&hc=7&board=33,4,2,11,6,10,22,0,18,16,8,23,32,17,48,1,25,34,43,20,13,44,14,19,42,7,36,12,31,29,30,9,26,40,3,27,37,39,41,46,24,47,38,35,28,21,45,15,5
- Done(cell):还原路径534步,遍历状态0.567M,耗时6.584s,千次耗时11.610ms, 格数39 ew: 0.2, gw: 1.05
- Done(cgroup):还原路径374步,遍历状态2.956M,耗时36.827s,千次耗时12.456ms, 组数10 ew: 0.2, gw: 1.05, gs: 5
- Done(cgroup):还原路径356步,遍历状态3.014M,耗时38.552s,千次耗时12.790ms, 组数7 ew: 0.2, gw: 1.05, gs: 6
- Done(cgroup):Too many properties to enumerate 已遍历14.912872M,耗时239.566s,千次耗时16.064ms..., ew: 0.2, gw: 1.05, gs: 7


### 路径（越短越好）
| 盘 | 最短 | 最长 | 趋势 |
|--|--|--|--|
| A | cgroup gs6–7（~275） | cell 强权 / 弱权（366–424） | **gs↑ → 步数↓** |
| B | cgroup gs5（228） | cell（360） | gs 中等最好，再大略回升 |

### 搜索量 / 耗时
| 盘 | 最省 | 最贵 | 趋势 |
|--|--|--|--|
| A | cell 强权（极省） | cgroup gs↑（到 4M+ / 47s） | **gs↑ 明显变慢** |
| B | cgroup gs3（很快） | win / cell（~1.6M） | 这盘 cgroup 全面压过 win/cell |

### 总结
- 要短路径 → Cgroup（两盘都赢）
- 要快/少搜 → 看盘：A 用强权重 Cell，B 用小 gs Cgroup
- Win 中庸：步数、搜索都不是最优，但比 Cell 稳、比大 gs Cgroup 便宜
- 一般group=width-1会得到较好的步数

- [x] 距离引导 focus待选中选距离 空格到数字到目标(*5 *3)

选窗逻辑
