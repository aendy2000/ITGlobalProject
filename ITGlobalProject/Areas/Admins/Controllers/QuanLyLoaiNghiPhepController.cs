﻿using System;
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
            ViewBag.ShowActive = "ApplyNgayNghiPhep";
            var lstLeaveType = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            int year = DateTime.Now.Year;
            Session["exist-applyleave"] = model.ApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == year) != null ? "yes" : "no" ;
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
                    newPeriod.ID_Leave_Type = loai;
                    newPeriod.ID_Employee = idemp;
                    newPeriod.LeavePeriod = nam;
                    newPeriod.Entitlement = ngayhuong;

                    model.ApplyLeaveType.Add(newPeriod);
                    model.SaveChanges();
                }
            }
            var lstLeaveType = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            Session["applyleavetype-year"] = nam;
            Session["exist-applyleave"] = "yes";
            return PartialView("_ApplyNgayNghiPhep", lstLeaveType);
        }
        [HttpPost]
        public ActionResult ChonNam(int year)
        {
            var lstLeaveType = model.LeaveType.OrderByDescending(o => o.ID).ToList();
            Session["applyleavetype-year"] = year;
            Session["exist-applyleave"] = model.ApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == year) != null ? "yes" : "no";
            return PartialView("_ApplyNgayNghiPhep", lstLeaveType);
        }

        [HttpPost]
        public ActionResult XemChiTietApplyNghiPhep(int id, int year)
        {
            var lstApplyLeaveType = model.ApplyLeaveType.Where(a => a.ID_Employee == id && a.LeavePeriod == year).OrderByDescending(o => o.ID).ToList();
            Session["applyleavetype-year"] = year;
            return PartialView("_chiTietApplyNgayNghiPhep", lstApplyLeaveType);
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