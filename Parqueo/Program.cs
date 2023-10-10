using Parqueo.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Se establecen la inicializacion de Tiquetes
GlobalVariables.Tiquetes = new List<Tiquetes>();
GlobalVariables.TiquetesFiltrado = new List<Tiquetes>();
GlobalVariables.isSearchTiquetes = false;

// Se establecen la inicializacion de Parqueos
GlobalVariables.Parqueos = new List<Parqueos>();
GlobalVariables.ParqueosFiltrado = new List<Parqueos>();
GlobalVariables.isSearchParqueos = false;

// Se establecen la inicializacion de Empleados
GlobalVariables.Empleados = new List<Empleados>();
GlobalVariables.EmpleadosFiltrado = new List<Empleados>();
GlobalVariables.isSearchEmpleados = false;

// Se establecen la inicializacion de Estadistica
GlobalVariables.Estadisticas = new Estadistica();
GlobalVariables.Estadisticas.ventas = new List<Venta>();
GlobalVariables.EstadisticasFiltrado = new Estadistica();
GlobalVariables.EstadisticasFiltrado.ventas = new List<Venta>();
GlobalVariables.isSearchEstadistica = false;

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


