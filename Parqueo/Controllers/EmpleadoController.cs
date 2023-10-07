using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Parqueo.Backend;
using Parqueo.Models;

namespace Parqueo.Controllers;

public class EmpleadoController : Controller
{

    public AccionesEmpleados accionesEmpleados;

    public EmpleadoController()
    {
        accionesEmpleados = new AccionesEmpleados();
    }

    public IActionResult Index()
    {
        return View( (GlobalVariables.isSearchEmpleados) ? GlobalVariables.EmpleadosFiltrado : GlobalVariables.Empleados);
    }

    [HttpGet]
    public ActionResult addEmpleado(Empleados empleado)
    {
        if( GlobalVariables.Empleados.Count() > 0 )
        {
            int ultimoId = GlobalVariables.Empleados.LastOrDefault().IdEmpleado;
            empleado.IdEmpleado = ultimoId + 1;
        } else
        {
            empleado.IdEmpleado = 1;
        }
        
        accionesEmpleados.addValue(empleado);

        GlobalVariables.isSearchEmpleados = false;

        return View("Index", GlobalVariables.Empleados);
    }

    [HttpGet]
    public ActionResult editEmpleado(Empleados empleado)
    {
        
        accionesEmpleados.editValue(empleado, empleado.IdEmpleado);
        GlobalVariables.isSearchEmpleados = false;

        return View("Index", GlobalVariables.Empleados);
    }

    [HttpGet]
    public ActionResult removeEmpleado(Empleados empleado)
    {
        Empleados deleteEmpleado = GlobalVariables.Empleados.Find( empl => empl.IdEmpleado == empleado.IdEmpleado );
        accionesEmpleados.deleteValue(deleteEmpleado);

        GlobalVariables.isSearchEmpleados = false;

        return View("Index", GlobalVariables.Empleados);
    }

    [HttpGet]
    public ActionResult searchEmpleado(string valor, string filtro)
    {
        Models.Enums.EnumSearchEmpleados enumSearchEmpleados = Models.Enums.EnumSearchEmpleados.Nombre;
        switch (filtro)
        {
            case "1":
                enumSearchEmpleados = Models.Enums.EnumSearchEmpleados.Numero;
                break;

            case "2":
                enumSearchEmpleados = Models.Enums.EnumSearchEmpleados.Nombre;
                break;

            case "3":
                enumSearchEmpleados = Models.Enums.EnumSearchEmpleados.Identificacion;
                break;
        }
        accionesEmpleados.searchValue(valor, enumSearchEmpleados);

        GlobalVariables.isSearchEmpleados = true;

        return View("Index", GlobalVariables.EmpleadosFiltrado);
    }

    [HttpGet]
    public ActionResult mostrarTodos()
    {
        GlobalVariables.isSearchEmpleados = false;

        return View("Index", GlobalVariables.Empleados);
    }

}

