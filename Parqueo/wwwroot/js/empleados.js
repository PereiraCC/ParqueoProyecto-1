
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
    var cboFiltrosBusqueda = $('#cboFiltrosBusquedaEmpleados');

    //label
    var lblTitleModal = $('#lblTitleModal');

    // Botones
    var btnAddEmpleado = $('#btnAgregarEmpleado');
    var btnSearchEmpleado = $('#btnBuscarEmpleados');
    var btnMostrarTodosEmpleado = $('#btnMostrarTodosEmpleados');
    var btnCloseModal = $('#btnCloseModal');

    var init = function (args) {

        initArgs = args;

        // Se establece los eventos de los botones
        btnAddEmpleado.click(fnBotton);

        $('.btnEdit').click(function (e) {
            
            const editEmpleado = {
                id: $(this).attr("data-id"),
                numeroEmpleado: $(this).attr("data-numeroEmpleado"),
                identificacion: $(this).attr("data-identificacion"),
                primerNombre: $(this).attr("data-primerNombre"),
                segundoNombre: $(this).attr("data-segundoNombre"),
                primerApellido: $(this).attr("data-primerApellido"),
                segundoApellido: $(this).attr("data-segundoApellido"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                fechaNacimiento: $(this).attr("data-fechaNacimiento"),
                direccion: $(this).attr("data-direccion"),
                correoElectronico: $(this).attr("data-correoElectronico"),
                telefono: $(this).attr("data-telefono"),
                personaContacto: $(this).attr("data-personaContacto"),
            };
            
            txtNumeroEmpleado.val(editEmpleado.numeroEmpleado);
            txtIdentificacion.val(editEmpleado.identificacion);
            txtPrimerNombre.val(editEmpleado.primerNombre);
            txtSegundoNombre.val(editEmpleado.segundoNombre);
            txtPrimerApellido.val(editEmpleado.primerApellido);
            txtSegundoApellido.val(editEmpleado.segundoApellido);
            txtFechaIngreso.val(convertToDateTime(editEmpleado.fechaIngreso));
            txtFechaNacimiento.val(convertToDateTime(editEmpleado.fechaNacimiento));
            txtDireccion.val(editEmpleado.direccion);
            txtCorreoElectronico.val(editEmpleado.correoElectronico);
            txtTelefono.val(editEmpleado.telefono);
            txtPersonaContacto.val(editEmpleado.personaContacto);

            btnAddEmpleado.html("Editar Empleado");
            isEditEmpleado = true;
            idEmpleadoSeleccionado = editEmpleado.id;
            lblTitleModal.html("Editar Empleado");
        });

        $('.btnDelete').click(function (e) {
            idEmpleadoSeleccionado = $(this).attr("data-id");
            identificacionEmpleadoSeleccionado = $(this).attr("data-identificacion");
            fnRemoveEmpleado(e);
        });

        btnSearchEmpleado.click(function (e) {
            fnSearchEmpleado(e);
        });

        btnMostrarTodosEmpleado.click(function (e) {
            fnMostrarTodosEmpleado(e);
        });

        btnCloseModal.click(function (e) {
            fnCleanModal(e);
        });

    }

    const fnBotton = function (e) {

        if (!isEditEmpleado) {
            fnAddEmpleados(e);
        } else {
            fnEditEmpleado(e);
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
                identificacion: txtIdentificacion.val(),
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

    const convertToDateTime = function (date) {

        const newDate = date.split(' ')[0];

        const dateParse = newDate.split('/');

        return `${dateParse[2]}-${dateParse[1]}-${dateParse[0]}`;
    }

    const fnEditEmpleado = function (e) {

        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.editEmpleado,
            data: {
                idEmpleado: idEmpleadoSeleccionado,
                numeroEmpleado: txtNumeroEmpleado.val(),
                fechaIngreso: txtFechaIngreso.val(),
                primerNombre: txtPrimerNombre.val(),
                segundoNombre: txtSegundoNombre.val(),
                primerApellido: txtPrimerApellido.val(),
                segundoApellido: txtSegundoApellido.val(),
                fechaNacimiento: txtFechaNacimiento.val(),
                identificacion: txtIdentificacion.val(),
                direccion: txtDireccion.val(),
                correoElectronico: txtCorreoElectronico.val(),
                telefono: txtTelefono.val(),
                personaContacto: txtPersonaContacto.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                isEditEmpleado = false;
                idEmpleadoSeleccionado = 0;
                window.location.href = '/Empleado'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al editar empleado, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnRemoveEmpleado = function (e) {

        e.preventDefault();

        Swal.fire({
            title: `¿Desea eliminar el empleado ${identificacionEmpleadoSeleccionado}?`,
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
                    url: initArgs.deleteEmpleado,
                    data: {
                        idEmpleado: idEmpleadoSeleccionado
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
                            text: 'Ocurrio un error al eliminar empleado, por favor intentelo de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });
            }

        });
    }

    const fnSearchEmpleado = function (e) {

        e.preventDefault();

        if (txtValorBusqueda.val() == '' || cboFiltrosBusqueda.val() == '0') {
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
            url: initArgs.searchEmpleado,
            data: {
                valor: txtValorBusqueda.val(),
                filtro: cboFiltrosBusqueda.val()
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
                    text: 'Ocurrio un error al buscar empleado, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
            
    }

    const fnMostrarTodosEmpleado = function (e) {

        e.preventDefault();

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.mostrarEmpleado,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Empleado'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al mostrar todos los empleados, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnCleanModal = function (e) {

        e.preventDefault();

        txtNumeroEmpleado.val('');
        txtIdentificacion.val('');
        txtPrimerNombre.val('');
        txtSegundoNombre.val('');
        txtPrimerApellido.val('');
        txtSegundoApellido.val('');
        txtFechaIngreso.val('');
        txtFechaNacimiento.val('');
        txtDireccion.val('');
        txtCorreoElectronico.val('');
        txtTelefono.val('');
        txtPersonaContacto.val('');

        btnAddEmpleado.html("Agregar Empleado");
        isEditEmpleado = false;
        idEmpleadoSeleccionado = 0;
        lblTitleModal.html("Agregar Empleado");

    }

    return {
        Init: init
    }

}();