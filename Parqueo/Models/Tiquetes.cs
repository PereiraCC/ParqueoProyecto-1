using System;
using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
	public class Tiquetes : ITiquetes
    {
        public int idTiquete { get; set; }

        public int idParqueo { get; set; }

        public string nombreParqueo { get; set; }

        public int idEmpleado { get; set; }

        public string nombreEmpleado { get; set; }

        public DateTime fechaIngreso { get; set; }

        public DateTime fechaSalida { get; set; }

        public string placa { get; set; }

        public float montoPagar { get; set; }

        public string tiempoConsumido { get; set; }

        public bool venta { get; set; }
        
    }
}

