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
    public class QuanLyDuAnController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        private static string ApiKey = "AIzaSyDvSOwmXoeKhIDNe37d17uvGDvK5TTepkc";
        private static string Bucket = "it-global-project.appspot.com";
        private static string AuthEmail = "itglobalStorage@gmail.com";
        private static string AuthPassword = "itglobalStorage123";

        // GET: Admins/QuanLyDuAn
        public ActionResult danhSachDuAn()
        {
            var lstPro = model.Projects.ToList().OrderByDescending(p => p.ID);
            ViewBag.ShowActive = "danhSachDuAn";
            return View(lstPro);
        }
        public ActionResult taoDuAnMoi()
        {
            var khachhang = model.Partners.ToList().OrderByDescending(k => k.ID);
            ViewBag.ShowActive = "taoDuAnMoi";
            return View(khachhang);
        }
        [HttpPost]
        public async Task<ActionResult> taoDuAnMoi(HttpPostedFileBase avatar, string name, string mota, string batdau, string ketthuc,
            string giaidoan, string chiphi, string namedn, string hoten, string cmnd, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha, int? id)
        {
            var khachHangCu = model.Partners.Where(p => p.ID == id).ToList();
            if (id == null || khachHangCu.Count == 0)
            {
                Partners kh = new Partners();
                kh.Company = namedn.Trim();
                kh.Name = hoten.Trim();
                kh.IdentityCard = cmnd.Trim();
                kh.Phone = phone.Trim();
                kh.Email = email.Trim();
                kh.Birthday = Convert.ToDateTime(ngaysinh);
                kh.Sex = gioitinh.Trim();
                kh.Address = diahchinha.Trim();

                FileStream stream;
                if (avatar != null)
                {
                    if (avatar.ContentLength > 0)
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

                        string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + avatar.FileName); ;
                        avatar.SaveAs(path);
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
                            .Child(sb.ToString().Trim() + avatar.FileName)
                            .PutAsync(stream, cancellation.Token);
                        try
                        {
                            string link = await task;
                            kh.Avatar = link;
                            System.IO.File.Delete(path);
                        }
                        catch (Exception e)
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }

                model.Partners.Add(kh);
                model.SaveChanges();

                model = new CP25Team06Entities();
                Projects pro = new Projects();
                pro.Name = name;
                pro.Description = mota;
                pro.StartDate = Convert.ToDateTime(batdau);
                pro.EndDate = Convert.ToDateTime(ketthuc);
                pro.ID_Partner = kh.ID;
                model.Projects.Add(pro);
                model.SaveChanges();

                model = new CP25Team06Entities();
                int sogiaidoan = giaidoan.Split('_').ToList().Count;

                for (int i = 1; i <= sogiaidoan; i++)
                {
                    Debts deb = new Debts();
                    deb.Stage = "Giai đoạn " + i;
                    deb.Price = Convert.ToDecimal(chiphi.Split('_')[i - 1].Replace(",", ""));
                    deb.Date = Convert.ToDateTime(giaidoan.Split('_')[i - 1]);
                    deb.State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();
                }

                return Content(pro.ID.ToString());
            }
            else
            {
                model = new CP25Team06Entities();
                Projects pro = new Projects();
                pro.Name = name;
                pro.Description = mota;
                pro.StartDate = Convert.ToDateTime(batdau);
                pro.EndDate = Convert.ToDateTime(ketthuc);
                pro.ID_Partner = (int)id;
                model.Projects.Add(pro);
                model.SaveChanges();

                model = new CP25Team06Entities();
                int sogiaidoan = giaidoan.Split('_').ToList().Count;

                for (int i = 1; i <= sogiaidoan; i++)
                {
                    Debts deb = new Debts();
                    deb.Stage = "Giai đoạn " + i;
                    deb.Price = Convert.ToDecimal(chiphi.Split('_')[i - 1].Replace(",", ""));
                    deb.Date = Convert.ToDateTime(giaidoan.Split('_')[i - 1]);
                    deb.State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();
                }
                return Content(pro.ID.ToString());
            }
        }

        [HttpPost]
        public async Task<ActionResult> chinhSuaDuAn(HttpPostedFileBase avatar, string name, string mota, string batdau, string ketthuc,
            string giaidoan, string chiphi, string namedn, string hoten, string cmnd, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha, int idduan, int idkh)
        {
            var khachHang = model.Partners.FirstOrDefault(p => p.ID == idkh);
            var duAn = model.Projects.FirstOrDefault(p => p.ID == idduan);
            if (khachHang == null || duAn == null)
                return Content("DANHSACH");

            khachHang.Company = namedn.Trim();
            khachHang.Name = hoten.Trim();
            khachHang.IdentityCard = cmnd.Trim();
            khachHang.Phone = phone.Trim();
            khachHang.Email = email.Trim();
            khachHang.Birthday = Convert.ToDateTime(ngaysinh);
            khachHang.Sex = gioitinh.Trim();
            khachHang.Address = diahchinha.Trim();
            FileStream stream;
            if (avatar != null)
            {
                if (avatar.ContentLength > 0)
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

                    string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + avatar.FileName); ;
                    avatar.SaveAs(path);
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
                        .Child(sb.ToString().Trim() + avatar.FileName)
                        .PutAsync(stream, cancellation.Token);
                    try
                    {
                        string link = await task;
                        khachHang.Avatar = link;
                        System.IO.File.Delete(path);
                    }
                    catch
                    {
                        return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                    }
                }
            }

            model.Entry(khachHang).State = EntityState.Modified;
            model.SaveChanges();

            duAn.Name = name;
            duAn.Description = mota;
            duAn.StartDate = Convert.ToDateTime(batdau);
            duAn.EndDate = Convert.ToDateTime(ketthuc);
            model.Entry(duAn).State = EntityState.Modified;
            model.SaveChanges();

            //giai đoạn hiện tại
            int sogiaidoan = giaidoan.Split('_').ToList().Count;

            //giai đoạn trước đó
            var lstgiaidoan = model.Debts.Where(d => d.ID_Project == idduan).OrderBy(d => d.ID).ToList();

            //Giai đoạn hiện tại bé hơn giai đoạn trước đó
            if (sogiaidoan < lstgiaidoan.Count)
            {
                for (int i = 0; i < lstgiaidoan.Count; i++)
                {
                    if (i < sogiaidoan)
                    {
                        lstgiaidoan[i].Price = Convert.ToDecimal(chiphi.Split('_')[i].Replace(",", ""));
                        lstgiaidoan[i].Date = Convert.ToDateTime(giaidoan.Split('_')[i]);
                        model.Entry(lstgiaidoan[i]).State = EntityState.Modified;
                    }
                    else
                    {
                        model.Debts.Remove(lstgiaidoan[i]);
                    }
                }
            }
            //Giai đoạn hiện tại bằng giai đoạn trước đó
            else if (sogiaidoan == lstgiaidoan.Count)
            {
                for (int i = 0; i < lstgiaidoan.Count; i++)
                {
                    lstgiaidoan[i].Price = Convert.ToDecimal(chiphi.Split('_')[i].Replace(",", ""));
                    lstgiaidoan[i].Date = Convert.ToDateTime(giaidoan.Split('_')[i]);
                    model.Entry(lstgiaidoan[i]).State = EntityState.Modified;
                }
            }
            //Giai đoạn hiện tại lớn hơn giai đoạn trước đó
            else if (sogiaidoan > lstgiaidoan.Count)
            {
                for (int i = 0; i < sogiaidoan; i++)
                {
                    if (i < lstgiaidoan.Count)
                    {
                        lstgiaidoan[i].Price = Convert.ToDecimal(chiphi.Split('_')[i].Replace(",", ""));
                        lstgiaidoan[i].Date = Convert.ToDateTime(giaidoan.Split('_')[i]);
                        model.Entry(lstgiaidoan[i]).State = EntityState.Modified;
                    }
                    else
                    {
                        Debts debt = new Debts();
                        debt.ID_Project = idduan;
                        debt.Stage = "Giai đoạn " + (i + 1);
                        debt.Price = Convert.ToDecimal(chiphi.Split('_')[i].Replace(",", ""));
                        debt.Date = Convert.ToDateTime(giaidoan.Split('_')[i]);
                        debt.State = false;
                        model.Debts.Add(debt);
                        model.SaveChanges();
                    }
                }
            }
            model.SaveChanges();
            model = new CP25Team06Entities();
            return PartialView("_tongQuanPartial", duAn);
        }

        public ActionResult chiTietDuAn(int? id)
        {
            var pro = model.Projects.FirstOrDefault(p => p.ID == id);
            if (id == null || pro == null)
                return RedirectToAction("danhSachDuAn");

            var lichsu = model.Histories.Where(l => l.Tasks.ID_Project == id).OrderByDescending(o => o.Date).ToList();
            Session["lst-lichSuDuAn"] = lichsu;
            ViewBag.ShowActive = "danhSachDuAn";
            return View(pro);
        }
        public ActionResult tongQuanPartial(int? id)
        {
            var pro = model.Projects.FirstOrDefault(p => p.ID == id);
            if (id == null || pro == null)
                return RedirectToAction("danhSachDuAn");

            var lichsu = model.Histories.Where(l => l.Tasks.ID_Project == id).OrderByDescending(o => o.Date).ToList();
            Session["lst-lichSuDuAn"] = lichsu;
            ViewBag.ShowActive = "danhSachDuAn";
            return PartialView("_tongQuanPartial", pro);
        }
        public ActionResult congViecPartial(int? id)
        {
            var pro = model.Projects.FirstOrDefault(p => p.ID == id);
            if (id == null || pro == null)
                return Content("DANHSACH");

            Session["lst-Task"] = model.Tasks.Where(t => t.ID_Project == id).OrderBy(t => t.ID).ToList();
            return PartialView("_congViecPartial");
        }
        public ActionResult nganSachPartial(int? id)
        {
            return PartialView("_nganSachPartial");
        }
        public ActionResult taiLieuPartial(int? id)
        {
            return PartialView("_taiLieuPartial");
        }
        public ActionResult doiNguPartial(int? id)
        {
            return PartialView("_doiNguPartial");
        }
    }
}
