
function saveData() {
  const rutText = inputRut.value;
  const nameLast = inputName.value;
  const mailText = inputEmail.value;
  const patenteText = inputPatente.value;
  const nameVisitText = inputPerson.value; // persona a la que visita
  const cargoText = inputCargo.value;
  const empresa = listaEmpresas.value;
  window.datos;

  let found = datos.find(item => {
    if (item.name === empresa) {
      customerEmail = item.email;
      return result = true;
    } else {
      return result = false;
    }
  });

  if (result) {
    const newVisitKey = firebase.database().ref().child('visits').push().key;
    firebase.database().ref(`visits/${newVisitKey}`).set({
      Rut: rutText,
      name: nameLast,
      nameVisit: nameVisitText,
      EmpresaVisit: empresa, 
      email: mailText,
      Patente: patenteText,
      cargo: cargoText,
    });
    // Limpiar el textarea
    document.getElementById('inputRut').value = '';
    emailjs.init('user_0nX0E9VcT00Cn5l3Xunq5');

    var template_params = {
      'to_name': `${empresa}`,
      'customer_name': `${customerEmail}`,
      'from_name': 'MiVisita',
      'to_name': `${empresa}`,
      'message_html': `Se registró en recepción a la persona  ${nameLast} RUT: ${rutText} indicó tener una reunión en ${empresa} con ${nameVisitText}`
    };

    var service_id = 'gmail';
    var template_id = 'mi_visita';
    emailjs.send(service_id, template_id, template_params)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
  } else {
    saveData();
  }
};

/** ********************************************Ingreso de Encomiendas*************************************************/
function saveIntrust() {
  const encargoText = inputEncargo.value;
  const empresaText = listaEmpresa.value;
  const obsText = inputObs.value;
  let customerEmail;
  window.datos;

  let found = datos.find(item => {
    if (item.name === empresaText) {
      customerEmail = item.email;
      console.log(item.name);
      console.log(customerEmail);
      return result = true;
    } else {
      return result = false;
    }
  });

  if (result) {
    console.log(customerEmail);
    const newInKey = firebase.database().ref().child('intrust').push().key;
    firebase.database().ref(`intrust/${newInKey}`).set({
      Encomienda: encargoText,
      Empresa: empresaText,
      EmailEmpresa: customerEmail,
      Observaciones: obsText,
    });

    document.getElementById('inputEncargo').value = '';
    emailjs.init('user_0nX0E9VcT00Cn5l3Xunq5');

    var template_params = {
      'customer_name': `${customerEmail}`,
      'from_name': 'MiVisita',
      'to_name': `${empresaText}`,
      'message_html': `Recepción recibió una encomienda para ${encargoText} Descripción: ${obsText}`
    };

    var service_id = 'gmail';
    var template_id = 'mi_visita';
    emailjs.send(service_id, template_id, template_params)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
  } else {
    saveIntrust();
  }
};

const reservarEspacio = (() => {
  const rutReserve = inputRutReserva.value;
  const nameReserve = inputNameReserva.value;
  const patenteReserve = inputPatenteReserva.value;
  const espacioReserve = inputEspacioReserva.value;
  const numPersonasReserve = inputPersonasReserva.value;
  const ObservacionesReserve = inputObservaciones.value;

  const customerEmail = 'v.azocar.adasme@gmail.com'; // este seria directamente el email de la administradora del IF

  const newReservaKey = firebase.database().ref().child('Reservas').push().key;
  firebase.database().ref(`Reservas/${newReservaKey}`).set({
    Rut: rutReserve,
    name: nameReserve,
    patente: patenteReserve,
    espacio: espacioReserve,
    numPersonas: numPersonasReserve,
    observaciones: ObservacionesReserve
  });

  emailjs.init('user_0nX0E9VcT00Cn5l3Xunq5');

  var template_params = {
    'to_name': `Administrador`,
    'customer_name': `${customerEmail}`,
    'from_name': 'MiVisita',
    'to_name': `${nameReserve}`,
    'message_html': `En recepción se ha identificado a la persona: ${nameReserve} con RUT: ${rutReserve} quien reserva el espacio ${espacioReserve} para ${numPersonasReserve} personas ${ObservacionesReserve}`
  };


  var service_id = 'gmail';
  var template_id = 'mi_visita';
  emailjs.send(service_id, template_id, template_params)
    .then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });
});


// Buscar visitas desde firebase

firebase.database().ref('visits')  
  .on('child_added', (newMessage) => {    
    tableOne.innerHTML += `<tr> 
    <th scope="row">${newMessage.val().name}</th>
      <td>${newMessage.val().Rut}</td>
      <td>${newMessage.val().Patente}</td>
      <td>${newMessage.val().cargo}</td>
      <td>${newMessage.val().email}</td>     
      </tr>`;
  });


// Buscar reservas desde firebase
firebase.database().ref('Reservas')  
  .on('child_added', (newMessage) => {    
    tableTwo.innerHTML += `<tr> 
  <th scope="row">${newMessage.val().name}</th>
    <td>${newMessage.val().Rut}</td>
    <td>${newMessage.val().Patente}</td>
    <td>${newMessage.val().espacio}</td>
    <td>${newMessage.val().numPersonas}</td>
    <td>${newMessage.val().observaciones}</td>  
    </tr>`;
  });

// Buscar encomiendas desde firebase
firebase.database().ref('intrust')  
  .on('child_added', (newMessage) => {    
    tableThre.innerHTML += `<tr> 
<th scope="row">${newMessage.val().EmailEmpresa}</th>
  <td>${newMessage.val().Empresa}</td>
  <td>${newMessage.val().Encomienda}</td> 
  <td>${newMessage.val().observaciones}</td>  
  </tr>`;
  });

