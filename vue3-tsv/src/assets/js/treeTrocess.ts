import { cloneDeep } from 'lodash';
type TreeItemType = Record<string,any>
type TreeType = TreeItemType|TreeItemType[]
type GetChildrenType = string | number | ((tree:TreeItemType, depth:number, path:TreeItemType[], path_i:number[])=>TreeItemType[])
type TreeCbReturnType = { skip?:boolean }|undefined
type TreeCbType = (t:TreeType, s:'before'|'after', d:number, p:TreeItemType[], pi:number[])=> TreeCbReturnType | void

type FilterTreeCbType = (tree:TreeItemType, cloneParent:TreeType, depth:number, path:TreeItemType[], path_i:number[])=>{skip:boolean,node?:TreeItemType}

type GetMatchType = string | number | ((t:TreeType, s:'before'|'after', d:number, p:TreeItemType[], pi:number[])=> boolean)
type MatchTreeNodeReturnType = {
    t?:TreeType, s?:'before'|'after', d?:number, p?:TreeItemType[], pi?:number[]
}

const traverseTree = function (
  tree:TreeType,
  getChildren:GetChildrenType,
  cb?:TreeCbType,
  beforeCb?:TreeCbType,
  afterCb?:TreeCbType,
  depth = 0,
  path:TreeItemType[] = [],
  path_i:number[] = []
) {
  /* tree         tree数据
     getChildren  获取子节点数组的方法
     cb           统一的节点回调函数 通过第二个参数"before""after"区分
                  返回undefined 或
                  {
                      skip:跳过子节点遍历
                  }
     beforeCb     进入节点回调
     afterCb      退出节点回调
     depth        节点深度
     path         历史节点记录 长度为depth+1
     path_i       历史节点标识 根节点没有索引，长度为depth
  */
  let skip:boolean|undefined = false;
  path.push(tree);
  // cb(t,s,d,p,pi)
  cb && ({ skip } = cb(tree, 'before', depth, path, path_i) || {});
  beforeCb && ({ skip } = beforeCb(tree, 'before', depth, path, path_i) || {});

  let chilArr:TreeItemType[];
  if (Array.isArray(tree) && typeof getChildren !== 'function') {
    // 数组节点自动遍历
    chilArr = tree;
  } else if (!getChildren) {
    chilArr = (tree as any).children;
  } else if (typeof getChildren === 'string' || typeof getChildren === 'number') {
    chilArr = (tree as any)[getChildren];
  } else if (typeof getChildren === 'function') {
    chilArr = getChildren(tree, depth, path, path_i);
  } else {
    throw 'unsupported types';
  }
  if (chilArr && Array.isArray(chilArr) && !skip) {
    chilArr.forEach((item, index, arr) => {
      path_i.push(index);
      traverseTree(item, getChildren, cb, beforeCb, afterCb, depth + 1, path, path_i);
      // console.log(index,depth)
      path_i.pop();
    });
  }

  cb && cb(tree, 'after', depth, path, path_i);
  afterCb && afterCb(tree, 'after', depth, path, path_i);
  path.pop();
};

// 只处理对象树
const filterTree = function (tree:TreeType, childField: string, field: string, filte: string[]) {
  let resTree :TreeItemType|undefined = undefined;
  function traverseCb(tree:TreeType, cloneParent:TreeType, depth:number, path:TreeItemType[], path_i:number[]) {
    // field path 当前遍历路径
    let node :TreeItemType| undefined = undefined;
    const fieldPathArr = path.map((v) => {
      return v[field];
    });
    const fieldPath = fieldPathArr.join('\\.');
    const fieldRePath = fieldPathArr.join('.');
    const re = RegExp(`^${fieldPath}($|\\.)`);
    const match = filte.find((v) => re.test(v));
    if (match) {
      if (fieldRePath === match) {
        node = cloneDeep(tree);
      } else {
        node = cloneDeep({
          // 去掉子节点后克隆
          ...tree,
          [childField]: [],
        });
      }
      if (!cloneParent) {
        resTree = node;
      } else {
        (cloneParent as any)[childField].push(node);
      }
    }
    const skip = !match || fieldRePath === match; // 没有匹配到或者 匹配到末端节点
    return {
      skip,
      node,
    };
  }
  function traverse(
    tree:TreeType, 
    cloneParent?:TreeType, 
    childField = 'children', 
    cb?:FilterTreeCbType, 
    depth = 0, 
    path:TreeItemType[] = [], 
    path_i:number[] = []) {
    /* 
      tree         tree数据 
      getChildren  获取子节点数组的方法
      cb           统一的节点回调函数 通过第二个参数"before""after"区分
                    返回undefined 或
                    {
                        skip:跳过子节点遍历
                    }
      beforeCb     进入节点回调
      depth        节点深度
      path         历史节点记录 长度为depth+1
      path_i       历史节点标识 根节点没有索引，长度为depth
    */
    let skip = false,
      node:TreeItemType|undefined;
    path.push(tree);
    // cb(t,s,d,p,pi)
    cb && ({ skip, node } = cb(tree, cloneParent!, depth, path, path_i) || {});

    let chilArr;
    if (typeof childField === 'string') {
      chilArr = (tree as any)[childField];
    } else {
      console.log('tree', tree);
      throw 'unsupported types';
    }
    if (chilArr && Array.isArray(chilArr) && !skip) {
      chilArr.forEach((item, index, arr) => {
        path_i.push(index);
        traverse(item, node, childField, cb, depth + 1, path, path_i);
        // console.log(index,depth)
        path_i.pop();
      });
    }

    path.pop();
  }

  traverse(tree, resTree, childField, traverseCb);
  return resTree;
};

const getTreeNode = function (tree:TreeType, getChildren:GetChildrenType, dest_pathi:number[], depth = 0, path:TreeItemType[] = []):TreeItemType {
  /* tree         tree数据
     getChildren  获取子节点数组的方法
     dest_pathi    数据的路径
     depth        节点深度
     path         历史节点记录 长度为depth+1
  */
  path.push(tree as TreeItemType);
  // cb(t,s,d,p,pi)

  let chilArr;
  if (Array.isArray(tree) && typeof getChildren !== 'function') {
    // 数组节点自动遍历
    chilArr = tree;
  } else if (!getChildren) {
    chilArr = (tree as any).children;
  } else if (typeof getChildren === 'string' || typeof getChildren === 'number') {
    chilArr = (tree as any)[getChildren];
  } else if (typeof getChildren === 'function') {
    chilArr = getChildren(tree, depth, path, dest_pathi);
  } else {
    throw 'unsupported types';
  }
  if (depth + 1 >= dest_pathi.length) {
    return chilArr[dest_pathi[depth]];
  } else {
    return getTreeNode(chilArr[dest_pathi[depth]], getChildren, dest_pathi, depth + 1, path);
  }
  path.pop();
};

function matchTreeNode(tree:TreeType, node:TreeItemType|undefined, getChildren:GetChildrenType, getMatch:GetMatchType):MatchTreeNodeReturnType {
  let result:MatchTreeNodeReturnType|undefined = undefined;
  if (!getMatch) {
    throw new Error('no getMatch');
  }

  traverseTree(tree, getChildren, undefined, (t, s, d, p, pi) => {
    let match = false;
    if (result) {
      return;
    }
    if (typeof getMatch === 'function') {
      match = getMatch(t, s, d, p, pi);
    } else if(node && (typeof getMatch === 'string' || typeof getMatch === 'number')) {
      match = (t as any)[getMatch] !== undefined && (t as any)[getMatch] === node[getMatch];
    }
    if (match) {
      result = {
        t: t,
        s: s,
        d: d,
        p: ([] as TreeItemType[]).concat(p),
        pi: ([] as number[]).concat(pi),
      };
    }
    return {
      skip: Boolean(result),
    };
  });
  if (!result) {
    result = {
      t: undefined, //匹配对象
      s: undefined, //state 回调位置 不重要
      d: undefined, //深度
      p: undefined, //路径对象
      pi: undefined, //路径索引
    };
  }
  return result;
}

function getMatchParent(match:MatchTreeNodeReturnType, deep = 1) {
  if(match.p && match.d && match.pi){
    return {
      t: match.p[match.p.length - deep],
      s: match.s,
      d: match.d - deep,
      p: match.p.slice(0, -deep),
      pi: match.pi.slice(0, -deep),
    };
  } else {
    return {
      t: undefined, //匹配对象
      s: undefined, //state 回调位置 不重要
      d: undefined, //深度
      p: undefined, //路径对象
      pi: undefined, //路径索引
    };
  }
}

function getFirstLeaf(tree:TreeType, deep:number, getChildren:GetChildrenType) {
  return matchTreeNode(tree, undefined, getChildren, (t, s, d, p, pi) => {
    return d === deep;
  });
}
function getNodeTid(path:TreeItemType[], idField = 'id') {
  return path
    .map((v) => v[idField])
    .slice(1)
    .join('-');
}
function setTreeTid(tree:TreeType, getChildren:GetChildrenType, idField = 'id', tidField = 'tid') {
  traverseTree(tree, getChildren, undefined, (t, s, d, p, pi) => {
    //遍历菜单
    (t as any)[tidField] = getNodeTid(p, idField);
  });
}

export { traverseTree, filterTree, getTreeNode, matchTreeNode, getMatchParent, getFirstLeaf, getNodeTid, setTreeTid };
