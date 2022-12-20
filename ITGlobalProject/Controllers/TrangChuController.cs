using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Controllers
{
    public class TrangChuController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.HeaderPages = "TrangChu";
            return View("Index");
        }
    }
}