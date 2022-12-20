using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Controllers
{
    public class HoiDapController : Controller
    {
        // GET: HoiDap
        public ActionResult Index()
        {
            ViewBag.HeaderPages = "HoiDap";
            return View("Index");
        }
    }
}