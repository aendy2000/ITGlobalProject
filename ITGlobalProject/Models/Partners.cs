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
    
    public partial class Partners
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Partners()
        {
            this.Projects = new HashSet<Projects>();
        }
    
        public int ID { get; set; }
        public string Company { get; set; }
        public string Name { get; set; }
        public string IdentityCard { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public System.DateTime Birthday { get; set; }
        public string Sex { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Projects> Projects { get; set; }
    }
}
