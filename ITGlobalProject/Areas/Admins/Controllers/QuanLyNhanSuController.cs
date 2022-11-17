using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList.Mvc;
using PagedList;
using System.Globalization;
using System.Web.WebPages;

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyNhanSuController : Controller
    {
        // GET: Admins/QuanLyNhanSu
        public ActionResult danhSachNhanVien(int? page, int? pageSize, int? type)
        {
            ViewBag.ShowActive = "danhSachNhanVien";

            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;
            List<List<string>> lst = new List<List<string>>();

            lst.Add(new List<string>());
            lst[0].Add("Đặng Văn Tuấn");
            lst[0].Add("Web Developer, Designer");
            lst[0].Add("42");
            lst[0].Add("8");
            lst[0].Add("12");
            lst[0].Add("avatar-1.jpg");

            lst.Add(new List<string>());
            lst[1].Add("Nguyễn Hiếu Nhân");
            lst[1].Add("Web Developer, Designer");
            lst[1].Add("22");
            lst[1].Add("5");
            lst[1].Add("15");
            lst[1].Add("avatar-2.jpg");

            lst.Add(new List<string>());
            lst[2].Add("Lê Thị Lợi");
            lst[2].Add("Tester");
            lst[2].Add("10");
            lst[2].Add("3");
            lst[2].Add("9");
            lst[2].Add("avatar-3.jpg");

            lst.Add(new List<string>());
            lst[3].Add("Bùi Công Danh");
            lst[3].Add("Designer");
            lst[3].Add("42");
            lst[3].Add("8");
            lst[3].Add("12");
            lst[3].Add("avatar-4.jpg");

            lst.Add(new List<string>());
            lst[4].Add("Nguyễn Thanh Thiện");
            lst[4].Add("Web Developer, Designer");
            lst[4].Add("13");
            lst[4].Add("4");
            lst[4].Add("9");
            lst[4].Add("avatar-5.jpg");

            lst.Add(new List<string>());
            lst[5].Add("Nguyễn Huy Hoàng");
            lst[5].Add("Developer");
            lst[5].Add("62");
            lst[5].Add("12");
            lst[5].Add("40");
            lst[5].Add("avatar-6.jpg");

            lst.Add(new List<string>());
            lst[6].Add("Lê Nhã Hoài");
            lst[6].Add("Designer");
            lst[6].Add("12");
            lst[6].Add("4");
            lst[6].Add("5");
            lst[6].Add("avatar-7.jpg");

            lst.Add(new List<string>());
            lst[7].Add("Trần Thành Dũng");
            lst[7].Add("Web Developer");
            lst[7].Add("48");
            lst[7].Add("13");
            lst[7].Add("22");
            lst[7].Add("avatar-8.jpg");

            lst.Add(new List<string>());
            lst[8].Add("Nguyễn Minh Thành");
            lst[8].Add("Web Developer");
            lst[8].Add("89");
            lst[8].Add("54");
            lst[8].Add("87");
            lst[8].Add("avatar-9.jpg");

            lst.Add(new List<string>());
            lst[9].Add("Hàng Đức Dũng");
            lst[9].Add("Mobile Developer");
            lst[9].Add("58");
            lst[9].Add("14");
            lst[9].Add("24");
            lst[9].Add("avatar-10.jpg");

            lst.Add(new List<string>());
            lst[10].Add("Trần Đình Nam");
            lst[10].Add("Designer");
            lst[10].Add("32");
            lst[10].Add("15");
            lst[10].Add("11");
            lst[10].Add("avatar-11.jpg");

            lst.Add(new List<string>());
            lst[11].Add("Hoàng Minh Đức");
            lst[11].Add("Web Developer");
            lst[11].Add("42");
            lst[11].Add("8");
            lst[11].Add("12");
            lst[11].Add("avatar-12.jpg");

            ViewBag.typeListNhanSu = type;
            return View(lst.ToPagedList((int)page, (int)pageSize));
        }
        public ActionResult danhSachNhanVienGridPartial(int? page, int? pageSize, int? type)
        {
            if (type == null)
                type = 1;
            if (page == null)
                page = 1;
            if (pageSize == null)
                pageSize = 8;
            List<List<string>> lst = new List<List<string>>();

            lst.Add(new List<string>());
            lst[0].Add("Đặng Văn Tuấn");
            lst[0].Add("Web Developer, Designer");
            lst[0].Add("42");
            lst[0].Add("8");
            lst[0].Add("12");
            lst[0].Add("avatar-1.jpg");

            lst.Add(new List<string>());
            lst[1].Add("Nguyễn Hiếu Nhân");
            lst[1].Add("Web Developer, Designer");
            lst[1].Add("22");
            lst[1].Add("5");
            lst[1].Add("15");
            lst[1].Add("avatar-2.jpg");

            lst.Add(new List<string>());
            lst[2].Add("Lê Thị Lợi");
            lst[2].Add("Tester");
            lst[2].Add("10");
            lst[2].Add("3");
            lst[2].Add("9");
            lst[2].Add("avatar-3.jpg");

            lst.Add(new List<string>());
            lst[3].Add("Bùi Công Danh");
            lst[3].Add("Designer");
            lst[3].Add("42");
            lst[3].Add("8");
            lst[3].Add("12");
            lst[3].Add("avatar-4.jpg");

            lst.Add(new List<string>());
            lst[4].Add("Nguyễn Thanh Thiện");
            lst[4].Add("Web Developer, Designer");
            lst[4].Add("13");
            lst[4].Add("4");
            lst[4].Add("9");
            lst[4].Add("avatar-5.jpg");

            lst.Add(new List<string>());
            lst[5].Add("Nguyễn Huy Hoàng");
            lst[5].Add("Developer");
            lst[5].Add("62");
            lst[5].Add("12");
            lst[5].Add("40");
            lst[5].Add("avatar-6.jpg");

            lst.Add(new List<string>());
            lst[6].Add("Lê Nhã Hoài");
            lst[6].Add("Designer");
            lst[6].Add("12");
            lst[6].Add("4");
            lst[6].Add("5");
            lst[6].Add("avatar-7.jpg");

            lst.Add(new List<string>());
            lst[7].Add("Trần Thành Dũng");
            lst[7].Add("Web Developer");
            lst[7].Add("48");
            lst[7].Add("13");
            lst[7].Add("22");
            lst[7].Add("avatar-8.jpg");

            lst.Add(new List<string>());
            lst[8].Add("Nguyễn Minh Thành");
            lst[8].Add("Web Developer");
            lst[8].Add("89");
            lst[8].Add("54");
            lst[8].Add("87");
            lst[8].Add("avatar-9.jpg");

            lst.Add(new List<string>());
            lst[9].Add("Hàng Đức Dũng");
            lst[9].Add("Mobile Developer");
            lst[9].Add("58");
            lst[9].Add("14");
            lst[9].Add("24");
            lst[9].Add("avatar-10.jpg");

            lst.Add(new List<string>());
            lst[10].Add("Trần Đình Nam");
            lst[10].Add("Designer");
            lst[10].Add("32");
            lst[10].Add("15");
            lst[10].Add("11");
            lst[10].Add("avatar-11.jpg");

            lst.Add(new List<string>());
            lst[11].Add("Hoàng Minh Đức");
            lst[11].Add("Web Developer");
            lst[11].Add("42");
            lst[11].Add("8");
            lst[11].Add("12");
            lst[11].Add("avatar-12.jpg");

            ViewBag.typeListNhanSu = type;
            return PartialView("_nhanVienListPartialView", lst.ToPagedList((int)page, (int)pageSize));

        }

        public ActionResult thongTinChiTiet(int? ID)
        {
            ViewBag.ShowActive = "danhSachNhanVien";
            return View();
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