// a queue uses FIFO (first in first out)
export class Queue {
    constructor(capacity = Infinity) {
        this.capacity = capacity;
        this.storage = [];
    }
    enqueue(item) {
        if (this.size() === this.capacity) {
            throw new Error('Queue has reached max capacity, you cannot add more items');
        }
        this.storage.push(item);
    }
    dequeue() {
        return this.storage.shift();
    }
    size() {
        return this.storage.length;
    }
}
