
var estadistica = function () {

    // Se declara la variables globales
    var initArgs;


    // Campos de agregar tiquete
    var txtIdVenta = $("#txtIdVentaEstadistica");
    var txtNombreParqueo = $("#txtNombreParqueoEstadistica");
    var txtFechaIngreso = $("#txtFechaIngresoEstadistica");
    var txtFechaSalida = $("#txtFechaSalidaEstadistica");
    var txtPlaca = $("#txtPlacaEstadistica");
    var txtTiempoConsumo = $('#txtTiempoConsumidoEstadistica');
    var txtMontoPagar = $("#txtMontoPagarEstadistica");
    var txtSearchEstadistica = $("#txtValorBusquedaEstadistica");
    var cboFiltrosBusqueda = $('#cboFiltrosBusquedaEstadistica');


    // Botones
    var btnSearchEstadistica = $('#btnBuscarEstadistica');
    var btnMostrarTodos = $('#btnMostrarTodosEstadistica');

    var init = function (args) {

        initArgs = args;

        txtIdVenta.prop('disabled', true);
        txtNombreParqueo.prop('disabled', true);
        txtFechaIngreso.prop('disabled', true);
        txtFechaSalida.prop('disabled', true);
        txtPlaca.prop('disabled', true);
        txtMontoPagar.prop('disabled', true);
        txtTiempoConsumo.prop('disabled', true);

        $('.btnVer').click(function (e) {

            const verEstadistica = {
                id: $(this).attr("data-id"),
                nombreParqueo: $(this).attr("data-nombreParqueo"),
                fechaIngreso: $(this).attr("data-fechaIngreso"),
                fechaSalida: $(this).attr("data-fechaSalida"),
                placa: $(this).attr("data-placa"),
                tiempoConsumido: $(this).attr("data-tiempoConsumido"),
                montoPagar: $(this).attr("data-montoPagar"),
            };

            txtIdVenta.val(verEstadistica.id);
            txtNombreParqueo.val(verEstadistica.nombreParqueo);
            txtFechaIngreso.val(getHour(verEstadistica.fechaIngreso));
            txtFechaSalida.val(getHour(verEstadistica.fechaSalida));
            txtPlaca.val(verEstadistica.placa);
            txtMontoPagar.val(verEstadistica.montoPagar);
            txtTiempoConsumo.val(verEstadistica.tiempoConsumido);

        });

        btnSearchEstadistica.click(function (e) {
            fnSearchVenta(e);
        });

        btnMostrarTodos.click(function (e) {
            fnMostrarTodosVenta(e);
        });

        cboFiltrosBusqueda.change(function (e) {
            fnChangeFiltroBusqueda(e);
        });

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

    const fnSearchVenta = function (e) {

        e.preventDefault();

        if (txtSearchEstadistica.val() == '' || cboFiltrosBusqueda.val() == '0') {
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
            url: initArgs.searchVenta,
            data: {
                valor: txtSearchEstadistica.val(),
                filtro: cboFiltrosBusqueda.val()
            },
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Estadistica'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al buscar una venta, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
            
    }

    const fnMostrarTodosVenta = function (e) {

        e.preventDefault();

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.mostrarTodos,
            data: null,
            datatype: "json",
            cache: true,
            success: function (response) {
                window.location.href = '/Estadistica'
            },
            error: function (e) {
                console.log(e);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error al mostrar todos los tiquetes, por favor intentelo de nuevo.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });

    }

    const fnChangeFiltroBusqueda = function (e) {

        e.preventDefault();

        const value = e.target.value;

        if (value == "3") {
            txtSearchEstadistica.prop("type", "time");
        } else {
            txtSearchEstadistica.prop("type", "text");
        }

    }

    return {
        Init: init
    }

}();