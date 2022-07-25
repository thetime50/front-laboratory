
import { cloneDeep, shuffle } from "lodash"


export class Node {
    id: number;
    name: string;
    x: number;
    y: number;
    constructor(id: number, x: number, y: number) {
        this.id = id;
        this.name = 'name-' + id
        this.x = x;
        this.y = y;
    }
}
export class Edge {
    source: number;
    target: number;
    constructor(source: number, target: number) {
        this.source = source;
        this.target = target;
    }
}

export class Result {
    constructor(public nodes: Array<Node>, public links: Array<Edge>) {
    }
}

export class ForceDirectedLayout {

    /**
     * A force directed graph layout implementation by liuchang on 2018/05/10.
     */
    public CANVAS_WIDTH = 1000
    public CANVAS_HEIGHT = 1000
    k: number;
    mDxMap: {
        [key: number]: number
    } = {};
    mDyMap: {
        [key: number]: number
    } = {};
    mDxFilterMap: {
        [key: number]: number
    } = {};
    mDyFilterMap: {
        [key: number]: number
    } = {};
    avgMove = 0
    mNodeMap: {
        [key: string]: Node
    } = {};
    dragNode?: Node = undefined

    constructor(
        public mNodeList: Array<Node> = [],
        public mEdgeList: Array<Edge> = [],
        public updateCb?: (res: Result) => void,
        public getSize?: () => [number, number],
    ) {

        this.k = Math.sqrt(this.CANVAS_WIDTH * this.CANVAS_HEIGHT / this.mNodeList.length); // 屏幕系数 单位元素所占面积的开方
        for (let i = 0; i < this.mNodeList.length; i++) {
            const node = this.mNodeList[i];
            if (node) {
                this.mNodeMap[node.id] = node; // node kv map
            }
        }

        this.grapthUpdate = this.grapthUpdate.bind(this);
    }

    forceDirectedUpdate() {
        if (this.getSize) {
            const size = this.getSize();
            this.CANVAS_WIDTH = 1000//size[0];
            this.CANVAS_HEIGHT = 1000//size[1];
            this.k = Math.sqrt(this.CANVAS_WIDTH * this.CANVAS_HEIGHT / this.mNodeList.length); // 屏幕系数 单位元素所占面积的开方
        }

        this.calculateRepulsive(); // 遍历节点 两两斥力计算
        this.calculateTraction(); // 根据关系边计算引力
        this.updateCoordinates(); // 坐标赋值 边缘处理
        return cloneDeep(new Result(this.mNodeList, this.mEdgeList));
    }


    /**
     * 计算两个Node的斥力产生的单位位移。
     * Calculate the displacement generated by the repulsive force between two nodes.*
     */
    calculateRepulsive() {
        let ejectFactor = 6; // 引力倍数
        let distX, distY, dist;
        if (!this.k) {
            return
        }
        for (let i = 0; i < this.mNodeList.length; i++) {
            this.mDxMap[this.mNodeList[i].id] = 0.0;
            this.mDyMap[this.mNodeList[i].id] = 0.0;
            for (let j = 0; j < this.mNodeList.length; j++) {
                if (this.mNodeList[i].id === this.dragNode?.id) {
                    continue;
                }
                if (i !== j) {
                    distX = this.mNodeList[i].x - this.mNodeList[j].x;
                    distY = this.mNodeList[i].y - this.mNodeList[j].y;
                    dist = Math.sqrt(distX * distX + distY * distY);

                    if (dist < 30) {
                        ejectFactor = 5;
                    }
                    if (dist && dist > 0 && dist < 250) {
                        const id = this.mNodeList[i].id;
                        this.mDxMap[id] = this.mDxMap[id] + distX / dist * this.k * this.k / dist * ejectFactor; // G(Mm/r**2 )  m=1 G=ejectFactor
                        this.mDyMap[id] = this.mDyMap[id] + distY / dist * this.k * this.k / dist * ejectFactor;
                    }
                }
            }
        }
    }

    /**
     * 计算Edge的引力对两端Node产生的引力。
     * Calculate the traction force generated by the edge acted on the two nodes of its two ends.
     */
    calculateTraction() {
        const condenseFactor = 3;
        for (let e = 0; e < this.mEdgeList.length; e++) {
            const eStartID = this.mEdgeList[e].source;
            const eEndID = this.mEdgeList[e].target;
            const startNode = this.mNodeMap[eStartID];
            const endNode = this.mNodeMap[eEndID];

            if (!startNode) {
                console.log("Cannot find start node id: " + eStartID + ", please check it out.");
                return;
            }
            if (!endNode) {
                console.log("Cannot find end node id: " + eEndID + ", please check it out.");
                return;
            }
            const distX = startNode.x - endNode.x,
                distY = startNode.y - endNode.y,
                dist = Math.sqrt(distX * distX + distY * distY);
            if (this.mNodeList[eStartID].id !== this.dragNode?.id) {
                this.mDxMap[eStartID] = this.mDxMap[eStartID] - distX * dist / this.k * condenseFactor; // 线性弹力计算
                this.mDyMap[eStartID] = this.mDyMap[eStartID] - distY * dist / this.k * condenseFactor;
            }
            if (this.mNodeList[eEndID].id !== this.dragNode?.id) {
                this.mDxMap[eEndID] = this.mDxMap[eEndID] + distX * dist / this.k * condenseFactor;
                this.mDyMap[eEndID] = this.mDyMap[eEndID] + distY * dist / this.k * condenseFactor;
            }
        }
    }

    /**
     * 更新坐标。
     * update the coordinates.
     */
    updateCoordinates() {
        const maxt = 4, maxty = 3; //Additional coefficients.
        const firstOrderfilter = (oldVal: number, newVal: number, oldRate = 0.98) => {
            return oldVal * oldRate + newVal * (1 - oldRate);
        }
        let newAvgMove = 0
        for (let v = 0; v < this.mNodeList.length; v++) {
            const node = this.mNodeList[v];
            let dx = Math.floor(this.mDxMap[node.id]);
            let dy = Math.floor(this.mDyMap[node.id]);

            if (dx < -maxt) dx = -maxt;
            if (dx > maxt) dx = maxt;
            if (dy < -maxty) dy = -maxty;
            if (dy > maxty) dy = maxty;

            if (this.mDxFilterMap[node.id] === undefined) {
                this.mDxFilterMap[node.id] = dx;
            } else {
                this.mDxFilterMap[node.id] = firstOrderfilter(this.mDxFilterMap[node.id], dx);
            }
            if (this.mDyFilterMap[node.id] === undefined) {
                this.mDyFilterMap[node.id] = dy;
            } else {
                this.mDyFilterMap[node.id] = firstOrderfilter(this.mDyFilterMap[node.id], dy);
            }
            newAvgMove += Math.abs(this.mDxFilterMap[node.id]) + Math.abs(this.mDyFilterMap[node.id]);

            const entRate = this.avgMove * 100
            if (entRate < 1) {
                dx = dx * entRate ** 2
                dy = dy * entRate ** 2
            }

            node.x = node.x + dx >= this.CANVAS_WIDTH || node.x + dx <= 0 ? node.x - dx : node.x + dx;
            node.y = node.y + dy >= this.CANVAS_HEIGHT || node.y + dy <= 0 ? node.y - dy : node.y + dy;
        }
        newAvgMove = newAvgMove / this.mNodeList.length / this.k
        // console.log('newAvgMove', newAvgMove)
        this.avgMove = newAvgMove
    }


    cnt = 0;
    i = 0;
    animationFrame?: number = undefined
    grapthUpdate() {
        // if(i++ % 40 == 0){
        // mNodeList 循环计算 但是在设置给chart 时会拷贝一份
        const res = this.forceDirectedUpdate();
        this.updateCb && this.updateCb(res);
        // }
        if (/* cnt++ < 100 && */ !this.animationFrame) { // eslint-disable-line
            this.animationFrame = requestAnimationFrame(() => {
                this.animationFrame = undefined
                this.grapthUpdate()
            });
        }
    }

    handleMouseDown(node: Node) {
        this.dragNode = this.mNodeList.find(v => v.id == node.id)
    }

    mouseUpTimer?: number = undefined
    handleMouseMove(/* e: EvtDef['mouseMove'] */[x, y]: [number, number]) {
        if (this.dragNode) {
            this.dragNode.x = x
            this.dragNode.y = y
            // console.log('handleMouseMove', e,dragNode , dragNode.x,dragNode.y,trans)
            if (this.mouseUpTimer) {
                clearTimeout(this.mouseUpTimer)
                this.mouseUpTimer = undefined
            }
        }
    }

    handleMouseUp(node: Node) {
        if (this.dragNode && this.dragNode.id == node.id) {
            // console.log('handleMouseUp', e)

            if (this.mouseUpTimer) {
                clearTimeout(this.mouseUpTimer)
                this.mouseUpTimer = undefined
            }
            this.mouseUpTimer = setTimeout(() => {
                this.dragNode = undefined
                this.mouseUpTimer = undefined
            }, 400)
        }
    }

    destroy() {
        if (this.mouseUpTimer) {
            clearTimeout(this.mouseUpTimer)
            this.mouseUpTimer = undefined
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame)
            this.animationFrame = undefined
        }
    }
}


export class ForceDirectedLayout_1 extends ForceDirectedLayout {
    // constructor(
    //     public mNodeList: Array<Node> = [],
    //     public mEdgeList: Array<Edge> = [],
    //     public updateCb?: (res: Result) => void,
    //     public getSize?: () => [number, number],) {
    //     super()
    // }
    /**
     * 更新坐标。
     * update the coordinates.
     */
    updateCoordinates() {
        const maxt = 4, maxty = 3; //Additional coefficients.
        const firstOrderfilter = (oldVal: number, newVal: number, oldRate = 0.98) => {
            return oldVal * oldRate + newVal * (1 - oldRate);
        }
        let newAvgMove = 0
        const nodeList = shuffle(this.mNodeList) // 这个没什么效果
        // const nodeList = this.mNodeList

        for (let v = 0; v < nodeList.length; v++) {
            const node = nodeList[v];
            let dx = Math.floor(this.mDxMap[node.id]);
            let dy = Math.floor(this.mDyMap[node.id]);

            if (dx < -maxt) dx = -maxt;
            if (dx > maxt) dx = maxt;
            if (dy < -maxty) dy = -maxty;
            if (dy > maxty) dy = maxty;

            if (this.mDxFilterMap[node.id] === undefined) {
                this.mDxFilterMap[node.id] = dx;
            } else {
                this.mDxFilterMap[node.id] = firstOrderfilter(this.mDxFilterMap[node.id], dx);
            }
            if (this.mDyFilterMap[node.id] === undefined) {
                this.mDyFilterMap[node.id] = dy;
            } else {
                this.mDyFilterMap[node.id] = firstOrderfilter(this.mDyFilterMap[node.id], dy);
            }
            newAvgMove += Math.abs(this.mDxFilterMap[node.id]) + Math.abs(this.mDyFilterMap[node.id]);

            const entRate = this.avgMove * 100
            // console.log('entRate', entRate)
            if (entRate < 1) {
                dx = dx * entRate
                dy = dy * entRate
            }

            node.x = node.x + dx >= this.CANVAS_WIDTH || node.x + dx <= 0 ? node.x - dx : node.x + dx;
            node.y = node.y + dy >= this.CANVAS_HEIGHT || node.y + dy <= 0 ? node.y - dy : node.y + dy;
        }
        newAvgMove = newAvgMove / this.mNodeList.length / this.k
        // console.log('newAvgMove', newAvgMove)
        this.avgMove = newAvgMove
    }
}