"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { jobPostingService, departmentService, positionService, managerService } from "../../lib/services"

// Icons
const BriefcaseIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
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

const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
    </svg>
)

const MapPinIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
        />
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

const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
    </svg>
)

export default function JobPostings() {
    const [jobPostings, setJobPostings] = useState([])
    const [departments, setDepartments] = useState([])
    const [positions, setPositions] = useState([])
    const [managers, setManagers] = useState([])
    const [statistics, setStatistics] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        avgApplicationsPerJob: 0,
    })
    const [loading, setLoading] = useState(true)
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
    const [selectedStatus, setSelectedStatus] = useState("All Status")
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        position: "",
        title: "",
        description: "",
        requirements: "",
        responsibilities: "",
        location: "",
        salary_min: "",
        salary_max: "",
        employment_type: "full_time",
        status: "draft",
        closing_date: "",
        manager: "",
        required_skills: "",
        preferred_skills: "",
        benefits: "",
        is_remote: false,
        experience_required: "",
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            setError("")

            const [jobPostingsData, departmentsData, positionsData, managersData, statisticsData] = await Promise.all([
                jobPostingService.getJobPostings(),
                departmentService.getDepartments(),
                positionService.getPositions(),
                managerService.getManagers(),
                jobPostingService.getJobPostingStatistics(),
            ])

            setJobPostings(jobPostingsData)
            setDepartments(departmentsData)
            setPositions(positionsData)
            setManagers(managersData)
            setStatistics(statisticsData)
        } catch (error) {
            console.error("Failed to fetch job postings data:", error)
            setError("Failed to load job postings data. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError("")

        try {
            const jobPostingData = {
                position: Number.parseInt(formData.position) || 0,
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements,
                responsibilities: formData.responsibilities,
                location: formData.location,
                salary_min: formData.salary_min ? Number.parseInt(formData.salary_min) : null,
                salary_max: formData.salary_max ? Number.parseInt(formData.salary_max) : null,
                employment_type: formData.employment_type,
                status: formData.status,
                closing_date: formData.closing_date,
                manager: Number.parseInt(formData.manager) || 0,
                required_skills: formData.required_skills,
                preferred_skills: formData.preferred_skills,
                benefits: formData.benefits,
                is_remote: formData.is_remote,
                experience_required: Number.parseInt(formData.experience_required) || 0,
            }

            await jobPostingService.createJobPosting(jobPostingData)

            // Reset form and close modal
            setShowCreateModal(false)
            setFormData({
                position: "",
                title: "",
                description: "",
                requirements: "",
                responsibilities: "",
                location: "",
                salary_min: "",
                salary_max: "",
                employment_type: "full_time",
                status: "draft",
                closing_date: "",
                manager: "",
                required_skills: "",
                preferred_skills: "",
                benefits: "",
                is_remote: false,
                experience_required: "",
            })

            // Refresh data
            await fetchData()
        } catch (error) {
            console.error("Failed to create job posting:", error)
            setError("Failed to create job posting. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "No deadline"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800"
            case "draft":
                return "bg-yellow-100 text-yellow-800"
            case "closed":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const filteredJobPostings = jobPostings.filter((job) => {
        const departmentMatch =
            selectedDepartment === "All Departments" ||
            job.position?.department?.name === selectedDepartment ||
            job.department === selectedDepartment
        const statusMatch = selectedStatus === "All Status" || job.status === selectedStatus
        return departmentMatch && statusMatch
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Postings</h1>
                    <p className="text-gray-600">Manage job openings and track recruitment progress</p>
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
                        {/* Job Postings Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Active Job Postings</h2>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Create Job Posting
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option>All Status</option>
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        {/* Job Postings List */}
                        <div className="space-y-4">
                            {filteredJobPostings.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <div className="text-gray-500 mb-4">No job postings found</div>
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <PlusIcon className="h-5 w-5 mr-2" />
                                        Create First Job Posting
                                    </button>
                                </div>
                            ) : (
                                filteredJobPostings.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}
                                                    >
                                                        {job.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <BriefcaseIcon className="h-4 w-4" />
                                                        {job.position?.department?.name || job.department || "N/A"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPinIcon className="h-4 w-4" />
                                                        {job.location} {job.is_remote && "(Remote)"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        Deadline: {formatDate(job.closing_date)}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                    Edit
                                                </button>
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <UsersIcon className="h-4 w-4" />
                                                    {job.applications_count || 0} applications
                                                </div>
                                                <div className="text-sm text-gray-600">{job.employment_type?.replace("_", " ")}</div>
                                                {job.salary_min && job.salary_max && (
                                                    <div className="text-sm text-gray-600">
                                                        ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">Posted {formatDate(job.created_at)}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80">
                        {/* Job Posting Statistics */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Statistics</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Total Jobs</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.totalJobs}</div>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Active Jobs</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.activeJobs}</div>
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <BriefcaseIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Total Applications</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.totalApplications}</div>
                                    </div>
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Avg Applications/Job</div>
                                        <div className="text-2xl font-bold text-gray-900">{statistics.avgApplicationsPerJob}</div>
                                    </div>
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <UsersIcon className="h-6 w-6 text-orange-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Job Posting Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-6 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create New Job Posting</h3>
                                <p className="text-sm text-gray-600">Fill out the details for the new job posting</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                            <input
                                                type="text"
                                                required
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. Senior Software Engineer"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                            <select
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                            <input
                                                type="text"
                                                required
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g. San Francisco, CA"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                                            <select
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.employment_type}
                                                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                                            >
                                                <option value="full_time">Full Time</option>
                                                <option value="part_time">Part Time</option>
                                                <option value="contract">Contract</option>
                                                <option value="intern">Intern</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <select
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="active">Active</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                                            <select
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                    </div>
                                </div>

                                {/* Salary and Experience */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Compensation & Experience</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary</label>
                                            <input
                                                type="number"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.salary_min}
                                                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                                                placeholder="50000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary</label>
                                            <input
                                                type="number"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.salary_max}
                                                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                                                placeholder="80000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Experience Required (years)
                                            </label>
                                            <input
                                                type="number"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.experience_required}
                                                onChange={(e) => setFormData({ ...formData, experience_required: e.target.value })}
                                                placeholder="3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Dates and Remote */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Additional Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Closing Date</label>
                                            <input
                                                type="date"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.closing_date}
                                                onChange={(e) => setFormData({ ...formData, closing_date: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_remote"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData.is_remote}
                                                onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
                                            />
                                            <label htmlFor="is_remote" className="ml-2 block text-sm text-gray-900">
                                                Remote Work Available
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Job Details</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Describe the role and what the candidate will be doing..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                                            <textarea
                                                rows={3}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.requirements}
                                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                                placeholder="List the required qualifications and skills..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                                            <textarea
                                                rows={3}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.responsibilities}
                                                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                                                placeholder="Outline the key responsibilities..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Skills and Benefits */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Skills & Benefits</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                                            <textarea
                                                rows={3}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.required_skills}
                                                onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                                                placeholder="JavaScript, React, Node.js..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Skills</label>
                                            <textarea
                                                rows={3}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.preferred_skills}
                                                onChange={(e) => setFormData({ ...formData, preferred_skills: e.target.value })}
                                                placeholder="TypeScript, AWS, Docker..."
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                                        <textarea
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.benefits}
                                            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                            placeholder="Health insurance, 401k, flexible hours..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateModal(false)
                                            setFormData({
                                                position: "",
                                                title: "",
                                                description: "",
                                                requirements: "",
                                                responsibilities: "",
                                                location: "",
                                                salary_min: "",
                                                salary_max: "",
                                                employment_type: "full_time",
                                                status: "draft",
                                                closing_date: "",
                                                manager: "",
                                                required_skills: "",
                                                preferred_skills: "",
                                                benefits: "",
                                                is_remote: false,
                                                experience_required: "",
                                            })
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
                                        {submitting ? "Creating..." : "Create Job Posting"}
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
