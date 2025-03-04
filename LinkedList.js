import Node from './Node.js';

class LinkedList {
    constructor() {
        this.head = null; // Primer nodo de la lista
        this.counter = 1; // Contador para ID autoincremental
    }

    // Generar un ID aleatorio de 4 dígitos
    generateRandomId() {
        return Math.floor(1000 + Math.random() * 9000); // Número entre 1000 y 9999
    }

    // Agregar una nueva transacción al final de la lista
    addTransaction(data) {
        const autoIncrementId = String(this.counter).padStart(4, '0'); // ID autoincremental
        const randomId = this.generateRandomId(); // ID aleatorio

        const transactionData = {
            id: autoIncrementId,
            randomId,
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

        this.counter++; // Incrementar el contador
    }
}

export default LinkedList;