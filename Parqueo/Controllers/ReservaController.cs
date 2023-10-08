using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Parqueo.Backend;
using Parqueo.Models;

namespace Parqueo.Controllers;

public class ReservaController : Controller
{

    public AccionesTiquetes accionesTiquetes;

    public ReservaController()
    {
        accionesTiquetes = new AccionesTiquetes();
    }

    public IActionResult Index()
    {
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
        
        accionesTiquetes.editValue(tiquete, tiquete.idTiquete);
        GlobalVariables.isSearchTiquetes = false;

        return View("Index", GlobalVariables.Tiquetes);
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
    public ActionResult searchTiquete(string valor)
    {
        accionesTiquetes.searchValue(valor, Models.Enums.EnumSearchTiquetes.Placa);

        GlobalVariables.isSearchTiquetes = true;

        return Ok();
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchTiquetes = false;

        return Ok();
    }

}

