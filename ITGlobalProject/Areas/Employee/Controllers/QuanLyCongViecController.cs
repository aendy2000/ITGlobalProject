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

namespace ITGlobalProject.Areas.Employee.Controllers
{
    public class QuanLyCongViecController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();
        // GET: Employees/QuanLyCongViec
        public ActionResult danhSachDuAn()
        {
            int id = Int32.Parse(Session["user-id"] != null ? Session["user-id"].ToString() : null);
            ViewBag.ShowActive = "danhSachDuAn";
            return View("danhSachDuAn", model.Projects.Where(p => p.Tasks.Where(t => t.ID_Employee == id).Count() > 0).ToList());
        }

        public ActionResult timKiemDuAn(string content)
        {
            int id = Int32.Parse(Session["user-id"] != null ? Session["user-id"].ToString() : null);

            if (string.IsNullOrEmpty(content.Trim()))
            {
                return View("_danhSachDuAnPartial", model.Projects.Where(p => p.Tasks.Where(t => t.ID_Employee == id).Count() > 0).ToList());
            }
            else
            {
                return View("_danhSachDuAnPartial", model.Projects.Where(p => p.Tasks.Where(t => t.ID_Employee == id).Count() > 0 && (p.Name.ToLower().Trim().Contains(content) || p.ID_Project.Contains(content))).ToList());
            }
        }

        public ActionResult chitietduan(int? id)
        {
            var pro = model.Projects.Find(id);
            if (id == null || pro == null || Session["user-id"] == null)
                return RedirectToAction("danhSachDuAn");

            var lichsu = model.Histories.Where(l => l.Tasks.ID_Project == id || l.ID_Projects == id).OrderByDescending(o => o.Date).ToList();
            Session["lst-lichSuDuAn"] = lichsu;
            ViewBag.ShowActive = "danhSachDuAn";
            return View("chiTietDuAn", pro);
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
    }
}