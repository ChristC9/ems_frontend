"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Pagination from "../../components/Pagination"
import { applicationService, jobPostingService } from "../../lib/services"
import {
    DocumentTextIcon,
    BriefcaseIcon,
    CalendarIcon,
    UsersIcon,
    EyeIcon,
} from "@heroicons/react/24/outline"


export default function Applications() {
    const [applications, setApplications] = useState([])
    const [applicants, setApplicants] = useState([])
    const [jobPostings, setJobPostings] = useState([])
    const [applicationStatuses, setApplicationStatuses] = useState([])
    const [statistics, setStatistics] = useState({
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
    })
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState("All Jobs")
    const [selectedStatus, setSelectedStatus] = useState("All Status")
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState("")

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 5 // Default limit for applications

    useEffect(() => {
        fetchData()
    }, [currentPage, selectedStatus, selectedJob])

    const fetchData = async () => {
        try {
            setLoading(true)
            setError("")

            console.log("Fetching data with filters:", { selectedStatus, selectedJob, currentPage })

            const statusParam = selectedStatus !== "All Status" ? selectedStatus : null
            const jobParam = selectedJob !== "All Jobs" ? getJobPostingId(selectedJob) : null

            const [applicationsData, applicantsData, jobPostingsData, statusesData, statisticsData] = await Promise.all([
                applicationService.getApplications(statusParam, jobParam, currentPage, itemsPerPage),
                applicationService.getApplicants(1, 100), // Get all applicants for matching
                jobPostingService.getJobPostings(1, 100), // Get all job postings for matching
                applicationService.getApplicationStatuses(),
                applicationService.getApplicationStatistics(statusParam, jobParam),
            ])

            console.log("API Response - Applications:", applicationsData)
            console.log("API Response - Applicants:", applicantsData)
            console.log("API Response - Job Postings:", jobPostingsData)
            console.log("API Response - Statistics:", statisticsData)

            setApplications(applicationsData.results)
            setTotalPages(applicationsData.total_pages)
            setTotalItems(applicationsData.count)
            setApplicants(applicantsData.results)
            setJobPostings(jobPostingsData.results)
            setApplicationStatuses(statusesData)
            setStatistics(statisticsData)

            console.log("Processed data:", {
                applications: applicationsData.results.length,
                applicants: applicantsData.results.length,
                jobPostings: jobPostingsData.results.length,
                totalPages: applicationsData.total_pages,
                totalItems: applicationsData.count,
            })
        } catch (error) {
            console.error("Failed to fetch applications data:", error)
            setError("Failed to load applications data. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const getJobPostingId = (jobTitle) => {
        const job = jobPostings.find((job) => job.title === jobTitle)
        return job ? job.id : null
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
            case "received":
                return "bg-blue-100 text-blue-800"
            case "screening":
                return "bg-yellow-100 text-yellow-800"
            case "phone_interview":
                return "bg-purple-100 text-purple-800"
            case "interview":
                return "bg-indigo-100 text-indigo-800"
            case "final_interview":
                return "bg-orange-100 text-orange-800"
            case "reference_check":
                return "bg-cyan-100 text-cyan-800"
            case "offer_extended":
                return "bg-emerald-100 text-emerald-800"
            case "hired":
                return "bg-green-100 text-green-800"
            case "rejected":
                return "bg-red-100 text-red-800"
            case "withdrawn":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusLabel = (status) => {
        const statusOption = applicationStatuses.find((s) => s.value === status)
        return statusOption ? statusOption.label : status
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

    const handleStatusFilterChange = (newStatus) => {
        setSelectedStatus(newStatus)
        setCurrentPage(1) // Reset to first page when filter changes
    }

    const handleJobFilterChange = (newJob) => {
        setSelectedJob(newJob)
        setCurrentPage(1) // Reset to first page when filter changes
    }

    // Combine applications and applicants data for display
    const combinedApplications = applications.map((application) => {
        const applicant = applicants.find(
            (app) =>
                app.id === application.applicant_id ||
                app.id === application.applicant ||
                app.email === application.candidate_email,
        )
        const jobPosting = jobPostings.find(
            (job) => job.id === application.job_posting_id || job.id === application.job_posting,
        )

        return {
            ...application,
            candidate_name:
                application.candidate_name ||
                application.applicant_name ||
                (applicant ? `${applicant.first_name} ${applicant.last_name}` : "Unknown Candidate"),
            candidate_email: application.candidate_email || application.email || applicant?.email || "No email",
            candidate_phone: application.candidate_phone || application.phone || applicant?.phone || "",
            resume_url: application.resume_url || application.resume || applicant?.resume || "",
            cover_letter: application.cover_letter || applicant?.cover_letter || "",
            experience_years: application.experience_years || applicant?.experience_years || "",
            job_posting: jobPosting || { title: application.job_title || "Unknown Position" },
            applied_date:
                application.applied_at || application.applied_date || application.created_at || new Date().toISOString(),
        }
    })

    // Filter applications based on search term
    const filteredApplications = combinedApplications.filter(
        (app) =>
            app.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.candidate_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.job_posting?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

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
                                    onChange={(e) => handleJobFilterChange(e.target.value)}
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
                                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                                    className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>All Status</option>
                                    {applicationStatuses.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input
                                    type="text"
                                    placeholder="Search candidates..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Applications List */}
                        <div className="space-y-4 mb-6">
                            {filteredApplications.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                    <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <div className="text-gray-500 mb-2">No applications found</div>
                                    <div className="text-sm text-gray-400">
                                        {applications.length === 0
                                            ? "No applications available in the system"
                                            : "Try adjusting your filters or search terms"}
                                    </div>
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
                                                                .join("") || "?"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{application.candidate_name}</h3>
                                                        <p className="text-sm text-gray-600">{application.candidate_email}</p>
                                                        {application.candidate_phone && (
                                                            <p className="text-sm text-gray-600">{application.candidate_phone}</p>
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}
                                                    >
                                                        {getStatusLabel(application.status)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <BriefcaseIcon className="h-4 w-4" />
                                                        {application.job_posting?.title || "Unknown Position"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        Applied {formatDate(application.applied_date)}
                                                    </div>
                                                    {application.experience_years && (
                                                        <div className="text-sm text-gray-600">{application.experience_years} years experience</div>
                                                    )}
                                                </div>
                                                {application.cover_letter && (
                                                    <p className="text-gray-700 text-sm line-clamp-2">{application.cover_letter}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <select
                                                    value={application.status}
                                                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {applicationStatuses.map((status) => (
                                                        <option key={status.value} value={status.value}>
                                                            {status.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    View
                                                </button>
                                                {application.applicant_resume_url && (
                                                    <a
                                                        href={application.applicant_resume_url}
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
                                    </div>
                                ))
                            )}
                        </div>

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
                                        <div className="text-sm text-gray-600">Received</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.received}</div>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Screening</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.screening}</div>
                                    </div>
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Phone Interview</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.phoneInterview}</div>
                                    </div>
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Interview</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.interview}</div>
                                    </div>
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Final Interview</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.finalInterview}</div>
                                    </div>
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Reference Check</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.referenceCheck}</div>
                                    </div>
                                    <div className="p-2 bg-cyan-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-cyan-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Offer Extended</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.offerExtended}</div>
                                    </div>
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <DocumentTextIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Hired</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.hired}</div>
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Rejected</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.rejected}</div>
                                    </div>
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Withdrawn</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.withdrawn}</div>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-gray-600" />
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
