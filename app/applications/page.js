"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { applicationService, jobPostingService } from "../../lib/services"

// Icons
const DocumentTextIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
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

const CheckIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
)

const XMarkIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
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

const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
    </svg>
)

export default function Applications() {
    const [applications, setApplications] = useState([])
    const [jobPostings, setJobPostings] = useState([])
    const [statistics, setStatistics] = useState({
        total: 0,
        pending: 0,
        interview: 0,
        hired: 0,
        rejected: 0,
    })
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState("All Jobs")
    const [selectedStatus, setSelectedStatus] = useState("All Status")
    const [error, setError] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            setError("")

            const [applicationsData, jobPostingsData, statisticsData] = await Promise.all([
                applicationService.getApplications(),
                jobPostingService.getJobPostings(),
                applicationService.getApplicationStatistics(),
            ])

            setApplications(applicationsData)
            setJobPostings(jobPostingsData)
            setStatistics(statisticsData)
        } catch (error) {
            console.error("Failed to fetch applications data:", error)
            setError("Failed to load applications data. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "interview":
                return "bg-blue-100 text-blue-800"
            case "hired":
                return "bg-green-100 text-green-800"
            case "rejected":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await applicationService.updateApplicationStatus(applicationId, newStatus)
            // Refresh data
            await fetchData()
        } catch (error) {
            console.error("Failed to update application status:", error)
            setError("Failed to update application status. Please try again.")
        }
    }

    const filteredApplications = applications.filter((app) => {
        const jobMatch = selectedJob === "All Jobs" || app.job_posting?.title === selectedJob
        const statusMatch = selectedStatus === "All Status" || app.status === selectedStatus
        return jobMatch && statusMatch
    })

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
                    <p className="text-gray-600">Review and manage job applications from candidates</p>
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
                        {/* Applications Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
                                <select
                                    value={selectedJob}
                                    onChange={(e) => setSelectedJob(e.target.value)}
                                    className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>All Jobs</option>
                                    {jobPostings.map((job) => (
                                        <option key={job.id} value={job.title}>
                                            {job.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="interview">Interview</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        {/* Applications List */}
                        <div className="space-y-4">
                            {filteredApplications.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                    <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <div className="text-gray-500">No applications found</div>
                                </div>
                            ) : (
                                filteredApplications.map((application) => (
                                    <div
                                        key={application.id}
                                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-indigo-700">
                                                            {application.candidate_name
                                                                ?.split(" ")
                                                                .map((name) => name[0])
                                                                .join("")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{application.candidate_name}</h3>
                                                        <p className="text-sm text-gray-600">{application.candidate_email}</p>
                                                    </div>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}
                                                    >
                                                        {application.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <BriefcaseIcon className="h-4 w-4" />
                                                        {application.job_posting?.title}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        Applied {formatDate(application.applied_at)}
                                                    </div>
                                                    <div className="text-sm text-gray-600">{application.experience_years} years experience</div>
                                                </div>
                                                <p className="text-gray-700 text-sm line-clamp-2">{application.cover_letter}</p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    View
                                                </button>
                                                {application.resume_url && (
                                                    <a
                                                        href={application.resume_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-900"
                                                    >
                                                        <DocumentTextIcon className="h-4 w-4 mr-1" />
                                                        Resume
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {application.status === "pending" && (
                                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={() => handleStatusChange(application.id, "interview")}
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                >
                                                    <CheckIcon className="h-4 w-4 mr-1" />
                                                    Interview
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(application.id, "rejected")}
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                                                >
                                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {application.status === "interview" && (
                                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={() => handleStatusChange(application.id, "hired")}
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                                >
                                                    <CheckIcon className="h-4 w-4 mr-1" />
                                                    Hire
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(application.id, "rejected")}
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                                                >
                                                    <XMarkIcon className="h-4 w-4 mr-1" />
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80">
                        {/* Application Statistics */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Statistics</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Total Applications</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.total}</div>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Pending Review</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.pending}</div>
                                    </div>
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">In Interview</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.interview}</div>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Hired</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.hired}</div>
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <CheckIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Rejected</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.rejected}</div>
                                    </div>
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <XMarkIcon className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
