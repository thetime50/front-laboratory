


- [**n-puzzle-solver**][n-puzzle-solver-cpp] 2019-04-03 C++：DFS/BFS/BestFS 求解 N 数码
- 非标准启发函数
    - [**N-Puzzle-Solver**][n-puzzle-solver-c] 2024-08-06 C：A*，含“广义线性冲突”等启发式
    - [**N-Puzzle**][n-puzzle-anya] 2021-07-13 A* + 多种启发式，强调速度（目标约 10s 内解 3 阶）
- 非传统 A* IDA* BFS
    - [**N-AI**][n-ai] 2025-04-03 Python：N 数码通用求解（A*/IDS/遗传等）
    - [EightQueensAndPuzzle][eight-queens-puzzle] 2017-11-01 局部搜索：爬山/随机重启爬山/模拟退火等（八数码+八皇后）
    - [AI-Homework][ai-homework] 2022-10-02 Python：A*/BFS/DFS 及粒子群、遗传、蚁群等算法对比，适合学习
- 神经网络启发
    - [empirical-admissible-neural-heuristics][neural-heuristics] 2026-07-30 神经可采纳启发式 + A*，含 8 数码预训练模型（SOTA 方向）
- 其他标准算法参考
    - [AI_8puzzle][ai-8puzzle] 2024-09-30 Python：BFS/DFS/A*（曼哈顿距离），输出路径、耗时、内存等统计
    - [npuzzle-solvers][npuzzle-solvers] 2021-07-17 C++：多种搜索算法，可处理 8/15 数码，偏高效工具 广度优先搜索图 贪婪的最佳优先搜索 A* IDA* IDDFS
    - [8-Puzzle-AI][eight-puzzle-ai] 2025-07-05 Python：A* 等搜索策略教学向实现，注释/设计较清晰
    - [eight-puzzle-search][eight-puzzle-search] 2022-10-24 Python 包：八数码搜索学习/快速集成


- 文章
    - [CPU上0.0022S的九宫算法][cpu-0022s-jiugong] - 博客/实现参考（原文链接未收录，文档仅提标题；偏 IDA* 极速九宫/八数码）
    - [八数码问题强化版：十五数码问题idA*版本][ida-15-fujudge] 2017-08-19 博客：十五数码 IDA* 实现讲解与代码
 

| 项目 | n×n | DFS/BFS/BestFS | A* | IDS/IDA* | 遗传/PSO/蚁群 | 局部搜索 | 神经启发 |
| :--- | :---: | :--- | :--- | :---: | :---: | :--- | :--- |
| [n-puzzle-solver][n-puzzle-solver-cpp] | √ | DFS BFS BestFS |  |  |  |  |  |
| [N-Puzzle-Solver][n-puzzle-solver-c] | √ |  | 广义线性冲突 |  |  |  |  |
| [N-Puzzle][n-puzzle-anya] | √ |  | hamming<br/>euclidean<br/>nilsson<br/>outRowCol 等 |  |  |  |  |
| [N-AI][n-ai] | √ | BestFS | √ | √ IDS | √ |  |  |
| [EightQueensAndPuzzle][eight-queens-puzzle] |  |  |  |  |  | 爬山<br/>随机重启<br/>模拟退火 |  |
| [AI-Homework][ai-homework] |  | DFS BFS | √ |  | √ |  |  |
| [empirical-admissible-neural-heuristics][neural-heuristics] |  |  | √ |  |  |  | √ |

[ai-homework]: https://github.com/Jaytain/AI-Homework

[ai-8puzzle]: https://github.com/gksdusql94/AI_8puzzle
[n-puzzle-solver-c]: https://github.com/jackr276/N-Puzzle-Solver
[cpu-0022s-jiugong]: https://www.baidu.com/s?wd=CPU%E4%B8%8A0.0022S%E7%9A%84%E4%B9%9D%E5%AE%AB%E7%AE%97%E6%B3%95
[ida-15-fujudge]: https://www.cnblogs.com/fujudge/p/7398153.html
[neural-heuristics]: https://github.com/siddzzzz/empirical-admissible-neural-heuristics
[n-ai]: https://github.com/MatiasBrizzio/N-AI
[n-puzzle-solver-cpp]: https://github.com/din0s/n-puzzle-solver
[n-puzzle-anya]: https://github.com/anyaschukin/N-Puzzle
[eight-queens-puzzle]: https://github.com/HYPJUDY/EightQueensAndPuzzle
[eight-puzzle-ai]: https://github.com/Akhan521/8-Puzzle-AI
[npuzzle-solvers]: https://github.com/pprobst/npuzzle-solvers
[eight-puzzle-search]: https://github.com/Vincy1230/eight-puzzle-search
