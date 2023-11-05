using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesEstadistica
    {
        Task getAllEstadistica();

        Task addValue(Venta venta);

        Task searchValue(string valor, EnumSearchEstadistica tipo);

    }
}

