
var tiquetes = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditTiquete = false;
    var idTiqueteSeleccionado = 0;
    var tarifaHora = 0;
    var tarifaMediaHora = 0;
    var cantidadParqueos = 0;

    // Campos de agregar tiquete
    var txtFechaIngreso = $("#txtFechaIngresoTiquetes");
    var txtFechaSalida = $("#txtFechaSalidaTiquetes");
    var txtPlaca = $("#txtPlacaTiquetes");
    var txtMontoPagar = $("#txtMontoPagarTiquetes");
    var txtSearchTiquete = $("#txtValorBusqueda");

    //label
    var lblTitleModal = $('#lblTitleModal');

    // Botones
    var btnAddTiquete = $('#btnAgregarTiquete');
    var btnSearchTiquete = $('#btnBuscarTiquete');
    var btnMostrarTodos = $('#btnMostrarTiquete');
    var btnShowModal = $('#btnShowModal');
    var btnCloseModal = $('#btnCloseModal');

    var init = function (args) {

        initArgs = args;

        tarifaHora = initArgs.tarifaHora;
        tarifaMediaHora = initArgs.tarifaMediaHora;
        cantidadParqueos = initArgs.cantidadParqueos;

        txtMontoPagar.prop('disabled', true);

        // Se establece los eventos de los botones
        btnAddTiquete.click(fnBotton);

        $('.btnEdit').click(function (e) {

            const editTiquete = {
                id: $(this).attr("data-id"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                placa: $(this).attr("data-placa"),
            };
            
            txtFechaIngreso.val(convertToDateTimeLocalString(editTiquete.fechaIngreso));
            txtPlaca.val(editTiquete.placa);

            txtFechaSalida.prop('disabled', false);

            btnAddTiquete.html("Cobrar Tiquete");
            isEditTiquete = true;
            idTiqueteSeleccionado = editTiquete.id;
            lblTitleModal.html("Cobrar Tiquete");
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
                fechaSalida: txtFechaSalida.val(),
                placa: txtPlaca.val(),
                tarifaHora: txtTarifaHora.val(),
                tarifaMediaHora: txtTarifaMediaHora.val(),
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

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.searchTiquete,
            data: {
                valor: txtSearchTiquete.val()
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

        btnAddTiquete.html("Reservar");
        isEditTiquete = false;
        idTiqueteSeleccionado = 0;
        lblTitleModal.html("Crear Reserva");

    }

    const fnChangeFechaSalida = function (e) {

        e.preventDefault();

        const startDate = getDate(txtFechaIngreso.val());
        const endDate = getDate(txtFechaSalida.val());

        const diff = endDate.getTime() - startDate.getTime();

        console.log(diff / 60000)
    }

    const getDate = function (date) {

        const dateparse = date.split('T');

        const date2 = dateparse[0].split('-');

        const time = dateparse[1].split(':')

        return new Date(parseInt(date2[0]), parseInt(date2[1]), parseInt(date2[2]), parseInt(time[0]), parseInt(time[1]));
    }

    return {
        Init: init
    }

}();