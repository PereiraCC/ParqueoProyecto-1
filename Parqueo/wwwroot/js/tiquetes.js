﻿
var tiquetes = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditTiquete = false;
    var idTiqueteSeleccionado = 0;

    // Campos de agregar tiquete
    var txtFechaIngreso = $("#txtFechaIngresoTiquetes");
    var txtFechaSalida = $("#txtFechaSalidaTiquetes");
    var txtPlaca = $("#txtPlacaTiquetes");
    var txtTarifaHora = $("#txtTarifaHoraTiquetes");
    var txtTarifaMediaHora = $("#txtTarifaMediaHoraTiquetes");
    var txtSearchTiquete = $("#txtValorBusqueda");

    // Botones
    var btnAddTiquete = $('#btnAgregarTiquete');

    var init = function (args) {

        initArgs = args;

        // Se establece los eventos de los botones
        btnAddTiquete.click(fnBotton);


        $('.btnEdit').click(function (e) {

            const editTiquete = {
                id: $(this).attr("data-id"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                fechaSalida: $(this).attr("data-fechaSalida"),
                placa: $(this).attr("data-placa"),
                tarifaHora: $(this).attr("data-tarifaHora"),
                tarifaMediaHora: $(this).attr("data-tarifaMediaHora")
            };
            
            txtFechaIngreso.val(convertToDateTimeLocalString(editTiquete.fechaIngreso));
            txtFechaSalida.val((editTiquete.fechaSalida != undefined) ? convertToDateTimeLocalString(editTiquete.fechaSalida) : null );
            txtPlaca.val(editTiquete.placa);
            txtTarifaHora.val(editTiquete.tarifaHora);
            txtTarifaMediaHora.val(editTiquete.tarifaMediaHora);

            btnAddTiquete.html("Editar Tiquete");
            isEditTiquete = true;
            idTiqueteSeleccionado = editTiquete.id;
        });

        $('.btnDelete').click(function (e) {
            idTiqueteSeleccionado = $(this).attr("data-id");
            fnRemoveTiquete(e);
        });

        $('#btnBuscarTiquete').click(function (e) {
            fnSearchTiquete(e);
        });

        $('#btnMostrarTiquete').click(function (e) {
            fnMostrarTodosTiquete(e);
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
        

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.addTiquete,
            data: {
                fechaIngreso: txtFechaIngreso.val(),
                fechaSalida: txtFechaSalida.val(),
                placa: txtPlaca.val(),
                tarifaHora: txtTarifaHora.val(),
                tarifaMediaHora: txtTarifaMediaHora.val(),
            },
            datatype: "json",
            cache: true,
            success: function (response) {               
                cleanCamposAdd();
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

    const validationFieldAdd = function (e) {

        let msjError = '';

        if (txtFechaIngreso.val() == '') {
            msjError = 'La Fecha de Ingreso debe ser valida';

        } else if (txtPlaca.val() == '') {
            msjError = 'La Placa es obligatoria';

        } else if (txtTarifaHora.val() == 0) {
            msjError = 'La Tarifa Hora es obligatoria';

        } else if (txtTarifaMediaHora.val() == 0) {
            msjError = 'La Tarifa Media Hora es obligatoria';

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

    const cleanCamposAdd = function (e) {
        txtFechaIngreso.val('');
        txtFechaSalida.val('');
        txtPlaca.val('');
        txtTarifaHora.val('');
        txtTarifaMediaHora.val('');
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

    return {
        Init: init
    }

}();