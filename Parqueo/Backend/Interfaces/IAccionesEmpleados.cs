using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesEmpleados
    {
        Task getAllEmpleados();

        Task addValue(Empleados empleado);

        Task editValue(Empleados empleado);

        Task searchValue(string valor, EnumSearchEmpleados tipo);

        Task deleteValue(Empleados empleado);

    }
}

