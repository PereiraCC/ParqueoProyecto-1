using System;
using System.Collections.Generic;
using Parqueo.Backend.Interfaces;
using Parqueo.Models;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesTiquetes : IAccionesTiquetes
    {

        public AccionesTiquetes()
        {
        }

        public void addValue(Tiquetes tiquete)
        {
            try
            {
                // Se agrega el nuevo tiquete
                GlobalVariables.Tiquetes.Add(tiquete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void deleteValue(Tiquetes tiquete)
        {
            try
            {
                // Se eliminar el tiquete
                GlobalVariables.Tiquetes.Remove(tiquete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void editValue(Tiquetes tiquete, int idTiquete)
        {
            try
            {
                // Se busca el index de tiquete a modificar
                int indexTiquete = GlobalVariables.Tiquetes.FindIndex(ticket => ticket.idTiquete == idTiquete);

                // Se valida que index sea correcto
                if (indexTiquete != -1)
                {
                    // Se modifica el objeto
                    GlobalVariables.Tiquetes[indexTiquete].fechaSalida = tiquete.fechaSalida;
                    GlobalVariables.Tiquetes[indexTiquete].montoPagar = tiquete.montoPagar;
                    GlobalVariables.Tiquetes[indexTiquete].tiempoConsumido = tiquete.tiempoConsumido;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void searchValue(string valor, EnumSearchTiquetes tipo)
        {
            try
            {

                if (valor.Equals("*"))
                {
                    GlobalVariables.TiquetesFiltrado = GlobalVariables.Tiquetes;
                }

                switch (tipo)
                {
                    case EnumSearchTiquetes.Placa:
                        GlobalVariables.TiquetesFiltrado = GlobalVariables.Tiquetes.Where(ticket => ticket.placa.Equals(valor)).ToList();
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

