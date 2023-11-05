using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Parqueo.Backend;
using Parqueo.Models;
using Parqueo.Models.Configuracion;

namespace Parqueo.Controllers;

public class ReservaController : Controller
{

    public AccionesTiquetes accionesTiquetes;
    public AccionesParqueos accionesParqueos;
    public AccionesEmpleados accionesEmpleados;
    public AccionesEstadistica accionesEstadistica;

    public ReservaController(IOptions<ConfiguracionParqueo> options)
    {
        accionesTiquetes = new AccionesTiquetes(options.Value);
        accionesParqueos = new AccionesParqueos(options.Value);
        accionesEmpleados = new AccionesEmpleados(options.Value);
        accionesEstadistica = new AccionesEstadistica(options.Value);
    }

    public async Task<IActionResult> Index()
    {
        await accionesTiquetes.getAllTiquetes();
        ViewTiquetes viewTiquetes = new ViewTiquetes( ) {
            TarifaHora = (GlobalVariables.Parqueos.Count > 0) ? GlobalVariables.Parqueos.FirstOrDefault().TarifaHora : 0,
            TarifaMediaHora = (GlobalVariables.Parqueos.Count > 0) ? GlobalVariables.Parqueos.FirstOrDefault().TarifaMediaHora : 0,
            cantidadParqueo = GlobalVariables.Parqueos.Count,
            tiquetes = (GlobalVariables.isSearchTiquetes) ? GlobalVariables.TiquetesFiltrado : GlobalVariables.Tiquetes
        };
        return View(viewTiquetes);
    }

    [HttpGet]
    public ActionResult addTiquete(Tiquetes tiquete)
    {
        if( GlobalVariables.Tiquetes.Count() > 0 )
        {
            int ultimoId = GlobalVariables.Tiquetes.LastOrDefault().idTiquete;
            tiquete.idTiquete = ultimoId + 1;
        } else
        {
            tiquete.idTiquete = 1;
        }
        
        accionesTiquetes.addValue(tiquete);

        GlobalVariables.isSearchTiquetes = false;

        return Ok();
    }

    [HttpGet]
    public ActionResult editTiquete(Tiquetes tiquete)
    {
        
        accionesTiquetes.editValue(tiquete);
        GlobalVariables.isSearchTiquetes = false;

        accionesEstadistica.addValue(new Venta()
        {
            fechaIngreso = tiquete.fechaIngreso,
            NombreEmpleado = tiquete.nombreEmpleado,
            NombreParqueo = tiquete.nombreParqueo,
            fechaSalida = tiquete.fechaSalida,
            placa = tiquete.placa,
            montoPagar = tiquete.montoPagar,
            tiempoConsumido = tiquete.tiempoConsumido
        });

        return Ok();
    }

    [HttpGet]
    public ActionResult removeTiquete(Tiquetes tiquete)
    {
        Tiquetes deleteTiquete = GlobalVariables.Tiquetes.Find( tiq => tiq.idTiquete == tiquete.idTiquete );
        accionesTiquetes.deleteValue(deleteTiquete);

        GlobalVariables.isSearchTiquetes = false;

        return Ok();
    }

    [HttpGet]
    public ActionResult searchTiquete(string valor, string filtro)
    {
        Models.Enums.EnumSearchTiquetes enumSearchTiquetes = Models.Enums.EnumSearchTiquetes.Placa;
        switch (filtro)
        {
            case "1":
                enumSearchTiquetes = Models.Enums.EnumSearchTiquetes.Placa;
                break;

            case "2":
                enumSearchTiquetes = Models.Enums.EnumSearchTiquetes.Numero;
                break;

            case "3":
                enumSearchTiquetes = Models.Enums.EnumSearchTiquetes.Parqueo;
                break;

            case "4":
                enumSearchTiquetes = Models.Enums.EnumSearchTiquetes.Empleado;
                break;

        }
        accionesTiquetes.searchValue(valor, enumSearchTiquetes);

        GlobalVariables.isSearchTiquetes = true;

        return Ok();
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchTiquetes = false;

        return Ok();
    }

    [HttpGet]
    public async Task<JsonResult> getAllParqueos()
    {
        await accionesParqueos.getAllParqueos();
        return Json(GlobalVariables.Parqueos);
    }

    [HttpGet]
    public async Task<JsonResult> getAllEmpleados()
    {
        await accionesEmpleados.getAllEmpleados();
        return Json(GlobalVariables.Empleados);
    }

}

