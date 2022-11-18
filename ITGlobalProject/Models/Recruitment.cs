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
    
    public partial class Recruitment
    {
        public int ID { get; set; }
        public Nullable<int> ID_Position { get; set; }
        public string Title { get; set; }
        public int Amount { get; set; }
        public string Form { get; set; }
        public string Sex { get; set; }
        public string Experience { get; set; }
        public decimal Wage { get; set; }
        public string Skill { get; set; }
        public string JobDescription { get; set; }
        public string CandidateRequirement { get; set; }
        public string CandidateBenefits { get; set; }
        public bool Status { get; set; }
        public System.DateTime DateCreateOrPosted { get; set; }
    
        public virtual Position Position { get; set; }
    }
}