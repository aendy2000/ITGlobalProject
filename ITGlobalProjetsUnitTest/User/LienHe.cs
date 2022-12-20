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
    public class LienHe
    {
        LienHeController lienhe = new LienHeController();

        //Test request View Liên hệ
        [TestMethod]
        public void ViewIndex()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhe.ControllerContext = mockControllerContext.Object;

            ViewResult result = lienhe.Index() as ViewResult;

            Assert.IsNotNull(result.ViewName);
            Assert.AreEqual("Index", result.ViewName);
        }

        //Test request View gửi yêu cầu null
        [TestMethod]
        public void GuiThongTinNull()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhe.ControllerContext = mockControllerContext.Object;

            //Search with Skills
            string name = null;
            string phone = null;
            string email = null;
            string messages = null;

            ContentResult result = lienhe.guiThongTin(name, phone, email, messages) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DONTSEND", result.Content);
        }

        //Test request View gửi yêu cầu rỗng
        [TestMethod]
        public void GuiThongTinRong()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            var mockSession = new Mock<HttpSessionStateBase>();
            mockSession.SetupGet(s => s["user-role"]).Returns("admin");
            mockControllerContext.Setup(p => p.HttpContext.Session).Returns(mockSession.Object);

            lienhe.ControllerContext = mockControllerContext.Object;

            //Search with Skills
            string name = "";
            string phone = "";
            string email = "";
            string messages = "";

            ContentResult result = lienhe.guiThongTin(name, phone, email, messages) as ContentResult;

            Assert.IsNotNull(result.Content);
            Assert.AreEqual("DONTSEND", result.Content);
        }
    }
}
