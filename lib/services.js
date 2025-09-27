// import api from "./api"

// export const employeeService = {
//   async getEmployees(page = 1, pageSize = 10, search = "") {
//     const offset = (page - 1) * pageSize
//     const params = new URLSearchParams({
//       limit: pageSize.toString(),
//       offset: offset.toString(),
//     })

//     if (search) {
//       params.append("search", search)
//     }

//     const response = await api.get(`/ems/employees/?${params}`)
//     return response.data
//   },

//   async getEmployee(id) {
//     const response = await api.get(`/ems/employees/${id}/`)
//     return response.data
//   },

//   async createEmployee(data) {
//     const response = await api.post("/ems/employees/", data)
//     return response.data
//   },

//   async updateEmployee(id, data) {
//     const response = await api.put(`/ems/employees/${id}/`, data)
//     return response.data
//   },

//   async deleteEmployee(id) {
//     const response = await api.delete(`/ems/employees/${id}/`)
//     return response.data
//   },
// }

// export const departmentService = {
//   async getDepartments() {
//     const response = await api.get("/ems/departments/")
//     return response.data
//   },
// }

// export const positionService = {
//   async getPositions() {
//     const response = await api.get("/ems/positions/")
//     return response.data
//   },
// }

// export const managerService = {
//   async getManagers() {
//     const response = await api.get("/ems/managers/")
//     return response.data
//   },
// }

// export const payrollService = {
//   async getPayrolls(page = 1, limit = 10) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/payroll/payrolls/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch payrolls:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async getPayroll(id) {
//     const response = await api.get(`/payroll/payrolls/${id}/`)
//     return response.data
//   },

//   async createPayroll(data) {
//     const response = await api.post("/payroll/payrolls/", data)
//     return response.data
//   },

//   async updatePayroll(id, data) {
//     const response = await api.put(`/payroll/payrolls/${id}/`, data)
//     return response.data
//   },

//   async deletePayroll(id) {
//     const response = await api.delete(`/payroll/payrolls/${id}/`)
//     return response.data
//   },

//   async approvePayroll(id) {
//     const response = await api.post(`/payroll/payrolls/${id}/approve/`)
//     return response.data
//   },

//   // Add method to create payroll items
//   async createPayrollItem(payrollId, itemData) {
//     const response = await api.post(`/payroll/payrolls/${payrollId}/items/`, itemData)
//     return response.data
//   },

//   async getSalaries() {
//     const response = await api.get("/payroll/salaries/")
//     return response.data
//   },

//   async getBonuses() {
//     const response = await api.get("/payroll/bonuses/")
//     return response.data
//   },

//   async getPayrollStatistics() {
//     try {
//       const [payrolls] = await Promise.all([
//         api.get("/payroll/payrolls/statistics/")
//       ])

//       const totalEmployees = payrolls.data.total_payrolls
//       const monthlyPayroll = payrolls.data.total_gross_pay
//       const avgSalary = payrolls.data.total_avg_salary
//       return {
//         totalEmployees,
//         monthlyPayroll,
//         avgSalary,
//       }
//     } catch (error) {
//       console.error("Failed to fetch payroll statistics:", error)
//       return {
//         totalEmployees: 0,
//         monthlyPayroll: 0,
//         avgSalary: 0,
//       }
//     }
//   },

//   async getRecentActivity() {
//     try {
//       const response = await api.get("/payroll/payrolls/?limit=10&ordering=-created_at")

//       return response.data.map((payroll, index) => ({
//         id: payroll.id,
//         text: `Payroll processed for ${payroll.employee_name || "Employee"}`,
//         time: this.getRelativeTime(payroll.created_at),
//         color: index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-blue-500" : "bg-yellow-500",
//       }))
//     } catch (error) {
//       console.error("Failed to fetch recent activity:", error)
//       return []
//     }
//   },

//   getRelativeTime(dateString) {
//     if (!dateString) return "Unknown"

//     const date = new Date(dateString)
//     const now = new Date()
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

//     if (diffInHours < 1) return "Just now"
//     if (diffInHours < 24) return `${diffInHours} hours ago`

//     const diffInDays = Math.floor(diffInHours / 24)
//     if (diffInDays === 1) return "1 day ago"
//     if (diffInDays < 7) return `${diffInDays} days ago`

//     return date.toLocaleDateString()
//   },
// }

// export const timekeepingService = {
//   async getTimeEntries(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/timekeeping/time-entries/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch time entries:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async createTimeEntry(data) {
//     const response = await api.post("/timekeeping/time-entries/", data)
//     return response.data
//   },

//   async getLeaveRequests(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/timekeeping/leave-requests/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch leave requests:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async createLeaveRequest(data) {
//     const response = await api.post("/timekeeping/leave-requests/", data)
//     return response.data
//   },

//   async getHolidays(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/timekeeping/holidays/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch holidays:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },
// }

// export const benefitsService = {
//   async getBenefitPlans() {
//     const response = await api.get("/benefits/plans/")
//     return response.data
//   },

//   async getEnrollments() {
//     const response = await api.get("/benefits/enrollments/")
//     return response.data
//   },

//   async getClaims() {
//     const response = await api.get("/benefits/claims/")
//     return response.data
//   },
// }

// // Enhanced Job Posting Service with Offset-based Pagination
// export const jobPostingService = {
//   async getJobPostings(page = 1, limit = 2) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/recruitment/job-postings/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch job postings:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async createJobPosting(data) {
//     const response = await api.post("/recruitment/job-postings/", data)
//     return response.data
//   },

//   async updateJobPosting(id, data) {
//     const response = await api.put(`/recruitment/job-postings/${id}/`, data)
//     return response.data
//   },

//   async deleteJobPosting(id) {
//     const response = await api.delete(`/recruitment/job-postings/${id}/`)
//     return response.data
//   },

//   async getJobPostingStatuses() {
//     try {
//       const response = await api.get("/recruitment/job-postings/active/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch job posting statuses:", error)
//       // Return the required status options as fallback
//       return [
//         { value: "draft", label: "Draft" },
//         { value: "active", label: "Active" },
//         { value: "closed", label: "Closed" },
//         { value: "on_hold", label: "On Hold" },
//         { value: "cancelled", label: "Cancelled" },
//       ]
//     }
//   },

//   async getJobPostingStatistics() {
//     try {
//       const jobPostingsData = await this.getJobPostings(1, 100) // Get all for statistics
//       const jobPostings = jobPostingsData.results
//       const activeJobs = jobPostings.filter((job) => job.status === "active").length
//       const totalApplications = jobPostings.reduce((sum, job) => sum + (job.applications_count || 0), 0)
//       const avgApplicationsPerJob = activeJobs > 0 ? Math.round(totalApplications / activeJobs) : 0

//       return {
//         totalJobs: jobPostings.length,
//         activeJobs,
//         totalApplications,
//         avgApplicationsPerJob,
//       }
//     } catch (error) {
//       console.error("Failed to fetch job posting statistics:", error)
//       return {
//         totalJobs: 0,
//         activeJobs: 0,
//         totalApplications: 0,
//         avgApplicationsPerJob: 0,
//       }
//     }
//   },
// }

// // Enhanced Application Service with Offset-based Pagination
// export const applicationService = {
//   async getApplications(status = null, jobPostingId = null, page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const params = new URLSearchParams()
//       params.append("limit", limit.toString())
//       params.append("offset", offset.toString())

//       if (status && status !== "All Status") {
//         params.append("status", status)
//       }

//       if (jobPostingId && jobPostingId !== "All Jobs") {
//         params.append("job_posting", jobPostingId)
//       }

//       const response = await api.get(`/recruitment/applications/?${params.toString()}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || data.data || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch applications:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async getApplicants(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/recruitment/applicants/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || data.data || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch applicants:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async updateApplicationStatus(id, status) {
//     const response = await api.patch(`/recruitment/applications/${id}/`, { status })
//     return response.data
//   },

//   // Get application status options
//   async getApplicationStatuses() {
//     try {
//       // If there's a dedicated endpoint for status options, use it
//       // Otherwise, return the predefined status options
//       return [
//         { value: "received", label: "Received" },
//         { value: "screening", label: "Screening" },
//         { value: "phone_interview", label: "Phone Interview" },
//         { value: "interview", label: "Interview" },
//         { value: "final_interview", label: "Final Interview" },
//         { value: "reference_check", label: "Reference Check" },
//         { value: "offer", label: "Offer Extended" },
//         { value: "hired", label: "Hired" },
//         { value: "rejected", label: "Rejected" },
//         { value: "withdrawn", label: "Withdrawn" },
//       ]
//     } catch (error) {
//       console.error("Failed to fetch application statuses:", error)
//       // Return the required status options as fallback
//       return [
//         { value: "received", label: "Received" },
//         { value: "screening", label: "Screening" },
//         { value: "phone_interview", label: "Phone Interview" },
//         { value: "interview", label: "Interview" },
//         { value: "final_interview", label: "Final Interview" },
//         { value: "reference_check", label: "Reference Check" },
//         { value: "offer_extended", label: "Offer Extended" },
//         { value: "hired", label: "Hired" },
//         { value: "rejected", label: "Rejected" },
//         { value: "withdrawn", label: "Withdrawn" },
//       ]
//     }
//   },

//   async getApplicationStatistics(statusFilter = null, jobPostingFilter = null) {
//     try {
//       const applicationsData = await this.getApplications(statusFilter, jobPostingFilter, 1, 100) // Get all for statistics
//       const applications = applicationsData.results
//       const received = applications.filter((app) => app.status === "received").length
//       const screening = applications.filter((app) => app.status === "screening").length
//       const phoneInterview = applications.filter((app) => app.status === "phone_interview").length
//       const interview = applications.filter((app) => app.status === "interview").length
//       const finalInterview = applications.filter((app) => app.status === "final_interview").length
//       const referenceCheck = applications.filter((app) => app.status === "reference_check").length
//       const offerExtended = applications.filter((app) => app.status === "offer").length
//       const hired = applications.filter((app) => app.status === "hired").length
//       const rejected = applications.filter((app) => app.status === "rejected").length
//       const withdrawn = applications.filter((app) => app.status === "withdrawn").length

//       return {
//         total: applications.length,
//         received,
//         screening,
//         phoneInterview,
//         interview,
//         finalInterview,
//         referenceCheck,
//         offerExtended,
//         hired,
//         rejected,
//         withdrawn,
//       }
//     } catch (error) {
//       console.error("Failed to fetch application statistics:", error)
//       return {
//         total: 0,
//         received: 0,
//         screening: 0,
//         phoneInterview: 0,
//         interview: 0,
//         finalInterview: 0,
//         referenceCheck: 0,
//         offerExtended: 0,
//         hired: 0,
//         rejected: 0,
//         withdrawn: 0,
//       }
//     }
//   },
// }

// // Enhanced Interview Service with Offset-based Pagination
// export const interviewService = {
//   async getInterviews(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/recruitment/interviews/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch interviews:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async createInterview(data) {
//     const response = await api.post("/recruitment/interviews/", data)
//     return response.data
//   },

//   async updateInterview(id, data) {
//     const response = await api.put(`/recruitment/interviews/${id}/`, data)
//     return response.data
//   },

//   async deleteInterview(id) {
//     const response = await api.delete(`/recruitment/interviews/${id}/`)
//     return response.data
//   },

//   async getFinalList(status = "completed", interviewType = "technical") {
//     try {
//       const params = new URLSearchParams()
//       if (status) params.append("status", status)
//       if (interviewType) params.append("interview_type", interviewType)

//       const response = await api.get(`/recruitment/interviews/?${params.toString()}`)
//       const data = response.data

//       // Return the interviews data - this will be used for reference check applications
//       return Array.isArray(data) ? data : data.results || []
//     } catch (error) {
//       console.error("Failed to fetch completed technical interviews:", error)
//       return []
//     }
//   },
// }

// // Enhanced Reference Check Service with Offset-based Pagination
// export const referenceCheckService = {
//   async getReferenceChecks(page = 1, limit = 5) {
//     try {
//       const offset = (page - 1) * limit
//       const response = await api.get(`/recruitment/reference-checks/?limit=${limit}&offset=${offset}`)
//       const data = response.data

//       // Return standardized pagination structure
//       return {
//         results: Array.isArray(data) ? data : data.results || [],
//         count: data.count || (Array.isArray(data) ? data.length : 0),
//         next: data.next || null,
//         previous: data.previous || null,
//         total_pages: Math.ceil((data.count || 0) / limit),
//         current_page: page,
//       }
//     } catch (error) {
//       console.error("Failed to fetch reference checks:", error)
//       return {
//         results: [],
//         count: 0,
//         next: null,
//         previous: null,
//         total_pages: 0,
//         current_page: 1,
//       }
//     }
//   },

//   async createReferenceCheck(data) {
//     const response = await api.post("/recruitment/reference-checks/", data)
//     console.log(response.data)
//     return response.data
//   },

//   async updateReferenceCheck(id, data) {
//     const response = await api.put(`/recruitment/reference-checks/${id}/`, data)
//     return response.data
//   },

//   async deleteReferenceCheck(id) {
//     const response = await api.delete(`/recruitment/reference-checks/${id}/`)
//     return response.data
//   },
// }

// // Add performance management services at the end of the file

// export const performanceService = {
//   // Goals
//   async getGoals() {
//     try {
//       const response = await api.get("/performance/goals/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch goals:", error)
//       return []
//     }
//   },

//   async createGoal(data) {
//     const response = await api.post("/performance/goals/", data)
//     return response.data
//   },

//   async updateGoal(id, data) {
//     const response = await api.put(`/performance/goals/${id}/`, data)
//     return response.data
//   },

//   async deleteGoal(id) {
//     const response = await api.delete(`/performance/goals/${id}/`)
//     return response.data
//   },

//   // Performance Reviews
//   async getPerformanceReviews() {
//     try {
//       const response = await api.get("/performance/reviews/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch performance reviews:", error)
//       return []
//     }
//   },

//   async createPerformanceReview(data) {
//     const response = await api.post("/performance/reviews/", data)
//     return response.data
//   },

//   async updatePerformanceReview(id, data) {
//     const response = await api.put(`/performance/reviews/${id}/`, data)
//     return response.data
//   },

//   async deletePerformanceReview(id) {
//     const response = await api.delete(`/performance/reviews/${id}/`)
//     return response.data
//   },

//   // Feedback
//   async getFeedback() {
//     try {
//       const response = await api.get("/performance/feedback/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch feedback:", error)
//       return []
//     }
//   },

//   async createFeedback(data) {
//     const response = await api.post("/performance/feedback/", data)
//     return response.data
//   },

//   async updateFeedback(id, data) {
//     const response = await api.put(`/performance/feedback/${id}/`, data)
//     return response.data
//   },

//   async deleteFeedback(id) {
//     const response = await api.delete(`/performance/feedback/${id}/`)
//     return response.data
//   },

//   // Statistics
//   async getPerformanceStatistics() {
//     try {
//       const [goals, reviews, feedback] = await Promise.all([
//         this.getGoals(),
//         this.getPerformanceReviews(),
//         this.getFeedback(),
//       ])

//       const activeGoals = goals.filter((goal) => goal.status === "active").length
//       const completedGoals = goals.filter((goal) => goal.status === "completed").length
//       const pendingReviews = reviews.filter((review) => review.status === "pending").length
//       const avgRating =
//         reviews.length > 0 ? reviews.reduce((sum, review) => sum + (review.overall_rating || 0), 0) / reviews.length : 0

//       return {
//         totalGoals: goals.length,
//         activeGoals,
//         completedGoals,
//         totalReviews: reviews.length,
//         pendingReviews,
//         totalFeedback: feedback.length,
//         avgRating: Math.round(avgRating * 10) / 10,
//       }
//     } catch (error) {
//       console.error("Failed to fetch performance statistics:", error)
//       return {
//         totalGoals: 0,
//         activeGoals: 0,
//         completedGoals: 0,
//         totalReviews: 0,
//         pendingReviews: 0,
//         totalFeedback: 0,
//         avgRating: 0,
//       }
//     }
//   },
// }

// // Finance Management Services
// export const financeService = {
//   // Budgets
//   async getBudgets() {
//     try {
//       const response = await api.get("/finance/budgets/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch budgets:", error)
//       return []
//     }
//   },

//   async createBudget(data) {
//     const response = await api.post("/finance/budgets/", data)
//     return response.data
//   },

//   async updateBudget(id, data) {
//     const response = await api.put(`/finance/budgets/${id}/`, data)
//     return response.data
//   },

//   async deleteBudget(id) {
//     const response = await api.delete(`/finance/budgets/${id}/`)
//     return response.data
//   },

//   // Cost Centers
//   async getCostCenters() {
//     try {
//       const response = await api.get("/finance/cost-centers/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch cost centers:", error)
//       return []
//     }
//   },

//   async createCostCenter(data) {
//     const response = await api.post("/finance/cost-centers/", data)
//     return response.data
//   },

//   async updateCostCenter(id, data) {
//     const response = await api.put(`/finance/cost-centers/${id}/`, data)
//     return response.data
//   },

//   async deleteCostCenter(id) {
//     const response = await api.delete(`/finance/cost-centers/${id}/`)
//     return response.data
//   },

//   // Expenses
//   async getExpenses() {
//     try {
//       const response = await api.get("/finance/expenses/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch expenses:", error)
//       return []
//     }
//   },

//   async createExpense(data) {
//     const response = await api.post("/finance/expenses/", data)
//     return response.data
//   },

//   async updateExpense(id, data) {
//     const response = await api.put(`/finance/expenses/${id}/`, data)
//     return response.data
//   },

//   async deleteExpense(id) {
//     const response = await api.delete(`/finance/expenses/${id}/`)
//     return response.data
//   },

//   async approveExpense(id) {
//     const response = await api.post(`/finance/expenses/${id}/approve/`)
//     return response.data
//   },

//   async rejectExpense(id) {
//     const response = await api.post(`/finance/expenses/${id}/reject/`)
//     return response.data
//   },

//   // Statistics
//   async getFinanceStatistics() {
//     try {
//       const [budgets, expenses, costCenters] = await Promise.all([
//         this.getBudgets(),
//         this.getExpenses(),
//         this.getCostCenters(),
//       ])

//       const totalBudget = budgets.reduce((sum, budget) => sum + (budget.allocated_amount || 0), 0)
//       const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
//       const pendingExpenses = expenses.filter((expense) => expense.status === "pending").length

//       return {
//         totalBudgets: budgets.length,
//         totalBudget,
//         totalExpenses,
//         remainingBudget: totalBudget - totalExpenses,
//         totalCostCenters: costCenters.length,
//         pendingExpenses,
//       }
//     } catch (error) {
//       console.error("Failed to fetch finance statistics:", error)
//       return {
//         totalBudgets: 0,
//         totalBudget: 0,
//         totalExpenses: 0,
//         remainingBudget: 0,
//         totalCostCenters: 0,
//         pendingExpenses: 0,
//       }
//     }
//   },
// }

// // Audit Service
// export const auditService = {
//   async getAuditLogs() {
//     try {
//       const response = await api.get("/audit/logs/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch audit logs:", error)
//       return []
//     }
//   },

//   async getLoginAttempts() {
//     try {
//       const response = await api.get("/audit/login-attempts/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch login attempts:", error)
//       return []
//     }
//   },

//   async getSecurityEvents() {
//     try {
//       const response = await api.get("/audit/logs/security_events/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch security events:", error)
//       return []
//     }
//   },

//   async getActivitySummary() {
//     try {
//       const response = await api.get("/audit/logs/activity_summary/")
//       return response.data
//     } catch (error) {
//       console.error("Failed to fetch activity summary:", error)
//       return {}
//     }
//   },
// }

import api from "./api"

export const timekeepingService = {
  async getTimeEntries(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/timekeeping/time-entries/?limit=${limit}&offset=${offset}`)
      const data = response.data

      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch time entries:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async createTimeEntry(data) {
    const response = await api.post("/timekeeping/time-entries/", data)
    return response.data
  },

  async getLeaveRequests(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/timekeeping/leave-requests/?limit=${limit}&offset=${offset}`)
      const data = response.data

      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch leave requests:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async createLeaveRequest(data) {
    const response = await api.post("/timekeeping/leave-requests/", data)
    return response.data
  },

  async updateLeaveRequest(id, data) {
    const response = await api.put(`/timekeeping/leave-requests/${id}/`, data)
    return response.data
  },

  async getLeaveRequest(id) {
    const response = await api.get(`/timekeeping/leave-requests/${id}/`)
    return response.data
  },

  async getHolidays(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/timekeeping/holidays/?limit=${limit}&offset=${offset}`)
      const data = response.data

      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch holidays:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },
}

export const managerService = {
  async getManagers() {
    const response = await api.get("/ems/managers/")
    return response.data
  },
}

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

export const payrollService = {
  async getPayrolls(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/payroll/payrolls/?limit=${limit}&offset=${offset}`)
      const data = response.data

      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: data.total_pages || Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch payrolls:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async getPayroll(id) {
    const response = await api.get(`/payroll/payrolls/${id}/`)
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

  async deletePayroll(id) {
    const response = await api.delete(`/payroll/payrolls/${id}/`)
    return response.data
  },

  async approvePayroll(id) {
    const response = await api.post(`/payroll/payrolls/${id}/approve/`)
    return response.data
  },

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
      const [payrolls] = await Promise.all([
        api.get("/payroll/payrolls/statistics/")
      ])

      const totalEmployees = payrolls.data.total_payrolls
      const monthlyPayroll = payrolls.data.total_gross_pay
      const avgSalary = payrolls.data.total_avg_salary
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

// Enhanced Job Posting Service with Offset-based Pagination
export const jobPostingService = {
  async getJobPostings(page = 1, limit = 2) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/recruitment/job-postings/?limit=${limit}&offset=${offset}`)
      const data = response.data

      // Return standardized pagination structure
      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch job postings:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
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

  async getJobPostingStatuses() {
    try {
      const response = await api.get("/recruitment/job-postings/active/")
      return response.data
    } catch (error) {
      console.error("Failed to fetch job posting statuses:", error)
      // Return the required status options as fallback
      return [
        { value: "draft", label: "Draft" },
        { value: "active", label: "Active" },
        { value: "closed", label: "Closed" },
        { value: "on_hold", label: "On Hold" },
        { value: "cancelled", label: "Cancelled" },
      ]
    }
  },

  async getJobPostingStatistics() {
    try {
      const jobPostingsData = await this.getJobPostings(1, 100) // Get all for statistics
      const jobPostings = jobPostingsData.results
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

// Enhanced Application Service with Offset-based Pagination
export const applicationService = {
  async getApplications(status = null, jobPostingId = null, page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const params = new URLSearchParams()
      params.append("limit", limit.toString())
      params.append("offset", offset.toString())

      if (status && status !== "All Status") {
        params.append("status", status)
      }

      if (jobPostingId && jobPostingId !== "All Jobs") {
        params.append("job_posting", jobPostingId)
      }

      const response = await api.get(`/recruitment/applications/?${params.toString()}`)
      const data = response.data

      // Return standardized pagination structure
      return {
        results: Array.isArray(data) ? data : data.results || data.data || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async getApplicants(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/recruitment/applicants/?limit=${limit}&offset=${offset}`)
      const data = response.data

      // Return standardized pagination structure
      return {
        results: Array.isArray(data) ? data : data.results || data.data || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch applicants:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async updateApplicationStatus(id, status) {
    const response = await api.patch(`/recruitment/applications/${id}/`, { status })
    return response.data
  },

  // Get application status options
  async getApplicationStatuses() {
    try {
      // If there's a dedicated endpoint for status options, use it
      // Otherwise, return the predefined status options
      return [
        { value: "received", label: "Received" },
        { value: "screening", label: "Screening" },
        { value: "phone_interview", label: "Phone Interview" },
        { value: "interview", label: "Interview" },
        { value: "final_interview", label: "Final Interview" },
        { value: "reference_check", label: "Reference Check" },
        { value: "offer_extended", label: "Offer Extended" },
        { value: "hired", label: "Hired" },
        { value: "rejected", label: "Rejected" },
        { value: "withdrawn", label: "Withdrawn" },
      ]
    } catch (error) {
      console.error("Failed to fetch application statuses:", error)
      // Return the required status options as fallback
      return [
        { value: "received", label: "Received" },
        { value: "screening", label: "Screening" },
        { value: "phone_interview", label: "Phone Interview" },
        { value: "interview", label: "Interview" },
        { value: "final_interview", label: "Final Interview" },
        { value: "reference_check", label: "Reference Check" },
        { value: "offer_extended", label: "Offer Extended" },
        { value: "hired", label: "Hired" },
        { value: "rejected", label: "Rejected" },
        { value: "withdrawn", label: "Withdrawn" },
      ]
    }
  },

  async getApplicationStatistics(statusFilter = null, jobPostingFilter = null) {
    try {
      const applicationsData = await this.getApplications(statusFilter, jobPostingFilter, 1, 100) // Get all for statistics
      const applications = applicationsData.results
      const received = applications.filter((app) => app.status === "received").length
      const screening = applications.filter((app) => app.status === "screening").length
      const phoneInterview = applications.filter((app) => app.status === "phone_interview").length
      const interview = applications.filter((app) => app.status === "interview").length
      const finalInterview = applications.filter((app) => app.status === "final_interview").length
      const referenceCheck = applications.filter((app) => app.status === "reference_check").length
      const offerExtended = applications.filter((app) => app.status === "offer").length
      const hired = applications.filter((app) => app.status === "hired").length
      const rejected = applications.filter((app) => app.status === "rejected").length
      const withdrawn = applications.filter((app) => app.status === "withdrawn").length

      return {
        total: applications.length,
        received,
        screening,
        phoneInterview,
        interview,
        finalInterview,
        referenceCheck,
        offerExtended,
        hired,
        rejected,
        withdrawn,
      }
    } catch (error) {
      console.error("Failed to fetch application statistics:", error)
      return {
        total: 0,
        received: 0,
        screening: 0,
        phoneInterview: 0,
        interview: 0,
        finalInterview: 0,
        referenceCheck: 0,
        offerExtended: 0,
        hired: 0,
        rejected: 0,
        withdrawn: 0,
      }
    }
  },
}

// Enhanced Interview Service with Offset-based Pagination
export const interviewService = {
  async getInterviews(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/recruitment/interviews/?limit=${limit}&offset=${offset}`)
      const data = response.data

      // Return standardized pagination structure
      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch interviews:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async createInterview(data) {
    const response = await api.post("/recruitment/interviews/", data)
    return response.data
  },

  async updateInterview(id, data) {
    const response = await api.put(`/recruitment/interviews/${id}/`, data)
    return response.data
  },

  async deleteInterview(id) {
    const response = await api.delete(`/recruitment/interviews/${id}/`)
    return response.data
  },

  async getFinalList(arg1, arg2) {
    try {
      const rawFilters = typeof arg1 === "object" && arg1 !== null ? arg1 : { status: arg1, interview_type: arg2 }
      const params = Object.fromEntries(
        Object.entries(rawFilters).filter(([, v]) => v !== undefined && v !== null && v !== ""),
      )

      const { data } = await api.get("/recruitment/interviews/", { params })
      return data ?? []
    } catch (error) {
      console.error("Failed to fetch final lists", error)
      return []
    }
  },
}

// Enhanced Reference Check Service with Offset-based Pagination
export const referenceCheckService = {
  async getReferenceChecks(page = 1, limit = 5) {
    try {
      const offset = (page - 1) * limit
      const response = await api.get(`/recruitment/reference-checks/?limit=${limit}&offset=${offset}`)
      const data = response.data

      // Return standardized pagination structure
      return {
        results: Array.isArray(data) ? data : data.results || [],
        count: data.count || (Array.isArray(data) ? data.length : 0),
        next: data.next || null,
        previous: data.previous || null,
        total_pages: Math.ceil((data.count || 0) / limit),
        current_page: page,
      }
    } catch (error) {
      console.error("Failed to fetch reference checks:", error)
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
        total_pages: 0,
        current_page: 1,
      }
    }
  },

  async createReferenceCheck(data) {
    const response = await api.post("/recruitment/reference-checks/", data)
    console.log(response.data)
    return response.data
  },

  async updateReferenceCheck(id, data) {
    const response = await api.put(`/recruitment/reference-checks/${id}/`, data)
    return response.data
  },

  async deleteReferenceCheck(id) {
    const response = await api.delete(`/recruitment/reference-checks/${id}/`)
    return response.data
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

