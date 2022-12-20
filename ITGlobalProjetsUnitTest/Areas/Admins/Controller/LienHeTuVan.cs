using ITGlobalProject.Areas.Admins.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Moq;
using ITGlobalProject.Models;
using System.Threading.Tasks;

namespace ITGlobalProjetsUnitTest.Areas.Admins.Controller
{
    [TestClass]
    public class LienHeTuVan
    {
        LienHeTuVanController lienhetuvan = new LienHeTuVanController();

        //Test request View List Liên hệ tư vấn
        [TestMethod]
        public void DanhSachLienHeTuVan()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhetuvan.ControllerContext = mockControllerContext.Object;

            ViewResult result = lienhetuvan.thongTinLienHeTuVan() as ViewResult;

            Assert.IsNotNull(result.Model);
            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("thongTinLienHeTuVan", result.ViewName);
        }

        //Test add recruitment List Liên hệ tư vấn partial
        [TestMethod]
        public void DanhSachLienHeTuVanPartial()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhetuvan.ControllerContext = mockControllerContext.Object;

            PartialViewResult result = lienhetuvan.thongTinLienHeTuVanPartial() as PartialViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("_thongTinLienHeTuVanPartial", result.ViewName);
        }

        //Test add recruitment List đã liên hệ tư vấn partial
        [TestMethod]
        public void DanhSachDaLienHeTuVanPartial()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhetuvan.ControllerContext = mockControllerContext.Object;

            PartialViewResult result = lienhetuvan.thongTinDaLienHeTuVanPartial() as PartialViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("_thongTinDaLienHeTuVanPartial", result.ViewName);
        }

        //Test xóa liên hệ tư vấn null parameter
        [TestMethod]
        public void XoaLienHeTuVanNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhetuvan.ControllerContext = mockControllerContext.Object;
            int? id = null;
            bool? active = null;
            ContentResult result = lienhetuvan.XoaLienHe(id, active) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }

        //Test tiếp nhận liên hệ tư vấn null parameter
        [TestMethod]
        public void TiepNhanLienHeTuVanNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhetuvan.ControllerContext = mockControllerContext.Object;
            int? id = null;
            ContentResult result = lienhetuvan.TiepNhanLienHe(id) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DANHSACH", result.Content);
        }
    }
}
