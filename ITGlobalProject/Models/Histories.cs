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
    
    public partial class Histories
    {
        public int ID { get; set; }
        public int ID_Employee { get; set; }
        public Nullable<int> ID_Task { get; set; }
        public Nullable<int> ID_Payroll { get; set; }
        public string Name { get; set; }
        public string Contents { get; set; }
        public System.DateTime Date { get; set; }
        public Nullable<int> ID_Projects { get; set; }
    
        public virtual Employees Employees { get; set; }
        public virtual Payroll Payroll { get; set; }
        public virtual Tasks Tasks { get; set; }
        public virtual Projects Projects { get; set; }
    }
}
