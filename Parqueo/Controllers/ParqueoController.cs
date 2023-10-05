using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Parqueo.Backend;
using Parqueo.Models;

namespace Parqueo.Controllers;

public class ParqueoController : Controller
{

    public AccionesParqueos accionesParqueos;

    public ParqueoController()
    {
        accionesParqueos = new AccionesParqueos();
    }

    public IActionResult Index()
    {
        return View( (GlobalVariables.isSearchParqueos) ? GlobalVariables.ParqueosFiltrado : GlobalVariables.Parqueos);
    }

    [HttpGet]
    public ActionResult addParqueo(Parqueos parqueo)
    {
        if( GlobalVariables.Parqueos.Count() > 0 )
        {
            int ultimoId = GlobalVariables.Parqueos.LastOrDefault().idParqueo;
            parqueo.idParqueo = ultimoId + 1;
        } else
        {
            parqueo.idParqueo = 1;
        }
        
        accionesParqueos.addValue(parqueo);

        GlobalVariables.isSearchParqueos = false;

        return View("Index", GlobalVariables.Parqueos);
    }

    [HttpGet]
    public ActionResult editParqueo(Parqueos parqueo)
    {
        
        accionesParqueos.editValue(parqueo, parqueo.idParqueo);
        GlobalVariables.isSearchParqueos = false;

        return View("Index", GlobalVariables.Parqueos);
    }

    [HttpGet]
    public ActionResult removeParqueo(Parqueos parqueo)
    {
        Parqueos deleteParqueo = GlobalVariables.Parqueos.Find( par => par.idParqueo == parqueo.idParqueo );
        accionesParqueos.deleteValue(deleteParqueo);

        GlobalVariables.isSearchParqueos = false;

        return View("Index", GlobalVariables.Parqueos);
    }

    [HttpGet]
    public ActionResult searchParqueo(string valor)
    {
        accionesParqueos.searchValue(valor, Models.Enums.EnumSearchParqueos.Nombre);

        GlobalVariables.isSearchParqueos = true;

        return View("Index", GlobalVariables.ParqueosFiltrado);
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchParqueos = false;

        return View("Index", GlobalVariables.Parqueos);
    }

}

