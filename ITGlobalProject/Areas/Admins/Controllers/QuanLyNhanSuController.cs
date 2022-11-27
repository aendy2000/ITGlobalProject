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
            var kynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
            Session["lst-kynang"] = kynang;
            var trocap = model.SubsidiesCategory.OrderBy(k => k.Name).ToList();
            Session["lst-trocap"] = trocap;
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
        public async Task<ActionResult> themNhanVien(HttpPostedFileBase anhHopDong, string hoten,
        string cmnd, string quoctich, string honnhan, string ngaysinh, string gioitinh, string diachinha,
        string sodienthoaididong, string sodienthoaikhac, string diachiemailcongty, string diachiemailkhac,
        string mucluong, string dsNganHang, string sotaikhoan, string chutaikhoan, string kynang, string trinhdongoaingu,
        string phuthuocnhanthan, string trocap, string ngayvaolam, int vaitro, string hinhthuc, string username,
        string matkhaudangnhap, string ngaykyhopdong, string ngaygiahanhopdong)
        {
            try
            {
                Employees emp = new Employees();
                emp.ID_Position = vaitro;
                emp.Name = hoten;
                emp.IdentityCard = cmnd;
                emp.Nationality = quoctich;
                emp.MaritalStatus = honnhan;
                emp.Birthday = Convert.ToDateTime(ngaysinh);
                emp.Sex = gioitinh;
                emp.Address = diachinha;
                emp.TelephoneOrther = sodienthoaikhac;
                emp.TelephoneMobile = sodienthoaididong;
                emp.WorkEmail = diachiemailcongty;
                emp.OrtherEmail = diachiemailkhac;

                if (string.IsNullOrEmpty(mucluong))
                    emp.Wage = 0;
                else
                    emp.Wage = Convert.ToDecimal(mucluong.Replace(",", ""));

                emp.BankName = dsNganHang;
                emp.BankAccountNumber = sotaikhoan;
                emp.BankAccountHolderName = chutaikhoan;
                emp.JoinedDate = Convert.ToDateTime(ngayvaolam);
                emp.EmploymentStatus = hinhthuc;
                emp.Username = username;
                emp.Password = matkhaudangnhap;
                emp.Lock = false;
                emp.AccountStatus = true;
                model.Employees.Add(emp);
                model.SaveChanges();

                model = new CP25Team06Entities();
                EmploymentContracts employ = new EmploymentContracts();
                employ.ID_Employee = emp.ID;
                employ.StartDate = Convert.ToDateTime(ngaykyhopdong);
                employ.EndDate = Convert.ToDateTime(ngaygiahanhopdong);

                FileStream stream;
                if (anhHopDong.ContentLength > 0)
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

                    string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + anhHopDong.FileName); ;
                    anhHopDong.SaveAs(path);
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
                        .Child(sb.ToString().Trim() + anhHopDong.FileName)
                        .PutAsync(stream, cancellation.Token);
                    try
                    {
                        string link = await task;
                        employ.ImageURL = link;
                        System.IO.File.Delete(path);
                    }
                    catch
                    {
                        return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                    }
                }
                model.EmploymentContracts.Add(employ);
                model.SaveChanges();

                //Kỹ năng
                if (!string.IsNullOrEmpty(kynang))
                {
                    if (kynang.IndexOf("_") != -1)
                    {
                        for (int i = 0; i < kynang.Split('_').ToList().Count; i++)
                        {
                            PersonalSkills perSkill = new PersonalSkills();
                            perSkill.ID_Employee = emp.ID;
                            perSkill.ID_SkillsCategory = Int32.Parse(kynang.Split('_')[i]);
                            model.PersonalSkills.Add(perSkill);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        PersonalSkills perSkill = new PersonalSkills();
                        perSkill.ID_Employee = emp.ID;
                        perSkill.ID_SkillsCategory = Int32.Parse(kynang);
                        model.PersonalSkills.Add(perSkill);
                        model.SaveChanges();
                    }
                }

                //Ngoại ngữ
                if (!string.IsNullOrEmpty(trinhdongoaingu))
                {
                    //Nhiều hơn 1 ngoại ngữ
                    if (trinhdongoaingu.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < trinhdongoaingu.Split('=').ToList().Count; i++)
                        {
                            LanguagesSkills lgSkill = new LanguagesSkills();
                            lgSkill.ID_Employee = emp.ID;
                            lgSkill.Name = trinhdongoaingu.Split('=')[i].Split('_')[0];
                            lgSkill.listening = trinhdongoaingu.Split('=')[i].Split('_')[1];
                            lgSkill.Speaking = trinhdongoaingu.Split('=')[i].Split('_')[2];
                            lgSkill.Reading = trinhdongoaingu.Split('=')[i].Split('_')[3];
                            lgSkill.Writing = trinhdongoaingu.Split('=')[i].Split('_')[4];

                            model.LanguagesSkills.Add(lgSkill);
                            model.SaveChanges();
                        }
                    }
                    //Chỉ có 1 ngoại ngữ
                    else
                    {
                        LanguagesSkills lgSkill = new LanguagesSkills();
                        lgSkill.ID_Employee = emp.ID;
                        lgSkill.Name = trinhdongoaingu.Split('_')[0];
                        lgSkill.listening = trinhdongoaingu.Split('_')[0];
                        lgSkill.Speaking = trinhdongoaingu.Split('_')[1];
                        lgSkill.Reading = trinhdongoaingu.Split('_')[2];
                        lgSkill.Writing = trinhdongoaingu.Split('_')[3];

                        model.LanguagesSkills.Add(lgSkill);
                        model.SaveChanges();
                    }
                }

                //Phụ thuộc Nhân thân
                if (!string.IsNullOrEmpty(phuthuocnhanthan))
                {
                    //Nhiều hơn 1 nhân thân
                    if (phuthuocnhanthan.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < phuthuocnhanthan.Split('=').ToList().Count; i++)
                        {
                            DependentsInformation depen = new DependentsInformation();
                            depen.ID_Employee = emp.ID;
                            depen.Name = phuthuocnhanthan.Split('=')[i].Split('_')[0];
                            depen.Relationship = phuthuocnhanthan.Split('=')[i].Split('_')[1];
                            depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('=')[i].Split('_')[2]);

                            model.DependentsInformation.Add(depen);
                            model.SaveChanges();
                        }
                    }
                    //Chỉ có 1 nhân thân
                    else
                    {
                        DependentsInformation depen = new DependentsInformation();
                        depen.ID_Employee = emp.ID;
                        depen.Name = phuthuocnhanthan.Split('_')[0];
                        depen.Relationship = phuthuocnhanthan.Split('_')[1];
                        depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('_')[2]);

                        model.DependentsInformation.Add(depen);
                        model.SaveChanges();
                    }
                }

                //Trợ cấp & phụ cấp
                if (!string.IsNullOrEmpty(trocap))
                {
                    if (trocap.IndexOf("_") != -1)
                    {
                        for (int i = 0; i < trocap.Split('_').ToList().Count; i++)
                        {
                            Subsidies subs = new Subsidies();
                            subs.ID_Employee = emp.ID;
                            subs.ID_SubsidiesCategory = Int32.Parse(trocap.Split('_')[i]);
                            model.Subsidies.Add(subs);
                            model.SaveChanges();
                        }
                    }
                    else
                    {
                        Subsidies subs = new Subsidies();
                        subs.ID_Employee = emp.ID;
                        subs.ID_SubsidiesCategory = Int32.Parse(trocap);
                        model.Subsidies.Add(subs);
                        model.SaveChanges();
                    }
                }
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại");
            }

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
            string diachiemails, string gioitinhs, string diachinhas, string vaitros, string mucluongs,
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
                    user.TelephoneMobile = sodienthoais;
                    user.Birthday = Convert.ToDateTime(ngaysinhs);
                    user.Sex = gioitinhs;
                    user.Address = diachinhas;
                    user.ID_Position = Int32.Parse(vaitros);

                    if (string.IsNullOrEmpty(mucluongs))
                        user.Wage = 0;
                    else
                        user.Wage = Convert.ToDecimal(mucluongs.Replace(",", ""));

                    user.BankName = dsNganHangs;
                    user.BankAccountNumber = sotaikhoans;
                    user.BankAccountHolderName = chutaikhoans;
                    user.WorkEmail = diachiemails;
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
        public ActionResult duAnThamGiaPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_duAnThamGiaPartial", user);
        }
        public ActionResult lichSuHoatDongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_lichSuHoatDongPartial", user);
        }
        public ActionResult bangLuongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_bangLuongPartial", user);
        }
        public ActionResult lichBieuPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_lichBieuPartial", user);
        }
        public ActionResult baoCaoThongKePartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_baoCaoThongKePartial", user);
        }

    }
}