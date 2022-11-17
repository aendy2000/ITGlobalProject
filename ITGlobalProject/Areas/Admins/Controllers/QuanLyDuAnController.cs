using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyDuAnController : Controller
    {
        // GET: Admins/QuanLyDuAn
        public ActionResult danhSachDuAn()
        {
            ViewBag.ShowActive = "danhSachDuAn";
            return View();
        }
        public ActionResult taoDuAnMoi()
        {
            ViewBag.ShowActive = "taoDuAnMoi";
            return View();
        }
        public ActionResult chiTietDuAn(int? id)
        {
            ViewBag.ShowActive = "danhSachDuAn";
            return View();
        }
        public ActionResult tongQuanPartial(int? id)
        {
            return PartialView("_tongQuanPartial");
        }
        public ActionResult congViecPartial(int? id)
        {
            return PartialView("_congViecPartial");
        }
        public ActionResult nganSachPartial(int? id)
        {
            return PartialView("_nganSachPartial");
        }
        public ActionResult taiLieuPartial(int? id)
        {
            return PartialView("_taiLieuPartial");
        }
        public ActionResult doiNguPartial(int? id)
        {
            return PartialView("_doiNguPartial");
        }
    }
}
