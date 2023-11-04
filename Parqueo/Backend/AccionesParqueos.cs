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
    public class AccionesParqueos : IAccionesParqueos
    {
        public ProcesadorAPI procesador;

        public AccionesParqueos(ConfiguracionParqueo configuracionParqueo)
        {
            procesador = new ProcesadorAPI(configuracionParqueo);
        }

        public async Task getAllParqueos()
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Parqueo/GetAll",
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Parqueos>> parqueos = JsonConvert.DeserializeObject<ResponseGeneric<List<Parqueos>>>(response.Responses.ToString());
                    GlobalVariables.Parqueos = parqueos.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task addValue(Parqueos parqueo)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Parqueo/Create",
                    Request = parqueo
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Parqueos>> parqueos = JsonConvert.DeserializeObject<ResponseGeneric<List<Parqueos>>>(response.Responses.ToString());
                    GlobalVariables.Parqueos = parqueos.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task deleteValue(Parqueos parqueo)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Parqueo/Delete?idParqueo={parqueo.idParqueo}",
                    Request = new object() { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Parqueos>> parqueos = JsonConvert.DeserializeObject<ResponseGeneric<List<Parqueos>>>(response.Responses.ToString());
                    GlobalVariables.Parqueos = parqueos.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task editValue(Parqueos parqueo)
        {
            try
            {
                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = "/api/Parqueo/Edit",
                    Request = parqueo
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Parqueos>> parqueos = JsonConvert.DeserializeObject<ResponseGeneric<List<Parqueos>>>(response.Responses.ToString());
                    GlobalVariables.Parqueos = parqueos.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task searchValue(string valor, EnumSearchParqueos tipo)
        {
            try
            {
                string tipoBusqueda = "1";

                switch (tipo)
                {
                    case EnumSearchParqueos.Nombre:
                        tipoBusqueda = "1";
                        break;

                    case EnumSearchParqueos.CantididadVehiculos:
                        tipoBusqueda = "2";
                        break;

                    case EnumSearchParqueos.Tarifa:
                        tipoBusqueda = "3";
                        break;
                }

                // Se crea el request
                RequestGeneric requestGeneric = new RequestGeneric()
                {
                    EndPoint = $"/api/Parqueo/Search?valor={valor}&tipo={tipoBusqueda}",
                    Request = new object { }
                };

                // Se comsume el procesador
                ResponseGeneric<object> response = await procesador.Procesar(requestGeneric);

                // Se valida la respuesta
                if (response.Status == 0)
                {
                    // Se parse el response
                    ResponseGeneric<List<Parqueos>> parqueos = JsonConvert.DeserializeObject<ResponseGeneric<List<Parqueos>>>(response.Responses.ToString());
                    GlobalVariables.ParqueosFiltrado = parqueos.Responses;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

