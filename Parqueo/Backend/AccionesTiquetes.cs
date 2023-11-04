using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Parqueo.Backend.Interfaces;
using Parqueo.Backend.Procesador;
using Parqueo.Models;
using Parqueo.Models.Configuracion;
using Parqueo.Models.Enums;

namespace Parqueo.Backend
{
    public class AccionesTiquetes : IAccionesTiquetes
    {
        public ProcesadorAPI procesador;

        public AccionesTiquetes(ConfiguracionParqueo configuracionParqueo)
        {
            procesador = new ProcesadorAPI(configuracionParqueo);
        }

        public async Task getAllTiquetes()
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Tiquetes/GetAll",
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Tiquetes>> tiquetes = JsonConvert.DeserializeObject<ResponseGeneric<List<Tiquetes>>>(response.Responses.ToString());
                    GlobalVariables.Tiquetes = tiquetes.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task addValue(Tiquetes tiquete)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Tiquetes/Create",
                    Request = tiquete
                };

                string json = JsonConvert.SerializeObject(tiquete);

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Tiquetes>> tiquetes = JsonConvert.DeserializeObject<ResponseGeneric<List<Tiquetes>>>(response.Responses.ToString());
                    GlobalVariables.Tiquetes = tiquetes.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task deleteValue(Tiquetes tiquete)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Tiquetes/Delete?idTiquete={tiquete.idTiquete}",
                    Request = tiquete
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Tiquetes>> tiquetes = JsonConvert.DeserializeObject<ResponseGeneric<List<Tiquetes>>>(response.Responses.ToString());
                    GlobalVariables.Tiquetes = tiquetes.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task editValue(Tiquetes tiquete)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Tiquetes/Edit",
                    Request = tiquete
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Tiquetes>> tiquetes = JsonConvert.DeserializeObject<ResponseGeneric<List<Tiquetes>>>(response.Responses.ToString());
                    GlobalVariables.Tiquetes = tiquetes.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task searchValue(string valor, EnumSearchTiquetes tipo)
        {
            try
            {

                string tipoBusqueda = "1";

                switch (tipo)
                {
                    case EnumSearchTiquetes.Placa:
                        tipoBusqueda = "1";
                        break;

                    case EnumSearchTiquetes.Numero:
                        tipoBusqueda = "2";
                        break;

                    case EnumSearchTiquetes.Parqueo:
                        tipoBusqueda = "3";
                        break;

                    case EnumSearchTiquetes.Empleado:
                        tipoBusqueda = "4";
                        break;
                }

                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Tiquetes/Search?valor={valor}&tipo={tipoBusqueda}",
                    Request = new object { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Tiquetes>> tiquetes = JsonConvert.DeserializeObject<ResponseGeneric<List<Tiquetes>>>(response.Responses.ToString());
                    GlobalVariables.TiquetesFiltrado = tiquetes.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

