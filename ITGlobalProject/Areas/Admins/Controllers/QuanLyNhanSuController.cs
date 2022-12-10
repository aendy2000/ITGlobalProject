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
    [AdminLoginVerification]
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

            var department = model.Department.ToList();
            Session["lst-department"] = department;
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
            return View("danhSachNhanVien", employee.ToPagedList((int)page, (int)pageSize));
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
        string cmnd, string quoctich, string honnhan, string ngaysinh, string gioitinh,
        string sodienthoaididong, string sodienthoaikhac, string diachiemailcongty, string diachiemailkhac,
        string diachinha, string mucluong, string dsNganHang, string sotaikhoan, string chutaikhoan, string kynang, string trinhdongoaingu,
        string phuthuocnhanthan, string trocap, string ngayvaolam, int vaitro, string hinhthuc,
        bool captaikhoancheck, string matkhaudangnhap, string loaihopdong, string ngaykyhopdong, string ngaygiahanhopdong)
        {
            try
            {
                Employees emp = new Employees();
                emp.ID_Position = vaitro;
                emp.Name = hoten;
                emp.IdentityCard = cmnd.Replace(" ", "");
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
                emp.Lock = false;
                emp.AccountSatus = captaikhoancheck;

                if (captaikhoancheck == true)
                    emp.Password = matkhaudangnhap;

                model.Employees.Add(emp);
                model.SaveChanges();

                model = new CP25Team06Entities();
                EmploymentContracts employ = new EmploymentContracts();
                employ.ID_Employee = emp.ID;
                employ.StartDate = Convert.ToDateTime(ngaykyhopdong);
                employ.EmploymentCategory = loaihopdong;

                if (loaihopdong.Equals("Hợp đồng có thời hạn"))
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
                        lgSkill.listening = trinhdongoaingu.Split('_')[1];
                        lgSkill.Speaking = trinhdongoaingu.Split('_')[2];
                        lgSkill.Reading = trinhdongoaingu.Split('_')[3];
                        lgSkill.Writing = trinhdongoaingu.Split('_')[4];

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
        public ActionResult luaChonBoPhan(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            var bophan = model.Department.Find(id);
            bophan.Position.Remove(model.Position.Find(1));

            return PartialView("_danhSachChucDanhTheoBoPhan_ThemNhanVien", bophan.Position.ToList());
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
                var employees = employee.Where(e => (e.Name.ToLower().Contains(noidungs.ToLower().Trim()) || e.WorkEmail.ToLower().Contains(noidungs.ToLower().Trim()) || e.IdentityCard.ToLower().Contains(noidungs.ToLower().Trim())) && e.ID_Position != 1).OrderByDescending(o => o.ID).ToList();
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
                return View("thongTinChiTiet", user);
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
        [HttpPost]
        public async Task<ActionResult> chinhSuaThongTinCaNhan(HttpPostedFileBase AvatarImg, int? id, string hoten, string cmnd,
        string quoctich, string honnhan, string ngaysinh, string gioitinh, string diachinha, string avatars, string sodienthoaididong,
        string sodienthoaikhac, string diachiemailcongty, string diachiemailkhac)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

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
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại!");
                        }
                    }
                }
                else
                {
                    user.Avatar = avatars;
                }

                user.Name = hoten.Trim();
                user.IdentityCard = cmnd.Replace(" ", "");
                user.Nationality = quoctich;
                user.MaritalStatus = honnhan;
                user.Birthday = Convert.ToDateTime(ngaysinh);
                user.Sex = gioitinh;
                user.Address = diachinha;
                user.TelephoneMobile = sodienthoaididong;
                user.TelephoneOrther = sodienthoaikhac;
                user.WorkEmail = diachiemailcongty;
                user.OrtherEmail = diachiemailkhac;

                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                return PartialView("_thongTinChiTietPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            catch
            {
                return Content("Đã có xảy ra lỗi, vui lòng thử lại!");
            }
        }

        public ActionResult lienHeVaThanhToanPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_lienHeVaThanhToanPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult chinhSuaLienHeVaThanhToan(int? id,
        string mucluong, string dsNganHang, string sotaikhoan, string chutaikhoan)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");


            user.Wage = Convert.ToDecimal(mucluong.Replace(",", ""));
            user.BankName = dsNganHang;
            user.BankAccountNumber = sotaikhoan;
            user.BankAccountHolderName = chutaikhoan.ToUpper();

            model.Entry(user).State = EntityState.Modified;
            model.SaveChanges();
            return PartialView("_lienHeVaThanhToanPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult kyNangChuyenMonPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var kynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
                Session["lst-kynang"] = kynang;
                return PartialView("_kyNangChuyenMonPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult chinhSuaKyNangChuyenMon(int? id, string kynang)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

            model.PersonalSkills.RemoveRange(user.PersonalSkills);
            model.SaveChanges();
            //Kỹ năng
            if (!string.IsNullOrEmpty(kynang))
            {
                if (kynang.IndexOf("_") != -1)
                {
                    for (int i = 0; i < kynang.Split('_').ToList().Count; i++)
                    {
                        int idPerSkills = Int32.Parse(kynang.Split('_')[i]);

                        PersonalSkills perSkill = new PersonalSkills();
                        perSkill.ID_Employee = user.ID;
                        perSkill.ID_SkillsCategory = idPerSkills;
                        model.PersonalSkills.Add(perSkill);
                    }
                }
                else
                {
                    int idPerSkills = Int32.Parse(kynang);

                    PersonalSkills perSkill = new PersonalSkills();
                    perSkill.ID_Employee = user.ID;
                    perSkill.ID_SkillsCategory = idPerSkills;
                    model.PersonalSkills.Add(perSkill);
                }
                model.SaveChanges();
            }
            model = new CP25Team06Entities();
            var lstkynang = model.SkillsCategory.OrderBy(k => k.Name).ToList();
            Session["lst-kynang"] = lstkynang;
            return PartialView("_kyNangChuyenMonPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult trinhDoNgoaiNguPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstNgoaiNgu = model.LanguagesSkills.Where(l => l.ID_Employee == user.ID).ToList();
                Session["lst-ngoaingu"] = lstNgoaiNgu;
                return PartialView("_trinhDoNgoaiNguPartial", user);
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult chinhSuatrinhDoNgoaiNgu(int? id, string trinhdongoaingu)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

            //Ngoại ngữ
            model.LanguagesSkills.RemoveRange(user.LanguagesSkills);
            model.SaveChanges();
            if (!string.IsNullOrEmpty(trinhdongoaingu))
            {
                //Nhiều hơn 1 ngoại ngữ
                if (trinhdongoaingu.IndexOf("=") != -1)
                {
                    for (int i = 0; i < trinhdongoaingu.Split('=').ToList().Count; i++)
                    {
                        LanguagesSkills lgSkill = new LanguagesSkills();
                        lgSkill.ID_Employee = user.ID;
                        lgSkill.Name = trinhdongoaingu.Split('=')[i].Split('_')[0];
                        lgSkill.listening = trinhdongoaingu.Split('=')[i].Split('_')[1];
                        lgSkill.Speaking = trinhdongoaingu.Split('=')[i].Split('_')[2];
                        lgSkill.Reading = trinhdongoaingu.Split('=')[i].Split('_')[3];
                        lgSkill.Writing = trinhdongoaingu.Split('=')[i].Split('_')[4];

                        model.LanguagesSkills.Add(lgSkill);
                    }
                }
                //Chỉ có 1 ngoại ngữ
                else
                {
                    LanguagesSkills lgSkill = new LanguagesSkills();
                    lgSkill.ID_Employee = user.ID;
                    lgSkill.Name = trinhdongoaingu.Split('_')[0];
                    lgSkill.listening = trinhdongoaingu.Split('_')[1];
                    lgSkill.Speaking = trinhdongoaingu.Split('_')[2];
                    lgSkill.Reading = trinhdongoaingu.Split('_')[3];
                    lgSkill.Writing = trinhdongoaingu.Split('_')[3];

                    model.LanguagesSkills.Add(lgSkill);
                }
                model.SaveChanges();
            }
            model = new CP25Team06Entities();
            var lstNgoaiNgu = model.LanguagesSkills.Where(l => l.ID_Employee == user.ID).ToList();
            Session["lst-ngoaingu"] = lstNgoaiNgu;
            return PartialView("_trinhDoNgoaiNguPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }

        public ActionResult phuThuocNhanThanPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstNhanThan = model.DependentsInformation.Where(l => l.ID_Employee == user.ID).ToList();
                Session["lst-nhanthan"] = lstNhanThan;
                return PartialView("_phuThuocNhanThanPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaPhuThuocNhanThan(int? id, string phuthuocnhanthan)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

            //Nhân Thân
            model.DependentsInformation.RemoveRange(user.DependentsInformation);
            model.SaveChanges();
            if (!string.IsNullOrEmpty(phuthuocnhanthan))
            {
                //Phụ thuộc Nhân thân
                if (!string.IsNullOrEmpty(phuthuocnhanthan))
                {
                    //Nhiều hơn 1 nhân thân
                    if (phuthuocnhanthan.IndexOf("=") != -1)
                    {
                        for (int i = 0; i < phuthuocnhanthan.Split('=').ToList().Count; i++)
                        {
                            DependentsInformation depen = new DependentsInformation();
                            depen.ID_Employee = user.ID;
                            depen.Name = phuthuocnhanthan.Split('=')[i].Split('_')[0];
                            depen.Relationship = phuthuocnhanthan.Split('=')[i].Split('_')[1];
                            depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('=')[i].Split('_')[2]);

                            model.DependentsInformation.Add(depen);
                        }
                    }
                    //Chỉ có 1 nhân thân
                    else
                    {
                        DependentsInformation depen = new DependentsInformation();
                        depen.ID_Employee = user.ID;
                        depen.Name = phuthuocnhanthan.Split('_')[0];
                        depen.Relationship = phuthuocnhanthan.Split('_')[1];
                        depen.Birthday = Convert.ToDateTime(phuthuocnhanthan.Split('_')[2]);

                        model.DependentsInformation.Add(depen);
                    }
                    model.SaveChanges();

                }
            }
            model = new CP25Team06Entities();
            var lstNhanThan = model.DependentsInformation.Where(l => l.ID_Employee == user.ID).ToList();
            Session["lst-nhanthan"] = lstNhanThan;
            return PartialView("_phuThuocNhanThanPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        public ActionResult troCapPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                var lstTroCap = model.SubsidiesCategory.OrderBy(t => t.Name).ToList();
                Session["lst-trocap"] = lstTroCap;
                return PartialView("_troCapPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaTroCap(int? id, string trocap)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

            model.Subsidies.RemoveRange(user.Subsidies);
            model.SaveChanges();
            //Trợ cấp & phụ cấp
            if (!string.IsNullOrEmpty(trocap))
            {
                if (trocap.IndexOf("_") != -1)
                {
                    for (int i = 0; i < trocap.Split('_').ToList().Count; i++)
                    {
                        Subsidies subs = new Subsidies();
                        subs.ID_Employee = user.ID;
                        subs.ID_SubsidiesCategory = Int32.Parse(trocap.Split('_')[i]);
                        model.Subsidies.Add(subs);
                    }
                }
                else
                {
                    Subsidies subs = new Subsidies();
                    subs.ID_Employee = user.ID;
                    subs.ID_SubsidiesCategory = Int32.Parse(trocap);
                    model.Subsidies.Add(subs);
                }

                model.SaveChanges();

            }
            model = new CP25Team06Entities();
            var lstTroCap = model.SubsidiesCategory.OrderBy(t => t.Name).ToList();
            Session["lst-trocap"] = lstTroCap;
            return PartialView("_troCapPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        public ActionResult hopDongPartial(int? id)
        {
            if (id == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "danhSachNhanVien";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_hopDongPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaViecLamHopDong(int? id, string ngayvaolam, int? vaitro, string hinhthuc, bool captaikhoancheck, string matkhaudangnhap)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null)
                return Content("DANHSACH");

            if (!string.IsNullOrEmpty(ngayvaolam) && vaitro != null && !string.IsNullOrEmpty(hinhthuc))
            {
                user.JoinedDate = Convert.ToDateTime(ngayvaolam);
                user.ID_Position = (int)vaitro;
                user.EmploymentStatus = hinhthuc;
                user.AccountSatus = captaikhoancheck;

                if (captaikhoancheck == true && !string.IsNullOrEmpty(matkhaudangnhap.Trim()))
                    user.Password = matkhaudangnhap;

                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                model = new CP25Team06Entities();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public async Task<ActionResult> themHopDongMoi(HttpPostedFileBase anhHopDong, string ngaykyhopdong, string ngaygiahanhopdong, int id, string loaihopdong)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                EmploymentContracts emp = new EmploymentContracts();
                emp.ID_Employee = user.ID;
                emp.StartDate = Convert.ToDateTime(ngaykyhopdong);
                emp.EmploymentCategory = loaihopdong;
                if (loaihopdong.Equals("Hợp đồng có thời hạn"))
                    emp.EndDate = Convert.ToDateTime(ngaygiahanhopdong);

                FileStream stream;
                if (anhHopDong != null)
                {
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
                            emp.ImageURL = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }
                model.EmploymentContracts.Add(emp);
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }
        [HttpPost]
        public ActionResult xoaHopDong(int? id, int? idus)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (idus == null || user == null || idus == null)
                return Content("DANHSACH");

            model.EmploymentContracts.Remove(user.EmploymentContracts.FirstOrDefault(h => h.ID == id));
            model.SaveChanges();
            model = new CP25Team06Entities();
            Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
            return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
        }
        [HttpPost]
        public async Task<ActionResult> suaHopDong(HttpPostedFileBase anhHopDong, string ngaykyhopdong, string ngaygiahanhopdong, int id, int idus, string loaihopdong)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (user != null)
            {
                var emp = user.EmploymentContracts.FirstOrDefault(h => h.ID == id);
                emp.StartDate = Convert.ToDateTime(ngaykyhopdong);
                emp.EmploymentCategory = loaihopdong;
                if (loaihopdong.Equals("Hợp đồng có thời hạn"))
                    emp.EndDate = Convert.ToDateTime(ngaygiahanhopdong);
                else
                    emp.EndDate = null;

                FileStream stream;
                if (anhHopDong != null)
                {
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
                            emp.ImageURL = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }

                model.Entry(emp).State = EntityState.Modified;
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-role"] = model.Position.Where(p => p.ID != 1).OrderBy(o => o.Name).ToList();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult khoaTaiKhoan(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id != null && user != null)
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
            if (user == null)
                return Content("DANHSACH");

            Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == user.ID).ID_Employee == user.ID).ToList();
            return PartialView("_duAnThamGiaPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemDuAnThamGia(string contents, int? idus)
        {
            if (idus == null)
                return Content("DANHSACH");

            if (string.IsNullOrEmpty(contents.Trim()))
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus).ToList();
            else
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus && p.Name.ToLower().Trim().Equals(contents.ToLower().Trim())).ToList();

            return PartialView("_duAnThamGiaSearch");
        }
        public ActionResult lichSuHoatDongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null)
                return Content("DANHSACH");

            string date = DateTime.Now.Year + "-W" + (new CultureInfo("vi-VN").Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday) - 1);

            DateTime jan1 = new DateTime(Int32.Parse(date.Split('-')[0]), 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = Int32.Parse(date.Split('-')[1].Replace("W", ""));
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);
            result = result.AddDays(-3);
            var lastResult = result.AddDays(6);

            Session["lichSuHoatDong-lstHistory"] = model.Histories.Where(h => h.ID_Employee == id && h.Date >= result && h.Date <= lastResult).ToList();
            Session["lichSuHoatDong-date"] = date;
            return PartialView("_lichSuHoatDongPartial", user);
        }
        public ActionResult timKiemLichSuHoatDong(int? idus, string date)
        {
            if (idus == null || string.IsNullOrEmpty(date))
                return Content("DANHSACH");

            DateTime jan1 = new DateTime(Int32.Parse(date.Split('-')[0]), 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = Int32.Parse(date.Split('-')[1].Replace("W", ""));
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);
            result = result.AddDays(-3);
            var lastResult = result.AddDays(6);

            Session["lichSuHoatDong-lstHistory"] = model.Histories.Where(h => h.ID_Employee == idus && h.Date >= result && h.Date <= lastResult).ToList(); Session["lichSuHoatDong-date"] = date;
            return PartialView("_lichSuHoatDongSearch");
        }
        public ActionResult bangLuongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);

            return PartialView("_bangLuongPartial", user);
        }
        public ActionResult lichBieuPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null)
                return Content("DANHSACH");

            Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == id).OrderByDescending(o => o.ID).ToList();
            return PartialView("_lichBieuPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemLichBieu(string state, int? idus)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == idus);
            if (user == null || string.IsNullOrEmpty(state))
                return Content("DANHSACH");

            if (state.Equals("all"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("chualam"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("do")).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("danglam"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("progress")).OrderByDescending(o => o.ID).ToList();

            else if (state.Equals("danop"))
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("review")).OrderByDescending(o => o.ID).ToList();

            else
                Session["tienDoCongViec-lstTask"] = model.Tasks.Where(t => t.ID_Employee == idus && t.State.Equals("done")).OrderByDescending(o => o.ID).ToList();

            return PartialView("_lichBieuSearch");
        }
        public ActionResult baoCaoThongKePartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null)
                return Content("DANHSACH");

            Session["thongke-Task"] = model.Tasks.Where(t => t.ID_Employee == id).ToList();
            return PartialView("_baoCaoThongKePartial", user);
        }

    }
}