var UrlGetFacturas = 'http://localhost:90/G4_19/controller/facturas.php?op=GetFacturas';
var UrlPostFactura = 'http://localhost:90/G4_19/controller/facturas.php?op=InsertFactura';
var UrlGetUno = 'http://localhost:90/G4_19/controller/facturas.php?op=GetUno';
var UrlPutFactura = 'http://localhost:90/G4_19/controller/facturas.php?op=PutFactura';
var UrlDeleteFactura = 'http://localhost:90/G4_19/controller/facturas.php?op=DeleteFactura';
$(document).ready(function () {
    CargarFacturas();

});


function CargarFacturas() {
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var Valores = '';
            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NUMERO_FACTURA + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_FACTURA + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_VENCIMIENTO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-warning" onclick="CargarFactura(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-danger" onclick="EliminarFactura(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +

                    '</tr>';
                $('.facturas').html(Valores);
            }
        }


    })
}


function AgregarFactura() {
    var datosfactura = {
        numerofactura: $('#numerofactura').val(),
        idsocio: $('#idsocio').val(),
        fechafactura: $('#fechafactura').val(),
        detalle: $('#detalle').val(),
        subtotal: $('#subtotal').val(),
        totalisv: $('#totalisv').val(),
        total: $('#total').val(),
        fechavencimiento: $('#fechavencimiento').val(),
        estado: $('#estado').val()
    };

    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPostFactura,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);

        }

    });
    alert("Factura Agregada");

}


function CargarFactura(idfactura) {
    var datosfactura = {
        id: idfactura
    };

    var datosfacturajson = JSON.stringify(datosfactura);
   
    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#numerofactura').val(MiItems[0].NUMERO_FACTURA);
            $('#idsocio').val(MiItems[0].ID_SOCIO);
            $('#fechafactura').val(MiItems[0].FECHA_FACTURA);
            $('#detalle').val(MiItems[0].DETALLE);
            $('#subtotal').val(MiItems[0].SUB_TOTAL);
            $('#totalisv').val(MiItems[0].TOTAL_ISV);
            $('#total').val(MiItems[0].TOTAL);
            $('#fechavencimiento').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#estado').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick=" ActualizarFactura(' + MiItems[0].ID + ')" value= "Actualizar Facrura" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
        }
    });
}

function ActualizarFactura(idfactura) {
    var datosfactura = {
        id: idfactura,
        numero_factura: $('#numerofactura').val(),
        id_socio: $('#idsocio').val(),
        fecha_factura: $('#fechafactura').val(),
        detalle: $('#detalle').val(),
        sub_total: $('#subtotal').val(),
        total_isv: $('#totalisv').val(),
        total: $('#total').val(),
        fecha_vencimiento: $('#fechavencimiento').val(),
        estado: $('#estado').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFactura,
        type: 'PUT',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }

    });
    alert("Factura Actualizada");
}


function EliminarFactura(idfactura) {
    var datosfactura = {
        id: idfactura
    };
    var datosfacturajson = JSON.stringify(datosfactura);
   $.ajax({
        url: UrlDeleteFactura,
        type: 'DELETE',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);

        }

    });
    alert("Factura Eliminada");
}