﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CP25Team06Entities : DbContext
    {
        public CP25Team06Entities()
            : base("name=CP25Team06Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Consultation> Consultation { get; set; }
        public virtual DbSet<Debts> Debts { get; set; }
        public virtual DbSet<DependencyDeduction> DependencyDeduction { get; set; }
        public virtual DbSet<Employees> Employees { get; set; }
        public virtual DbSet<Histories> Histories { get; set; }
        public virtual DbSet<Insurance> Insurance { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Partners> Partners { get; set; }
        public virtual DbSet<PaymentHistory> PaymentHistory { get; set; }
        public virtual DbSet<Payroll> Payroll { get; set; }
        public virtual DbSet<Position> Position { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<Recruitment> Recruitment { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<Tasks> Tasks { get; set; }
        public virtual DbSet<Tax> Tax { get; set; }
        public virtual DbSet<Teams> Teams { get; set; }
    }
}