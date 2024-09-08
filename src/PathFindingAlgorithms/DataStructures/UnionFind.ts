export class UnionFind {

    private parent: number[]

    constructor(n: number) {
        this.parent = [];
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
    }

    public Find(node: number): number {
        if (this.parent[node] === node) return node;
        this.parent[node] = this.Find(this.parent[node]);
        return this.parent[node];
    }

    public Union(node1: number, node2: number): boolean {
        const root1 = this.Find(node1);
        const root2 = this.Find(node2);
        if (root1 === root2) return false;
        this.parent[root2] = root1;
        return true;
    }
}