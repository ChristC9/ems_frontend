"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { payrollService, departmentService, positionService, employeeService } from "../../lib/services"
import { useAuth } from "../../contexts/AuthContext"

// Icons
const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
)

const CurrencyDollarIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182C10.464 7.78 11.232 7.5 12 7.5c.768 0 1.536.22 2.121.659l.879.659m-4.242 0V6m0 12v1.5m0-1.5H9m3 0h3"
    />
  </svg>
)

const ChartBarIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  </svg>
)

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

const PencilIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
)

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function Payroll() {
  const { user } = useAuth() // Moved useAuth hook to the top level
  const [payrollRecords, setPayrollRecords] = useState([])
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    monthlyPayroll: 0,
    avgSalary: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedJobLevel, setSelectedJobLevel] = useState("All Levels")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [error, setError] = useState("")
  const [jobLevels, setJobLevels] = useState([])
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employee: "",
    pay_period_start: "",
    pay_period_end: "",
    pay_date: "",
    gross_pay: "",
    total_deductions: "",
    total_bonuses: "",
    status: "draft",
    manager: "",
    processed_by: "",
    // Additional fields for payroll items
    baseSalary: "",
    bonusAmount: "",
    overtimeHours: "",
    overtimeRate: "",
    taxDeductions: "",
    otherDeductions: "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError("")

      const [payrollsData, departmentsData, positionsData, statisticsData, activityData, employeesData] =
        await Promise.all([
          payrollService.getPayrolls(),
          departmentService.getDepartments(),
          positionService.getPositions(),
          payrollService.getPayrollStatistics(),
          payrollService.getRecentActivity(),
          employeeService.getEmployees(),
        ])

      setEmployees(employeesData)

      // Extract unique job levels from positions
      const uniqueLevels = [...new Set(positionsData.map((pos) => pos.level || pos.name).filter(Boolean))]
      setJobLevels(uniqueLevels)

      // Transform payroll data to match UI format
      const transformedPayrolls = payrollsData.map((payroll) => ({
        id: payroll.id,
        name: payroll.employee_name || "Unknown Employee",
        department: payroll.employee?.department?.name || "Unknown",
        jobLevel: payroll.employee?.position?.level || "Unknown",
        dateRange: formatDateRange(payroll.pay_period_start, payroll.pay_period_end),
        processed: formatProcessedDate(payroll.created_at),
        baseSalary: payroll.gross_pay || 0,
        bonus: payroll.total_bonuses || 0,
        deductions: -(payroll.total_deductions || 0),
        totalPay: payroll.net_pay || 0,
        status: payroll.status || "draft",
      }))

      setPayrollRecords(transformedPayrolls)
      setDepartments(departmentsData)
      setPositions(positionsData)
      setStatistics(statisticsData)
      setRecentActivity(activityData)
    } catch (error) {
      console.error("Failed to fetch payroll data:", error)
      setError("Failed to load payroll data. Please try again.")

      // Fallback to mock data if API fails
      setPayrollRecords([
        {
          id: 1,
          name: "Olivia Garcia",
          department: "Sales",
          jobLevel: "Mid",
          dateRange: "Jun 15, 2025 7:00 pm - Jun 30, 2025 6:59 pm",
          processed: "Jul 1, 2025 4:30 pm",
          baseSalary: 65000,
          bonus: 3500,
          deductions: -800,
          totalPay: 67700,
          status: "approved",
        },
        {
          id: 2,
          name: "Henry Bennett",
          department: "Marketing",
          jobLevel: "Senior",
          dateRange: "Jun 15, 2025 7:00 pm - Jun 30, 2025 6:59 pm",
          processed: "Jul 1, 2025 4:45 pm",
          baseSalary: 85000,
          bonus: 5000,
          deductions: -1000,
          totalPay: 89500,
          status: "approved",
        },
      ])

      setStatistics({
        totalEmployees: 156,
        monthlyPayroll: 847250,
        avgSalary: 65400,
      })

      setRecentActivity([
        {
          id: 1,
          text: "Payroll processed for Engineering",
          time: "2 hours ago",
          color: "bg-green-500",
        },
        {
          id: 2,
          text: "New bonus record added",
          time: "1 day ago",
          color: "bg-blue-500",
        },
        {
          id: 3,
          text: "Salary adjustment processed",
          time: "3 days ago",
          color: "bg-yellow-500",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "Date range not available"

    const start = new Date(startDate)
    const end = new Date(endDate)

    const formatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }

    return `${start.toLocaleDateString("en-US", formatOptions)} - ${end.toLocaleDateString("en-US", formatOptions)}`
  }

  const formatProcessedDate = (dateString) => {
    if (!dateString) return "Not processed"

    const date = new Date(dateString)
    const formatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }

    return date.toLocaleDateString("en-US", formatOptions)
  }

  const handleCreatePayroll = async () => {
    try {
      // This would open a modal or navigate to create payroll form
      setShowCreateModal(true)
    } catch (error) {
      console.error("Failed to create payroll:", error)
      setError("Failed to create payroll. Please try again.")
    }
  }

  const handleEditPayroll = async (payrollId) => {
    try {
      // Navigate to edit payroll or open edit modal
      console.log("Edit payroll:", payrollId)
    } catch (error) {
      console.error("Failed to edit payroll:", error)
      setError("Failed to edit payroll. Please try again.")
    }
  }

  const handleViewEmployee = async (payrollId) => {
    try {
      // Navigate to employee details
      console.log("View employee for payroll:", payrollId)
    } catch (error) {
      console.error("Failed to view employee:", error)
    }
  }

  // Filter payroll records based on selected filters
  const filteredPayrollRecords = payrollRecords.filter((record) => {
    const departmentMatch = selectedDepartment === "All Departments" || record.department === selectedDepartment
    const jobLevelMatch = selectedJobLevel === "All Levels" || record.jobLevel === selectedJobLevel
    return departmentMatch && jobLevelMatch
  })

  const calculateTotalPay = () => {
    const base = Number.parseFloat(formData.baseSalary || 0)
    const bonus = Number.parseFloat(formData.bonusAmount || 0)
    const overtime = Number.parseFloat(formData.overtimeHours || 0) * Number.parseFloat(formData.overtimeRate || 0)
    const totalEarnings = base + bonus + overtime

    const deductions = Number.parseFloat(formData.taxDeductions || 0) + Number.parseFloat(formData.otherDeductions || 0)

    return {
      grossPay: totalEarnings,
      totalDeductions: deductions,
      netPay: Math.max(0, totalEarnings - deductions),
      totalBonuses: bonus + overtime,
    }
  }

  const resetForm = () => {
    setFormData({
      employee: "",
      pay_period_start: "",
      pay_period_end: "",
      pay_date: "",
      gross_pay: "",
      total_deductions: "",
      total_bonuses: "",
      status: "draft",
      manager: "",
      processed_by: "",
      baseSalary: "",
      bonusAmount: "",
      overtimeHours: "",
      overtimeRate: "",
      taxDeductions: "",
      otherDeductions: "",
      notes: "",
    })
    setSubmitError("")
  }

  const handleSubmitPayroll = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError("")

    try {
      const calculations = calculateTotalPay()

      const payrollData = {
        employee: Number.parseInt(formData.employee),
        pay_period_start: formData.pay_period_start,
        pay_period_end: formData.pay_period_end,
        pay_date: formData.pay_date || formData.pay_period_end, // Default to period end if not specified
        gross_pay: calculations.grossPay.toString(),
        total_deductions: calculations.totalDeductions.toString(),
        total_bonuses: calculations.totalBonuses.toString(),
        status: formData.status || "draft",
        manager: user?.manager_id || 0, // You might need to adjust this based on your user structure
        processed_by: user?.id || 0,
      }

      const createdPayroll = await payrollService.createPayroll(payrollData)

      // Create payroll items for detailed breakdown
      const payrollItems = []

      if (formData.baseSalary && Number.parseFloat(formData.baseSalary) > 0) {
        payrollItems.push({
          item_type: "earning",
          item_name: "Base Salary",
          amount: formData.baseSalary,
          description: "Regular base salary",
          is_taxable: true,
        })
      }

      if (formData.bonusAmount && Number.parseFloat(formData.bonusAmount) > 0) {
        payrollItems.push({
          item_type: "earning",
          item_name: "Bonus",
          amount: formData.bonusAmount,
          description: "Performance bonus",
          is_taxable: true,
        })
      }

      if (
        formData.overtimeHours &&
        formData.overtimeRate &&
        Number.parseFloat(formData.overtimeHours) > 0 &&
        Number.parseFloat(formData.overtimeRate) > 0
      ) {
        const overtimePay = Number.parseFloat(formData.overtimeHours) * Number.parseFloat(formData.overtimeRate)
        payrollItems.push({
          item_type: "earning",
          item_name: "Overtime Pay",
          amount: overtimePay.toString(),
          description: `${formData.overtimeHours} hours at $${formData.overtimeRate}/hour`,
          is_taxable: true,
        })
      }

      if (formData.taxDeductions && Number.parseFloat(formData.taxDeductions) > 0) {
        payrollItems.push({
          item_type: "deduction",
          item_name: "Tax Deductions",
          amount: formData.taxDeductions,
          description: "Federal and state taxes",
          is_taxable: false,
        })
      }

      if (formData.otherDeductions && Number.parseFloat(formData.otherDeductions) > 0) {
        payrollItems.push({
          item_type: "deduction",
          item_name: "Other Deductions",
          amount: formData.otherDeductions,
          description: formData.notes || "Other deductions",
          is_taxable: false,
        })
      }

      // Create payroll items if the API supports it
      for (const item of payrollItems) {
        try {
          await payrollService.createPayrollItem(createdPayroll.id, item)
        } catch (itemError) {
          console.warn("Failed to create payroll item:", itemError)
          // Continue with other items even if one fails
        }
      }

      // Refresh the data
      await fetchData()

      // Close modal and reset form
      setShowCreateModal(false)
      resetForm()

      // Show success message
      console.log("Payroll created successfully!")
    } catch (error) {
      console.error("Failed to create payroll:", error)
      setSubmitError(error.response?.data?.message || "Failed to create payroll. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex gap-6">
              <div className="flex-1 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="w-80 space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
          <p className="text-gray-600">Manage employee compensation, process payroll, and track salary records</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Payroll Records Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Payroll Records</h2>
              <button
                onClick={handleCreatePayroll}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Payroll
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Level</label>
                <select
                  value={selectedJobLevel}
                  onChange={(e) => setSelectedJobLevel(e.target.value)}
                  className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>All Levels</option>
                  {jobLevels.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payroll Records */}
            <div className="space-y-4">
              {filteredPayrollRecords.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <div className="text-gray-500">No payroll records found</div>
                  <button
                    onClick={handleCreatePayroll}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create First Payroll
                  </button>
                </div>
              ) : (
                filteredPayrollRecords.map((record) => (
                  <div key={record.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{record.name}</h3>
                        <p className="text-sm text-gray-600">
                          {record.department} - {record.jobLevel}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{record.dateRange}</div>
                        <div>Processed: {record.processed}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-8">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Base Salary</div>
                          <div className="font-semibold text-gray-900">${record.baseSalary.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Bonus</div>
                          <div className="font-semibold text-green-600">${record.bonus.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Deductions</div>
                          <div className="font-semibold text-red-600">
                            -${Math.abs(record.deductions).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Total Pay</div>
                          <div className="font-semibold text-blue-600">${record.totalPay.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPayroll(record.id)}
                          className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewEmployee(record.id)}
                          className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Employee
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            {/* Payroll Statistics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Statistics</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Total Employees</div>
                    <div className="text-2xl font-bold text-gray-900">{statistics.totalEmployees}</div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Monthly Payroll</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${statistics.monthlyPayroll.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Avg Salary</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${Math.round(statistics.avgSalary).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>

              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <div className="text-sm text-gray-500">No recent activity</div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${activity.color} mt-2 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{activity.text}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Payroll Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Payroll</h3>
                <p className="text-sm text-gray-600">Create a new payroll record for an employee</p>
              </div>

              <form onSubmit={handleSubmitPayroll} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
                    <select
                      value={formData.employee}
                      onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.first_name} {emp.last_name} - {emp.department?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pay Period *</label>
                    <select
                      value={formData.payPeriod}
                      onChange={(e) => setFormData({ ...formData, payPeriod: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Pay Period</option>
                      <option value="monthly">Monthly</option>
                      <option value="bi-weekly">Bi-Weekly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period Start Date *</label>
                    <input
                      type="date"
                      value={formData.pay_period_start}
                      onChange={(e) => setFormData({ ...formData, pay_period_start: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period End Date *</label>
                    <input
                      type="date"
                      value={formData.pay_period_end}
                      onChange={(e) => setFormData({ ...formData, pay_period_end: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pay Date</label>
                    <input
                      type="date"
                      value={formData.pay_date}
                      onChange={(e) => setFormData({ ...formData, pay_date: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Salary *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.baseSalary}
                      onChange={(e) => setFormData({ ...formData, baseSalary: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bonus Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.bonusAmount}
                      onChange={(e) => setFormData({ ...formData, bonusAmount: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Hours</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.overtimeHours}
                      onChange={(e) => setFormData({ ...formData, overtimeHours: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Rate</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.overtimeRate}
                      onChange={(e) => setFormData({ ...formData, overtimeRate: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Deductions</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.taxDeductions}
                      onChange={(e) => setFormData({ ...formData, taxDeductions: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Deductions</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.otherDeductions}
                      onChange={(e) => setFormData({ ...formData, otherDeductions: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Additional notes or comments..."
                  />
                </div>

                {/* Total Calculation Display */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Payroll Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Base Salary:</span>
                      <div className="font-semibold">
                        ${Number.parseFloat(formData.baseSalary || 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Bonus:</span>
                      <div className="font-semibold text-green-600">
                        ${Number.parseFloat(formData.bonusAmount || 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Overtime:</span>
                      <div className="font-semibold text-blue-600">
                        $
                        {(
                          Number.parseFloat(formData.overtimeHours || 0) * Number.parseFloat(formData.overtimeRate || 0)
                        ).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Deductions:</span>
                      <div className="font-semibold text-red-600">
                        -$
                        {(
                          Number.parseFloat(formData.taxDeductions || 0) +
                          Number.parseFloat(formData.otherDeductions || 0)
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total Pay:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ${calculateTotalPay().netPay.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="text-sm text-red-700">{submitError}</div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      resetForm()
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    disabled={submitting}
                  >
                    {submitting ? "Creating..." : "Create Payroll"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
