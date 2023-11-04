namespace Parqueo.Models.Configuracion
{
    public class ResponseGeneric<T> : Response
    {
        public T Responses { get; set; }

        public ResponseGeneric(T response)
        {
            Responses = response;
            base.currentException = null;
        }
        public ResponseGeneric(Exception currentException) : base(currentException)
        {
            Responses = default(T);
        }

        public ResponseGeneric()
        {
        }
    }
}
