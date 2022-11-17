using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Admins/Dashboard
        public ActionResult Overview()
        {
            ViewBag.ShowActive = "Overview";
            return View();
        }
        public ActionResult Analystics()
        {
            ViewBag.ShowActive = "Analystics";
            return View();
        }
    }
}