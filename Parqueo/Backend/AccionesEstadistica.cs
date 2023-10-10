using System;
using System.Collections.Generic;
using Parqueo.Backend.Interfaces;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesEstadistica : IAccionesEstadistica
    {

        public AccionesEstadistica()
        {
        }

        public void addValue(Venta venta)
        {
            try
            {
                // Se agrega el nombre del parqueo
                venta.NombreParqueo = GlobalVariables.Parqueos.FirstOrDefault().Nombre;

                // Se calcula el monto
                GlobalVariables.Estadisticas.montoGenerado += venta.montoPagar;
                GlobalVariables.EstadisticasFiltrado.montoGenerado += venta.montoPagar;

                if (GlobalVariables.Estadisticas.ventas.Count() > 0)
                {
                    int ultimoId = GlobalVariables.Estadisticas.ventas.LastOrDefault().idVenta;
                    venta.idVenta = ultimoId + 1;
                }
                else
                {
                    venta.idVenta = 1;
                }

                // Se agrega el nuevo tiquete
                GlobalVariables.Estadisticas.ventas.Add(venta);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void searchValue(string valor, EnumSearchEstadistica tipo)
        {
            try
            {

                if (valor.Equals("*"))
                {
                    GlobalVariables.EstadisticasFiltrado.ventas = GlobalVariables.Estadisticas.ventas;
                }

                switch (tipo)
                {
                    case EnumSearchEstadistica.Monto:
                        GlobalVariables.EstadisticasFiltrado.ventas = GlobalVariables.Estadisticas.ventas.Where(estadistica => estadistica.montoPagar.ToString().Equals(valor)).ToList();
                        break;

                    case EnumSearchEstadistica.Placa:
                        GlobalVariables.EstadisticasFiltrado.ventas = GlobalVariables.Estadisticas.ventas.Where(estadistica => estadistica.placa.Equals(valor)).ToList();
                        break;

                    case EnumSearchEstadistica.Horas:
                        GlobalVariables.EstadisticasFiltrado.ventas = GlobalVariables.Estadisticas.ventas.Where(estadistica => estadistica.fechaIngreso.ToString("HH:mm").Equals(valor)).ToList();
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

