"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import {
  employeeService,
  payrollService,
  timekeepingService,
  departmentService,
  jobPostingService,
  applicationService,
} from "../../lib/services"

// Fix the Heroicons imports - these might be causing the undefined component error
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

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const BuildingOfficeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21h16.5M4.5 3h15l-.75 18h-13.5L4.5 3zM9 9h1.5m-1.5 3h1.5m-1.5 3h1.5M13.5 9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
)

const BriefcaseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
)

const DocumentTextIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
)

const TrendingUpIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
)

const TrendingDownIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.511l-5.511-3.182"
    />
  </svg>
)

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalPayroll: 0,
    pendingLeaves: 0,
    departments: 0,
    activeJobs: 0,
    pendingApplications: 0,
  })
  const [recentEmployees, setRecentEmployees] = useState([])
  const [recentApplications, setRecentApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [employees, payrolls, leaveRequests, departments, jobStats, applicationStats, applications] =
          await Promise.all([
            employeeService.getEmployees(),
            payrollService.getPayrolls(),
            timekeepingService.getLeaveRequests(),
            departmentService.getDepartments(),
            jobPostingService.getJobPostingStatistics(),
            applicationService.getApplicationStatistics(),
            applicationService.getApplications(),
          ])

        setStats({
          totalEmployees: employees.length,
          totalPayroll: payrolls.reduce((sum, payroll) => sum + (payroll.total_amount || 0), 0),
          pendingLeaves: leaveRequests.filter((req) => req.status === "pending").length,
          departments: departments.length,
          activeJobs: jobStats.activeJobs,
          pendingApplications: applicationStats.pending,
        })

        setRecentEmployees(employees.slice(0, 5))
        setRecentApplications(applications.slice(0, 5))
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      name: "Total Employees",
      value: stats.totalEmployees,
      icon: UsersIcon,
      change: "+12%",
      changeType: "increase",
      color: "bg-blue-500",
    },
    {
      name: "Monthly Payroll",
      value: `$${stats.totalPayroll.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      change: "+8%",
      changeType: "increase",
      color: "bg-green-500",
    },
    {
      name: "Active Jobs",
      value: stats.activeJobs,
      icon: BriefcaseIcon,
      change: "+3%",
      changeType: "increase",
      color: "bg-purple-500",
    },
    {
      name: "Pending Applications",
      value: stats.pendingApplications,
      icon: DocumentTextIcon,
      change: "+15%",
      changeType: "increase",
      color: "bg-orange-500",
    },
    {
      name: "Pending Leaves",
      value: stats.pendingLeaves,
      icon: ClockIcon,
      change: "-2%",
      changeType: "decrease",
      color: "bg-yellow-500",
    },
    {
      name: "Departments",
      value: stats.departments,
      icon: BuildingOfficeIcon,
      change: "0%",
      changeType: "neutral",
      color: "bg-indigo-500",
    },
  ]

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
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
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            {/* <img className="h-8 w-auto" src="/logo.webp" alt="Meta Arc" /> */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === "increase"
                            ? "text-green-600"
                            : stat.changeType === "decrease"
                              ? "text-red-600"
                              : "text-gray-500"
                            }`}
                        >
                          {stat.changeType === "increase" ? (
                            <TrendingUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          ) : stat.changeType === "decrease" ? (
                            <TrendingDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                          ) : null}
                          <span className="ml-1">{stat.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Employees */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Employees</h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentEmployees.map((employee) => (
                    <li key={employee.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-700">
                              {employee.first_name?.[0]}
                              {employee.last_name?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {employee.first_name} {employee.last_name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {employee.position?.name || "No position"} • {employee.department?.name || "No department"}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                          >
                            {employee.status || "Active"}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="/employees"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all employees
                </a>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Applications</h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentApplications.map((application) => (
                    <li key={application.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {application.candidate_name
                                ?.split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{application.candidate_name}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {application.job_posting?.title} • {application.job_posting?.department}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${application.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === "interview"
                                ? "bg-blue-100 text-blue-800"
                                : application.status === "hired"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="/applications"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all applications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
