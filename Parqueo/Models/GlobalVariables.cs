using System;
namespace Parqueo.Models
{
    public static class GlobalVariables
    {
        // readonly variable
        public static List<Tiquetes> Tiquetes { get; set; }

        public static List<Tiquetes> TiquetesFiltrado { get; set; }

        public static bool isSearchTiquetes { get; set; }

        public static List<Parqueos> Parqueos { get; set; }

        public static List<Parqueos> ParqueosFiltrado { get; set; }

        public static bool isSearchParqueos { get; set; }

        public static List<Empleados> Empleados { get; set; }

        public static List<Empleados> EmpleadosFiltrado { get; set; }

        public static bool isSearchEmpleados { get; set; }

        public static Estadistica Estadisticas { get; set; }

        public static Estadistica EstadisticasFiltrado { get; set; }

        public static bool isSearchEstadistica { get; set; }

    }
}