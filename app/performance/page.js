// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/Layout"
// import { performanceService, employeeService, managerService } from "../../lib/services"

// // Icons
// const ChartBarIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
//         />
//     </svg>
// )

// const TrophyIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228V2.721m-2.087 0a9.031 9.031 0 00-2.393.393m-2.393-.393a9.031 9.031 0 012.393.393m0 0V4.5c0 .108-.11.19-.266.23m0-.23v2.97m0 0c.165-.11.266-.22.266-.23M8.272 10.464c-.165-.11-.266-.22-.266-.23m0 .23v2.97m0-2.97c.165.11.266.22.266.23m-.266-.23a9.031 9.031 0 012.393.393m-2.393-.393c.165.11.266.22.266.23"
//         />
//     </svg>
// )

// const StarIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
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

// const TrashIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//         />
//     </svg>
// )

// const EyeIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//         />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
// )

// const ChatBubbleLeftRightIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
//         />
//     </svg>
// )

// export default function Performance() {
//     const [activeTab, setActiveTab] = useState("goals")
//     const [goals, setGoals] = useState([])
//     const [reviews, setReviews] = useState([])
//     const [feedback, setFeedback] = useState([])
//     const [employees, setEmployees] = useState([])
//     const [managers, setManagers] = useState([])
//     const [statistics, setStatistics] = useState({
//         totalGoals: 0,
//         activeGoals: 0,
//         completedGoals: 0,
//         totalReviews: 0,
//         pendingReviews: 0,
//         totalFeedback: 0,
//         avgRating: 0,
//     })
//     const [loading, setLoading] = useState(true)
//     const [showModal, setShowModal] = useState(false)
//     const [modalType, setModalType] = useState("goal") // goal, review, feedback
//     const [editingItem, setEditingItem] = useState(null)
//     const [error, setError] = useState("")
//     const [submitting, setSubmitting] = useState(false)

//     // Form data states
//     const [goalFormData, setGoalFormData] = useState({
//         employee: "",
//         title: "",
//         description: "",
//         target_date: "",
//         priority: "medium",
//         status: "active",
//         progress: 0,
//         category: "",
//     })

//     const [reviewFormData, setReviewFormData] = useState({
//         employee: "",
//         reviewer: "",
//         review_period_start: "",
//         review_period_end: "",
//         overall_rating: 5,
//         goals_achievement: 5,
//         communication_skills: 5,
//         teamwork: 5,
//         leadership: 5,
//         technical_skills: 5,
//         comments: "",
//         status: "draft",
//     })

//     const [feedbackFormData, setFeedbackFormData] = useState({
//         employee: "",
//         feedback_giver: "",
//         feedback_type: "peer",
//         rating: 5,
//         comments: "",
//         strengths: "",
//         areas_for_improvement: "",
//         is_anonymous: false,
//     })

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             setError("")

//             const [goalsData, reviewsData, feedbackData, employeesData, managersData, statisticsData] = await Promise.all([
//                 performanceService.getGoals(),
//                 performanceService.getPerformanceReviews(),
//                 performanceService.getFeedback(),
//                 employeeService.getEmployees(),
//                 managerService.getManagers(),
//                 performanceService.getPerformanceStatistics(),
//             ])

//             setGoals(goalsData)
//             setReviews(reviewsData)
//             setFeedback(feedbackData)
//             setEmployees(employeesData)
//             setManagers(managersData)
//             setStatistics(statisticsData)
//         } catch (error) {
//             console.error("Failed to fetch performance data:", error)
//             setError("Failed to load performance data. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleCreateGoal = () => {
//         setModalType("goal")
//         setEditingItem(null)
//         setGoalFormData({
//             employee: "",
//             title: "",
//             description: "",
//             target_date: "",
//             priority: "medium",
//             status: "active",
//             progress: 0,
//             category: "",
//         })
//         setShowModal(true)
//     }

//     const handleCreateReview = () => {
//         setModalType("review")
//         setEditingItem(null)
//         setReviewFormData({
//             employee: "",
//             reviewer: "",
//             review_period_start: "",
//             review_period_end: "",
//             overall_rating: 5,
//             goals_achievement: 5,
//             communication_skills: 5,
//             teamwork: 5,
//             leadership: 5,
//             technical_skills: 5,
//             comments: "",
//             status: "draft",
//         })
//         setShowModal(true)
//     }

//     const handleCreateFeedback = () => {
//         setModalType("feedback")
//         setEditingItem(null)
//         setFeedbackFormData({
//             employee: "",
//             feedback_giver: "",
//             feedback_type: "peer",
//             rating: 5,
//             comments: "",
//             strengths: "",
//             areas_for_improvement: "",
//             is_anonymous: false,
//         })
//         setShowModal(true)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setSubmitting(true)
//         setError("")

//         try {
//             if (modalType === "goal") {
//                 if (editingItem) {
//                     await performanceService.updateGoal(editingItem.id, goalFormData)
//                 } else {
//                     await performanceService.createGoal(goalFormData)
//                 }
//             } else if (modalType === "review") {
//                 if (editingItem) {
//                     await performanceService.updatePerformanceReview(editingItem.id, reviewFormData)
//                 } else {
//                     await performanceService.createPerformanceReview(reviewFormData)
//                 }
//             } else if (modalType === "feedback") {
//                 if (editingItem) {
//                     await performanceService.updateFeedback(editingItem.id, feedbackFormData)
//                 } else {
//                     await performanceService.createFeedback(feedbackFormData)
//                 }
//             }

//             setShowModal(false)
//             setEditingItem(null)
//             await fetchData()
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

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "active":
//             case "completed":
//                 return "bg-green-100 text-green-800"
//             case "pending":
//             case "draft":
//                 return "bg-yellow-100 text-yellow-800"
//             case "overdue":
//                 return "bg-red-100 text-red-800"
//             default:
//                 return "bg-gray-100 text-gray-800"
//         }
//     }

//     const getPriorityColor = (priority) => {
//         switch (priority) {
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

//     const renderStars = (rating) => {
//         return Array.from({ length: 5 }, (_, i) => (
//             <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
//         ))
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
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Management</h1>
//                     <p className="text-gray-600">Track goals, conduct reviews, and manage employee feedback</p>
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
//                                     onClick={() => setActiveTab("goals")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "goals"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Goals
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("reviews")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "reviews"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Performance Reviews
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("feedback")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "feedback"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Feedback
//                                 </button>
//                             </nav>
//                         </div>

//                         {/* Tab Content Header */}
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-semibold text-gray-900">
//                                 {activeTab === "goals" && "Employee Goals"}
//                                 {activeTab === "reviews" && "Performance Reviews"}
//                                 {activeTab === "feedback" && "Employee Feedback"}
//                             </h2>
//                             <button
//                                 onClick={() => {
//                                     if (activeTab === "goals") handleCreateGoal()
//                                     else if (activeTab === "reviews") handleCreateReview()
//                                     else if (activeTab === "feedback") handleCreateFeedback()
//                                 }}
//                                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 <PlusIcon className="h-5 w-5 mr-2" />
//                                 {activeTab === "goals" && "Create Goal"}
//                                 {activeTab === "reviews" && "Create Review"}
//                                 {activeTab === "feedback" && "Add Feedback"}
//                             </button>
//                         </div>

//                         {/* Goals Tab */}
//                         {activeTab === "goals" && (
//                             <div className="space-y-4">
//                                 {goals.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <TrophyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No goals found</div>
//                                         <button
//                                             onClick={handleCreateGoal}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Create First Goal
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     goals.map((goal) => (
//                                         <div
//                                             key={goal.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(goal.status)}`}
//                                                         >
//                                                             {goal.status}
//                                                         </span>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(goal.priority)}`}
//                                                         >
//                                                             {goal.priority} priority
//                                                         </span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-3">{goal.description}</p>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                         <div>
//                                                             Employee: {goal.employee?.first_name} {goal.employee?.last_name}
//                                                         </div>
//                                                         <div>Target: {formatDate(goal.target_date)}</div>
//                                                         <div>Progress: {goal.progress}%</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                         <PencilIcon className="h-4 w-4 mr-1" />
//                                                         Edit
//                                                     </button>
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-900">
//                                                         <TrashIcon className="h-4 w-4 mr-1" />
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             {/* Progress Bar */}
//                                             <div className="w-full bg-gray-200 rounded-full h-2">
//                                                 <div
//                                                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                                                     style={{ width: `${goal.progress}%` }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}

//                         {/* Reviews Tab */}
//                         {activeTab === "reviews" && (
//                             <div className="space-y-4">
//                                 {reviews.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No performance reviews found</div>
//                                         <button
//                                             onClick={handleCreateReview}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Create First Review
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     reviews.map((review) => (
//                                         <div
//                                             key={review.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">
//                                                             {review.employee?.first_name} {review.employee?.last_name} - Performance Review
//                                                         </h3>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}
//                                                         >
//                                                             {review.status}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                                                         <div>
//                                                             Reviewer: {review.reviewer?.first_name} {review.reviewer?.last_name}
//                                                         </div>
//                                                         <div>
//                                                             Period: {formatDate(review.review_period_start)} - {formatDate(review.review_period_end)}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex items-center gap-2 mb-3">
//                                                         <span className="text-sm text-gray-600">Overall Rating:</span>
//                                                         <div className="flex">{renderStars(review.overall_rating)}</div>
//                                                         <span className="text-sm font-medium">{review.overall_rating}/5</span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm">{review.comments}</p>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                         <EyeIcon className="h-4 w-4 mr-1" />
//                                                         View
//                                                     </button>
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                         <PencilIcon className="h-4 w-4 mr-1" />
//                                                         Edit
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}

//                         {/* Feedback Tab */}
//                         {activeTab === "feedback" && (
//                             <div className="space-y-4">
//                                 {feedback.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No feedback found</div>
//                                         <button
//                                             onClick={handleCreateFeedback}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Add First Feedback
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     feedback.map((item) => (
//                                         <div
//                                             key={item.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">
//                                                             Feedback for {item.employee?.first_name} {item.employee?.last_name}
//                                                         </h3>
//                                                         <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                                                             {item.feedback_type}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
//                                                         <div>
//                                                             From:{" "}
//                                                             {item.is_anonymous
//                                                                 ? "Anonymous"
//                                                                 : `${item.feedback_giver?.first_name} ${item.feedback_giver?.last_name}`}
//                                                         </div>
//                                                         <div className="flex items-center gap-1">
//                                                             <span>Rating:</span>
//                                                             <div className="flex">{renderStars(item.rating)}</div>
//                                                         </div>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-2">{item.comments}</p>
//                                                     {item.strengths && (
//                                                         <div className="text-sm mb-2">
//                                                             <span className="font-medium text-green-700">Strengths:</span> {item.strengths}
//                                                         </div>
//                                                     )}
//                                                     {item.areas_for_improvement && (
//                                                         <div className="text-sm">
//                                                             <span className="font-medium text-orange-700">Areas for Improvement:</span>{" "}
//                                                             {item.areas_for_improvement}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                         <PencilIcon className="h-4 w-4 mr-1" />
//                                                         Edit
//                                                     </button>
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-900">
//                                                         <TrashIcon className="h-4 w-4 mr-1" />
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Sidebar - Statistics */}
//                     <div className="w-80">
//                         <div className="bg-white rounded-lg border border-gray-200 p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h3>

//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Goals</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.totalGoals}</div>
//                                     </div>
//                                     <div className="p-2 bg-blue-100 rounded-lg">
//                                         <TrophyIcon className="h-6 w-6 text-blue-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Active Goals</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.activeGoals}</div>
//                                     </div>
//                                     <div className="p-2 bg-green-100 rounded-lg">
//                                         <TrophyIcon className="h-6 w-6 text-green-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Completed Goals</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.completedGoals}</div>
//                                     </div>
//                                     <div className="p-2 bg-purple-100 rounded-lg">
//                                         <TrophyIcon className="h-6 w-6 text-purple-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Reviews</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.totalReviews}</div>
//                                     </div>
//                                     <div className="p-2 bg-orange-100 rounded-lg">
//                                         <ChartBarIcon className="h-6 w-6 text-orange-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Pending Reviews</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.pendingReviews}</div>
//                                     </div>
//                                     <div className="p-2 bg-yellow-100 rounded-lg">
//                                         <ChartBarIcon className="h-6 w-6 text-yellow-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Avg Rating</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.avgRating}</div>
//                                     </div>
//                                     <div className="p-2 bg-indigo-100 rounded-lg">
//                                         <StarIcon className="h-6 w-6 text-indigo-600" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Modal for Creating/Editing */}
//                 {showModal && (
//                     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//                         <div className="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
//                             <div className="mb-4">
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                     {editingItem ? "Edit" : "Create"}{" "}
//                                     {modalType === "goal" ? "Goal" : modalType === "review" ? "Performance Review" : "Feedback"}
//                                 </h3>
//                             </div>

//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 {/* Goal Form */}
//                                 {modalType === "goal" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={goalFormData.employee}
//                                                     onChange={(e) => setGoalFormData({ ...goalFormData, employee: e.target.value })}
//                                                 >
//                                                     <option value="">Select Employee</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={goalFormData.priority}
//                                                     onChange={(e) => setGoalFormData({ ...goalFormData, priority: e.target.value })}
//                                                 >
//                                                     <option value="low">Low</option>
//                                                     <option value="medium">Medium</option>
//                                                     <option value="high">High</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
//                                             <input
//                                                 type="text"
//                                                 required
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={goalFormData.title}
//                                                 onChange={(e) => setGoalFormData({ ...goalFormData, title: e.target.value })}
//                                                 placeholder="e.g. Increase sales by 20%"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                                             <textarea
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={goalFormData.description}
//                                                 onChange={(e) => setGoalFormData({ ...goalFormData, description: e.target.value })}
//                                                 placeholder="Describe the goal in detail..."
//                                             />
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
//                                                 <input
//                                                     type="date"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={goalFormData.target_date}
//                                                     onChange={(e) => setGoalFormData({ ...goalFormData, target_date: e.target.value })}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={goalFormData.status}
//                                                     onChange={(e) => setGoalFormData({ ...goalFormData, status: e.target.value })}
//                                                 >
//                                                     <option value="active">Active</option>
//                                                     <option value="completed">Completed</option>
//                                                     <option value="paused">Paused</option>
//                                                     <option value="cancelled">Cancelled</option>
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
//                                                 <input
//                                                     type="number"
//                                                     min="0"
//                                                     max="100"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={goalFormData.progress}
//                                                     onChange={(e) =>
//                                                         setGoalFormData({ ...goalFormData, progress: Number.parseInt(e.target.value) || 0 })
//                                                     }
//                                                 />
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}

//                                 {/* Review Form */}
//                                 {modalType === "review" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={reviewFormData.employee}
//                                                     onChange={(e) => setReviewFormData({ ...reviewFormData, employee: e.target.value })}
//                                                 >
//                                                     <option value="">Select Employee</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={reviewFormData.reviewer}
//                                                     onChange={(e) => setReviewFormData({ ...reviewFormData, reviewer: e.target.value })}
//                                                 >
//                                                     <option value="">Select Reviewer</option>
//                                                     {managers.map((manager) => (
//                                                         <option key={manager.id} value={manager.id}>
//                                                             {manager.first_name} {manager.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Review Period Start</label>
//                                                 <input
//                                                     type="date"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={reviewFormData.review_period_start}
//                                                     onChange={(e) =>
//                                                         setReviewFormData({ ...reviewFormData, review_period_start: e.target.value })
//                                                     }
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Review Period End</label>
//                                                 <input
//                                                     type="date"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={reviewFormData.review_period_end}
//                                                     onChange={(e) => setReviewFormData({ ...reviewFormData, review_period_end: e.target.value })}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="bg-gray-50 p-4 rounded-lg">
//                                             <h4 className="text-md font-medium text-gray-900 mb-4">Rating Categories</h4>
//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                 {[
//                                                     { key: "overall_rating", label: "Overall Rating" },
//                                                     { key: "goals_achievement", label: "Goals Achievement" },
//                                                     { key: "communication_skills", label: "Communication Skills" },
//                                                     { key: "teamwork", label: "Teamwork" },
//                                                     { key: "leadership", label: "Leadership" },
//                                                     { key: "technical_skills", label: "Technical Skills" },
//                                                 ].map((rating) => (
//                                                     <div key={rating.key}>
//                                                         <label className="block text-sm font-medium text-gray-700 mb-2">{rating.label}</label>
//                                                         <select
//                                                             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                             value={reviewFormData[rating.key]}
//                                                             onChange={(e) =>
//                                                                 setReviewFormData({ ...reviewFormData, [rating.key]: Number.parseInt(e.target.value) })
//                                                             }
//                                                         >
//                                                             <option value={1}>1 - Poor</option>
//                                                             <option value={2}>2 - Below Average</option>
//                                                             <option value={3}>3 - Average</option>
//                                                             <option value={4}>4 - Good</option>
//                                                             <option value={5}>5 - Excellent</option>
//                                                         </select>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
//                                             <textarea
//                                                 rows={4}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={reviewFormData.comments}
//                                                 onChange={(e) => setReviewFormData({ ...reviewFormData, comments: e.target.value })}
//                                                 placeholder="Provide detailed feedback..."
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {/* Feedback Form */}
//                                 {modalType === "feedback" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={feedbackFormData.employee}
//                                                     onChange={(e) => setFeedbackFormData({ ...feedbackFormData, employee: e.target.value })}
//                                                 >
//                                                     <option value="">Select Employee</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Giver</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={feedbackFormData.feedback_giver}
//                                                     onChange={(e) => setFeedbackFormData({ ...feedbackFormData, feedback_giver: e.target.value })}
//                                                 >
//                                                     <option value="">Select Feedback Giver</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={feedbackFormData.feedback_type}
//                                                     onChange={(e) => setFeedbackFormData({ ...feedbackFormData, feedback_type: e.target.value })}
//                                                 >
//                                                     <option value="peer">Peer Feedback</option>
//                                                     <option value="manager">Manager Feedback</option>
//                                                     <option value="subordinate">Subordinate Feedback</option>
//                                                     <option value="self">Self Assessment</option>
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={feedbackFormData.rating}
//                                                     onChange={(e) =>
//                                                         setFeedbackFormData({ ...feedbackFormData, rating: Number.parseInt(e.target.value) })
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
//                                                 value={feedbackFormData.comments}
//                                                 onChange={(e) => setFeedbackFormData({ ...feedbackFormData, comments: e.target.value })}
//                                                 placeholder="Provide your feedback..."
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Strengths</label>
//                                             <textarea
//                                                 rows={2}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={feedbackFormData.strengths}
//                                                 onChange={(e) => setFeedbackFormData({ ...feedbackFormData, strengths: e.target.value })}
//                                                 placeholder="What are their key strengths?"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Improvement</label>
//                                             <textarea
//                                                 rows={2}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={feedbackFormData.areas_for_improvement}
//                                                 onChange={(e) =>
//                                                     setFeedbackFormData({ ...feedbackFormData, areas_for_improvement: e.target.value })
//                                                 }
//                                                 placeholder="What areas could be improved?"
//                                             />
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 id="is_anonymous"
//                                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={feedbackFormData.is_anonymous}
//                                                 onChange={(e) => setFeedbackFormData({ ...feedbackFormData, is_anonymous: e.target.checked })}
//                                             />
//                                             <label htmlFor="is_anonymous" className="ml-2 block text-sm text-gray-900">
//                                                 Submit as anonymous feedback
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
import { performanceService, employeeService } from "../../lib/services"
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    StarIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

export default function Performance() {
    const [activeTab, setActiveTab] = useState("overview")
    const [goals, setGoals] = useState([])
    const [reviews, setReviews] = useState([])
    const [feedback, setFeedback] = useState([])
    const [employees, setEmployees] = useState([])
    const [statistics, setStatistics] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState("goal") // goal, review, feedback
    const [editingItem, setEditingItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    // Form states
    const [goalForm, setGoalForm] = useState({
        employee: "",
        title: "",
        description: "",
        target_date: "",
        priority: "medium",
        status: "active",
        progress: 0,
    })

    const [reviewForm, setReviewForm] = useState({
        employee: "",
        reviewer: "",
        review_period_start: "",
        review_period_end: "",
        overall_rating: 5,
        technical_skills: 5,
        communication: 5,
        teamwork: 5,
        leadership: 5,
        problem_solving: 5,
        comments: "",
        goals_achieved: "",
        areas_for_improvement: "",
        development_plan: "",
        status: "pending",
    })

    const [feedbackForm, setFeedbackForm] = useState({
        employee: "",
        feedback_giver: "",
        feedback_type: "peer",
        rating: 5,
        comments: "",
        strengths: "",
        areas_for_improvement: "",
        is_anonymous: false,
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [goalsData, reviewsData, feedbackData, employeesData, statsData] = await Promise.all([
                performanceService.getGoals(),
                performanceService.getPerformanceReviews(),
                performanceService.getFeedback(),
                employeeService.getEmployees(1, 100), // Get all employees for dropdowns
                performanceService.getPerformanceStatistics(),
            ])

            setGoals(goalsData)
            setReviews(reviewsData)
            setFeedback(feedbackData)
            setEmployees(employeesData.results || employeesData)
            setStatistics(statsData)
        } catch (error) {
            console.error("Failed to fetch performance data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let formData, service, updateMethod, createMethod

            switch (modalType) {
                case "goal":
                    formData = goalForm
                    service = performanceService
                    updateMethod = "updateGoal"
                    createMethod = "createGoal"
                    break
                case "review":
                    formData = reviewForm
                    service = performanceService
                    updateMethod = "updatePerformanceReview"
                    createMethod = "createPerformanceReview"
                    break
                case "feedback":
                    formData = feedbackForm
                    service = performanceService
                    updateMethod = "updateFeedback"
                    createMethod = "createFeedback"
                    break
            }

            if (editingItem) {
                await service[updateMethod](editingItem.id, formData)
            } else {
                await service[createMethod](formData)
            }

            setShowModal(false)
            setEditingItem(null)
            resetForms()
            fetchData()
        } catch (error) {
            console.error("Failed to save item:", error)
            alert("Failed to save. Please try again.")
        }
    }

    const resetForms = () => {
        setGoalForm({
            employee: "",
            title: "",
            description: "",
            target_date: "",
            priority: "medium",
            status: "active",
            progress: 0,
        })
        setReviewForm({
            employee: "",
            reviewer: "",
            review_period_start: "",
            review_period_end: "",
            overall_rating: 5,
            technical_skills: 5,
            communication: 5,
            teamwork: 5,
            leadership: 5,
            problem_solving: 5,
            comments: "",
            goals_achieved: "",
            areas_for_improvement: "",
            development_plan: "",
            status: "pending",
        })
        setFeedbackForm({
            employee: "",
            feedback_giver: "",
            feedback_type: "peer",
            rating: 5,
            comments: "",
            strengths: "",
            areas_for_improvement: "",
            is_anonymous: false,
        })
    }

    const handleEdit = (item, type) => {
        setEditingItem(item)
        setModalType(type)

        switch (type) {
            case "goal":
                setGoalForm({
                    employee: item.employee?.id || "",
                    title: item.title || "",
                    description: item.description || "",
                    target_date: item.target_date || "",
                    priority: item.priority || "medium",
                    status: item.status || "active",
                    progress: item.progress || 0,
                })
                break
            case "review":
                setReviewForm({
                    employee: item.employee?.id || "",
                    reviewer: item.reviewer?.id || "",
                    review_period_start: item.review_period_start || "",
                    review_period_end: item.review_period_end || "",
                    overall_rating: item.overall_rating || 5,
                    technical_skills: item.technical_skills || 5,
                    communication: item.communication || 5,
                    teamwork: item.teamwork || 5,
                    leadership: item.leadership || 5,
                    problem_solving: item.problem_solving || 5,
                    comments: item.comments || "",
                    goals_achieved: item.goals_achieved || "",
                    areas_for_improvement: item.areas_for_improvement || "",
                    development_plan: item.development_plan || "",
                    status: item.status || "pending",
                })
                break
            case "feedback":
                setFeedbackForm({
                    employee: item.employee?.id || "",
                    feedback_giver: item.feedback_giver?.id || "",
                    feedback_type: item.feedback_type || "peer",
                    rating: item.rating || 5,
                    comments: item.comments || "",
                    strengths: item.strengths || "",
                    areas_for_improvement: item.areas_for_improvement || "",
                    is_anonymous: item.is_anonymous || false,
                })
                break
        }
        setShowModal(true)
    }

    const handleDelete = async (id, type) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                switch (type) {
                    case "goal":
                        await performanceService.deleteGoal(id)
                        break
                    case "review":
                        await performanceService.deletePerformanceReview(id)
                        break
                    case "feedback":
                        await performanceService.deleteFeedback(id)
                        break
                }
                fetchData()
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

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i}>
                {i < rating ? (
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                ) : (
                    <StarIcon className="h-4 w-4 text-gray-300" />
                )}
            </span>
        ))
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
            case "completed":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "overdue":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
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
                    <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
                    <p className="mt-1 text-sm text-gray-600">Track goals, reviews, and feedback</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Goals</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.activeGoals || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ClockIcon className="h-8 w-8 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.pendingReviews || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <StarIconSolid className="h-8 w-8 text-blue-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Avg Rating</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.avgRating || 0}/5</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ExclamationTriangleIcon className="h-8 w-8 text-purple-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Feedback</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.totalFeedback || 0}</dd>
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
                            { id: "goals", name: "Goals" },
                            { id: "reviews", name: "Reviews" },
                            { id: "feedback", name: "Feedback" },
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
                        {/* Recent Goals */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Goals</h3>
                                <div className="space-y-3">
                                    {goals.slice(0, 5).map((goal) => (
                                        <div key={goal.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {goal.employee?.first_name} {goal.employee?.last_name}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(goal.status)}`}>
                                                    {goal.status}
                                                </span>
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-indigo-600 h-2 rounded-full"
                                                        style={{ width: `${goal.progress || 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Reviews</h3>
                                <div className="space-y-3">
                                    {reviews.slice(0, 5).map((review) => (
                                        <div key={review.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {review.employee?.first_name} {review.employee?.last_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Reviewed by {review.reviewer?.first_name} {review.reviewer?.last_name}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex">{renderStars(review.overall_rating || 0)}</div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                                                    {review.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "goals" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search goals..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("goal")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Goal
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Goal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Progress
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
                                    {goals
                                        .filter((goal) => goal.title?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((goal) => (
                                            <tr key={goal.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{goal.title}</div>
                                                        <div className="text-sm text-gray-500">{goal.description?.substring(0, 50)}...</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {goal.employee?.first_name} {goal.employee?.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                                                        {goal.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className="bg-indigo-600 h-2 rounded-full"
                                                                style={{ width: `${goal.progress || 0}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-900">{goal.progress || 0}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(goal.status)}`}>
                                                        {goal.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(goal, "goal")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(goal.id, "goal")}
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

                {activeTab === "reviews" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search reviews..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("review")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Review
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
                                            Reviewer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Period
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
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
                                    {reviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {review.employee?.first_name} {review.employee?.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {review.reviewer?.first_name} {review.reviewer?.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {review.review_period_start} - {review.review_period_end}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex mr-2">{renderStars(review.overall_rating || 0)}</div>
                                                    <span className="text-sm text-gray-900">{review.overall_rating}/5</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                                                    {review.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(review, "review")}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(review.id, "review")}
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

                {activeTab === "feedback" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search feedback..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("feedback")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Feedback
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
                                            From
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Comments
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {feedback.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.employee?.first_name} {item.employee?.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.is_anonymous
                                                    ? "Anonymous"
                                                    : `${item.feedback_giver?.first_name} ${item.feedback_giver?.last_name}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                    {item.feedback_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex mr-2">{renderStars(item.rating || 0)}</div>
                                                    <span className="text-sm text-gray-900">{item.rating}/5</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{item.comments?.substring(0, 50)}...</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(item, "feedback")}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, "feedback")}
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
                                    {modalType === "goal" && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Employee *</label>
                                                <select
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={goalForm.employee}
                                                    onChange={(e) => setGoalForm({ ...goalForm, employee: e.target.value })}
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
                                                <label className="block text-sm font-medium text-gray-700">Title *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={goalForm.title}
                                                    onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={goalForm.description}
                                                    onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Target Date</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={goalForm.target_date}
                                                        onChange={(e) => setGoalForm({ ...goalForm, target_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={goalForm.priority}
                                                        onChange={(e) => setGoalForm({ ...goalForm, priority: e.target.value })}
                                                    >
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={goalForm.status}
                                                        onChange={(e) => setGoalForm({ ...goalForm, status: e.target.value })}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="paused">Paused</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={goalForm.progress}
                                                        onChange={(e) => setGoalForm({ ...goalForm, progress: Number.parseInt(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {modalType === "review" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Employee *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.employee}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, employee: e.target.value })}
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
                                                    <label className="block text-sm font-medium text-gray-700">Reviewer *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.reviewer}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, reviewer: e.target.value })}
                                                    >
                                                        <option value="">Select Reviewer</option>
                                                        {employees.map((emp) => (
                                                            <option key={emp.id} value={emp.id}>
                                                                {emp.first_name} {emp.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Review Period Start</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.review_period_start}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, review_period_start: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Review Period End</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.review_period_end}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, review_period_end: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.overall_rating}
                                                        onChange={(e) =>
                                                            setReviewForm({ ...reviewForm, overall_rating: Number.parseInt(e.target.value) })
                                                        }
                                                    >
                                                        {[1, 2, 3, 4, 5].map((rating) => (
                                                            <option key={rating} value={rating}>
                                                                {rating} Star{rating > 1 ? "s" : ""}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.technical_skills}
                                                        onChange={(e) =>
                                                            setReviewForm({ ...reviewForm, technical_skills: Number.parseInt(e.target.value) })
                                                        }
                                                    >
                                                        {[1, 2, 3, 4, 5].map((rating) => (
                                                            <option key={rating} value={rating}>
                                                                {rating} Star{rating > 1 ? "s" : ""}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Communication</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={reviewForm.communication}
                                                        onChange={(e) =>
                                                            setReviewForm({ ...reviewForm, communication: Number.parseInt(e.target.value) })
                                                        }
                                                    >
                                                        {[1, 2, 3, 4, 5].map((rating) => (
                                                            <option key={rating} value={rating}>
                                                                {rating} Star{rating > 1 ? "s" : ""}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Comments</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={reviewForm.comments}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {modalType === "feedback" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Employee *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={feedbackForm.employee}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, employee: e.target.value })}
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
                                                    <label className="block text-sm font-medium text-gray-700">Feedback Giver</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={feedbackForm.feedback_giver}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback_giver: e.target.value })}
                                                        disabled={feedbackForm.is_anonymous}
                                                    >
                                                        <option value="">Select Feedback Giver</option>
                                                        {employees.map((emp) => (
                                                            <option key={emp.id} value={emp.id}>
                                                                {emp.first_name} {emp.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={feedbackForm.feedback_type}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback_type: e.target.value })}
                                                    >
                                                        <option value="peer">Peer</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="subordinate">Subordinate</option>
                                                        <option value="self">Self</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={feedbackForm.rating}
                                                        onChange={(e) =>
                                                            setFeedbackForm({ ...feedbackForm, rating: Number.parseInt(e.target.value) })
                                                        }
                                                    >
                                                        {[1, 2, 3, 4, 5].map((rating) => (
                                                            <option key={rating} value={rating}>
                                                                {rating} Star{rating > 1 ? "s" : ""}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        checked={feedbackForm.is_anonymous}
                                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, is_anonymous: e.target.checked })}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Anonymous Feedback</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Comments</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={feedbackForm.comments}
                                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, comments: e.target.value })}
                                                />
                                            </div>
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

