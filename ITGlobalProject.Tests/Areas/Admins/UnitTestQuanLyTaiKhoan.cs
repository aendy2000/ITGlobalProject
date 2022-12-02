using ITGlobalProject.Areas.Admins.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Moq;
using ITGlobalProject.Models;
using System.Data;

namespace ITGlobalProject.Tests.Areas.Admins
{
    [TestClass]
    public class UnitTestQuanLyTaiKhoan
    {
        QuanLyTaiKhoanController qltkcontroller = new QuanLyTaiKhoanController();

        [TestMethod]
        [HttpPost]
        public void DangNhap()
        {

            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltkcontroller.ControllerContext = mockControllerContext.Object;
            string username = "tuan.197pm21996@vanlanguni.vn";
            string password = "AdminAdmin.123";

            ViewResult result = qltkcontroller.DangNhap(username, password) as ViewResult;

            Assert.IsNotNull(result);
        }
    }
}
