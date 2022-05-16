using Microsoft.AspNetCore.Authentication;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOcelot();
builder.Services.AddAuthentication("BasicAuthentication")
         .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
builder.Services.AddScoped<IUserService, UserService>();


var app = builder.Build();
app.UseOcelot().Wait();
// app.UseCors(x => x
//     .AllowAnyOrigin()
//     .AllowAnyMethod()
//     .AllowAnyHeader()
//     .AllowCredentials());
app.UseAuthentication();
app.Run();