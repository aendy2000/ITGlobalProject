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
    
    public partial class Tasks
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tasks()
        {
            this.Comment = new HashSet<Comment>();
            this.Histories = new HashSet<Histories>();
        }
    
        public int ID { get; set; }
        public int ID_Employee { get; set; }
        public int ID_Project { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public System.DateTime Deadline { get; set; }
        public Nullable<decimal> OriginalEstimate { get; set; }
        public Nullable<decimal> CompletedWork { get; set; }
        public string DocumentName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentURL { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public int OrdinalNumbers { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual Employees Employees { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Histories> Histories { get; set; }
        public virtual Projects Projects { get; set; }
    }
}
