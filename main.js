import SmartContract from './SmartContract.js';

// Instancia del smart contract
const smartContract = new SmartContract();

// Elementos del DOM
const form = document.getElementById('register-form');
const certificateList = document.getElementById('certificate-list');

// Lista de cursos del pensum UMG
const courses = [
    "Desarrollo Humano y Profesional",
    "Metodología de la Investigación",
    "Contabilidad I",
    "Introducción a los Sistemas de Cómputo",
    "Lógica de Sistemas",
    "Precálculo",
    "Álgebra Lineal",
    "Algoritmos",
    "Contabilidad II",
    "Matemática Discreta",
    "Física I",
    "Programación I",
    "Cálculo I",
    "Proceso Administrativo",
    "Derecho Informático",
    "Microeconomía",
    "Programación II",
    "Cálculo II",
    "Estadística I",
    "Física II",
    "Métodos Numéricos",
    "Programación III",
    "Emprendedores de Negocios",
    "Electrónica Analógica",
    "Estadística II",
    "Investigación de Operaciones",
    "Bases de Datos I",
    "Autómatas y Lenguajes Formales",
    "Sistemas Operativos I",
    "Electrónica Digital"
];

// Generar un nombre aleatorio
function generateRandomName() {
    const names = ["Juan Pérez", "María López", "Carlos García", "Ana Martínez", "Luis Rodríguez"];
    return names[Math.floor(Math.random() * names.length)];
}

// Función para registrar un certificado
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentName = generateRandomName();
    const course = courses[Math.floor(Math.random() * courses.length)];
    const grade = Math.floor(Math.random() * 100) + 1; // Calificación entre 1 y 100

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
        listItem.textContent = `ID: ${certificate.id}, Random ID: ${certificate.randomId}, Estudiante: ${certificate.studentName}, Curso: ${certificate.course}, Calificación: ${certificate.grade}, Fecha: ${certificate.date}`;
        certificateList.appendChild(listItem);
        current = current.next;
    }
}