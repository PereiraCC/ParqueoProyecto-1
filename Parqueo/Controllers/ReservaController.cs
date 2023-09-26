using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
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
        return View(GlobalVariables.Tiquetes);
    }

    [HttpPost]
    public JsonResult addTiquete(Tiquetes tiquete)
    {
        accionesTiquetes.addValue(tiquete);

        return Json(GlobalVariables.Tiquetes);
    }

    //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    //public IActionResult Error()
    //{
    //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    //}
}

