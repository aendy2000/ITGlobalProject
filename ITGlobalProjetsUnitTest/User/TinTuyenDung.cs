using ITGlobalProject.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Moq;
using ITGlobalProject.Models;
using System.Threading.Tasks;

namespace ITGlobalProjetsUnitTest.User.Controller
{
    [TestClass]
    public class TinTuyenDung
    {
        TinTuyenDungController tintuyendung = new TinTuyenDungController();

        //Test request View List Recruitment
        [TestMethod]
        public void DanhSachTinTuyenDung()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            tintuyendung.ControllerContext = mockControllerContext.Object;

            ViewResult result = tintuyendung.danhSachTinTuyenDung() as ViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("danhSachTinTuyenDung", result.ViewName);
        }

        //Test request View Search Recruitment
        [TestMethod]
        public void timKiemTinTuyenDung()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            tintuyendung.ControllerContext = mockControllerContext.Object;

            //Search with Skills
            string content = "C#";
            PartialViewResult result = tintuyendung.timkiemtintuyendung(content) as PartialViewResult;

            Assert.IsNotNull(result.Model);
            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("_timkiemtintuyendung", result.ViewName);
        }
    }
}
