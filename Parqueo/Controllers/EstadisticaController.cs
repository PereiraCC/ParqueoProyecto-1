using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Parqueo.Backend;
using Parqueo.Models;

namespace Parqueo.Controllers;

public class EstadisticaController : Controller
{

    public AccionesEstadistica accionesEstadistica;

    public EstadisticaController()
    {
        accionesEstadistica = new AccionesEstadistica();
    }

    public IActionResult Index()
    {
        return View((GlobalVariables.isSearchEstadistica) ? GlobalVariables.EstadisticasFiltrado : GlobalVariables.Estadisticas);
    }

    [HttpGet]
    public ActionResult searchVenta(string valor, string filtro)
    {
        Models.Enums.EnumSearchEstadistica enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Placa;
        switch (filtro)
        {
            case "1":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Monto;
                break;

            case "2":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Placa;
                break;

            case "3":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Horas;
                break;

        }
        accionesEstadistica.searchValue(valor, enumSearchEstadistica);

        GlobalVariables.isSearchEstadistica = true;

        return Ok();
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchEstadistica = false;

        return Ok();
    }

}

