using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList.Mvc;
using PagedList;
using System.Globalization;
using System.Web.WebPages;
using System.Data.Entity.Validation;
using System.Data.Entity;
using System.IO;
using Firebase.Auth;
using System.Threading;
using Firebase.Storage;
using System.Threading.Tasks;
using System.Text;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;
using System.Net.Mail;
using System.Net;
using System.Reflection;

namespace ITGlobalProject.Areas.Employee.Controllers
{
    public class QuanLyDonNghiPhepController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Employee/QuanLyDonNghiPhep
        public ActionResult danhSachDonNghiPhep(int id)
        {
            Session["typetab"] = "choDuyet";
            ViewBag.ShowActive = "ttdonnghiphep";

            int idemp = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            Session["lst-leavetype"] = model.LeaveType.Where(l => l.ApplyLeaveType.Where(a => a.LeavePeriod == DateTime.Now.Year && a.ID_Employee == idemp).Count() > 0).ToList();
            return View("danhSachDonNghiPhep", donNghiPhep);
        }

        public ActionResult danhSachDonNghiPhepPartial()
        {
            Session["typetab"] = "choDuyet";
            int id = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult danhSachDonNghiPhepDaDuyetPartial()
        {
            Session["typetab"] = "daDuyet";
            int id = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == true).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult danhSachDonNghiPhepTuChoiPartial()
        {
            Session["typetab"] = "daHuy";
            int id = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate != null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult xoaDon(int idleave)
        {
            var leave = model.LeaveApplication.Find(idleave);
            model.LeaveApplication.Remove(leave);
            model.SaveChanges();

            int id = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult capNhat(int idleave, int leavetype, DateTime startDate, DateTime endDate, string contents, decimal realleavedate)
        {
            Session["typetab"] = "choDuyet";
            int idEmp = Int32.Parse(Session["user-id"].ToString());
            var leave = model.LeaveApplication.Find(idleave);
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.Contents = contents.Trim();
            leave.RealLeaveDate = realleavedate;
            leave.ID_ApplyLeaveType = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && a.LeavePeriod == DateTime.Now.Year).ID;

            model.Entry(leave).State = EntityState.Modified;
            model.SaveChanges();

            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == idEmp && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult taodonnghiphep(int leavetype, DateTime startDate, DateTime endDate, string contents, string typeTab, decimal realleavedate)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            int idEmp = Int32.Parse(Session["user-id"].ToString());

            if (model.LeaveApplication.Where(l => l.ID_Employee == idEmp && ((l.StartDate >= startDate && l.StartDate <= endDate) || (l.EndDate >= startDate && l.EndDate <= endDate))).Count() > 0)
                return Content("TRUNG");

            var leave = new LeaveApplication();
            leave.ID_Employee = (int)idEmp;
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.SendDate = DateTime.Now;
            leave.RealLeaveDate = realleavedate;
            leave.ID_ApplyLeaveType = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && a.LeavePeriod == DateTime.Now.Year).ID;
            leave.Contents = contents.Trim();
            leave.State = false;

            model.LeaveApplication.Add(leave);
            model.SaveChanges();
            model = new CP25Team06Entities();
            if (typeTab.Equals("choDuyet"))
            {
                var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == idEmp && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
                return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
            }
            else
            {
                return Content("success");
            }
        }

        [HttpPost]
        public ActionResult soNgayConLai(int? idleavetype)
        {
            if (idleavetype == null)
                return Content("0 ngày");
            int idemp = Int32.Parse(Session["user-id"].ToString());
            var applyleavetype = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Leave_Type == idleavetype && a.ID_Employee == idemp && a.LeavePeriod == DateTime.Now.Year);
            var idapplyleavetype = applyleavetype.ID;
            var tongSoNgayChoPhep = applyleavetype.Entitlement;

            if(model.LeaveApplication.Where(l => l.ID_Employee == idemp && l.ID_ApplyLeaveType == idapplyleavetype).Count() > 0)
            {
                var lstSoNgayDaNghi = model.LeaveApplication.Where(l => l.ID_Employee == idemp && l.ID_ApplyLeaveType == idapplyleavetype).Sum(s => s.RealLeaveDate);
                return Content((tongSoNgayChoPhep - lstSoNgayDaNghi) + " ngày");
            }
            else
            {
                return Content((tongSoNgayChoPhep) + " ngày");
            }

        }

        [HttpPost]
        public ActionResult soNgayConLaiChinhSua(int? idleavetype, decimal butru)
        {
            if (idleavetype == null)
                return Content("0 ngày");
            int idemp = Int32.Parse(Session["user-id"].ToString());
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