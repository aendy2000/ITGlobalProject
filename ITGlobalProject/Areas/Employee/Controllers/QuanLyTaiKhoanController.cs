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
    public class QuanLyTaiKhoanController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Employee/QuanLyTaiKhoan
        public ActionResult DangXuat()
        {
            Session.Clear();
            return RedirectToAction("DangNhap", "QuanLyTaiKhoan", new { area = "Admins" });
        }
        public ActionResult QuenMatKhau()
        {
            return View();
        }


        [HttpPost]
        public ActionResult luaChonBoPhan(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            var bophan = model.Department.Find(id);
            bophan.Position.Remove(model.Position.Find(1));

            return PartialView("_danhSachChucDanhTheoBoPhan_ThemNhanVien", bophan.Position.ToList());
        }

        public ActionResult thongTinChiTiet(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return View("thongTinChiTiet", user);
            }
            return RedirectToAction("danhSachNhanVien", "QuanLyNhanSu");
        }
        public ActionResult thongTinChiTietPartial(int? id)
        {
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
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
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (!user.WorkEmail.ToLower().Equals(diachiemailcongty.ToLower().Trim()))
            {
                var checkExits = model.Employees.FirstOrDefault(e => e.WorkEmail.ToLower().Equals(diachiemailcongty.ToLower().Trim()));
                if (checkExits != null)
                    return Content("EXITS");
            }

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
            if (id == null || Session["user-id"] == null)
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
            if (id == null || user == null || Session["user-id"] == null)
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
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
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
            if (id == null || user == null || Session["user-id"] == null)
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
                        perSkill.ID_Skills = idPerSkills;
                        model.PersonalSkills.Add(perSkill);
                    }
                }
                else
                {
                    int idPerSkills = Int32.Parse(kynang);

                    PersonalSkills perSkill = new PersonalSkills();
                    perSkill.ID_Employee = user.ID;
                    perSkill.ID_Skills = idPerSkills;
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
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
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
            if (id == null || user == null || Session["user-id"] == null)
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
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
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
            if (id == null || user == null || Session["user-id"] == null)
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
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
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
            if (id == null || user == null || Session["user-id"] == null)
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
            if (id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            ViewBag.ShowActive = "TTChiTiet";
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user != null)
            {
                return PartialView("_hopDongPartial", user);
            }
            return Content("DANHSACH");
        }

        [HttpPost]
        public ActionResult chinhSuaViecLamHopDong(int? id, string ngayvaolam, int? vaitro, string hinhthuc)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (id == null || user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (!string.IsNullOrEmpty(ngayvaolam) && vaitro != null && !string.IsNullOrEmpty(hinhthuc))
            {
                user.JoinedDate = Convert.ToDateTime(ngayvaolam);
                user.ID_Position = (int)vaitro;
                user.EmploymentStatus = hinhthuc;

                model.Entry(user).State = EntityState.Modified;
                model.SaveChanges();
                model = new CP25Team06Entities();
                return PartialView("_hopDongPartial", model.Employees.FirstOrDefault(u => u.ID == user.ID));
            }
            return Content("DANHSACH");
        }
        public ActionResult duAnThamGiaPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == user.ID).ID_Employee == user.ID).ToList();
            return PartialView("_duAnThamGiaPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemDuAnThamGia(string contents, int? idus)
        {
            if (idus == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (string.IsNullOrEmpty(contents.Trim()))
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus).ToList();
            else
                Session["lst-duanthamgia-detailemployee"] = model.Projects.Where(p => p.Teams.FirstOrDefault(t => t.ID_Employee == idus).ID_Employee == idus && p.Name.ToLower().Trim().Contains(contents.ToLower().Trim())).ToList();

            return PartialView("_duAnThamGiaSearch");
        }
        public ActionResult lichSuHoatDongPartial(int? id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
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
            if (idus == null || string.IsNullOrEmpty(date) || Session["user-id"] == null)
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
            if (user == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");
            var currentYear = DateTime.Now.Year;

            Session["bang-luong-emp"] = model.PayrollCategory.Where(p => p.Date.Year == currentYear).ToList();
            return PartialView("_bangLuongPartial", user);
        }
        [HttpPost]
        public ActionResult timKiemBangLuongPartial(int? id, int nam)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["bang-luong-emp"] = model.PayrollCategory.Where(p => p.Date.Year == nam).ToList();
            return PartialView("_timkiembangluong", user);
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
            if (user == null || string.IsNullOrEmpty(state) || Session["user-id"] == null)
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
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["thongke-Task"] = model.Tasks.Where(t => t.ID_Employee == id).ToList();
            return PartialView("_baoCaoThongKePartial", user);
        }

        public ActionResult donNghiPhep(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepPartial", user);
        }
        [HttpPost]

        public ActionResult danhSachDonNghiPhepPartial(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate == null).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult danhSachDonNghiPhepDaDuyet(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == true).OrderByDescending(o => o.ID).ToList();
            Session["TuChoiTabDonNghiPhep"] = null;
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        [HttpPost]
        public ActionResult danhSachDonNghiPhepDaTuChoi(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["TuChoiTabDonNghiPhep"] = true;
            Session["dsdonnghiphep"] = user.LeaveApplication.Where(l => l.State == false && l.ResponsiveDate != null).OrderByDescending(o => o.ID).ToList();
            return PartialView("_donNghiPhepChangeTabPartial", user);
        }

        public ActionResult danhMucNgayPhep(int id)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["lst-danhmucngayphep-all"] = model.LeaveDate.ToList();
            Session["lst-danhmucngayphep"] = model.LeaveDate.Where(l => l.OnLeave.Where(onl => onl.ID_Employee == id).Count() > 0).ToList();
            return PartialView("_danhMucNghiPhepPartial", user);
        }

        [HttpPost]
        public ActionResult danhMucNgayPhep(int id, string lstngayphep)
        {
            var user = model.Employees.FirstOrDefault(u => u.ID == id);
            if (user == null || Session["user-id"] == null)
                return Content("DANHSACH");

            model.OnLeave.RemoveRange(user.OnLeave);
            model.SaveChanges();

            if (!string.IsNullOrEmpty(lstngayphep))
            {
                foreach (var item in lstngayphep.Split('-').ToList())
                {
                    OnLeave onleave = new OnLeave();
                    onleave.ID_LeaveDate = Int32.Parse(item);
                    onleave.ID_Employee = user.ID;
                    model.OnLeave.Add(onleave);
                    model.SaveChanges();
                }
            }

            return Content("success");
        }
        public ActionResult doiMatKhauPartial(int? id)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    return PartialView("_doiMatKhauPartial", infor);
                }
            }
            return Content("TRANGCHU");
        }
        [HttpPost]
        public ActionResult doiMatKhauPartial(int? id, string password, string newpassword)
        {
            if (id != null)
            {
                var infor = model.Employees.FirstOrDefault(i => i.ID == id);
                if (infor != null)
                {
                    if (infor.Password.Equals(password))
                    {
                        infor.Password = newpassword;
                        model.Entry(infor).State = EntityState.Modified;
                        model.SaveChanges();
                        model = new CP25Team06Entities();
                        return PartialView("_doiMatKhauPartial", infor);
                    }
                    return Content("PASSSAI");
                }
            }
            return Content("TRANGCHU");
        }
    }
}