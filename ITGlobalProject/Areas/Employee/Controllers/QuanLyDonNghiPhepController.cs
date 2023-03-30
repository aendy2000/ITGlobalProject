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
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
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

        public ActionResult capNhat(int idleave, DateTime startDate, DateTime endDate, string contents)
        {
            Session["typetab"] = "choDuyet";

            var leave = model.LeaveApplication.Find(idleave);
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.Contents = contents.Trim();

            model.Entry(leave).State = EntityState.Modified;
            model.SaveChanges();

            int id = Int32.Parse(Session["user-id"].ToString());
            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult taodonnghiphep(DateTime startDate, DateTime endDate, string contents, string typeTab)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            int id = Int32.Parse(Session["user-id"].ToString());

            var leave = new LeaveApplication();
            leave.ID_Employee = id;
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.Contents = contents.Trim();
            leave.State = false;
            leave.SendDate = DateTime.Now;

            model.LeaveApplication.Add(leave);
            model.SaveChanges();
            model = new CP25Team06Entities();
            if (typeTab.Equals("choDuyet"))
            {
                var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == id && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
                return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
            }
            else
            {
                return Content("success");
            }
           
        }
    }
}