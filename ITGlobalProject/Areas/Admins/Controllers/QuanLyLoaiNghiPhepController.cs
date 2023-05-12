using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;
using System.Data.Entity;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyLoaiNghiPhepController : Controller
    {

        // GET: Admins/QuanLyLoaiNghiPhep
        CP25Team06Entities model = new CP25Team06Entities();
        public ActionResult danhSachLoaiNghiPhep()
        {
            ViewBag.ShowActive = "danhSachLoaiNghiPhep";
            var lstLoaiNghiPhep = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            return View("danhsachloainghiphep", lstLoaiNghiPhep);
        }

        public ActionResult ApplyNgayNghiPhep()
        {
            ViewBag.ShowActive = "danhSachLoaiNghiPhep";
            var lstApplyNgayNghi = model.ApplyLeaveType.OrderByDescending(o => o.ID).ToList();
            return View("ApplyNgayNghiPhep", lstApplyNgayNghi);
        }

        [HttpPost]
        public ActionResult themlstLoaiNghiPhep(string name, bool tinhluong)
        {
            if (string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            LeaveType leavetype = new LeaveType();
            leavetype.Name = name;
            leavetype.Sate = tinhluong;
            model.LeaveType.Add(leavetype);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstLoaiNghiPhep = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            return PartialView("_danhSachLoaiNghiPhepPartial", lstLoaiNghiPhep);
        }

        [HttpPost]
        public ActionResult chinhSuaLoaiNghiPhep(int? id, string name, bool tinhluong)
        {
            var leavetype = model.LeaveType.Find(id);
            if (leavetype == null || id == null || string.IsNullOrEmpty(name))
                return Content("DANHSACH");

            leavetype.Name = name;
            leavetype.Sate = tinhluong;
            model.Entry(leavetype).State = EntityState.Modified;
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstLoaiNghiPhep = model.LeaveType.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachLoaiNghiPhepPartial", lstLoaiNghiPhep);
        }

        [HttpPost]
        public ActionResult xoaLoaiNghiPhep(int? id)
        {
            var leavetype = model.LeaveType.Find(id);
            if (id == null || leavetype == null)
                return Content("DANHSACH");

            model.LeaveType.Remove(leavetype);
            model.SaveChanges();
            model = new CP25Team06Entities();

            var lstLoaiNghiPhep = model.LeaveType.OrderByDescending(d => d.ID).ToList();
            return PartialView("_danhSachLoaiNghiPhepPartial", lstLoaiNghiPhep);
        }
    }
}