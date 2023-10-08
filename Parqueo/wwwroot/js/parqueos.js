
var parqueos = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditParqueo = false;
    var idParqueoSeleccionado = 0;
    var nombreParqueoSeleccionado = '';
    var cantidadParqueos = 0;

    // Campos
    var txtNombre = $("#txtNombreParqueos");
    var txtCantidadMaxima = $("#txtCantidadParqueos");
    var txtHoraApertura = $("#txtHoraAperturaParqueos");
    var txtHoraCierre = $("#txtHoraCierreParqueos");
    var txtTarifaHora = $("#txtTarifaHoraParqueos");
    var txtTarifaMediaHora = $("#txtTarifaMediaHoraParqueos");
    var txtSearchParqueo = $("#txtValorBusquedaParqueos");
    var cboFiltrosBusqueda = $('#cboFiltrosBusquedaParqueos');

    //label
    var lblTitleModal = $('#lblTitleModal');

    // Botones
    var btnAddParqueo = $('#btnAgregarParqueo');
    var btnSearchParqueo = $('#btnBuscarParqueos');
    var btnMostrarTodosParqueo = $('#btnMostrarTodosParqueos');
    var btnCloseModal = $('#btnCloseModal');

    var init = function (args) {

        initArgs = args;

        // Se establece la cantidad de correos
        cantidadParqueos = initArgs.cantidadParqueos;

        // Se establece los eventos de los botones
        btnAddParqueo.click(fnBotton);

        $('.btnEdit').click(function (e) {

            const editParqueo = {
                id: $(this).attr("data-id"),
                nombre: $(this).attr("data-nombre"),
                cantidadMaximaVehiculos: $(this).attr("data-cantidadMaximaVehiculos"),
                horaApertura: $(this).attr("data-horaApertura"),
                horaCierre: $(this).attr("data-horaCierre"),
                tarifaHora: $(this).attr("data-tarifaHora"),
                tarifaMediaHora: $(this).attr("data-tarifaMediaHora")
            };
            
            txtNombre.val(editParqueo.nombre);
            txtCantidadMaxima.val(editParqueo.cantidadMaximaVehiculos);
            txtHoraApertura.val(getHour(editParqueo.horaApertura));
            txtHoraCierre.val(getHour(editParqueo.horaCierre));
            txtTarifaHora.val(editParqueo.tarifaHora);
            txtTarifaMediaHora.val(editParqueo.tarifaMediaHora);

            btnAddParqueo.html("Editar Parqueo");
            isEditParqueo = true;
            idParqueoSeleccionado = editParqueo.id;
            lblTitleModal.html("Editar Parqueo");
        });

        $('.btnDelete').click(function (e) {
            idParqueoSeleccionado = $(this).attr("data-id");
            nombreParqueoSeleccionado = $(this).attr("data-nombre");
            fnRemoveParqueo(e);
        });

        btnSearchParqueo.click(function (e) {
            fnSearchParqueo(e);
        });

        btnMostrarTodosParqueo.click(function (e) {
            fnMostrarTodosParqueo(e);
        });

        btnCloseModal.click(function (e) {
            fnCleanModal(e);
        });

    }

    const fnBotton = function (e) {

        if (!isEditParqueo) {
            fnAddParqueo(e);
        } else {
            fnEditParqueo(e);
        }

    }

    const fnAddParqueo = function (e) {

        e.preventDefault();

        if (cantidadParqueos == 1) {
            Swal.fire({
                title: 'Advertencia',
                text: 'Ya existe un parqueo existente. No se puede agregar más de un parqueo.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });

            return;
        }

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.addParqueo,
            data: {
                nombre: txtNombre.val(),
                cantidadMaximaVehiculos: txtCantidadMaxima.val(),
                horaApertura: txtHoraApertura.val(),
                horaCierre: txtHoraCierre.val(),
                tarifaHora: txtTarifaHora.val(),
                tarifaMediaHora: txtTarifaMediaHora.val(),
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Parqueo'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al crear parqueo, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const validationFieldAdd = function (e) {

        let msjError = '';

        if (txtNombre.val() == '') {
            msjError = 'El Nombre es obligatorio';

        } else if (txtCantidadMaxima.val() == 0) {
            msjError = 'La Cantidad Maxima Vehiculos es obligatoria';

        } else if (txtHoraApertura.val() == '') {
            msjError = 'La Hora de Apertura es obligatoria';

        } else if (txtHoraCierre.val() == '') {
            msjError = 'La Hora de Cierre es obligatoria';

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

    const getHour = function (date) {
        const newDate = date.split(' ');
        return newDate[1];
    }

    const fnEditParqueo = function (e) {

        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.editParqueo,
            data: {
                idParqueo: idParqueoSeleccionado,
                nombre: txtNombre.val(),
                cantidadMaximaVehiculos: txtCantidadMaxima.val(),
                horaApertura: txtHoraApertura.val(),
                horaCierre: txtHoraCierre.val(),
                tarifaHora: txtTarifaHora.val(),
                tarifaMediaHora: txtTarifaMediaHora.val(),
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                isEditParqueo = false;
                idParqueoSeleccionado = 0;
                window.location.href = '/Parqueo'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al editar parqueo, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnRemoveParqueo = function (e) {

        e.preventDefault();

        Swal.fire({
            title: `¿Desea eliminar el parqueo ${nombreParqueoSeleccionado}?`,
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
                    url: initArgs.deleteParqueo,
                    data: {
                        idParqueo: idParqueoSeleccionado
                    },
                    datatype: "json",
                    cache: true,
                    success: function (response) {
                        window.location.href = '/Parqueo'
                    },
                    error: function (e) {
                        console.log(e);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Ocurrio un error al eliminar parqueo, por favor intentelo de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });
            }

        });
    }

    const fnSearchParqueo = function (e) {

        e.preventDefault();

        if (txtSearchParqueo.val() == '' || cboFiltrosBusqueda.val() == '0') {
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
            url: initArgs.searchParqueo,
            data: {
                valor: txtSearchParqueo.val(),
                filtro: cboFiltrosBusqueda.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Parqueo'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al buscar parqueo, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
            
    }

    const fnMostrarTodosParqueo = function (e) {

        e.preventDefault();

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.mostrarParqueo,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Parqueo'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al mostrar todos los parqueos, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnCleanModal = function (e) {

        e.preventDefault();

        txtNombre.val('');
        txtCantidadMaxima.val('');
        txtHoraApertura.val('');
        txtHoraCierre.val('');
        txtTarifaHora.val('');
        txtTarifaMediaHora.val('');

        btnAddParqueo.html("Agregar Parqueo");
        isEditParqueo = false;
        idParqueoSeleccionado = 0;
        lblTitleModal.html("Agregar Parqueo");

    }

    return {
        Init: init
    }

}();