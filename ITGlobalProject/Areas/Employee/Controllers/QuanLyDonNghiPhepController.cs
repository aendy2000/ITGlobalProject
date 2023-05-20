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
            Session["lst-leavetype"] = model.LeaveType.ToList();
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

        public ActionResult capNhat(int idleave, int leavetype, DateTime startDate, DateTime endDate, string contents)
        {
            Session["typetab"] = "choDuyet";
            int idEmp = Int32.Parse(Session["user-id"].ToString());
            var leave = model.LeaveApplication.Find(idleave);
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.Contents = contents.Trim();

            if (startDate.Year == endDate.Year) //trong 1 năm
            {
                //Kiểm tra loại nghỉ phép đc áp dụng cho nv này hay k
                var ExitsApplyLeaveType = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && a.LeavePeriod == startDate.Year);
                if (ExitsApplyLeaveType != null) //Được áp dụng
                {
                    //Lấy số ngày đã nghỉ
                    var lstSoNgayDaNghi = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.ID && (l.StartDate.Year == startDate.Year || l.EndDate.Year == startDate.Year)).ToList();
                    int tongSoNgayDaNghi = 0;
                    foreach (var item in lstSoNgayDaNghi)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghi += Int32.Parse((endDate - startDate).TotalDays.ToString()) + 1;

                    int songaychophep = ExitsApplyLeaveType.Entitlement;
                    if (songaychophep >= tongSoNgayDaNghi) //Không quá ngày cho phép
                        leave.ID_ApplyLeaveType = ExitsApplyLeaveType.ID;
                    else //Qúa ngày cho phép
                        return Content("QUANGAYCHOPHEP");
                }
                else //Không được áp dụng
                {
                    return Content("CHUAAPDUNGNAMNAY");
                }
            }
            else if (startDate.Year < endDate.Year) //năm này sang năm kia
            {
                //Kiểm tra loại nghỉ phép đc áp dụng cho nv này hay k
                var ExitsApplyLeaveType = model.ApplyLeaveType.Where(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && (a.LeavePeriod == startDate.Year || a.LeavePeriod == endDate.Year)).ToList();
                if (ExitsApplyLeaveType.Count == 2) //Được áp dụng đủ
                {
                    //Lấy số ngày đã nghỉ
                    var lstSoNgayDaNghiNamTruoc = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == startDate.Year).ID && (l.StartDate.Year == startDate.Year || l.EndDate.Year == startDate.Year)).ToList();
                    var lstSoNgayDaNghiNamSau = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == endDate.Year).ID && (l.StartDate.Year == endDate.Year || l.EndDate.Year == endDate.Year)).ToList();

                    //Tổng ngày đã nghỉ năm trước
                    int tongSoNgayDaNghiNamTruoc = 0;
                    foreach (var item in lstSoNgayDaNghiNamTruoc)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghiNamTruoc += Int32.Parse((Convert.ToDateTime(endDate.Year + "-01-01").AddDays(-1) - startDate).TotalDays.ToString()) + 1;

                    //Tổng ngày đã nghỉ năm sau
                    int tongSoNgayDaNghiNamSau = 0;
                    foreach (var item in lstSoNgayDaNghiNamSau)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghiNamSau += Int32.Parse((endDate - Convert.ToDateTime(endDate.Year + "-01-01")).TotalDays.ToString()) + 1;


                    foreach (var item in ExitsApplyLeaveType)
                    {
                        if (item.LeavePeriod == startDate.Year)
                        {
                            int songaychophep = item.Entitlement;
                            if (songaychophep >= tongSoNgayDaNghiNamTruoc) //Không quá ngày cho phép
                                leave.ID_ApplyLeaveType = item.ID;
                            else //Qúa ngày cho phép
                                return Content("QUANGAYCHOPHEPNAMTRUOC");
                        }
                        else if (item.LeavePeriod == endDate.Year)
                        {
                            int songaychophep = item.Entitlement;
                            if (songaychophep >= tongSoNgayDaNghiNamSau) //Không quá ngày cho phép
                                leave.ID_ApplyLeaveType = item.ID;
                            else //Qúa ngày cho phép
                                return Content("QUANGAYCHOPHEPNAMSAU");
                        }
                    }
                }
                else //Không được áp dụng
                {
                    return Content("CHUAAPDUNGNAMNAY");
                }
            }

            model.Entry(leave).State = EntityState.Modified;
            model.SaveChanges();

            var donNghiPhep = model.LeaveApplication.Where(l => l.ID_Employee == idEmp && l.State == false && l.ResponsiveDate == null).OrderByDescending(l => l.ID).ToList();
            return PartialView("_danhSachDonNghiPhepPartial", donNghiPhep);
        }

        public ActionResult taodonnghiphep(int leavetype, DateTime startDate, DateTime endDate, string contents, string typeTab)
        {
            if (Session["user-id"] == null)
                return Content("DANGNHAP");

            int idEmp = Int32.Parse(Session["user-id"].ToString());

            if (model.LeaveApplication.Where(l => l.ID_Employee == idEmp && (l.StartDate >= startDate && l.StartDate <= endDate) || (l.EndDate >= startDate && l.EndDate <= endDate)).Count() > 0)
                return Content("TRUNG");

            var leave = new LeaveApplication();
            leave.ID_Employee = (int)idEmp;
            leave.StartDate = startDate;
            leave.EndDate = endDate;
            leave.SendDate = DateTime.Now;

            if (startDate.Year == endDate.Year) //trong 1 năm
            {
                //Kiểm tra loại nghỉ phép đc áp dụng cho nv này hay k
                var ExitsApplyLeaveType = model.ApplyLeaveType.FirstOrDefault(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && a.LeavePeriod == startDate.Year);
                if (ExitsApplyLeaveType != null) //Được áp dụng
                {
                    //Lấy số ngày đã nghỉ
                    var lstSoNgayDaNghi = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.ID && (l.StartDate.Year == startDate.Year || l.EndDate.Year == startDate.Year)).ToList();
                    int tongSoNgayDaNghi = 0;
                    foreach (var item in lstSoNgayDaNghi)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghi += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghi += Int32.Parse((endDate - startDate).TotalDays.ToString()) + 1;

                    int songaychophep = ExitsApplyLeaveType.Entitlement;
                    if (songaychophep >= tongSoNgayDaNghi) //Không quá ngày cho phép
                        leave.ID_ApplyLeaveType = ExitsApplyLeaveType.ID;
                    else //Qúa ngày cho phép
                        return Content("QUANGAYCHOPHEP");
                }
                else //Không được áp dụng
                {
                    return Content("CHUAAPDUNGNAMNAY");
                }
            }
            else if (startDate.Year < endDate.Year) //năm này sang năm kia
            {
                //Kiểm tra loại nghỉ phép đc áp dụng cho nv này hay k
                var ExitsApplyLeaveType = model.ApplyLeaveType.Where(a => a.ID_Employee == idEmp && a.ID_Leave_Type == leavetype && (a.LeavePeriod == startDate.Year || a.LeavePeriod == endDate.Year)).ToList();
                if (ExitsApplyLeaveType.Count == 2) //Được áp dụng đủ
                {
                    //Lấy số ngày đã nghỉ
                    var lstSoNgayDaNghiNamTruoc = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == startDate.Year).ID && (l.StartDate.Year == startDate.Year || l.EndDate.Year == startDate.Year)).ToList();
                    var lstSoNgayDaNghiNamSau = model.LeaveApplication.Where(l => l.State == true && l.ID_Employee == idEmp && l.ID_ApplyLeaveType == ExitsApplyLeaveType.FirstOrDefault(a => a.LeavePeriod == endDate.Year).ID && (l.StartDate.Year == endDate.Year || l.EndDate.Year == endDate.Year)).ToList();

                    //Tổng ngày đã nghỉ năm trước
                    int tongSoNgayDaNghiNamTruoc = 0;
                    foreach (var item in lstSoNgayDaNghiNamTruoc)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghiNamTruoc += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghiNamTruoc += Int32.Parse((Convert.ToDateTime(endDate.Year + "-01-01").AddDays(-1) - startDate).TotalDays.ToString()) + 1;

                    //Tổng ngày đã nghỉ năm sau
                    int tongSoNgayDaNghiNamSau = 0;
                    foreach (var item in lstSoNgayDaNghiNamSau)
                    {
                        if (item.StartDate.Year < startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((item.EndDate - Convert.ToDateTime(startDate.Year + "-01-01")).TotalDays.ToString()) + 1;

                        else if (item.StartDate.Year == startDate.Year && item.EndDate.Year == startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((item.EndDate - item.StartDate).TotalDays.ToString()) + 1;

                        else if (item.EndDate.Year > startDate.Year)
                            tongSoNgayDaNghiNamSau += Int32.Parse((Convert.ToDateTime(item.EndDate.Year + "-01-01").AddDays(-1) - item.StartDate).TotalDays.ToString()) + 1;
                    }
                    //Lấy tổng số ngày đã nghỉ và ngày sẽ nghỉ để so sánh với tổng số ngày cho phép nghỉ
                    tongSoNgayDaNghiNamSau += Int32.Parse((endDate - Convert.ToDateTime(endDate.Year + "-01-01")).TotalDays.ToString()) + 1;


                    foreach (var item in ExitsApplyLeaveType)
                    {
                        if (item.LeavePeriod == startDate.Year)
                        {
                            int songaychophep = item.Entitlement;
                            if (songaychophep >= tongSoNgayDaNghiNamTruoc) //Không quá ngày cho phép
                                leave.ID_ApplyLeaveType = item.ID;
                            else //Qúa ngày cho phép
                                return Content("QUANGAYCHOPHEPNAMTRUOC");
                        }
                        else if (item.LeavePeriod == endDate.Year)
                        {
                            int songaychophep = item.Entitlement;
                            if (songaychophep >= tongSoNgayDaNghiNamSau) //Không quá ngày cho phép
                                leave.ID_ApplyLeaveType = item.ID;
                            else //Qúa ngày cho phép
                                return Content("QUANGAYCHOPHEPNAMSAU");
                        }
                    }
                }
                else //Không được áp dụng
                {
                    return Content("CHUAAPDUNGNAMNAY");
                }
            }

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
    }
}