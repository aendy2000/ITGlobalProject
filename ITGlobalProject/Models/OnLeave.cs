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
    
    public partial class OnLeave
    {
        public int ID { get; set; }
        public int ID_Employee { get; set; }
        public int ID_LeaveDate { get; set; }
    
        public virtual Employees Employees { get; set; }
        public virtual LeaveDate LeaveDate { get; set; }
    }
}
