// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/Layout"
// import { auditService } from "../../lib/services"

// // Icons
// const ShieldCheckIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//         />
//     </svg>
// )

// const ExclamationTriangleIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//         />
//     </svg>
// )

// const DocumentTextIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
//         />
//     </svg>
// )

// const ComputerDesktopIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
//         />
//     </svg>
// )

// export default function Audit() {
//     const [activeTab, setActiveTab] = useState("logs")
//     const [auditLogs, setAuditLogs] = useState([])
//     const [loginAttempts, setLoginAttempts] = useState([])
//     const [securityEvents, setSecurityEvents] = useState([])
//     const [activitySummary, setActivitySummary] = useState({})
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             setError("")

//             const [auditLogsData, loginAttemptsData, securityEventsData, activitySummaryData] = await Promise.all([
//                 auditService.getAuditLogs(),
//                 auditService.getLoginAttempts(),
//                 auditService.getSecurityEvents(),
//                 auditService.getActivitySummary(),
//             ])

//             setAuditLogs(auditLogsData)
//             setLoginAttempts(loginAttemptsData)
//             setSecurityEvents(securityEventsData)
//             setActivitySummary(activitySummaryData)
//         } catch (error) {
//             console.error("Failed to fetch audit data:", error)
//             setError("Failed to load audit data. Please try again.")

//             // Mock data for demonstration
//             setAuditLogs([
//                 {
//                     id: 1,
//                     user: { first_name: "John", last_name: "Doe" },
//                     action: "Employee Created",
//                     table_name: "employees",
//                     record_id: 123,
//                     timestamp: "2025-01-22T10:30:00Z",
//                     ip_address: "192.168.1.100",
//                     user_agent: "Mozilla/5.0...",
//                 },
//                 {
//                     id: 2,
//                     user: { first_name: "Jane", last_name: "Smith" },
//                     action: "Payroll Updated",
//                     table_name: "payrolls",
//                     record_id: 456,
//                     timestamp: "2025-01-22T09:15:00Z",
//                     ip_address: "192.168.1.101",
//                     user_agent: "Mozilla/5.0...",
//                 },
//             ])

//             setLoginAttempts([
//                 {
//                     id: 1,
//                     email: "john.doe@company.com",
//                     ip_address: "192.168.1.100",
//                     success: true,
//                     timestamp: "2025-01-22T10:30:00Z",
//                     user_agent: "Mozilla/5.0...",
//                 },
//                 {
//                     id: 2,
//                     email: "hacker@evil.com",
//                     ip_address: "10.0.0.1",
//                     success: false,
//                     timestamp: "2025-01-22T02:15:00Z",
//                     user_agent: "curl/7.68.0",
//                 },
//             ])

//             setSecurityEvents([
//                 {
//                     id: 1,
//                     event_type: "Failed Login Attempt",
//                     severity: "medium",
//                     description: "Multiple failed login attempts from IP 10.0.0.1",
//                     timestamp: "2025-01-22T02:15:00Z",
//                     ip_address: "10.0.0.1",
//                 },
//                 {
//                     id: 2,
//                     event_type: "Suspicious Activity",
//                     severity: "high",
//                     description: "Unusual data access pattern detected",
//                     timestamp: "2025-01-22T01:30:00Z",
//                     ip_address: "192.168.1.200",
//                 },
//             ])

//             setActivitySummary({
//                 total_logins_today: 45,
//                 failed_logins_today: 3,
//                 total_actions_today: 127,
//                 unique_users_today: 23,
//                 security_events_today: 2,
//             })
//         } finally {
//             setLoading(false)
//         }
//     }

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A"
//         return new Date(dateString).toLocaleString()
//     }

//     const getStatusColor = (success) => {
//         return success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//     }

//     const getSeverityColor = (severity) => {
//         switch (severity) {
//             case "high":
//                 return "bg-red-100 text-red-800"
//             case "medium":
//                 return "bg-yellow-100 text-yellow-800"
//             case "low":
//                 return "bg-green-100 text-green-800"
//             default:
//                 return "bg-gray-100 text-gray-800"
//         }
//     }

//     if (loading) {
//         return (
//             <Layout>
//                 <div className="p-6">
//                     <div className="animate-pulse">
//                         <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//                         <div className="flex gap-6">
//                             <div className="flex-1 space-y-4">
//                                 {[...Array(3)].map((_, i) => (
//                                     <div key={i} className="h-32 bg-gray-200 rounded"></div>
//                                 ))}
//                             </div>
//                             <div className="w-80 space-y-4">
//                                 <div className="h-48 bg-gray-200 rounded"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Layout>
//         )
//     }

//     return (
//         <Layout>
//             <div className="p-6">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit & Security</h1>
//                     <p className="text-gray-600">Monitor system activity, login attempts, and security events</p>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
//                         <div className="text-sm text-red-700">{error}</div>
//                     </div>
//                 )}

//                 <div className="flex gap-6">
//                     {/* Main Content */}
//                     <div className="flex-1">
//                         {/* Tabs */}
//                         <div className="border-b border-gray-200 mb-6">
//                             <nav className="-mb-px flex space-x-8">
//                                 <button
//                                     onClick={() => setActiveTab("logs")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "logs"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Audit Logs
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("logins")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "logins"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Login Attempts
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("security")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "security"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Security Events
//                                 </button>
//                             </nav>
//                         </div>

//                         {/* Tab Content Header */}
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-semibold text-gray-900">
//                                 {activeTab === "logs" && "System Audit Logs"}
//                                 {activeTab === "logins" && "Login Attempts"}
//                                 {activeTab === "security" && "Security Events"}
//                             </h2>
//                         </div>

//                         {/* Audit Logs Tab */}
//                         {activeTab === "logs" && (
//                             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 User
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Action
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Table
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Timestamp
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 IP Address
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                         {auditLogs.map((log) => (
//                                             <tr key={log.id} className="hover:bg-gray-50">
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <div className="flex items-center">
//                                                         <div className="h-8 w-8 flex-shrink-0">
//                                                             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
//                                                                 <span className="text-xs font-medium text-indigo-700">
//                                                                     {log.user?.first_name?.[0]}
//                                                                     {log.user?.last_name?.[0]}
//                                                                 </span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="ml-3">
//                                                             <div className="text-sm font-medium text-gray-900">
//                                                                 {log.user?.first_name} {log.user?.last_name}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.table_name}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                     {formatDate(log.timestamp)}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.ip_address}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         {/* Login Attempts Tab */}
//                         {activeTab === "logins" && (
//                             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Email
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Status
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 IP Address
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Timestamp
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 User Agent
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                         {loginAttempts.map((attempt) => (
//                                             <tr key={attempt.id} className="hover:bg-gray-50">
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                     {attempt.email}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     <span
//                                                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(attempt.success)}`}
//                                                     >
//                                                         {attempt.success ? "Success" : "Failed"}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.ip_address}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                     {formatDate(attempt.timestamp)}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
//                                                     {attempt.user_agent}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         {/* Security Events Tab */}
//                         {activeTab === "security" && (
//                             <div className="space-y-4">
//                                 {securityEvents.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <ShieldCheckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500">No security events found</div>
//                                     </div>
//                                 ) : (
//                                     securityEvents.map((event) => (
//                                         <div
//                                             key={event.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">{event.event_type}</h3>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}
//                                                         >
//                                                             {event.severity} severity
//                                                         </span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-3">{event.description}</p>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                         <div>IP: {event.ip_address}</div>
//                                                         <div>Time: {formatDate(event.timestamp)}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     {event.severity === "high" && <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Sidebar - Activity Summary */}
//                     <div className="w-80">
//                         <div className="bg-white rounded-lg border border-gray-200 p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity Summary</h3>

//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Logins</div>
//                                         <div className="text-2xl font-bold text-gray-900">{activitySummary.total_logins_today || 0}</div>
//                                     </div>
//                                     <div className="p-2 bg-blue-100 rounded-lg">
//                                         <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Failed Logins</div>
//                                         <div className="text-2xl font-bold text-gray-900">{activitySummary.failed_logins_today || 0}</div>
//                                     </div>
//                                     <div className="p-2 bg-red-100 rounded-lg">
//                                         <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Actions</div>
//                                         <div className="text-2xl font-bold text-gray-900">{activitySummary.total_actions_today || 0}</div>
//                                     </div>
//                                     <div className="p-2 bg-green-100 rounded-lg">
//                                         <DocumentTextIcon className="h-6 w-6 text-green-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Unique Users</div>
//                                         <div className="text-2xl font-bold text-gray-900">{activitySummary.unique_users_today || 0}</div>
//                                     </div>
//                                     <div className="p-2 bg-purple-100 rounded-lg">
//                                         <ComputerDesktopIcon className="h-6 w-6 text-purple-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Security Events</div>
//                                         <div className="text-2xl font-bold text-gray-900">{activitySummary.security_events_today || 0}</div>
//                                     </div>
//                                     <div className="p-2 bg-yellow-100 rounded-lg">
//                                         <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }


"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { auditService } from "../../lib/services"
import {
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    UserIcon,
    ClockIcon,
} from "@heroicons/react/24/outline"

export default function Audit() {
    const [activeTab, setActiveTab] = useState("overview")
    const [auditLogs, setAuditLogs] = useState([])
    const [loginAttempts, setLoginAttempts] = useState([])
    const [securityEvents, setSecurityEvents] = useState([])
    const [activitySummary, setActivitySummary] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [logsData, attemptsData, eventsData, summaryData] = await Promise.all([
                auditService.getAuditLogs(),
                auditService.getLoginAttempts(),
                auditService.getSecurityEvents(),
                auditService.getActivitySummary(),
            ])

            setAuditLogs(logsData)
            setLoginAttempts(attemptsData)
            setSecurityEvents(eventsData)
            setActivitySummary(summaryData)
        } catch (error) {
            console.error("Failed to fetch audit data:", error)
        } finally {
            setLoading(false)
        }
    }

    const getActionColor = (action) => {
        switch (action?.toLowerCase()) {
            case "create":
                return "bg-green-100 text-green-800"
            case "update":
                return "bg-blue-100 text-blue-800"
            case "delete":
                return "bg-red-100 text-red-800"
            case "login":
                return "bg-purple-100 text-purple-800"
            case "logout":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "success":
            case "successful":
                return "bg-green-100 text-green-800"
            case "failed":
            case "failure":
                return "bg-red-100 text-red-800"
            case "blocked":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getSeverityColor = (severity) => {
        switch (severity?.toLowerCase()) {
            case "high":
            case "critical":
                return "bg-red-100 text-red-800"
            case "medium":
                return "bg-yellow-100 text-yellow-800"
            case "low":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, i) => (
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
                    <h1 className="text-2xl font-bold text-gray-900">Audit & Security</h1>
                    <p className="mt-1 text-sm text-gray-600">Monitor system activity and security events</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ShieldCheckIcon className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Logs</dt>
                                        <dd className="text-lg font-medium text-gray-900">{auditLogs.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UserIcon className="h-8 w-8 text-blue-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Login Attempts</dt>
                                        <dd className="text-lg font-medium text-gray-900">{loginAttempts.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Security Events</dt>
                                        <dd className="text-lg font-medium text-gray-900">{securityEvents.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ClockIcon className="h-8 w-8 text-purple-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Today's Activity</dt>
                                        <dd className="text-lg font-medium text-gray-900">{activitySummary.today || 0}</dd>
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
                            { id: "auditLogs", name: "Audit Logs" },
                            { id: "loginAttempts", name: "Login Attempts" },
                            { id: "securityEvents", name: "Security Events" },
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
                        {/* Recent Activity */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {auditLogs.slice(0, 5).map((log) => (
                                        <div key={log.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                                <p className="text-sm text-gray-500">
                                                    {log.user?.first_name} {log.user?.last_name} • {log.model}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Security Summary */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Security Summary</h3>
                                <div className="space-y-3">
                                    {securityEvents.slice(0, 5).map((event) => (
                                        <div key={event.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{event.event_type}</p>
                                                <p className="text-sm text-gray-500">{event.description}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(event.severity)}`}>
                                                    {event.severity}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "auditLogs" && (
                    <div>
                        <div className="mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search audit logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Model
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Object ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {auditLogs
                                        .filter(
                                            (log) =>
                                                log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                log.model?.toLowerCase().includes(searchTerm.toLowerCase()),
                                        )
                                        .map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.user?.first_name} {log.user?.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(log.action)}`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.model}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.object_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.ip_address}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "loginAttempts" && (
                    <div>
                        <div className="mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search login attempts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User Agent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {loginAttempts
                                        .filter(
                                            (attempt) =>
                                                attempt.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                attempt.ip_address?.toLowerCase().includes(searchTerm.toLowerCase()),
                                        )
                                        .map((attempt) => (
                                            <tr key={attempt.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {attempt.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(attempt.status)}`}>
                                                        {attempt.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.ip_address}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{attempt.user_agent}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {attempt.created_at ? new Date(attempt.created_at).toLocaleString() : "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "securityEvents" && (
                    <div>
                        <div className="mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search security events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Severity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {securityEvents
                                        .filter(
                                            (event) =>
                                                event.event_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                event.description?.toLowerCase().includes(searchTerm.toLowerCase()),
                                        )
                                        .map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {event.event_type}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{event.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(event.severity)}`}>
                                                        {event.severity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {event.user?.first_name} {event.user?.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.ip_address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {event.timestamp ? new Date(event.timestamp).toLocaleString() : "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}
