import SmartContract from './SmartContract.js';

// Instancia del smart contract
const smartContract = new SmartContract();

// Elementos del DOM
const form = document.getElementById('register-form');
const certificateList = document.getElementById('certificate-list');
const modal = document.getElementById('certificate-modal');
const closeModal = document.querySelector('.close');
const certificateSentMessage = document.getElementById('certificate-sent-message');
const printCertificateButton = document.getElementById('print-certificate');
const viewBlockchainButton = document.getElementById('view-blockchain');
const blockchainModal = document.getElementById('blockchain-modal');
const blockchainBlocks = document.getElementById('blockchain-blocks');
const closeBlockchainModal = blockchainModal.querySelector('.close');

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

// Función para generar un número de carnet
function generateCarnet() {
    const year = Math.floor(Math.random() * (25 - 14 + 1)) + 14; // Años 2014-2025
    const number = Math.floor(Math.random() * 20000); // Número de 5 dígitos
    return `0905-${year}-${String(number).padStart(5, '0')}`;
}

// Función para cargar datos históricos
function loadHistoricalData() {
    const historicalData = [
        { studentName: "Juan Pérez", course: "Programación I", grade: 85, date: "2023-10-01", carnet: generateCarnet() },
        { studentName: "María López", course: "Bases de Datos I", grade: 90, date: "2023-10-02", carnet: generateCarnet() },
        { studentName: "Carlos García", course: "Álgebra Lineal", grade: 78, date: "2023-10-03", carnet: generateCarnet() },
        { studentName: "Ana Martínez", course: "Programación II", grade: 92, date: "2023-10-04", carnet: generateCarnet() },
        { studentName: "Luis Rodríguez", course: "Cálculo I", grade: 88, date: "2023-10-05", carnet: generateCarnet() }
    ];

    historicalData.forEach(data => {
        smartContract.executeTransaction(data);
    });

    displayCertificates(); // Mostrar los datos históricos en la interfaz
}

// Función para mostrar la ventana emergente del certificado
function showCertificateModal(studentName, carnet, course, grade, date, hash) {
    const modalStudentName = document.getElementById('modal-student-name');
    const modalCarnet = document.getElementById('modal-carnet');
    const modalCourse = document.getElementById('modal-course');
    const modalGrade = document.getElementById('modal-grade');
    const modalDate = document.getElementById('modal-date');
    const modalHash = document.getElementById('modal-hash');
    const modalTitle = document.querySelector('.modal-content h2');

    modalStudentName.textContent = studentName;
    modalCarnet.textContent = carnet;
    modalCourse.textContent = course;
    modalGrade.textContent = grade;
    modalDate.textContent = date;
    modalHash.textContent = hash;

    // Cambiar el título y el mensaje según la calificación
    if (grade > 61) {
        modalTitle.textContent = "Certificado de Curso Aprobado";
    } else {
        modalTitle.textContent = "Certificado de Curso Reprobado";
    }

    modal.style.display = 'block';
}

// Función para mostrar la cadena de bloques
function showBlockchain() {
    blockchainBlocks.innerHTML = '';
    let current = smartContract.transactions.head;

    while (current) {
        const block = document.createElement('div');
        block.className = 'block';

        const blockContent = `
            <h3>Bloque ${current.data.id}</h3>
            <p><strong>Hash:</strong> ${current.data.hash}</p>
            <p><strong>Estudiante:</strong> ${current.data.studentName}</p>
            <p><strong>Curso:</strong> ${current.data.course}</p>
            <p><strong>Calificación:</strong> ${current.data.grade}</p>
            <p><strong>Fecha:</strong> ${current.data.date}</p>
        `;
        block.innerHTML = blockContent;

        blockchainBlocks.appendChild(block);

        if (current.next) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '↓';
            blockchainBlocks.appendChild(arrow);
        }

        current = current.next;
    }

    blockchainModal.style.display = 'block';
}

// Cerrar la ventana emergente del certificado
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar la ventana emergente de la cadena de bloques
closeBlockchainModal.addEventListener('click', () => {
    blockchainModal.style.display = 'none';
});

// Función para imprimir el certificado
printCertificateButton.addEventListener('click', () => {
    const studentName = document.getElementById('modal-student-name').textContent;
    const carnet = document.getElementById('modal-carnet').textContent;
    const course = document.getElementById('modal-course').textContent;
    const grade = document.getElementById('modal-grade').textContent;
    const date = document.getElementById('modal-date').textContent;
    const hash = document.getElementById('modal-hash').textContent;

    // Llenar la plantilla de certificado
    document.getElementById('print-student-name').textContent = studentName;
    document.getElementById('print-carnet').textContent = carnet;
    document.getElementById('print-course').textContent = course;
    document.getElementById('print-grade').textContent = grade;
    document.getElementById('print-date').textContent = date;
    document.getElementById('print-hash').textContent = hash;

    // Mostrar la plantilla y imprimir
    const printableCertificate = document.getElementById('printable-certificate');
    printableCertificate.style.display = 'block';
    window.print();
    printableCertificate.style.display = 'none';
});

// Función para mostrar la cadena de bloques
viewBlockchainButton.addEventListener('click', showBlockchain);

// Función para registrar un certificado
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const course = document.getElementById('course').value;
    const grade = parseInt(document.getElementById('grade').value);

    // Validar que los campos no estén vacíos
    if (!studentName || !course || !grade) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validar que la calificación sea mayor a 61
    if (grade <= 61) {
        alert("El curso está reprobado. La calificación debe ser mayor a 61.");
        return;
    }

    // Mostrar la barra de progreso
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    progressBarContainer.style.display = 'block';
    progressBar.style.width = '0';

    // Simular la confirmación de la transacción
    setTimeout(() => {
        progressBar.style.width = '100%';
        setTimeout(() => {
            // Registrar la transacción
            const carnet = generateCarnet();
            const transactionData = {
                studentName,
                course,
                grade,
                date: new Date().toLocaleDateString(),
                carnet
            };
            smartContract.executeTransaction(transactionData);
            displayCertificates();

            // Mostrar el mensaje de confirmación
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.style.display = 'block';
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 5000); // Ocultar el mensaje después de 5 segundos

            // Mostrar el anuncio de certificado enviado
            const certificateSentMessage = document.getElementById('certificate-sent-message');
            const certificateHash = document.getElementById('certificate-hash');
            certificateHash.textContent = smartContract.transactions.head.data.hash;
            certificateSentMessage.style.display = 'block';
            setTimeout(() => {
                certificateSentMessage.style.display = 'none';
            }, 5000); // Ocultar el mensaje después de 5 segundos

            // Mostrar la ventana emergente del certificado
            showCertificateModal(studentName, carnet, course, grade, transactionData.date, smartContract.transactions.head.data.hash);

            // Limpiar el formulario
            form.reset();
        }, 2000); // Esperar 2 segundos para completar la barra
    }, 100); // Iniciar la animación después de 100ms
});

// Función para mostrar los certificados
function displayCertificates() {
    certificateList.innerHTML = '';
    let current = smartContract.transactions.head;

    while (current) {
        const certificate = current.data;
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${certificate.id}, Hash: ${certificate.hash}, Carnet: ${certificate.carnet}, Estudiante: ${certificate.studentName}, Curso: ${certificate.course}, Calificación: ${certificate.grade}, Fecha: ${certificate.date}`;
        certificateList.appendChild(listItem);
        current = current.next;
    }
}

// Cargar datos históricos al iniciar la aplicación
loadHistoricalData();