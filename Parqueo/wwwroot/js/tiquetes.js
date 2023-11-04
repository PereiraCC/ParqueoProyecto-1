
var tiquetes = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditTiquete = false;
    var isVerTiquete = false;
    var idTiqueteSeleccionado = 0;
    var tarifaHora = 0;
    var tarifaMediaHora = 0;
    var cantidadParqueos = 0;
    var listadoEmpleados = [];
    var listadoParqueos = [];

    // Campos de agregar tiquete
    var txtFechaIngreso = $("#txtFechaIngresoTiquetes");
    var cboParqueoTiquetes = $('#cboParqueoTiquetes');
    var cboEmpleadoTiquetes = $('#cboEmpleadoTiquetes');
    var txtFechaSalida = $("#txtFechaSalidaTiquetes");
    var txtPlaca = $("#txtPlacaTiquetes");
    var txtMontoPagar = $("#txtMontoPagarTiquetes");
    var txtSearchTiquete = $("#txtValorBusquedaTiquetes");
    var cboSearchTiquete = $("#cboValorBusquedaTiquetes");
    var txtTiempoConsumo = $('#txtTiempoConsumidoTiquetes');
    var cboFiltrosBusqueda = $('#cboFiltrosBusquedaTiquetes');

    //label
    var lblTitleModal = $('#lblTitleModal');

    // Botones
    var btnAddTiquete = $('#btnAgregarTiquete');
    var btnSearchTiquete = $('#btnBuscarTiquetes');
    var btnMostrarTodos = $('#btnMostrarTodosTiquetes');
    var btnShowModal = $('#btnShowModal');
    var btnCloseModal = $('#btnCloseModal');

    var init = function (args) {

        initArgs = args;

        txtMontoPagar.prop('disabled', true);
        txtTiempoConsumo.prop('disabled', true);
        txtSearchTiquete.prop('disabled', true);
        cboSearchTiquete.prop('disabled', true);

        fnChargeCboParqueo();
        fnChargeCboEmpleado();

        // Se establece los eventos de los botones
        btnAddTiquete.click(fnBotton);

        $('.btnEdit').click(function (e) {

            const editTiquete = {
                id: $(this).attr("data-id"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                placa: $(this).attr("data-placa"),
                idEmpleado: $(this).attr("data-idEmpleado"),
                idParqueo: $(this).attr("data-idParqueo"),
            };
            
            txtFechaIngreso.val(getHour(editTiquete.fechaIngreso));
            txtPlaca.val(editTiquete.placa);
            cboParqueoTiquetes.val(editTiquete.idParqueo);
            cboEmpleadoTiquetes.val(editTiquete.idEmpleado);

            txtFechaSalida.prop('disabled', false);
            txtFechaIngreso.prop('disabled', true);

            btnAddTiquete.html("Cobrar Tiquete");
            isEditTiquete = true;
            idTiqueteSeleccionado = editTiquete.id;
            lblTitleModal.html("Cobrar Tiquete");
        });

        $('.btnVer').click(function (e) {

            const editTiquete = {
                id: $(this).attr("data-id"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                placa: $(this).attr("data-placa"),
                fechaSalida: $(this).attr("data-fechaSalida"),
                montoPagar: $(this).attr("data-montoPagar"),
                tiempoConsumido: $(this).attr("data-tiempoConsumido"),
                idEmpleado: $(this).attr("data-idEmpleado"),
                idParqueo: $(this).attr("data-idParqueo"),
            };

            txtFechaIngreso.val(getHour(editTiquete.fechaIngreso));
            txtFechaSalida.val(getHour(editTiquete.fechaSalida));
            txtPlaca.val(editTiquete.placa);
            txtMontoPagar.val(editTiquete.montoPagar);
            txtTiempoConsumo.val(editTiquete.tiempoConsumido);
            cboParqueoTiquetes.val(editTiquete.idEmpleado);
            cboEmpleadoTiquetes.val(editTiquete.idParqueo);

            txtFechaIngreso.prop('disabled', true);
            txtFechaSalida.prop('disabled', true);
            txtPlaca.prop('disabled', true);
            txtMontoPagar.prop('disabled', true);
            txtTiempoConsumo.prop('disabled', true);
            cboParqueoTiquetes.prop('disabled', true);
            cboEmpleadoTiquetes.prop('disabled', true);

            btnAddTiquete.css("visibility", "hidden");
            isVerTiquete = true;
            lblTitleModal.html("Ver Tiquete");
        });

        $('.btnDelete').click(function (e) {
            idTiqueteSeleccionado = $(this).attr("data-id");
            fnRemoveTiquete(e);
        });

        btnSearchTiquete.click(function (e) {
            fnSearchTiquete(e);
        });

        btnMostrarTodos.click(function (e) {
            fnMostrarTodosTiquete(e);
        });

        btnShowModal.click(function (e) {
            txtFechaSalida.prop('disabled', true);
        });

        btnCloseModal.click(function (e) {
            fnCleanModal(e);
        });

        txtFechaSalida.change(function (e) {
            fnChangeFechaSalida(e);
        });

        cboFiltrosBusqueda.change(function (e) {
            fnChangeFiltroBusqueda(e);
        });

    }

    const fnChargeCboParqueo = function () {
        
        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.getAllParqueos,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                listadoParqueos = response;
                response.forEach((parqueo) => {

                    cboParqueoTiquetes.append(`<option value="${parqueo.idParqueo}">
                                                   ${parqueo.nombre}
                                              </option>`)

                });
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al obtener los parqueos, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnChargeCboEmpleado = function () {
        
        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.getAllEmpleados,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                listadoEmpleados = response;
                response.forEach((empleado) => {

                    cboEmpleadoTiquetes.append(`<option value="${empleado.idEmpleado}">
                                                   ${empleado.primerNombre} ${empleado.primerApellido}
                                              </option>`)

                });
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al obtener los parqueos, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnBotton = function (e) {

        if (!isEditTiquete) {
            fnAddTiquete(e);
        } else {
            fnEditTiquete(e);
        }

    }

    const fnAddTiquete = function (e) {

        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        //if (cantidadParqueos != 1) {
        //    Swal.fire({
        //        title: 'Advertencia',
        //        text: 'No existe ningun parqueo, por favor crear un parqueo',
        //        icon: 'warning',
        //        confirmButtonText: 'Aceptar'
        //    });

        //    return;
        //}
        
        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.addTiquete,
            data: {
                fechaIngreso: txtFechaIngreso.val(),
                placa: txtPlaca.val(),
                idEmpleado: cboEmpleadoTiquetes.val(),
                idParqueo: cboParqueoTiquetes.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {               
                window.location.href = '/Reserva'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al crear reversacion, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const validationFieldAdd = function (e) {

        let msjError = '';

        if (txtFechaIngreso.val() == '') {
            msjError = 'La Fecha de Ingreso debe ser valida';

        } else if (txtPlaca.val() == '') {
            msjError = 'La Placa es obligatoria';

        } 

        if (msjError != '') {
            Swal.fire({
                title: 'Error!',
                text: msjError,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

            return false;
        }

        return true;

    }

    const convertToDateTimeLocalString = function (date) {

        const newDate = date.split(' ');

        const dateOficial = new Date(newDate[0] + ' ' + newDate[1]);

        const year = dateOficial.getFullYear();
        const month = (dateOficial.getMonth() + 1).toString().padStart(2, "0");
        const day = dateOficial.getDate().toString().padStart(2, "0");
        let hours = dateOficial.getHours().toString().padStart(2, "0");
        const minutes = dateOficial.getMinutes().toString().padStart(2, "0");
        
        if (newDate[2] == 'p.') {
            
            switch (hours) {
                case '01':
                    hours = '13'
                    break;

                case '02':
                    hours = '14'
                    break;

                case '03':
                    hours = '15'
                    break;

                case '04':
                    hours = '16'
                    break;

                case '05':
                    hours = '17'
                    break;

                case '06':
                    hours = '18'
                    break;

                case '07':
                    hours = '19'
                    break;

                case '08':
                    hours = '20'
                    break;

                case '09':
                    hours = '21'
                    break;

                case '10':
                    hours = '22'
                    break;

                case '11':
                    hours = '23'
                    break;

                case '12':
                    hours = '00'
                    break;
            }
        }

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const getHour = function (date) {

        const newDate = date.split(' ');

        const time = newDate[1].split(':');

        if (newDate[2] == 'p.') {

            switch (time[0]) {
                case '01':
                    time[0] = '13'
                    break;

                case '02':
                    time[0] = '14'
                    break;

                case '03':
                    time[0] = '15'
                    break;

                case '04':
                    time[0] = '16'
                    break;

                case '05':
                    time[0] = '17'
                    break;

                case '06':
                    time[0] = '18'
                    break;

                case '07':
                    time[0] = '19'
                    break;

                case '08':
                    time[0] = '20'
                    break;

                case '09':
                    time[0] = '21'
                    break;

                case '10':
                    time[0] = '22'
                    break;

                case '11':
                    time[0] = '23'
                    break;

                case '12':
                    time[0] = '00'
                    break;
            }
        }

        return `${time[0]}:${time[1]}:${time[2]}`;
    }

    const fnEditTiquete = function (e) {

        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.editTiquete,
            data: {
                idTiquete: idTiqueteSeleccionado,
                fechaIngreso: txtFechaIngreso.val(),
                placa: txtPlaca.val(),
                fechaIngreso: txtFechaIngreso.val(),
                fechaSalida: txtFechaSalida.val(),
                placa: txtPlaca.val(),
                montoPagar: txtMontoPagar.val(),
                tiempoConsumido: txtTiempoConsumo.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                isEditTiquete = false;
                idTiqueteSeleccionado = 0;
                window.location.href = '/Reserva'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al crear tiquete, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnRemoveTiquete = function (e) {

        e.preventDefault();

        Swal.fire({
            title: '¿Desea eliminar el tiquete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Eliminar`,
        }).then(async (result) => {

            if (result.isDenied) {

                // Se envia la peticion atravez de Ajax
                $.ajax({
                    async: true,
                    type: "GET",
                    url: initArgs.deleteTiquete,
                    data: {
                        idTiquete: idTiqueteSeleccionado
                    },
                    datatype: "json",
                    cache: true,
                    success: function (response) {
                        window.location.href = '/Reserva'
                    },
                    error: function (e) {
                        console.log(e);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Ocurrio un error al eliminar tiquete, por favor intentelo de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });
            }

        });
    }

    const fnSearchTiquete = function (e) {

        e.preventDefault();
        var valueSearch = "";

        if ((txtSearchTiquete.val() == '' && cboSearchTiquete.val() == 0) || cboFiltrosBusqueda.val() == '0') {
            Swal.fire({
                title: 'Error!',
                text: 'Seleccione el filtro a buscar y el valor de busqueda.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

            return;
        }

        if (cboFiltrosBusqueda.val() == "3" || cboFiltrosBusqueda.val() == "4") {
            valueSearch = cboSearchTiquete.val();
        } else {
            valueSearch = txtSearchTiquete.val();
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.searchTiquete,
            data: {
                valor: valueSearch,
                filtro: cboFiltrosBusqueda.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Reserva'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al eliminar tiquete, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
            
    }

    const fnMostrarTodosTiquete = function (e) {

        e.preventDefault();

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.mostrarTiquete,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Reserva'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al eliminar tiquete, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnCleanModal = function (e) {

        e.preventDefault();

        txtFechaIngreso.val('');
        txtPlaca.val('');
        txtFechaSalida.val('');
        txtMontoPagar.val('');
        txtTiempoConsumo.val('');
        cboParqueoTiquetes.val(0);
        cboEmpleadoTiquetes.val(0);

        txtFechaIngreso.prop('disabled', false);
        txtPlaca.prop('disabled', false);
        cboParqueoTiquetes.prop('disabled', false);
        cboEmpleadoTiquetes.prop('disabled', false);

        btnAddTiquete.css("visibility", "visible");
        btnAddTiquete.html("Reservar");
        isEditTiquete = false;
        idTiqueteSeleccionado = 0;
        lblTitleModal.html("Crear Reserva");

    }

    const fnChangeFechaSalida = function (e) {
        
        e.preventDefault();
        const time = getDiferentHours();

        var idParqueoSeleted = cboParqueoTiquetes.val();

        tarifaHora = listadoParqueos.find(parqueo => parqueo.idParqueo == idParqueoSeleted).tarifaHora;
        tarifaMediaHora = listadoParqueos.find(parqueo => parqueo.idParqueo == idParqueoSeleted).tarifaMediaHora;

        const cantidadHours = time.split(':')[0];
        const cantidadMinutes = time.split(":")[1];

        let price = 0;

        // Se saca el precio de la horas
        for (let i = 0; i < parseInt(cantidadHours); i++) {
            price += parseFloat(tarifaHora);
        }

        if (parseInt(cantidadMinutes) != 0) {
            if (parseInt(cantidadMinutes) >= 30) {
                price += parseFloat(tarifaHora);
            } else {
                price += parseFloat(tarifaMediaHora);
            }
        }

        txtTiempoConsumo.val(time);
        txtMontoPagar.val(price);
    }

    const getDiferentHours = function () {

        var startTime = txtFechaIngreso.val();
        var endTime = txtFechaSalida.val();

        var todayDate = moment(new Date()).format("MM-DD-YYYY"); //Instead of today date, We can pass whatever date        

        var startDate = new Date(`${todayDate} ${startTime}`);
        var endDate = new Date(`${todayDate} ${endTime}`);
        var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

        var hh = Math.floor(timeDiff / 1000 / 60 / 60);
        hh = ('0' + hh).slice(-2)

        timeDiff -= hh * 1000 * 60 * 60;
        var mm = Math.floor(timeDiff / 1000 / 60);
        mm = ('0' + mm).slice(-2)

        timeDiff -= mm * 1000 * 60;
        var ss = Math.floor(timeDiff / 1000);
        ss = ('0' + ss).slice(-2)

        return `${hh}:${mm}:${ss}`;
    }

    const fnChangeFiltroBusqueda = function (e) {

        e.preventDefault();

        const value = e.target.value;

        if (value == "3") {

            txtSearchTiquete.prop('disabled', true);
            cboSearchTiquete.prop('disabled', false);

            cboSearchTiquete.find('option').remove();

            listadoParqueos.forEach((parqueo) => {

                cboSearchTiquete.append(`<option value="${parqueo.idParqueo}">
                                                   ${parqueo.nombre}
                                              </option>`)

            });

        } else if (value == "4") {

            txtSearchTiquete.prop('disabled', true);
            cboSearchTiquete.prop('disabled', false);

            cboSearchTiquete.find('option').remove();

            listadoEmpleados.forEach((empleado) => {

                cboSearchTiquete.append(`<option value="${empleado.idEmpleado}">
                                                   ${empleado.primerNombre} ${empleado.primerApellido}
                                              </option>`)

            });

        } else {
            txtSearchTiquete.prop('disabled', false);
            cboSearchTiquete.prop('disabled', true);
        }

    }

    return {
        Init: init
    }

}();