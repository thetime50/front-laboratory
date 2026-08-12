/**
 * 任意尺寸盘面紧凑编码：Uint8Array（每格 1 字节，支持任意长度）
 * 字符串 key：按字节转成 latin1 字符，可作 Map/Record 键
 */

export type BoardCode = Uint8Array;

export function encodeBoard(list: number[]): BoardCode {
  return Uint8Array.from(list);
}

export function decodeBoard(code: BoardCode): number[] {
  return Array.from(code);
}

/** board 编码 -> 字符串 key（任意长度） */
export function boardEncodeToStr(code: BoardCode | number[]): string {
  const buf = code instanceof Uint8Array ? code : Uint8Array.from(code);
  let s = "";
  for (let i = 0; i < buf.length; i++) {
    s += String.fromCharCode(buf[i]);
  }
  return s;
}

/** 字符串 key -> board 编码 */
export function boardEncodeFromStr(str: string): BoardCode {
  const code = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    code[i] = str.charCodeAt(i) & 0xff;
  }
  return code;
}

export function listToStateKey(list: number[], compact: boolean): string {
  return compact ? boardEncodeToStr(list) : list.join(",");
}

export function stateKeyToList(key: string, compact: boolean): number[] {
  if (compact) {
    return decodeBoard(boardEncodeFromStr(key));
  }
  return key.split(",").map((v) => Number(v));
}

/** 在编码副本上执行一步移动，返回新编码与新空位 */
export function codeDoAction(
  code: BoardCode,
  emptyIndex: number,
  widthCnt: number,
  heightCnt: number,
  action: number
): { code: BoardCode; emptyIndex: number } {
  const size = widthCnt * heightCnt;
  let other = emptyIndex;
  if (action === 0) {
    // u
    other = emptyIndex - widthCnt;
  } else if (action === 1) {
    // r
    other = emptyIndex + 1;
  } else if (action === 2) {
    // d
    other = emptyIndex + widthCnt;
  } else if (action === 3) {
    // l
    other = emptyIndex - 1;
  }
  if (other < 0 || other >= size) {
    throw new Error(`codeDoAction out of range empty=${emptyIndex} action=${action}`);
  }
  const next = code.slice();
  const t = next[emptyIndex];
  next[emptyIndex] = next[other];
  next[other] = t;
  return { code: next, emptyIndex: other };
}
