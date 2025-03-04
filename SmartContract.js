import LinkedList from './LinkedList.js';

class SmartContract {
    constructor() {
        this.transactions = new LinkedList(); // Lista enlazada para almacenar certificados
    }

    // Función para registrar una transacción (certificado)
    executeTransaction(data) {
        this.transactions.addTransaction(data);
        console.log('Certificado registrado:', data);
    }
}

export default SmartContract;