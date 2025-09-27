"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import Pagination from "../../components/Pagination"
import {
    applicationService,
    jobPostingService,
    employeeService,
    interviewService,
    referenceCheckService,
    managerService
} from "../../lib/services"
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    UserGroupIcon,
    CalendarIcon,
    PhoneIcon,
    CheckCircleIcon,
    XMarkIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline"

export default function Recruitment() {
    const [activeTab, setActiveTab] = useState("overview")
    const [interviews, setInterviews] = useState([])
    const [referenceChecks, setReferenceChecks] = useState([])
    const [managers, setManagers] = useState([])
    const [completedTechnicalInterviews, setCompletedTechnicalInterviews] = useState([])
    const [applications, setApplications] = useState([])
    const [jobPostings, setJobPostings] = useState([])
    const [finalLists, setFinalList] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState("interview") // interview, reference
    const [editingItem, setEditingItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [deleteType, setDeleteType] = useState("")

    const [interviewsPage, setInterviewsPage] = useState(1)
    const [interviewsTotalPages, setInterviewsTotalPages] = useState(0)
    const [interviewsTotalItems, setInterviewsTotalItems] = useState(0)
    const [referencesPage, setReferencesPage] = useState(1)
    const [referencesTotalPages, setReferencesTotalPages] = useState(0)
    const [referencesTotalItems, setReferencesTotalItems] = useState(0)
    const interviewsPerPage = 5
    const referencesPerPage = 5

    // Form states
    const [interviewForm, setInterviewForm] = useState({
        application: "",
        interview_type: "phone",
        scheduled_date: "",
        duration_minutes: 60,
        interviewer: "",
        location: "",
        notes: "",
        rating: "",
        status: "scheduled",
        feedback: "",
        recommendation: "Maybe",
        manager: "",
        questions_asked: ["What is the purpose of joining our company?"],
        technical_assessment: {
            "technical_assessment": "Are you ready for assessment?"
        },
    })

    const [referenceForm, setReferenceForm] = useState({
        application: "",
        reference_name: "",
        reference_title: "",
        reference_company: "",
        reference_email: "",
        reference_phone: "",
        relationship: "",
        status: "pending",
        contacted_date: "",
        completed_date: "",
        feedback: "",
        would_rehire: true,
        performance_rating: "",
        conducted_by: "",
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (activeTab === "interviews") {
            fetchInterviews()
        }
    }, [interviewsPage, activeTab])

    useEffect(() => {
        if (activeTab === "references") {
            fetchReferenceChecks()
        }
    }, [referencesPage, activeTab])

    const fetchData = async () => {
        try {
            const [applicationsData, jobPostingsData, employeesData, managersData, finalListData] = await Promise.all([
                applicationService.getApplications(null, null, 1, 100),
                jobPostingService.getJobPostings(1, 100),
                employeeService.getEmployees(1, 100),
                managerService.getManagers(1, 100),
                interviewService.getFinalList("completed", "technical")
            ])

            setApplications(applicationsData.results || applicationsData)
            setJobPostings(jobPostingsData.results || jobPostingsData)
            setEmployees(employeesData.results || employeesData)
            setManagers(managersData)
            setFinalList(finalListData)

            await fetchCompletedTechnicalInterviews()

            // Fetch initial data for interviews and references
            await fetchInterviews()
            await fetchReferenceChecks()
        } catch (error) {
            console.error("Failed to fetch recruitment data:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCompletedTechnicalInterviews = async () => {
        try {
            const completedInterviews = await interviewService.getFinalList("completed", "technical")
            setCompletedTechnicalInterviews(completedInterviews)
        } catch (error) {
            console.error("Failed to fetch completed technical interviews:", error)
            setCompletedTechnicalInterviews([])
        }
    }
    const fetchInterviews = async () => {
        try {
            const interviewsData = await interviewService.getInterviews(interviewsPage, interviewsPerPage)
            setInterviews(interviewsData.results)
            setInterviewsTotalPages(interviewsData.total_pages)
            setInterviewsTotalItems(interviewsData.count)
        } catch (error) {
            console.error("Failed to fetch interviews:", error)
        }
    }

    const fetchReferenceChecks = async () => {
        try {
            const referenceChecksData = await referenceCheckService.getReferenceChecks(referencesPage, referencesPerPage)
            setReferenceChecks(referenceChecksData.results)
            setReferencesTotalPages(referenceChecksData.total_pages)
            setReferencesTotalItems(referenceChecksData.count)
        } catch (error) {
            console.error("Failed to fetch reference checks:", error)
        }
    }

    const refreshApplicationsData = async () => {
        try {
            const applicationsData = await applicationService.getApplications(null, null, 1, 100)
            setApplications(applicationsData.results || applicationsData)
        } catch (error) {
            console.error("Failed to refresh applications data:", error)
        }
    }

    const handleInterviewsPageChange = (page) => {
        setInterviewsPage(page)
    }

    const handleReferencesPageChange = (page) => {
        setReferencesPage(page)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (modalType === "interview") {
                const interviewData = {
                    ...interviewForm,
                    application: Number.parseInt(interviewForm.application),
                    interviewer: Number.parseInt(interviewForm.interviewer),
                    manager: interviewForm.manager ? Number.parseInt(interviewForm.manager) : null,
                    duration_minutes: Number.parseInt(interviewForm.duration_minutes),
                    rating: interviewForm.rating ? Number.parseInt(interviewForm.rating) : null,
                }

                if (editingItem) {
                    await interviewService.updateInterview(editingItem.id, interviewData)
                } else {
                    await interviewService.createInterview(interviewData)
                }
                await fetchInterviews()

                if (
                    (interviewForm.status === "completed" && interviewForm.interview_type === "technical") ||
                    (editingItem &&
                        editingItem.status !== "completed" &&
                        interviewForm.status === "completed" &&
                        interviewForm.interview_type === "technical")
                ) {
                    await fetchCompletedTechnicalInterviews()
                    await refreshApplicationsData()
                }
            } else if (modalType === "reference") {
                const referenceData = {
                    application: Number(referenceForm.application),
                    reference_name: referenceForm.reference_name?.trim(),
                    reference_title: referenceForm.reference_title || null,
                    reference_company: referenceForm.reference_company || null,
                    reference_email: referenceForm.reference_email?.trim(),
                    reference_phone: referenceForm.reference_phone || null,
                    relationship: referenceForm.relationship,
                    status: referenceForm.status,
                    contacted_date: referenceForm.contacted_date || null,
                    completed_date: referenceForm.completed_date || null,
                    feedback: referenceForm.feedback || "",
                    would_rehire: referenceForm.would_rehire,
                    performance_rating: referenceForm.performance_rating ? Number(referenceForm.performance_rating) : null,
                    conducted_by: referenceForm.conducted_by ? Number(referenceForm.conducted_by) : null,
                }

                if (editingItem) {
                    await referenceCheckService.updateReferenceCheck(editingItem.id, referenceData)
                } else {
                    await referenceCheckService.createReferenceCheck(referenceData)
                }
                await fetchReferenceChecks()
            }

            setShowModal(false)
            setEditingItem(null)
            resetForms()

            if (
                !editingItem &&
                ((modalType === "interview" && interviewsPage > 1) || (modalType === "reference" && referencesPage > 1))
            ) {
                if (modalType === "interview") {
                    setInterviewsPage(1)
                } else {
                    setReferencesPage(1)
                }
            }
        } catch (error) {
            console.error("Failed to save item:", error)
            alert(`Failed to save. Error: ${error.message}`)
        }
    }

    const resetForms = () => {
        setInterviewForm({
            application: "",
            interview_type: "phone",
            scheduled_date: "",
            duration_minutes: 60,
            interviewer: "",
            location: "",
            notes: "",
            rating: "",
            status: "scheduled",
            feedback: "",
            recommendation: "maybe",
            manager: "",
            questions_asked: "",
            technical_assessment: "",
        })
        setReferenceForm({
            application: "",
            reference_name: "",
            reference_title: "",
            reference_company: "",
            reference_email: "",
            reference_phone: "",
            relationship: "",
            status: "pending",
            contacted_date: "",
            completed_date: "",
            feedback: "",
            would_rehire: null,
            performance_rating: "",
            conducted_by: "",
        })
    }

    const handleEdit = (item, type) => {
        setEditingItem(item)
        setModalType(type)

        if (type === "interview") {
            setInterviewForm({
                application: item.application?.toString() || "",
                interview_type: item.interview_type || "phone",
                scheduled_date: item.scheduled_date ? item.scheduled_date.split("T")[0] : "",
                duration_minutes: item.duration_minutes || 60,
                interviewer: item.interviewer?.toString() || "",
                location: item.location || "",
                notes: item.notes || "",
                rating: item.rating?.toString() || "",
                status: item.status || "scheduled",
                feedback: item.feedback || "",
                recommendation: item.recommendation || "Maybe",
                manager: item.manager?.toString() || "",
                questions_asked: item.questions_asked || "",
                technical_assessment: item.technical_assessment || "",
            })
        } else if (type === "reference") {
            setReferenceForm({
                application: item.application?.toString() || "",
                reference_name: item.reference_name || "",
                reference_title: item.reference_title || "",
                reference_company: item.reference_company || "",
                reference_email: item.reference_email || "",
                reference_phone: item.reference_phone || "",
                relationship: item.relationship || "",
                status: item.status || "pending",
                contacted_date: item.contacted_date || "",
                completed_date: item.completed_date || "",
                feedback: item.feedback || "",
                would_rehire: item.would_rehire,
                performance_rating: item.performance_rating?.toString() || "",
                conducted_by: item.conducted_by?.toString() || "",
            })
        }
        setShowModal(true)
    }

    const handleDelete = (item, type) => {
        setItemToDelete(item)
        setDeleteType(type)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        try {
            if (deleteType === "interview") {
                await interviewService.deleteInterview(itemToDelete)
                await fetchInterviews()
                const newTotalPages = Math.ceil((interviewsTotalItems - 1) / interviewsPerPage)
                if (interviewsPage > newTotalPages && newTotalPages > 0) {
                    setInterviewsPage(newTotalPages)
                }
            } else if (deleteType === "reference") {
                await referenceCheckService.deleteReferenceCheck(itemToDelete)
                await fetchReferenceChecks()
                const newTotalPages = Math.ceil((referencesTotalItems - 1) / referencesPerPage)
                if (referencesPage > newTotalPages && newTotalPages > 0) {
                    setReferencesPage(newTotalPages)
                }
            }
            setShowDeleteModal(false)
            setItemToDelete(null)
            setDeleteType("")
        } catch (error) {
            console.error("Failed to delete item:", error)
            alert("Failed to delete item. Please try again.")
        }
    }

    const openModal = (type) => {
        setModalType(type)
        setEditingItem(null)
        resetForms()
        setShowModal(true)
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "scheduled":
                return "bg-blue-100 text-blue-800"
            case "completed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "no_response":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getInterviewTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case "phone":
                return "bg-purple-100 text-purple-800"
            case "video":
                return "bg-blue-100 text-blue-800"
            case "in_person":
                return "bg-green-100 text-green-800"
            case "technical":
                return "bg-orange-100 text-orange-800"
            case "behavioral":
                return "bg-pink-100 text-pink-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const renderStars = (rating) => {
        if (!rating) return "N/A"
        return [...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
                ★
            </span>
        ))
    }

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return "N/A"
        const date = new Date(dateTimeString)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
                    <h1 className="text-2xl font-bold text-gray-900">Recruitment Management</h1>
                    <p className="mt-1 text-sm text-gray-600">Manage interviews and reference checks</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="h-8 w-8 text-blue-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Interviews</dt>
                                        <dd className="text-lg font-medium text-gray-900">{interviewsTotalItems}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <PhoneIcon className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Reference Checks</dt>
                                        <dd className="text-lg font-medium text-gray-900">{referencesTotalItems}</dd>
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
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Applications</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {applications.filter((app) => app.status !== "rejected" && app.status !== "hired").length}
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
                                    <CheckCircleIcon className="h-8 w-8 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Completed Today</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {interviews.filter((interview) => interview.status === "completed").length}
                                        </dd>
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
                            { id: "interviews", name: "Interviews" },
                            { id: "references", name: "Reference Checks" },
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
                        {/* Upcoming Interviews */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upcoming Interviews</h3>
                                <div className="space-y-3">
                                    {interviews
                                        .filter((interview) => interview.status === "scheduled")
                                        .slice(0, 5)
                                        .map((interview) => (
                                            <div key={interview.id} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{interview.applicant_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {interview.job_title} • {formatDateTime(interview.scheduled_date)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${getInterviewTypeColor(interview.interview_type)}`}
                                                    >
                                                        {interview.interview_type}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Pending Reference Checks */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Pending Reference Checks</h3>
                                <div className="space-y-3">
                                    {referenceChecks
                                        .filter((ref) => ref.status === "pending")
                                        .slice(0, 5)
                                        .map((ref) => (
                                            <div key={ref.id} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{ref.applicant_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {ref.reference_name} • {ref.reference_company}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">{ref.days_pending} days pending</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "interviews" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search interviews..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("interview")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Schedule Interview
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Candidate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Scheduled
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Interviewer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {interviews
                                        .filter(
                                            (interview) =>
                                                interview.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                interview.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                interview.interviewer_name?.toLowerCase().includes(searchTerm.toLowerCase()),
                                        )
                                        .map((interview) => (
                                            <tr key={interview.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {interview.applicant_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.job_title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${getInterviewTypeColor(interview.interview_type)}`}
                                                    >
                                                        {interview.interview_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDateTime(interview.scheduled_date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {interview.interviewer_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(interview.status)}`}>
                                                        {interview.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex">{renderStars(interview.rating)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(interview, "interview")}
                                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                                                            title="Edit Interview"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(interview.id, "interview")}
                                                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                                                            title="Delete Interview"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {interviews.length === 0 && (
                                <div className="text-center py-12">
                                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by scheduling a new interview.</p>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => openModal("interview")}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                            Schedule Interview
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Interviews Pagination */}
                        {interviewsTotalPages > 1 && (
                            <Pagination
                                currentPage={interviewsPage}
                                totalPages={interviewsTotalPages}
                                totalItems={interviewsTotalItems}
                                itemsPerPage={interviewsPerPage}
                                onPageChange={handleInterviewsPageChange}
                                showInfo={true}
                                showFirstLast={true}
                            />
                        )}
                    </div>
                )}

                {activeTab === "references" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search reference..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("reference")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Reference Check
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 mb-6">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Candidate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reference
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Relationship
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Would Rehire
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {referenceChecks
                                        .filter((ref) => ref.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((ref) => (
                                            <tr key={ref.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {ref.applicant_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{ref.reference_name}</div>
                                                        <div className="text-sm text-gray-500">{ref.reference_email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ref.reference_company}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ref.relationship}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ref.status)}`}>
                                                        {ref.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex">{renderStars(ref.performance_rating)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {ref.would_rehire === true ? (
                                                        <span className="text-green-600">Yes</span>
                                                    ) : ref.would_rehire === false ? (
                                                        <span className="text-red-600">No</span>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(ref, "reference")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(ref.id, "reference")}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            {referenceChecks.length === 0 && (
                                <div className="text-center py-12">
                                    <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reference checks</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new reference check.</p>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => openModal("reference")}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                            Add Reference Check
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {referencesTotalPages > 1 && (
                            <Pagination
                                currentPage={referencesPage}
                                totalPages={referencesTotalPages}
                                totalItems={referencesTotalItems}
                                itemsPerPage={referencesPerPage}
                                onPageChange={handleReferencesPageChange}
                                showInfo={true}
                                showFirstLast={true}
                            />
                        )}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setShowModal(false)
                                            setEditingItem(null)
                                            resetForms()
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {modalType === "interview" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Application *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.application}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, application: e.target.value })}
                                                    >
                                                        <option value="">Select Application</option>
                                                        {applications?.map((app) => (
                                                            < option key={app.id} value={app.id} >
                                                                {app.applicant_name} - {app.job_title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Interviewer *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.interviewer}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, interviewer: e.target.value })}
                                                    >
                                                        <option value="">Select Interviewer</option>
                                                        {employees.map((emp) => (
                                                            <option key={emp.id} value={emp.id}>
                                                                {emp.first_name} {emp.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Interview Type</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.interview_type}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, interview_type: e.target.value })}
                                                    >
                                                        <option value="phone">Phone</option>
                                                        <option value="video">Video</option>
                                                        <option value="in_person">In Person</option>
                                                        <option value="technical">Technical</option>
                                                        <option value="behavioral">Behavioral</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Date *</label>
                                                    <input
                                                        type="datetime-local"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.scheduled_date}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, scheduled_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                                                    <input
                                                        type="number"
                                                        min="15"
                                                        max="480"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.duration_minutes}
                                                        onChange={(e) =>
                                                            setInterviewForm({ ...interviewForm, duration_minutes: Number.parseInt(e.target.value) })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.status}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, status: e.target.value })}
                                                    >
                                                        <option value="scheduled">Scheduled</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                        <option value="no_show">No Show</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.manager}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, manager: e.target.value })}
                                                    >
                                                        <option value="">Select Manager</option>
                                                        {managers.map((manager) => (
                                                            <option key={manager.id} value={manager.id}>
                                                                {manager.employee_name} {manager.employee_number}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={interviewForm.location}
                                                    onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })}
                                                    placeholder="Conference Room A, Video Call, etc."
                                                />
                                            </div>
                                            {interviewForm.status === "completed" && (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                                            <select
                                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={interviewForm.rating}
                                                                onChange={(e) => setInterviewForm({ ...interviewForm, rating: e.target.value })}
                                                            >
                                                                <option value="">Select Rating</option>
                                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                                    <option key={rating} value={rating}>
                                                                        {rating} Star{rating > 1 ? "s" : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Recommendation</label>
                                                            <select
                                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={interviewForm.recommendation}
                                                                onChange={(e) => setInterviewForm({ ...interviewForm, recommendation: e.target.value })}
                                                            >
                                                                <option value="maybe">Maybe</option>
                                                                <option value="strong_hire">Strong Hire</option>
                                                                <option value="hire">Hire</option>
                                                                <option value="no_hire">No Hire</option>
                                                                <option value="strong_no_hire">Strong No Hire</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                                        <textarea
                                                            rows={3}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={interviewForm.feedback}
                                                            onChange={(e) => setInterviewForm({ ...interviewForm, feedback: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Questions Asked</label>
                                                        <textarea
                                                            rows={2}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={interviewForm.questions_asked}
                                                            onChange={(e) => setInterviewForm({ ...interviewForm, questions_asked: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Technical Assessment</label>
                                                        <textarea
                                                            rows={2}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={interviewForm.technical_assessment}
                                                            onChange={(e) =>
                                                                setInterviewForm({ ...interviewForm, technical_assessment: e.target.value })
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={interviewForm.notes}
                                                    onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {modalType === "reference" && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Application *</label>
                                                <select
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={referenceForm.application}
                                                    onChange={(e) => setReferenceForm({ ...referenceForm, application: e.target.value })}
                                                >

                                                    <option value="">Select Application</option>
                                                    {completedTechnicalInterviews.map((interview) => (
                                                        <option key={interview.application} value={interview.application}>
                                                            {interview.applicant_name} - {interview.job_title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Reference Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.reference_name}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, reference_name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.reference_email}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, reference_email: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                                    <input
                                                        type="tel"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.reference_phone}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, reference_phone: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.reference_title}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, reference_title: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.reference_company}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, reference_company: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Relationship *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.relationship}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, relationship: e.target.value })}
                                                    >
                                                        <option value="">Select Relationship</option>
                                                        <option value="Former Manager">Former Manager</option>
                                                        <option value="Former Colleague">Former Colleague</option>
                                                        <option value="Former Subordinate">Former Subordinate</option>
                                                        <option value="Client">Client</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Contacted Date</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.contacted_date}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, contacted_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Completed Date</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.completed_date}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, completed_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.status}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, status: e.target.value })}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="no_response">No Response</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Conducted By</label>
                                                <select
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={referenceForm.conducted_by}
                                                    onChange={(e) => setReferenceForm({ ...referenceForm, conducted_by: e.target.value })}
                                                >
                                                    <option value="">Select Employee</option>
                                                    {employees.map((emp) => (
                                                        <option key={emp.id} value={emp.id}>
                                                            {emp.first_name} {emp.last_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {referenceForm.status === "completed" && (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Performance Rating (1-5)
                                                            </label>
                                                            <select
                                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={referenceForm.performance_rating}
                                                                onChange={(e) =>
                                                                    setReferenceForm({ ...referenceForm, performance_rating: e.target.value })
                                                                }
                                                            >
                                                                <option value="">Select Rating</option>
                                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                                    <option key={rating} value={rating}>
                                                                        {rating} Star{rating > 1 ? "s" : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Would Rehire?</label>
                                                            <select
                                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={referenceForm.would_rehire === null ? "" : referenceForm.would_rehire.toString()}
                                                                onChange={(e) =>
                                                                    setReferenceForm({
                                                                        ...referenceForm,
                                                                        would_rehire: e.target.value === "" ? null : e.target.value === "true",
                                                                    })
                                                                }
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="true">Yes</option>
                                                                <option value="false">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                                        <textarea
                                                            rows={3}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={referenceForm.feedback}
                                                            onChange={(e) => setReferenceForm({ ...referenceForm, feedback: e.target.value })}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false)
                                                setEditingItem(null)
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
                                            {editingItem ? "Update" : "Create"}
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
                        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Delete {deleteType === "interview" ? "Interview" : "Reference Check"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Are you sure you want to delete this {deleteType}? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false)
                                            setItemToDelete(null)
                                            setDeleteType("")
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
        </Layout >
    )
}
