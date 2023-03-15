//almacenamiento de datos en el navegador
//guardar datos en el navegador

localStorage.setItem("nombre", "Oscar");

var hora = new Date(); //fecha actual

localStorage.setItem("hora", hora);

var usuario = {
    nombre: "Oscar",
    email: "oscar@mail.com",
    web: "oscarweb.com",
    hora: hora
};

localStorage.setItem("usuario", JSON.stringify(usuario));

//recuperar objeto

var userjs = JSON.parse(localStorage.getItem("usuario"));


// Así se ve nuestra información de clientes.
const customerData = [
    { ssn: "123-45-678", name: "Oscar Rdz", age: 28, email: "oscar@mail.com" },
    { ssn: "234-56-789", name: "Brandon Balderas", age: 24, email: "brandon@mail.com" },
    { ssn: "876-54-321", name: "Arturo Rodriguez", age: 64, email: "arturo@mail.com" },
    { ssn: "987-65-432", name: "Gloria", age: 53, email: "gloria@mail.com" }
];
  
const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
    // Manejar errores
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  var objectStore = db.createObjectStore("clientes", { keyPath: "ssn" });

  objectStore.createIndex("name", "name", { unique: false });

  objectStore.createIndex("email", "email", { unique: true });
  objectStore.transaction.oncomplete = function(event) {
    var customerObjectStore = db.transaction("clientes", "readwrite").objectStore("clientes");
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  }
};

