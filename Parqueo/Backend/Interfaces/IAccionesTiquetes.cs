using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesTiquetes
    {
        void addValue(Tiquetes tiquete);

        void editValue(Tiquetes tiquete, int idTiquete);

        void searchValue(string valor, EnumSearchTiquetes tipo);

        void deleteValue(Tiquetes tiquete);

    }
}

