
var tiquetes = function () {

    // Se declara la variables globales
    var initArgs;

    // Campos de agregar tiquete
    var txtFechaIngreso = $("#txtFechaIngresoTiquetes");
    var txtFechaSalida = $("#txtFechaSalidaTiquetes");
    var txtPlaca = $("#txtPlacaTiquetes");
    var txtTarifaHora = $("#txtTarifaHoraTiquetes");
    var txtTarifaMediaHora = $("#txtTarifaMediaHoraTiquetes");

    // Botones
    var btnAddTiquete = $('#btnAgregarTiquete');


    var init = function (args) {

        initArgs = args;

        // Se establece los eventos de los botones
        btnAddTiquete.click(fnAddTiquete);

        //$('#myDataTable').DataTable({
        //    ajax: {
        //        url: '/Test1/LoadData1',
        //        "dataSrc": ""
        //    },
        //    columns: [
        //        { data: "courseID" },
        //        { data: "title" },
        //        { data: "credits" }
        //    ]
        //});
    }

    const fnAddTiquete = function (e) {

        e.preventDefault();

        // Se validan los campos
        if (!validationFieldAdd()) {
            return;
        }
        

        // Se envia la peticion atravez de Ajax
        $.ajax({
            type: "POST",
            url: initArgs.addTiquete,
            data: {
                fechaIngreso: txtFechaIngreso.val(),
                fechaSalida: txtFechaSalida.val(),
                placa: txtPlaca.val(),
                tarifaHora: txtTarifaHora.val(),
                tarifaMediaHora: txtTarifaMediaHora.val(),
            },
            datatype: "json",
            cache: false,
            success: function (response) {
                $('#resultTiquetes').val(response);
                cleanCamposAdd();
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

        } else if (txtFechaSalida.val() == '') {
            msjError = 'La Fecha de Salida debe ser valida';

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


    return {
        Init: init
    }

}();