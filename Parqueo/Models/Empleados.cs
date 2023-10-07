using System;
using Parqueo.Models.Interfaces;

namespace Parqueo.Models
{
    public class Empleados : IEmpleados
    {
        public int IdEmpleado { get; set; }

        public string NumeroEmpleado { get; set; }

        public DateTime FechaIngreso { get; set; }

        public string PrimerNombre { get; set; }

        public string SegundoNombre { get; set; }

        public string PrimerApellido { get; set; }

        public string SegundoApellido { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public string Identificacion { get; set; }

        public string Direccion { get; set; }

        public string CorreoElectronico { get; set; }

        public string Telefono { get; set; }

        public string PersonaContacto { get; set; }
    }
}

