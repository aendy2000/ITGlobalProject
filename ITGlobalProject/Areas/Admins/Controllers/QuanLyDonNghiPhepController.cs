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
            return View("taoDonNghiPhep");
        }

        [HttpPost]
        public ActionResult taoDonNghiPhep(int? idEmp, DateTime startDate, DateTime endDate, bool state, string content,
            bool truluong)
        {
            try
            {
                if (idEmp == null || model.Employees.Find(idEmp) == null)
                    return Content("DANGNHAP");

                var leave = new LeaveApplication();
                leave.ID_Employee = (int)idEmp;
                leave.StartDate = startDate;
                leave.EndDate = endDate;
                leave.SendDate = DateTime.Now;

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
    }
}