using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyLuongController : Controller
    {
        // GET: Admins/ChamCongTinhLuong
        public ActionResult bangLuong()
        {
            ViewBag.ShowActive = "bangLuong";
            return View();
        }
        public ActionResult danhSachLuongThang()
        {
            ViewBag.ShowActive = "bangLuong";
            return View();
        }
        public ActionResult tinhLuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        public ActionResult tinhLuongThuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        public ActionResult chiSoThue()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
    }
}