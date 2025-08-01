import { Heap, IsEqual, Comparator } from "heap-js";

export class HeapPlus<T> extends Heap<T> {
  constructor(compare?: Comparator<T>) {
    super(compare);
  }
  find(element: T, callbackFn?: IsEqual<T>): T | undefined {
    const index = this.indexOf(element, callbackFn);
    if (index < 0) {
      return undefined;
    }
    return this.get(index);
  }
} 
