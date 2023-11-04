using System;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend.Interfaces
{
    public interface IAccionesTiquetes
    {
        Task getAllTiquetes();

        Task addValue(Tiquetes tiquete);

        Task editValue(Tiquetes tiquete);

        Task searchValue(string valor, EnumSearchTiquetes tipo);

        Task deleteValue(Tiquetes tiquete);

    }
}

