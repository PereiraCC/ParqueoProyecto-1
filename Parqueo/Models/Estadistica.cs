using System;
using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
    public class Estadistica : IEstadistica
    {
        public int idEstadistica { get; set; }
        public float montoGenerado { get; set; }
        public List<Venta> ventas { get; set; }
    }
}

    