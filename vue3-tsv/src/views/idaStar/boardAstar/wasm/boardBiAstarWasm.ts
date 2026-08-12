import { ActionDir } from "../../numBoard";
import { BoardBiAstar } from "../boardBiAstar";
import wasmUrl from "./build/solver.wasm?url";

type WasmExports = {
  memory: WebAssembly.Memory;
  getInputPtr(): number;
  setWinParams(ww: number, wh: number, weight: number): void;
  init(w: number, h: number, listLen: number): void;
  clearSolver(): void;
  execAll(): number;
  getActionsPtr(): number;
  getActionsLen(): number;
  getProgressPtr(): number;
  getProgressLen(): number;
  getStateCnt(): number;
  getWinCount(): number;
  getExpandCnt(): number;
  getErrorPtr(): number;
  getErrorLen(): number;
  getWinW(): number;
  getWinH(): number;
  getWinWeight(): number;
};

/**
 * BoardBiAstarWin 的 WASM 版。
 * 应用层接口对齐：setWinParams / init / clear / exec(stepCb)
 * 最终 Done 打印格式对齐 boardBiAstarWin.ts
 */
export class BoardBiAstarWasm extends BoardBiAstar {
  winW = 3;
  winH = 1;
  winWeight = 4;

  private widthCnt = 0;
  private heightCnt = 0;
  private list: number[] = [];
  private exports: WasmExports | null = null;
  private loadPromise: Promise<void> | null = null;
  private stepCb: ((str: string) => void) | undefined;

  private readCString(ptr: number, len: number): string {
    const ex = this.exports!;
    const bytes = new Uint8Array(ex.memory.buffer, ptr, len);
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return s;
  }

  private readLastError(): string {
    const ex = this.exports!;
    const len = ex.getErrorLen();
    if (!len) return "";
    return this.readCString(ex.getErrorPtr(), len);
  }

  private handleProgress(raw: string): void {
    const stepCb = this.stepCb;
    if (!raw) return;
    if (raw.startsWith("skip:")) {
      const body = raw.slice(5);
      const m = body.match(/^(\d+),(\d+),(\d+)x(\d+)$/);
      if (m) {
        console.log(`开窗跳过(${m[1]},${m[2]},${m[3]}x${m[4]}) 已归位`);
      }
      return;
    }
    if (raw.startsWith("win:")) {
      const rest = raw.slice(4);
      const parts = rest.split(":");
      if (parts.length >= 3) {
        const idx = parts[0];
        const rect = parts[1];
        const focus = parts[2];
        const rm = rect.match(/^(\d+),(\d+),(\d+)x(\d+)$/);
        if (rm) {
          const s = `开窗 ${idx} (${rm[1]},${rm[2]},${rm[3]}x${rm[4]}) focus=${focus}`;
          stepCb && stepCb(s);
        }
      }
      return;
    }
    if (raw.startsWith("windone:")) {
      const body = raw.slice(8);
      const parts = body.split(":");
      if (parts.length >= 3) {
        const rect = parts[0];
        const added = parts[1];
        const total = parts[2];
        const rm = rect.match(/^(\d+),(\d+),(\d+)x(\d+)$/);
        if (rm) {
          console.log(
            `开窗完成(${rm[1]},${rm[2]},${rm[3]}x${rm[4]}) +${added}步, 累计${total}步`
          );
        }
      }
      return;
    }
    if (raw === "bi") {
      stepCb && stepCb("开窗收尾双向搜索...");
      return;
    }
    // tickwin:left,top,wxh:cnt:ms
    if (raw.startsWith("tickwin:")) {
      const body = raw.slice(8);
      const parts = body.split(":");
      if (parts.length >= 3) {
        const rect = parts[0];
        const cnt = Number(parts[1]) || 0;
        const ms = Number(parts[2]) || 0;
        const rm = rect.match(/^(\d+),(\d+),(\d+)x(\d+)$/);
        if (rm && cnt > 0) {
          const s = `开窗(${rm[1]},${rm[2]},${rm[3]}x${rm[4]}) 已遍历${
            cnt / 1000000
          }M,耗时${(ms / 1000).toFixed(3)}s,千次耗时${(
            (ms * 1000) /
            cnt
          ).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
        }
      }
      return;
    }
    // tickbi:cnt:ms
    if (raw.startsWith("tickbi:")) {
      const parts = raw.slice(7).split(":");
      if (parts.length >= 2) {
        const cnt = Number(parts[0]) || 0;
        const ms = Number(parts[1]) || 0;
        if (cnt > 0) {
          const s = `收尾双向 已遍历${cnt / 1000000}M,耗时${(ms / 1000).toFixed(
            3
          )}s,千次耗时${((ms * 1000) / cnt).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
        }
      }
    }
  }

  private async ensureWasm(): Promise<WasmExports> {
    if (this.exports) return this.exports;
    if (!this.loadPromise) {
      this.loadPromise = (async () => {
        const imports = {
          env: {
            abort: (
              _msg: number,
              _file: number,
              line: number,
              column: number
            ) => {
              throw new Error(`wasm abort at ${line}:${column}`);
            },
            js_on_progress: (ptr: number, len: number) => {
              if (!this.exports) return;
              const raw = this.readCString(ptr, len);
              this.handleProgress(raw);
            },
            js_now_ms: () => Date.now(),
          },
        };
        const buf = await (await fetch(wasmUrl)).arrayBuffer();
        const { instance } = await WebAssembly.instantiate(buf, imports);
        this.exports = instance.exports as unknown as WasmExports;
      })();
    }
    await this.loadPromise;
    return this.exports!;
  }

  private writeInput(list: number[]): void {
    const ex = this.exports!;
    const ptr = ex.getInputPtr();
    const view = new Uint8Array(ex.memory.buffer, ptr, list.length);
    for (let i = 0; i < list.length; i++) view[i] = list[i] & 0xff;
  }

  setWinParams(winW: number, winH: number, winWeight?: number) {
    this.winW = Math.max(1, winW | 0);
    this.winH = Math.max(1, winH | 0);
    if (typeof winWeight === "number" && winWeight > 0) {
      this.winWeight = winWeight;
    }
  }

  init(widthCnt: number, heightCnt: number, list: number[]) {
    this.widthCnt = widthCnt;
    this.heightCnt = heightCnt;
    this.list = list.concat();
  }

  clear() {
    this.list = [];
    this.stepCb = undefined;
    if (this.exports) {
      this.exports.clearSolver();
    }
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardBiAstarWasm");
    const startTimestamp = Date.now();
    this.stepCb = stepCb;
    const ex = await this.ensureWasm();
    ex.setWinParams(this.winW, this.winH, this.winWeight);
    this.writeInput(this.list);
    ex.init(this.widthCnt, this.heightCnt, this.list.length);
    const initErr = this.readLastError();
    if (initErr) {
      console.log("error:", initErr);
      throw new Error(initErr);
    }

    await new Promise((r) => setTimeout(r, 0));
    const actionLen = ex.execAll();
    const execErr = this.readLastError();
    if (actionLen < 0 || execErr) {
      const msg = execErr || "开窗还原失败";
      console.log("error:", msg);
      throw new Error(msg);
    }

    const ptr = ex.getActionsPtr();
    const len = ex.getActionsLen();
    const bytes = new Uint8Array(ex.memory.buffer, ptr, len);
    const allActions: ActionDir[] = [];
    for (let i = 0; i < len; i++) allActions.push(bytes[i] as ActionDir);

    const stateCnt = ex.getStateCnt();
    const windowsLen = ex.getWinCount();
    const duration = Date.now() - startTimestamp;
    console.log(
      `Done(开窗):还原路径${allActions.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,耗时${(duration / 1000).toFixed(3)}s,千次耗时${
        stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0
      }ms, 窗数${windowsLen}`
    );
    return allActions;
  }

  removeTest() {}
}
