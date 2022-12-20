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
    
    public partial class Employees
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Employees()
        {
            this.Comment = new HashSet<Comment>();
            this.DependentsInformation = new HashSet<DependentsInformation>();
            this.EmploymentContracts = new HashSet<EmploymentContracts>();
            this.Histories = new HashSet<Histories>();
            this.LanguagesSkills = new HashSet<LanguagesSkills>();
            this.Notification = new HashSet<Notification>();
            this.Payroll = new HashSet<Payroll>();
            this.PersonalSkills = new HashSet<PersonalSkills>();
            this.Subsidies = new HashSet<Subsidies>();
            this.Tasks = new HashSet<Tasks>();
            this.Teams = new HashSet<Teams>();
        }
    
        public int ID { get; set; }
        public int ID_Position { get; set; }
        public string Avatar { get; set; }
        public string Name { get; set; }
        public string IdentityCard { get; set; }
        public string Nationality { get; set; }
        public string MaritalStatus { get; set; }
        public System.DateTime Birthday { get; set; }
        public string Sex { get; set; }
        public string Address { get; set; }
        public string TelephoneOrther { get; set; }
        public string TelephoneMobile { get; set; }
        public string WorkEmail { get; set; }
        public string OrtherEmail { get; set; }
        public decimal Wage { get; set; }
        public string BankName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankAccountHolderName { get; set; }
        public System.DateTime JoinedDate { get; set; }
        public string EmploymentStatus { get; set; }
        public string Password { get; set; }
        public bool Lock { get; set; }
        public string Code { get; set; }
        public Nullable<System.DateTime> CodeDate { get; set; }
        public Nullable<System.DateTime> AccessHistory { get; set; }
        public bool AccountSatus { get; set; }
        public Nullable<System.DateTime> DayOff { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Comment { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DependentsInformation> DependentsInformation { get; set; }
        public virtual Position Position { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmploymentContracts> EmploymentContracts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Histories> Histories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LanguagesSkills> LanguagesSkills { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Notification> Notification { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Payroll> Payroll { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonalSkills> PersonalSkills { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Subsidies> Subsidies { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tasks> Tasks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Teams> Teams { get; set; }
    }
}
