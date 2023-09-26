using System;
using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
	public class Tiquetes : ITiquetes
    {
        public int idTiquete { get; set; }

        public DateTime fechaIngreso { get; set; }

        public DateTime fechaSalida { get; set; }

        public string placa { get; set; }

        public float tarifaHora { get; set; }

        public float tarifaMediaHora { get; set; }
        
    }
}

