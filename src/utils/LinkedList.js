class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Inserción al final para mantener orden cronológico en el backlog
    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    getAll() {
        const elements = [];
        let current = this.head;
        while (current) {
            elements.push(current.data);
            current = current.next;
        }
        return elements;
    }

    findById(id) {
        let current = this.head;
        while (current) {
            if (current.data.id === id) return current.data;
            current = current.next;
        }
        return null;
    }

    removeById(id) {
        if (!this.head) return null;

        if (this.head.data.id === id) {
            const removed = this.head.data;
            this.head = this.head.next;
            this.size--;
            return removed;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.data.id === id) {
                const removed = current.next.data;
                current.next = current.next.next;
                this.size--;
                return removed;
            }
            current = current.next;
        }
        return null;
    }
}

module.exports = LinkedList;
