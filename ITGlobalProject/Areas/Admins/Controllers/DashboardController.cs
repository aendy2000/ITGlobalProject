using ITGlobalProject.Middleware;
using ITGlobalProject.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    [AdminLoginVerification]
    public class DashboardController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/Dashboard
        public ActionResult Overview()
        {
            Session["soluong-nhanvien-thongke"] = model.Employees.Count() - 1; //Trừ đi tài khoản admin

            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            Session["soluong-nhanvien-trongthang-thongke"] = model.Employees.Where(e => e.JoinedDate.Month == currentMonth && e.JoinedDate.Year == currentYear).Count();
            Session["soluong-doitac-thongke"] = model.Partners.Count();
            Session["soluong-doitac-trongthang-thongke"] = model.Partners.Where(d => d.AddDate.Value.Month == currentMonth && d.AddDate.Value.Year == currentYear).Count();

            Session["soluong-duan-thongke"] = model.Projects.Count();
            Session["soluong-duan-dangthuchien-thongke"] = model.Projects.Where(p => p.StartDate.Month <= currentMonth && p.StartDate.Year <= currentYear
            && p.EndDate.Month >= currentMonth && p.EndDate.Year >= currentYear).Count();

            Session["soluong-congviec-thongke"] = model.Tasks.Count();
            Session["soluong-congviec-moi-thongke"] = model.Tasks.Where(p => p.State.Equals("do")).Count();

            var lstdoanhthudb = model.PaymentHistory.Where(p => p.Date.Year == currentYear && p.ID_Debts != null && p.Contents.IndexOf("Thêm khoản") == -1).OrderByDescending(o => o.ID).ToList();
            Session["thongke-chitiet-doanhthu"] = lstdoanhthudb;

            string listDoanhThu = "";
            string listDuAn = "";
            int soduan = 0;

            for (int i = 1; i <= 12; i++)
            {
                List<int> lst = new List<int>();
                soduan = 0;
                listDoanhThu += Convert.ToDecimal(lstdoanhthudb.Where(p => p.Date.Month == i).ToList().Sum(s => s.Price)).ToString("0") + "-";
                foreach (var item in lstdoanhthudb.Where(p => p.Date.Month == i).ToList())
                {
                    bool isInList = lst.IndexOf(item.Debts.ID_Project) != -1;
                    if (lst.IndexOf(item.Debts.ID_Project) == -1)
                    {
                        lst.Add(item.Debts.ID_Project);
                        soduan += 1;
                    }
                }
                listDuAn += soduan + "-";
            }

            Session["lst-doanhthu-nam"] = listDoanhThu.Substring(0, listDoanhThu.Length - 1);
            Session["lst-duan-nam"] = listDuAn.Substring(0, listDuAn.Length - 1);

            //Thống kê dự án
            string strthongkeduan = "";

            var proj = model.Projects.ToList();
            int moi = 0, dangthuchien = 0, chothanhtoan = 0, dahoanthanh = 0, daquahan = 0, dadong = 0;
            foreach (var item in proj)
            {
                if (item.Lock == true)
                {
                    dadong++;
                }
                else
                {
                    //Mới
                    if (item.StartDate > DateTime.Now)
                    {
                        moi++;
                    }
                    //Chưa giao việc, còn hạn => đang thực hiện
                    else if (item.Tasks.ToList().Count < 1
                        && (item.EndDate.AddDays(1) - DateTime.Now).TotalDays >= 0)
                    {
                        dangthuchien++;
                    }
                    //Chưa giao việc, quá hạn => đã quá hạn
                    else if (item.Tasks.ToList().Count < 1
                                            && (item.EndDate.AddDays(1) - DateTime.Now).TotalDays < 0)
                    {
                        daquahan++;
                    }
                    //Còn hạn và còn việc => đang thực hiện
                    else if (item.Tasks.ToList().Count > 0
                        && (item.Tasks.Where(t => t.State.Equals("done")).Sum(t => t.OriginalEstimate) < 1 || (item.Tasks.Where(t => t.State.Equals("done")).Sum(t => t.OriginalEstimate) / item.Tasks.Sum(t => t.OriginalEstimate)) * 100 < 100)
                        && (item.EndDate.AddDays(1) - DateTime.Now).TotalDays >= 0)
                    {
                        dangthuchien++;
                    }
                    //Qúa hạn, còn việc hoặc chưa thanh toán xong => đã quá hạn
                    else if ((item.EndDate.AddDays(1) - DateTime.Now).TotalDays < 0
                        && (item.Tasks.Where(t => t.State.Equals("done")).Sum(t => t.OriginalEstimate) / item.Tasks.Sum(t => t.OriginalEstimate)) * 100 < 100)
                    {
                        daquahan++;
                    }
                    //hết việc, chưa thanh toán xong => chờ thanh toán
                    else if ((item.Tasks.Where(t => t.State.Equals("done")).Sum(t => t.OriginalEstimate) / item.Tasks.Sum(t => t.OriginalEstimate)) * 100 >= 100
                        && item.Debts.Where(d => d.State == true).ToList().Count < item.Debts.Count)
                    {
                        chothanhtoan++;
                    }
                    //hết việc, đã thanh toán xong => done
                    else if ((item.Tasks.Where(t => t.State.Equals("done")).Sum(t => t.OriginalEstimate) / item.Tasks.Sum(t => t.OriginalEstimate)) * 100 == 100
                        && item.Debts.Where(d => d.State == true).ToList().Count == item.Debts.Count)
                    {
                        dahoanthanh++;
                    }
                }
            }

            strthongkeduan += moi + "-" + dangthuchien + "-" + chothanhtoan + "-" + dahoanthanh + "-" + daquahan + "-" + dadong;
            Session["lst-duan-thongke"] = strthongkeduan;

            //Thống kê công việc
            string strthongkecongviec = "";

            //Công việc mới
            strthongkecongviec += model.Tasks.Where(t => t.State.Equals("do")).Count() + "-";
            //Công việc đang thực hiện
            strthongkecongviec += model.Tasks.Where(t => t.State.Equals("progress")).Count() + "-";
            //Công việc chờ duyệt
            strthongkecongviec += model.Tasks.Where(t => t.State.Equals("review")).Count() + "-";
            //Công việc hoàn thành
            strthongkecongviec += model.Tasks.Where(t => t.State.Equals("done")).Count();
            Session["lst-congviec-thongke"] = strthongkecongviec;

            Session["nam-thongke"] = currentYear;
            ViewBag.ShowActive = "Overview";
            return View("Overview");
        }

        public ActionResult ChonXemDoanhThu(int nam)
        {
            var currentYear = nam;
            var lstdoanhthudb = model.PaymentHistory.Where(p => p.Date.Year == currentYear && p.ID_Debts != null && p.Contents.IndexOf("Thêm khoản") == -1).OrderByDescending(o => o.ID).ToList();
            Session["thongke-chitiet-doanhthu"] = lstdoanhthudb;

            string listDoanhThu = "";
            string listDuAn = "";
            int soduan = 0;

            for (int i = 1; i <= 12; i++)
            {
                List<int> lst = new List<int>();
                soduan = 0;
                listDoanhThu += Convert.ToDecimal(lstdoanhthudb.Where(p => p.Date.Month == i).ToList().Sum(s => s.Price)).ToString("0") + "-";
                foreach (var item in lstdoanhthudb.Where(p => p.Date.Month == i).ToList())
                {
                    bool isInList = lst.IndexOf(item.Debts.ID_Project) != -1;
                    if (lst.IndexOf(item.Debts.ID_Project) == -1)
                    {
                        lst.Add(item.Debts.ID_Project);
                        soduan += 1;
                    }
                }
                listDuAn += soduan + "-";
            }

            Session["lst-doanhthu-nam"] = listDoanhThu.Substring(0, listDoanhThu.Length - 1);
            Session["lst-duan-nam"] = listDuAn.Substring(0, listDuAn.Length - 1);
          
            Session["nam-thongke"] = currentYear;
            return PartialView("_thongKeDoanhThuPartial");
        }

    }
}