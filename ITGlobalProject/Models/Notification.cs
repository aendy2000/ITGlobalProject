//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ITGlobalProject.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Notification
    {
        public int ID { get; set; }
        public int ID_Employee { get; set; }
        public System.DateTime Date { get; set; }
        public string Contents { get; set; }
        public bool State { get; set; }
        public bool Push { get; set; }
        public string Url { get; set; }
    
        public virtual Employees Employees { get; set; }
    }
}
