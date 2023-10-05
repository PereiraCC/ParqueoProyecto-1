using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesParqueos
    {
        void addValue(Parqueos parqueo);

        void editValue(Parqueos parqueo, int idParqueo);

        void searchValue(string valor, EnumSearchParqueos tipo);

        void deleteValue(Parqueos parqueo);

    }
}

