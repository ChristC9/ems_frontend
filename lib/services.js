import api from "./api"

export const employeeService = {
  async getEmployees(page = 1, pageSize = 10, search = "") {
    const offset = (page - 1) * pageSize
    const params = new URLSearchParams({
      limit: pageSize.toString(),
      offset: offset.toString(),
    })

    if (search) {
      params.append("search", search)
    }

    const response = await api.get(`/ems/employees/?${params}`)
    return response.data
  },

  async getEmployee(id) {
    const response = await api.get(`/ems/employees/${id}/`)
    return response.data
  },

  async createEmployee(data) {
    const response = await api.post("/ems/employees/", data)
    return response.data
  },

  async updateEmployee(id, data) {
    const response = await api.put(`/ems/employees/${id}/`, data)
    return response.data
  },

  async deleteEmployee(id) {
    const response = await api.delete(`/ems/employees/${id}/`)
    return response.data
  },
}

export const departmentService = {
  async getDepartments() {
    const response = await api.get("/ems/departments/")
    return response.data
  },
}

export const positionService = {
  async getPositions() {
    const response = await api.get("/ems/positions/")
    return response.data
  },
}

export const managerService = {
  async getManagers() {
    const response = await api.get("/ems/managers/")
    return response.data
  },
}

export const payrollService = {
  async getPayrolls() {
    const response = await api.get("/payroll/payrolls/")
    return response.data
  },

  async createPayroll(data) {
    const response = await api.post("/payroll/payrolls/", data)
    return response.data
  },

  async updatePayroll(id, data) {
    const response = await api.put(`/payroll/payrolls/${id}/`, data)
    return response.data
  },

  async approvePayroll(id) {
    const response = await api.post(`/payroll/payrolls/${id}/approve/`)
    return response.data
  },

  // Add method to create payroll items
  async createPayrollItem(payrollId, itemData) {
    const response = await api.post(`/payroll/payrolls/${payrollId}/items/`, itemData)
    return response.data
  },

  async getSalaries() {
    const response = await api.get("/payroll/salaries/")
    return response.data
  },

  async getBonuses() {
    const response = await api.get("/payroll/bonuses/")
    return response.data
  },

  async getPayrollStatistics() {
    try {
      const [payrolls, salaries, employees] = await Promise.all([
        api.get("/payroll/payrolls/"),
        api.get("/payroll/salaries/"),
        api.get("/ems/employees/"),
      ])

      const totalEmployees = employees.data.length
      const monthlyPayroll = payrolls.data.reduce((sum, payroll) => sum + (payroll.gross_pay || 0), 0)
      const avgSalary =
        salaries.data.length > 0
          ? salaries.data.reduce((sum, salary) => sum + (salary.base_salary || 0), 0) / salaries.data.length
          : 0

      return {
        totalEmployees,
        monthlyPayroll,
        avgSalary,
      }
    } catch (error) {
      console.error("Failed to fetch payroll statistics:", error)
      return {
        totalEmployees: 0,
        monthlyPayroll: 0,
        avgSalary: 0,
      }
    }
  },

  async getRecentActivity() {
    try {
      const response = await api.get("/payroll/payrolls/?limit=10&ordering=-created_at")

      return response.data.map((payroll, index) => ({
        id: payroll.id,
        text: `Payroll processed for ${payroll.employee_name || "Employee"}`,
        time: this.getRelativeTime(payroll.created_at),
        color: index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-blue-500" : "bg-yellow-500",
      }))
    } catch (error) {
      console.error("Failed to fetch recent activity:", error)
      return []
    }
  },

  getRelativeTime(dateString) {
    if (!dateString) return "Unknown"

    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`

    return date.toLocaleDateString()
  },
}

export const timekeepingService = {
  async getTimeEntries() {
    const response = await api.get("/timekeeping/time-entries/")
    return response.data
  },

  async createTimeEntry(data) {
    const response = await api.post("/timekeeping/time-entries/", data)
    return response.data
  },

  async getLeaveRequests() {
    const response = await api.get("/timekeeping/leave-requests/")
    return response.data
  },

  async getHolidays() {
    const response = await api.get("/timekeeping/holidays/")
    return response.data
  },
}

export const benefitsService = {
  async getBenefitPlans() {
    const response = await api.get("/benefits/plans/")
    return response.data
  },

  async getEnrollments() {
    const response = await api.get("/benefits/enrollments/")
    return response.data
  },

  async getClaims() {
    const response = await api.get("/benefits/claims/")
    return response.data
  },
}

// New services for job postings and applications
export const jobPostingService = {
  async getJobPostings() {
    const response = await api.get("/recruitment/job-postings/")
    return response.data
  },

  async createJobPosting(data) {
    const response = await api.post("/recruitment/job-postings/", data)
    return response.data
  },

  async updateJobPosting(id, data) {
    const response = await api.put(`/recruitment/job-postings/${id}/`, data)
    return response.data
  },

  async deleteJobPosting(id) {
    const response = await api.delete(`/recruitment/job-postings/${id}/`)
    return response.data
  },

  async getJobPostingStatistics() {
    try {
      const jobPostings = await this.getJobPostings()
      const activeJobs = jobPostings.filter((job) => job.status === "active").length
      const totalApplications = jobPostings.reduce((sum, job) => sum + (job.applications_count || 0), 0)
      const avgApplicationsPerJob = activeJobs > 0 ? Math.round(totalApplications / activeJobs) : 0

      return {
        totalJobs: jobPostings.length,
        activeJobs,
        totalApplications,
        avgApplicationsPerJob,
      }
    } catch (error) {
      console.error("Failed to fetch job posting statistics:", error)
      return {
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        avgApplicationsPerJob: 0,
      }
    }
  },
}

export const applicationService = {
  async getApplications() {
    try {
      const response = await api.get("/recruitment/applications/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch applications:", error)
      // Return mock data if API fails
      return [
        {
          id: 1,
          candidate_name: "John Smith",
          candidate_email: "john.smith@email.com",
          job_posting: {
            id: 1,
            title: "Senior Software Engineer",
            department: "Engineering",
          },
          status: "pending",
          applied_at: "2025-01-22T10:30:00Z",
          experience_years: 5,
          resume_url: "/resumes/john-smith.pdf",
          cover_letter: "I am excited to apply for this position...",
        },
        {
          id: 2,
          candidate_name: "Sarah Johnson",
          candidate_email: "sarah.johnson@email.com",
          job_posting: {
            id: 1,
            title: "Senior Software Engineer",
            department: "Engineering",
          },
          status: "interview",
          applied_at: "2025-01-20T14:15:00Z",
          experience_years: 7,
          resume_url: "/resumes/sarah-johnson.pdf",
          cover_letter: "With 7 years of experience in software development...",
        },
        {
          id: 3,
          candidate_name: "Mike Davis",
          candidate_email: "mike.davis@email.com",
          job_posting: {
            id: 2,
            title: "Marketing Manager",
            department: "Marketing",
          },
          status: "rejected",
          applied_at: "2025-01-18T09:45:00Z",
          experience_years: 3,
          resume_url: "/resumes/mike-davis.pdf",
          cover_letter: "I believe my marketing background makes me a great fit...",
        },
        {
          id: 4,
          candidate_name: "Emily Chen",
          candidate_email: "emily.chen@email.com",
          job_posting: {
            id: 2,
            title: "Marketing Manager",
            department: "Marketing",
          },
          status: "hired",
          applied_at: "2025-01-15T16:20:00Z",
          experience_years: 6,
          resume_url: "/resumes/emily-chen.pdf",
          cover_letter: "I am passionate about driving marketing success...",
        },
      ]
    }
  },

  async updateApplicationStatus(id, status) {
    const response = await api.patch(`/recruitment/applications/${id}/`, { status })
    return response.data
  },

  async getApplicationStatistics() {
    try {
      const applications = await this.getApplications()
      const pending = applications.filter((app) => app.status === "pending").length
      const interview = applications.filter((app) => app.status === "interview").length
      const hired = applications.filter((app) => app.status === "hired").length
      const rejected = applications.filter((app) => app.status === "rejected").length

      return {
        total: applications.length,
        pending,
        interview,
        hired,
        rejected,
      }
    } catch (error) {
      console.error("Failed to fetch application statistics:", error)
      return {
        total: 0,
        pending: 0,
        interview: 0,
        hired: 0,
        rejected: 0,
      }
    }
  },
}

// Add performance management services at the end of the file

export const performanceService = {
  // Goals
  async getGoals() {
    try {
      const response = await api.get("/performance/goals/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch goals:", error)
      return []
    }
  },

  async createGoal(data) {
    const response = await api.post("/performance/goals/", data)
    return response.data
  },

  async updateGoal(id, data) {
    const response = await api.put(`/performance/goals/${id}/`, data)
    return response.data
  },

  async deleteGoal(id) {
    const response = await api.delete(`/performance/goals/${id}/`)
    return response.data
  },

  // Performance Reviews
  async getPerformanceReviews() {
    try {
      const response = await api.get("/performance/reviews/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch performance reviews:", error)
      return []
    }
  },

  async createPerformanceReview(data) {
    const response = await api.post("/performance/reviews/", data)
    return response.data
  },

  async updatePerformanceReview(id, data) {
    const response = await api.put(`/performance/reviews/${id}/`, data)
    return response.data
  },

  async deletePerformanceReview(id) {
    const response = await api.delete(`/performance/reviews/${id}/`)
    return response.data
  },

  // Feedback
  async getFeedback() {
    try {
      const response = await api.get("/performance/feedback/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch feedback:", error)
      return []
    }
  },

  async createFeedback(data) {
    const response = await api.post("/performance/feedback/", data)
    return response.data
  },

  async updateFeedback(id, data) {
    const response = await api.put(`/performance/feedback/${id}/`, data)
    return response.data
  },

  async deleteFeedback(id) {
    const response = await api.delete(`/performance/feedback/${id}/`)
    return response.data
  },

  // Statistics
  async getPerformanceStatistics() {
    try {
      const [goals, reviews, feedback] = await Promise.all([
        this.getGoals(),
        this.getPerformanceReviews(),
        this.getFeedback(),
      ])

      const activeGoals = goals.filter((goal) => goal.status === "active").length
      const completedGoals = goals.filter((goal) => goal.status === "completed").length
      const pendingReviews = reviews.filter((review) => review.status === "pending").length
      const avgRating =
        reviews.length > 0 ? reviews.reduce((sum, review) => sum + (review.overall_rating || 0), 0) / reviews.length : 0

      return {
        totalGoals: goals.length,
        activeGoals,
        completedGoals,
        totalReviews: reviews.length,
        pendingReviews,
        totalFeedback: feedback.length,
        avgRating: Math.round(avgRating * 10) / 10,
      }
    } catch (error) {
      console.error("Failed to fetch performance statistics:", error)
      return {
        totalGoals: 0,
        activeGoals: 0,
        completedGoals: 0,
        totalReviews: 0,
        pendingReviews: 0,
        totalFeedback: 0,
        avgRating: 0,
      }
    }
  },
}

// Finance Management Services
export const financeService = {
  // Budgets
  async getBudgets() {
    try {
      const response = await api.get("/finance/budgets/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch budgets:", error)
      return []
    }
  },

  async createBudget(data) {
    const response = await api.post("/finance/budgets/", data)
    return response.data
  },

  async updateBudget(id, data) {
    const response = await api.put(`/finance/budgets/${id}/`, data)
    return response.data
  },

  async deleteBudget(id) {
    const response = await api.delete(`/finance/budgets/${id}/`)
    return response.data
  },

  // Cost Centers
  async getCostCenters() {
    try {
      const response = await api.get("/finance/cost-centers/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch cost centers:", error)
      return []
    }
  },

  async createCostCenter(data) {
    const response = await api.post("/finance/cost-centers/", data)
    return response.data
  },

  async updateCostCenter(id, data) {
    const response = await api.put(`/finance/cost-centers/${id}/`, data)
    return response.data
  },

  async deleteCostCenter(id) {
    const response = await api.delete(`/finance/cost-centers/${id}/`)
    return response.data
  },

  // Expenses
  async getExpenses() {
    try {
      const response = await api.get("/finance/expenses/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
      return []
    }
  },

  async createExpense(data) {
    const response = await api.post("/finance/expenses/", data)
    return response.data
  },

  async updateExpense(id, data) {
    const response = await api.put(`/finance/expenses/${id}/`, data)
    return response.data
  },

  async deleteExpense(id) {
    const response = await api.delete(`/finance/expenses/${id}/`)
    return response.data
  },

  async approveExpense(id) {
    const response = await api.post(`/finance/expenses/${id}/approve/`)
    return response.data
  },

  async rejectExpense(id) {
    const response = await api.post(`/finance/expenses/${id}/reject/`)
    return response.data
  },

  // Statistics
  async getFinanceStatistics() {
    try {
      const [budgets, expenses, costCenters] = await Promise.all([
        this.getBudgets(),
        this.getExpenses(),
        this.getCostCenters(),
      ])

      const totalBudget = budgets.reduce((sum, budget) => sum + (budget.allocated_amount || 0), 0)
      const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
      const pendingExpenses = expenses.filter((expense) => expense.status === "pending").length

      return {
        totalBudgets: budgets.length,
        totalBudget,
        totalExpenses,
        remainingBudget: totalBudget - totalExpenses,
        totalCostCenters: costCenters.length,
        pendingExpenses,
      }
    } catch (error) {
      console.error("Failed to fetch finance statistics:", error)
      return {
        totalBudgets: 0,
        totalBudget: 0,
        totalExpenses: 0,
        remainingBudget: 0,
        totalCostCenters: 0,
        pendingExpenses: 0,
      }
    }
  },
}

// Audit Service
export const auditService = {
  async getAuditLogs() {
    try {
      const response = await api.get("/audit/logs/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch audit logs:", error)
      return []
    }
  },

  async getLoginAttempts() {
    try {
      const response = await api.get("/audit/login-attempts/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch login attempts:", error)
      return []
    }
  },

  async getSecurityEvents() {
    try {
      const response = await api.get("/audit/logs/security_events/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch security events:", error)
      return []
    }
  },

  async getActivitySummary() {
    try {
      const response = await api.get("/audit/logs/activity_summary/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch activity summary:", error)
      return {}
    }
  },
}
