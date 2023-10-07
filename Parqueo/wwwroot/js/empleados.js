
var empleados = function () {

    // Se declara la variables globales
    var initArgs;

    var isEditEmpleado = false;
    var idEmpleadoSeleccionado = 0;
    var identificacionEmpleadoSeleccionado = '';

    // Campos
    var txtNumeroEmpleado = $("#txtNumeroEmpleadoEmpleado");
    var txtIdentificacion = $("#txtIdentificacionEmpleado");
    var txtFechaIngreso = $("#txtFechaIngresoEmpleado");
    var txtPrimerNombre = $("#txtPrimerNombreEmpleados");
    var txtSegundoNombre = $("#txtSegundoNombreEmpleados");
    var txtPrimerApellido = $("#txtPrimerApellidoEmpleados");
    var txtSegundoApellido = $("#txtSegundoApellidoEmpleados");
    var txtFechaNacimiento = $("#txtFechaNacimientoEmpleado");
    var txtCorreoElectronico = $("#txtCorreoElectronicoEmpleados");
    var txtTelefono = $("#txtTelefonoEmpleados");
    var txtPersonaContacto = $("#txtPersonaContactoEmpleados");
    var txtDireccion = $("#txtDireccionEmpleados");
    var txtValorBusqueda = $("#txtValorBusquedaEmpleados");

    // Botones
    var btnAddEmpleado = $('#btnAgregarEmpleado');
    var btnSearchEmpleado = $('#btnBuscarEmpleados');
    var btnMostrarTodosEmpleado = $('#btnMostrarTodosEmpleados');

    var init = function (args) {

        initArgs = args;

        // Se establece los eventos de los botones
        btnAddEmpleado.click(fnAddEmpleados);

        //$('.btnEdit').click(function (e) {

        //    const editParqueo = {
        //        id: $(this).attr("data-id"),
        //        nombre: $(this).attr("data-nombre"),
        //        cantidadMaximaVehiculos: $(this).attr("data-cantidadMaximaVehiculos"),
        //        horaApertura: $(this).attr("data-horaApertura"),
        //        horaCierre: $(this).attr("data-horaCierre"),
        //        tarifaHora: $(this).attr("data-tarifaHora"),
        //        tarifaMediaHora: $(this).attr("data-tarifaMediaHora")
        //    };

        //    txtNombre.val(editParqueo.nombre);
        //    txtCantidadMaxima.val(editParqueo.cantidadMaximaVehiculos);
        //    txtHoraApertura.val(convertToDateTimeLocalString(editParqueo.horaApertura));
        //    txtHoraCierre.val(convertToDateTimeLocalString(editParqueo.horaCierre));
        //    txtTarifaHora.val(editParqueo.tarifaHora);
        //    txtTarifaMediaHora.val(editParqueo.tarifaMediaHora);

        //    btnAddParqueo.html("Editar Parqueo");
        //    isEditParqueo = true;
        //    idParqueoSeleccionado = editParqueo.id;
        //});

        //$('.btnDelete').click(function (e) {
        //    idParqueoSeleccionado = $(this).attr("data-id");
        //    nombreParqueoSeleccionado = $(this).attr("data-nombre");
        //    fnRemoveParqueo(e);
        //});

        //btnSearchParqueo.click(function (e) {
        //    fnSearchParqueo(e);
        //});

        //btnMostrarTodosParqueo.click(function (e) {
        //    fnMostrarTodosParqueo(e);
        //});

    }

    const fnBotton = function (e) {

        if (!isEditEmpleado) {
            fnAddEmpleados(e);
        } else {
            fnEditParqueo(e);
        }

    }

    const fnAddEmpleados = function (e) {
        
        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.addEmpleado,
            data: {
                numeroEmpleado: txtNumeroEmpleado.val(),
                fechaIngreso: txtFechaIngreso.val(),
                primerNombre: txtPrimerNombre.val(),
                segundoNombre: txtSegundoNombre.val(),
                primerApellido: txtPrimerApellido.val(),
                segundoApellido: txtSegundoApellido.val(),
                fechaNacimiento: txtFechaNacimiento.val(),
                identificacion: txtFechaNacimiento.val(),
                direccion: txtDireccion.val(),
                correoElectronico: txtCorreoElectronico.val(),
                telefono: txtTelefono.val(),
                personaContacto: txtPersonaContacto.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Empleado'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al crear empleado, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const validationFieldAdd = function (e) {
        console.log(txtIdentificacion.val())
        let msjError = '';

        if (txtNumeroEmpleado.val() == 0) {
            msjError = 'El Numero de Empleado es obligatorio';

        } else if (txtIdentificacion.val() == '') {
            msjError = 'La Identificacion es obligatoria';

        } else if (txtFechaIngreso.val() == '') {
            msjError = 'La Fecha de ingreso es obligatoria';

        } else if (txtPrimerNombre.val() == '') {
            msjError = 'El Primer Nombre es obligatorio';

        } else if (txtPrimerApellido.val() == '') {
            msjError = 'El Primer Apellido es obligatorio';

        } else if (txtCorreoElectronico.val() == '') {
            msjError = 'El Correo Electronico es obligatorio';

        } else if (txtTelefono.val() == '') {
            msjError = 'El Telefono es obligatorio';

        } else if (txtDireccion.val() == '') {
            msjError = 'La Direccion es obligatoria';

        } else if (txtFechaNacimiento.val() == '') {
            msjError = 'La Fecha de Nacimiento es obligatoria';

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

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.searchParqueo,
            data: {
                valor: txtSearchParqueo.val()
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

    return {
        Init: init
    }

}();