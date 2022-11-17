using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyTinTuyenDungController : Controller
    {
        // GET: Admins/QuanLyTinTuyenDung
        public ActionResult danhSachTinTuyenDung()
        {
            ViewBag.ShowActive = "danhSachTinTuyenDung";
            return View();
        }
        public ActionResult themTinTuyenDung()
        {
            ViewBag.ShowActive = "themTinTuyenDung";
            return View();
        }
        public ActionResult suaTinTuyenDung()
        {
            ViewBag.ShowActive = "danhSachTinTuyenDung";
            return View();
        }
    }
}