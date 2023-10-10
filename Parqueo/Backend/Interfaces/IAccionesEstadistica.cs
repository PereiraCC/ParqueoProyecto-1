using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesEstadistica
    {
        void addValue(Venta venta);

        void searchValue(string valor, EnumSearchEstadistica tipo);

    }
}

