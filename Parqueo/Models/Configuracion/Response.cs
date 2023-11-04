namespace Parqueo.Models.Configuracion
{
    public class Response
    {
        public Response()
        {
            Status = ResponseStatus.Success;
            currentException = null;
        }

        public Response(string currentException)
        {
            Status = ResponseStatus.Failed;
            this.currentException = currentException;
        }

        public Response(Exception currentException)
        {
            Status = ResponseStatus.Failed;
            this.currentException = currentException.Message;
        }

        public ResponseStatus Status { get; set; }

        public string currentException { get; set; }

        public enum ResponseStatus
        {
            Success = 0,
            Failed = 1
        }
    }
}
