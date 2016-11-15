using Microsoft.AspNetCore.Mvc;

namespace Todo.Controllers
{
    [Route("/")]
    public sealed class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}