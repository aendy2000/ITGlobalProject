using ITGlobalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyDonNghiPhepController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyDonNghiPhep
        public ActionResult danhSachDonNghiPhep()
        {
            ViewBag.ShowActive = "danhSachDonNghiPhep";
            return View("danhSachDonNghiPhep", model.LeaveApplication.ToList());
        }
    }
}