import SmartContract from './SmartContract.js';

// Instancia del smart contract
const smartContract = new SmartContract();

// Elementos del DOM
const form = document.getElementById('register-form');
const certificateList = document.getElementById('certificate-list');

// Función para registrar un certificado
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const course = document.getElementById('course').value;
    const grade = document.getElementById('grade').value;

    // Registrar la transacción (simulación)
    const transactionData = {
        studentName,
        course,
        grade,
        date: new Date().toLocaleDateString()
    };

    smartContract.executeTransaction(transactionData);
    displayCertificates();
    form.reset();
});

// Función para mostrar los certificados
function displayCertificates() {
    certificateList.innerHTML = '';
    let current = smartContract.transactions.head;

    while (current) {
        const certificate = current.data;
        const listItem = document.createElement('li');
        listItem.textContent = `Estudiante: ${certificate.studentName}, Curso: ${certificate.course}, Calificación: ${certificate.grade}, Fecha: ${certificate.date}`;
        certificateList.appendChild(listItem);
        current = current.next;
    }
}