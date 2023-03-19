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
            Session["Dependency"] = model.DependencyDeduction.ToList();
            int currentYear = DateTime.Now.Year;
            return View("bangLuong", model.PayrollCategory.Where(b => b.Date.Year == currentYear).ToList());
        }
        [HttpPost]
        public ActionResult cauhinhkhoangiamtru(string baohiem, string thue, string phuthuoc, string giacanh)
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

            var mPhuThuoc = model.DependencyDeduction.Find(1);
            mPhuThuoc.Price = Convert.ToDecimal(phuthuoc.Replace(",", ""));
            model.Entry(mPhuThuoc).State = EntityState.Modified;

            var mGiaCanh = model.DependencyDeduction.Find(2);
            mGiaCanh.Price = Convert.ToDecimal(giacanh.Replace(",", ""));
            model.Entry(mGiaCanh).State = EntityState.Modified;
            model.SaveChanges();

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
        [HttpPost]
        public ActionResult tinhLuongPartial(DateTime? thoigian)
        {
            if (thoigian == null)
                return Content("DANHNHAP");
            int thang = thoigian.Value.Month;
            int nam = thoigian.Value.Year;

            var payrollMonth = model.PayrollCategory.Where(p => p.Date.Month == thang && p.Date.Year == nam).ToList();
            return PartialView("_tinhLuongPartial", payrollMonth);
        }
        public ActionResult tinhLuong()
        {
            Session["Insurance"] = model.Insurance.ToList();
            Session["Tax"] = model.Tax.ToList();
            Session["Dependency"] = model.DependencyDeduction.ToList();

            ViewBag.ShowActive = "tinhLuong";
            return View("tinhLuong");
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
                    foreach (var item in lstId.Split('-').ToList())
                    {
                        int id = Convert.ToInt32(item);
                        var emp = model.Employees.Find(id);

                        if (emp.EmploymentContracts.Count() > 0)
                        {
                            if (emp.EmploymentContracts.OrderByDescending(o => o.ID).First().EmploymentCategory.Equals("Hợp đồng có thời hạn"))
                            {
                                var ngayhopdong = Convert.ToDateTime(emp.EmploymentContracts.OrderByDescending(o => o.ID).First().EndDate.Value) - Convert.ToDateTime(emp.EmploymentContracts.OrderByDescending(o => o.ID).First().StartDate.Value);
                                if (ngayhopdong.TotalDays <= 60)
                                {
                                    var currentPayroll = payrollcu.Payroll.FirstOrDefault(p => p.ID_Employee == id);
                                    if (currentPayroll != null)
                                    {

                                        if (payrollcu.Payroll.FirstOrDefault(p => p.ID_Employee == id).State == true)
                                            continue;

                                        var insurance = model.Insurance.ToList();
                                        if (emp != null)
                                        {
                                            model.SubsidiesApply.RemoveRange(currentPayroll.SubsidiesApply);
                                            model.SaveChanges();

                                            var trocaps = new List<SubsidiesApply>();
                                            int indextrocap = 0;

                                            //Lương cơ bản
                                            decimal luongcoban = emp.Wage;
                                            currentPayroll.Salary = luongcoban;
                                            var luongcobantinhthue = luongcoban;
                                            var luongcobantinhbaohiem = luongcoban;
                                            var tongtrocap = (decimal)0;

                                            //Phần trăm bảo hiểm
                                            var PTbhxh = model.Insurance.Find(1).Percentage;
                                            var PTbhyt = model.Insurance.Find(2).Percentage;
                                            var PTbhtn = model.Insurance.Find(4).Percentage;
                                            currentPayroll.SocialInsurance = PTbhxh;
                                            currentPayroll.HealthInsurance = PTbhyt;
                                            currentPayroll.UnemploymentInsurance = PTbhtn;

                                            //Mức trần bh
                                            var muctranbh = (decimal)model.Insurance.Find(1).Ceiling_Level;
                                            currentPayroll.InsuranceCeiling = muctranbh;
                                            //Tính bảo hiểm
                                            var khoantienbaohiem = (decimal)0;

                                            //Thêm khoản trợ cấp tính bảo hiểm
                                            var trocapTinhBH = model.Subsidies.Where(s => s.ID_Employee == id).ToList();
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                }
                                            }
                                            if (luongcobantinhbaohiem > muctranbh)
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                            }
                                            else
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                            }
                                            currentPayroll.SalaryInsurance = luongcobantinhbaohiem;
                                            currentPayroll.TotalPriceInsurance = khoantienbaohiem;

                                            //Thêm khoản trợ cấp có tính thuế
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                    {
                                                        bool exits = false;
                                                        foreach (var checktrocap in trocaps)
                                                        {
                                                            if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                            {
                                                                exits = true;
                                                            }
                                                        }
                                                        if (exits == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
                                                        }
                                                        else
                                                        {
                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            currentPayroll.SalaryTaxable = luongcobantinhthue;
                                            //Có thể Tính thuế
                                            if (luongcobantinhthue >= 20000000)
                                            {
                                                var thuephaidong = luongcobantinhthue / 100 * 10;
                                                currentPayroll.Tax = 10;
                                                currentPayroll.TaxDeductions = 0;
                                                currentPayroll.TaxableSalary = luongcobantinhthue;
                                                currentPayroll.TotalPriceTax = thuephaidong;

                                                var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                currentPayroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }

                                                currentPayroll.Total_Price = tongthanhtoan;
                                                currentPayroll.TotalAllowance = tongtrocap;

                                                model.Entry(currentPayroll).State = EntityState.Modified;
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = currentPayroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = currentPayroll.ID;
                                                his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;
                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                            else
                                            {
                                                currentPayroll.Tax = 10;
                                                currentPayroll.TaxDeductions = 0;
                                                currentPayroll.TaxableSalary = luongcobantinhthue;
                                                currentPayroll.TotalPriceTax = 0;

                                                var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                currentPayroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }

                                                currentPayroll.Total_Price = tongthanhtoan;
                                                currentPayroll.TotalAllowance = tongtrocap;

                                                model.Entry(currentPayroll).State = EntityState.Modified;
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = currentPayroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = currentPayroll.ID;
                                                his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;
                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                        }
                                    }
                                    else
                                    {
                                        var insurance = model.Insurance.ToList();
                                        if (emp != null)
                                        {
                                            var payroll = new Payroll();
                                            var trocaps = new List<SubsidiesApply>();
                                            int indextrocap = 0;

                                            payroll.ID_PayrollCategory = payrollcu.ID;
                                            payroll.ID_Employee = id;

                                            //Lương cơ bản
                                            decimal luongcoban = emp.Wage;
                                            payroll.Salary = luongcoban;
                                            var luongcobantinhthue = luongcoban;
                                            var luongcobantinhbaohiem = luongcoban;
                                            var tongtrocap = (decimal)0;

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
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                }
                                            }
                                            if (luongcobantinhbaohiem > muctranbh)
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                            }
                                            else
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                            }
                                            payroll.SalaryInsurance = luongcobantinhbaohiem;
                                            payroll.TotalPriceInsurance = khoantienbaohiem;

                                            //Thêm khoản trợ cấp có tính thuế
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                    {
                                                        bool exits = false;
                                                        foreach (var checktrocap in trocaps)
                                                        {
                                                            if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                            {
                                                                exits = true;
                                                            }
                                                        }
                                                        if (exits == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
                                                        }
                                                        else
                                                        {
                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            payroll.SalaryTaxable = luongcobantinhthue;
                                            //Có thể Tính thuế
                                            if (luongcobantinhthue >= 20000000)
                                            {
                                                var thuephaidong = luongcobantinhthue / 100 * 10;
                                                payroll.Tax = 10;
                                                payroll.TaxDeductions = 0;
                                                payroll.TaxableSalary = luongcobantinhthue;
                                                payroll.TotalPriceTax = thuephaidong;

                                                var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                payroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    payroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }
                                                payroll.Total_Price = tongthanhtoan;
                                                payroll.MissingAmount = 0;
                                                payroll.State = false;
                                                payroll.TotalAllowance = tongtrocap;

                                                model.Payroll.Add(payroll);
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = payroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = payroll.ID;
                                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;

                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                            else
                                            {
                                                payroll.Tax = 10;
                                                payroll.TaxDeductions = 0;
                                                payroll.TaxableSalary = 0;
                                                payroll.TotalPriceTax = 0;

                                                var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                payroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    payroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }
                                                payroll.Total_Price = tongthanhtoan;
                                                payroll.MissingAmount = 0;
                                                payroll.State = false;
                                                payroll.TotalAllowance = tongtrocap;

                                                model.Payroll.Add(payroll);
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = payroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = payroll.ID;
                                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;

                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    var currentPayroll = payrollcu.Payroll.FirstOrDefault(p => p.ID_Employee == id);
                                    if (currentPayroll != null)
                                    {
                                        var insurance = model.Insurance.ToList();
                                        if (emp != null)
                                        {
                                            model.SubsidiesApply.RemoveRange(currentPayroll.SubsidiesApply);
                                            model.SaveChanges();

                                            var trocaps = new List<SubsidiesApply>();
                                            int indextrocap = 0;

                                            //Lương cơ bản
                                            decimal luongcoban = emp.Wage;
                                            currentPayroll.Salary = luongcoban;
                                            var luongcobantinhthue = luongcoban;
                                            var luongcobantinhbaohiem = luongcoban;
                                            var tongtrocap = (decimal)0;

                                            //Phần trăm bảo hiểm
                                            var PTbhxh = model.Insurance.Find(1).Percentage;
                                            var PTbhyt = model.Insurance.Find(2).Percentage;
                                            var PTbhtn = model.Insurance.Find(4).Percentage;
                                            currentPayroll.SocialInsurance = PTbhxh;
                                            currentPayroll.HealthInsurance = PTbhyt;
                                            currentPayroll.UnemploymentInsurance = PTbhtn;

                                            //Mức trần bh
                                            var muctranbh = (decimal)model.Insurance.Find(1).Ceiling_Level;
                                            currentPayroll.InsuranceCeiling = muctranbh;
                                            //Tính bảo hiểm
                                            var khoantienbaohiem = (decimal)0;

                                            //Thêm khoản trợ cấp tính bảo hiểm
                                            var trocapTinhBH = model.Subsidies.Where(s => s.ID_Employee == id).ToList();
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                }
                                            }
                                            if (luongcobantinhbaohiem > muctranbh)
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                            }
                                            else
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                            }
                                            currentPayroll.SalaryInsurance = luongcobantinhbaohiem;
                                            currentPayroll.TotalPriceInsurance = khoantienbaohiem;

                                            //Thêm khoản trợ cấp có tính thuế
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                    {
                                                        bool exits = false;
                                                        foreach (var checktrocap in trocaps)
                                                        {
                                                            if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                            {
                                                                exits = true;
                                                            }
                                                        }
                                                        if (exits == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
                                                        }
                                                        else
                                                        {
                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            currentPayroll.SalaryTaxable = luongcobantinhthue;
                                            //Lương tối thiểu
                                            var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                            //Có thể Tính thuế
                                            if (luongcobantinhthue > giamtrugiacanh)
                                            {
                                                int sonhanthan = emp.DependentsInformation.Count;
                                                currentPayroll.NumberOfDependents = sonhanthan;
                                                currentPayroll.FamilyAllowances = giamtrugiacanh;
                                                var luongtinhthue = (decimal)0;
                                                //Có người phụ thuộc
                                                if (sonhanthan > 0)
                                                {
                                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                    currentPayroll.DependencyDeduction = khautruphuthuoc;

                                                    //Mức lương đạt điều kiện để tính thuế
                                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                                    {
                                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                    }
                                                }
                                                else
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                                }

                                                var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                                var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                                var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                                currentPayroll.Tax = thuexuat;
                                                currentPayroll.TaxDeductions = khoangiamtru;
                                                currentPayroll.TaxableSalary = luongtinhthue;
                                                currentPayroll.TotalPriceTax = thuephaidong;

                                                var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                currentPayroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }

                                                currentPayroll.Total_Price = tongthanhtoan;
                                                currentPayroll.TotalAllowance = tongtrocap;

                                                model.Entry(currentPayroll).State = EntityState.Modified;
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = currentPayroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = currentPayroll.ID;
                                                his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;
                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                            else
                                            {

                                                int sonhanthan = emp.DependentsInformation.Count;
                                                currentPayroll.NumberOfDependents = sonhanthan;
                                                currentPayroll.FamilyAllowances = giamtrugiacanh;
                                                var luongtinhthue = (decimal)0;
                                                //Có người phụ thuộc
                                                if (sonhanthan > 0)
                                                {
                                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                    currentPayroll.DependencyDeduction = khautruphuthuoc;

                                                    //Mức lương đạt điều kiện để tính thuế
                                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                                    {
                                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                    }
                                                }
                                                else
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                                }

                                                currentPayroll.Tax = 0;
                                                currentPayroll.TaxDeductions = 0;
                                                currentPayroll.TaxableSalary = luongtinhthue;
                                                currentPayroll.TotalPriceTax = 0;

                                                var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                currentPayroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }

                                                currentPayroll.Total_Price = tongthanhtoan;
                                                currentPayroll.TotalAllowance = tongtrocap;

                                                model.Entry(currentPayroll).State = EntityState.Modified;
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = currentPayroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = currentPayroll.ID;
                                                his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;
                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }


                                        }
                                    }
                                    else
                                    {
                                        var insurance = model.Insurance.ToList();
                                        if (emp != null)
                                        {
                                            var payroll = new Payroll();
                                            var trocaps = new List<SubsidiesApply>();
                                            int indextrocap = 0;

                                            payroll.ID_PayrollCategory = payrollcu.ID;
                                            payroll.ID_Employee = id;

                                            //Lương cơ bản
                                            decimal luongcoban = emp.Wage;
                                            payroll.Salary = luongcoban;
                                            var luongcobantinhthue = luongcoban;
                                            var luongcobantinhbaohiem = luongcoban;
                                            var tongtrocap = (decimal)0;

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
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                }
                                            }
                                            if (luongcobantinhbaohiem > muctranbh)
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                            }
                                            else
                                            {
                                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                            }
                                            payroll.SalaryInsurance = luongcobantinhbaohiem;
                                            payroll.TotalPriceInsurance = khoantienbaohiem;

                                            //Thêm khoản trợ cấp có tính thuế
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                    {
                                                        bool exits = false;
                                                        foreach (var checktrocap in trocaps)
                                                        {
                                                            if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                            {
                                                                exits = true;
                                                            }
                                                        }
                                                        if (exits == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
                                                        }
                                                        else
                                                        {
                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            payroll.SalaryTaxable = luongcobantinhthue;
                                            //Lương tối thiểu
                                            var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                            //Có thể Tính thuế
                                            if (luongcobantinhthue > giamtrugiacanh)
                                            {
                                                int sonhanthan = emp.DependentsInformation.Count;
                                                payroll.NumberOfDependents = sonhanthan;
                                                payroll.FamilyAllowances = giamtrugiacanh;
                                                var luongtinhthue = (decimal)0;
                                                //Có người phụ thuộc
                                                if (sonhanthan > 0)
                                                {
                                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                    payroll.DependencyDeduction = khautruphuthuoc;

                                                    //Mức lương đạt điều kiện để tính thuế
                                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                                    {
                                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                    }
                                                }
                                                else
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                                }

                                                var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                                var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                                var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                                payroll.Tax = thuexuat;
                                                payroll.TaxDeductions = khoangiamtru;
                                                payroll.TaxableSalary = luongtinhthue;
                                                payroll.TotalPriceTax = thuephaidong;

                                                var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                payroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    payroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }
                                                payroll.Total_Price = tongthanhtoan;
                                                payroll.MissingAmount = 0;
                                                payroll.State = false;
                                                payroll.TotalAllowance = tongtrocap;

                                                model.Payroll.Add(payroll);
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = payroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = payroll.ID;
                                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;

                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }
                                            else
                                            {
                                                int sonhanthan = emp.DependentsInformation.Count;
                                                payroll.NumberOfDependents = sonhanthan;
                                                payroll.FamilyAllowances = giamtrugiacanh;
                                                var luongtinhthue = (decimal)0;
                                                //Có người phụ thuộc
                                                if (sonhanthan > 0)
                                                {
                                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                    payroll.DependencyDeduction = khautruphuthuoc;

                                                    //Mức lương đạt điều kiện để tính thuế
                                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                                    {
                                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                    }
                                                }
                                                else
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                                }

                                                payroll.Tax = 0;
                                                payroll.TaxDeductions = 0;
                                                payroll.TaxableSalary = luongtinhthue;
                                                payroll.TotalPriceTax = 0;

                                                var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                                if (trocapTinhBH.Count > 0)
                                                {
                                                    foreach (var items in trocapTinhBH)
                                                    {
                                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                        {
                                                            trocaps.Add(new SubsidiesApply());
                                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                            if (items.SubsidiesCategory.Price == 0)
                                                            {
                                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                                {
                                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                                else
                                                                {
                                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                                tongtrocap += items.SubsidiesCategory.Price;
                                                            }
                                                            indextrocap++;
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
                                                payroll.NumberDaysLeave = songaynghi;

                                                //Tổng thanh toán cuối cùng
                                                var tongthanhtoan = luongthuclanh;

                                                //Trừ tiền ngày nghỉ phép
                                                if (songaynghi > 0)
                                                {
                                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                    payroll.PriceForOneDayOff = sotienmotngay;
                                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                                }
                                                payroll.Total_Price = tongthanhtoan;
                                                payroll.MissingAmount = 0;
                                                payroll.State = false;
                                                payroll.TotalAllowance = tongtrocap;

                                                model.Payroll.Add(payroll);
                                                model.SaveChanges();

                                                foreach (var items in trocaps)
                                                {
                                                    items.ID_Payroll = payroll.ID;
                                                    model.SubsidiesApply.Add(items);
                                                    model.SaveChanges();
                                                }

                                                Histories his = new Histories();
                                                his.ID_Employee = id;
                                                his.ID_Payroll = payroll.ID;
                                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                                his.Date = DateTime.Now;

                                                model.Histories.Add(his);
                                                model.SaveChanges();
                                            }


                                        }
                                    }
                                }
                            }
                            else
                            {
                                var currentPayroll = payrollcu.Payroll.FirstOrDefault(p => p.ID_Employee == id);
                                if (currentPayroll != null)
                                {
                                    var insurance = model.Insurance.ToList();
                                    if (emp != null)
                                    {
                                        model.SubsidiesApply.RemoveRange(currentPayroll.SubsidiesApply);
                                        model.SaveChanges();

                                        var trocaps = new List<SubsidiesApply>();
                                        int indextrocap = 0;

                                        //Lương cơ bản
                                        decimal luongcoban = emp.Wage;
                                        currentPayroll.Salary = luongcoban;
                                        var luongcobantinhthue = luongcoban;
                                        var luongcobantinhbaohiem = luongcoban;
                                        var tongtrocap = (decimal)0;

                                        //Phần trăm bảo hiểm
                                        var PTbhxh = model.Insurance.Find(1).Percentage;
                                        var PTbhyt = model.Insurance.Find(2).Percentage;
                                        var PTbhtn = model.Insurance.Find(4).Percentage;
                                        currentPayroll.SocialInsurance = PTbhxh;
                                        currentPayroll.HealthInsurance = PTbhyt;
                                        currentPayroll.UnemploymentInsurance = PTbhtn;

                                        //Mức trần bh
                                        var muctranbh = (decimal)model.Insurance.Find(1).Ceiling_Level;
                                        currentPayroll.InsuranceCeiling = muctranbh;
                                        //Tính bảo hiểm
                                        var khoantienbaohiem = (decimal)0;

                                        //Thêm khoản trợ cấp tính bảo hiểm
                                        var trocapTinhBH = model.Subsidies.Where(s => s.ID_Employee == id).ToList();
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
                                                }
                                            }
                                        }
                                        if (luongcobantinhbaohiem > muctranbh)
                                        {
                                            khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                        }
                                        else
                                        {
                                            khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                        }
                                        currentPayroll.SalaryInsurance = luongcobantinhbaohiem;
                                        currentPayroll.TotalPriceInsurance = khoantienbaohiem;

                                        //Thêm khoản trợ cấp có tính thuế
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                {
                                                    bool exits = false;
                                                    foreach (var checktrocap in trocaps)
                                                    {
                                                        if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                        {
                                                            exits = true;
                                                        }
                                                    }
                                                    if (exits == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                    else
                                                    {
                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhthue += items.SubsidiesCategory.Price;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        currentPayroll.SalaryTaxable = luongcobantinhthue;
                                        //Lương tối thiểu
                                        var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                        //Có thể Tính thuế
                                        if (luongcobantinhthue > giamtrugiacanh)
                                        {
                                            int sonhanthan = emp.DependentsInformation.Count;
                                            currentPayroll.NumberOfDependents = sonhanthan;
                                            currentPayroll.FamilyAllowances = giamtrugiacanh;
                                            var luongtinhthue = (decimal)0;
                                            //Có người phụ thuộc
                                            if (sonhanthan > 0)
                                            {
                                                var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                currentPayroll.DependencyDeduction = khautruphuthuoc;

                                                //Mức lương đạt điều kiện để tính thuế
                                                if (luongcobantinhthue >= mucluongphuthuoc)
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                }
                                            }
                                            else
                                            {
                                                luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                            }

                                            var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                            var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                            var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                            currentPayroll.Tax = thuexuat;
                                            currentPayroll.TaxDeductions = khoangiamtru;
                                            currentPayroll.TaxableSalary = luongtinhthue;
                                            currentPayroll.TotalPriceTax = thuephaidong;

                                            var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            if (items.SubsidiesCategory.OnBasicSalary == true)
                                                            {
                                                                luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
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
                                            currentPayroll.NumberDaysLeave = songaynghi;

                                            //Tổng thanh toán cuối cùng
                                            var tongthanhtoan = luongthuclanh;

                                            //Trừ tiền ngày nghỉ phép
                                            if (songaynghi > 0)
                                            {
                                                int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                            }

                                            currentPayroll.Total_Price = tongthanhtoan;
                                            currentPayroll.TotalAllowance = tongtrocap;

                                            model.Entry(currentPayroll).State = EntityState.Modified;
                                            model.SaveChanges();

                                            foreach (var items in trocaps)
                                            {
                                                items.ID_Payroll = currentPayroll.ID;
                                                model.SubsidiesApply.Add(items);
                                                model.SaveChanges();
                                            }

                                            Histories his = new Histories();
                                            his.ID_Employee = id;
                                            his.ID_Payroll = currentPayroll.ID;
                                            his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                            his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                            his.Date = DateTime.Now;
                                            model.Histories.Add(his);
                                            model.SaveChanges();
                                        }
                                        else
                                        {
                                            int sonhanthan = emp.DependentsInformation.Count;
                                            currentPayroll.NumberOfDependents = sonhanthan;
                                            currentPayroll.FamilyAllowances = giamtrugiacanh;
                                            var luongtinhthue = (decimal)0;
                                            //Có người phụ thuộc
                                            if (sonhanthan > 0)
                                            {
                                                var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                currentPayroll.DependencyDeduction = khautruphuthuoc;

                                                //Mức lương đạt điều kiện để tính thuế
                                                if (luongcobantinhthue >= mucluongphuthuoc)
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                }
                                            }
                                            else
                                            {
                                                luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                            }

                                            currentPayroll.Tax = 0;
                                            currentPayroll.TaxDeductions = 0;
                                            currentPayroll.TaxableSalary = luongtinhthue;
                                            currentPayroll.TotalPriceTax = 0;

                                            var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            if (items.SubsidiesCategory.OnBasicSalary == true)
                                                            {
                                                                luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
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
                                            currentPayroll.NumberDaysLeave = songaynghi;

                                            //Tổng thanh toán cuối cùng
                                            var tongthanhtoan = luongthuclanh;

                                            //Trừ tiền ngày nghỉ phép
                                            if (songaynghi > 0)
                                            {
                                                int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                currentPayroll.PriceForOneDayOff = sotienmotngay;
                                                tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                            }

                                            currentPayroll.Total_Price = tongthanhtoan;
                                            currentPayroll.TotalAllowance = tongtrocap;

                                            model.Entry(currentPayroll).State = EntityState.Modified;
                                            model.SaveChanges();

                                            foreach (var items in trocaps)
                                            {
                                                items.ID_Payroll = currentPayroll.ID;
                                                model.SubsidiesApply.Add(items);
                                                model.SaveChanges();
                                            }

                                            Histories his = new Histories();
                                            his.ID_Employee = id;
                                            his.ID_Payroll = currentPayroll.ID;
                                            his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                            his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                            his.Date = DateTime.Now;
                                            model.Histories.Add(his);
                                            model.SaveChanges();
                                        }


                                    }
                                }
                                else
                                {
                                    var insurance = model.Insurance.ToList();
                                    if (emp != null)
                                    {
                                        var payroll = new Payroll();
                                        var trocaps = new List<SubsidiesApply>();
                                        int indextrocap = 0;

                                        payroll.ID_PayrollCategory = payrollcu.ID;
                                        payroll.ID_Employee = id;

                                        //Lương cơ bản
                                        decimal luongcoban = emp.Wage;
                                        payroll.Salary = luongcoban;
                                        var luongcobantinhthue = luongcoban;
                                        var luongcobantinhbaohiem = luongcoban;
                                        var tongtrocap = (decimal)0;

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
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                        tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
                                                }
                                            }
                                        }
                                        if (luongcobantinhbaohiem > muctranbh)
                                        {
                                            khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                        }
                                        else
                                        {
                                            khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                        }
                                        payroll.SalaryInsurance = luongcobantinhbaohiem;
                                        payroll.TotalPriceInsurance = khoantienbaohiem;

                                        //Thêm khoản trợ cấp có tính thuế
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                                {
                                                    bool exits = false;
                                                    foreach (var checktrocap in trocaps)
                                                    {
                                                        if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                        {
                                                            exits = true;
                                                        }
                                                    }
                                                    if (exits == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhthue += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
                                                    }
                                                    else
                                                    {
                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongcobantinhthue += items.SubsidiesCategory.Price;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        payroll.SalaryTaxable = luongcobantinhthue;
                                        //Lương tối thiểu
                                        var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                        //Có thể Tính thuế
                                        if (luongcobantinhthue > giamtrugiacanh)
                                        {
                                            int sonhanthan = emp.DependentsInformation.Count;
                                            payroll.NumberOfDependents = sonhanthan;
                                            payroll.FamilyAllowances = giamtrugiacanh;
                                            var luongtinhthue = (decimal)0;
                                            //Có người phụ thuộc
                                            if (sonhanthan > 0)
                                            {
                                                var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                payroll.DependencyDeduction = khautruphuthuoc;

                                                //Mức lương đạt điều kiện để tính thuế
                                                if (luongcobantinhthue >= mucluongphuthuoc)
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                }
                                            }
                                            else
                                            {
                                                luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                            }

                                            var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                            var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                            var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                            payroll.Tax = thuexuat;
                                            payroll.TaxDeductions = khoangiamtru;
                                            payroll.TaxableSalary = luongtinhthue;
                                            payroll.TotalPriceTax = thuephaidong;

                                            var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            if (items.SubsidiesCategory.OnBasicSalary == true)
                                                            {
                                                                luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
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
                                            payroll.NumberDaysLeave = songaynghi;

                                            //Tổng thanh toán cuối cùng
                                            var tongthanhtoan = luongthuclanh;

                                            //Trừ tiền ngày nghỉ phép
                                            if (songaynghi > 0)
                                            {
                                                int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                payroll.PriceForOneDayOff = sotienmotngay;
                                                tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                            }
                                            payroll.Total_Price = tongthanhtoan;
                                            payroll.MissingAmount = 0;
                                            payroll.State = false;
                                            payroll.TotalAllowance = tongtrocap;

                                            model.Payroll.Add(payroll);
                                            model.SaveChanges();

                                            foreach (var items in trocaps)
                                            {
                                                items.ID_Payroll = payroll.ID;
                                                model.SubsidiesApply.Add(items);
                                                model.SaveChanges();
                                            }

                                            Histories his = new Histories();
                                            his.ID_Employee = id;
                                            his.ID_Payroll = payroll.ID;
                                            his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                            his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                            his.Date = DateTime.Now;

                                            model.Histories.Add(his);
                                            model.SaveChanges();
                                        }
                                        else
                                        {
                                            int sonhanthan = emp.DependentsInformation.Count;
                                            payroll.NumberOfDependents = sonhanthan;
                                            payroll.FamilyAllowances = giamtrugiacanh;
                                            var luongtinhthue = (decimal)0;
                                            //Có người phụ thuộc
                                            if (sonhanthan > 0)
                                            {
                                                var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                                decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                                payroll.DependencyDeduction = khautruphuthuoc;

                                                //Mức lương đạt điều kiện để tính thuế
                                                if (luongcobantinhthue >= mucluongphuthuoc)
                                                {
                                                    luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                                }
                                            }
                                            else
                                            {
                                                luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                            }

                                            payroll.Tax = 0;
                                            payroll.TaxDeductions = 0;
                                            payroll.TaxableSalary = luongtinhthue;
                                            payroll.TotalPriceTax = 0;

                                            var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                            if (trocapTinhBH.Count > 0)
                                            {
                                                foreach (var items in trocapTinhBH)
                                                {
                                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                    {
                                                        trocaps.Add(new SubsidiesApply());
                                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                        if (items.SubsidiesCategory.Price == 0)
                                                        {
                                                            if (items.SubsidiesCategory.OnBasicSalary == true)
                                                            {
                                                                luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                            else
                                                            {
                                                                luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                                tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += items.SubsidiesCategory.Price;
                                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                            tongtrocap += items.SubsidiesCategory.Price;
                                                        }
                                                        indextrocap++;
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
                                            payroll.NumberDaysLeave = songaynghi;

                                            //Tổng thanh toán cuối cùng
                                            var tongthanhtoan = luongthuclanh;

                                            //Trừ tiền ngày nghỉ phép
                                            if (songaynghi > 0)
                                            {
                                                int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                                decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                                decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                                payroll.PriceForOneDayOff = sotienmotngay;
                                                tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                            }
                                            payroll.Total_Price = tongthanhtoan;
                                            payroll.MissingAmount = 0;
                                            payroll.State = false;
                                            payroll.TotalAllowance = tongtrocap;

                                            model.Payroll.Add(payroll);
                                            model.SaveChanges();

                                            foreach (var items in trocaps)
                                            {
                                                items.ID_Payroll = payroll.ID;
                                                model.SubsidiesApply.Add(items);
                                                model.SaveChanges();
                                            }

                                            Histories his = new Histories();
                                            his.ID_Employee = id;
                                            his.ID_Payroll = payroll.ID;
                                            his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                            his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                            his.Date = DateTime.Now;

                                            model.Histories.Add(his);
                                            model.SaveChanges();
                                        }
                                    }
                                }
                            }
                        }
                        else
                        {
                            var currentPayroll = payrollcu.Payroll.FirstOrDefault(p => p.ID_Employee == id);
                            if (currentPayroll != null)
                            {
                                var insurance = model.Insurance.ToList();
                                if (emp != null)
                                {
                                    model.SubsidiesApply.RemoveRange(currentPayroll.SubsidiesApply);
                                    model.SaveChanges();

                                    var trocaps = new List<SubsidiesApply>();
                                    int indextrocap = 0;

                                    //Lương cơ bản
                                    decimal luongcoban = emp.Wage;
                                    currentPayroll.Salary = luongcoban;
                                    var luongcobantinhthue = luongcoban;
                                    var luongcobantinhbaohiem = luongcoban;
                                    var tongtrocap = (decimal)0;

                                    //Phần trăm bảo hiểm
                                    var PTbhxh = model.Insurance.Find(1).Percentage;
                                    var PTbhyt = model.Insurance.Find(2).Percentage;
                                    var PTbhtn = model.Insurance.Find(4).Percentage;
                                    currentPayroll.SocialInsurance = PTbhxh;
                                    currentPayroll.HealthInsurance = PTbhyt;
                                    currentPayroll.UnemploymentInsurance = PTbhtn;

                                    //Mức trần bh
                                    var muctranbh = (decimal)model.Insurance.Find(1).Ceiling_Level;
                                    currentPayroll.InsuranceCeiling = muctranbh;
                                    //Tính bảo hiểm
                                    var khoantienbaohiem = (decimal)0;

                                    //Thêm khoản trợ cấp tính bảo hiểm
                                    var trocapTinhBH = model.Subsidies.Where(s => s.ID_Employee == id).ToList();
                                    if (trocapTinhBH.Count > 0)
                                    {
                                        foreach (var items in trocapTinhBH)
                                        {
                                            if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                            {
                                                trocaps.Add(new SubsidiesApply());
                                                trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                if (items.SubsidiesCategory.Price == 0)
                                                {
                                                    luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                }
                                                else
                                                {
                                                    luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                    tongtrocap += items.SubsidiesCategory.Price;
                                                }
                                                indextrocap++;
                                            }
                                        }
                                    }
                                    if (luongcobantinhbaohiem > muctranbh)
                                    {
                                        khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                    }
                                    else
                                    {
                                        khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                    }
                                    currentPayroll.SalaryInsurance = luongcobantinhbaohiem;
                                    currentPayroll.TotalPriceInsurance = khoantienbaohiem;

                                    //Thêm khoản trợ cấp có tính thuế
                                    if (trocapTinhBH.Count > 0)
                                    {
                                        foreach (var items in trocapTinhBH)
                                        {
                                            if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                            {
                                                bool exits = false;
                                                foreach (var checktrocap in trocaps)
                                                {
                                                    if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                    {
                                                        exits = true;
                                                    }
                                                }
                                                if (exits == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhthue += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
                                                }
                                                else
                                                {
                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhthue += items.SubsidiesCategory.Price;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    currentPayroll.SalaryTaxable = luongcobantinhthue;
                                    //Lương tối thiểu
                                    var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                    //Có thể Tính thuế
                                    if (luongcobantinhthue > giamtrugiacanh)
                                    {
                                        int sonhanthan = emp.DependentsInformation.Count;
                                        currentPayroll.NumberOfDependents = sonhanthan;
                                        currentPayroll.FamilyAllowances = giamtrugiacanh;
                                        var luongtinhthue = (decimal)0;
                                        //Có người phụ thuộc
                                        if (sonhanthan > 0)
                                        {
                                            var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                            decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                            currentPayroll.DependencyDeduction = khautruphuthuoc;

                                            //Mức lương đạt điều kiện để tính thuế
                                            if (luongcobantinhthue >= mucluongphuthuoc)
                                            {
                                                luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                            }
                                        }
                                        else
                                        {
                                            luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                        }

                                        var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                        var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                        var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                        currentPayroll.Tax = thuexuat;
                                        currentPayroll.TaxDeductions = khoangiamtru;
                                        currentPayroll.TaxableSalary = luongtinhthue;
                                        currentPayroll.TotalPriceTax = thuephaidong;

                                        var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        if (items.SubsidiesCategory.OnBasicSalary == true)
                                                        {
                                                            luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        luongthuclanh += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
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
                                        currentPayroll.NumberDaysLeave = songaynghi;

                                        //Tổng thanh toán cuối cùng
                                        var tongthanhtoan = luongthuclanh;

                                        //Trừ tiền ngày nghỉ phép
                                        if (songaynghi > 0)
                                        {
                                            int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                            decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                            decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                            currentPayroll.PriceForOneDayOff = sotienmotngay;
                                            tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                        }

                                        currentPayroll.Total_Price = tongthanhtoan;
                                        currentPayroll.TotalAllowance = tongtrocap;

                                        model.Entry(currentPayroll).State = EntityState.Modified;
                                        model.SaveChanges();

                                        foreach (var items in trocaps)
                                        {
                                            items.ID_Payroll = currentPayroll.ID;
                                            model.SubsidiesApply.Add(items);
                                            model.SaveChanges();
                                        }

                                        Histories his = new Histories();
                                        his.ID_Employee = id;
                                        his.ID_Payroll = currentPayroll.ID;
                                        his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                        his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                        his.Date = DateTime.Now;
                                        model.Histories.Add(his);
                                        model.SaveChanges();
                                    }
                                    else
                                    {
                                        int sonhanthan = emp.DependentsInformation.Count;
                                        currentPayroll.NumberOfDependents = sonhanthan;
                                        currentPayroll.FamilyAllowances = giamtrugiacanh;
                                        var luongtinhthue = (decimal)0;
                                        //Có người phụ thuộc
                                        if (sonhanthan > 0)
                                        {
                                            var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                            decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                            currentPayroll.DependencyDeduction = khautruphuthuoc;

                                            //Mức lương đạt điều kiện để tính thuế
                                            if (luongcobantinhthue >= mucluongphuthuoc)
                                            {
                                                luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                            }
                                        }
                                        else
                                        {
                                            luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                        }

                                        currentPayroll.Tax = 0;
                                        currentPayroll.TaxDeductions = 0;
                                        currentPayroll.TaxableSalary = luongtinhthue;
                                        currentPayroll.TotalPriceTax = 0;

                                        var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        if (items.SubsidiesCategory.OnBasicSalary == true)
                                                        {
                                                            luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        luongthuclanh += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
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
                                        currentPayroll.NumberDaysLeave = songaynghi;

                                        //Tổng thanh toán cuối cùng
                                        var tongthanhtoan = luongthuclanh;

                                        //Trừ tiền ngày nghỉ phép
                                        if (songaynghi > 0)
                                        {
                                            int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                            decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                            decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                            currentPayroll.PriceForOneDayOff = sotienmotngay;
                                            tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                        }

                                        currentPayroll.Total_Price = tongthanhtoan;
                                        currentPayroll.TotalAllowance = tongtrocap;

                                        model.Entry(currentPayroll).State = EntityState.Modified;
                                        model.SaveChanges();

                                        foreach (var items in trocaps)
                                        {
                                            items.ID_Payroll = currentPayroll.ID;
                                            model.SubsidiesApply.Add(items);
                                            model.SaveChanges();
                                        }

                                        Histories his = new Histories();
                                        his.ID_Employee = id;
                                        his.ID_Payroll = currentPayroll.ID;
                                        his.Name = "Tính Lại Lương Tháng " + thang.ToString("MM, yyyy");
                                        his.Contents = "Đã thực hiện tính lại tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                        his.Date = DateTime.Now;
                                        model.Histories.Add(his);
                                        model.SaveChanges();
                                    }
                                }
                            }
                            else
                            {
                                var insurance = model.Insurance.ToList();
                                if (emp != null)
                                {
                                    var payroll = new Payroll();
                                    var trocaps = new List<SubsidiesApply>();
                                    int indextrocap = 0;

                                    payroll.ID_PayrollCategory = payrollcu.ID;
                                    payroll.ID_Employee = id;

                                    //Lương cơ bản
                                    decimal luongcoban = emp.Wage;
                                    payroll.Salary = luongcoban;
                                    var luongcobantinhthue = luongcoban;
                                    var luongcobantinhbaohiem = luongcoban;
                                    var tongtrocap = (decimal)0;

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
                                    if (trocapTinhBH.Count > 0)
                                    {
                                        foreach (var items in trocapTinhBH)
                                        {
                                            if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                            {
                                                trocaps.Add(new SubsidiesApply());
                                                trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                if (items.SubsidiesCategory.Price == 0)
                                                {
                                                    luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                                }
                                                else
                                                {
                                                    luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                    tongtrocap += items.SubsidiesCategory.Price;
                                                }
                                                indextrocap++;
                                            }
                                        }
                                    }
                                    if (luongcobantinhbaohiem > muctranbh)
                                    {
                                        khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                                    }
                                    else
                                    {
                                        khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                                    }
                                    payroll.SalaryInsurance = luongcobantinhbaohiem;
                                    payroll.TotalPriceInsurance = khoantienbaohiem;

                                    //Thêm khoản trợ cấp có tính thuế
                                    if (trocapTinhBH.Count > 0)
                                    {
                                        foreach (var items in trocapTinhBH)
                                        {
                                            if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                            {
                                                bool exits = false;
                                                foreach (var checktrocap in trocaps)
                                                {
                                                    if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                                    {
                                                        exits = true;
                                                    }
                                                }
                                                if (exits == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                        tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhthue += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
                                                }
                                                else
                                                {
                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                    }
                                                    else
                                                    {
                                                        luongcobantinhthue += items.SubsidiesCategory.Price;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    payroll.SalaryTaxable = luongcobantinhthue;
                                    //Lương tối thiểu
                                    var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                                    //Có thể Tính thuế
                                    if (luongcobantinhthue > giamtrugiacanh)
                                    {
                                        int sonhanthan = emp.DependentsInformation.Count;
                                        payroll.NumberOfDependents = sonhanthan;
                                        payroll.FamilyAllowances = giamtrugiacanh;
                                        var luongtinhthue = (decimal)0;
                                        //Có người phụ thuộc
                                        if (sonhanthan > 0)
                                        {
                                            var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                            decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                            payroll.DependencyDeduction = khautruphuthuoc;

                                            //Mức lương đạt điều kiện để tính thuế
                                            if (luongcobantinhthue >= mucluongphuthuoc)
                                            {
                                                luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                            }
                                        }
                                        else
                                        {
                                            luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                        }

                                        var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                        var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                        var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                        payroll.Tax = thuexuat;
                                        payroll.TaxDeductions = khoangiamtru;
                                        payroll.TaxableSalary = luongtinhthue;
                                        payroll.TotalPriceTax = thuephaidong;

                                        var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        if (items.SubsidiesCategory.OnBasicSalary == true)
                                                        {
                                                            luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        luongthuclanh += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
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
                                        payroll.NumberDaysLeave = songaynghi;

                                        //Tổng thanh toán cuối cùng
                                        var tongthanhtoan = luongthuclanh;

                                        //Trừ tiền ngày nghỉ phép
                                        if (songaynghi > 0)
                                        {
                                            int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                            decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                            decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                            payroll.PriceForOneDayOff = sotienmotngay;
                                            tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                        }
                                        payroll.Total_Price = tongthanhtoan;
                                        payroll.MissingAmount = 0;
                                        payroll.State = false;
                                        payroll.TotalAllowance = tongtrocap;

                                        model.Payroll.Add(payroll);
                                        model.SaveChanges();

                                        foreach (var items in trocaps)
                                        {
                                            items.ID_Payroll = payroll.ID;
                                            model.SubsidiesApply.Add(items);
                                            model.SaveChanges();
                                        }

                                        Histories his = new Histories();
                                        his.ID_Employee = id;
                                        his.ID_Payroll = payroll.ID;
                                        his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                        his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                        his.Date = DateTime.Now;

                                        model.Histories.Add(his);
                                        model.SaveChanges();
                                    }
                                    else
                                    {
                                        int sonhanthan = emp.DependentsInformation.Count;
                                        payroll.NumberOfDependents = sonhanthan;
                                        payroll.FamilyAllowances = giamtrugiacanh;
                                        var luongtinhthue = (decimal)0;
                                        //Có người phụ thuộc
                                        if (sonhanthan > 0)
                                        {
                                            var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                            decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                            payroll.DependencyDeduction = khautruphuthuoc;

                                            //Mức lương đạt điều kiện để tính thuế
                                            if (luongcobantinhthue >= mucluongphuthuoc)
                                            {
                                                luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                            }
                                        }
                                        else
                                        {
                                            luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                        }

                                        payroll.Tax = 0;
                                        payroll.TaxDeductions = 0;
                                        payroll.TaxableSalary = luongtinhthue;
                                        payroll.TotalPriceTax = 0;

                                        var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                        if (trocapTinhBH.Count > 0)
                                        {
                                            foreach (var items in trocapTinhBH)
                                            {
                                                if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                                {
                                                    trocaps.Add(new SubsidiesApply());
                                                    trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                                    trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                                    trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                                    trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                                    trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                                    trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                                    trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                                    if (items.SubsidiesCategory.Price == 0)
                                                    {
                                                        if (items.SubsidiesCategory.OnBasicSalary == true)
                                                        {
                                                            luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                        else
                                                        {
                                                            luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                            tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        luongthuclanh += items.SubsidiesCategory.Price;
                                                        trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                        tongtrocap += items.SubsidiesCategory.Price;
                                                    }
                                                    indextrocap++;
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
                                        payroll.NumberDaysLeave = songaynghi;

                                        //Tổng thanh toán cuối cùng
                                        var tongthanhtoan = luongthuclanh;

                                        //Trừ tiền ngày nghỉ phép
                                        if (songaynghi > 0)
                                        {
                                            int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                            decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                            decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                            payroll.PriceForOneDayOff = sotienmotngay;
                                            tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                        }
                                        payroll.Total_Price = tongthanhtoan;
                                        payroll.MissingAmount = 0;
                                        payroll.State = false;
                                        payroll.TotalAllowance = tongtrocap;

                                        model.Payroll.Add(payroll);
                                        model.SaveChanges();

                                        foreach (var items in trocaps)
                                        {
                                            items.ID_Payroll = payroll.ID;
                                            model.SubsidiesApply.Add(items);
                                            model.SaveChanges();
                                        }

                                        Histories his = new Histories();
                                        his.ID_Employee = id;
                                        his.ID_Payroll = payroll.ID;
                                        his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                        his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                        his.Date = DateTime.Now;

                                        model.Histories.Add(his);
                                        model.SaveChanges();
                                    }
                                }
                            }
                        }

                    }
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
                            var trocaps = new List<SubsidiesApply>();
                            int indextrocap = 0;

                            payroll.ID_PayrollCategory = payrollCategory.ID;
                            payroll.ID_Employee = id;

                            //Lương cơ bản
                            decimal luongcoban = emp.Wage;
                            payroll.Salary = luongcoban;
                            var luongcobantinhthue = luongcoban;
                            var luongcobantinhbaohiem = luongcoban;
                            var tongtrocap = (decimal)0;

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
                            if (trocapTinhBH.Count > 0)
                            {
                                foreach (var items in trocapTinhBH)
                                {
                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == true)
                                    {
                                        trocaps.Add(new SubsidiesApply());
                                        trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                        trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                        trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                        trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                        trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                        trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                        trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                        if (items.SubsidiesCategory.Price == 0)
                                        {
                                            luongcobantinhbaohiem += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                            trocaps[indextrocap].Total_Price = luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                            tongtrocap += luongcobantinhbaohiem * items.SubsidiesCategory.Percentage.Value;
                                        }
                                        else
                                        {
                                            luongcobantinhbaohiem += items.SubsidiesCategory.Price;
                                            trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                            tongtrocap += items.SubsidiesCategory.Price;
                                        }
                                        indextrocap++;
                                    }
                                }
                            }
                            if (luongcobantinhbaohiem > muctranbh)
                            {
                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (muctranbh / 100));
                            }
                            else
                            {
                                khoantienbaohiem = (decimal)((PTbhxh + PTbhyt + PTbhtn) * (luongcobantinhbaohiem / 100));
                            }
                            payroll.SalaryInsurance = luongcobantinhbaohiem;
                            payroll.TotalPriceInsurance = khoantienbaohiem;

                            //Thêm khoản trợ cấp có tính thuế
                            if (trocapTinhBH.Count > 0)
                            {
                                foreach (var items in trocapTinhBH)
                                {
                                    if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Tax == true)
                                    {
                                        bool exits = false;
                                        foreach (var checktrocap in trocaps)
                                        {
                                            if (checktrocap.Name.Equals(items.SubsidiesCategory.Name))
                                            {
                                                exits = true;
                                            }
                                        }
                                        if (exits == false)
                                        {
                                            trocaps.Add(new SubsidiesApply());
                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                            if (items.SubsidiesCategory.Price == 0)
                                            {
                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                trocaps[indextrocap].Total_Price = luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                                tongtrocap += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                            }
                                            else
                                            {
                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                tongtrocap += items.SubsidiesCategory.Price;
                                            }
                                            indextrocap++;
                                        }
                                        else
                                        {
                                            if (items.SubsidiesCategory.Price == 0)
                                            {
                                                luongcobantinhthue += luongcobantinhthue * items.SubsidiesCategory.Percentage.Value;
                                            }
                                            else
                                            {
                                                luongcobantinhthue += items.SubsidiesCategory.Price;
                                            }
                                        }
                                    }
                                }
                            }
                            payroll.SalaryTaxable = luongcobantinhthue;
                            //Lương tối thiểu
                            var giamtrugiacanh = model.DependencyDeduction.Find(2).Price;
                            //Có thể Tính thuế
                            if (luongcobantinhthue > giamtrugiacanh)
                            {
                                int sonhanthan = emp.DependentsInformation.Count;
                                payroll.NumberOfDependents = sonhanthan;
                                payroll.FamilyAllowances = giamtrugiacanh;
                                var luongtinhthue = (decimal)0;
                                //Có người phụ thuộc
                                if (sonhanthan > 0)
                                {
                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                    payroll.DependencyDeduction = khautruphuthuoc;

                                    //Mức lương đạt điều kiện để tính thuế
                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                    {
                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                    }
                                }
                                else
                                {
                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                }

                                var thuexuat = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Percentage;
                                var khoangiamtru = model.Tax.FirstOrDefault(t => t.MinPrice <= luongtinhthue && t.MaxPrice >= luongtinhthue).Deductible;
                                var thuephaidong = (luongtinhthue / 100 * thuexuat) - khoangiamtru;

                                payroll.Tax = thuexuat;
                                payroll.TaxDeductions = khoangiamtru;
                                payroll.TaxableSalary = luongtinhthue;
                                payroll.TotalPriceTax = thuephaidong;

                                var luongthuclanh = (luongcoban + tongtrocap) - (thuephaidong + khoantienbaohiem);
                                if (trocapTinhBH.Count > 0)
                                {
                                    foreach (var items in trocapTinhBH)
                                    {
                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                        {
                                            trocaps.Add(new SubsidiesApply());
                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                            if (items.SubsidiesCategory.Price == 0)
                                            {
                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                {
                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                }
                                                else
                                                {
                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                }
                                            }
                                            else
                                            {
                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                tongtrocap += items.SubsidiesCategory.Price;
                                            }
                                            indextrocap++;
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
                                payroll.NumberDaysLeave = songaynghi;

                                //Tổng thanh toán cuối cùng
                                var tongthanhtoan = luongthuclanh;

                                //Trừ tiền ngày nghỉ phép
                                if (songaynghi > 0)
                                {
                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                    payroll.PriceForOneDayOff = sotienmotngay;
                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                }
                                payroll.Total_Price = tongthanhtoan;
                                payroll.MissingAmount = 0;
                                payroll.State = false;
                                payroll.TotalAllowance = tongtrocap;

                                model.Payroll.Add(payroll);
                                model.SaveChanges();

                                foreach (var items in trocaps)
                                {
                                    items.ID_Payroll = payroll.ID;
                                    model.SubsidiesApply.Add(items);
                                    model.SaveChanges();
                                }

                                Histories his = new Histories();
                                his.ID_Employee = id;
                                his.ID_Payroll = payroll.ID;
                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                his.Date = DateTime.Now;

                                model.Histories.Add(his);
                                model.SaveChanges();
                            }
                            else
                            {
                                int sonhanthan = emp.DependentsInformation.Count;
                                payroll.NumberOfDependents = sonhanthan;
                                payroll.FamilyAllowances = giamtrugiacanh;
                                var luongtinhthue = (decimal)0;
                                //Có người phụ thuộc
                                if (sonhanthan > 0)
                                {
                                    var khautruphuthuoc = model.DependencyDeduction.Find(1).Price;
                                    decimal mucluongphuthuoc = giamtrugiacanh + (sonhanthan * khautruphuthuoc);
                                    payroll.DependencyDeduction = khautruphuthuoc;

                                    //Mức lương đạt điều kiện để tính thuế
                                    if (luongcobantinhthue >= mucluongphuthuoc)
                                    {
                                        luongtinhthue = (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (mucluongphuthuoc + khoantienbaohiem)) : 0;
                                    }
                                }
                                else
                                {
                                    luongtinhthue = (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) >= 0 ? (luongcobantinhthue - (giamtrugiacanh + khoantienbaohiem)) : 0;
                                }

                                payroll.Tax = 0;
                                payroll.TaxDeductions = 0;
                                payroll.TaxableSalary = luongtinhthue;
                                payroll.TotalPriceTax = 0;

                                var luongthuclanh = (luongcoban + tongtrocap) - khoantienbaohiem;
                                if (trocapTinhBH.Count > 0)
                                {
                                    foreach (var items in trocapTinhBH)
                                    {
                                        if ((items.SubsidiesCategory.DateApply == DateTime.Now.Month || items.SubsidiesCategory.DateApply == 0) && items.SubsidiesCategory.Insurance == false && items.SubsidiesCategory.Tax == false)
                                        {
                                            trocaps.Add(new SubsidiesApply());
                                            trocaps[indextrocap].Name = items.SubsidiesCategory.Name;
                                            trocaps[indextrocap].Price = items.SubsidiesCategory.Price;
                                            trocaps[indextrocap].Percentage = items.SubsidiesCategory.Percentage;
                                            trocaps[indextrocap].OnBasicSalary = items.SubsidiesCategory.OnBasicSalary;
                                            trocaps[indextrocap].Date_Apply = items.SubsidiesCategory.DateApply;
                                            trocaps[indextrocap].Tax = items.SubsidiesCategory.Tax;
                                            trocaps[indextrocap].Insurance = items.SubsidiesCategory.Insurance;

                                            if (items.SubsidiesCategory.Price == 0)
                                            {
                                                if (items.SubsidiesCategory.OnBasicSalary == true)
                                                {
                                                    luongthuclanh += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongcoban * items.SubsidiesCategory.Percentage.Value;
                                                }
                                                else
                                                {
                                                    luongthuclanh += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                    trocaps[indextrocap].Total_Price = luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                    tongtrocap += luongthuclanh * items.SubsidiesCategory.Percentage.Value;
                                                }
                                            }
                                            else
                                            {
                                                luongthuclanh += items.SubsidiesCategory.Price;
                                                trocaps[indextrocap].Total_Price = items.SubsidiesCategory.Price;
                                                tongtrocap += items.SubsidiesCategory.Price;
                                            }
                                            indextrocap++;
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
                                payroll.NumberDaysLeave = songaynghi;

                                //Tổng thanh toán cuối cùng
                                var tongthanhtoan = luongthuclanh;

                                //Trừ tiền ngày nghỉ phép
                                if (songaynghi > 0)
                                {
                                    int tongSoNgay = DateTime.DaysInMonth(thang.Year, thang.Month);
                                    decimal sotienmotngay = luongthuclanh / tongSoNgay;
                                    decimal sotientrunghiphep = sotienmotngay * songaynghi;
                                    payroll.PriceForOneDayOff = sotienmotngay;
                                    tongthanhtoan = luongthuclanh - sotientrunghiphep;

                                }
                                payroll.Total_Price = tongthanhtoan;
                                payroll.MissingAmount = 0;
                                payroll.State = false;
                                payroll.TotalAllowance = tongtrocap;

                                model.Payroll.Add(payroll);
                                model.SaveChanges();

                                foreach (var items in trocaps)
                                {
                                    items.ID_Payroll = payroll.ID;
                                    model.SubsidiesApply.Add(items);
                                    model.SaveChanges();
                                }

                                Histories his = new Histories();
                                his.ID_Employee = id;
                                his.ID_Payroll = payroll.ID;
                                his.Name = "Tính Lương Tháng " + thang.ToString("MM, yyyy");
                                his.Contents = "Đã thực hiện tính tiền lương tháng " + thang.ToString("MM, yyyy") + " cho " + emp.Name;
                                his.Date = DateTime.Now;

                                model.Histories.Add(his);
                                model.SaveChanges();
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

        [HttpPost]
        public ActionResult chitietluong(int? id)
        {
            if (id == null)
                return Content("DANGNHAP");

            var chiTiet = model.Payroll.Find(id);
            if (chiTiet == null)
                return Content("DANGNHAP");

            return PartialView("_chiTietLuongPartial", chiTiet);
        }

        [HttpPost]
        public ActionResult thanhtoanluong(int? id)
        {
            if (id == null)
                return Content("DANGNHAP");

            var chiTiet = model.Payroll.Find(id);
            if (chiTiet == null)
                return Content("DANGNHAP");

            bool trangthai = chiTiet.State.Value;
            if (trangthai == true)
            {
                chiTiet.State = false;
                model.Entry(chiTiet).State = EntityState.Modified;

                Histories his = new Histories();
                his.ID_Employee = chiTiet.ID_Employee;
                his.ID_Payroll = chiTiet.ID;
                his.Name = "Hủy Thanh Toán " + chiTiet.PayrollCategory.Name;
                his.Contents = "Đã hủy thanh toán tiền lương cho " + chiTiet.Employees.Name;
                his.Date = DateTime.Now;

                model.Histories.Add(his);
                model.SaveChanges();

                return PartialView("_chiTietLuongPartial", chiTiet);
            }
            else
            {
                chiTiet.State = true;
                model.Entry(chiTiet).State = EntityState.Modified;

                Histories his = new Histories();
                his.ID_Employee = chiTiet.ID_Employee;
                his.ID_Payroll = chiTiet.ID;
                his.Name = "Thanh Toán " + chiTiet.PayrollCategory.Name;
                his.Contents = "Đã hoàn tất thanh toán tiền lương cho " + chiTiet.Employees.Name;
                his.Date = DateTime.Now;

                model.Histories.Add(his);
                model.SaveChanges();

                return PartialView("_chiTietLuongPartial", chiTiet);
            }
        }

        [HttpPost]
        public ActionResult timKiemBangLuong(int? nam, string trangthai)
        {
            if (nam == null || string.IsNullOrEmpty(trangthai))
                return Content("DANGNHAP");

            if (trangthai.Equals("tatca"))
            {
                var luongnam = model.PayrollCategory.Where(p => p.Date.Year == nam).ToList();
                return PartialView("_bangLuongPartial", luongnam);
            }
            else if (trangthai.Equals("dathanhtoan"))
            {
                var luongnam = model.PayrollCategory.Where(p => p.Date.Year == nam && p.Payroll.Where(s => s.State == false).Count() < 1).ToList();
                return PartialView("_bangLuongPartial", luongnam);
            }
            else
            {
                var luongnam = model.PayrollCategory.Where(p => p.Date.Year == nam && p.Payroll.Where(s => s.State == false).Count() > 0).ToList();
                return PartialView("_bangLuongPartial", luongnam);
            }
        }
    }
}