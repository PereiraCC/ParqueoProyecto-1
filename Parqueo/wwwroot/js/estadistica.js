
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
    var cboSearchEstadistica = $('#cboValorBusquedaEstadistica');
    var listadoParqueos = [];

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

        txtSearchEstadistica.prop('disabled', true);
        cboSearchEstadistica.prop('disabled', true);

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
        debugger;
        e.preventDefault();
        var valueSearch = "";

        if ((txtSearchEstadistica.val() == '' && cboSearchEstadistica.val() == '') || cboFiltrosBusqueda.val() == '0') {
            Swal.fire({
                title: 'Error!',
                text: 'Seleccione el filtro a buscar y el valor de busqueda.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

            return;
        }

        if (cboFiltrosBusqueda.val() == "1" || cboFiltrosBusqueda.val() == "2") {
            valueSearch = cboSearchEstadistica.val();
        } else {
            valueSearch = txtSearchEstadistica.val();
        }

        // Se envia la peticion atravez de Ajax
        $.ajax({
            async: true,
            type: "GET",
            url: initArgs.searchVenta,
            data: {
                valor: valueSearch,
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

        if (value == "1") {

            txtSearchEstadistica.prop('disabled', true);
            cboSearchEstadistica.prop('disabled', false);

            cboSearchEstadistica.find('option').remove();

            const meses = [];

            meses.push({ value: "01", name: "Enero" });
            meses.push({ value: "02", name: "Febrero" });
            meses.push({ value: "03", name: "Marzo" });
            meses.push({ value: "04", name: "Abril" });
            meses.push({ value: "05", name: "Mayo" });
            meses.push({ value: "06", name: "Junio" });
            meses.push({ value: "07", name: "Julio" });
            meses.push({ value: "08", name: "Agosto" });
            meses.push({ value: "09", name: "Septiembre" });
            meses.push({ value: "10", name: "Octubre" });
            meses.push({ value: "11", name: "Noviembre" });
            meses.push({ value: "12", name: "Diciembre" });

            meses.forEach((item) => {

                cboSearchEstadistica.append(`<option value="${item.value}">
                                                   ${item.name}
                                              </option>`)

            });

        } else if (value == "2") {

            txtSearchEstadistica.prop('disabled', true);
            cboSearchEstadistica.prop('disabled', false);

            cboSearchEstadistica.find('option').remove();

            const dias = [];

            dias.push({ value: "01", name: "01" });
            dias.push({ value: "02", name: "02" });
            dias.push({ value: "03", name: "03" });
            dias.push({ value: "04", name: "04" });
            dias.push({ value: "05", name: "05" });
            dias.push({ value: "06", name: "06" });
            dias.push({ value: "07", name: "07" });
            dias.push({ value: "08", name: "08" });
            dias.push({ value: "09", name: "09" });
            dias.push({ value: "10", name: "10" });
            dias.push({ value: "11", name: "11" });
            dias.push({ value: "12", name: "12" });
            dias.push({ value: "13", name: "13" });
            dias.push({ value: "14", name: "14" });
            dias.push({ value: "15", name: "15" });
            dias.push({ value: "16", name: "16" });
            dias.push({ value: "17", name: "17" });
            dias.push({ value: "18", name: "18" });
            dias.push({ value: "19", name: "19" });
            dias.push({ value: "20", name: "20" });
            dias.push({ value: "21", name: "21" });
            dias.push({ value: "22", name: "22" });
            dias.push({ value: "23", name: "23" });
            dias.push({ value: "24", name: "24" });
            dias.push({ value: "25", name: "25" });
            dias.push({ value: "26", name: "26" });
            dias.push({ value: "27", name: "27" });
            dias.push({ value: "28", name: "28" });
            dias.push({ value: "29", name: "29" });
            dias.push({ value: "30", name: "30" });
            dias.push({ value: "31", name: "31" });

            dias.forEach((item) => {

                cboSearchEstadistica.append(`<option value="${item.value}">
                                                   ${item.name}
                                              </option>`)

            });

        } else if (value == "3") {

            txtSearchEstadistica.prop('disabled', false);
            cboSearchEstadistica.prop('disabled', true);

        } else {
            
            txtSearchEstadistica.prop('disabled', true);
            cboSearchEstadistica.prop('disabled', true);
        }

    }

    return {
        Init: init
    }

}();