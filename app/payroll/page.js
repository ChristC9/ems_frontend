"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Pagination from "../../components/Pagination"
import { payrollService, departmentService, positionService, employeeService } from "../../lib/services"
import { useAuth } from "../../contexts/AuthContext"
import { XMarkIcon, UsersIcon, CurrencyDollarIcon, ChartBarIcon, PlusIcon, PencilIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"


export default function Payroll() {
  const { user } = useAuth()
  const [payrollRecords, setPayrollRecords] = useState([])
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [statistics, setStatistics] = useState()
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedJobLevel, setSelectedJobLevel] = useState("All Levels")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [error, setError] = useState("")
  const [jobLevels, setJobLevels] = useState([])
  const [employees, setEmployees] = useState([])
  const [editingPayroll, setEditingPayroll] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [payrollToDelete, setPayrollToDelete] = useState(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 5

  const [formData, setFormData] = useState({
    employee: "",
    pay_period_start: "",
    pay_period_end: "",
    pay_date: "",
    gross_pay: "",
    total_deductions: "",
    total_bonuses: "",
    status: "draft",
    manager: 16,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-orange-100 text-orange-800"
      case "paid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "draft":
        return "Draft"
      case "approved":
        return "Approved"
      case "paid":
        return "Paid"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError("")

      const [payrollsData, departmentsData, positionsData, statisticsData, activityData, employeesData] =
        await Promise.all([
          payrollService.getPayrolls(currentPage, itemsPerPage),
          departmentService.getDepartments(),
          positionService.getPositions(),
          payrollService.getPayrollStatistics(),
          payrollService.getRecentActivity(),
          employeeService.getEmployees(1, 100),
        ])

      setEmployees(employeesData.results || employeesData)

      // Extract unique job levels from positions
      const uniqueLevels = [...new Set(positionsData.map((pos) => pos.title).filter(Boolean))]
      setJobLevels(uniqueLevels)

      // Transform payroll data to match UI format
      const transformedPayrolls = payrollsData.results.map((payroll) => ({
        id: payroll.id,
        name: payroll.employee_name || "Unknown Employee",
        department: payroll?.department_name || "Unknown Department",
        jobLevel: payroll?.job_title || "Unknown Job level",
        dateRange: formatDateRange(payroll.pay_period_start, payroll.pay_period_end),
        processed: formatProcessedDate(payroll.created_at),
        baseSalary: payroll.gross_pay || 0,
        bonus: payroll.total_bonuses || 0,
        deductions: -(payroll.total_deductions || 0),
        totalPay: payroll.net_pay || 0,
        status: payroll.status || "draft",
        // Store original data for editing
        originalData: payroll,
      }))

      setPayrollRecords(transformedPayrolls)
      setTotalPages(payrollsData.total_pages)
      setTotalItems(payrollsData.count)
      setDepartments(departmentsData)
      setPositions(positionsData)
      setStatistics(statisticsData)
      setRecentActivity(activityData)
    } catch (error) {
      console.error("Failed to fetch payroll data:", error)
      setError("Failed to load payroll data. Please try again.")

      // setRecentActivity([
      //   {
      //     id: 1,
      //     text: "Payroll processed for Engineering",
      //     time: "2 hours ago",
      //     color: "bg-green-500",
      //   },
      //   {
      //     id: 2,
      //     text: "New bonus record added",
      //     time: "1 day ago",
      //     color: "bg-blue-500",
      //   },
      //   {
      //     id: 3,
      //     text: "Salary adjustment processed",
      //     time: "3 days ago",
      //     color: "bg-yellow-500",
      //   },
      // ])
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
      setEditingPayroll(null)
      resetForm()
      setShowCreateModal(true)
    } catch (error) {
      console.error("Failed to create payroll:", error)
      setError("Failed to create payroll. Please try again.")
    }
  }

  const handleEditPayroll = async (payrollId) => {
    try {
      setLoading(true)
      const payrollData = await payrollService.getPayroll(payrollId)

      // Populate form with existing data
      setFormData({
        employee: payrollData.employee,
        pay_period_start: payrollData.pay_period_start ? payrollData.pay_period_start.split("T")[0] : "",
        pay_period_end: payrollData.pay_period_end ? payrollData.pay_period_end.split("T")[0] : "",
        pay_date: payrollData.pay_date ? payrollData.pay_date.split("T")[0] : "",
        gross_pay: payrollData.gross_pay?.toString() || "",
        total_deductions: payrollData.total_deductions?.toString() || "",
        total_bonuses: payrollData.total_bonuses?.toString() || "",
        status: payrollData.status || "draft",
        manager: payrollData.manager?.toString() || "16",
        processed_by: payrollData.processed_by?.toString() || "",
        // Additional fields - you may need to adjust these based on your API structure
        baseSalary: payrollData.gross_pay?.toString() || "",
        bonusAmount: payrollData.total_bonuses?.toString() || "",
        overtimeHours: "",
        overtimeRate: "",
        taxDeductions: payrollData.total_deductions?.toString() || "",
        otherDeductions: "",
        notes: payrollData.notes || "",
      })

      setEditingPayroll(payrollData)
      setShowCreateModal(true)
    } catch (error) {
      console.error("Failed to fetch payroll for editing:", error)
      setError("Failed to load payroll data for editing. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePayroll = (payrollId, payrollName) => {
    setPayrollToDelete({ id: payrollId, name: payrollName })
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      setLoading(true)
      await payrollService.deletePayroll(payrollToDelete.id)

      // Refresh data after deletion
      await fetchData()

      // If we're on a page that no longer has data, go to previous page
      if (payrollRecords.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }

      setShowDeleteModal(false)
      setPayrollToDelete(null)
    } catch (error) {
      console.error("Failed to delete payroll:", error)
      setError("Failed to delete payroll. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
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
      manager: "16",
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
        pay_date: formData.pay_date || formData.pay_period_end,
        gross_pay: calculations.grossPay.toString(),
        total_deductions: calculations.totalDeductions.toString(),
        total_bonuses: calculations.totalBonuses.toString(),
        status: formData.status || "draft",
        manager: user?.manager_id || 3,
        processed_by: user?.id || 0,
      }

      if (editingPayroll) {
        // Update existing payroll
        await payrollService.updatePayroll(editingPayroll.id, payrollData)
      } else {
        // Create new payroll
        const createdPayroll = await payrollService.createPayroll(payrollData)

        // Create payroll items for detailed breakdown (only for new payrolls)
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
          }
        }
      }

      // Refresh the data
      await fetchData()

      // Close modal and reset form
      setShowCreateModal(false)
      setEditingPayroll(null)
      resetForm()

      console.log(editingPayroll ? "Payroll updated successfully!" : "Payroll created successfully!")
    } catch (error) {
      console.error("Failed to save payroll:", error)
      setSubmitError(error.response?.data?.message || "Failed to save payroll. Please try again.")
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
            <div className="space-y-4 mb-6">
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
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{record.name}</h3>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}
                          >
                            {getStatusLabel(record.status)}
                          </span>
                        </div>
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
                          className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePayroll(record.id, record.name)}
                          className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                showInfo={true}
                showFirstLast={true}
              />
            )}
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
                      ${statistics.monthlyPayroll}
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
                      ${statistics.avgSalary}
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

        {/* Create/Edit Payroll Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {editingPayroll ? "Edit Payroll" : "Create New Payroll"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {editingPayroll ? "Update the payroll record" : "Create a new payroll record for an employee"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingPayroll(null)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
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
                          {emp.first_name} {emp.last_name} - {emp.department_name}
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
                      setEditingPayroll(null)
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
                    {submitting
                      ? editingPayroll
                        ? "Updating..."
                        : "Creating..."
                      : editingPayroll
                        ? "Update Payroll"
                        : "Create Payroll"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Payroll</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Are you sure you want to delete the payroll for "{payrollToDelete?.name}"? This action cannot be
                    undone.
                  </p>
                </div>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false)
                      setPayrollToDelete(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
