let habitaciones = [
    { tipo: "sencilla", precio: 100 },
    { tipo: "doble", precio: 150 },
    { tipo: "triple", precio: 200 },
    { tipo: "suite", precio: 250 },
  ];
  
  let reservas = [];
  
  function validarDatos() {
    let fechaLlegada = document.getElementById("fecha-llegada").value;
    let fechaSalida = document.getElementById("fecha-salida").value;
    let numHuespedes = document.getElementById("num-huespedes").value;
    let tipoHabitacion = document.getElementById("tipo-habitacion").value;
  
    let habitacionDisponible = buscarHabitacionDisponible(tipoHabitacion, fechaLlegada, fechaSalida);
  
    if (!habitacionDisponible) {
      document.getElementById("resultado-validacion").innerHTML = "Lo sentimos, no hay habitaciones disponibles en esas fechas";
      return false;
    }
  
    let precioReserva = calcularPrecioReserva(habitacionDisponible.precio, fechaLlegada, fechaSalida);
  
    reservarHabitacion(fechaLlegada, fechaSalida, numHuespedes, tipoHabitacion, precioReserva);
  
    document.getElementById("resultado-validacion").innerHTML = "¡Reserva exitosa!";
    return true;
  }
  
  function buscarHabitacionDisponible(tipoHabitacion, fechaLlegada, fechaSalida) {
    return habitaciones.find((habitacion) => {
      return habitacion.tipo === tipoHabitacion && reservas.every((reserva) => {
        return (
          fechaLlegada >= reserva.fechaSalida ||
          fechaSalida <= reserva.fechaLlegada ||
          habitacion.tipo !== reserva.tipoHabitacion
        );
      });
    });
  }
  
  function calcularPrecioReserva(precioHabitacion, fechaLlegada, fechaSalida) {
    let fechaLlegadaObj = new Date(fechaLlegada);
    let fechaSalidaObj = new Date(fechaSalida);
    let numNoches = Math.round((fechaSalidaObj - fechaLlegadaObj) / (1000 * 60 * 60 * 24));
    return precioHabitacion * numNoches;
  }
  
  function reservarHabitacion(fechaLlegada, fechaSalida, numHuespedes, tipoHabitacion, precioReserva) {
    reservas.push({
      fechaLlegada: fechaLlegada,
      fechaSalida: fechaSalida,
      numHuespedes: numHuespedes,
      tipoHabitacion: tipoHabitacion,
      precio: precioReserva,
    });
  }
  
  function obtenerPrecioTotalReservas() {
    return reservas.reduce((total, reserva) => {
      return total + reserva.precio;
    }, 0);
  }
  
  function obtenerReservasPorTipoHabitacion(tipoHabitacion) {
    return reservas.filter((reserva) => {
      return reserva.tipoHabitacion === tipoHabitacion;
    });
  }
  
  function obtenerReservasPorFecha(fecha) {
    return reservas.filter((reserva) => {
      return reserva.fechaLlegada <= fecha && fecha <= reserva.fechaSalida;
    });
  }
  function addReservation() {
    // Obtener los valores de las entradas de texto
    var name = document.getElementById("name").value;
    var room = document.getElementById("room").value;
    var checkin = document.getElementById("checkin").value;
    var checkout = document.getElementById("checkout").value;
  
    // Agregar la reserva al array reservations
    var reservation = { name: name, room: room, checkin: checkin, checkout: checkout };
    reservations.push(reservation);
  
    // Agregar una fila a la tabla de reservas
    var table = document.getElementById("reservationTable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = name;
    cell2.innerHTML = room;
    cell3.innerHTML = checkin;
    cell4.innerHTML = checkout;
  }
  function calcularPrecioTotal() {
    var total = 0;
    for (var i = 0; i < reservations.length; i++) {
      var roomType = reservations[i].room;
      var price = roomPrices[roomType];
      total += price;
    }
    return total;
  }
  

  function reservar() {
    validarDatos()
  }