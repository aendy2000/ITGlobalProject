using ITGlobalProject.Areas.Admins.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Controllers;
using Moq;
using ITGlobalProject.Models;
using System.Threading.Tasks;

namespace ITGlobalProjetsUnitTest.Areas.Admins.Controller
{
    [TestClass]
    public class QuanLyTinTuyenDung
    {
        QuanLyTinTuyenDungController qltintuyendung = new QuanLyTinTuyenDungController();

        //Test request View List Recruitment
        [TestMethod]
        public void DanhSachTinTuyenDung()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltintuyendung.ControllerContext = mockControllerContext.Object;

            ViewResult result = qltintuyendung.danhSachTinTuyenDung() as ViewResult;

            Assert.IsNotNull(result.Model);
            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("danhSachTinTuyenDung", result.ViewName);
        }

        //Test add recruitment view
        [TestMethod]
        public void ThemTinTuyenDung()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltintuyendung.ControllerContext = mockControllerContext.Object;

            ViewResult result = qltintuyendung.themTinTuyenDung() as ViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("themTinTuyenDung", result.ViewName);
        }

        //Test xóa tin tuyển dụng null parameter
        [TestMethod]
        public void XoaTinTuyenDungNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltintuyendung.ControllerContext = mockControllerContext.Object;
            int? id = null;
            string active = null;
            ContentResult result = qltintuyendung.XoaTinTuyenDung(id, active) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test ngừng đăng tin tuyển dụng null parameter
        [TestMethod]
        public void NgungDangTinTuyenDungNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            qltintuyendung.ControllerContext = mockControllerContext.Object;
            int? id = null;
            bool active = false;
            ContentResult result = qltintuyendung.NgungDangTinTuyenDung(id, active) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }
    }
}
