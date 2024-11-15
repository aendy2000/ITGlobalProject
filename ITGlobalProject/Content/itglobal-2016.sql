USE [CP25Team06]
GO
/****** Object:  Table [dbo].[ApplyLeaveType]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplyLeaveType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Leave_Type] [int] NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[LeavePeriod] [int] NOT NULL,
	[Entitlement] [decimal](5, 2) NOT NULL,
 CONSTRAINT [PK_ApplyLeaveType_LeaveType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_Task] [int] NOT NULL,
	[Contents] [nvarchar](250) NOT NULL,
	[Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Consultation]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [varchar](12) NOT NULL,
	[Contents] [nvarchar](250) NOT NULL,
	[Date] [datetime] NOT NULL,
	[State] [bit] NOT NULL,
	[AcceptDate] [datetime] NULL,
 CONSTRAINT [PK_Consultation] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Debts]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Debts](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Project] [int] NOT NULL,
	[Stage] [nvarchar](50) NOT NULL,
	[Price] [money] NOT NULL,
	[Date] [date] NOT NULL,
	[State] [bit] NOT NULL,
	[Send_Email_State] [bit] NULL,
 CONSTRAINT [PK_Debts] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](200) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DependencyDeduction]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DependencyDeduction](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Price] [money] NOT NULL,
 CONSTRAINT [PK_DependencyDeduction] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DependentsInformation]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DependentsInformation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Relationship] [nvarchar](50) NOT NULL,
	[Birthday] [date] NOT NULL,
 CONSTRAINT [PK_Dependents] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Position] [int] NOT NULL,
	[Avatar] [nvarchar](max) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IdentityCard] [varchar](12) NOT NULL,
	[Nationality] [nvarchar](50) NOT NULL,
	[MaritalStatus] [nvarchar](50) NOT NULL,
	[Birthday] [date] NOT NULL,
	[Sex] [nvarchar](10) NOT NULL,
	[Address] [nvarchar](250) NULL,
	[TelephoneOrther] [nvarchar](12) NULL,
	[TelephoneMobile] [varchar](12) NOT NULL,
	[WorkEmail] [varchar](50) NOT NULL,
	[OrtherEmail] [nvarchar](50) NULL,
	[Wage] [money] NOT NULL,
	[BankName] [nvarchar](100) NULL,
	[BankAccountNumber] [varchar](50) NULL,
	[BankAccountHolderName] [nvarchar](50) NULL,
	[JoinedDate] [date] NOT NULL,
	[EmploymentStatus] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NULL,
	[Lock] [bit] NOT NULL,
	[Code] [varchar](8) NULL,
	[CodeDate] [datetime] NULL,
	[AccessHistory] [datetime] NULL,
	[AccountSatus] [bit] NOT NULL,
	[DayOff] [datetime] NULL,
	[ID_Employee] [varchar](10) NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmploymentContracts]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmploymentContracts](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[ImageURL] [nvarchar](max) NOT NULL,
	[EmploymentCategory] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_EmploymentContracts] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Histories]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Histories](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_Task] [int] NULL,
	[ID_Payroll] [int] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Contents] [nvarchar](250) NOT NULL,
	[Date] [datetime] NOT NULL,
	[ID_Projects] [int] NULL,
 CONSTRAINT [PK_Histories] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insurance]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insurance](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Percentage] [decimal](5, 2) NOT NULL,
	[Ceiling_Level] [money] NULL,
 CONSTRAINT [PK_Insurance] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LanguagesSkills]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LanguagesSkills](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Writing] [nvarchar](50) NULL,
	[Speaking] [nvarchar](50) NULL,
	[Reading] [nvarchar](50) NULL,
	[listening] [nvarchar](50) NULL,
 CONSTRAINT [PK_LanguagesSkills] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveApplication]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveApplication](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[SendDate] [datetime] NOT NULL,
	[State] [bit] NULL,
	[Contents] [nvarchar](200) NULL,
	[ResponsiveDate] [datetime] NULL,
	[Reply] [nvarchar](200) NULL,
	[ID_ApplyLeaveType] [int] NOT NULL,
	[RealLeaveDate] [decimal](5, 2) NOT NULL,
 CONSTRAINT [PK_LeaveApplication] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveDate]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveDate](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Date] [date] NOT NULL,
	[DateType] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_LeaveDate] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveType]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Sate] [bit] NOT NULL,
 CONSTRAINT [PK_LeaveType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notification](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Contents] [nvarchar](250) NOT NULL,
	[State] [bit] NOT NULL,
	[Push] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OnLeave]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OnLeave](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_LeaveDate] [int] NOT NULL,
 CONSTRAINT [PK_OnLeave] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PartnerOfProject]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartnerOfProject](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Partners] [int] NOT NULL,
	[ID_Project] [int] NOT NULL,
 CONSTRAINT [PK_PartnerOfProject] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Partners]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partners](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Company] [nvarchar](250) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Phone] [varchar](12) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Birthday] [date] NULL,
	[Sex] [nvarchar](10) NULL,
	[Address] [nvarchar](250) NULL,
	[Avatar] [nvarchar](max) NULL,
	[TaxCode] [nvarchar](50) NULL,
	[WebUrl] [nvarchar](max) NULL,
	[CompanyOrPersonal] [bit] NULL,
	[AddDate] [datetime] NULL,
	[ID_Partners] [varchar](10) NULL,
 CONSTRAINT [PK_Partners] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentHistory]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentHistory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Debts] [int] NULL,
	[Date] [datetime] NOT NULL,
	[Price] [money] NULL,
	[Contents] [nvarchar](250) NOT NULL,
	[Type] [bit] NULL,
	[OnUpdate] [bit] NULL,
	[ID_Projects] [int] NULL,
 CONSTRAINT [PK_PaymentHistory] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payroll]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payroll](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_PayrollCategory] [int] NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[Salary] [money] NOT NULL,
	[SocialInsurance] [decimal](5, 2) NOT NULL,
	[HealthInsurance] [decimal](5, 2) NOT NULL,
	[UnemploymentInsurance] [decimal](5, 2) NOT NULL,
	[InsuranceCeiling] [money] NOT NULL,
	[TotalPriceInsurance] [money] NOT NULL,
	[Tax] [decimal](5, 2) NULL,
	[TaxDeductions] [money] NULL,
	[NumberOfDependents] [int] NULL,
	[DependencyDeduction] [money] NULL,
	[FamilyAllowances] [money] NULL,
	[TaxableSalary] [money] NULL,
	[TotalPriceTax] [money] NULL,
	[NumberDaysLeave] [decimal](5, 2) NULL,
	[PriceForOneDayOff] [money] NULL,
	[Total_Price] [money] NULL,
	[State] [bit] NULL,
	[SalaryTaxable] [money] NULL,
	[SalaryInsurance] [money] NULL,
	[MissingAmount] [money] NULL,
	[TotalAllowance] [money] NULL,
 CONSTRAINT [PK_Payroll] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PayrollCategory]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PayrollCategory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Date] [date] NOT NULL,
 CONSTRAINT [PK_PayrollCategory] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonalSkills]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalSkills](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_Skills] [int] NOT NULL,
 CONSTRAINT [PK_PersonalSkills] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Position]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Position](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[ID_Department] [int] NULL,
 CONSTRAINT [PK_Position] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[ContractUrl] [nvarchar](max) NULL,
	[ID_Project] [varchar](10) NULL,
	[Lock] [bit] NULL,
 CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recruitment]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recruitment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Position] [int] NOT NULL,
	[Title] [nvarchar](250) NOT NULL,
	[Amount] [int] NOT NULL,
	[Form] [nvarchar](50) NOT NULL,
	[Sex] [nvarchar](50) NOT NULL,
	[Experience] [nvarchar](50) NOT NULL,
	[MinimumWage] [money] NOT NULL,
	[JobDescription] [nvarchar](max) NOT NULL,
	[CandidateRequirement] [nvarchar](max) NOT NULL,
	[CandidateBenefits] [nvarchar](max) NOT NULL,
	[Status] [bit] NOT NULL,
	[DateCreateOrPosted] [datetime] NOT NULL,
	[Views] [bigint] NOT NULL,
	[MaximumWage] [money] NOT NULL,
	[CVSubmissionDeadline] [date] NOT NULL,
 CONSTRAINT [PK_Recruitment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SkillOfRecruitment]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SkillOfRecruitment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Skills] [int] NOT NULL,
	[ID_Recruitment] [int] NOT NULL,
 CONSTRAINT [PK_SkillOfRecruitment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Skills]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Skills](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[ID_SkillsCategory] [int] NOT NULL,
 CONSTRAINT [PK_CategorySkills] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SkillsCategory]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SkillsCategory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_SkillsCategory] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subsidies]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subsidies](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_SubsidiesCategory] [int] NOT NULL,
 CONSTRAINT [PK_Subsidies] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubsidiesApply]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubsidiesApply](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Payroll] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Price] [money] NOT NULL,
	[Percentage] [decimal](5, 2) NULL,
	[OnBasicSalary] [bit] NULL,
	[Date_Apply] [int] NOT NULL,
	[Tax] [bit] NULL,
	[Insurance] [bit] NULL,
	[Total_Price] [money] NULL,
 CONSTRAINT [PK_SubsidiesApply] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubsidiesCategory]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubsidiesCategory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Price] [money] NOT NULL,
	[Percentage] [decimal](5, 2) NULL,
	[OnBasicSalary] [bit] NULL,
	[DateApply] [int] NOT NULL,
	[Tax] [bit] NULL,
	[Insurance] [bit] NULL,
 CONSTRAINT [PK_SubsidiesCategory] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_Project] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[State] [nvarchar](50) NOT NULL,
	[Deadline] [datetime] NOT NULL,
	[OriginalEstimate] [decimal](14, 4) NULL,
	[CompletedWork] [decimal](14, 4) NULL,
	[DocumentName] [nvarchar](50) NULL,
	[DocumentType] [varchar](10) NULL,
	[DocumentURL] [nvarchar](max) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[OrdinalNumbers] [int] NOT NULL,
 CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tax]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tax](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MinPrice] [money] NOT NULL,
	[MaxPrice] [money] NOT NULL,
	[Percentage] [decimal](5, 2) NOT NULL,
	[Deductible] [money] NOT NULL,
 CONSTRAINT [PK_Tax] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teams]    Script Date: 11/11/2024 14:22:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teams](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_Employee] [int] NOT NULL,
	[ID_Project] [int] NOT NULL,
 CONSTRAINT [PK_Teams] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ApplyLeaveType] ON 

INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (31, 4, 2, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (32, 4, 3, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (33, 4, 4, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (34, 4, 5, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (35, 4, 6, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (36, 4, 7, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (37, 4, 8, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (38, 4, 9, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (39, 4, 13, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (40, 4, 14, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (41, 4, 15, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (42, 4, 16, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (43, 4, 17, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (44, 4, 18, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (45, 4, 19, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (46, 4, 20, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (47, 4, 21, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (48, 4, 22, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (49, 4, 23, 2023, CAST(2.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (50, 4, 25, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (51, 1, 2, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (52, 1, 3, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (53, 1, 4, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (54, 1, 5, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (55, 1, 6, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (56, 1, 7, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (57, 1, 8, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (58, 1, 9, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (59, 1, 13, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (60, 1, 14, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (61, 1, 15, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (62, 1, 16, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (63, 1, 17, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (64, 1, 18, 2023, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (65, 1, 19, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (66, 1, 20, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (67, 1, 21, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (68, 1, 22, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (69, 1, 23, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (70, 1, 25, 2023, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (71, 8, 2, 2023, CAST(2.50 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (72, 12, 5, 2023, CAST(12.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (73, 8, 16, 2023, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (74, 12, 18, 2023, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (75, 8, 3, 2023, CAST(2.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (76, 3, 18, 2023, CAST(2.50 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (77, 2, 18, 2023, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (78, 12, 3, 2023, CAST(1.75 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (79, 12, 6, 2023, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (80, 4, 2, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (81, 4, 3, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (82, 4, 4, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (83, 4, 5, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (84, 4, 6, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (85, 4, 7, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (86, 4, 8, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (87, 4, 9, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (88, 4, 13, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (89, 4, 14, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (90, 4, 15, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (91, 4, 16, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (92, 4, 17, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (93, 4, 18, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (94, 4, 19, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (95, 4, 20, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (96, 4, 21, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (97, 4, 22, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (98, 4, 25, 2024, CAST(30.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (99, 17, 2, 2024, CAST(5.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (100, 17, 3, 2024, CAST(5.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (101, 17, 4, 2024, CAST(5.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (102, 17, 2, 2023, CAST(5.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (103, 17, 3, 2023, CAST(10.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (104, 17, 4, 2023, CAST(10.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (105, 4, 26, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (106, 4, 27, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (107, 4, 28, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (108, 4, 29, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (109, 4, 30, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (110, 4, 31, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (111, 4, 32, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (112, 4, 33, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (113, 4, 34, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (114, 4, 35, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (115, 4, 36, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (116, 4, 37, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (117, 18, 2, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (118, 18, 3, 2023, CAST(50.00 AS Decimal(5, 2)))
INSERT [dbo].[ApplyLeaveType] ([ID], [ID_Leave_Type], [ID_Employee], [LeavePeriod], [Entitlement]) VALUES (119, 18, 4, 2023, CAST(50.00 AS Decimal(5, 2)))
SET IDENTITY_INSERT [dbo].[ApplyLeaveType] OFF
GO
SET IDENTITY_INSERT [dbo].[Comment] ON 

INSERT [dbo].[Comment] ([ID], [ID_Employee], [ID_Task], [Contents], [Date]) VALUES (29, 1, 41, N'Ok', CAST(N'2023-04-23T18:22:40.600' AS DateTime))
INSERT [dbo].[Comment] ([ID], [ID_Employee], [ID_Task], [Contents], [Date]) VALUES (30, 2, 43, N'Ok', CAST(N'2023-05-01T17:41:34.703' AS DateTime))
INSERT [dbo].[Comment] ([ID], [ID_Employee], [ID_Task], [Contents], [Date]) VALUES (31, 1, 55, N'Ok', CAST(N'2023-06-09T20:01:21.743' AS DateTime))
INSERT [dbo].[Comment] ([ID], [ID_Employee], [ID_Task], [Contents], [Date]) VALUES (32, 1, 57, N'Ok', CAST(N'2023-06-10T10:47:04.777' AS DateTime))
SET IDENTITY_INSERT [dbo].[Comment] OFF
GO
SET IDENTITY_INSERT [dbo].[Consultation] ON 

INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (3, N'Công Danh', N'danh@gmail.com', N'0903012303', N'Bên mình có làm dự án website không', CAST(N'2023-03-02T09:16:25.953' AS DateTime), 1, CAST(N'2023-03-10T22:08:04.390' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (4, N'Công Danh', N'danh@gmail.com', N'0903012303', N'Bên mình có làm dự án website không', CAST(N'2023-03-02T09:16:59.007' AS DateTime), 1, CAST(N'2023-03-02T09:17:39.680' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (5, N'Công Danh', N'danh@gmail.com', N'0903012303', N'Bên mình có làm dự án website không', CAST(N'2023-03-02T09:17:22.843' AS DateTime), 1, CAST(N'2023-03-02T09:17:37.353' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (6, N'Nguyễn Huy Hoàng', N'drakestar1511@gmail.com', N'0979217375', N'Tôi muốn mua phần mêm IT', CAST(N'2023-03-23T14:53:03.977' AS DateTime), 1, CAST(N'2023-03-28T14:55:59.823' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (7, N'Nguyễn Thiện Thanh', N'Thienthanh@gmail.com', N'013123123', N'Làm cho cái website dũ trụ đi', CAST(N'2023-04-07T17:23:38.933' AS DateTime), 1, CAST(N'2023-04-07T17:25:05.277' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (8, N'Nguyễn Thiện Thanh', N'Thienthanh@gmail.com', N'013123123', N'Làm cho cái website dũ trụ đi', CAST(N'2023-04-07T17:24:47.777' AS DateTime), 1, CAST(N'2023-04-07T17:25:00.073' AS DateTime))
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (10, N'Nguyễn Hiếu Nhân', N'hieunhann42@gmail.com', N'0913597402', N'Tui muốn thuê code 1 website', CAST(N'2023-04-17T10:34:54.593' AS DateTime), 0, NULL)
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (11, N'Nguyễn Hiếu Nhân', N'hieunhann42@gmail.com', N'0913597402', N'Tôi muốn thuê code', CAST(N'2023-04-17T10:52:06.740' AS DateTime), 0, NULL)
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (12, N'Nguyễn Hiếu Nhân', N'hieunhann42@gmail.com', N'09135974', N'Tôi muốn thuê code hahaa', CAST(N'2023-04-17T10:54:00.437' AS DateTime), 0, NULL)
INSERT [dbo].[Consultation] ([ID], [Name], [Email], [Phone], [Contents], [Date], [State], [AcceptDate]) VALUES (14, N'Đặng Văn Tuấn', N'dnguyenhoang94@gmail.com', N'+84367909248', N'Tạo website', CAST(N'2023-06-10T10:48:42.060' AS DateTime), 0, NULL)
SET IDENTITY_INSERT [dbo].[Consultation] OFF
GO
SET IDENTITY_INSERT [dbo].[Debts] ON 

INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (44, 27, N'Giai đoạn 1', 15000000.0000, CAST(N'2023-04-25' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (45, 29, N'Giai đoạn 1', 150000000.0000, CAST(N'2023-05-04' AS Date), 1, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (46, 30, N'Giai đoạn 1', 120000000.0000, CAST(N'2023-05-31' AS Date), 1, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (47, 30, N'Giai đoạn 2', 2200000.0000, CAST(N'2023-06-01' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (48, 31, N'Giai đoạn 1', 100000000.0000, CAST(N'2023-05-31' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (49, 32, N'Giai đoạn 1', 20000000.0000, CAST(N'2023-05-31' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (50, 33, N'Giai đoạn 1', 100000000.0000, CAST(N'2023-05-26' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (51, 33, N'Giai đoạn 2', 10000000.0000, CAST(N'2023-05-27' AS Date), 0, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (52, 34, N'Giai đoạn 1', 25000000.0000, CAST(N'2023-06-30' AS Date), 1, 0)
INSERT [dbo].[Debts] ([ID], [ID_Project], [Stage], [Price], [Date], [State], [Send_Email_State]) VALUES (53, 34, N'Giai đoạn 2', 40000000.0000, CAST(N'2023-07-15' AS Date), 0, 0)
SET IDENTITY_INSERT [dbo].[Debts] OFF
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([ID], [Name], [Description]) VALUES (2, N'Phát Triển Phần Mềm', N'Đội ngũ phát triển phần mềm, có nhiệm vụ theo dõi, quản lý hệ thống IT của các doanh nghiệp như bảo trì hệ thống IT.')
INSERT [dbo].[Department] ([ID], [Name], [Description]) VALUES (3, N'Kinh Doanh', N'Chịu trách nhiệm cho việc nghiên cứu, phát triển và bán sản phẩm hoặc dịch vụ. Bao gồm một nhóm các nhân viên với chuyên môn khác nhau cùng làm việc xây dựng và duy trì mối quan hệ với khách hàng.')
INSERT [dbo].[Department] ([ID], [Name], [Description]) VALUES (4, N'Truyền Thông', N'Bộ phận giữ vai trò quan trọng trong việc mang thương hiệu doanh nghiệp đến với khách hàng tiềm năng, cũng như quản lý các hoạt động truyền thông của doanh nghiệp.')
INSERT [dbo].[Department] ([ID], [Name], [Description]) VALUES (6, N'Kế Toán', N'Chịu trách nhiệm chính trong việc quản lý sổ sách kế toán của công ty và giải quyết các thủ tục tài chính, đối chiếu báo cáo ngân hàng và hạch toán các khoản chi phí, khấu hao, thuế, thu nhập.')
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[DependencyDeduction] ON 

INSERT [dbo].[DependencyDeduction] ([ID], [Name], [Price]) VALUES (1, N'Khấu trừ phụ thuộc', 4400000.0000)
INSERT [dbo].[DependencyDeduction] ([ID], [Name], [Price]) VALUES (2, N'Giảm trừ gia cảnh', 11000000.0000)
SET IDENTITY_INSERT [dbo].[DependencyDeduction] OFF
GO
SET IDENTITY_INSERT [dbo].[DependentsInformation] ON 

INSERT [dbo].[DependentsInformation] ([ID], [ID_Employee], [Name], [Relationship], [Birthday]) VALUES (4, 8, N'Đặng Đình Phú', N'Anh em ruột', CAST(N'2005-03-09' AS Date))
INSERT [dbo].[DependentsInformation] ([ID], [ID_Employee], [Name], [Relationship], [Birthday]) VALUES (7, 2, N'Đặng Văn Tâm', N'Anh trai', CAST(N'1996-04-17' AS Date))
SET IDENTITY_INSERT [dbo].[DependentsInformation] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 

INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (1, 1, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fg9njawxc5k2iou1ayua74daft7m9fllien-he-voi-chung-toi.jpg?alt=media&token=772bb771-13b1-4535-acb1-629aa4e472c6', N'Nguyễn Minh Tân', N'089201822382', N'Việt Nam', N'Độc thân', CAST(N'1993-09-10' AS Date), N'Nam', N'Số 2 đường số 10, khu dân cư Vĩnh Lộc, Phường Bình Hưng Hòa B, Quận Bình Tân, TP Vinh', N'', N'2222 222 222', N'info@it-global.net', N'', 0.0000, N'', N'', N'', CAST(N'2022-11-27' AS Date), N'Quản Trị', N'AdminAdmin.123', 0, N'', NULL, NULL, 1, NULL, NULL)
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (2, 2, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F6frlome1ec1nj62cldqttq2iudihti123.png?alt=media&token=497dcf7b-2ebc-4de9-ae63-fab1fb5984be', N'Đặng Văn Tuấn', N'070200001651', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'Tổ 6 Khu Phố 2, Thị Trấn Tân Khai, Huyện Hớn Quản, Tỉnh Bình Phước', N'0326 561 654', N'0367 909 248', N'tuan.197pm21996@vanlanguni.vn', N'tuan112@gmail.com', 18000000.0000, N'Vietcombank', N'107868621954', N'DANG VAN TUAN', CAST(N'2023-01-10' AS Date), N'Nhân viên chính thức', N'ADmin.123', 0, N'222113', CAST(N'2023-04-27T22:52:35.580' AS DateTime), NULL, 1, NULL, N'NV00000002')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (3, 3, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fljbvqsrmyg2h8uhongr5whe1oiyvllanh-meme-meo-hoi-cham.jpg?alt=media&token=83883811-d587-442e-aab2-c9f7210feb8d', N'Nguyễn Thanh Thiện', N'215538610346', N'Việt Nam', N'Độc thân', CAST(N'2023-01-22' AS Date), N'Nam', N'32 đường số 10, khu phố 2, Hiệp Bình Chánh, Thủ Đức', N'', N'0335 924 075', N'thien.197pm21986@vanlanguni.vn', N'', 5000000.0000, N'Vietcombank', N'123123123123123', N'NGUYỄN THANH THIỆN', CAST(N'2023-01-15' AS Date), N'Thực tập sinh', N'Ththien.123', 0, NULL, NULL, NULL, 1, NULL, N'NV00000003')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (4, 3, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fqe5l6b1g37pc3beurcfl5wehehz8pvttxvn_messi1.jpg?alt=media&token=2a2fd953-03f5-49f0-8ad8-8e992297885a', N'Bùi Công Danh', N'051200380012', N'Việt Nam', N'Độc thân', CAST(N'2001-01-25' AS Date), N'Nam', N'123 Dương Quảng Hàm', N'0903 318 393', N'0903 318 393', N'congdanh28052000@gmail.com', N'congdanh123@gmail.com', 15000000.0000, N'Vietcombank', N'060224439409', N'BUI CONG DANH', CAST(N'2023-01-05' AS Date), N'Thực tập sinh', N'Admin.123', 0, N'883570', CAST(N'2023-04-03T16:37:42.053' AS DateTime), NULL, 1, NULL, N'NV00000004')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (5, 3, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fmvttdx2hzntmdfqs94yed0c1de9iughinh5-6.jpg?alt=media&token=bbf4a78d-b293-4d40-ac6a-0f36c64e1234', N'Đặng Văn Tuấn', N'070200001847', N'Việt Nam', N'Độc thân', CAST(N'2023-01-24' AS Date), N'Nữ', N'', N'', N'0367 948 583', N'dangtuan3025@yahoo.com', N'', 30000000.0000, N'', N'', N'', CAST(N'2023-01-18' AS Date), N'Thực tập sinh', N'Admin.123', 0, N'255216', CAST(N'2023-04-27T22:50:28.773' AS DateTime), NULL, 1, NULL, N'NV00000005')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (6, 2, N'', N'Đặng Văn Tuấn', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 248', N'danh.197pm21900@vanlanguni.vn', N'', 35000000.0000, N'', N'', N'', CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'Admin.123', 0, NULL, NULL, NULL, 1, NULL, N'NV00000006')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (7, 2, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fbcj8rhv5lzyikfrut30qwge1b919kubernd-dittrich-jG-jFEyKnqY-unsplash%20%281%29.jpg?alt=media&token=cc304ab1-86dd-42ef-a3c9-a47b01267a01', N'Bùi Công Danh', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-11' AS Date), N'Nam', N'', N'', N'0367 909 248', N'buicongdanh2805@gmail.com', N'', 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'Admin.123', 0, N'605058', CAST(N'2023-04-03T16:37:28.930' AS DateTime), NULL, 1, NULL, N'NV00000007')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (8, 2, N'', N'Đặng Văn Tuấn', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 248', N'danh.197pm21900@gmail.com', N'', 40000000.0000, N'VietinBank', N'2022105154', N'DANG VAN TUAN', CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'zb5g9CbuLr', 0, NULL, NULL, NULL, 0, NULL, N'NV00000008')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (9, 2, NULL, N'Ngô Thanh Dũng', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'ngothanhdung@gmail.com', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'rEX1oCmZGG', 0, NULL, NULL, NULL, 0, NULL, N'NV00000009')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (13, 2, NULL, N'Lê Tuấn Khang', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'khang.197pm21936@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'yvHSSvGzby', 0, NULL, NULL, NULL, 0, NULL, N'NV00000013')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (14, 2, NULL, N'Nguyễn Hiếu Nhân', N'070288372312', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909241', N'nhan.197pm21926@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'DFZBk6X4vn', 0, NULL, NULL, NULL, 0, NULL, N'NV00000014')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (15, 2, N'', N'Nguyễn Huy Hoàng', N'070288372821', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 242', N'hoang.197pm21925@vanlanguni.vn', N'', 30000000.0000, N'', N'', N'', CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'Ti8O3WZQDG', 0, N'868012', CAST(N'2023-03-31T14:06:51.417' AS DateTime), NULL, 0, NULL, N'NV00000015')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (16, 2, NULL, N'Dang Van Tuan', N'983726873287', N'Việt Nam', N'Độc thân', CAST(N'2013-03-13' AS Date), N'Nam', N'', N'', N'0938 273 827', N'hhhhh@tuan.com', N'', 29800001.0000, N'', N'', N'', CAST(N'2023-03-15' AS Date), N'Nhân viên chính thức', N'rvFW2aY3K9', 0, NULL, NULL, NULL, 0, NULL, N'NV00000016')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (17, 2, NULL, N'Nguyễn Trần Khương', N'123897129371', N'VN', N'Độc thân', CAST(N'2023-03-16' AS Date), N'Nam', N'', N'', N'0376 237 623', N'sjahdjas@tun.123', N'', 3000000.0000, N'', N'', N'', CAST(N'2023-03-17' AS Date), N'Nhân viên chính thức', N'3XHLglmXBw', 0, NULL, NULL, NULL, 0, NULL, N'NV00000017')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (18, 2, N'', N'Lê Thị Lợi', N'158745669232', N'VN', N'Độc thân', CAST(N'2023-03-14' AS Date), N'Nữ', N'', N'', N'0458 963 223', N'loi.197pm09475@vanlanguni.vn', N'', 10000000.0000, N'', N'', N'', CAST(N'2023-03-22' AS Date), N'Thực tập sinh', N'Thiloi123456*', 0, NULL, NULL, NULL, 1, NULL, N'NV00000018')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (19, 6, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fgq0yj0omeqqn31bcel40d1w7uvfc6kba1f4df1612320782d980352d3031c05.png?alt=media&token=77d973e1-fe83-4dd6-9f1d-87f711051794', N'Nguyễn Huy Hoàng', N'478675212323', N'Việt Nam', N'Độc thân', CAST(N'2004-03-09' AS Date), N'Nam', N'', N'', N'0979 217 375', N'drakestar1511@gmail.com', N'', 4000000.0000, N'BIDV', N'65110002694343', N'NGUYEN HUY HOANG', CAST(N'2022-12-12' AS Date), N'Nhân viên chính thức', N'Admin.123', 0, N'380552', CAST(N'2023-05-25T01:43:37.183' AS DateTime), NULL, 1, NULL, N'NV00000019')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (20, 3, N'', N'Lê Hiếu', N'123486165156', N'Việt Nam', N'Độc thân', CAST(N'2001-04-18' AS Date), N'Nam', N'32 Hoàng Diệu, Gò Vấp, TPHCM', N'0262 616 161', N'0387 123 522', N'huyhoang2@itglobal.net', N'huyhoang@gmail.com', 30000000.0000, N'ACB', N'013565264656', N'NGUYỄN HUY HOÀNG', CAST(N'2023-04-10' AS Date), N'Thực tập sinh', N'iYMdBHMVEZ', 0, NULL, NULL, NULL, 0, NULL, N'NV00000020')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (21, 5, N'', N'Nguyễn Huy Hoàng', N'123486165156', N'Việt Nam', N'Độc thân', CAST(N'2001-04-18' AS Date), N'Nam', N'32 Hoàng Diệu, Gò Vấp, TPHCM', N'0262 616 161', N'0381 546 546', N'huyhoang1132@it-global.net', N'huyhoang@gmail.com', 30000000.0000, N'ACB', N'013565264656', N'NGUYỄN HUY HOÀNG', CAST(N'2023-04-10' AS Date), N'Thực tập sinh', N'uJeVGclT9L', 0, NULL, NULL, NULL, 0, NULL, N'NV00000021')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (22, 2, N'', N'Nguyễn Tuấn', N'542523423423', N'Việt Nam', N'Khác', CAST(N'2010-04-08' AS Date), N'Nam', N'', N'', N'0357 872 362', N'tuan@sdsd.com', N'', 30000000.0000, N'', N'', N'', CAST(N'2023-04-17' AS Date), N'Nhân viên chính thức', N'2zbLLLaSg3', 0, NULL, NULL, NULL, 0, NULL, N'NV00000022')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (23, 2, N'', N'Nguyễn Huy Hoàng', N'070288372821', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 242', N'hoang.197pm21936@vanlanguni.vn', N'', 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'JszLJU7FMR', 1, NULL, NULL, NULL, 0, CAST(N'2023-05-25T11:59:15.573' AS DateTime), N'NV00000023')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (24, 3, N'', N'Bùi Công Danh', N'123123123123', N'Việt Nam', N'Đã kết hôn', CAST(N'2023-05-02' AS Date), N'Nam', N'123', N'1231 231 231', N'1231 231 231', N'it@gmail.com', N'it@gmail.com', 10000000.0000, N'', N'', N'', CAST(N'2023-05-16' AS Date), N'Thực tập sinh', N'zA71EUbu4a', 1, NULL, NULL, NULL, 0, CAST(N'2023-05-25T10:52:22.457' AS DateTime), N'NV00000024')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (25, 2, N'', N'Đặng Văn Tuấn', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 248', N'buicongdanh2800@gmail.com', N'', 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'YwadTDrdln', 0, NULL, NULL, NULL, 0, NULL, N'NV00000025')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (26, 6, NULL, N'Lê Tuấn Khang', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'khang.197pm219362@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2023-06-04' AS Date), N'Nhân viên chính thức', N'aGTLBp2WWg', 0, NULL, NULL, NULL, 0, NULL, N'NV00000026')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (27, 2, NULL, N'Bùi Công Thanh', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21991@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'7ieLi40kY6', 0, NULL, NULL, NULL, 0, NULL, N'NV00000027')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (28, 2, NULL, N'Lê Hữu Hiệp', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21992@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'wgvAdGHZLy', 0, NULL, NULL, NULL, 0, NULL, N'NV00000028')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (29, 2, NULL, N'Lê Văn Hùng', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21993@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'2b2RjRIrS6', 0, NULL, NULL, NULL, 0, NULL, N'NV00000029')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (30, 2, NULL, N'Lê Huy Hoàng', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21994@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'pGs831knA2', 0, NULL, NULL, NULL, 0, NULL, N'NV00000030')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (31, 2, NULL, N'Trần Quốc Nam', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21995@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'zTNZWdaOHG', 0, NULL, NULL, NULL, 0, NULL, N'NV00000031')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (32, 2, NULL, N'Nguyễn Tân Duy', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21997@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'0imIuspRBs', 0, NULL, NULL, NULL, 0, NULL, N'NV00000032')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (33, 2, NULL, N'Đặng Thị Minh', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21998@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'Mknlnuta3e', 0, NULL, NULL, NULL, 0, NULL, N'NV00000033')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (34, 2, N'', N'Võ Nhật Minh', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 248', N'minh.197pm21999@vanlanguni.vn', N'', 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'PxBPVxW7g9', 0, NULL, NULL, NULL, 0, NULL, N'NV00000034')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (35, 2, NULL, N'Lê Hữu Việt', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'tuan.197pm21990@vanlanguni.vn', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'I9jwgI8BlA', 0, NULL, NULL, NULL, 0, NULL, N'NV00000035')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (36, 2, N'', N'Nguyễn Thành Luân', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', N'', N'', N'0367 909 248', N'luan.197pm21981@vanlanguni.vn', N'', 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'MRGPAYcCgs', 0, NULL, NULL, NULL, 0, NULL, N'NV00000036')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (37, 2, NULL, N'Lê Thành Khang', N'070288372732', N'Việt Nam', N'Độc thân', CAST(N'2000-10-30' AS Date), N'Nam', NULL, NULL, N'0367909248', N'buicongdanh@gmail.com', NULL, 30000000.0000, NULL, NULL, NULL, CAST(N'2022-06-12' AS Date), N'Nhân viên chính thức', N'EAZA8XCj0y', 0, NULL, NULL, NULL, 0, NULL, N'NV00000037')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (38, 2, N'', N'Nguyễn Minh Khai', N'070273672563', N'Việt Nam', N'Độc thân', CAST(N'2001-06-13' AS Date), N'Nam', N'', N'', N'0736 265 323', N'qbz35691@zbock.com', N'', 25000000.0000, N'', N'', N'', CAST(N'2023-06-09' AS Date), N'Nhân viên chính thức', N'Admin.123', 1, NULL, NULL, NULL, 1, CAST(N'2023-06-09T19:35:59.610' AS DateTime), N'NV00000038')
INSERT [dbo].[Employees] ([ID], [ID_Position], [Avatar], [Name], [IdentityCard], [Nationality], [MaritalStatus], [Birthday], [Sex], [Address], [TelephoneOrther], [TelephoneMobile], [WorkEmail], [OrtherEmail], [Wage], [BankName], [BankAccountNumber], [BankAccountHolderName], [JoinedDate], [EmploymentStatus], [Password], [Lock], [Code], [CodeDate], [AccessHistory], [AccountSatus], [DayOff], [ID_Employee]) VALUES (39, 2, N'', N'Đặng Văn Tuấn', N'070200302836', N'Việt Nam', N'Độc thân', CAST(N'2001-06-05' AS Date), N'Nam', N'', N'', N'0367 909 240', N'itglobaltestuser@gmail.com', N'', 30000000.0000, N'', N'', N'', CAST(N'2023-06-11' AS Date), N'Nhân viên chính thức', N'alCQlUXoRw', 0, NULL, NULL, NULL, 0, NULL, N'NV00000039')
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET IDENTITY_INSERT [dbo].[EmploymentContracts] ON 

INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (1, 3, CAST(N'2023-01-15' AS Date), NULL, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F92sfqvdykyk8slnbdzz4pzr6o7kp2ahinh-nen-co-trang-toa-nha-tren-hon-nui-giua-bien_024810982.jpg?alt=media&token=740a3414-6d0d-4a49-a96b-b261e605fb76', N'Hợp đồng vô thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (2, 4, CAST(N'2023-01-11' AS Date), CAST(N'2023-05-10' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F3d8t06alrltwke851imgcm9obea4j9mau-hop-dong-1_1610151059.jpg?alt=media&token=7deb5a7e-15f6-4dc7-8de6-89ae14dd003c', N'Hợp đồng có thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (4, 17, CAST(N'2023-03-20' AS Date), CAST(N'2023-03-30' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F22zn7euon9w5n2v1votcfox0fzr6aebaigiai_baitapnhom.pdf?alt=media&token=61a540c2-a1eb-49e6-a40a-3ef64d57ceef', N'Hợp đồng có thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (5, 18, CAST(N'2023-03-07' AS Date), CAST(N'2023-03-29' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F4z9qz2pl3i8p9rn122u7o9darhj9a7ThongTinCanTraoDoi.pdf?alt=media&token=14e2e75c-0c6b-468b-8cbc-025c62e2ed3e', N'Hợp đồng có thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (6, 2, CAST(N'2023-03-29' AS Date), NULL, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fss6rhjp8ouw1d96sl8nc7bcwr7hcvtPL%C4%90C-3chuongcuoi.pdf?alt=media&token=f5801ec4-70c8-4e21-9922-ef899fb3a3e5', N'Hợp đồng vô thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (7, 20, CAST(N'2023-04-07' AS Date), CAST(N'2023-05-27' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fby4of0zcje0crz1thr0o8mxkndofzsbo-cau-hoi.pdf?alt=media&token=ea9c30f8-b350-4eb5-9bbe-235d3eb3ed0c', N'Hợp đồng có thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (8, 21, CAST(N'2023-04-07' AS Date), CAST(N'2023-05-27' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Ffqoft8kgfgyir7w4piukptxrbp974tbo-cau-hoi.pdf?alt=media&token=80be8017-f9e8-448e-af9d-93f4936b2ae1', N'Hợp đồng có thời hạn')
INSERT [dbo].[EmploymentContracts] ([ID], [ID_Employee], [StartDate], [EndDate], [ImageURL], [EmploymentCategory]) VALUES (9, 39, CAST(N'2023-06-10' AS Date), NULL, N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fi68o7y3cu01vwlh1l2dy4r2b0x2fq9CV_197PM21996_DangVanTuan.pdf?alt=media&token=69f58388-1d38-4332-bd5f-4b42de860292', N'Hợp đồng vô thời hạn')
SET IDENTITY_INSERT [dbo].[EmploymentContracts] OFF
GO
SET IDENTITY_INSERT [dbo].[Histories] ON 

INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1110, 1, NULL, NULL, N'Tạo Dự Án', N'đã khởi tạo dự án: Dự án', CAST(N'2023-04-21T19:57:57.047' AS DateTime), 27)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1111, 1, 41, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-04-23T18:22:05.653' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1112, 1, 41, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-04-23T18:22:08.553' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1113, 1, 41, NULL, N'Bình Luận Công Việc', N'đã viết một bình luận Công việc', CAST(N'2023-04-23T18:22:40.623' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1114, 1, 41, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-04-23T18:22:57.740' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1115, 1, 41, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin và hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-04-23T18:23:09.610' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1117, 2, NULL, 35, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Đặng Văn Tuấn', CAST(N'2023-04-29T17:21:10.353' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1118, 3, NULL, 36, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-04-29T17:21:10.430' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1119, 4, NULL, 37, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Bùi Công Danh', CAST(N'2023-04-29T17:21:10.493' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1120, 17, NULL, 38, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Nguyễn Trần Khương', CAST(N'2023-04-29T17:21:10.523' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1121, 18, NULL, 39, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Lợi', CAST(N'2023-04-29T17:21:10.587' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1122, 21, NULL, 41, N'Tính Lại Lương Tháng 04, 2023', N'Đã thực hiện tính lại tiền lương tháng 04, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-04-29T17:21:10.650' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1123, 1, 42, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-04-29T17:33:37.310' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1124, 1, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-04-29T17:33:40.217' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1125, 1, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-04-29T17:33:41.890' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1126, 1, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-04-29T17:33:43.170' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1127, 1, 43, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-04-29T23:42:29.053' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1128, 1, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã đặt trạng thái Công việc | thành "Chưa Thực Hiện"', CAST(N'2023-04-29T23:42:31.390' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1129, 2, NULL, 44, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-01T16:51:29.160' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1130, 3, NULL, 45, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-01T16:51:29.623' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1131, 4, NULL, 46, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-01T16:51:29.827' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1132, 17, NULL, 47, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-01T16:51:29.927' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1133, 18, NULL, 48, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Lợi', CAST(N'2023-05-01T16:51:30.083' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1134, 20, NULL, 49, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-01T16:51:30.193' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1135, 21, NULL, 50, N'Tính Lương Tháng 05, 2023', N'Đã thực hiện tính tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-01T16:51:30.337' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1136, 2, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-01T17:41:24.077' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1137, 2, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-01T17:41:25.587' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1138, 2, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-01T17:41:26.603' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1139, 2, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-01T17:41:27.620' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1140, 2, 43, NULL, N'Bình Luận Công Việc', N'đã viết một bình luận Công việc', CAST(N'2023-05-01T17:41:34.973' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1141, 2, 43, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-05-01T17:41:36.367' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1142, 1, 44, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-05T12:56:56.993' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1143, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-05T13:01:15.877' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1144, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-05T13:01:15.957' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1145, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-05T13:01:16.017' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1146, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-05T13:01:16.050' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1147, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lợi', CAST(N'2023-05-05T13:01:16.097' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1148, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-05T13:01:16.127' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1149, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-05T13:01:16.190' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1158, 1, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-13T15:16:36.190' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1159, 1, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-13T15:16:46.130' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1160, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-15T14:08:14.490' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1161, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-15T14:08:14.613' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1162, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-15T14:08:14.693' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1163, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-15T14:08:14.723' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1164, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-15T14:08:14.770' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1165, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:08:14.803' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1166, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:08:14.850' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1167, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-15T14:11:49.557' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1168, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-15T14:11:49.620' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1169, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-15T14:11:49.637' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1170, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-15T14:11:49.683' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1171, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:11:49.697' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1172, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:11:49.743' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1173, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-15T14:14:13.840' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1174, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-15T14:14:13.890' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1175, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-15T14:14:13.933' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1176, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-15T14:14:13.950' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1177, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-15T14:14:13.997' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1178, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:14:14.030' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1179, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:14:14.077' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1180, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-15T14:16:20.937' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1181, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-15T14:16:21.000' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1182, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-15T14:16:21.047' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1183, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-15T14:16:21.080' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1184, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-15T14:16:21.127' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1185, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:16:21.157' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1186, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:16:21.203' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1187, 4, NULL, 31, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Bùi Công Danh', CAST(N'2023-05-15T14:31:59.190' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1188, 17, NULL, 32, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Nguyễn Trần Khương', CAST(N'2023-05-15T14:32:04.033' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1189, 18, NULL, 33, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Thị Lợi', CAST(N'2023-05-15T14:32:08.270' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1190, 20, NULL, 42, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:32:12.020' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1191, 21, NULL, 43, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Nguyễn Huy Hoàng', CAST(N'2023-05-15T14:32:16.113' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1193, 1, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-15T20:25:59.937' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1194, 1, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-15T20:26:39.380' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1195, 1, NULL, NULL, N'Loại Bỏ Công Việc', N'đã loại bỏ Công việc: Giao diện  người dùng', CAST(N'2023-05-15T20:33:48.893' AS DateTime), 30)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1196, 1, NULL, NULL, N'Loại Bỏ Công Việc', N'đã loại bỏ Công việc: Giao diện admin', CAST(N'2023-05-15T20:39:24.507' AS DateTime), 30)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1197, 1, 47, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-15T20:44:09.907' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1198, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-15T20:44:14.357' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1199, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-15T20:44:40.610' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1200, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã đặt trạng thái Công việc | thành "Chưa Thực Hiện"', CAST(N'2023-05-15T20:44:44.540' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1201, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-15T20:44:47.560' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1202, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-15T20:44:50.513' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1203, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-15T20:45:01.560' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1204, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-15T20:45:24.390' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1205, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-15T20:45:28.997' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1206, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã đặt trạng thái Công việc | thành "Chưa Thực Hiện"', CAST(N'2023-05-15T20:45:32.720' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1207, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-15T20:45:42.157' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1208, 1, 47, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-15T20:45:57.143' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1209, 1, 48, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-19T16:47:32.503' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1210, 1, 48, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-19T16:47:35.063' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1211, 1, 49, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-19T16:48:26.267' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1212, 1, 49, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-19T16:48:28.673' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1213, 2, NULL, 44, N'Thanh Toán Lương Tháng 05, 2023', N'Đã hoàn tất thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-05-20T20:12:48.023' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1214, 2, NULL, 34, N'Tính Lại Lương Tháng 03, 2023', N'Đã thực hiện tính lại tiền lương tháng 03, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-22T22:27:28.400' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1215, 3, NULL, 30, N'Tính Lại Lương Tháng 03, 2023', N'Đã thực hiện tính lại tiền lương tháng 03, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-22T22:27:28.537' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1216, 2, NULL, 34, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-05-22T22:27:48.757' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1217, 3, NULL, 30, N'Thanh Toán Lương Tháng 03, 2023', N'Đã hoàn tất thanh toán tiền lương cho Nguyễn Thanh Thiện', CAST(N'2023-05-22T22:28:00.750' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1218, 2, NULL, 44, N'Hủy Thanh Toán Lương Tháng 05, 2023', N'Đã hủy thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-05-22T22:28:16.143' AS DateTime), NULL)
GO
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1219, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-22T22:28:26.980' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1220, 1, 50, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-23T21:31:09.337' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1221, 1, 50, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-23T21:31:12.323' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1222, 1, 50, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-23T21:31:13.993' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1223, 1, 48, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-05-23T21:31:51.557' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1224, 1, 47, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-05-23T21:32:18.643' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1225, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T21:39:14.597' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1226, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T21:39:14.907' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1227, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T21:39:14.957' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1228, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T21:39:14.987' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1229, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T21:39:15.033' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1230, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T21:39:15.063' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1231, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T21:39:15.097' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1232, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T21:41:18.563' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1233, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T21:41:18.610' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1234, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T21:41:18.873' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1235, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T21:41:18.907' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1236, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T21:41:18.953' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1237, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T21:41:18.983' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1238, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T21:41:19.267' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1239, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T21:43:50.050' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1240, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T21:43:50.347' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1241, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T21:43:50.393' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1242, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T21:43:50.427' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1243, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T21:43:50.473' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1244, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T21:43:50.690' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1245, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T21:43:51.020' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1246, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:08:15.850' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1247, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:08:15.913' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1248, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:08:15.960' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1249, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:08:15.993' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1250, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:08:16.053' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1251, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:08:16.070' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1252, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:08:16.117' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1253, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:15:38.487' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1254, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:15:38.720' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1255, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:15:38.767' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1256, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:15:38.797' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1257, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:15:38.843' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1258, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:15:38.877' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1259, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:15:38.923' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1260, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:16:24.017' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1261, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:16:24.063' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1262, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:16:24.127' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1263, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:16:24.157' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1264, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:16:24.407' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1265, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:16:24.673' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1266, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:16:24.737' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1267, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:17:26.097' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1268, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:17:26.473' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1269, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:17:26.533' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1270, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:17:26.550' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1271, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:17:26.630' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1272, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:17:26.677' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1273, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:17:26.723' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1274, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:30:17.040' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1275, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:30:17.087' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1276, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:30:17.167' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1277, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:30:17.183' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1278, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:30:17.243' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1279, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:30:17.277' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1280, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:30:17.307' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1281, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:30:40.197' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1282, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:30:40.247' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1283, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:30:40.293' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1284, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:30:40.323' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1285, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:30:40.353' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1286, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:30:40.400' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1287, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:30:40.447' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1288, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:32:08.333' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1289, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:32:08.410' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1290, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:32:08.457' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1291, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:32:08.473' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1292, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:32:08.550' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1293, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:32:08.583' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1294, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:32:08.630' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1295, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:36:21.883' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1296, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:36:21.930' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1297, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:36:21.977' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1298, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:36:22.007' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1299, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:36:22.053' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1300, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:36:22.087' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1301, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:36:22.320' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1302, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:37:24.417' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1303, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:37:24.447' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1304, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:37:24.493' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1305, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:37:24.510' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1306, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:37:24.573' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1307, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:37:24.603' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1308, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:37:24.637' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1309, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:38:07.817' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1310, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:38:07.863' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1311, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:38:07.910' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1312, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:38:07.940' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1313, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:38:07.987' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1314, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:38:08.020' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1315, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:38:08.067' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1316, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:39:17.457' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1317, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:39:17.507' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1318, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:39:17.567' AS DateTime), NULL)
GO
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1319, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:39:17.583' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1320, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:39:17.630' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1321, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:39:17.677' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1322, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:39:17.707' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1323, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:40:59.447' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1324, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:40:59.510' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1325, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:40:59.573' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1326, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:40:59.837' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1327, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:41:00.103' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1328, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:41:00.150' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1329, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:41:00.183' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1330, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:43:38.467' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1331, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:43:38.513' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1332, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:43:38.573' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1333, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:43:38.590' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1334, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:43:38.653' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1335, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:43:38.700' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1336, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:43:38.747' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1337, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:44:48.353' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1338, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:44:48.417' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1339, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:44:48.477' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1340, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:44:48.493' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1341, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:44:48.540' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1342, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:44:48.570' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1343, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:44:48.603' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1344, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:52:25.100' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1345, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:52:25.147' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1346, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:52:25.413' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1347, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:52:25.443' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1348, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:52:25.490' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1349, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:52:25.520' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1350, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:52:25.567' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1351, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:53:17.383' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1352, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:53:17.430' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1353, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:53:17.493' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1354, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:53:17.523' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1355, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:53:17.570' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1356, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:53:17.633' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1357, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:53:17.663' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1358, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:54:09.517' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1359, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:54:09.563' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1360, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:54:09.610' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1361, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:54:09.813' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1362, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:54:09.877' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1363, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:54:09.923' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1364, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:54:09.970' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1365, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T22:55:11.040' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1366, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T22:55:11.073' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1367, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T22:55:11.120' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1368, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T22:55:11.150' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1369, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T22:55:11.197' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1370, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T22:55:11.227' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1371, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T22:55:11.273' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1372, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-23T23:31:02.573' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1373, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-23T23:31:03.257' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1374, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-23T23:31:03.727' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1375, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-23T23:31:04.173' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1376, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Thị Lợi', CAST(N'2023-05-23T23:31:04.910' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1377, 20, NULL, 49, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Hiếu', CAST(N'2023-05-23T23:31:05.277' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1378, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-23T23:31:05.703' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1379, 1, 50, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-24T21:50:32.353' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1380, 1, 50, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-24T21:50:42.387' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1381, 1, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-05-24T21:50:52.073' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1382, 18, 41, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-24T21:54:05.100' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1383, 18, 44, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-24T21:54:13.163' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1384, 1, 41, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-05-24T21:56:25.763' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1385, 20, NULL, 49, N'Thanh Toán Lương Tháng 05, 2023', N'Đã hoàn tất thanh toán tiền lương cho Lê Hiếu', CAST(N'2023-05-25T11:29:44.837' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1386, 2, 43, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-25T13:19:10.137' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1387, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-25T21:24:13.097' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1388, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-25T21:24:13.160' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1389, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-25T21:24:13.427' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1390, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-25T21:24:13.457' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1391, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Thị Lợi', CAST(N'2023-05-25T21:24:13.520' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1392, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-25T21:24:13.567' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1393, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-25T21:25:09.723' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1394, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-25T21:25:09.770' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1395, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-25T21:25:10.020' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1396, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-25T21:25:10.037' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1397, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Thị Lợi', CAST(N'2023-05-25T21:25:10.100' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1398, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-25T21:25:10.130' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1399, 1, 51, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-26T00:13:00.723' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1400, 1, 52, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-05-26T00:13:48.817' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1401, 1, 52, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-05-26T00:13:57.913' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1402, 1, 52, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-05-26T00:14:07.710' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1403, 1, 52, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin và đặt trạng thái Công việc | thành "Chưa Thực Hiện"', CAST(N'2023-05-26T00:14:15.130' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1404, 2, NULL, 44, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Đặng Văn Tuấn', CAST(N'2023-05-26T16:03:47.950' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1405, 3, NULL, 45, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-05-26T16:03:48.233' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1406, 4, NULL, 46, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Bùi Công Danh', CAST(N'2023-05-26T16:03:48.560' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1407, 17, NULL, 47, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Trần Khương', CAST(N'2023-05-26T16:03:48.590' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1408, 18, NULL, 48, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Lê Thị Lợi', CAST(N'2023-05-26T16:03:48.653' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1409, 21, NULL, 50, N'Tính Lại Lương Tháng 05, 2023', N'Đã thực hiện tính lại tiền lương tháng 05, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-05-26T16:03:48.717' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1410, 2, NULL, 51, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Đặng Văn Tuấn', CAST(N'2023-06-01T19:11:32.340' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1411, 3, NULL, 52, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-06-01T19:11:32.637' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1412, 4, NULL, 53, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Bùi Công Danh', CAST(N'2023-06-01T19:11:32.713' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1413, 17, NULL, 54, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Nguyễn Trần Khương', CAST(N'2023-06-01T19:11:32.747' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1414, 18, NULL, 55, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Lê Thị Lợi', CAST(N'2023-06-01T19:11:32.793' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1415, 20, NULL, 56, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Lê Hiếu', CAST(N'2023-06-01T19:11:32.840' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1416, 21, NULL, 57, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-06-01T19:11:32.870' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1417, 1, 53, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-06-01T19:13:40.813' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1418, 1, 54, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-06-03T09:22:02.850' AS DateTime), NULL)
GO
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1419, 2, 54, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-06-03T09:22:40.063' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1420, 2, 54, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-06-03T09:22:42.547' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1421, 2, 54, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-06-03T09:22:50.703' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1422, 2, NULL, 51, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Đặng Văn Tuấn', CAST(N'2023-06-03T09:24:50.403' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1423, 3, NULL, 52, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-06-03T09:24:50.467' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1424, 4, NULL, 53, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Bùi Công Danh', CAST(N'2023-06-03T09:24:50.530' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1425, 17, NULL, 54, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Trần Khương', CAST(N'2023-06-03T09:24:50.733' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1426, 18, NULL, 55, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Lê Thị Lợi', CAST(N'2023-06-03T09:24:50.780' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1427, 20, NULL, 56, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Lê Hiếu', CAST(N'2023-06-03T09:24:50.827' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1428, 21, NULL, 57, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-06-03T09:24:50.890' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1429, 2, NULL, 51, N'Thanh Toán Lương Tháng 06, 2023', N'Đã hoàn tất thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-06-03T09:25:12.847' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1430, 1, 49, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-06-05T11:02:28.190' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1431, 1, 54, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-06-07T13:02:04.383' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1432, 1, 54, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-06-07T13:35:39.633' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1433, 1, 55, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-06-07T13:36:07.027' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1434, 1, 56, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-06-07T13:36:22.980' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1435, 1, 55, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-06-07T13:36:25.900' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1436, 1, 56, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-06-07T13:36:28.417' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1437, 1, 55, NULL, N'Bình Luận Công Việc', N'đã viết một bình luận Công việc', CAST(N'2023-06-09T20:01:21.823' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1438, 1, 55, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin và hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-06-09T20:01:23.900' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1439, 1, 54, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã xác nhận Công việc được hoàn thành', CAST(N'2023-06-09T20:01:31.917' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1440, 3, NULL, 52, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Thanh Thiện', CAST(N'2023-06-10T10:44:20.627' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1441, 4, NULL, 53, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Bùi Công Danh', CAST(N'2023-06-10T10:44:20.720' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1442, 17, NULL, 54, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Trần Khương', CAST(N'2023-06-10T10:44:20.910' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1443, 18, NULL, 55, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Lê Thị Lợi', CAST(N'2023-06-10T10:44:20.957' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1444, 20, NULL, 56, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Lê Hiếu', CAST(N'2023-06-10T10:44:21.003' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1445, 21, NULL, 57, N'Tính Lại Lương Tháng 06, 2023', N'Đã thực hiện tính lại tiền lương tháng 06, 2023 cho Nguyễn Huy Hoàng', CAST(N'2023-06-10T10:44:21.033' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1446, 39, NULL, 58, N'Tính Lương Tháng 06, 2023', N'Đã thực hiện tính tiền lương tháng 06, 2023 cho Đặng Văn Tuấn', CAST(N'2023-06-10T10:44:21.113' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1447, 2, NULL, 51, N'Hủy Thanh Toán Lương Tháng 06, 2023', N'Đã hủy thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-06-10T10:44:43.910' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1448, 2, NULL, 51, N'Thanh Toán Lương Tháng 06, 2023', N'Đã hoàn tất thanh toán tiền lương cho Đặng Văn Tuấn', CAST(N'2023-06-10T10:44:46.457' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1449, 1, 57, NULL, N'Thêm Công Việc Mới', N'đã thêm công việc', CAST(N'2023-06-10T10:46:37.213' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1450, 1, 57, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-06-10T10:46:48.103' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1451, 1, 57, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-06-10T10:46:51.917' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1452, 1, 57, NULL, N'Bình Luận Công Việc', N'đã viết một bình luận Công việc', CAST(N'2023-06-10T10:47:04.887' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1453, 1, 57, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-06-10T10:47:13.467' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1454, 2, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã bắt đầu thực hiện Công việc', CAST(N'2023-06-10T10:49:34.610' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1455, 2, 42, NULL, N'Cập Nhật Trạng Thái Công Việc', N'đã hoàn thành Công việc | và chờ xác nhận', CAST(N'2023-06-10T10:49:36.313' AS DateTime), NULL)
INSERT [dbo].[Histories] ([ID], [ID_Employee], [ID_Task], [ID_Payroll], [Name], [Contents], [Date], [ID_Projects]) VALUES (1456, 2, 42, NULL, N'Cập Nhật Thông Tin Công Việc', N'đã cập nhật thông tin Công việc', CAST(N'2023-06-10T10:49:45.157' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Histories] OFF
GO
SET IDENTITY_INSERT [dbo].[Insurance] ON 

INSERT [dbo].[Insurance] ([ID], [Name], [Percentage], [Ceiling_Level]) VALUES (1, N'Bảo Hiểm Xã Hội', CAST(8.00 AS Decimal(5, 2)), 29800000.0000)
INSERT [dbo].[Insurance] ([ID], [Name], [Percentage], [Ceiling_Level]) VALUES (2, N'Bảo Hiểm Y Tế', CAST(1.50 AS Decimal(5, 2)), 29800000.0000)
INSERT [dbo].[Insurance] ([ID], [Name], [Percentage], [Ceiling_Level]) VALUES (4, N'Bảo Hiểm Thất Nghiệp', CAST(1.00 AS Decimal(5, 2)), 29800000.0000)
SET IDENTITY_INSERT [dbo].[Insurance] OFF
GO
SET IDENTITY_INSERT [dbo].[LanguagesSkills] ON 

INSERT [dbo].[LanguagesSkills] ([ID], [ID_Employee], [Name], [Writing], [Speaking], [Reading], [listening]) VALUES (3, 4, N'English', N'Khá', N'Khá', N'Khá', N'Yếu')
INSERT [dbo].[LanguagesSkills] ([ID], [ID_Employee], [Name], [Writing], [Speaking], [Reading], [listening]) VALUES (8, 2, N'Tiếng Anh', N'Khá', N'Trung Bình', N'Khá', N'Khá')
SET IDENTITY_INSERT [dbo].[LanguagesSkills] OFF
GO
SET IDENTITY_INSERT [dbo].[LeaveApplication] ON 

INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (51, 2, CAST(N'2023-05-22' AS Date), CAST(N'2023-05-24' AS Date), CAST(N'2023-05-22T13:48:08.973' AS DateTime), 1, N'', CAST(N'2023-05-22T22:16:03.147' AS DateTime), N'', 31, CAST(3.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (53, 3, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-24' AS Date), CAST(N'2023-05-23T22:04:26.600' AS DateTime), 0, N'', CAST(N'2023-05-24T21:43:15.030' AS DateTime), N'', 32, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (54, 17, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-24' AS Date), CAST(N'2023-05-23T22:04:57.210' AS DateTime), 1, N'', CAST(N'2023-05-23T22:04:57.210' AS DateTime), NULL, 63, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (56, 9, CAST(N'2023-05-24' AS Date), CAST(N'2023-05-25' AS Date), CAST(N'2023-05-23T22:26:50.280' AS DateTime), 1, N'', CAST(N'2023-05-23T22:37:15.760' AS DateTime), N'', 58, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (58, 6, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-23' AS Date), CAST(N'2023-05-23T22:30:05.917' AS DateTime), 0, N'', NULL, NULL, 55, CAST(0.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (59, 18, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-24' AS Date), CAST(N'2023-05-23T22:35:45.053' AS DateTime), 1, N'', CAST(N'2023-05-25T21:23:43.393' AS DateTime), N'', 76, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (60, 4, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-24' AS Date), CAST(N'2023-05-23T22:38:53.973' AS DateTime), 1, N'', CAST(N'2023-05-23T22:38:58.020' AS DateTime), N'', 33, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (61, 20, CAST(N'2023-05-23' AS Date), CAST(N'2023-05-23' AS Date), CAST(N'2023-05-23T22:40:28.370' AS DateTime), 1, N'', CAST(N'2023-05-23T22:40:28.370' AS DateTime), NULL, 46, CAST(0.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (63, 2, CAST(N'2023-06-01' AS Date), CAST(N'2023-06-03' AS Date), CAST(N'2023-05-23T23:23:21.660' AS DateTime), 0, N'', NULL, NULL, 71, CAST(2.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (64, 18, CAST(N'2023-05-26' AS Date), CAST(N'2023-05-27' AS Date), CAST(N'2023-05-24T21:28:54.933' AS DateTime), 0, N'', CAST(N'2023-05-26T19:56:01.143' AS DateTime), N'', 64, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (65, 3, CAST(N'2023-05-25' AS Date), CAST(N'2023-05-27' AS Date), CAST(N'2023-05-24T21:43:42.843' AS DateTime), 0, N'', NULL, NULL, 52, CAST(2.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (71, 2, CAST(N'2023-05-25' AS Date), CAST(N'2023-05-26' AS Date), CAST(N'2023-05-25T01:00:31.017' AS DateTime), 0, N'', NULL, NULL, 51, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (72, 2, CAST(N'2023-05-27' AS Date), CAST(N'2023-05-27' AS Date), CAST(N'2023-05-25T01:01:35.997' AS DateTime), 0, N'', CAST(N'2023-05-26T20:25:18.993' AS DateTime), N'', 51, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (73, 18, CAST(N'2023-05-30' AS Date), CAST(N'2023-05-31' AS Date), CAST(N'2023-05-25T21:23:22.127' AS DateTime), 1, N'', CAST(N'2023-05-25T21:28:37.690' AS DateTime), N'việc j?', 77, CAST(1.50 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (74, 13, CAST(N'2023-05-29' AS Date), CAST(N'2023-05-29' AS Date), CAST(N'2023-05-26T20:16:01.490' AS DateTime), 1, N'', CAST(N'2023-05-27T19:43:09.597' AS DateTime), N'', 39, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (75, 13, CAST(N'2023-05-26' AS Date), CAST(N'2023-05-26' AS Date), CAST(N'2023-05-26T20:22:01.760' AS DateTime), 0, N'', CAST(N'2023-05-26T20:22:42.883' AS DateTime), N'Không cho nghỉ!', 39, CAST(1.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (77, 2, CAST(N'2023-06-30' AS Date), CAST(N'2023-07-01' AS Date), CAST(N'2023-06-01T19:10:16.947' AS DateTime), 0, N'', NULL, NULL, 102, CAST(2.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (79, 2, CAST(N'2023-06-06' AS Date), CAST(N'2023-06-07' AS Date), CAST(N'2023-06-03T09:19:11.823' AS DateTime), 0, N'', NULL, NULL, 102, CAST(2.00 AS Decimal(5, 2)))
INSERT [dbo].[LeaveApplication] ([ID], [ID_Employee], [StartDate], [EndDate], [SendDate], [State], [Contents], [ResponsiveDate], [Reply], [ID_ApplyLeaveType], [RealLeaveDate]) VALUES (80, 2, CAST(N'2023-06-11' AS Date), CAST(N'2023-06-12' AS Date), CAST(N'2023-06-10T10:43:03.983' AS DateTime), 0, N'', NULL, NULL, 117, CAST(2.00 AS Decimal(5, 2)))
SET IDENTITY_INSERT [dbo].[LeaveApplication] OFF
GO
SET IDENTITY_INSERT [dbo].[LeaveDate] ON 

INSERT [dbo].[LeaveDate] ([ID], [Name], [Date], [DateType]) VALUES (48, N'Giỗ Tổ Hùng Vương', CAST(N'2023-04-30' AS Date), N'Cả Ngày')
INSERT [dbo].[LeaveDate] ([ID], [Name], [Date], [DateType]) VALUES (49, N'Quốc Khánh', CAST(N'2021-05-02' AS Date), N'Cả Ngày')
INSERT [dbo].[LeaveDate] ([ID], [Name], [Date], [DateType]) VALUES (51, N'Nhà giáo Việt Nam', CAST(N'2023-11-20' AS Date), N'Nữa Ngày')
INSERT [dbo].[LeaveDate] ([ID], [Name], [Date], [DateType]) VALUES (52, N'Tết tây', CAST(N'2023-01-01' AS Date), N'Cả Ngày')
INSERT [dbo].[LeaveDate] ([ID], [Name], [Date], [DateType]) VALUES (53, N'quốc khánh', CAST(N'2023-09-02' AS Date), N'Cả Ngày')
SET IDENTITY_INSERT [dbo].[LeaveDate] OFF
GO
SET IDENTITY_INSERT [dbo].[LeaveType] ON 

INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (1, N'Chăm sóc gia đình', 1)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (2, N'Nghỉ việc gia đình', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (3, N'Nghỉ đẻ', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (4, N'Nghỉ bệnh', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (8, N'Nghỉ thăm người ốm', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (12, N'nghỉ 2 ngày', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (17, N'Nghỉ việc gia đình', 0)
INSERT [dbo].[LeaveType] ([ID], [Name], [Sate]) VALUES (18, N'Nghỉ tự do', 1)
SET IDENTITY_INSERT [dbo].[LeaveType] OFF
GO
SET IDENTITY_INSERT [dbo].[Notification] ON 

INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (1, 2, CAST(N'2023-04-03T14:43:15.250' AS DateTime), N'đã bắt đầu thực hiện Công việc Code giao diện website của dự án DA00000001', 1, 0, N'/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (7, 2, CAST(N'2023-04-04T13:17:22.480' AS DateTime), N'đã xác nhận Công việc ssss của dự án DA00000003 được hoàn thành', 1, 0, N'/Admins/quanlyduan/chitietduan/3')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (8, 2, CAST(N'2023-04-04T13:37:46.003' AS DateTime), N'đã bắt đầu thực hiện Công việc ssss của dự án DA00000003', 1, 0, N'/Admins/quanlyduan/chitietduan/3')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (10, 2, CAST(N'2023-04-04T13:45:43.093' AS DateTime), N'đã cập nhật thông tin Công việc ssss của dự án DA00000003', 1, 0, N'/Admins/quanlyduan/chitietduan/DA00000003')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (11, 2, CAST(N'2023-04-04T14:19:09.803' AS DateTime), N'đã hoàn thành Công việc Code BE của dự án DA00000012 và chờ xác nhận', 1, 0, N'/Admins/quanlyduan/chitietduan/12')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (12, 2, CAST(N'2023-04-04T14:19:10.590' AS DateTime), N'đã bắt đầu thực hiện Công việc Code BE của dự án DA00000012', 1, 0, N'/Admins/quanlyduan/chitietduan/12')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (17, 18, CAST(N'2023-04-05T17:11:09.180' AS DateTime), N'đã bắt đầu thực hiện Công việc Code back-end cho trang web của dự án DA00000017', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/17')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (19, 4, CAST(N'2023-04-07T13:52:18.303' AS DateTime), N'đã bắt đầu thực hiện Công việc Code giao diện website của dự án DA00000001', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (20, 4, CAST(N'2023-04-07T13:52:19.897' AS DateTime), N'đã hoàn thành Công việc Plan Tranning của dự án DA00000001 và chờ xác nhận', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (21, 4, CAST(N'2023-04-07T13:52:20.850' AS DateTime), N'đã đặt trạng thái Công việc Thiết kế Architecture design của dự án DA00000001 thành Chưa Thực Hiện', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (22, 4, CAST(N'2023-04-07T13:52:21.957' AS DateTime), N'đã hoàn thành Công việc Thiết kế Project Plan của dự án DA00000001 và chờ xác nhận', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (24, 4, CAST(N'2023-04-07T13:52:23.177' AS DateTime), N'đã hoàn thành Công việc Lên kế hoạch kiểm thử dự án của dự án DA00000001 và chờ xác nhận', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (25, 2, CAST(N'2023-04-07T23:10:32.647' AS DateTime), N'đã bắt đầu thực hiện Công việc Code giao diện website của dự án DA00000001', 1, 0, N'/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (26, 2, CAST(N'2023-04-07T23:20:10.237' AS DateTime), N'đã cập nhật thông tin Công việc ádasdasd của dự án DA00000001', 1, 0, N'/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (27, 2, CAST(N'2023-04-07T23:20:17.317' AS DateTime), N'đã cập nhật thông tin Công việc ádasdasd của dự án DA00000001', 1, 0, N'/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (28, 2, CAST(N'2023-04-07T23:22:13.847' AS DateTime), N'đã loại bỏ Công việc ádasdasd của dự án DA00000001', 1, 0, N'/Admins/quanlyduan/chitietduan/DA00000001')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (29, 4, CAST(N'2023-04-11T15:27:51.033' AS DateTime), N'đã cập nhật thông tin Công việc Code giao diện website của dự án DA00000001', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (31, 4, CAST(N'2023-04-11T15:29:56.507' AS DateTime), N'đã cập nhật thông tin Công việc Code giao diện website Code giao diện website Code giao diện website của dự án DA00000001', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (34, 4, CAST(N'2023-04-11T15:30:35.460' AS DateTime), N'đã cập nhật thông tin Công việc Code giao diện websiteode giao diện websiteode giao diện website của dự án DA00000001', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (38, 4, CAST(N'2023-04-11T15:31:33.347' AS DateTime), N'đã cập nhật thông tin Công việc Code giao diện website của dự án DA00000001', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/1')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (40, 18, CAST(N'2023-04-17T14:09:18.703' AS DateTime), N'đã viết một bình luận Công việc Code back-end cho trang web của dự án DA00000017', 1, 0, N'/CP25Team06/Admins/quanlyduan/chitietduan/DA00000017')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (41, 2, CAST(N'2023-05-01T17:41:24.617' AS DateTime), N'đã bắt đầu thực hiện Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029', 0, 1, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (42, 2, CAST(N'2023-05-01T17:41:25.617' AS DateTime), N'đã hoàn thành Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029 và chờ xác nhận', 0, 1, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (43, 2, CAST(N'2023-05-01T17:41:26.637' AS DateTime), N'đã bắt đầu thực hiện Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029', 0, 1, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (44, 2, CAST(N'2023-05-01T17:41:27.760' AS DateTime), N'đã hoàn thành Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029 và chờ xác nhận', 1, 0, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (45, 2, CAST(N'2023-05-01T17:41:34.973' AS DateTime), N'đã viết một bình luận Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029', 0, 1, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (46, 2, CAST(N'2023-05-01T17:41:36.367' AS DateTime), N'đã cập nhật thông tin Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029', 1, 0, N'/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (47, 18, CAST(N'2023-05-24T21:54:05.130' AS DateTime), N'đã xác nhận Công việc sdsdsd của dự án DA00000027 được hoàn thành', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/27')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (48, 18, CAST(N'2023-05-24T21:54:13.273' AS DateTime), N'đã xác nhận Công việc Testing của dự án DA00000027 được hoàn thành', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/27')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (49, 2, CAST(N'2023-05-25T13:19:10.353' AS DateTime), N'đã xác nhận Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000029 được hoàn thành', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (50, 2, CAST(N'2023-06-03T09:22:40.063' AS DateTime), N'đã cập nhật thông tin Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000034', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/34')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (51, 2, CAST(N'2023-06-03T09:22:42.733' AS DateTime), N'đã bắt đầu thực hiện Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000034', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/34')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (52, 2, CAST(N'2023-06-03T09:22:50.813' AS DateTime), N'đã xác nhận Công việc Vẽ prototype cho cho chức năng đăng nhập của dự án DA00000034 được hoàn thành', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/34')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (53, 2, CAST(N'2023-06-10T10:49:34.720' AS DateTime), N'đã bắt đầu thực hiện Công việc Code BE của dự án DA00000029', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (54, 2, CAST(N'2023-06-10T10:49:36.407' AS DateTime), N'đã hoàn thành Công việc Code BE của dự án DA00000029 và chờ xác nhận', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/29')
INSERT [dbo].[Notification] ([ID], [ID_Employee], [Date], [Contents], [State], [Push], [Url]) VALUES (55, 2, CAST(N'2023-06-10T10:49:45.157' AS DateTime), N'đã cập nhật thông tin Công việc Code BEE của dự án DA00000029', 0, 1, N'/CP25Team06/Admins/quanlyduan/chitietduan/29')
SET IDENTITY_INSERT [dbo].[Notification] OFF
GO
SET IDENTITY_INSERT [dbo].[OnLeave] ON 

INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (29, 2, 49)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (33, 25, 48)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (34, 25, 49)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (35, 25, 51)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (36, 25, 52)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (37, 38, 48)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (38, 38, 51)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (39, 38, 49)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (40, 38, 53)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (41, 38, 52)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (42, 39, 48)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (43, 39, 51)
INSERT [dbo].[OnLeave] ([ID], [ID_Employee], [ID_LeaveDate]) VALUES (44, 39, 49)
SET IDENTITY_INSERT [dbo].[OnLeave] OFF
GO
SET IDENTITY_INSERT [dbo].[PartnerOfProject] ON 

INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (31, 52, 27)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (32, 53, 27)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (41, 68, 29)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (42, 45, 29)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (43, 48, 30)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (44, 47, 30)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (45, 68, 31)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (46, 3, 32)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (47, 64, 32)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (48, 50, 33)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (49, 53, 34)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (50, 52, 34)
INSERT [dbo].[PartnerOfProject] ([ID], [ID_Partners], [ID_Project]) VALUES (51, 50, 34)
SET IDENTITY_INSERT [dbo].[PartnerOfProject] OFF
GO
SET IDENTITY_INSERT [dbo].[Partners] ON 

INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (2, N'IT-Technology', N'Nguyễn Minh Hiếu', N'0128 475 792', N'info@it-global.net', CAST(N'1986-05-06' AS Date), N'Nam', N'', NULL, N'4841515115', NULL, 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000002')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (3, N'', N'Trần Thị Giàu', N'0124 414 324', N'giau2222@gmail.com', CAST(N'1987-01-22' AS Date), N'Nữ', N'', N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fl1xx7vx60frzszuf7i8wjszxcz7sbsproject-cover-img.jpg?alt=media&token=83ffa17f-4ea7-41fc-af7e-2bc715daedb2', N'1111111111', N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000003')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (4, N'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KHẢI ĐIỀN', N'Nguyễn Thị Nhật Lệ', N'0914 642 857', N'nhatle222@gmail.com', CAST(N'1988-06-08' AS Date), N'Nữ', N'25/18 Lê Sát, Phường Tân Quý, Quận Tân Phú, Thành phố Hồ Chí Minh', N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fyz51it8id09lh6jzve8llzsc9wwmdcavatar-10.jpg?alt=media&token=c8facc77-a853-4ff4-8cb6-c5cb0b40e119', NULL, NULL, 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000004')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (28, N'Công Ty TNHH Lê Bảo', N'Lê Văn Bảo', N'2222 222 222', N'baole.01@gmail.com', CAST(N'1995-12-06' AS Date), N'Nam', N'29/41 đường số 6, khu phố 2, Phường Hiệp Bình Chánh, Thành phố Thủ Đức, Thành phố Hồ Chí Minh', N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Ffhaslup3pu9w21xdwo06i7llofzj6a111111111111111111111111.jpg?alt=media&token=d84823eb-e225-4932-aedc-11bc86ffd73c', NULL, NULL, 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000028')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (29, N'Công Ty TNHH Anh Tiến', N'Trần Lê Anh Tiến', N'09165845814', N'anhtien@gmail.com', CAST(N'1982-01-29' AS Date), N'Nam', N'', NULL, NULL, NULL, 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000029')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (30, N'Công Ty TNHH Hải Thuận', N'Mạc Thanh Hải', N'3333 333 333', N'123@123.com', CAST(N'2023-01-30' AS Date), N'Nam', N'', NULL, NULL, NULL, 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000030')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (32, N'', N'Trần Đặng Thiên Hoàng', N'0381 156 555', N'thienhoang112@gmail.com', CAST(N'1994-04-12' AS Date), N'Nam', N'', NULL, NULL, N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000032')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (33, N'', N'Lý Hoành Thiên', N'0381 251 543', N'hoanhthien22@gmail.com', CAST(N'1989-06-23' AS Date), N'Nam', N'', NULL, NULL, N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000033')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (34, N'', N'Bùi Thành Trí', N'7777 777 777', N'thanhtri12@gmail.com', CAST(N'1990-01-24' AS Date), N'Nam', N'', N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fqfi7y4izh7dr3uputeidopwmj7ut02anh-che-cho-hai-huoc-cho-dien-thoai-12.jpg?alt=media&token=62b19ac6-2ccb-43db-9d58-83d670c1bec1', NULL, N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000034')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (39, N'', N'Trần Thị Ngạn', N'8989 898 988', N'nganhthitran@gmail.com', CAST(N'1981-01-10' AS Date), N'Nữ', N'', NULL, NULL, N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000039')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (40, N'', N'Đặng Công Danh', N'0375 672 367', N'danhdanh@gmail.com', CAST(N'1995-01-07' AS Date), N'Nam', N'', NULL, NULL, N'', 0, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000040')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (42, N'TÒA SOẠN MIỀN NAM', N'Nguyễn Trần Hoài Bảo', N'0384 515 154', N'baotran79@gmail.com', CAST(N'1985-01-31' AS Date), N'Nam', N'', NULL, N'1561465165', N'', 1, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000042')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (43, N'Công Ty TNHH Thành Tiến', N'Đặng Lê Thành Nhân', N'0332 156 487', N'nhan224@gmail.com', CAST(N'1987-04-08' AS Date), N'Nam', N'', NULL, N'2151523154', N'', 1, CAST(N'2023-04-02T00:00:00.000' AS DateTime), N'KH00000043')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (45, N'Công Ty sản xuất nước hoa Nguyên Hoàng', N'Nguyễn Đình Hoàng', N'9890 871 237', N'dnguyenhoang94@_.com', CAST(N'1999-03-23' AS Date), N'Nam', N'', NULL, N'6565656565', N'', 1, CAST(N'2023-05-15T20:28:52.593' AS DateTime), N'KH00000045')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (46, N'Công Ty Cổ Phần Xây Dựng Quốc Tế Việt Úc', N'Đặng Văn Tuấn', N'0932 876 723', N'tuandayne@gail.com', CAST(N'2000-04-06' AS Date), N'Nam', N'Ở nhà chứ ở đâu', NULL, N'0367872356', N'duongdan.com', 1, CAST(N'2023-04-20T20:18:38.930' AS DateTime), N'KH00000046')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (47, NULL, N'Híu Nhăn', N'0372 636 723', N'nhandayne@hieunhan.com', CAST(N'2001-04-18' AS Date), N'Nam', N'Địa chỉ ở đâu còn lâu mới nói', NULL, N'0982386872', N'duongdanhieunhan.com', 0, CAST(N'2023-05-17T16:17:40.223' AS DateTime), N'KH00000047')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (48, NULL, N'Đặng Văn Tuấn', N'0937 236 652', N'ttuanday@gmail.com', CAST(N'2000-04-19' AS Date), N'Nam', N'Ở nhà', NULL, N'0237823672', N'aloalo.com', 0, CAST(N'2023-05-17T16:17:40.193' AS DateTime), N'KH00000048')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (50, NULL, N'Đặng Văn Tuấn', N'0382 376 232', N'tuanday@abc.com', CAST(N'2000-04-19' AS Date), N'Nam', N'', NULL, N'0923627367', N'', 0, CAST(N'2023-04-21T19:08:46.073' AS DateTime), N'KH00000050')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (52, NULL, N'Huy Hoàng', N'0372 387 827', N't@t.com', CAST(N'2023-04-10' AS Date), N'Nam', N'', NULL, N'0128930981', N'', 0, CAST(N'2023-05-05T12:56:17.347' AS DateTime), N'KH00000052')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (53, N' ', N'Lê Đăng', N'0273 627 398', N'tuan@t.com', CAST(N'2023-04-11' AS Date), N'Nam', N'ádasdasdasd', NULL, N'8971298379', N'Hahaha.com', 1, CAST(N'2023-05-05T12:56:17.363' AS DateTime), N'KH00000053')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (64, NULL, N'Tuấn Hoàng', N'0372 387 827', N't@t.com', CAST(N'2023-04-10' AS Date), N'Nam', N'', NULL, N'0128930981', N'', 0, CAST(N'2023-04-26T18:01:17.720' AS DateTime), N'KH00000064')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (68, N'', N'Bùi Công Danh', N'1209 380 123', N'moimeeee@hh.com', CAST(N'2023-04-20' AS Date), N'Nam', N'', NULL, N'3423423423', N'', 0, CAST(N'2023-05-15T20:28:52.573' AS DateTime), N'KH00000068')
INSERT [dbo].[Partners] ([ID], [Company], [Name], [Phone], [Email], [Birthday], [Sex], [Address], [Avatar], [TaxCode], [WebUrl], [CompanyOrPersonal], [AddDate], [ID_Partners]) VALUES (69, NULL, N'Lê Nhật Linh', N'9723 682 732', N'nhatlinh1@gmail.com', NULL, N'', N'', NULL, N'', N'', 0, CAST(N'2023-05-22T23:16:40.630' AS DateTime), N'KH00000069')
SET IDENTITY_INSERT [dbo].[Partners] OFF
GO
SET IDENTITY_INSERT [dbo].[PaymentHistory] ON 

INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (98, 44, CAST(N'2023-04-21T19:57:57.317' AS DateTime), 15000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (99, 44, CAST(N'2023-04-23T18:17:24.723' AS DateTime), 5000000.0000, N'Thanh toán 5,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (100, 45, CAST(N'2023-04-28T16:21:56.263' AS DateTime), 150000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (101, 45, CAST(N'2023-04-29T17:32:50.560' AS DateTime), 5000000.0000, N'Thanh toán 5,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (102, 46, CAST(N'2023-05-05T13:39:34.443' AS DateTime), 120000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (103, 45, CAST(N'2023-05-13T14:20:03.550' AS DateTime), 10000000.0000, N'Thanh toán 10,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (104, 46, CAST(N'2023-05-13T14:21:35.397' AS DateTime), 20000000.0000, N'Thanh toán 20,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (105, 46, CAST(N'2023-05-15T19:25:59.447' AS DateTime), 5000000.0000, N'Thanh toán 5,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (106, 46, CAST(N'2023-05-15T20:12:43.313' AS DateTime), 95000000.0000, N'Thanh toán 95,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (107, NULL, CAST(N'2023-05-18T21:56:39.717' AS DateTime), 2200000.0000, N'Thay đổi thông tin giai đoạn của dự án. Từ tổng: 120,000,000 VND -> 122,200,000 VND.', 1, 1, 30)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (108, 47, CAST(N'2023-05-18T21:56:53.250' AS DateTime), 2000000.0000, N'Thanh toán 2,000,000 VND cho Giai đoạn 2', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (109, 48, CAST(N'2023-05-19T16:42:11.240' AS DateTime), 100000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (110, 49, CAST(N'2023-05-19T16:44:39.543' AS DateTime), 20000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (111, 50, CAST(N'2023-05-24T21:49:41.857' AS DateTime), 100000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (112, 45, CAST(N'2023-05-24T21:51:17.620' AS DateTime), 135000000.0000, N'Thanh toán 135,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (113, NULL, CAST(N'2023-05-26T00:33:06.610' AS DateTime), 10000000.0000, N'Thay đổi thông tin giai đoạn của dự án. Từ tổng: 100,000,000 VND -> 110,000,000 VND.', 1, 1, 33)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (114, 50, CAST(N'2023-06-01T19:13:54.110' AS DateTime), 50000000.0000, N'Thanh toán 50,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (115, 52, CAST(N'2023-06-03T09:21:18.647' AS DateTime), 25000000.0000, N'Thêm khoản thanh toán cho giai đoạn 1', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (116, 53, CAST(N'2023-06-03T09:21:18.663' AS DateTime), 30000000.0000, N'Thêm khoản thanh toán cho giai đoạn 2', 1, 1, NULL)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (117, NULL, CAST(N'2023-06-03T09:23:32.723' AS DateTime), 10000000.0000, N'Thay đổi thông tin giai đoạn của dự án. Từ tổng: 55,000,000 VND -> 65,000,000 VND.', 1, 1, 34)
INSERT [dbo].[PaymentHistory] ([ID], [ID_Debts], [Date], [Price], [Contents], [Type], [OnUpdate], [ID_Projects]) VALUES (118, 52, CAST(N'2023-06-03T09:23:44.740' AS DateTime), 25000000.0000, N'Thanh toán 25,000,000 VND cho Giai đoạn 1', 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[PaymentHistory] OFF
GO
SET IDENTITY_INSERT [dbo].[Payroll] ON 

INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (30, 12, 3, 5000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 578550.0000, CAST(0.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 0.0000, 0.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 5178022.5000, 1, 5510000.0000, 5510000.0000, 0.0000, 756572.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (31, 12, 4, 15000000.0000, CAST(1.50 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 634400.0000, CAST(10.00 AS Decimal(5, 2)), 250000.0000, 0, NULL, 11000000.0000, 5018600.0000, 251860.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 15806390.0000, 1, 16653000.0000, 15860000.0000, 0.0000, 1692650.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (32, 12, 17, 3000000.0000, CAST(1.50 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 120000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 3000000.0000, 300000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 2580000.0000, 1, 3000000.0000, 3000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (33, 12, 18, 10000000.0000, CAST(1.50 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 410400.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 10260000.0000, 1026000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 9830362.5000, 1, 10260000.0000, 10260000.0000, 0.0000, 1266762.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (34, 12, 2, 18000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 2011800.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 1, 4400000.0000, 11000000.0000, 1748200.0000, 87410.0000, CAST(0.00 AS Decimal(5, 2)), 815519.3548, 17913829.5000, 1, 19160000.0000, 19160000.0000, 0.0000, 2013039.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (35, 13, 2, 18000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 2011800.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 1, 4400000.0000, 11000000.0000, 1761200.0000, 88060.0000, CAST(1.00 AS Decimal(5, 2)), 568671.3333, 17316042.1000, 0, 19173000.0000, 19160000.0000, 0.0000, 1984573.4333)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (36, 13, 3, 5000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 578550.0000, CAST(0.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 0.0000, 0.0000, CAST(8.00 AS Decimal(5, 2)), 164381.6666, 3797216.4999, 0, 5523000.0000, 5510000.0000, 0.0000, 690819.8333)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (37, 13, 4, 15000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1744050.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 3908950.0000, 195447.5000, CAST(8.00 AS Decimal(5, 2)), 489016.7500, 10758368.5000, 0, 16653000.0000, 16610000.0000, 0.0000, 1610000.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (38, 13, 17, 3000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 315000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 3000000.0000, 300000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 2385000.0000, 0, 3000000.0000, 3000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (39, 13, 18, 10000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1129800.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 10773000.0000, 1077300.0000, CAST(3.00 AS Decimal(5, 2)), 285096.6666, 8082490.5000, 0, 10773000.0000, 10760000.0000, 0.0000, 1144880.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (40, 13, 20, 15000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1575000.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 2425000.0000, 121250.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 13303750.0000, 1, 15000000.0000, 15000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (41, 13, 21, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(15.00 AS Decimal(5, 2)), 750000.0000, 0, NULL, 11000000.0000, 15871000.0000, 1630650.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 26502367.5000, 0, 30000000.0000, 30000000.0000, 0.0000, 1262017.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (42, 12, 20, 15000000.0000, CAST(1.50 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 600000.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 3400000.0000, 170000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 14230000.0000, 1, 15000000.0000, 15000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (43, 12, 21, 20000000.0000, CAST(1.50 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 800000.0000, CAST(10.00 AS Decimal(5, 2)), 250000.0000, 0, NULL, 11000000.0000, 8200000.0000, 570000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 19561500.0000, 1, 20000000.0000, 20000000.0000, 0.0000, 931500.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (44, 14, 2, 18000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 2011800.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 1, 4400000.0000, 11000000.0000, 1748200.0000, 87410.0000, CAST(2.00 AS Decimal(5, 2)), 550348.0645, 16758098.5645, 0, 19160000.0000, 19160000.0000, 0.0000, 1958004.6935)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (45, 14, 3, 5000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 578550.0000, CAST(0.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 0.0000, 0.0000, CAST(0.00 AS Decimal(5, 2)), 159079.0322, 5178022.5000, 0, 5510000.0000, 5510000.0000, 0.0000, 756572.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (46, 14, 4, 15000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1744050.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 3865950.0000, 193297.5000, CAST(1.50 AS Decimal(5, 2)), 473311.3709, 13962685.4435, 0, 16610000.0000, 16610000.0000, 0.0000, 1610000.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (47, 14, 17, 3000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 315000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 3000000.0000, 300000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 2385000.0000, 0, 3000000.0000, 3000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (48, 14, 18, 10000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1129800.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 10760000.0000, 1076000.0000, CAST(3.00 AS Decimal(5, 2)), 275941.9354, 8112692.9032, 0, 10760000.0000, 10760000.0000, 0.0000, 1146318.7096)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (49, 14, 20, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 32100000.0000, 3210000.0000, CAST(0.50 AS Decimal(5, 2)), 831000.0000, 25345500.0000, 1, 32100000.0000, 32100000.0000, 0.0000, 2100000.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (50, 14, 21, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 30000000.0000, 3000000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 25064550.0000, 0, 30000000.0000, 30000000.0000, 0.0000, 1193550.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (51, 15, 2, 18000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 2011800.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 1, 4400000.0000, 11000000.0000, 1748200.0000, 87410.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 17913829.5000, 1, 19160000.0000, 19160000.0000, 0.0000, 2013039.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (52, 15, 3, 5000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 578550.0000, CAST(0.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 0.0000, 0.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 5178022.5000, 0, 5510000.0000, 5510000.0000, 0.0000, 756572.5000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (53, 15, 4, 15000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1744050.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000, 0, NULL, 11000000.0000, 3865950.0000, 193297.5000, CAST(0.00 AS Decimal(5, 2)), NULL, 14672652.5000, 0, 16610000.0000, 16610000.0000, 0.0000, 1610000.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (54, 15, 17, 3000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 315000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 3000000.0000, 300000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 2385000.0000, 0, 3000000.0000, 3000000.0000, 0.0000, 0.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (55, 15, 18, 10000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 1129800.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 10760000.0000, 1076000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 8981910.0000, 0, 10760000.0000, 10760000.0000, 0.0000, 1187710.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (56, 15, 20, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 32100000.0000, 3210000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 25761000.0000, 0, 32100000.0000, 32100000.0000, 0.0000, 2100000.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (57, 15, 21, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(10.00 AS Decimal(5, 2)), 0.0000, NULL, NULL, NULL, 30000000.0000, 3000000.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 25064550.0000, 0, 30000000.0000, 30000000.0000, 0.0000, 1193550.0000)
INSERT [dbo].[Payroll] ([ID], [ID_PayrollCategory], [ID_Employee], [Salary], [SocialInsurance], [HealthInsurance], [UnemploymentInsurance], [InsuranceCeiling], [TotalPriceInsurance], [Tax], [TaxDeductions], [NumberOfDependents], [DependencyDeduction], [FamilyAllowances], [TaxableSalary], [TotalPriceTax], [NumberDaysLeave], [PriceForOneDayOff], [Total_Price], [State], [SalaryTaxable], [SalaryInsurance], [MissingAmount], [TotalAllowance]) VALUES (58, 15, 39, 30000000.0000, CAST(8.00 AS Decimal(5, 2)), CAST(1.50 AS Decimal(5, 2)), CAST(1.00 AS Decimal(5, 2)), 29800000.0000, 3129000.0000, CAST(15.00 AS Decimal(5, 2)), 750000.0000, 0, NULL, 11000000.0000, 15871000.0000, 1630650.0000, CAST(0.00 AS Decimal(5, 2)), NULL, 26607367.5000, 0, 30000000.0000, 30000000.0000, 0.0000, 1367017.5000)
SET IDENTITY_INSERT [dbo].[Payroll] OFF
GO
SET IDENTITY_INSERT [dbo].[PayrollCategory] ON 

INSERT [dbo].[PayrollCategory] ([ID], [Name], [Date]) VALUES (12, N'Lương Tháng 03, 2023', CAST(N'2023-03-23' AS Date))
INSERT [dbo].[PayrollCategory] ([ID], [Name], [Date]) VALUES (13, N'Lương Tháng 04, 2023', CAST(N'2023-04-05' AS Date))
INSERT [dbo].[PayrollCategory] ([ID], [Name], [Date]) VALUES (14, N'Lương Tháng 05, 2023', CAST(N'2023-05-01' AS Date))
INSERT [dbo].[PayrollCategory] ([ID], [Name], [Date]) VALUES (15, N'Lương Tháng 06, 2023', CAST(N'2023-06-01' AS Date))
SET IDENTITY_INSERT [dbo].[PayrollCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonalSkills] ON 

INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (22, 5, 7)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (23, 5, 10)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (24, 3, 23)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (25, 3, 1)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (26, 3, 4)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (27, 3, 5)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (28, 3, 6)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (29, 3, 10)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (30, 3, 13)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (40, 19, 3)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (41, 19, 4)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (49, 2, 22)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (50, 2, 23)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (51, 2, 1)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (52, 2, 2)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (53, 2, 3)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (54, 2, 4)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (55, 2, 5)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (56, 2, 8)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (57, 2, 9)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (58, 20, 22)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (59, 20, 1)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (60, 4, 22)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (61, 4, 23)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (62, 4, 3)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (63, 4, 4)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (64, 4, 13)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (65, 7, 22)
INSERT [dbo].[PersonalSkills] ([ID], [ID_Employee], [ID_Skills]) VALUES (66, 7, 23)
SET IDENTITY_INSERT [dbo].[PersonalSkills] OFF
GO
SET IDENTITY_INSERT [dbo].[Position] ON 

INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (1, N'Admin', NULL, 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (2, N'Full-Stack Developer', N'Người làm việc với back end hoặc front end. Các nhà phát triển Full Stack phải có một số kỹ năng trong nhiều lĩnh vực khác nhau như mã hóa, cơ sở dữ liệu, thiết kế đồ họa và quản lý UI / UX.', 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (3, N'Front-End Developer', N'Người tập trung phát triển phía Client Side, nói một cách đơn giản dễ hiểu là tập trung vào mảng phát triển xây dựng giao diện một website tĩnh, tạo nền tảng trải nghiệm cho người dùng.', 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (4, N'Business Analyst', N'Phân tích thống kê các tập dữ liệu lớn để xác định các cách hiệu quả để thúc đẩy hiệu suất của tổ chức. Sử dụng phân tích dữ liệu, một nhà phân tích kinh doanh thu được những thông tin chi tiết có ý nghĩa.', 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (5, N'Tester', N'Người kiểm tra chất lượng phần mềm, phát hiện ra các lỗi, sai sót hay bất cứ vấn đề nào có thể ảnh hưởng đến chất lượng phần mềm.', 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (6, N'Back-End Developer', N'Người đảm nhiệm các hoạt động phía sau hậu trường của một trang web. Công việc của Backend Developer là chịu trách nhiệm xây dựng mã và ngôn ngữ chạy phía sau hậu trường trên trang chủ web.', 2)
INSERT [dbo].[Position] ([ID], [Name], [Description], [ID_Department]) VALUES (7, N'Kế toán trưởng', N'', 6)
SET IDENTITY_INSERT [dbo].[Position] OFF
GO
SET IDENTITY_INSERT [dbo].[Projects] ON 

INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (27, N'Dự án xây dựng phần mềm công ty', N'Cần xây dựng một phần mềm mới với nhiều chức năng', CAST(N'2023-04-21' AS Date), CAST(N'2023-05-06' AS Date), NULL, N'DA00000027', 1)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (29, N'Bán Laptop', N'', CAST(N'2023-04-28' AS Date), CAST(N'2023-05-15' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2Fqb60ctu4fph09w1voyd51cr7yl6karN%E1%BB%99i%20dung%20%C3%B4n%20t%C3%A2p%20m%C3%B4n%20TTHCM%20HK2%2022-23.pdf?alt=media&token=d027e34f-fe41-45bf-b8b1-f5998758a310', N'DA00000029', 0)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (30, N'Bán giày thể thao Nike', N'', CAST(N'2023-05-06' AS Date), CAST(N'2023-05-26' AS Date), N'https://firebasestorage.googleapis.com/v0/b/it-global-project.appspot.com/o/images%2F6fd170kylv6w3k9gddzyzgzczp0uwqluong-thang-03-2023-NV-NV00000020.pdf?alt=media&token=5b7d59e8-a62c-43c8-8c44-f5fb4a6fe7c0', N'DA00000030', 0)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (31, N'Dự án Xây dựng phần mềm bán nước hoa', N'', CAST(N'2023-05-19' AS Date), CAST(N'2023-06-23' AS Date), NULL, N'DA00000031', 0)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (32, N'Website quản lý phân bón và thuốc trừ sâu', N'', CAST(N'2023-05-20' AS Date), CAST(N'2023-06-30' AS Date), NULL, N'DA00000032', 0)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (33, N'Website bán hoa quả', N'', CAST(N'2023-05-25' AS Date), CAST(N'2023-05-31' AS Date), NULL, N'DA00000033', 0)
INSERT [dbo].[Projects] ([ID], [Name], [Description], [StartDate], [EndDate], [ContractUrl], [ID_Project], [Lock]) VALUES (34, N'Website bán nước hoa', N'', CAST(N'2023-06-06' AS Date), CAST(N'2023-09-21' AS Date), NULL, N'DA00000034', 0)
SET IDENTITY_INSERT [dbo].[Projects] OFF
GO
SET IDENTITY_INSERT [dbo].[Recruitment] ON 

INSERT [dbo].[Recruitment] ([ID], [ID_Position], [Title], [Amount], [Form], [Sex], [Experience], [MinimumWage], [JobDescription], [CandidateRequirement], [CandidateBenefits], [Status], [DateCreateOrPosted], [Views], [MaximumWage], [CVSubmissionDeadline]) VALUES (1, 3, N'Tuyển nhân viên code Web Front-End', 3, N'Bán thời gian', N'Không yêu cầu', N'Từ 1 năm kinh nghiệm', 8000000.0000, N'- Tham gia thiết kế và phát triển các sản phẩm phần mềm của công ty hoặc cho khách hàng tại Việt Nam (sử dụng ngôn ngữ PHP)
- Thực hiện xây dựng ứng dụng bằng PHP & My SQL, Javascrip hoặc các website của công ty', N'- Có kinh nghiệm sử dụng một số Framework PHP: CakePHP,...
- Thao tác tốt với HTML, CSS, Javascrip,...
- Có kinh nghiệm về MVC Framework, My SQL, github.
- Ưu tiên những ứng viên tốt nghiệp Đại học, Cao đẳng', N'- Lương thỏa thuận: từ 8-15 triệu 
- Thưởng lương tháng 13, thưởng theo dự án phát triển
- Đầy đủ các bảo hiểm lao động hiện hành
- Chính sách phúc lợi theo quy định công ty: Các hoạt động tri ân, hoạt động ngày lễ,...', 0, CAST(N'2023-01-10T15:13:59.093' AS DateTime), 34, 15000000.0000, CAST(N'2023-02-22' AS Date))
INSERT [dbo].[Recruitment] ([ID], [ID_Position], [Title], [Amount], [Form], [Sex], [Experience], [MinimumWage], [JobDescription], [CandidateRequirement], [CandidateBenefits], [Status], [DateCreateOrPosted], [Views], [MaximumWage], [CVSubmissionDeadline]) VALUES (2, 2, N'Tuyển nhân viên code Full-Stack Developer', 4, N'Toàn thời gian', N'Không yêu cầu', N'Từ 2 năm kinh nghiệm', 20000000.0000, N'- Tham gia thiết kế và phát triển các sản phẩm phần mềm của công ty hoặc cho khách hàng tại Việt Nam (sử dụng ngôn ngữ PHP)
- Thực hiện xây dựng ứng dụng bằng PHP & My SQL, Javascrip, APS.NET Core, APS.NET Framework, C# hoặc các website của công ty.', N'- Có kinh nghiệm sử dụng một số Framework PHP: CakePHP,...
- Thao tác tốt với HTML, CSS, Javascrip,... hoặc các dự án của công ty.
- Có kinh nghiệm về MVC Framework, My SQL, github.
- Ưu tiên những ứng viên tốt nghiệp Đại học, Cao đẳng.', N'- Lương thỏa thuận: từ 20-30 triệu
- Thưởng lương tháng 13, thưởng theo dự án phát triển
- Đầy đủ các bảo hiểm lao động hiện hành
- Chính sách phúc lợi theo quy định công ty: Các hoạt động tri ân, hoạt động ngày lễ,...', 0, CAST(N'2023-01-11T22:42:53.303' AS DateTime), 32, 30000000.0000, CAST(N'2023-03-17' AS Date))
INSERT [dbo].[Recruitment] ([ID], [ID_Position], [Title], [Amount], [Form], [Sex], [Experience], [MinimumWage], [JobDescription], [CandidateRequirement], [CandidateBenefits], [Status], [DateCreateOrPosted], [Views], [MaximumWage], [CVSubmissionDeadline]) VALUES (3, 3, N'Tuyển nhân viên IT', 5, N'Thực tập sinh,Bán thời gian,Toàn thời gian', N'Không yêu cầu', N'Không yêu cầu kinh nghiệm', 5000000.0000, N'Tham gia phát triển phần mềm', N'Giao tiếp bằng tiếng Anh là một lợi thế.', N'Môi trường làm việc lành mạnh, năng động, đồng nghiệp hòa đồng :))', 1, CAST(N'2023-04-12T02:17:40.557' AS DateTime), 19, 20000000.0000, CAST(N'2023-12-12' AS Date))
SET IDENTITY_INSERT [dbo].[Recruitment] OFF
GO
SET IDENTITY_INSERT [dbo].[SkillOfRecruitment] ON 

INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (21, 3, 1)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (22, 4, 1)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (23, 6, 1)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (24, 8, 1)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (25, 23, 1)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (46, 1, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (47, 2, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (48, 3, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (49, 4, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (50, 5, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (51, 6, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (52, 8, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (53, 9, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (54, 13, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (55, 23, 2)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (59, 3, 3)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (60, 4, 3)
INSERT [dbo].[SkillOfRecruitment] ([ID], [ID_Skills], [ID_Recruitment]) VALUES (61, 6, 3)
SET IDENTITY_INSERT [dbo].[SkillOfRecruitment] OFF
GO
SET IDENTITY_INSERT [dbo].[Skills] ON 

INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (1, N'ASP.NET Framework', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (2, N'C#', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (3, N'JavaScript', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (4, N'HTML5 & CSS3', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (5, N'SQL Server', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (6, N'PHP', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (7, N'Python', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (8, N'Java', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (9, N'ASP.NET Core', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (10, N'PHP Laravel', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (11, N'Java Spring Boot', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (12, N'React Native', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (13, N'React JS', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (15, N'Angular', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (16, N'Bash/Shell', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (18, N'Kotlin', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (19, N'Swift', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (20, N'Rust', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (21, N'Ruby', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (22, N'SQL Server', 2)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (23, N'My SQL', 2)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (24, N'PostgreSQL', 2)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (25, N'MongoDB', 2)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (26, N'C', 1)
INSERT [dbo].[Skills] ([ID], [Name], [ID_SkillsCategory]) VALUES (28, N'Nodejs', 1)
SET IDENTITY_INSERT [dbo].[Skills] OFF
GO
SET IDENTITY_INSERT [dbo].[SkillsCategory] ON 

INSERT [dbo].[SkillsCategory] ([ID], [Name]) VALUES (1, N'Lập Trình')
INSERT [dbo].[SkillsCategory] ([ID], [Name]) VALUES (2, N'Cơ Sở Dữ Liệu')
INSERT [dbo].[SkillsCategory] ([ID], [Name]) VALUES (4, N'BA')
SET IDENTITY_INSERT [dbo].[SkillsCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[Subsidies] ON 

INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (8, 4, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (9, 4, 3)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (10, 4, 1)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (11, 4, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (12, 5, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (13, 5, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (14, 15, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (15, 15, 1)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (16, 15, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (18, 6, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (24, 19, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (25, 19, 3)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (26, 19, 1)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (27, 19, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (30, 21, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (40, 3, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (41, 3, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (42, 3, 3)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (43, 3, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (44, 2, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (45, 2, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (46, 2, 3)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (47, 2, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (48, 18, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (49, 18, 4)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (50, 18, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (54, 20, 1)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (55, 20, 2)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (56, 38, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (57, 38, 8)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (58, 39, 5)
INSERT [dbo].[Subsidies] ([ID], [ID_Employee], [ID_SubsidiesCategory]) VALUES (59, 39, 8)
SET IDENTITY_INSERT [dbo].[Subsidies] OFF
GO
SET IDENTITY_INSERT [dbo].[SubsidiesApply] ON 

INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (346, 31, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (347, 31, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (348, 31, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 0, 832650.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (353, 33, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (354, 33, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 0, 538650.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (355, 33, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 468112.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (356, 43, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 931500.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (577, 35, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (578, 35, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 900000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (579, 35, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 824573.4333)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (580, 36, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (581, 36, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 250000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (582, 36, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 180819.8333)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (583, 37, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (584, 37, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (585, 37, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 750000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (586, 39, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (587, 39, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 500000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (588, 39, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 384880.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (589, 41, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 1262017.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (665, 34, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (666, 34, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 900000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (667, 34, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 853039.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (668, 30, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (669, 30, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 250000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (670, 30, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 246572.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (977, 49, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (978, 49, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 1500000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1006, 44, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1007, 44, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 900000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1008, 44, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 798004.6935)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1009, 45, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1010, 45, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 250000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1011, 45, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 246572.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1012, 46, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1013, 46, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1014, 46, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 750000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1015, 48, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1016, 48, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 500000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1017, 48, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 386318.7096)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1018, 50, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 1193550.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1034, 51, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1035, 51, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 900000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1036, 51, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 853039.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1049, 52, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1050, 52, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 250000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1051, 52, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 246572.5000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1052, 53, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1053, 53, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1054, 53, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 750000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1055, 55, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1, 260000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1056, 55, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 500000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1057, 55, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 427710.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1058, 56, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1, 600000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1059, 56, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1, 1500000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1060, 57, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 1193550.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1061, 58, N'Thưởng tuần', 100000.0000, NULL, NULL, 0, 0, 0, 100000.0000)
INSERT [dbo].[SubsidiesApply] ([ID], [ID_Payroll], [Name], [Price], [Percentage], [OnBasicSalary], [Date_Apply], [Tax], [Insurance], [Total_Price]) VALUES (1062, 58, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL, 1267017.5000)
SET IDENTITY_INSERT [dbo].[SubsidiesApply] OFF
GO
SET IDENTITY_INSERT [dbo].[SubsidiesCategory] ON 

INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (1, N'Tiền ăn trưa', 600000.0000, NULL, NULL, 0, 1, 1)
INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (2, N'Tiền xăng xe', 0.0000, CAST(5.00 AS Decimal(5, 2)), 1, 0, 1, 1)
INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (3, N'Thưởng tết', 500000.0000, NULL, NULL, 1, 0, 1)
INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (4, N'Sinh nhật', 260000.0000, NULL, NULL, 0, 1, 1)
INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (5, N'Nghỉ đẻ', 0.0000, CAST(5.00 AS Decimal(5, 2)), 0, 0, NULL, NULL)
INSERT [dbo].[SubsidiesCategory] ([ID], [Name], [Price], [Percentage], [OnBasicSalary], [DateApply], [Tax], [Insurance]) VALUES (8, N'Thưởng tuần', 100000.0000, NULL, NULL, 0, 0, 0)
SET IDENTITY_INSERT [dbo].[SubsidiesCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[Tasks] ON 

INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (41, 19, 27, N'Code', N'', N'done', CAST(N'2023-04-24T00:00:00.000' AS DateTime), CAST(15.0000 AS Decimal(14, 4)), CAST(8.0000 AS Decimal(14, 4)), NULL, NULL, NULL, CAST(N'2023-04-23T18:22:57.740' AS DateTime), CAST(N'2023-05-24T21:56:25.763' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (42, 18, 29, N'Code BEE', N'', N'review', CAST(N'2023-04-29T00:00:00.000' AS DateTime), CAST(2.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-06-10T10:49:34.610' AS DateTime), CAST(N'2023-05-15T20:26:39.377' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (43, 2, 29, N'Vẽ prototype cho cho chức năng đăng nhập', N'Oke', N'done', CAST(N'2023-04-25T00:00:00.000' AS DateTime), CAST(14.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-05-01T17:41:26.597' AS DateTime), CAST(N'2023-05-25T13:19:10.137' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (44, 18, 27, N'Testing', N'', N'done', CAST(N'2023-05-06T00:00:00.000' AS DateTime), CAST(24.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-05-24T21:54:13.163' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (47, 18, 30, N'Be', N'', N'done', CAST(N'2023-05-23T00:00:00.000' AS DateTime), CAST(15.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, NULL, CAST(N'2023-05-23T21:32:18.643' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (48, 18, 31, N'code BE', N'', N'review', CAST(N'2023-05-27T00:00:00.000' AS DateTime), CAST(24.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (49, 20, 31, N'Testing', N'', N'review', CAST(N'2023-05-24T00:00:00.000' AS DateTime), CAST(45.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-05-19T16:48:28.657' AS DateTime), 2)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (50, 18, 32, N'Code BE', N'', N'done', CAST(N'2023-05-24T00:00:00.000' AS DateTime), CAST(15.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-05-24T21:50:42.370' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (51, 25, 33, N'code', N'code code code', N'do', CAST(N'2023-05-30T00:00:00.000' AS DateTime), CAST(28.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, NULL, 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (52, 24, 33, N'code1', N'code code code', N'do', CAST(N'2023-05-31T00:00:00.000' AS DateTime), CAST(32.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-05-26T00:13:57.913' AS DateTime), CAST(N'2023-05-26T00:14:07.710' AS DateTime), 2)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (53, 2, 33, N'aaaa', N'', N'do', CAST(N'2023-06-08T00:00:00.000' AS DateTime), CAST(3.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, NULL, 3)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (54, 7, 34, N'Vẽ prototype cho cho chức năng đăng nhập', N'Hoàn thành', N'done', CAST(N'2023-06-15T00:00:00.000' AS DateTime), CAST(25.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-06-03T09:22:42.547' AS DateTime), CAST(N'2023-06-09T20:01:31.917' AS DateTime), 2)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (55, 7, 34, N'Code Front-end of User', N'', N'review', CAST(N'2023-06-06T00:00:00.000' AS DateTime), CAST(23.0000 AS Decimal(14, 4)), CAST(15.0000 AS Decimal(14, 4)), NULL, NULL, NULL, CAST(N'2023-06-07T13:36:25.900' AS DateTime), NULL, 2)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (56, 7, 34, N'Code Front-end of Admin', N'', N'done', CAST(N'2023-06-08T00:00:00.000' AS DateTime), CAST(12.0000 AS Decimal(14, 4)), CAST(0.0000 AS Decimal(14, 4)), NULL, NULL, NULL, NULL, CAST(N'2023-06-09T20:01:31.917' AS DateTime), 1)
INSERT [dbo].[Tasks] ([ID], [ID_Employee], [ID_Project], [Name], [Description], [State], [Deadline], [OriginalEstimate], [CompletedWork], [DocumentName], [DocumentType], [DocumentURL], [StartDate], [EndDate], [OrdinalNumbers]) VALUES (57, 2, 34, N'Website chia sẽ nội dung về Nail Lucy''s Stash', N'', N'review', CAST(N'2023-06-15T00:00:00.000' AS DateTime), CAST(13.0000 AS Decimal(14, 4)), CAST(15.0000 AS Decimal(14, 4)), NULL, NULL, NULL, CAST(N'2023-06-10T10:46:48.103' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[Tasks] OFF
GO
SET IDENTITY_INSERT [dbo].[Tax] ON 

INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (1, 0.0000, 5000000.0000, CAST(5.00 AS Decimal(5, 2)), 0.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (2, 5000001.0000, 10000000.0000, CAST(10.00 AS Decimal(5, 2)), 250000.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (3, 10000001.0000, 18000000.0000, CAST(15.00 AS Decimal(5, 2)), 750000.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (4, 18000001.0000, 32000000.0000, CAST(20.00 AS Decimal(5, 2)), 1650000.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (5, 32000001.0000, 52000000.0000, CAST(25.00 AS Decimal(5, 2)), 3250000.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (6, 52000001.0000, 80000000.0000, CAST(30.00 AS Decimal(5, 2)), 5850000.0000)
INSERT [dbo].[Tax] ([ID], [MinPrice], [MaxPrice], [Percentage], [Deductible]) VALUES (8, 80000001.0000, 1000000000.0000, CAST(35.00 AS Decimal(5, 2)), 9850000.0000)
SET IDENTITY_INSERT [dbo].[Tax] OFF
GO
SET IDENTITY_INSERT [dbo].[Teams] ON 

INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (72, 19, 27)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (73, 18, 29)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (74, 2, 29)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (75, 18, 27)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (76, 19, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (77, 14, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (78, 25, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (79, 25, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (80, 24, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (81, 25, 31)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (82, 20, 31)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (83, 18, 32)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (84, 18, 31)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (85, 18, 30)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (86, 25, 33)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (87, 24, 33)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (88, 2, 33)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (89, 2, 34)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (90, 19, 34)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (91, 7, 34)
INSERT [dbo].[Teams] ([ID], [ID_Employee], [ID_Project]) VALUES (92, 39, 34)
SET IDENTITY_INSERT [dbo].[Teams] OFF
GO
ALTER TABLE [dbo].[ApplyLeaveType]  WITH CHECK ADD  CONSTRAINT [FK_ApplyLeaveType_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[ApplyLeaveType] CHECK CONSTRAINT [FK_ApplyLeaveType_Employees]
GO
ALTER TABLE [dbo].[ApplyLeaveType]  WITH CHECK ADD  CONSTRAINT [FK_ApplyLeaveType_LeaveType] FOREIGN KEY([ID_Leave_Type])
REFERENCES [dbo].[LeaveType] ([ID])
GO
ALTER TABLE [dbo].[ApplyLeaveType] CHECK CONSTRAINT [FK_ApplyLeaveType_LeaveType]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Employees]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Tasks] FOREIGN KEY([ID_Task])
REFERENCES [dbo].[Tasks] ([ID])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Tasks]
GO
ALTER TABLE [dbo].[Debts]  WITH CHECK ADD  CONSTRAINT [FK_Debts_Projects] FOREIGN KEY([ID_Project])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[Debts] CHECK CONSTRAINT [FK_Debts_Projects]
GO
ALTER TABLE [dbo].[DependentsInformation]  WITH CHECK ADD  CONSTRAINT [FK_DependentsInformation_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[DependentsInformation] CHECK CONSTRAINT [FK_DependentsInformation_Employees]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Position] FOREIGN KEY([ID_Position])
REFERENCES [dbo].[Position] ([ID])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Position]
GO
ALTER TABLE [dbo].[EmploymentContracts]  WITH CHECK ADD  CONSTRAINT [FK_EmploymentContracts_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[EmploymentContracts] CHECK CONSTRAINT [FK_EmploymentContracts_Employees]
GO
ALTER TABLE [dbo].[Histories]  WITH CHECK ADD  CONSTRAINT [FK_Histories_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Histories] CHECK CONSTRAINT [FK_Histories_Employees]
GO
ALTER TABLE [dbo].[Histories]  WITH CHECK ADD  CONSTRAINT [FK_Histories_Payroll] FOREIGN KEY([ID_Payroll])
REFERENCES [dbo].[Payroll] ([ID])
GO
ALTER TABLE [dbo].[Histories] CHECK CONSTRAINT [FK_Histories_Payroll]
GO
ALTER TABLE [dbo].[Histories]  WITH CHECK ADD  CONSTRAINT [FK_Histories_Projects] FOREIGN KEY([ID_Projects])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[Histories] CHECK CONSTRAINT [FK_Histories_Projects]
GO
ALTER TABLE [dbo].[Histories]  WITH CHECK ADD  CONSTRAINT [FK_Histories_Tasks] FOREIGN KEY([ID_Task])
REFERENCES [dbo].[Tasks] ([ID])
GO
ALTER TABLE [dbo].[Histories] CHECK CONSTRAINT [FK_Histories_Tasks]
GO
ALTER TABLE [dbo].[LanguagesSkills]  WITH CHECK ADD  CONSTRAINT [FK_LanguagesSkills_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[LanguagesSkills] CHECK CONSTRAINT [FK_LanguagesSkills_Employees]
GO
ALTER TABLE [dbo].[LeaveApplication]  WITH CHECK ADD  CONSTRAINT [FK_LeaveApplication_ApplyLeaveType] FOREIGN KEY([ID_ApplyLeaveType])
REFERENCES [dbo].[ApplyLeaveType] ([ID])
GO
ALTER TABLE [dbo].[LeaveApplication] CHECK CONSTRAINT [FK_LeaveApplication_ApplyLeaveType]
GO
ALTER TABLE [dbo].[LeaveApplication]  WITH CHECK ADD  CONSTRAINT [FK_LeaveApplication_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[LeaveApplication] CHECK CONSTRAINT [FK_LeaveApplication_Employees]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Employees]
GO
ALTER TABLE [dbo].[OnLeave]  WITH CHECK ADD  CONSTRAINT [FK_OnLeave_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[OnLeave] CHECK CONSTRAINT [FK_OnLeave_Employees]
GO
ALTER TABLE [dbo].[OnLeave]  WITH CHECK ADD  CONSTRAINT [FK_OnLeave_LeaveDate] FOREIGN KEY([ID_LeaveDate])
REFERENCES [dbo].[LeaveDate] ([ID])
GO
ALTER TABLE [dbo].[OnLeave] CHECK CONSTRAINT [FK_OnLeave_LeaveDate]
GO
ALTER TABLE [dbo].[PartnerOfProject]  WITH CHECK ADD  CONSTRAINT [FK_PartnerOfProject_Partners] FOREIGN KEY([ID_Partners])
REFERENCES [dbo].[Partners] ([ID])
GO
ALTER TABLE [dbo].[PartnerOfProject] CHECK CONSTRAINT [FK_PartnerOfProject_Partners]
GO
ALTER TABLE [dbo].[PartnerOfProject]  WITH CHECK ADD  CONSTRAINT [FK_PartnerOfProject_Projects] FOREIGN KEY([ID_Project])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[PartnerOfProject] CHECK CONSTRAINT [FK_PartnerOfProject_Projects]
GO
ALTER TABLE [dbo].[PaymentHistory]  WITH CHECK ADD  CONSTRAINT [FK_PaymentHistory_Debts] FOREIGN KEY([ID_Debts])
REFERENCES [dbo].[Debts] ([ID])
GO
ALTER TABLE [dbo].[PaymentHistory] CHECK CONSTRAINT [FK_PaymentHistory_Debts]
GO
ALTER TABLE [dbo].[PaymentHistory]  WITH CHECK ADD  CONSTRAINT [FK_PaymentHistory_Projects] FOREIGN KEY([ID_Projects])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[PaymentHistory] CHECK CONSTRAINT [FK_PaymentHistory_Projects]
GO
ALTER TABLE [dbo].[Payroll]  WITH CHECK ADD  CONSTRAINT [FK_Payroll_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Payroll] CHECK CONSTRAINT [FK_Payroll_Employees]
GO
ALTER TABLE [dbo].[Payroll]  WITH CHECK ADD  CONSTRAINT [FK_Payroll_PayrollCategory] FOREIGN KEY([ID_PayrollCategory])
REFERENCES [dbo].[PayrollCategory] ([ID])
GO
ALTER TABLE [dbo].[Payroll] CHECK CONSTRAINT [FK_Payroll_PayrollCategory]
GO
ALTER TABLE [dbo].[PersonalSkills]  WITH CHECK ADD  CONSTRAINT [FK_PersonalSkills_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[PersonalSkills] CHECK CONSTRAINT [FK_PersonalSkills_Employees]
GO
ALTER TABLE [dbo].[PersonalSkills]  WITH CHECK ADD  CONSTRAINT [FK_PersonalSkills_SkillsCategory] FOREIGN KEY([ID_Skills])
REFERENCES [dbo].[Skills] ([ID])
GO
ALTER TABLE [dbo].[PersonalSkills] CHECK CONSTRAINT [FK_PersonalSkills_SkillsCategory]
GO
ALTER TABLE [dbo].[Position]  WITH CHECK ADD  CONSTRAINT [FK_Position_Department] FOREIGN KEY([ID_Department])
REFERENCES [dbo].[Department] ([ID])
GO
ALTER TABLE [dbo].[Position] CHECK CONSTRAINT [FK_Position_Department]
GO
ALTER TABLE [dbo].[Recruitment]  WITH CHECK ADD  CONSTRAINT [FK_Recruitment_Position] FOREIGN KEY([ID_Position])
REFERENCES [dbo].[Position] ([ID])
GO
ALTER TABLE [dbo].[Recruitment] CHECK CONSTRAINT [FK_Recruitment_Position]
GO
ALTER TABLE [dbo].[SkillOfRecruitment]  WITH CHECK ADD  CONSTRAINT [FK_SkillOfRecruitment_Recruitment] FOREIGN KEY([ID_Recruitment])
REFERENCES [dbo].[Recruitment] ([ID])
GO
ALTER TABLE [dbo].[SkillOfRecruitment] CHECK CONSTRAINT [FK_SkillOfRecruitment_Recruitment]
GO
ALTER TABLE [dbo].[SkillOfRecruitment]  WITH CHECK ADD  CONSTRAINT [FK_SkillOfRecruitment_SkillsCategory] FOREIGN KEY([ID_Skills])
REFERENCES [dbo].[Skills] ([ID])
GO
ALTER TABLE [dbo].[SkillOfRecruitment] CHECK CONSTRAINT [FK_SkillOfRecruitment_SkillsCategory]
GO
ALTER TABLE [dbo].[Skills]  WITH CHECK ADD  CONSTRAINT [FK_Skills_SkillsCategory] FOREIGN KEY([ID_SkillsCategory])
REFERENCES [dbo].[SkillsCategory] ([ID])
GO
ALTER TABLE [dbo].[Skills] CHECK CONSTRAINT [FK_Skills_SkillsCategory]
GO
ALTER TABLE [dbo].[Subsidies]  WITH CHECK ADD  CONSTRAINT [FK_Subsidies_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Subsidies] CHECK CONSTRAINT [FK_Subsidies_Employees]
GO
ALTER TABLE [dbo].[Subsidies]  WITH CHECK ADD  CONSTRAINT [FK_Subsidies_SubsidiesCategory] FOREIGN KEY([ID_SubsidiesCategory])
REFERENCES [dbo].[SubsidiesCategory] ([ID])
GO
ALTER TABLE [dbo].[Subsidies] CHECK CONSTRAINT [FK_Subsidies_SubsidiesCategory]
GO
ALTER TABLE [dbo].[SubsidiesApply]  WITH CHECK ADD  CONSTRAINT [FK_SubsidiesApply_Payroll] FOREIGN KEY([ID_Payroll])
REFERENCES [dbo].[Payroll] ([ID])
GO
ALTER TABLE [dbo].[SubsidiesApply] CHECK CONSTRAINT [FK_SubsidiesApply_Payroll]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Employees]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Projects] FOREIGN KEY([ID_Project])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Projects]
GO
ALTER TABLE [dbo].[Teams]  WITH CHECK ADD  CONSTRAINT [FK_Teams_Employees] FOREIGN KEY([ID_Employee])
REFERENCES [dbo].[Employees] ([ID])
GO
ALTER TABLE [dbo].[Teams] CHECK CONSTRAINT [FK_Teams_Employees]
GO
ALTER TABLE [dbo].[Teams]  WITH CHECK ADD  CONSTRAINT [FK_Teams_Projects] FOREIGN KEY([ID_Project])
REFERENCES [dbo].[Projects] ([ID])
GO
ALTER TABLE [dbo].[Teams] CHECK CONSTRAINT [FK_Teams_Projects]
GO
