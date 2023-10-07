using System;
using System.Collections.Generic;
using Parqueo.Backend.Interfaces;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesEmpleados : IAccionesEmpleados
    {

        public AccionesEmpleados()
        {
        }

        public void addValue(Empleados empleado)
        {
            try
            {
                // Se agrega el nuevo tiquete
                GlobalVariables.Empleados.Add(empleado);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void deleteValue(Empleados empleado)
        {
            try
            {
                // Se eliminar el tiquete
                GlobalVariables.Empleados.Remove(empleado);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void editValue(Empleados empleado, int idEmpleado)
        {
            try
            {
                // Se busca el index de tiquete a modificar
                int indexEmpleado = GlobalVariables.Empleados.FindIndex(emple => emple.IdEmpleado == idEmpleado);

                // Se valida que index sea correcto
                if (indexEmpleado != -1)
                {
                    // Se modifica el objeto
                    GlobalVariables.Empleados[indexEmpleado].NumeroEmpleado = empleado.NumeroEmpleado;
                    GlobalVariables.Empleados[indexEmpleado].FechaIngreso = empleado.FechaIngreso;
                    GlobalVariables.Empleados[indexEmpleado].PrimerNombre = empleado.PrimerNombre;
                    GlobalVariables.Empleados[indexEmpleado].SegundoNombre = empleado.SegundoNombre;
                    GlobalVariables.Empleados[indexEmpleado].PrimerApellido = empleado.PrimerApellido;
                    GlobalVariables.Empleados[indexEmpleado].SegundoApellido = empleado.SegundoApellido;
                    GlobalVariables.Empleados[indexEmpleado].FechaNacimiento = empleado.FechaNacimiento;
                    GlobalVariables.Empleados[indexEmpleado].Identificacion = empleado.Identificacion;
                    GlobalVariables.Empleados[indexEmpleado].Dirrecion = empleado.Dirrecion;
                    GlobalVariables.Empleados[indexEmpleado].CorreoElectronico = empleado.CorreoElectronico;
                    GlobalVariables.Empleados[indexEmpleado].Telefono = empleado.Telefono;
                    GlobalVariables.Empleados[indexEmpleado].PersonaContacto = empleado.PersonaContacto;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void searchValue(string valor, EnumSearchEmpleados tipo)
        {
            try
            {

                if (valor.Equals("*"))
                {
                    GlobalVariables.EmpleadosFiltrado = GlobalVariables.Empleados;
                }

                switch (tipo)
                {
                    case EnumSearchEmpleados.Numero:
                        GlobalVariables.EmpleadosFiltrado = GlobalVariables.Empleados.Where(empleado => empleado.NumeroEmpleado.Contains(valor)).ToList();
                        break;

                    case EnumSearchEmpleados.Nombre:
                        GlobalVariables.EmpleadosFiltrado = GlobalVariables.Empleados.Where(empleado => empleado.PrimerNombre.Contains(valor) || empleado.SegundoNombre.Contains(valor)).ToList();
                        break;

                    case EnumSearchEmpleados.Identificacion:
                        GlobalVariables.EmpleadosFiltrado = GlobalVariables.Empleados.Where(empleado => empleado.Identificacion.Contains(valor)).ToList();
                        break;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

