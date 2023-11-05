using System;
using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
    public class Venta : IVenta
    {
        public int idVenta { get; set; }
        public string NombreParqueo { get; set; }
        public string NombreEmpleado { get; set; }
        public DateTime fechaIngreso { get; set; }
        public DateTime fechaSalida { get; set; }
        public string placa { get; set; }
        public float montoPagar { get; set; }
        public string tiempoConsumido { get; set; }
    }
}

