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
    
    public partial class PaymentHistory
    {
        public int ID { get; set; }
        public Nullable<int> ID_Debts { get; set; }
        public System.DateTime Date { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string Contents { get; set; }
        public Nullable<bool> Type { get; set; }
        public Nullable<bool> OnUpdate { get; set; }
        public Nullable<int> ID_Projects { get; set; }
    
        public virtual Debts Debts { get; set; }
        public virtual Projects Projects { get; set; }
    }
}
