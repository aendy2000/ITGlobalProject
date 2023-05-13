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
        public async Task<ActionResult> taoDuAnMoi(HttpPostedFileBase hopdong, string name, string mota, string batdau, string ketthuc,
            string giaidoan, string chiphi, string namedn, string hotennguoidaidien, string hoten, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha, string loaidoitac,
            string masothue, string website, string id)
        {
            if (string.IsNullOrEmpty(id) || Session["user-id"] == null)
            {
                List<int> idParts = new List<int>(); //danh sách mã của khách hsql
                int soluong = email.Split('#').Count();
                var lstphone = phone.Split('#').ToList();
                var lstemail = email.Split('#').ToList();
                var lstngaysinh = ngaysinh.Split('#').ToList();
                var lstgioitinh = gioitinh.Split('#').ToList();
                var lstdiahchinha = diahchinha.Split('#').ToList();
                var lstmasothue = masothue.Split('#').ToList();
                var lstwebsite = website.Split('#').ToList();
                var lstloaidoitac = loaidoitac.Split('#').ToList();
                var lstnamedn = namedn.Split('#').ToList();
                var lsthotennguoidaidien = hotennguoidaidien.Split('#').ToList();
                var lsthoten = hoten.Split('#').ToList();
                int indexchecks = 0;
                foreach (var item in lstemail)
                {
                    indexchecks++;
                    var checkExits = model.Partners.FirstOrDefault(p => p.Email.ToLower().Equals(item.ToLower()));
                    if (checkExits != null)
                    {
                        string text = "";
                        if (checkExits.Email.ToLower().Equals(email.ToLower()))
                        {
                            text += "Địa chỉ Email khách hàng " + indexchecks;
                            return Content(text + " đang được sử dụng bởi một khách hàng khác.");
                        }

                    }
                }

                for (int i = 0; i < soluong; i++)
                {
                    Partners kh = new Partners();
                    if (Convert.ToBoolean(lstloaidoitac[i]) == true)
                    {
                        kh.Company = lstnamedn[i].Trim();
                        kh.Name = lsthotennguoidaidien[i].Trim();
                    }
                    else
                    {
                        kh.Name = lsthoten[i].Trim();
                    }

                    kh.Phone = lstphone[i].Trim();
                    kh.Email = lstemail[i].Trim();
                    kh.Birthday = Convert.ToDateTime(lstngaysinh[i]);
                    kh.Sex = lstgioitinh[i].Trim();
                    kh.Address = lstdiahchinha[i].Trim();
                    kh.TaxCode = lstmasothue[i].Trim();
                    kh.WebUrl = lstwebsite[i].Trim();
                    kh.CompanyOrPersonal = Convert.ToBoolean(lstloaidoitac[i].Trim());
                    kh.AddDate = DateTime.Now;

                    model.Partners.Add(kh);
                    model.SaveChanges();

                    kh.ID_Partners = "KH" + kh.ID.ToString("D8");
                    model.Entry(kh).State = EntityState.Modified;
                    model.SaveChanges();

                    idParts.Add(kh.ID);
                }

                model = new CP25Team06Entities();
                Projects pro = new Projects();
                FileStream streams;
                if (hopdong != null)
                {
                    if (hopdong.ContentLength > 0)
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

                        string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + hopdong.FileName);
                        hopdong.SaveAs(path);
                        streams = new FileStream(Path.Combine(path), FileMode.Open);
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
                            .Child(sb.ToString().Trim() + hopdong.FileName)
                            .PutAsync(streams, cancellation.Token);
                        try
                        {
                            string link = await task;
                            pro.ContractUrl = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }
                pro.Name = name;
                pro.Description = mota;
                pro.StartDate = Convert.ToDateTime(batdau);
                pro.EndDate = Convert.ToDateTime(ketthuc);
                pro.Lock = false;
                model.Projects.Add(pro);
                model.SaveChanges();

                pro.ID_Project = "DA" + pro.ID.ToString("D8");
                model.Entry(pro).State = EntityState.Modified;
                model.SaveChanges();

                foreach (var item in idParts)
                {
                    PartnerOfProject poj = new PartnerOfProject();
                    poj.ID_Partners = item;
                    poj.ID_Project = pro.ID;
                    model.PartnerOfProject.Add(poj);
                }

                model.SaveChanges();
                Histories his = new Histories();
                his.ID_Employee = Convert.ToInt32(Session["user-id"]);
                his.ID_Projects = pro.ID;
                his.Name = "Tạo Dự Án";
                his.Contents = "đã khởi tạo dự án: " + name;
                his.Date = DateTime.Now;
                model.Histories.Add(his);
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
                    deb.Send_Email_State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();

                    PaymentHistory payHis = new PaymentHistory();
                    payHis.ID_Debts = deb.ID;
                    payHis.Date = DateTime.Now;
                    payHis.Price = deb.Price;
                    payHis.Contents = "Thêm khoản thanh toán cho giai đoạn " + i;
                    payHis.Type = true; //True = khoản dương
                    payHis.OnUpdate = true; //Chỉnh sửa chi phí tổng. Không dùng để tính số tiền khách hàng thanh toán

                    model.PaymentHistory.Add(payHis);
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
                pro.Lock = false;

                FileStream streams;
                if (hopdong != null)
                {
                    if (hopdong.ContentLength > 0)
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

                        string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + hopdong.FileName);
                        hopdong.SaveAs(path);
                        streams = new FileStream(Path.Combine(path), FileMode.Open);
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
                            .Child(sb.ToString().Trim() + hopdong.FileName)
                            .PutAsync(streams, cancellation.Token);
                        try
                        {
                            string link = await task;
                            pro.ContractUrl = link;
                            System.IO.File.Delete(path);
                        }
                        catch
                        {
                            return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                        }
                    }
                }

                model.Projects.Add(pro);
                model.SaveChanges();

                pro.ID_Project = "DA" + pro.ID.ToString("D8");
                model.Entry(pro).State = EntityState.Modified;
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
                    deb.Send_Email_State = false;
                    deb.ID_Project = pro.ID;

                    model.Debts.Add(deb);
                    model.SaveChanges();

                    PaymentHistory payHis = new PaymentHistory();
                    payHis.ID_Debts = deb.ID;
                    payHis.Date = DateTime.Now;
                    payHis.Price = deb.Price;
                    payHis.Contents = "Thêm khoản thanh toán cho giai đoạn " + i;
                    payHis.Type = true; //True = khoản dương
                    payHis.OnUpdate = true; //Chỉnh sửa chi phí tổng. Không dùng để tính số tiền khách hàng thanh toán

                    model.PaymentHistory.Add(payHis);
                    model.SaveChanges();
                }

                var idcu = id.Split('#').ToList();
                foreach (var item in idcu)
                {
                    PartnerOfProject partofPro = new PartnerOfProject();
                    partofPro.ID_Project = pro.ID;
                    partofPro.ID_Partners = int.Parse(item);
                    model.PartnerOfProject.Add(partofPro);
                    model.SaveChanges();
                }
                return Content(pro.ID.ToString());
            }
        }

        [HttpPost]
        public ActionResult openChinhSuaDuAn(int? id)
        {
            var pro = model.Projects.Find(id);
            if (pro == null || id == null)
                return Content("DANHSACH");

            var lstPartner = model.Partners.OrderByDescending(o => o.ID).ToList();
            //lstPartner.RemoveRange(pro.PartnerOfProject.ToList());
            Session["lst-partner-DuAn"] = lstPartner.ToList();
            return PartialView("_chinhSuaDuAnPartial", pro);
        }

        [HttpPost]
        public async Task<ActionResult> chinhSuaDuAn(string idpro, string idpart,
            HttpPostedFileBase hopdong, string name, string mota, string batdau, string ketthuc,
            string namedn, string hotennguoidaidien, string hoten, string phone,
            string email, string ngaysinh, string gioitinh, string diahchinha, string loaidoitac,
            string masothue, string website, string id)
        {
            var duAn = model.Projects.Find(Int32.Parse(idpro));
            if (duAn == null || Session["user-id"] == null)
                return Content("DANHSACH");

            if (string.IsNullOrEmpty(id))
            {
                List<int> idParts = new List<int>();
                int soluong = email.Split('#').Count();
                var lstidpart = idpart.Split('#').ToList();
                var lstphone = phone.Split('#').ToList();
                var lstemail = email.Split('#').ToList();
                var lstngaysinh = ngaysinh.Split('#').ToList();
                var lstgioitinh = gioitinh.Split('#').ToList();
                var lstdiahchinha = diahchinha.Split('#').ToList();
                var lstmasothue = masothue.Split('#').ToList();
                var lstwebsite = website.Split('#').ToList();
                var lstloaidoitac = loaidoitac.Split('#').ToList();
                var lstnamedn = namedn.Split('#').ToList();
                var lsthotennguoidaidien = hotennguoidaidien.Split('#').ToList();
                var lsthoten = hoten.Split('#').ToList();

                int indexchecks = 0;
                foreach (var item in lstemail)
                {
                    indexchecks++;
                    var checkExits = model.Partners.FirstOrDefault(p => p.Email.ToLower().Equals(item.ToLower()));
                    if (checkExits != null)
                    {
                        string text = "";
                        if (checkExits.Email.ToLower().Equals(email.ToLower()))
                        {
                            text += "Địa chỉ Email khách hàng " + indexchecks;
                            return Content(text + " đang được sử dụng bởi một khách hàng khác.");
                        }
                    }
                }

                model.PartnerOfProject.RemoveRange(duAn.PartnerOfProject);
                model.SaveChanges();

                for (int i = 0; i < lstidpart.Count(); i++)
                {
                    if (Int32.Parse(lstidpart[i]) == 0)
                    {
                        Partners kh = new Partners();
                        if (Convert.ToBoolean(lstloaidoitac[i]) == true)
                        {
                            kh.Company = lstnamedn[i].Trim();
                            kh.Name = lsthotennguoidaidien[i].Trim();
                        }
                        else
                        {
                            kh.Name = lsthoten[i].Trim();
                        }

                        kh.Phone = lstphone[i].Trim();
                        kh.Email = lstemail[i].Trim();
                        kh.Birthday = Convert.ToDateTime(lstngaysinh[i]);
                        kh.Sex = lstgioitinh[i].Trim();
                        kh.Address = lstdiahchinha[i].Trim();
                        kh.TaxCode = lstmasothue[i].Trim();
                        kh.WebUrl = lstwebsite[i].Trim();
                        kh.CompanyOrPersonal = Convert.ToBoolean(lstloaidoitac[i].Trim());
                        kh.AddDate = DateTime.Now;

                        model.Partners.Add(kh);
                        model.SaveChanges();

                        kh.ID_Partners = "KH" + kh.ID.ToString("D8");
                        model.Entry(kh).State = EntityState.Modified;
                        model.SaveChanges();

                        idParts.Add(kh.ID);
                    }
                    else
                    {
                        var kh = model.Partners.Find(Int32.Parse(lstidpart[i]));

                        if (Convert.ToBoolean(lstloaidoitac[i]) == true)
                        {
                            kh.Company = lstnamedn[i].Trim();
                            kh.Name = lsthotennguoidaidien[i].Trim();
                        }
                        else
                        {
                            kh.Name = lsthoten[i].Trim();
                        }

                        kh.Phone = lstphone[i].Trim();
                        kh.Email = lstemail[i].Trim();
                        kh.Birthday = Convert.ToDateTime(lstngaysinh[i]);
                        kh.Sex = lstgioitinh[i].Trim();
                        kh.Address = lstdiahchinha[i].Trim();
                        kh.TaxCode = lstmasothue[i].Trim();
                        kh.WebUrl = lstwebsite[i].Trim();
                        kh.CompanyOrPersonal = Convert.ToBoolean(lstloaidoitac[i].Trim());
                        kh.AddDate = DateTime.Now;

                        model.Entry(kh).State = EntityState.Modified;
                        model.SaveChanges();

                        idParts.Add(kh.ID);
                    }

                }

                foreach (var item in idParts)
                {
                    PartnerOfProject poj = new PartnerOfProject();
                    poj.ID_Partners = item;
                    poj.ID_Project = Int32.Parse(idpro);
                    model.PartnerOfProject.Add(poj);
                }
                model.SaveChanges();
            }
            else
            {
                model.PartnerOfProject.RemoveRange(duAn.PartnerOfProject);
                model.SaveChanges();

                foreach (var item in id.Split('#').ToList())
                {
                    PartnerOfProject poj = new PartnerOfProject();
                    poj.ID_Partners = Int32.Parse(item);
                    poj.ID_Project = Int32.Parse(idpro);
                    model.PartnerOfProject.Add(poj);
                }
                model.SaveChanges();
            }

            FileStream streams;
            if (hopdong != null)
            {
                if (hopdong.ContentLength > 0)
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

                    string path = Path.Combine(Server.MapPath("~/Content/images/"), sb.ToString().Trim() + hopdong.FileName);
                    hopdong.SaveAs(path);
                    streams = new FileStream(Path.Combine(path), FileMode.Open);
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
                        .Child(sb.ToString().Trim() + hopdong.FileName)
                        .PutAsync(streams, cancellation.Token);
                    try
                    {
                        string link = await task;
                        duAn.ContractUrl = link;
                        System.IO.File.Delete(path);
                    }
                    catch
                    {
                        return Content("Đã có xảy ra lỗi, vui lòng thử lại");
                    }
                }
            }
            duAn.Name = name;
            duAn.Description = mota;
            duAn.StartDate = Convert.ToDateTime(batdau);
            duAn.EndDate = Convert.ToDateTime(ketthuc);
            model.Entry(duAn).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            return PartialView("_tongQuanPartial", model.Projects.Find(Int32.Parse(idpro)));
        }

        public ActionResult chiTietDuAn(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return RedirectToAction("danhSachDuAn");

            var lichsu = model.Histories.Where(l => l.Tasks.ID_Project == id || l.ID_Projects == id).OrderByDescending(o => o.Date).ToList();
            Session["lst-lichSuDuAn"] = lichsu;
            ViewBag.ShowActive = "danhSachDuAn";
            return View(pro);
        }

        public ActionResult tongQuanPartial(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return RedirectToAction("danhSachDuAn");

            var lichsu = model.Histories.Where(l => l.Tasks.ID_Project == id || l.ID_Projects == id).OrderByDescending(o => o.Date).ToList();
            Session["lst-lichSuDuAn"] = lichsu;
            ViewBag.ShowActive = "danhSachDuAn";
            return PartialView("_tongQuanPartial", pro);
        }
        public ActionResult congViecPartial(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Session["lst-Task"] = pro.Tasks.OrderBy(t => t.OrdinalNumbers).ToList();
            return PartialView("_congViecPartial", pro);
        }
        [HttpPost]
        public ActionResult themCongViec(int? idpro, int? idassign, string taskname, string mota,
            string deadline, decimal estimate, string tentailieu, string loaitailieu, string duongdantailieu)
        {
            var pro = model.Projects.Find(idpro);
            var emp = model.Employees.Find(idassign);
            if (pro == null || emp == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Tasks task = new Tasks();
            task.ID_Employee = (int)idassign;
            task.ID_Project = (int)idpro;
            task.Name = taskname;
            task.Description = mota;
            task.State = "do";
            task.Deadline = Convert.ToDateTime(deadline);
            task.OriginalEstimate = estimate;
            task.CompletedWork = 0;
            task.DocumentName = tentailieu;
            task.DocumentType = loaitailieu;
            task.DocumentURL = duongdantailieu;

            if (pro.Tasks.Where(t => t.ID_Project == idpro && t.State.Equals("do")).OrderByDescending(o => o.OrdinalNumbers).Count() > 0)
            {
                task.OrdinalNumbers = pro.Tasks.Where(t => t.ID_Project == idpro && t.State.Equals("do")).OrderByDescending(o => o.OrdinalNumbers).First().OrdinalNumbers + 1;
            }
            else
            {
                task.OrdinalNumbers = 1;
            }
            model.Tasks.Add(task);
            model.SaveChanges();

            Histories his = new Histories();
            his.ID_Employee = Int32.Parse(Session["user-id"].ToString());
            his.ID_Task = task.ID;
            his.Name = "Thêm Công Việc Mới";
            his.Contents = "đã thêm công việc";
            his.Date = DateTime.Now;
            model.Histories.Add(his);
            model.SaveChanges();
            model = new CP25Team06Entities();

            Session["lst-Task"] = model.Tasks.Where(t => t.ID_Project == idpro).OrderBy(o => o.OrdinalNumbers).ToList();
            return PartialView("_congViecPartial", pro);
        }
        [HttpPost]
        public ActionResult capNhatCongViec(string lstTaskFirst, string lstTaskCurrent, int idTask)
        {
            try
            {
                if (Session["user-id"] == null)
                    return Content("DANGNHAP");

                int idPro;
                //Task cũ
                if (lstTaskFirst.IndexOf("~") != -1)
                {
                    if (lstTaskFirst.Split('~')[1].IndexOf("_") != -1)
                    {
                        List<string> taskCu = lstTaskFirst.Split('~')[1].Split('_').ToList();
                        string stateStr = lstTaskFirst.Split('~')[0];
                        for (int i = 0; i < taskCu.Count; i++)
                        {
                            var taskIndex = model.Tasks.Find(Int32.Parse(taskCu[i]));
                            taskIndex.State = stateStr;
                            taskIndex.OrdinalNumbers = (i + 1);

                            if (stateStr.Equals("progress"))
                                taskIndex.StartDate = DateTime.Now;
                            else if (stateStr.Equals("done"))
                                taskIndex.EndDate = DateTime.Now;
                            else if (stateStr.Equals("do"))
                            {
                                taskIndex.EndDate = null;
                                taskIndex.StartDate = null;
                            }

                            model.Entry(taskIndex).State = EntityState.Modified;
                        }
                        idPro = model.Tasks.Find(Int32.Parse(taskCu[0])).ID_Project;
                    }
                    else
                    {
                        string stateStr = lstTaskFirst.Split('~')[0];
                        string taskCu = lstTaskFirst.Split('~')[1];

                        var taskIndex = model.Tasks.Find(Int32.Parse(taskCu));
                        taskIndex.State = stateStr;
                        taskIndex.OrdinalNumbers = 1;

                        if (stateStr.Equals("progress"))
                            taskIndex.StartDate = DateTime.Now;
                        else if (stateStr.Equals("done"))
                            taskIndex.EndDate = DateTime.Now;
                        else if (stateStr.Equals("do"))
                        {
                            taskIndex.EndDate = null;
                            taskIndex.StartDate = null;
                        }
                        model.Entry(taskIndex).State = EntityState.Modified;
                        idPro = taskIndex.ID_Project;
                    }
                }

                string stateStrCr = lstTaskCurrent.Split('~')[0];
                //Task mới
                if (lstTaskCurrent.Split('~')[1].IndexOf("_") != -1)
                {
                    List<string> taskCu = lstTaskCurrent.Split('~')[1].Split('_').ToList();
                    for (int i = 0; i < taskCu.Count; i++)
                    {
                        var taskIndex = model.Tasks.Find(Int32.Parse(taskCu[i]));
                        taskIndex.State = stateStrCr;
                        taskIndex.OrdinalNumbers = (i + 1);

                        if (stateStrCr.Equals("progress"))
                            taskIndex.StartDate = DateTime.Now;
                        else if (stateStrCr.Equals("done"))
                            taskIndex.EndDate = DateTime.Now;
                        else if (stateStrCr.Equals("do"))
                        {
                            taskIndex.EndDate = null;
                            taskIndex.StartDate = null;
                        }

                        model.Entry(taskIndex).State = EntityState.Modified;
                    }
                    idPro = model.Tasks.Find(Int32.Parse(taskCu[0])).ID_Project;
                }
                else
                {
                    string taskCu = lstTaskCurrent.Split('~')[1];

                    var taskIndex = model.Tasks.Find(Int32.Parse(taskCu));
                    taskIndex.State = stateStrCr;
                    taskIndex.OrdinalNumbers = 1;

                    if (stateStrCr.Equals("progress"))
                        taskIndex.StartDate = DateTime.Now;
                    else if (stateStrCr.Equals("done"))
                        taskIndex.EndDate = DateTime.Now;
                    else if (stateStrCr.Equals("do"))
                    {
                        taskIndex.EndDate = null;
                        taskIndex.StartDate = null;
                    }

                    model.Entry(taskIndex).State = EntityState.Modified;

                    idPro = taskIndex.ID_Project;
                }

                //Add history
                Histories his = new Histories();
                his.ID_Employee = Int32.Parse(Session["user-id"].ToString());
                his.ID_Task = idTask;
                his.Name = "Cập Nhật Trạng Thái Công Việc";
                his.Date = DateTime.Now;

                if (stateStrCr.Equals("do"))
                    his.Contents = "đã đặt trạng thái Công việc | thành \"Chưa Thực Hiện\"";
                else if (stateStrCr.Equals("progress"))
                    his.Contents = "đã bắt đầu thực hiện Công việc";
                else if (stateStrCr.Equals("review"))
                    his.Contents = "đã hoàn thành Công việc | và chờ xác nhận";
                else
                    his.Contents = "đã xác nhận Công việc được hoàn thành";

                model.Histories.Add(his);
                model.SaveChanges();

                return Content("SUCCESS");
            }
            catch
            {
                return Content("FAILED");
            }
        }
        public ActionResult nganSachPartial(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return Content("DANHSACH");

            return PartialView("_nganSachPartial", pro.Debts.ToList());
        }
        [HttpPost]
        public ActionResult thanhToanCongNo(int? id, decimal? price)
        {
            var debt = model.Debts.Find(id);
            if (id == null || debt == null || Session["user-id"] == null)
                return Content("DANHSACH");

            PaymentHistory payHis = new PaymentHistory();
            payHis.ID_Debts = (int)id;
            payHis.Date = DateTime.Now;
            payHis.Contents = "Thanh toán " + Convert.ToDecimal(price).ToString("0,0").Replace(".", ",") + " VND cho " + debt.Stage;

            if (price < 0)
                payHis.Type = false; //false = khoản âm
            else
                payHis.Type = true; //True = khoản dương

            payHis.Price = (decimal)price;
            payHis.OnUpdate = false; //Dùng để tính số tiền khách hàng thanh toán = false

            model.PaymentHistory.Add(payHis);
            model.SaveChanges();

            if (debt.Price <= model.PaymentHistory.Where(p => p.OnUpdate == false && p.ID_Debts == id).Sum(s => s.Price))
                debt.State = true;
            else
                debt.State = false;

            model.Entry(debt).State = EntityState.Modified;
            model.SaveChanges();

            model = new CP25Team06Entities();
            int idpro = debt.ID_Project;
            var pro = model.Projects.Find(idpro);
            return PartialView("_nganSachPartial", pro.Debts.ToList());
        }
        [HttpPost]
        public ActionResult chinhSuaChiPhi(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return Content("DANHSACH");

            return PartialView("_formChinhSuaChiPhi", pro.Debts.ToList());
        }
        [HttpPost]
        public ActionResult luuchinhsuachiphi(int? idpro, string giaidoan, string chiphi)
        {
            var pro = model.Projects.Find(idpro);
            if (idpro == null || pro == null || Session["user-id"] == null || giaidoan == null || chiphi == null)
                return Content("DANHSACH");

            var chiPhiBanDau = pro.Debts.Sum(s => s.Price);

            if (giaidoan.IndexOf("_") != -1)
            {
                var itemGiaiDoan = giaidoan.Split('_');
                var itemChiPhi = chiphi.Split('_');

                int totalDebtinDB = pro.Debts.Count();
                int totalDebNew = itemGiaiDoan.Count();

                if (totalDebtinDB <= totalDebNew) //thêm hoặc giữ nguyên thì chỉ sửa cũ và thêm mới nếu có
                {
                    for (int i = 0; i < totalDebNew; i++)
                    {
                        if (totalDebtinDB > i)
                        {
                            string nameGD = "giai đoạn " + (i + 1);
                            var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));
                            debt.Price = Convert.ToDecimal(itemChiPhi[i]);
                            debt.Date = Convert.ToDateTime(itemGiaiDoan[i]);
                            debt.Send_Email_State = false;

                            model.Entry(debt).State = EntityState.Modified;
                            model.SaveChanges();
                        }
                        else
                        {
                            Debts newDebts = new Debts();
                            newDebts.ID_Project = (int)idpro;
                            newDebts.Stage = "Giai đoạn " + (i + 1);
                            newDebts.Price = Convert.ToDecimal(itemChiPhi[i]);
                            newDebts.Date = Convert.ToDateTime(itemGiaiDoan[i]);
                            newDebts.State = false;
                            newDebts.Send_Email_State = false;
                            model.Debts.Add(newDebts);
                            model.SaveChanges();
                        }
                    }
                }
                else //Bớt thì sửa cái cũ và xóa cái được xóa
                {
                    for (int i = 0; i < totalDebtinDB; i++)
                    {
                        if (totalDebNew > i)
                        {
                            string nameGD = "giai đoạn " + (i + 1);
                            var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));
                            debt.Price = Convert.ToDecimal(itemChiPhi[i]);
                            debt.Date = Convert.ToDateTime(itemGiaiDoan[i]);
                            debt.Send_Email_State = false;
                            model.Entry(debt).State = EntityState.Modified;
                            model.SaveChanges();
                        }
                        else
                        {
                            string nameGD = "giai đoạn " + (i + 1);
                            var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));

                            model.PaymentHistory.RemoveRange(debt.PaymentHistory);
                            model.Debts.Remove(debt);
                            model.SaveChanges();
                        }
                    }
                }
            }
            else
            {
                int totalDebtinDB = pro.Debts.Count();
                if (totalDebtinDB > 1)
                {
                    for (int i = 0; i < totalDebtinDB; i++)
                    {
                        if (i == 0)
                        {
                            string nameGD = "giai đoạn " + (i + 1);
                            var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));
                            debt.Price = Convert.ToDecimal(chiphi);
                            debt.Date = Convert.ToDateTime(giaidoan);
                            debt.Send_Email_State = false;
                            model.Entry(debt).State = EntityState.Modified;
                            model.SaveChanges();
                        }
                        else
                        {
                            string nameGD = "giai đoạn " + (i + 1);
                            var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));

                            model.PaymentHistory.RemoveRange(debt.PaymentHistory);
                            model.Debts.Remove(debt);
                            model.SaveChanges();
                        }
                    }
                }
                else
                {
                    string nameGD = "giai đoạn 1";
                    var debt = pro.Debts.FirstOrDefault(d => d.Stage.ToLower().Trim().Equals(nameGD));
                    debt.Price = Convert.ToDecimal(chiphi);
                    debt.Date = Convert.ToDateTime(giaidoan);
                    debt.Send_Email_State = false;
                    model.Entry(debt).State = EntityState.Modified;
                    model.SaveChanges();
                }
            }

            model = new CP25Team06Entities();
            var chiPhiHienTai = model.Debts.Where(d => d.ID_Project == idpro).Sum(s => s.Price);

            PaymentHistory payHis = new PaymentHistory();
            payHis.ID_Projects = (int)idpro;
            payHis.Date = DateTime.Now;
            payHis.Contents = "Thay đổi thông tin giai đoạn của dự án. Từ tổng: " + chiPhiBanDau.ToString("0,0") + " VND -> " + chiPhiHienTai.ToString("0,0") + " VND.";
            if (chiPhiBanDau == chiPhiHienTai)
            {
                payHis.Type = true; //True = khoản dương
                payHis.Price = 0;
            }
            else if (chiPhiBanDau > chiPhiHienTai)
            {
                payHis.Type = false; //false = khoản âm
                payHis.Price = chiPhiBanDau - chiPhiHienTai;
            }
            else
            {
                payHis.Type = true; //True = khoản dương
                payHis.Price = chiPhiHienTai - chiPhiBanDau;
            }

            payHis.OnUpdate = true; //Dùng để tính số tiền khách hàng thanh toán = false
            model.PaymentHistory.Add(payHis);
            model.SaveChanges();

            return PartialView("_nganSachPartial", model.Projects.Find(idpro).Debts.ToList());
        }
        public ActionResult taiLieuPartial(int? id)
        {
            var pro = model.Projects.Find(id);
            if (pro == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            return PartialView("_taiLieuPartial", pro.Tasks.Where(t => t.DocumentName.Length > 0).OrderByDescending(o => o.ID).ToList());
        }
        public ActionResult doiNguPartial(int? id)
        {
            var pro = model.Projects.Find(id);
            if (pro == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            var exitsEmp = model.Teams.Where(t => t.ID_Project == id).ToList();
            var emp = model.Employees.Where(e => !e.Position.Name.Equals("admin")).ToList().OrderByDescending(e => e.ID).ToList();
            foreach (var item in exitsEmp)
            {
                emp.Remove(item.Employees);
            }

            Session["lst-DoiNguEmployee"] = emp;
            return PartialView("_doiNguPartial", pro);
        }
        public ActionResult timKiemThanhVien(int? id, string noidungs)
        {
            var pro = model.Projects.Find(id);
            if (pro == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            noidungs = noidungs.ToLower().Trim();
            if (string.IsNullOrEmpty(noidungs))
            {
                var emp = pro.Teams.OrderByDescending(o => o.ID).ToList();
                return PartialView("_doiNgu_timKiemThanhVienPartial", emp);
            }
            else
            {
                var emp = pro.Teams.Where(t => t.Employees.ID_Employee.ToLower().Contains(noidungs)
                || t.Employees.Name.ToLower().Contains(noidungs)
                || t.Employees.WorkEmail.ToLower().Contains(noidungs)
                || t.Employees.IdentityCard.ToLower().Contains(noidungs)).OrderByDescending(o => o.ID).ToList();
                return PartialView("_doiNgu_timKiemThanhVienPartial", emp);
            }
        }

        [HttpPost]
        public ActionResult themThanhVien(int? idemp, int? idpro)
        {
            var emp = model.Employees.Find(idemp);
            var pro = model.Projects.Find(idpro);
            if (emp == null || pro == null || idemp == null || idpro == null || Session["user-id"] == null)
                return Content("DANHSACH");

            Teams teams = new Teams();
            teams.ID_Project = (int)idpro;
            teams.ID_Employee = (int)idemp;
            model.Teams.Add(teams);
            model.SaveChanges();

            model = new CP25Team06Entities();
            var exitsEmp = model.Teams.Where(t => t.ID_Project == idpro).ToList();
            var emps = model.Employees.Where(e => !e.Position.Name.Equals("admin")).ToList().OrderByDescending(e => e.ID).ToList();
            foreach (var item in exitsEmp)
            {
                emps.Remove(item.Employees);
            }
            Session["lst-DoiNguEmployee"] = emps;
            return PartialView("_doiNguPartial", pro);
        }
        [HttpPost]
        public ActionResult xoaThanhVien(int? idemp, int? idpro)
        {
            var emp = model.Employees.Find(idemp);
            var pro = model.Projects.Find(idpro);
            if (emp == null || pro == null || idemp == null || idpro == null || Session["user-id"] == null)
                return Content("DANHSACH");

            var teams = model.Teams.FirstOrDefault(t => t.ID_Project == idpro && t.ID_Employee == idemp);
            model.Teams.Remove(teams);
            model.SaveChanges();

            model = new CP25Team06Entities();
            var exitsEmp = model.Teams.Where(t => t.ID_Project == idpro).ToList();
            var emps = model.Employees.Where(e => !e.Position.Name.Equals("admin")).ToList().OrderByDescending(e => e.ID).ToList();
            foreach (var item in exitsEmp)
            {
                emps.Remove(item.Employees);
            }
            Session["lst-DoiNguEmployee"] = emps;
            return PartialView("_doiNguPartial", pro);
        }
        [HttpPost]
        public ActionResult LoaiCongViec(int? assign, string deadlineType, int? id)
        {
            var pro = model.Projects.Find(id);
            if (pro == null || id == null || assign == null || string.IsNullOrEmpty(deadlineType) || Session["user-id"] == null)
                return Content("DANHSACH");

            if (assign == 0)
            {
                if (deadlineType.Equals("tatca"))
                {
                    Session["lst-Task"] = pro.Tasks.OrderBy(t => t.OrdinalNumbers).ToList();
                }
                else if (deadlineType.Equals("hanhomnay"))
                {
                    DateTime currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                    Session["lst-Task"] = pro.Tasks.Where(t => t.Deadline == currentDate).OrderBy(t => t.OrdinalNumbers).ToList();
                }
                else
                {
                    DateTime currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                    Session["lst-Task"] = pro.Tasks.Where(t => t.Deadline < currentDate).OrderBy(t => t.OrdinalNumbers).ToList();
                }
            }
            else
            {
                if (deadlineType.Equals("tatca"))
                {
                    Session["lst-Task"] = pro.Tasks.Where(t => t.ID_Employee == assign).OrderBy(t => t.OrdinalNumbers).ToList();
                }
                else if (deadlineType.Equals("hanhomnay"))
                {
                    DateTime currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                    Session["lst-Task"] = pro.Tasks.Where(t => t.ID_Employee == assign && t.Deadline == currentDate).OrderBy(t => t.OrdinalNumbers).ToList();
                }
                else
                {
                    DateTime currentDate = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd"));
                    Session["lst-Task"] = pro.Tasks.Where(t => t.ID_Employee == assign && t.Deadline < currentDate).OrderBy(t => t.OrdinalNumbers).ToList();
                }
            }
            return PartialView("_congViecPartial", pro);
        }
        [HttpPost]
        public ActionResult xemChinhSuaTask(int? id)
        {
            var task = model.Tasks.Find(id);
            if (task == null || id == null || Session["user-id"] == null)
                return Content("DANHSACH");

            return PartialView("_xemChinhSuaTaskPartial", task);
        }
        [HttpPost]
        public ActionResult chinhSuaCongViec(int? id, int? idpro, int? idassign, string taskname, string mota, string state,
            string deadline, decimal? estimates, decimal? completed, string tentailieu, string loaitailieu, string duongdantailieu)
        {
            try
            {
                var task = model.Tasks.Find(id);
                var pro = model.Projects.Find(idpro);
                if (task == null || pro == null || id == null || idpro == null || Session["user-id"] == null)
                    return Content("DANHSACH");

                // Trạng thái, vị trí cũ
                string firstState = task.State;
                int vitricu = task.OrdinalNumbers;

                // Thêm task mới vào cuối
                task.ID_Employee = (int)idassign;
                task.Name = taskname;
                task.Description = mota;
                task.Deadline = Convert.ToDateTime(deadline);
                task.OriginalEstimate = estimates;
                task.CompletedWork = completed;
                task.DocumentName = tentailieu;
                task.DocumentType = loaitailieu;
                task.DocumentURL = duongdantailieu;

                if (state.Equals("progress"))
                    task.StartDate = DateTime.Now;
                else if (state.Equals("done"))
                    task.EndDate = DateTime.Now;

                if (!firstState.Equals(state)) //trạng thái thay đổi
                {
                    task.State = state;

                    if (pro.Tasks.Where(t => t.State.Equals(state)).OrderByDescending(o => o.OrdinalNumbers).Count() > 0)
                    {
                        task.OrdinalNumbers = pro.Tasks.Where(t => t.State.Equals(state)).OrderByDescending(o => o.OrdinalNumbers).First().OrdinalNumbers + 1;
                        model.Entry(task).State = EntityState.Modified;
                    }
                    else
                    {
                        task.OrdinalNumbers = 1;
                    }

                    //Xếp lại list task cũ
                    var lstFirstTask = pro.Tasks.Where(t => t.State.Equals(firstState) && t.OrdinalNumbers > vitricu).ToList();
                    foreach (var item in lstFirstTask)
                    {
                        item.OrdinalNumbers = item.OrdinalNumbers - 1;
                        model.Entry(item).State = EntityState.Modified;
                    }

                    //Add history
                    Histories his = new Histories();
                    his.ID_Employee = Int32.Parse(Session["user-id"].ToString());
                    his.ID_Task = id;
                    his.Name = "Cập Nhật Thông Tin Công Việc";
                    his.Date = DateTime.Now;

                    if (state.Equals("do"))
                        his.Contents = "đã cập nhật thông tin và đặt trạng thái Công việc | thành \"Chưa Thực Hiện\"";
                    else if (state.Equals("progress"))
                        his.Contents = "đã cập nhật thông tin và bắt đầu thực hiện Công việc";
                    else if (state.Equals("review"))
                        his.Contents = "đã cập nhật thông tin và hoàn thành Công việc | và chờ xác nhận";
                    else
                        his.Contents = "đã cập nhật thông tin và xác nhận Công việc được hoàn thành";

                    model.Histories.Add(his);
                }
                else //giữ nguyên trạng thái
                {
                    model.Entry(task).State = EntityState.Modified;

                    //Add history
                    Histories his = new Histories();
                    his.ID_Employee = Int32.Parse(Session["user-id"].ToString());
                    his.ID_Task = id;
                    his.Name = "Cập Nhật Thông Tin Công Việc";
                    his.Date = DateTime.Now;
                    his.Contents = "đã cập nhật thông tin Công việc";

                    model.Histories.Add(his);
                }
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-Task"] = model.Tasks.Where(t => t.ID_Project == idpro).OrderBy(o => o.OrdinalNumbers).ToList();
                return PartialView("_congViecPartial", model.Projects.Find(idpro));
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult binhLuanTask(int? id, string cmt)
        {
            var task = model.Tasks.Find(id);
            if (task == null || id == null || string.IsNullOrEmpty(cmt) || Session["user-id"] == null)
                return Content("DANHSACH");

            Comment comment = new Comment();
            comment.ID_Employee = Convert.ToInt32(Session["user-id"]);
            comment.ID_Task = (int)id;
            comment.Contents = cmt;
            comment.Date = DateTime.Now;
            model.Comment.Add(comment);
            model.SaveChanges();

            Histories his = new Histories();
            his.ID_Employee = Convert.ToInt32(Session["user-id"]);
            his.ID_Task = (int)id;
            his.Name = "Bình Luận Công Việc";
            his.Contents = "đã viết một bình luận Công việc";
            his.Date = DateTime.Now;
            model.Histories.Add(his);
            model.SaveChanges();

            model = new CP25Team06Entities();

            return PartialView("_commentTaskPartial", model.Tasks.Find(id));
        }

        [HttpPost]
        public ActionResult xoaTask(int? id, int? idpro)
        {
            try
            {
                var task = model.Tasks.Find(id);
                var pro = model.Projects.Find(idpro);
                if (task == null || id == null || pro == null || idpro == null || Session["user-id"] == null)
                    return Content("DANHSACH");

                int index = task.OrdinalNumbers;
                string state = task.State;

                //Sắp xếp lại danh sách task
                var sortTask = model.Tasks.Where(t => t.ID_Project == idpro && t.State.Equals(state) && t.OrdinalNumbers > index).ToList();
                foreach (var item in sortTask)
                {
                    item.OrdinalNumbers = item.OrdinalNumbers - 1;
                    model.Entry(item).State = EntityState.Modified;
                }

                Histories his = new Histories();
                his.ID_Employee = Convert.ToInt32(Session["user-id"]);
                his.ID_Projects = task.ID_Project;
                his.Name = "Loại Bỏ Công Việc";
                his.Contents = "đã loại bỏ Công việc: " + task.Name;
                his.Date = DateTime.Now;
                model.Histories.Add(his);

                model.Histories.RemoveRange(task.Histories);
                model.Comment.RemoveRange(task.Comment);
                model.Tasks.Remove(task);
                model.SaveChanges();
                model = new CP25Team06Entities();

                Session["lst-Task"] = pro.Tasks.OrderBy(t => t.OrdinalNumbers).ToList();
                return PartialView("_congViecPartial", pro);
            }
            catch
            {
                return Content("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        }
        [HttpPost]
        public ActionResult khoaDuAn(int? id, bool locks)
        {
            try
            {
                var pro = model.Projects.Find(id);
                if (id == null || pro == null || Session["user-id"] == null)
                    return Content("DANHSACH");

                pro.Lock = locks;
                model.Entry(pro).State = EntityState.Modified;
                model.SaveChanges();
                return Content("SUCCESS");
            }
            catch
            {
                return Content("ERORR");
            }
        }
    }
}
