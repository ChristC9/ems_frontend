"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Pagination from "../../components/Pagination"
import { timekeepingService, employeeService, managerService } from "../../lib/services"
import {
  ClockIcon,
  CalendarIcon,
  UserGroupIcon,
  PlusIcon,
  XMarkIcon,
  PencilIcon
} from "@heroicons/react/24/outline"

export default function Timekeeping() {
  const [timeEntries, setTimeEntries] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [holidays, setHolidays] = useState([])
  const [employees, setEmployees] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("time") // time, leave
  const [editingLeaveRequest, setEditingLeaveRequest] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Pagination states
  const [timeEntriesPage, setTimeEntriesPage] = useState(1)
  const [leaveRequestsPage, setLeaveRequestsPage] = useState(1)
  const [holidaysPage, setHolidaysPage] = useState(1)
  const [timeEntriesPagination, setTimeEntriesPagination] = useState({})
  const [leaveRequestsPagination, setLeaveRequestsPagination] = useState({})
  const [holidaysPagination, setHolidaysPagination] = useState({})

  const [timeForm, setTimeForm] = useState({
    employee: "",
    date: "",
    clock_in: "",
    clock_out: "",
    break_duration: 0,
    notes: "",
  })

  const [leaveForm, setLeaveForm] = useState({
    employee: "",
    leave_type: "vacation",
    start_date: "",
    end_date: "",
    total_days: "",
    reason: "",
    status: "pending",
    manager: "",
    approved_by: "",
    approved_date: "",
    approved_time: "",
    rejection_reason: "",
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (activeTab === "time-entries") {
      fetchTimeEntries(timeEntriesPage)
    } else if (activeTab === "leave-requests") {
      fetchLeaveRequests(leaveRequestsPage)
    } else if (activeTab === "holidays") {
      fetchHolidays(holidaysPage)
    }
  }, [activeTab, timeEntriesPage, leaveRequestsPage, holidaysPage])

  const fetchInitialData = async () => {
    try {
      const [timeEntriesData, leaveRequestsData, holidaysData, employeesData, managersData] = await Promise.all([
        timekeepingService.getTimeEntries(1, 10), // Fetch more for overview
        timekeepingService.getLeaveRequests(1, 10),
        timekeepingService.getHolidays(1, 10),
        employeeService.getEmployees(1, 100),
        managerService.getManagers(),
      ])

      setTimeEntries(timeEntriesData.results || timeEntriesData)
      setLeaveRequests(leaveRequestsData.results || leaveRequestsData)
      setHolidays(holidaysData.results || holidaysData)
      setEmployees(employeesData.results || employeesData)
      setManagers(managersData)
    } catch (error) {
      console.error("Failed to fetch initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTimeEntries = async (page = 1) => {
    try {
      const data = await timekeepingService.getTimeEntries(page, 5)
      setTimeEntries(data.results)
      setTimeEntriesPagination(data)
    } catch (error) {
      console.error("Failed to fetch time entries:", error)
    }
  }

  const fetchLeaveRequests = async (page = 1) => {
    try {
      const data = await timekeepingService.getLeaveRequests(page, 5)
      setLeaveRequests(data.results)
      setLeaveRequestsPagination(data)
    } catch (error) {
      console.error("Failed to fetch leave requests:", error)
    }
  }

  const fetchHolidays = async (page = 1) => {
    try {
      const data = await timekeepingService.getHolidays(page, 5)
      setHolidays(data.results)
      setHolidaysPagination(data)
    } catch (error) {
      console.error("Failed to fetch holidays:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (modalType === "time") {
        await timekeepingService.createTimeEntry(timeForm)
        if (activeTab === "time-entries") {
          fetchTimeEntries(timeEntriesPage)
        } else {
          // Refresh overview data
          fetchInitialData()
        }
      } else if (modalType === "leave") {
        // Calculate total days if not provided
        if (!leaveForm.total_days && leaveForm.start_date && leaveForm.end_date) {
          const startDate = new Date(leaveForm.start_date)
          const endDate = new Date(leaveForm.end_date)
          const diffTime = Math.abs(endDate - startDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
          leaveForm.total_days = diffDays
        }

        if (editingLeaveRequest) {
          // Update existing leave request
          await timekeepingService.updateLeaveRequest(editingLeaveRequest.id, leaveForm)
        } else {
          // Create new leave request
          await timekeepingService.createLeaveRequest(leaveForm)
        }

        if (activeTab === "leave-requests") {
          fetchLeaveRequests(leaveRequestsPage)
        } else {
          // Refresh overview data
          fetchInitialData()
        }
      }
      setShowModal(false)
      setEditingLeaveRequest(null)
      resetForms()
    } catch (error) {
      console.error("Failed to save:", error)
      alert("Failed to save entry")
    }
  }

  const resetForms = () => {
    setTimeForm({
      employee: "",
      date: "",
      clock_in: "",
      clock_out: "",
      break_duration: 0,
      notes: "",
    })
    setLeaveForm({
      employee: "",
      leave_type: "vacation",
      start_date: "",
      end_date: "",
      total_days: "",
      reason: "",
      status: "pending",
      manager: "",
      approved_by: "",
      approved_date: "",
      approved_time: "",
      rejection_reason: "",
    })
  }

  const openModal = (type) => {
    setModalType(type)
    setEditingLeaveRequest(null)
    resetForms()
    setShowModal(true)
  }

  const openEditModal = (leaveRequest) => {
    setModalType("leave")
    setEditingLeaveRequest(leaveRequest)
    setLeaveForm({
      employee: leaveRequest.employee || "",
      leave_type: leaveRequest.leave_type || "vacation",
      start_date: leaveRequest.start_date || "",
      end_date: leaveRequest.end_date || "",
      total_days: leaveRequest.total_days || "",
      reason: leaveRequest.reason || "",
      status: leaveRequest.status || "pending",
      manager: leaveRequest.manager || "",
      approved_by: leaveRequest.approved_by || "",
      approved_date: leaveRequest.approved_date || "",
      approved_time: leaveRequest.approved_time || "",
      rejection_reason: leaveRequest.rejection_reason || "",
    })

    setShowModal(true)
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return "N/A"
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateHours = (clockIn, clockOut, breakDuration = 0) => {
    if (!clockIn || !clockOut) return "N/A"
    const start = new Date(`2000-01-01T${clockIn}`)
    const end = new Date(`2000-01-01T${clockOut}`)
    const diffMs = end - start
    const diffHours = diffMs / (1000 * 60 * 60) - breakDuration / 60
    return `${diffHours.toFixed(1)}h`
  }

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5)
  }

  const calculateTotalDays = () => {
    if (leaveForm.start_date && leaveForm.end_date) {
      const startDate = new Date(leaveForm.start_date)
      const endDate = new Date(leaveForm.end_date)
      const diffTime = Math.abs(endDate - startDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return ""
  }

  // Auto-calculate total days when dates change
  useEffect(() => {
    const totalDays = calculateTotalDays()
    if (totalDays && totalDays !== leaveForm.total_days) {
      setLeaveForm((prev) => ({ ...prev, total_days: totalDays }))
    }
  }, [leaveForm.start_date, leaveForm.end_date])

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Timekeeping</h1>
          <p className="mt-1 text-sm text-gray-600">Track time entries, leave requests, and holidays</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Today's Entries</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {timeEntries.filter((entry) => entry.date === new Date().toISOString().split("T")[0]).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-8 w-8 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Requests</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {leaveRequests.filter((req) => req.status === "pending").length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Holidays</dt>
                    <dd className="text-lg font-medium text-gray-900">{holidays.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", name: "Overview" },
              { id: "time-entries", name: "Time Entries" },
              { id: "leave-requests", name: "Leave Requests" },
              { id: "holidays", name: "Holidays" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Time Entries */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Time Entries</h3>
                <div className="space-y-3">
                  {timeEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{entry.employee_name}</p>
                        <p className="text-sm text-gray-500">
                          {entry.date} • {formatTime(entry.clock_in)} - {formatTime(entry.clock_out)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-900">
                        {calculateHours(entry.clock_in, entry.clock_out, entry.break_duration)}
                      </div>
                    </div>
                  ))}
                  {timeEntries.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No time entries found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pending Leave Requests */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Pending Leave Requests</h3>
                <div className="space-y-3">
                  {leaveRequests
                    .filter((req) => req.status === "pending")
                    .slice(0, 5)
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{request.employee_name}</p>
                          <p className="text-sm text-gray-500">
                            {request.leave_type} • {request.start_date} to {request.end_date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  {leaveRequests.filter((req) => req.status === "pending").length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No pending leave requests</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "time-entries" && (
          <div>
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <div></div>
              <div>
                <button
                  onClick={() => openModal("time")}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  Add Time Entry
                </button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock Out
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.employee_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(entry.clock_in)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(entry.clock_out)}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.break_minutes}min</td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calculateHours(entry.clock_in, entry.clock_out, entry.break_minutes)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination for Time Entries */}
              {timeEntriesPagination.total_pages > 1 && (
                <Pagination
                  currentPage={timeEntriesPage}
                  totalPages={timeEntriesPagination.total_pages}
                  totalItems={timeEntriesPagination.count}
                  itemsPerPage={5}
                  onPageChange={setTimeEntriesPage}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "leave-requests" && (
          <div>
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <div></div>
              <div>
                <button
                  onClick={() => openModal("leave")}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  Request Leave
                </button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.employee_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.leave_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.start_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.end_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.total_days}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(request)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                          title="Edit leave request"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination for Leave Requests */}
              {leaveRequestsPagination.total_pages > 1 && (
                <Pagination
                  currentPage={leaveRequestsPage}
                  totalPages={leaveRequestsPagination.total_pages}
                  totalItems={leaveRequestsPagination.count}
                  itemsPerPage={5}
                  onPageChange={setLeaveRequestsPage}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === "holidays" && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holiday Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holidays.map((holiday) => (
                  <tr key={holiday.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holiday.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{holiday.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{holiday.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{holiday.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for Holidays */}
            {holidaysPagination.total_pages > 1 && (
              <Pagination
                currentPage={holidaysPage}
                totalPages={holidaysPagination.total_pages}
                totalItems={holidaysPagination.count}
                itemsPerPage={5}
                onPageChange={setHolidaysPage}
              />
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {modalType === "time"
                    ? "Add Time Entry"
                    : editingLeaveRequest
                      ? "Edit Leave Request"
                      : "Request Leave"}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingLeaveRequest(null)
                    resetForms()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {modalType === "time" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Employee *</label>
                      <select
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={timeForm.employee}
                        onChange={(e) => setTimeForm({ ...timeForm, employee: e.target.value })}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.first_name} {emp.last_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date *</label>
                      <input
                        type="date"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={timeForm.date}
                        onChange={(e) => setTimeForm({ ...timeForm, date: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Clock In *</label>
                        <input
                          type="time"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={timeForm.clock_in}
                          onChange={(e) => setTimeForm({ ...timeForm, clock_in: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Clock Out *</label>
                        <input
                          type="time"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={timeForm.clock_out}
                          onChange={(e) => setTimeForm({ ...timeForm, clock_out: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Break Duration (minutes)</label>
                      <input
                        type="number"
                        min="0"
                        max="480"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={timeForm.break_duration}
                        onChange={(e) => setTimeForm({ ...timeForm, break_duration: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={timeForm.notes}
                        onChange={(e) => setTimeForm({ ...timeForm, notes: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {modalType === "leave" && (
                  <div className="space-y-6">
                    {/* Employee Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee:</label>
                      <div className="flex items-center space-x-2">
                        <select
                          required
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={leaveForm.employee}
                          onChange={(e) => setLeaveForm({ ...leaveForm, employee: e.target.value })}
                        >
                          <option value="">----------</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.first_name} {emp.last_name}
                            </option>
                          ))}
                        </select>
                        <div className="flex space-x-1">
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
                            </svg>
                          </button>
                          <button type="button" className="p-1 text-green-500 hover:text-green-600">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Leave Type Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Leave type:</label>
                      <select
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={leaveForm.leave_type}
                        onChange={(e) => setLeaveForm({ ...leaveForm, leave_type: e.target.value })}
                      >
                        <option value="">----------</option>
                        <option value="vacation">Vacation</option>
                        <option value="sick">Sick Leave</option>
                        <option value="personal">Personal</option>
                        <option value="maternity">Maternity</option>
                        <option value="paternity">Paternity</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>

                    {/* Start Date Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start date:</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          required
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={leaveForm.start_date}
                          onChange={(e) => setLeaveForm({ ...leaveForm, start_date: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setLeaveForm({ ...leaveForm, start_date: getTodayDate() })}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                        >
                          Today
                        </button>
                        <CalendarIcon className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Note: You are 7 hours ahead of server time.</p>
                    </div>

                    {/* End Date Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End date:</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          required
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={leaveForm.end_date}
                          onChange={(e) => setLeaveForm({ ...leaveForm, end_date: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setLeaveForm({ ...leaveForm, end_date: getTodayDate() })}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                        >
                          Today
                        </button>
                        <CalendarIcon className="w-5 h-5 text-indigo-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Note: You are 7 hours ahead of server time.</p>
                    </div>

                    {/* Total Days Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total days:</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={leaveForm.total_days}
                        onChange={(e) => setLeaveForm({ ...leaveForm, total_days: e.target.value })}
                        readOnly
                      />
                    </div>

                    {/* Reason Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason:</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                        placeholder="Please provide reason for leave request..."
                      />
                    </div>

                    {/* Status Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status:</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={leaveForm.status}
                        onChange={(e) => setLeaveForm({ ...leaveForm, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Manager Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager:</label>
                      <div className="flex items-center space-x-2">
                        <select
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={leaveForm.manager}
                          onChange={(e) => setLeaveForm({ ...leaveForm, manager: e.target.value })}
                        >
                          <option value="">----------</option>
                          {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                              {manager.employee_name}
                            </option>
                          ))}
                        </select>
                        <div className="flex space-x-1">
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
                            </svg>
                          </button>
                          <button type="button" className="p-1 text-green-500 hover:text-green-600">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1 text-red-500 hover:text-red-600">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Approved By Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approved by:</label>
                      <div className="flex items-center space-x-2">
                        <select
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={leaveForm.approved_by}
                          onChange={(e) => setLeaveForm({ ...leaveForm, approved_by: e.target.value })}
                        >
                          <option value="">----------</option>
                          {managers.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                              {manager.employee_name}
                            </option>
                          ))}
                        </select>
                        <div className="flex space-x-1">
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
                            </svg>
                          </button>
                          <button type="button" className="p-1 text-green-500 hover:text-green-600">
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1 text-red-500 hover:text-red-600">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1 text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Approved At Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approved at:</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Date:</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="date"
                              className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              value={leaveForm.approved_date}
                              onChange={(e) => setLeaveForm({ ...leaveForm, approved_date: e.target.value })}
                            />
                            <button
                              type="button"
                              onClick={() => setLeaveForm({ ...leaveForm, approved_date: getTodayDate() })}
                              className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                            >
                              Today
                            </button>
                            <CalendarIcon className="w-4 h-4 text-indigo-500" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Time:</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              value={leaveForm.approved_time}
                              onChange={(e) => setLeaveForm({ ...leaveForm, approved_time: e.target.value })}
                            />
                            <button
                              type="button"
                              onClick={() => setLeaveForm({ ...leaveForm, approved_time: getCurrentTime() })}
                              className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                            >
                              Now
                            </button>
                            <ClockIcon className="w-4 h-4 text-indigo-500" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Note: You are 7 hours ahead of server time.</p>
                    </div>

                    {/* Rejection Reason Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rejection reason:</label>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={leaveForm.rejection_reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, rejection_reason: e.target.value })}
                        placeholder="Reason for rejection (if applicable)..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingLeaveRequest(null)
                      resetForms()
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {modalType === "time" ? "Add Entry" : editingLeaveRequest ? "Update Request" : "Submit Request"}
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
