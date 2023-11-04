using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesParqueos
    {
        Task getAllParqueos();

        Task addValue(Parqueos parqueo);

        Task editValue(Parqueos parqueo);

        Task searchValue(string valor, EnumSearchParqueos tipo);

        Task deleteValue(Parqueos parqueo);

    }
}

