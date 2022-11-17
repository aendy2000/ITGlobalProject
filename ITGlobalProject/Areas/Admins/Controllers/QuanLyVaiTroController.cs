using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyVaiTroController : Controller
    {
        // GET: Admins/QuanLyVaiTro
        public ActionResult danhSachVaiTro()
        {
            ViewBag.ShowActive = "danhSachVaiTro";
            return View();
        }
    }
}