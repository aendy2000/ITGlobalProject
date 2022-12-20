using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Controllers
{
    public class GioiThieuController : Controller
    {
        // GET: GioiThieu
        public ActionResult Index()
        {
            ViewBag.HeaderPages = "GioiThieu";
            return View("Index");
        }
    }
}