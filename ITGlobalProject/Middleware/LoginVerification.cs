using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ITGlobalProject.Middleware
{
    public class EmployeeLoginVerification : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session["user-role"] == null)
            {
                filterContext.Result = new RedirectResult("~/Admins/QuanLyTaiKhoan/DangNhap");
                return;
            }
            else if (filterContext.HttpContext.Session["user-role"].ToString().ToLower().Equals("admin"))
            {
                filterContext.Result = new RedirectResult("~/Admins/Dasboard/Analystics");
                return;
            }
        }
    }
    public class AdminLoginVerification : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session["user-role"] == null)
            {
                filterContext.Result = new RedirectResult("~/Admins/QuanLyTaiKhoan/DangNhap");
                return;
            }
            else if (!filterContext.HttpContext.Session["user-role"].ToString().ToLower().Equals("admin"))
            {
                filterContext.Result = new RedirectResult("~/Employees/QuanLyCongViec/danhSachDuAn");
                return;
            }
        }
    }
}