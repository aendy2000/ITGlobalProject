using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ITGlobalProject.Models;
using System.Data.Entity.Validation;
using System.Data.Entity;

namespace ITGlobalProject.Controllers
{
    public class LienHeController : Controller
    {
        CP25Team06Entities model = new CP25Team06Entities();

        // GET: LienHe
        public ActionResult Index()
        {
            ViewBag.HeaderPages = "LienHe";
            return View();
        }
        [HttpPost]
        public ActionResult guiThongTin(string name, string phone, string email, string message)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(phone) ||
                string.IsNullOrEmpty(email) || string.IsNullOrEmpty(message))
                return Content("DONTSEND");

            Consultation cons = new Consultation();
            cons.Name = name;
            cons.Phone = phone;
            cons.Email = email;
            cons.Contents = message;
            cons.Date = DateTime.Now;
            cons.State = false;
            model.Consultation.Add(cons);
            model.SaveChanges();

            return Content("SUCCESS");
        }
    }
}