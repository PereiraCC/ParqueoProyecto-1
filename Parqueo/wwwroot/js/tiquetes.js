
var tiquetes = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditTiquete = false;
    var isVerTiquete = false;
    var idTiqueteSeleccionado = 0;
    var tarifaHora = 0;
    var tarifaMediaHora = 0;
    var cantidadParqueos = 0;

    // Campos de agregar tiquete
    var txtFechaIngreso = $("#txtFechaIngresoTiquetes");
    var txtFechaSalida = $("#txtFechaSalidaTiquetes");
    var txtPlaca = $("#txtPlacaTiquetes");
    var txtMontoPagar = $("#txtMontoPagarTiquetes");
    var txtSearchTiquete = $("#txtValorBusquedaTiquetes");
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

        tarifaHora = initArgs.tarifaHora;
        tarifaMediaHora = initArgs.tarifaMediaHora;
        cantidadParqueos = initArgs.cantidadParqueos;

        txtMontoPagar.prop('disabled', true);
        txtTiempoConsumo.prop('disabled', true);

        // Se establece los eventos de los botones
        btnAddTiquete.click(fnBotton);

        $('.btnEdit').click(function (e) {

            const editTiquete = {
                id: $(this).attr("data-id"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                placa: $(this).attr("data-placa"),
            };
            
            txtFechaIngreso.val(getHour(editTiquete.fechaIngreso));
            txtPlaca.val(editTiquete.placa);

            txtFechaSalida.prop('disabled', false);

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
            };

            txtFechaIngreso.val(getHour(editTiquete.fechaIngreso));
            txtFechaSalida.val(getHour(editTiquete.fechaSalida));
            txtPlaca.val(editTiquete.placa);
            txtMontoPagar.val(editTiquete.montoPagar);
            txtTiempoConsumo.val(editTiquete.tiempoConsumido);

            txtFechaIngreso.prop('disabled', true);
            txtFechaSalida.prop('disabled', true);
            txtPlaca.prop('disabled', true);
            txtMontoPagar.prop('disabled', true);
            txtTiempoConsumo.prop('disabled', true);

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

        if (cantidadParqueos != 1) {
            Swal.fire({
                title: 'Advertencia',
                text: 'No existe ningun parqueo, por favor crear un parqueo',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });

            return;
        }
        
        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.addTiquete,
            data: {
                fechaIngreso: txtFechaIngreso.val(),
                placa: txtPlaca.val(),
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

        if (txtSearchTiquete.val() == '' || cboFiltrosBusqueda.val() == '0') {
            Swal.fire({
                title: 'Error!',
                text: 'Seleccione el filtro a buscar y el valor de busqueda.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.searchTiquete,
            data: {
                valor: txtSearchTiquete.val(),
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

        txtFechaIngreso.prop('disabled', false);
        txtPlaca.prop('disabled', false);

        btnAddTiquete.css("visibility", "visible");
        btnAddTiquete.html("Reservar");
        isEditTiquete = false;
        idTiqueteSeleccionado = 0;
        lblTitleModal.html("Crear Reserva");

    }

    const fnChangeFechaSalida = function (e) {
        
        e.preventDefault();
        const time = getDiferentHours();

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

    return {
        Init: init
    }

}();