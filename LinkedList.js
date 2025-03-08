import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null; // Primer nodo de la lista
        this.counter = 1; // Contador para ID autoincremental
    }

    // Generar un hash simulado de 8 caracteres
    generateHash() {
        const characters = '0123456789abcdef'; // Caracteres permitidos en el hash
        let hash = '';
        for (let i = 0; i < 8; i++) {
            hash += characters[Math.floor(Math.random() * characters.length)];
        }
        return hash;
    }

    // Agregar una nueva transacción al final de la lista
    addTransaction(data) {
        const autoIncrementId = String(this.counter).padStart(4, '0'); // ID autoincremental
        const hash = this.generateHash(); // Hash simulado

        const transactionData = {
            id: autoIncrementId,
            hash,
            ...data
        };

        const newNode = new Node(transactionData);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }

        this.counter++;
    }
}

export default LinkedList;