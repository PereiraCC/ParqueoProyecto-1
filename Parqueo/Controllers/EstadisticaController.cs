using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Parqueo.Backend;
using Parqueo.Models;
using Parqueo.Models.Configuracion;

namespace Parqueo.Controllers;

public class EstadisticaController : Controller
{

    public AccionesEstadistica accionesEstadistica;

    public EstadisticaController(IOptions<ConfiguracionParqueo> options)
    {
        accionesEstadistica = new AccionesEstadistica(options.Value);
    }

    public async Task<IActionResult> Index()
    {
        await accionesEstadistica.getAllEstadistica();
        return View((GlobalVariables.isSearchEstadistica) ? GlobalVariables.EstadisticasFiltrado : GlobalVariables.Estadisticas);
    }

    [HttpGet]
    public ActionResult searchVenta(string valor, string filtro)
    {
        Models.Enums.EnumSearchEstadistica enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Mes;
        switch (filtro)
        {
            case "1":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Mes;
                break;

            case "2":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Dia;
                break;

            case "3":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.Tiempo;
                break;

            case "4":
                enumSearchEstadistica = Models.Enums.EnumSearchEstadistica.ParqueosVendeMas;
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

