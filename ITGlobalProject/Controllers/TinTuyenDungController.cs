using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Controllers
{
    public class TinTuyenDungController : Controller
    {
        // GET: TinTuyenDung
        public ActionResult thongTinTuyenDung(int? id)
        {
            ViewBag.HeaderPages = "TinTuyenDung";
            return View();
        }
        public ActionResult danhSachTinTuyenDung()
        {
            ViewBag.HeaderPages = "TinTuyenDung";
            return View();
        }
    }
}