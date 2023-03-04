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
using System.Security.Cryptography;
using System.Diagnostics;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    [AdminLoginVerification]
    public class QuanLyLuongController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/ChamCongTinhLuong
        public ActionResult bangLuong()
        {
            ViewBag.ShowActive = "bangLuong";
            Session["Insurance"] = model.Insurance.ToList();
            Session["Tax"] = model.Tax.ToList();

            return View("bangLuong", model.PayrollCategory.ToList());
        }
        [HttpPost]
        public ActionResult cauhinhkhoangiamtru(string baohiem, string thue)
        {
            if (string.IsNullOrEmpty(baohiem) || string.IsNullOrEmpty(thue))
                return Content("DANGNHAP");

            foreach (var item in baohiem.Split('_').ToList())
            {
                int id = Convert.ToInt32(item.Split('-')[0]);
                var baohiemmodel = model.Insurance.Find(id);
                baohiemmodel.Percentage = Convert.ToDecimal(item.Split('-')[1]);
                if (!string.IsNullOrEmpty(item.Split('-')[2]))
                    baohiemmodel.Ceiling_Level = Convert.ToDecimal(item.Split('-')[2].Replace(",", ""));

                model.Entry(baohiemmodel).State = EntityState.Modified;
                model.SaveChanges();
            }

            foreach (var item in thue.Split('_').ToList())
            {
                int id = Convert.ToInt32(item.Split('-')[0]);
                var thuemodel = model.Tax.Find(id);
                thuemodel.MinPrice = Convert.ToDecimal(item.Split('-')[1].Replace(",", ""));
                if (item.Split('-')[2].IndexOf("xác") == -1)
                    thuemodel.MaxPrice = Convert.ToDecimal(item.Split('-')[2].Replace(",", ""));
                thuemodel.Percentage = Convert.ToDecimal(item.Split('-')[3]);
                thuemodel.Deductible = Convert.ToDecimal(item.Split('-')[4].Replace(",", ""));

                model.Entry(thuemodel).State = EntityState.Modified;
                model.SaveChanges();
            }

            return Content("SUCCESS");
        }
        public ActionResult danhSachLuongThang(int? id)
        {
            if (id == null)
                return Content("DANGNHAP");

            var data = model.Payroll.Where(p => p.ID_PayrollCategory == id).ToList();
            ViewBag.ShowActive = "bangLuong";
            return View(data);
        }
        public ActionResult tinhLuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        [HttpPost]
        public ActionResult tinhLuong(string lstId, DateTime thang)
        {
            if (string.IsNullOrEmpty(lstId))
                return Content("DANGNHAP");
            try
            {
                var payrollcu = model.PayrollCategory.FirstOrDefault(p => p.Date.Month == thang.Month && p.Date.Year == thang.Year);
                if (payrollcu != null)
                {

                }
                else
                {
                    var payrollCategory = new PayrollCategory();
                    payrollCategory.Name = "Lương Tháng " + thang.Month.ToString("D2") + ", " + thang.Year;
                    payrollCategory.Date = thang;
                    model.PayrollCategory.Add(payrollCategory);
                    model.SaveChanges();

                    foreach (var item in lstId.Split('-').ToList())
                    {
                        int id = Convert.ToInt32(item);
                        var emp = model.Employees.Find(id);
                        var insurance = model.Insurance.ToList();
                        if (emp != null)
                        {
                            var payroll = new Payroll();
                            payroll.ID_PayrollCategory = payrollCategory.ID;
                            payroll.ID_Employee = id;

                            //Lương cơ bản
                            decimal luongcoban = emp.Wage;
                            payroll.Salary = luongcoban;

                            //Phần trăm bảo hiểm
                            var PTbhxh = model.Insurance.Find(1).Percentage;
                            var PTbhyt = model.Insurance.Find(2).Percentage;
                            var PTbhtn = model.Insurance.Find(4).Percentage;
                            payroll.SocialInsurance = PTbhxh;
                            payroll.HealthInsurance = PTbhyt;
                            payroll.UnemploymentInsurance = PTbhtn;

                            //Mức trần bh
                            var muctranbh = (decimal)model.Insurance.Find(1).Ceiling_Level;
                            payroll.InsuranceCeiling = muctranbh;
                            //Tính bảo hiểm
                            var khoantienbaohiem = (decimal)0;

                            //Thêm khoản trợ cấp tính bảo hiểm
                            var trocapTinhBH = model.Subsidies.Where(s => s.ID_Employee == id).ToList();
                            foreach (var items in trocapTinhBH)
                            {
                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                {
                                    if (items.SubsidiesCategory.Price == 0)
                                    {
                                        luongcoban += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                    }
                                    else
                                    {
                                        luongcoban += items.SubsidiesCategory.Price;
                                    }
                                }
                            }
                            if (luongcoban > muctranbh)
                            {
                                khoantienbaohiem = (decimal)((((PTbhxh / 100) + (PTbhyt / 100)) * muctranbh) + ((PTbhtn / 100) * luongcoban));
                            }
                            else
                            {
                                khoantienbaohiem = (decimal)(((PTbhxh + PTbhyt + PTbhtn) / 100) * luongcoban);
                            }
                            payroll.TotalPriceInsurance = khoantienbaohiem;

                            //Thêm khoản trợ cấp có tính thuế
                            foreach (var items in trocapTinhBH)
                            {
                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                {
                                    if (items.SubsidiesCategory.Price == 0)
                                    {
                                        luongcoban += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                    }
                                    else
                                    {
                                        luongcoban += items.SubsidiesCategory.Price;
                                    }
                                }
                            }
                            //Lương tối thiểu
                            var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                            //Có thể Tính thuế
                            if (luongcoban > giamtrugiacanh)
                            {
                                int sonhanthan = emp.DependentsInformation.Count;
                                payroll.NumberOfDependents = sonhanthan;

                                var luongtinhthue = (decimal)0;
                                //Có người phụ thuộc
                                if (sonhanthan > 0)
                                {
                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                    payroll.DependencyDeduction = khautruphuthuoc;

                                    //Mức lương đạt điều kiện để tính thuế
                                    if (luongcoban >= mucluongphuthuoc)
                                    {
                                        luongtinhthue = (luongcoban - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcoban - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                    }
                                }
                                else
                                {
                                    luongtinhthue = (luongcoban - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcoban - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                }

                                var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                var thuephaidong = (luongtinhthue * (thuexuat / 100)) - khoangiamtru;
                                
                                payroll.Tax = thuexuat;
                                payroll.TaxDeductions = khoangiamtru;

                                var luongthuclanh = luongcoban - (thuephaidong + khoantienbaohiem);
                                foreach (var items in trocapTinhBH)
                                {
                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                    {
                                        if (items.SubsidiesCategory.Price == 0)
                                        {
                                            if (items.SubsidiesCategory.OnBasicSalary == true)
                                                luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                            else
                                                luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                        }
                                        else
                                        {
                                            luongthuclanh += items.SubsidiesCategory.Price;
                                        }
                                    }
                                }

                                var strDate = Convert.ToDateTime(thang.ToString("yyyy-MM-") + "01");
                                var endDate = Convert.ToDateTime(thang.ToString("yyyy-MM-") + DateTime.DaysInMonth(thang.Year, thang.Month).ToString());

                                var ngaynghi = model.LeaveApplication.Where(l => l.ID_Employee == id
                                && ((l.StartDate >= strDate && l.StartDate <= endDate)
                                || (l.EndDate >= strDate && l.EndDate <= endDate))
                                && l.State == true && l.OnWage == true).ToList();
                                int songaynghi = 0;
                                foreach (var items in ngaynghi)
                                {
                                    //Khoảng thời gian đầu trong tháng
                                    if ((items.StartDate >= strDate && items.StartDate <= endDate)
                                        && (items.EndDate > endDate))
                                    {
                                        songaynghi = (endDate.Day - items.StartDate.Day) + 1;
                                    }
                                    //Khoảng thời gian nằm trong tháng
                                    else if ((items.StartDate >= strDate && items.StartDate <= endDate)
                                        && (items.EndDate >= strDate && items.EndDate <= endDate))
                                    {
                                        songaynghi = (items.EndDate.Day - items.StartDate.Day) + 1;
                                    }
                                    //khoảng thời gian cuối trong tháng
                                    else
                                    {
                                        songaynghi = (items.EndDate.Day - strDate.Day) + 1;
                                    }

                                }
                                //Tổng thanh toán cuối cùng
                                var tongthanhtoan = luongthuclanh;

                                //Trừ tiền ngày nghỉ phép
                                if (songaynghi > 0)
                                {
                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;

                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;
                                }
                            }
                        }
                    }
                }
                return Content("Success");
            }
            catch
            {
                return Content("Erorr");
            }
        }
        public ActionResult tinhLuongThuong()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
        public ActionResult chiSoThue()
        {
            ViewBag.ShowActive = "tinhLuong";
            return View();
        }
    }
}