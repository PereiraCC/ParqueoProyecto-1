namespace Parqueo.Models.Interfaces
{
    public interface IEmpleados
    {
        int IdEmpleado { get; set; }

        string NumeroEmpleado { get; set; }

        DateTime FechaIngreso { get; set; }

        string PrimerNombre { get; set; }

        string SegundoNombre { get; set; }

        string PrimerApellido { get; set; }

        string SegundoApellido { get; set; }

        DateTime FechaNacimiento { get; set; }

        string Identificacion { get; set; }

        string Direccion { get; set; }

        string CorreoElectronico { get; set; }

        string Telefono { get; set; }

        string PersonaContacto { get; set; }
    }
}
