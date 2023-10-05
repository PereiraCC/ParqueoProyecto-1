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
        return View( (GlobalVariables.isSearchTiquetes) ? GlobalVariables.TiquetesFiltrado : GlobalVariables.Tiquetes);
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

        return View("Index", GlobalVariables.Tiquetes);
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

        return View("Index", GlobalVariables.Tiquetes);
    }

    [HttpGet]
    public ActionResult searchTiquete(string valor)
    {
        accionesTiquetes.searchValue(valor, Models.Enums.EnumSearchTiquetes.Placa);

        GlobalVariables.isSearchTiquetes = true;

        return View("Index", GlobalVariables.TiquetesFiltrado);
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchTiquetes = false;

        return View("Index", GlobalVariables.TiquetesFiltrado);
    }

}

