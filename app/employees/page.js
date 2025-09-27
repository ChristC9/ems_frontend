"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { employeeService, departmentService, positionService, managerService } from "../../lib/services"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [showValidationPopup, setShowValidationPopup] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    department: "",
    position: "",
    manager: "",
    hire_date: "",
    employment_type: "full_time",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relationship: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize, debouncedSearchTerm])

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setCurrentPage(1)
    }
  }, [debouncedSearchTerm])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [employeesData, departmentsData, positionsData, managersData] = await Promise.all([
        employeeService.getEmployees(currentPage, pageSize, debouncedSearchTerm),
        departmentService.getDepartments(),
        positionService.getPositions(),
        managerService.getManagers(),
      ])

      // Handle paginated response
      if (employeesData.results) {
        setEmployees(employeesData.results)
        setTotalCount(employeesData.count)
        setTotalPages(Math.ceil(employeesData.count / pageSize))
      } else {
        // Fallback for non-paginated response
        setEmployees(employeesData)
        setTotalCount(employeesData.length)
        setTotalPages(1)
      }

      setDepartments(departmentsData)
      setPositions(positionsData)
      setManagers(managersData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add this right after the fetchData function to debug the data structure
  useEffect(() => {
    if (employees.length > 0) {
      console.log("Sample employee data:", employees[0])
      console.log("Departments:", departments)
      console.log("Positions:", positions)
    }
  }, [employees, departments, positions])

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, "")
    // Check if it's a valid length (10-15 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15
  }

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters and return clean number
    return phone.replace(/\D/g, "")
  }

  const validateDate = (dateString) => {
    if (!dateString) return true // Optional field
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    // Ensure date is in YYYY-MM-DD format
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset validation errors
    setValidationErrors({})

    // Validate required fields
    const errors = {}
    const requiredFields = {
      first_name: "First Name",
      last_name: "Last Name",
      email: "Email",
    }

    // Add password validation for new employees
    if (!editingEmployee) {
      requiredFields.password = "Password"
      requiredFields.password_confirm = "Confirm Password"
    }

    // Check for empty required fields
    Object.keys(requiredFields).forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = `${requiredFields[field]} is required`
      }
    })

    // Validate email format
    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Validate phone number format
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number (10-15 digits)"
    }

    // Validate emergency contact phone if provided
    if (formData.emergency_contact_phone && !validatePhone(formData.emergency_contact_phone)) {
      errors.emergency_contact_phone = "Please enter a valid emergency contact phone number"
    }

    // Validate date of birth
    if (formData.date_of_birth && !validateDate(formData.date_of_birth)) {
      errors.date_of_birth = "Please enter a valid date"
    }

    // Validate hire date
    if (formData.hire_date && !validateDate(formData.hire_date)) {
      errors.hire_date = "Please enter a valid hire date"
    }

    // Validate password confirmation for new employees
    if (!editingEmployee && formData.password !== formData.password_confirm) {
      errors.password_confirm = "Passwords do not match"
    }

    // Validate password strength
    if (!editingEmployee && formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long"
    }

    // If there are validation errors, show them
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setShowValidationPopup(true)
      return
    }

    try {
      // Prepare data with proper formatting
      const submitData = {
        ...formData,
        phone: formData.phone ? formatPhoneNumber(formData.phone) : "",
        emergency_contact_phone: formData.emergency_contact_phone
          ? formatPhoneNumber(formData.emergency_contact_phone)
          : "",
        date_of_birth: formData.date_of_birth ? formatDate(formData.date_of_birth) : "",
        hire_date: formData.hire_date ? formatDate(formData.hire_date) : "",
      }

      if (editingEmployee) {
        // For editing, remove password fields if they're empty
        if (!submitData.password) {
          delete submitData.password
          delete submitData.password_confirm
        }
        await employeeService.updateEmployee(editingEmployee.id, submitData)
      } else {
        await employeeService.createEmployee(submitData)
      }

      setShowModal(false)
      setEditingEmployee(null)
      setValidationErrors({})
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        department: "",
        position: "",
        manager: "",
        hire_date: "",
        employment_type: "full_time",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        emergency_contact_relationship: "",
      })
      fetchData()
    } catch (error) {
      console.error("Failed to save employee:", error)

      // Handle backend validation errors
      if (error.response && error.response.data) {
        const backendErrors = {}
        const errorData = error.response.data

        // Map backend field errors to frontend
        Object.keys(errorData).forEach((field) => {
          if (Array.isArray(errorData[field])) {
            backendErrors[field] = errorData[field][0]
          } else {
            backendErrors[field] = errorData[field]
          }
        })

        setValidationErrors(backendErrors)
        setShowValidationPopup(true)
      } else {
        alert("Failed to save employee. Please try again.")
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingEmployee(null)
    setValidationErrors({})
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      department: "",
      position: "",
      manager: "",
      hire_date: "",
      employment_type: "full_time",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relationship: "",
    })
  }

  const handleEdit = (employee) => {
    setEditingEmployee(employee)

    // Helper function to format date for input field
    const formatDateForInput = (dateString) => {
      if (!dateString) return ""
      // Handle different date formats that might come from the API
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""
      return date.toISOString().split("T")[0] // Returns YYYY-MM-DD format
    }

    // Helper function to get ID from object or return the value directly
    const getIdOrValue = (field) => {
      if (!field) return ""
      if (typeof field === "object" && field.id) return field.id.toString()
      return field.toString()
    }

    setFormData({
      first_name: employee.first_name || "",
      last_name: employee.last_name || "",
      email: employee.email || "",
      password: "",
      password_confirm: "",
      phone: employee.phone || "",
      date_of_birth: formatDateForInput(employee.date_of_birth),
      gender: employee.gender || "",
      address: employee.address || "",
      city: employee.city || "",
      state: employee.state || "",
      zip_code: employee.zip_code || "",
      country: employee.country || "",
      department: getIdOrValue(employee.department),
      position: getIdOrValue(employee.position),
      manager: getIdOrValue(employee.manager),
      hire_date: formatDateForInput(employee.hire_date),
      employment_type: employee.employment_type || "full_time",
      emergency_contact_name: employee.emergency_contact_name || "",
      emergency_contact_phone: employee.emergency_contact_phone || "",
      emergency_contact_relationship: employee.emergency_contact_relationship || "",
    })
    setShowModal(true)
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      try {
        await employeeService.deleteEmployee(employeeToDelete.id)
        setShowDeleteModal(false)
        setEmployeeToDelete(null)
        fetchData()
      } catch (error) {
        console.error("Failed to delete employee:", error)
        alert("Failed to delete employee. Please try again.")
      }
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setEmployeeToDelete(null)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // Remove the setCurrentPage(1) from here since it will be handled when the debounced search triggers
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (e) => {
    setPageSize(Number.parseInt(e.target.value))
    setCurrentPage(1) // Reset to first page when changing page size
  }

  const getPaginationRange = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
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
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="mt-1 text-sm text-gray-600">Manage your company's employees ({totalCount} total)</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Search and Page Size Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">per page</span>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hire Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-700">
                            {employee.first_name?.[0]}
                            {employee.last_name?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.first_name} {employee.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      // Handle different data structures
                      if (employee.department?.name) {
                        return employee.department.name
                      } else if (employee.department_name) {
                        return employee.department_name
                      } else if (employee.department && typeof employee.department === "string") {
                        return employee.department
                      } else if (employee.department && typeof employee.department === "number") {
                        // Find department name by ID
                        const dept = departments.find((d) => d.id === employee.department)
                        return dept?.name || `Department ID: ${employee.department}`
                      }
                      return "N/A"
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      // Handle different data structures
                      if (employee.position?.name) {
                        return employee.position.name
                      } else if (employee.position_name) {
                        return employee.position_name
                      } else if (employee.position && typeof employee.position === "string") {
                        return employee.position
                      } else if (employee.position && typeof employee.position === "number") {
                        // Find position name by ID
                        const pos = positions.find((p) => p.id === employee.position)
                        return employee.position_title
                      }
                      return employee.position_title
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {employee.employment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(employee)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteClick(employee)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {employees.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm ? "No employees found matching your search." : "No employees found."}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span> of{" "}
                  <span className="font-medium">{totalCount}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {getPaginationRange().map((page, index) => (
                    <span key={index}>
                      {page === "..." ? (
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                          {page}
                        </button>
                      )}
                    </span>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name *</label>
                        <input
                          type="text"
                          required
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.first_name ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                        {validationErrors.first_name && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.first_name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                        <input
                          type="text"
                          required
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.last_name ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                        {validationErrors.last_name && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.last_name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email *</label>
                        <input
                          type="email"
                          required
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.email ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {validationErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          placeholder="e.g., +1234567890 or 1234567890"
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {validationErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          Enter 10-15 digits (international format supported)
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                          type="date"
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.date_of_birth ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.date_of_birth}
                          onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                        />
                        {validationErrors.date_of_birth && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.date_of_birth}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                          <option value="">Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address Information Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Address Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.zip_code}
                          onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Information Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Employment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        >
                          <option value="">Select Position</option>
                          {positions.map((pos) => (
                            <option key={pos.id} value={pos.id}>
                              {pos.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Manager</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.manager}
                          onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                        >
                          <option value="">Select Manager</option>
                          {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                              {manager.employee_email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hire Date</label>
                        <input
                          type="date"
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.hire_date ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.hire_date}
                          onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                        />
                        {validationErrors.hire_date && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.hire_date}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.employment_type}
                          onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                        >
                          <option value="full_time">Full Time</option>
                          <option value="part_time">Part Time</option>
                          <option value="contract">Contract</option>
                          <option value="intern">Intern</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Security Information Section */}
                  {!editingEmployee && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-4">Security Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Password *</label>
                          <input
                            type="password"
                            required={!editingEmployee}
                            className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.password ? "border-red-500" : "border-gray-300"
                              }`}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                          {validationErrors.password && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">Minimum 8 characters required</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                          <input
                            type="password"
                            required={!editingEmployee}
                            className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.password_confirm ? "border-red-500" : "border-gray-300"
                              }`}
                            value={formData.password_confirm}
                            onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                          />
                          {validationErrors.password_confirm && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.password_confirm}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Emergency Contact Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Emergency Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.emergency_contact_name}
                          onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                        <input
                          type="tel"
                          placeholder="e.g., +1234567890"
                          className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${validationErrors.emergency_contact_phone ? "border-red-500" : "border-gray-300"
                            }`}
                          value={formData.emergency_contact_phone}
                          onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                        />
                        {validationErrors.emergency_contact_phone && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.emergency_contact_phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Relationship</label>
                        <select
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={formData.emergency_contact_relationship}
                          onChange={(e) => setFormData({ ...formData, emergency_contact_relationship: e.target.value })}
                        >
                          <option value="">Select Relationship</option>
                          <option value="spouse">Spouse</option>
                          <option value="parent">Parent</option>
                          <option value="sibling">Sibling</option>
                          <option value="child">Child</option>
                          <option value="friend">Friend</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      {editingEmployee ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">Delete Employee</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-900">
                      {employeeToDelete?.first_name} {employeeToDelete?.last_name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
                <div className="items-center px-4 py-3">
                  <div className="flex space-x-3">
                    <button
                      onClick={handleDeleteCancel}
                      className="px-4 py-2 bg-white text-gray-500 text-base font-medium rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Validation Error Popup */}
        {showValidationPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">Validation Error</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500 mb-3">Please fix the following errors:</p>
                  <ul className="text-sm text-red-600 text-left space-y-1">
                    {Object.values(validationErrors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={() => setShowValidationPopup(false)}
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    OK
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
