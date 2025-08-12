// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/Layout"
// import { applicationService, employeeService } from "../../lib/services"

// // Icons
// const CalendarDaysIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
//         />
//     </svg>
// )

// const ClipboardDocumentCheckIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.875c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0117.25 18.75h-10.5A2.25 2.25 0 014.5 16.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.124-.08M15 12.75a3 3 0 11-6 0 3 3 0 016 0zm-3 2.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
//         />
//     </svg>
// )

// const PlusIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//     </svg>
// )

// const PencilIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//         />
//     </svg>
// )

// const CheckIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//     </svg>
// )

// const XMarkIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>
// )

// export default function Recruitment() {
//     const [activeTab, setActiveTab] = useState("interviews")
//     const [interviews, setInterviews] = useState([])
//     const [referenceChecks, setReferenceChecks] = useState([])
//     const [applications, setApplications] = useState([])
//     const [employees, setEmployees] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [showModal, setShowModal] = useState(false)
//     const [modalType, setModalType] = useState("interview")
//     const [editingItem, setEditingItem] = useState(null)
//     const [error, setError] = useState("")
//     const [submitting, setSubmitting] = useState(false)

//     // Form data states
//     const [interviewFormData, setInterviewFormData] = useState({
//         application: "",
//         interviewer: "",
//         interview_type: "phone",
//         scheduled_date: "",
//         scheduled_time: "",
//         duration_minutes: 60,
//         location: "",
//         notes: "",
//         status: "scheduled",
//     })

//     const [referenceFormData, setReferenceFormData] = useState({
//         application: "",
//         reference_name: "",
//         reference_email: "",
//         reference_phone: "",
//         relationship: "",
//         company: "",
//         position: "",
//         contacted_date: "",
//         response_received: false,
//         rating: 5,
//         comments: "",
//         status: "pending",
//     })

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             setError("")

//             const [applicationsData, employeesData] = await Promise.all([
//                 applicationService.getApplications(),
//                 employeeService.getEmployees(),
//             ])

//             setApplications(applicationsData)
//             setEmployees(employeesData)

//             // Mock data for interviews and reference checks
//             setInterviews([
//                 {
//                     id: 1,
//                     application: {
//                         id: 1,
//                         candidate_name: "John Smith",
//                         job_posting: { title: "Senior Software Engineer" },
//                     },
//                     interviewer: { first_name: "Jane", last_name: "Doe" },
//                     interview_type: "video",
//                     scheduled_date: "2025-01-25",
//                     scheduled_time: "14:00",
//                     duration_minutes: 60,
//                     location: "Zoom Meeting",
//                     status: "scheduled",
//                     notes: "Technical interview focusing on React and Node.js",
//                 },
//                 {
//                     id: 2,
//                     application: {
//                         id: 2,
//                         candidate_name: "Sarah Johnson",
//                         job_posting: { title: "Marketing Manager" },
//                     },
//                     interviewer: { first_name: "Mike", last_name: "Wilson" },
//                     interview_type: "in_person",
//                     scheduled_date: "2025-01-24",
//                     scheduled_time: "10:30",
//                     duration_minutes: 45,
//                     location: "Conference Room A",
//                     status: "completed",
//                     notes: "Great cultural fit, strong marketing background",
//                 },
//             ])

//             setReferenceChecks([
//                 {
//                     id: 1,
//                     application: {
//                         id: 1,
//                         candidate_name: "John Smith",
//                         job_posting: { title: "Senior Software Engineer" },
//                     },
//                     reference_name: "Alice Brown",
//                     reference_email: "alice.brown@techcorp.com",
//                     reference_phone: "+1-555-0123",
//                     relationship: "Former Manager",
//                     company: "TechCorp Inc.",
//                     position: "Engineering Manager",
//                     contacted_date: "2025-01-20",
//                     response_received: true,
//                     rating: 5,
//                     comments: "Excellent developer, strong problem-solving skills",
//                     status: "completed",
//                 },
//                 {
//                     id: 2,
//                     application: {
//                         id: 2,
//                         candidate_name: "Sarah Johnson",
//                         job_posting: { title: "Marketing Manager" },
//                     },
//                     reference_name: "Bob Davis",
//                     reference_email: "bob.davis@marketpro.com",
//                     reference_phone: "+1-555-0456",
//                     relationship: "Former Colleague",
//                     company: "MarketPro Solutions",
//                     position: "Senior Marketing Specialist",
//                     contacted_date: "2025-01-22",
//                     response_received: false,
//                     rating: 0,
//                     comments: "",
//                     status: "pending",
//                 },
//             ])
//         } catch (error) {
//             console.error("Failed to fetch recruitment data:", error)
//             setError("Failed to load recruitment data. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleCreateInterview = () => {
//         setModalType("interview")
//         setEditingItem(null)
//         setInterviewFormData({
//             application: "",
//             interviewer: "",
//             interview_type: "phone",
//             scheduled_date: "",
//             scheduled_time: "",
//             duration_minutes: 60,
//             location: "",
//             notes: "",
//             status: "scheduled",
//         })
//         setShowModal(true)
//     }

//     const handleCreateReferenceCheck = () => {
//         setModalType("reference")
//         setEditingItem(null)
//         setReferenceFormData({
//             application: "",
//             reference_name: "",
//             reference_email: "",
//             reference_phone: "",
//             relationship: "",
//             company: "",
//             position: "",
//             contacted_date: "",
//             response_received: false,
//             rating: 5,
//             comments: "",
//             status: "pending",
//         })
//         setShowModal(true)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setSubmitting(true)
//         setError("")

//         try {
//             // Here you would call the actual API endpoints
//             // For now, we'll just simulate the API call
//             await new Promise((resolve) => setTimeout(resolve, 1000))

//             if (modalType === "interview") {
//                 if (editingItem) {
//                     // Update interview
//                     const updatedInterviews = interviews.map((interview) =>
//                         interview.id === editingItem.id ? { ...interview, ...interviewFormData } : interview,
//                     )
//                     setInterviews(updatedInterviews)
//                 } else {
//                     // Create new interview
//                     const newInterview = {
//                         id: Date.now(),
//                         ...interviewFormData,
//                         application: applications.find((app) => app.id === Number.parseInt(interviewFormData.application)),
//                         interviewer: employees.find((emp) => emp.id === Number.parseInt(interviewFormData.interviewer)),
//                     }
//                     setInterviews([...interviews, newInterview])
//                 }
//             } else if (modalType === "reference") {
//                 if (editingItem) {
//                     // Update reference check
//                     const updatedReferences = referenceChecks.map((ref) =>
//                         ref.id === editingItem.id ? { ...ref, ...referenceFormData } : ref,
//                     )
//                     setReferenceChecks(updatedReferences)
//                 } else {
//                     // Create new reference check
//                     const newReference = {
//                         id: Date.now(),
//                         ...referenceFormData,
//                         application: applications.find((app) => app.id === Number.parseInt(referenceFormData.application)),
//                     }
//                     setReferenceChecks([...referenceChecks, newReference])
//                 }
//             }

//             setShowModal(false)
//             setEditingItem(null)
//         } catch (error) {
//             console.error("Failed to save:", error)
//             setError("Failed to save. Please try again.")
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A"
//         return new Date(dateString).toLocaleDateString()
//     }

//     const formatDateTime = (date, time) => {
//         if (!date || !time) return "N/A"
//         return `${formatDate(date)} at ${time}`
//     }

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "scheduled":
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800"
//             case "completed":
//                 return "bg-green-100 text-green-800"
//             case "cancelled":
//                 return "bg-red-100 text-red-800"
//             default:
//                 return "bg-gray-100 text-gray-800"
//         }
//     }

//     const renderStars = (rating) => {
//         return Array.from({ length: 5 }, (_, i) => (
//             <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
//                 ★
//             </span>
//         ))
//     }

//     if (loading) {
//         return (
//             <Layout>
//                 <div className="p-6">
//                     <div className="animate-pulse">
//                         <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//                         <div className="space-y-4">
//                             {[...Array(3)].map((_, i) => (
//                                 <div key={i} className="h-32 bg-gray-200 rounded"></div>
//                             ))}
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
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Management</h1>
//                     <p className="text-gray-600">Manage interviews and reference checks for candidates</p>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
//                         <div className="text-sm text-red-700">{error}</div>
//                     </div>
//                 )}

//                 {/* Tabs */}
//                 <div className="border-b border-gray-200 mb-6">
//                     <nav className="-mb-px flex space-x-8">
//                         <button
//                             onClick={() => setActiveTab("interviews")}
//                             className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "interviews"
//                                 ? "border-indigo-500 text-indigo-600"
//                                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                 }`}
//                         >
//                             Interviews
//                         </button>
//                         <button
//                             onClick={() => setActiveTab("references")}
//                             className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "references"
//                                 ? "border-indigo-500 text-indigo-600"
//                                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                 }`}
//                         >
//                             Reference Checks
//                         </button>
//                     </nav>
//                 </div>

//                 {/* Tab Content Header */}
//                 <div className="flex items-center justify-between mb-6">
//                     <h2 className="text-xl font-semibold text-gray-900">
//                         {activeTab === "interviews" && "Interview Schedule"}
//                         {activeTab === "references" && "Reference Checks"}
//                     </h2>
//                     <button
//                         onClick={() => {
//                             if (activeTab === "interviews") handleCreateInterview()
//                             else if (activeTab === "references") handleCreateReferenceCheck()
//                         }}
//                         className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                         <PlusIcon className="h-5 w-5 mr-2" />
//                         {activeTab === "interviews" && "Schedule Interview"}
//                         {activeTab === "references" && "Add Reference Check"}
//                     </button>
//                 </div>

//                 {/* Interviews Tab */}
//                 {activeTab === "interviews" && (
//                     <div className="space-y-4">
//                         {interviews.length === 0 ? (
//                             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                 <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                 <div className="text-gray-500 mb-4">No interviews scheduled</div>
//                                 <button
//                                     onClick={handleCreateInterview}
//                                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     <PlusIcon className="h-5 w-5 mr-2" />
//                                     Schedule First Interview
//                                 </button>
//                             </div>
//                         ) : (
//                             interviews.map((interview) => (
//                                 <div
//                                     key={interview.id}
//                                     className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                 >
//                                     <div className="flex justify-between items-start mb-4">
//                                         <div className="flex-1">
//                                             <div className="flex items-center gap-3 mb-2">
//                                                 <h3 className="text-lg font-semibold text-gray-900">
//                                                     {interview.application?.candidate_name} - {interview.application?.job_posting?.title}
//                                                 </h3>
//                                                 <span
//                                                     className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}
//                                                 >
//                                                     {interview.status}
//                                                 </span>
//                                                 <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                                                     {interview.interview_type}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                                                 <div>
//                                                     Interviewer: {interview.interviewer?.first_name} {interview.interviewer?.last_name}
//                                                 </div>
//                                                 <div>Date: {formatDateTime(interview.scheduled_date, interview.scheduled_time)}</div>
//                                                 <div>Duration: {interview.duration_minutes} min</div>
//                                             </div>
//                                             <div className="text-sm text-gray-600 mb-2">Location: {interview.location || "N/A"}</div>
//                                             <p className="text-gray-700 text-sm">{interview.notes}</p>
//                                         </div>
//                                         <div className="flex items-center gap-2 ml-4">
//                                             <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                 <PencilIcon className="h-4 w-4 mr-1" />
//                                                 Edit
//                                             </button>
//                                             {interview.status === "scheduled" && (
//                                                 <>
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
//                                                         <CheckIcon className="h-4 w-4 mr-1" />
//                                                         Complete
//                                                     </button>
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
//                                                         <XMarkIcon className="h-4 w-4 mr-1" />
//                                                         Cancel
//                                                     </button>
//                                                 </>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 {/* Reference Checks Tab */}
//                 {activeTab === "references" && (
//                     <div className="space-y-4">
//                         {referenceChecks.length === 0 ? (
//                             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                 <ClipboardDocumentCheckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                 <div className="text-gray-500 mb-4">No reference checks found</div>
//                                 <button
//                                     onClick={handleCreateReferenceCheck}
//                                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     <PlusIcon className="h-5 w-5 mr-2" />
//                                     Add First Reference Check
//                                 </button>
//                             </div>
//                         ) : (
//                             referenceChecks.map((reference) => (
//                                 <div
//                                     key={reference.id}
//                                     className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                 >
//                                     <div className="flex justify-between items-start mb-4">
//                                         <div className="flex-1">
//                                             <div className="flex items-center gap-3 mb-2">
//                                                 <h3 className="text-lg font-semibold text-gray-900">
//                                                     {reference.application?.candidate_name} - {reference.application?.job_posting?.title}
//                                                 </h3>
//                                                 <span
//                                                     className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reference.status)}`}
//                                                 >
//                                                     {reference.status}
//                                                 </span>
//                                             </div>
//                                             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
//                                                 <div>
//                                                     <div className="font-medium">Reference: {reference.reference_name}</div>
//                                                     <div>
//                                                         {reference.relationship} at {reference.company}
//                                                     </div>
//                                                     <div>{reference.position}</div>
//                                                 </div>
//                                                 <div>
//                                                     <div>Email: {reference.reference_email}</div>
//                                                     <div>Phone: {reference.reference_phone}</div>
//                                                     <div>Contacted: {formatDate(reference.contacted_date)}</div>
//                                                 </div>
//                                             </div>
//                                             {reference.response_received && (
//                                                 <div className="mb-3">
//                                                     <div className="flex items-center gap-2 mb-2">
//                                                         <span className="text-sm font-medium text-gray-700">Rating:</span>
//                                                         <div className="flex">{renderStars(reference.rating)}</div>
//                                                         <span className="text-sm text-gray-600">({reference.rating}/5)</span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm">{reference.comments}</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="flex items-center gap-2 ml-4">
//                                             <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                 <PencilIcon className="h-4 w-4 mr-1" />
//                                                 Edit
//                                             </button>
//                                             {!reference.response_received && (
//                                                 <button className="inline-flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
//                                                     <CheckIcon className="h-4 w-4 mr-1" />
//                                                     Mark Complete
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 {/* Modal for Creating/Editing */}
//                 {showModal && (
//                     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//                         <div className="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
//                             <div className="mb-4">
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                     {editingItem ? "Edit" : "Create"} {modalType === "interview" ? "Interview" : "Reference Check"}
//                                 </h3>
//                             </div>

//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 {/* Interview Form */}
//                                 {modalType === "interview" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Application *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.application}
//                                                     onChange={(e) => setInterviewFormData({ ...interviewFormData, application: e.target.value })}
//                                                 >
//                                                     <option value="">Select Application</option>
//                                                     {applications.map((app) => (
//                                                         <option key={app.id} value={app.id}>
//                                                             {app.candidate_name} - {app.job_posting?.title}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.interviewer}
//                                                     onChange={(e) => setInterviewFormData({ ...interviewFormData, interviewer: e.target.value })}
//                                                 >
//                                                     <option value="">Select Interviewer</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.interview_type}
//                                                     onChange={(e) =>
//                                                         setInterviewFormData({ ...interviewFormData, interview_type: e.target.value })
//                                                     }
//                                                 >
//                                                     <option value="phone">Phone</option>
//                                                     <option value="video">Video Call</option>
//                                                     <option value="in_person">In Person</option>
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
//                                                 <input
//                                                     type="date"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.scheduled_date}
//                                                     onChange={(e) =>
//                                                         setInterviewFormData({ ...interviewFormData, scheduled_date: e.target.value })
//                                                     }
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
//                                                 <input
//                                                     type="time"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.scheduled_time}
//                                                     onChange={(e) =>
//                                                         setInterviewFormData({ ...interviewFormData, scheduled_time: e.target.value })
//                                                     }
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
//                                                 <input
//                                                     type="number"
//                                                     min="15"
//                                                     max="240"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.duration_minutes}
//                                                     onChange={(e) =>
//                                                         setInterviewFormData({
//                                                             ...interviewFormData,
//                                                             duration_minutes: Number.parseInt(e.target.value),
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                                                 <input
//                                                     type="text"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={interviewFormData.location}
//                                                     onChange={(e) => setInterviewFormData({ ...interviewFormData, location: e.target.value })}
//                                                     placeholder="Conference Room A, Zoom link, etc."
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
//                                             <textarea
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={interviewFormData.notes}
//                                                 onChange={(e) => setInterviewFormData({ ...interviewFormData, notes: e.target.value })}
//                                                 placeholder="Interview agenda, focus areas, etc."
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {/* Reference Check Form */}
//                                 {modalType === "reference" && (
//                                     <>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Application *</label>
//                                             <select
//                                                 required
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={referenceFormData.application}
//                                                 onChange={(e) => setReferenceFormData({ ...referenceFormData, application: e.target.value })}
//                                             >
//                                                 <option value="">Select Application</option>
//                                                 {applications.map((app) => (
//                                                     <option key={app.id} value={app.id}>
//                                                         {app.candidate_name} - {app.job_posting?.title}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Reference Name *</label>
//                                                 <input
//                                                     type="text"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.reference_name}
//                                                     onChange={(e) =>
//                                                         setReferenceFormData({ ...referenceFormData, reference_name: e.target.value })
//                                                     }
//                                                     placeholder="John Doe"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.relationship}
//                                                     onChange={(e) => setReferenceFormData({ ...referenceFormData, relationship: e.target.value })}
//                                                 >
//                                                     <option value="">Select Relationship</option>
//                                                     <option value="Former Manager">Former Manager</option>
//                                                     <option value="Former Colleague">Former Colleague</option>
//                                                     <option value="Direct Report">Direct Report</option>
//                                                     <option value="Client">Client</option>
//                                                     <option value="Other">Other</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                                                 <input
//                                                     type="email"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.reference_email}
//                                                     onChange={(e) =>
//                                                         setReferenceFormData({ ...referenceFormData, reference_email: e.target.value })
//                                                     }
//                                                     placeholder="john.doe@company.com"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                                                 <input
//                                                     type="tel"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.reference_phone}
//                                                     onChange={(e) =>
//                                                         setReferenceFormData({ ...referenceFormData, reference_phone: e.target.value })
//                                                     }
//                                                     placeholder="+1-555-0123"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//                                                 <input
//                                                     type="text"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.company}
//                                                     onChange={(e) => setReferenceFormData({ ...referenceFormData, company: e.target.value })}
//                                                     placeholder="Company Name"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
//                                                 <input
//                                                     type="text"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.position}
//                                                     onChange={(e) => setReferenceFormData({ ...referenceFormData, position: e.target.value })}
//                                                     placeholder="Job Title"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Contacted Date</label>
//                                                 <input
//                                                     type="date"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.contacted_date}
//                                                     onChange={(e) =>
//                                                         setReferenceFormData({ ...referenceFormData, contacted_date: e.target.value })
//                                                     }
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Rating (if received)</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={referenceFormData.rating}
//                                                     onChange={(e) =>
//                                                         setReferenceFormData({ ...referenceFormData, rating: Number.parseInt(e.target.value) })
//                                                     }
//                                                 >
//                                                     <option value={1}>1 - Poor</option>
//                                                     <option value={2}>2 - Below Average</option>
//                                                     <option value={3}>3 - Average</option>
//                                                     <option value={4}>4 - Good</option>
//                                                     <option value={5}>5 - Excellent</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
//                                             <textarea
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={referenceFormData.comments}
//                                                 onChange={(e) => setReferenceFormData({ ...referenceFormData, comments: e.target.value })}
//                                                 placeholder="Reference feedback and comments..."
//                                             />
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 id="response_received"
//                                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={referenceFormData.response_received}
//                                                 onChange={(e) =>
//                                                     setReferenceFormData({ ...referenceFormData, response_received: e.target.checked })
//                                                 }
//                                             />
//                                             <label htmlFor="response_received" className="ml-2 block text-sm text-gray-900">
//                                                 Response received from reference
//                                             </label>
//                                         </div>
//                                     </>
//                                 )}

//                                 <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setShowModal(false)
//                                             setEditingItem(null)
//                                         }}
//                                         className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                                         disabled={submitting}
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//                                         disabled={submitting}
//                                     >
//                                         {submitting ? "Saving..." : editingItem ? "Update" : "Create"}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     )
// }


"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { applicationService, jobPostingService, employeeService } from "../../lib/services"
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    UserGroupIcon,
    CalendarIcon,
    PhoneIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline"

export default function Recruitment() {
    const [activeTab, setActiveTab] = useState("overview")
    const [interviews, setInterviews] = useState([])
    const [referenceChecks, setReferenceChecks] = useState([])
    const [applications, setApplications] = useState([])
    const [jobPostings, setJobPostings] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState("interview") // interview, reference
    const [editingItem, setEditingItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    // Form states
    const [interviewForm, setInterviewForm] = useState({
        application: "",
        interviewer: "",
        interview_type: "phone",
        scheduled_date: "",
        scheduled_time: "",
        duration: 60,
        location: "",
        notes: "",
        status: "scheduled",
        rating: "",
        feedback: "",
    })

    const [referenceForm, setReferenceForm] = useState({
        application: "",
        reference_name: "",
        reference_email: "",
        reference_phone: "",
        relationship: "",
        company: "",
        position: "",
        contacted_date: "",
        response_date: "",
        status: "pending",
        rating: "",
        comments: "",
        would_rehire: null,
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [applicationsData, jobPostingsData, employeesData] = await Promise.all([
                applicationService.getApplications(),
                jobPostingService.getJobPostings(),
                employeeService.getEmployees(1, 100),
            ])

            setApplications(applicationsData)
            setJobPostings(jobPostingsData)
            setEmployees(employeesData.results || employeesData)

            // Mock data for interviews and reference checks
            setInterviews([
                {
                    id: 1,
                    application: { id: 1, candidate_name: "John Smith", job_posting: { title: "Senior Software Engineer" } },
                    interviewer: { first_name: "Sarah", last_name: "Johnson" },
                    interview_type: "technical",
                    scheduled_date: "2025-01-25",
                    scheduled_time: "14:00",
                    duration: 90,
                    location: "Conference Room A",
                    status: "scheduled",
                    rating: null,
                    feedback: "",
                },
                {
                    id: 2,
                    application: { id: 2, candidate_name: "Emily Chen", job_posting: { title: "Marketing Manager" } },
                    interviewer: { first_name: "Mike", last_name: "Davis" },
                    interview_type: "behavioral",
                    scheduled_date: "2025-01-24",
                    scheduled_time: "10:30",
                    duration: 60,
                    location: "Video Call",
                    status: "completed",
                    rating: 4,
                    feedback: "Strong communication skills, good cultural fit",
                },
            ])

            setReferenceChecks([
                {
                    id: 1,
                    application: { id: 1, candidate_name: "John Smith", job_posting: { title: "Senior Software Engineer" } },
                    reference_name: "David Wilson",
                    reference_email: "david.wilson@techcorp.com",
                    reference_phone: "+1-555-0123",
                    relationship: "Former Manager",
                    company: "TechCorp Inc.",
                    position: "Engineering Director",
                    contacted_date: "2025-01-20",
                    response_date: "2025-01-22",
                    status: "completed",
                    rating: 5,
                    comments: "Excellent developer, highly recommended",
                    would_rehire: true,
                },
                {
                    id: 2,
                    application: { id: 2, candidate_name: "Emily Chen", job_posting: { title: "Marketing Manager" } },
                    reference_name: "Lisa Brown",
                    reference_email: "lisa.brown@marketpro.com",
                    reference_phone: "+1-555-0456",
                    relationship: "Former Colleague",
                    company: "MarketPro Solutions",
                    position: "Senior Marketing Specialist",
                    contacted_date: "2025-01-21",
                    response_date: null,
                    status: "pending",
                    rating: null,
                    comments: "",
                    would_rehire: null,
                },
            ])
        } catch (error) {
            console.error("Failed to fetch recruitment data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Mock API calls - replace with actual service calls
            if (modalType === "interview") {
                if (editingItem) {
                    // Update interview
                    const updatedInterviews = interviews.map((interview) =>
                        interview.id === editingItem.id ? { ...interview, ...interviewForm } : interview,
                    )
                    setInterviews(updatedInterviews)
                } else {
                    // Create interview
                    const newInterview = {
                        id: Date.now(),
                        ...interviewForm,
                        application: applications.find((app) => app.id === Number.parseInt(interviewForm.application)),
                        interviewer: employees.find((emp) => emp.id === Number.parseInt(interviewForm.interviewer)),
                    }
                    setInterviews([...interviews, newInterview])
                }
            } else if (modalType === "reference") {
                if (editingItem) {
                    // Update reference check
                    const updatedReferences = referenceChecks.map((ref) =>
                        ref.id === editingItem.id ? { ...ref, ...referenceForm } : ref,
                    )
                    setReferenceChecks(updatedReferences)
                } else {
                    // Create reference check
                    const newReference = {
                        id: Date.now(),
                        ...referenceForm,
                        application: applications.find((app) => app.id === Number.parseInt(referenceForm.application)),
                    }
                    setReferenceChecks([...referenceChecks, newReference])
                }
            }

            setShowModal(false)
            setEditingItem(null)
            resetForms()
        } catch (error) {
            console.error("Failed to save item:", error)
            alert("Failed to save. Please try again.")
        }
    }

    const resetForms = () => {
        setInterviewForm({
            application: "",
            interviewer: "",
            interview_type: "phone",
            scheduled_date: "",
            scheduled_time: "",
            duration: 60,
            location: "",
            notes: "",
            status: "scheduled",
            rating: "",
            feedback: "",
        })
        setReferenceForm({
            application: "",
            reference_name: "",
            reference_email: "",
            reference_phone: "",
            relationship: "",
            company: "",
            position: "",
            contacted_date: "",
            response_date: "",
            status: "pending",
            rating: "",
            comments: "",
            would_rehire: null,
        })
    }

    const handleEdit = (item, type) => {
        setEditingItem(item)
        setModalType(type)

        if (type === "interview") {
            setInterviewForm({
                application: item.application?.id?.toString() || "",
                interviewer: item.interviewer?.id?.toString() || "",
                interview_type: item.interview_type || "phone",
                scheduled_date: item.scheduled_date || "",
                scheduled_time: item.scheduled_time || "",
                duration: item.duration || 60,
                location: item.location || "",
                notes: item.notes || "",
                status: item.status || "scheduled",
                rating: item.rating?.toString() || "",
                feedback: item.feedback || "",
            })
        } else if (type === "reference") {
            setReferenceForm({
                application: item.application?.id?.toString() || "",
                reference_name: item.reference_name || "",
                reference_email: item.reference_email || "",
                reference_phone: item.reference_phone || "",
                relationship: item.relationship || "",
                company: item.company || "",
                position: item.position || "",
                contacted_date: item.contacted_date || "",
                response_date: item.response_date || "",
                status: item.status || "pending",
                rating: item.rating?.toString() || "",
                comments: item.comments || "",
                would_rehire: item.would_rehire,
            })
        }
        setShowModal(true)
    }

    const handleDelete = async (id, type) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                if (type === "interview") {
                    setInterviews(interviews.filter((interview) => interview.id !== id))
                } else if (type === "reference") {
                    setReferenceChecks(referenceChecks.filter((ref) => ref.id !== id))
                }
            } catch (error) {
                console.error("Failed to delete item:", error)
            }
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
                                        <dd className="text-lg font-medium text-gray-900">{interviews.length}</dd>
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
                                        <dd className="text-lg font-medium text-gray-900">{referenceChecks.length}</dd>
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
                                                    <p className="text-sm font-medium text-gray-900">{interview.application?.candidate_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {interview.application?.job_posting?.title} • {interview.scheduled_date} at{" "}
                                                        {interview.scheduled_time}
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
                                                    <p className="text-sm font-medium text-gray-900">{ref.application?.candidate_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {ref.reference_name} • {ref.company}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">
                                                        Contacted: {ref.contacted_date ? new Date(ref.contacted_date).toLocaleDateString() : "N/A"}
                                                    </span>
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

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                                        .filter((interview) =>
                                            interview.application?.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()),
                                        )
                                        .map((interview) => (
                                            <tr key={interview.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {interview.application?.candidate_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {interview.application?.job_posting?.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${getInterviewTypeColor(interview.interview_type)}`}
                                                    >
                                                        {interview.interview_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {interview.scheduled_date} {interview.scheduled_time}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {interview.interviewer?.first_name} {interview.interviewer?.last_name}
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
                                                    <button
                                                        onClick={() => handleEdit(interview, "interview")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(interview.id, "interview")}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
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
                                    placeholder="Search reference checks..."
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
                            <table className="min-w-full divide-y divide-gray-200">
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
                                        .filter((ref) => ref.application?.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((ref) => (
                                            <tr key={ref.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {ref.application?.candidate_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{ref.reference_name}</div>
                                                        <div className="text-sm text-gray-500">{ref.reference_email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ref.company}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ref.relationship}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ref.status)}`}>
                                                        {ref.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex">{renderStars(ref.rating)}</div>
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
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}
                                </h3>
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
                                                        {applications.map((app) => (
                                                            <option key={app.id} value={app.id}>
                                                                {app.candidate_name} - {app.job_posting?.title}
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
                                                        type="date"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.scheduled_date}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, scheduled_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Time *</label>
                                                    <input
                                                        type="time"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.scheduled_time}
                                                        onChange={(e) => setInterviewForm({ ...interviewForm, scheduled_time: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                                                    <input
                                                        type="number"
                                                        min="15"
                                                        max="240"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={interviewForm.duration}
                                                        onChange={(e) =>
                                                            setInterviewForm({ ...interviewForm, duration: Number.parseInt(e.target.value) })
                                                        }
                                                    />
                                                </div>
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
                                                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                                        <textarea
                                                            rows={3}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={interviewForm.feedback}
                                                            onChange={(e) => setInterviewForm({ ...interviewForm, feedback: e.target.value })}
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
                                                    {applications.map((app) => (
                                                        <option key={app.id} value={app.id}>
                                                            {app.candidate_name} - {app.job_posting?.title}
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.company}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, company: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                                    <input
                                                        type="text"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.position}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, position: e.target.value })}
                                                    />
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
                                                    <label className="block text-sm font-medium text-gray-700">Response Date</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={referenceForm.response_date}
                                                        onChange={(e) => setReferenceForm({ ...referenceForm, response_date: e.target.value })}
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
                                            {referenceForm.status === "completed" && (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                                                            <select
                                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={referenceForm.rating}
                                                                onChange={(e) => setReferenceForm({ ...referenceForm, rating: e.target.value })}
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
                                                        <label className="block text-sm font-medium text-gray-700">Comments</label>
                                                        <textarea
                                                            rows={3}
                                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={referenceForm.comments}
                                                            onChange={(e) => setReferenceForm({ ...referenceForm, comments: e.target.value })}
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
            </div>
        </Layout>
    )
}
