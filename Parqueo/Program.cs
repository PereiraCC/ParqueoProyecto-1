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

GlobalVariables.Tiquetes = new List<Tiquetes>();
GlobalVariables.Tiquetes.Add(new Tiquetes()
{
    idTiquete = 1,
    fechaIngreso = DateTime.Now,
    fechaSalida = DateTime.Now,
    placa = "123",
    tarifaHora = 12,
    tarifaMediaHora = 12
});
GlobalVariables.TiquetesFiltrado = new List<Tiquetes>();
GlobalVariables.isSearchTiquetes = false;

GlobalVariables.Parqueos = new List<Parqueos>();
GlobalVariables.ParqueosFiltrado = new List<Parqueos>();

GlobalVariables.Empleados = new List<Empleados>();
GlobalVariables.EmpleadosFiltrado = new List<Empleados>();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();


