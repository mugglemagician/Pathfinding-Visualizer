interface heapItem {
    heapIdx: number;
}

export default class PriorityQueue<T extends heapItem> {

    private heap: T[]
    private compare: (data1: T, data2: T) => boolean;
    // compare(data1, data2) -> is priority of data1 less than data2

    constructor(compare: (data1: T, data2: T) => boolean) {
        this.heap = [];
        this.compare = compare;
    }

    private Swap(idx1: number, idx2: number): void {
        const temp = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = temp;
        this.heap[idx1].heapIdx = idx1;
        this.heap[idx2].heapIdx = idx2;
    }

    private Swim(dataIdx: number): void {
        let child = dataIdx;
        let parent = Math.floor((child - 1) / 2);

        while (parent >= 0 && this.compare(this.heap[child], this.heap[parent])) {
            this.Swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    private Sink(dataIdx: number): void {
        let parent = dataIdx;
        while (true) {

            let leftChild = 2 * parent + 1;
            let rightChild = 2 * parent + 2;
            let smallest = leftChild;

            if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[leftChild])) {
                smallest = rightChild;
            }

            if (smallest >= this.heap.length || this.compare(this.heap[parent], this.heap[smallest])) break;

            this.Swap(parent, smallest);
            parent = smallest;
        }
    }

    public Push(data: T): void {
        this.heap.push(data);
        data.heapIdx = this.heap.length - 1;
        this.Swim(this.heap.length - 1);
    }

    public Top(): T | null {
        if (this.heap.length <= 0) return null;
        return this.heap[0];
    }


    public Pop(): T | null {
        if (this.heap.length <= 0) return null;
        this.Swap(0, this.heap.length - 1);
        const popped = this.heap.pop();
        if (!popped) return null;

        this.Sink(0);

        return popped;
    }

    public Update(data: T): void {
        if (!this.Contains(data)) {
            this.Push(data);
            return;
        }
        const temp = data.heapIdx;
        this.Swim(data.heapIdx);
        if (temp === data.heapIdx) {
            this.Sink(data.heapIdx);
        }
    }

    public Contains(data: T): boolean {
        if (data.heapIdx === -1 || this.heap[data.heapIdx] !== data) return false;
        return true;
    }

    public IsEmpty(): boolean {
        return this.heap.length === 0;
    }

}