using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Controllers
{
    public class DuAnThanhCongController : Controller
    {
        // GET: DuAnThanhCong
        public ActionResult Index()
        {
            ViewBag.HeaderPages = "DuAnThanhCong";
            return View("Index");
        }
    }
}