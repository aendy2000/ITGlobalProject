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
    
    public partial class SkillOfRecruitment
    {
        public int ID { get; set; }
        public int ID_SkillsCategory { get; set; }
        public int ID_Recruitment { get; set; }
    
        public virtual Recruitment Recruitment { get; set; }
        public virtual SkillsCategory SkillsCategory { get; set; }
    }
}