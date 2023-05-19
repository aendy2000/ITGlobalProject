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
            var lstLeaveType = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            return View("ApplyNgayNghiPhep", lstLeaveType);
        }
        [HttpPost]
        public ActionResult ApplyNgayNghiPhep(int nam, int loai, string lstId, int ngayhuong)
        {
            var lstidEmp = lstId.Split('-').ToList();
            foreach (var item in lstidEmp)
            {
                int idemp = Int32.Parse(item);
                var period = model.ApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == nam && a.ID_Employee == idemp && a.ID_Leave_Type == loai);
                if (period != null)
                {
                    period.ID_Leave_Type = loai;
                    period.ID_Employee = idemp;
                    period.Entitlement = ngayhuong;

                    model.Entry(period).State = EntityState.Modified;
                    model.SaveChanges();
                }
                else
                {
                    ApplyLeaveType newPeriod = new ApplyLeaveType();
                    period.ID_Leave_Type = loai;
                    period.ID_Employee = idemp;
                    period.LeavePeriod = nam;
                    period.Entitlement = ngayhuong;

                    model.ApplyLeaveType.Add(period);
                    model.SaveChanges();
                }
            }
            var lstLeaveType = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            return PartialView("_ApplyNgayNghiPhep", lstLeaveType);
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
        public ActionResult thayDoiTrangThai(int? id, bool tinhluong)
        {
            var leavetype = model.LeaveType.Find(id);
            if (leavetype == null || id == null)
                return Content("DANHSACH");

            leavetype.Sate = tinhluong;
            model.Entry(leavetype).State = EntityState.Modified;
            model.SaveChanges();

            return Content("Success");
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