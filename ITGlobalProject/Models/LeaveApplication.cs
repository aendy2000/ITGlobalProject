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
    
    public partial class LeaveApplication
    {
        public int ID { get; set; }
        public int ID_Employee { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public System.DateTime SendDate { get; set; }
        public Nullable<bool> State { get; set; }
        public string Contents { get; set; }
        public Nullable<System.DateTime> ResponsiveDate { get; set; }
        public string Reply { get; set; }
        public bool OnWage { get; set; }
        public Nullable<int> ID_ApplyLeaveType { get; set; }
    
        public virtual ApplyLeaveType ApplyLeaveType { get; set; }
        public virtual Employees Employees { get; set; }
    }
}
