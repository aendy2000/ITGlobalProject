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
            ViewBag.ShowActive = "danhSachDonNghiPhep";
            var leaveType = model.LeaveType.ToList();
            return View("taoDonNghiPhep", leaveType);
        }

        [HttpPost]
        public ActionResult taoDonNghiPhep(int? idEmp, DateTime startDate, DateTime endDate, bool state, string content, bool truluong, int leavetype)
        {
            try
            {
                if (idEmp == null || model.Employees.Find(idEmp) == null)
                    return Content("DANGNHAP");

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