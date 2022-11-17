using System.Web.Mvc;

namespace ITGlobalProject.Areas.Admins
{
    public class AdminsAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Admins";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Admins_default",
                "Admins/{controller}/{action}/{id}",
                new {controller = "QuanLyTaiKhoan", action = "DangNhap", id = UrlParameter.Optional }
            );
        }
    }
}