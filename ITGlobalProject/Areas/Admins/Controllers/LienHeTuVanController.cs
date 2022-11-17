using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class LienHeTuVanController : Controller
    {
        // GET: Admins/LienHeTuVan
        public ActionResult thongTinLienHeTuVan()
        {
            ViewBag.ShowActive = "thongTinLienHeTuVan";
            return View();
        }
    }
}