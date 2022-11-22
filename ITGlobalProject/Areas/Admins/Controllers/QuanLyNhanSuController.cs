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

namespace ITGlobalProject.Areas.Admins.Controllers
{
    public class QuanLyNhanSuController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

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
            Session["lstEmployees"] = employee;
            Session["DefaultlstEmployees"] = employee;

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

            var employee = Session["lstEmployees"] as List<Employees>;

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

                if (string.IsNullOrEmpty(mucluongs))
                    employee.Wage = 0;
                else
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
                Session["lstEmployees"] = employees;
                Session["DefaultlstEmployees"] = employees;

                ViewBag.typeListNhanSu = type;
                return PartialView("_nhanVienListPartialView", employees.ToPagedList((int)page, (int)pageSize));
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
            }

        }
        [HttpPost]
        public ActionResult timKiemNhanVien(string noidungs, string typestr)
        {
            if (Session["lstEmployees"] == null)
                return Content("DANGNHAP");

            int type = Int32.Parse(typestr);
            int page = 1;
            int pageSize = 8;
            if (string.IsNullOrEmpty(noidungs))
            {
                var employee = Session["DefaultlstEmployees"] as List<Employees>;
                var employeess = employee.Where(e => e.ID_Position != 1).OrderByDescending(o => o.ID).ToList(); ;
                Session["lstEmployees"] = employeess;

                ViewBag.typeListNhanSu = type;
                return PartialView("_nhanVienListPartialView", employeess.ToPagedList((int)page, (int)pageSize));
            }
            else
            {
                var employee = Session["DefaultlstEmployees"] as List<Employees>;
                var employees = employee.Where(e => e.Name.ToLower().Contains(noidungs.ToLower().Trim()) && e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();
                Session["lstEmployees"] = employees;

                ViewBag.typeListNhanSu = type;
                return PartialView("_nhanVienListPartialView", employees.ToPagedList((int)page, (int)pageSize));
            }
        }
        public ActionResult thongTinChiTiet(int? id)
        {
            if (id == null)
                return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return View(user);
            }
            return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");
        }
        public ActionResult thongTinChiTietPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_thongTinChiTietPartial", user);
            }
            return Content("DANHSACH");
        }
        public ActionResult chinhSuaThongTinPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                Session["lst-role"] = model.Position.Where(p => !p.Name.ToLower().Equals("admin")).ToList();
                return PartialView("_chinhSuaThongTinPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public async Task<ActionResult> chinhSuaThongTinPartial(HttpPostedFileBase AvatarImg, int ids, string hotens, string cmnds, string sodienthoais, string ngaysinhs,
            string diachiemails, string gioitinhs, string diachinhas, string vaitros, string nguoiphuthuocs, string mucluongs,
            string dsNganHangs, string sotaikhoans, string chutaikhoans, string avatars)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == ids);
            if (user != null)
            {
                try
                {
                    FileStream stream;
                    if (AvatarImg != null)
                    {
                        if (AvatarImg.ContentLength > 0)
                        {
                            const string src = "abcdefghijklmnopqrstuvwxyz0123456789";
                            int length = 30;
                            var sb = new StringBuilder();
                            Random RNG = new Random();
                            for (var i = 0; i < length; i++)
                            {
                                var c = src[RNG.Next(0, src.Length)];
                                sb.Append(c);
                            }

                            string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + AvatarImg.FileName); ;
                            AvatarImg.SaveAs(path);
                            stream = new FileStream(Path.Combine(path), FileMode.Open);
                            var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
                            var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);
                            var cancellation = new CancellationTokenSource();

                            var task = new FirebaseStorage(
                                Bucket,
                                new FirebaseStorageOptions
                                {
                                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                                    ThrowOnCancel = true
                                })
                                .Child("images")
                                .Child(sb.ToString().Trim() + AvatarImg.FileName)
                                .PutAsync(stream, cancellation.Token);
                            try
                            {
                                string link = await task;
                                user.Avatar = link;
                                System.IO.File.Delete(path);
                            }
                            catch (Exception e)
                            {
                                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                            }
                        }
                    }
                    else
                    {
                        user.Avatar = avatars;
                    }
                    user.Name = hotens;
                    user.IdentityCard = cmnds;
                    user.Phone = sodienthoais;
                    user.Birthday = Convert.ToDateTime(ngaysinhs);
                    user.Sex = gioitinhs;
                    user.Address = diachinhas;
                    user.ID_Position = Int32.Parse(vaitros);
                    user.NumberOfDependants = Int32.Parse(nguoiphuthuocs);

                    if (string.IsNullOrEmpty(mucluongs))
                        user.Wage = 0;
                    else
                        user.Wage = Convert.ToDecimal(mucluongs.Replace(",", ""));

                    user.BankName = dsNganHangs;
                    user.BankAccountNumber = sotaikhoans;
                    user.BankAccountHolderName = chutaikhoans;
                    user.Email = diachiemails;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();

                    Session["lst-role"] = model.Position.Where(p => !p.Name.ToLower().Equals("admin")).ToList();
                    return PartialView("_chinhSuaThongTinPartial", user);
                }
                catch
                {
                    return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                }
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult khoaTaiKhoan(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                if (user.Lock == false)
                {
                    user.Lock = true;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();
                    return Content("DAKHOA");
                }
                else
                {
                    user.Lock = false;
                    model.Entry(user).State = EntityState.Modified;
                    model.SaveChanges();
                    model = new CP25Team06Entities();
                    return Content("DAMO");
                }
            }
            return Content("DANHSACH");
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