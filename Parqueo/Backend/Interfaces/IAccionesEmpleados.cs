using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesEmpleados
    {
        void addValue(Empleados empleado);

        void editValue(Empleados empleado, int idEmpleado);

        void searchValue(string valor, EnumSearchEmpleados tipo);

        void deleteValue(Empleados empleado);

    }
}

