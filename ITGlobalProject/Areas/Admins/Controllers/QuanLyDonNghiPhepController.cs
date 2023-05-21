using ITGlobalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;


namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyDonNghiPhepController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyDonNghiPhep
        public ActionResult danhSachDonNghiPhep()
        {
            Session["TuChoiTabDonNghiPhep"] = null;
            ViewBag.ShowActive = "danhSachDonNghiPhep";
            return View("danhSachDonNghiPhep", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList());
        }

        public ActionResult danhSachDonNghiPhepPartial()
        {
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList());
        }

        public ActionResult danhSachDonNghiPhepDaDuyet()
        {
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList());
        }

        public ActionResult danhSachDonNghiPhepDaTuChoi()
        {
            Session["TuChoiTabDonNghiPhep"] = true;
            return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList());
        }

        [HttpPost]
        public ActionResult duyetDon(int? id, string noidung, bool? truluong, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || truluong == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.State = true;
            don.Reply = noidung.Trim();
            don.OnWage = (bool)truluong;
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            Session["TuChoiTabDonNghiPhep"] = null;

            if (typeTab.Equals("choduyet"))
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList());
            else if (typeTab.Equals("duocduyet"))
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList());
            else
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList());

        }

        [HttpPost]
        public ActionResult tuChoiDon(int? id, string noidung, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.State = false;
            don.Reply = noidung.Trim();
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            if (typeTab.Equals("choduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList());
            }
            else if (typeTab.Equals("duocduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList());
            }
            else
            {
                Session["TuChoiTabDonNghiPhep"] = true;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList());
            }
        }

        [HttpPost]
        public ActionResult thayDoi(int? id, string noidung, bool? truluong, string typeTab)
        {
            var don = model.LeaveApplication.Find(id);
            if (id == null || truluong == null || don == null || string.IsNullOrEmpty(typeTab))
                return Content("DANGNHAP");

            don.Reply = noidung.Trim();
            don.OnWage = (bool)truluong;
            don.ResponsiveDate = DateTime.Now;
            model.Entry(don).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();

            if (typeTab.Equals("choduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList());
            }
            else if (typeTab.Equals("duocduyet"))
            {
                Session["TuChoiTabDonNghiPhep"] = null;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList());
            }
            else
            {
                Session["TuChoiTabDonNghiPhep"] = true;
                return PartialView("_danhSachDonNghiPhepPartial", model.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList());
            }
        }

        public ActionResult taoDonNghiPhep()
        {
            ViewBag.ShowActive = "taoDonNghiPhep";
            var leaveType = model.LeaveType.ToList();
            return View("taoDonNghiPhep", leaveType);
        }

        [HttpPost]
        public ActionResult taoDonNghiPhep(int? idEmp, DateTime startDate, DateTime endDate, bool state, string content, bool truluong, int leavetype, decimal realleavedate)
        {
            try
            {
                if (idEmp == null || model.Employees.Find(idEmp) == null)
                    return Content("DANGNHAP");

                if (model.LeaveApplication.Where(l => l.ID_Employee == idEmp && ((l.StartDate >= startDate && l.StartDate <= endDate) || (l.EndDate >= startDate && l.EndDate <= endDate))).Count() > 0)
                    return Content("TRUNG");

                var leave = new LeaveApplication();
                leave.ID_Employee = (int)idEmp;
                leave.StartDate = startDate;
                leave.EndDate = endDate;
                leave.SendDate = DateTime.Now;
                leave.RealLeaveDate = realleavedate;
                leave.ID_ApplyLeaveType = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && a.LeavePeriod == DateTime.Now.Year).ID;

                if (state == true)
                    leave.ResponsiveDate = DateTime.Now;

                leave.State = state;
                leave.Contents = content;
                leave.OnWage = truluong;
                model.LeaveApplication.Add(leave);
                model.SaveChanges();

                return Content("Success");
            }
            catch
            {
                return Content("Error");
            }
        }

        [HttpPost]
        public ActionResult lietKeLoaiNghiPhep(int? idemp)
        {
            if (idemp == null)
                return PartialView("_lstLeaveTypeOfPersonal", model.LeaveType.ToList());

            return PartialView("_lstLeaveTypeOfPersonal", model.LeaveType.Where(l => l.ApplyLeaveType.Where(a => a.ID_Employee == idemp && a.LeavePeriod == DateTime.Now.Year).Count() > 0).ToList());
        }

        [HttpPost]
        public ActionResult soNgayConLai(int? idemp, int? idleavetype, int? idleaveapply)
        {
            if (idemp == null || idleavetype == null)
                return Content("0 ngày");

            var applyleavetype = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Leave_Type == idleavetype && a.ID_Employee == idemp && a.LeavePeriod == DateTime.Now.Year);
            var idapplyleavetype = applyleavetype.ID;
            var tongSoNgayChoPhep = applyleavetype.Entitlement;

            if (model.LeaveApplication.Where(l => l.ID_Employee == idemp && l.ID_ApplyLeaveType == idapplyleavetype).Count() > 0)
            {
                var lstSoNgayDaNghi = model.LeaveApplication.Where(l => l.ID_Employee == idemp && l.ID_ApplyLeaveType == idapplyleavetype).Sum(s => s.RealLeaveDate);
                return Content((tongSoNgayChoPhep - lstSoNgayDaNghi) + " ngày");
            }
            else
            {
                return Content((tongSoNgayChoPhep) + " ngày");
            }
        }
    }
}