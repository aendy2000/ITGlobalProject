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
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using ITGlobalProject.Models;
using ITGlobalProject.Middleware;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    [AdminLoginVerification]
    public class QuanLyNhanSuController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Admins/QuanLyNhanSu
        public ActionResult danhSachNhanVien(int? page, int? pageSize, int? type)
        {
            ViewBag.ShowActive = "danhSachNhanVien";

            var role = model.Position.Where(p => !p.Name.ToLower().Equals("admin")).ToList();
            Session["lst-role"] = role;

            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;

            var employee = model.Employees.Where(e => e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();

            ViewBag.typeListNhanSu = type;
            return View(employee.ToPagedList((int)page, (int)pageSize));
        }
        public ActionResult danhSachNhanVienGridPartial(int? page, int? pageSize, int? type)
        {
            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;

            var employee = model.Employees.Where(e => e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();

            ViewBag.typeListNhanSu = type;
            return PartialView("_nhanVienListPartialView", employee.ToPagedList((int)page, (int)pageSize));
        }
        public ActionResult themNhanVien(string hotens, string cmnds, string sodienthoais, string ngaysinhs,
            string gioitinhs, string diachinhas, string vaitros, string nguoiphuthuocs, string mucluongs,
            string dsNganHangs, string sotaikhoans, string chutaikhoans, string diachiemails, string matkhaudangnhaps)
        {
            try
            {
                var employee = new Employees();
                employee.Name = hotens;
                employee.IdentityCard = cmnds;
                employee.Phone = sodienthoais;
                employee.Birthday = Convert.ToDateTime(ngaysinhs);
                employee.Sex = gioitinhs;
                employee.Address = diachinhas;
                employee.ID_Position = Int32.Parse(vaitros);
                employee.NumberOfDependants = Int32.Parse(nguoiphuthuocs);
                employee.Wage = Convert.ToDecimal(mucluongs.Replace(",", ""));
                employee.BankName = dsNganHangs;
                employee.BankAccountNumber = sotaikhoans;
                employee.BankAccountHolderName = chutaikhoans;
                employee.Email = diachiemails;
                employee.Password = matkhaudangnhaps;

                model.Employees.Add(employee);
                model.SaveChanges();

                model = new CP25Team06Entities();

                int type = 1;
                int page = 1;
                int pageSize = 8;

                var employees = model.Employees.Where(e => e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();

                ViewBag.typeListNhanSu = type;
                return PartialView("_nhanVienListPartialView", employees.ToPagedList((int)page, (int)pageSize));
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
            }

        }

        public ActionResult thongTinChiTiet(int id)
        {
            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return View(user);
            }
            return View("danhSachNhanVien");
        }
        public ActionResult thongTinChiTietPartial(int? ID)
        {
            return PartialView("_thongTinChiTietPartial");
        }
        public ActionResult chinhSuaThongTinPartial(int? ID)
        {
            return PartialView("_chinhSuaThongTinPartial");
        }
        public ActionResult duAnThamGiaPartial(int? ID)
        {
            return PartialView("_duAnThamGiaPartial");
        }
        public ActionResult lichSuHoatDongPartial(int? ID)
        {
            return PartialView("_lichSuHoatDongPartial");
        }
        public ActionResult bangLuongPartial(int? ID)
        {
            return PartialView("_bangLuongPartial");
        }
        public ActionResult lichBieuPartial(int? ID)
        {
            return PartialView("_lichBieuPartial");
        }
        public ActionResult baoCaoThongKePartial(int? ID)
        {
            return PartialView("_baoCaoThongKePartial");
        }
    }
}