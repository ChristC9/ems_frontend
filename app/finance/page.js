// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/Layout"
// import { financeService, departmentService, employeeService } from "../../lib/services"

// // Icons
// const CurrencyDollarIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182C10.464 7.78 11.232 7.5 12 7.5c.768 0 1.536.22 2.121.659l.879.659m-4.242 0V6m0 12v1.5m0-1.5H9m3 0h3"
//         />
//     </svg>
// )

// const BuildingOfficeIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 21h16.5M4.5 3h15l-.75 18h-13.5L4.5 3zM9 9h1.5m-1.5 3h1.5m-1.5 3h1.5M13.5 9H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
//         />
//     </svg>
// )

// const ReceiptPercentIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
//         />
//     </svg>
// )

// const PlusIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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

// const PencilIcon = ({ className }) => (
//     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//         />
//     </svg>
// )

// export default function Finance() {
//     const [activeTab, setActiveTab] = useState("budgets")
//     const [budgets, setBudgets] = useState([])
//     const [costCenters, setCostCenters] = useState([])
//     const [expenses, setExpenses] = useState([])
//     const [departments, setDepartments] = useState([])
//     const [employees, setEmployees] = useState([])
//     const [statistics, setStatistics] = useState({
//         totalBudgets: 0,
//         totalBudget: 0,
//         totalExpenses: 0,
//         remainingBudget: 0,
//         totalCostCenters: 0,
//         pendingExpenses: 0,
//     })
//     const [loading, setLoading] = useState(true)
//     const [showModal, setShowModal] = useState(false)
//     const [modalType, setModalType] = useState("budget")
//     const [editingItem, setEditingItem] = useState(null)
//     const [error, setError] = useState("")
//     const [submitting, setSubmitting] = useState(false)

//     // Form data states
//     const [budgetFormData, setBudgetFormData] = useState({
//         name: "",
//         description: "",
//         department: "",
//         allocated_amount: "",
//         spent_amount: "",
//         fiscal_year: new Date().getFullYear(),
//         status: "active",
//     })

//     const [costCenterFormData, setCostCenterFormData] = useState({
//         name: "",
//         code: "",
//         description: "",
//         department: "",
//         manager: "",
//         budget_limit: "",
//         is_active: true,
//     })

//     const [expenseFormData, setExpenseFormData] = useState({
//         employee: "",
//         cost_center: "",
//         category: "",
//         amount: "",
//         description: "",
//         expense_date: "",
//         receipt_url: "",
//         status: "pending",
//     })

//     useEffect(() => {
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             setError("")

//             const [budgetsData, costCentersData, expensesData, departmentsData, employeesData, statisticsData] =
//                 await Promise.all([
//                     financeService.getBudgets(),
//                     financeService.getCostCenters(),
//                     financeService.getExpenses(),
//                     departmentService.getDepartments(),
//                     employeeService.getEmployees(),
//                     financeService.getFinanceStatistics(),
//                 ])

//             setBudgets(budgetsData)
//             setCostCenters(costCentersData)
//             setExpenses(expensesData)
//             setDepartments(departmentsData)
//             setEmployees(employeesData)
//             setStatistics(statisticsData)
//         } catch (error) {
//             console.error("Failed to fetch finance data:", error)
//             setError("Failed to load finance data. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleCreateBudget = () => {
//         setModalType("budget")
//         setEditingItem(null)
//         setBudgetFormData({
//             name: "",
//             description: "",
//             department: "",
//             allocated_amount: "",
//             spent_amount: "",
//             fiscal_year: new Date().getFullYear(),
//             status: "active",
//         })
//         setShowModal(true)
//     }

//     const handleCreateCostCenter = () => {
//         setModalType("costCenter")
//         setEditingItem(null)
//         setCostCenterFormData({
//             name: "",
//             code: "",
//             description: "",
//             department: "",
//             manager: "",
//             budget_limit: "",
//             is_active: true,
//         })
//         setShowModal(true)
//     }

//     const handleCreateExpense = () => {
//         setModalType("expense")
//         setEditingItem(null)
//         setExpenseFormData({
//             employee: "",
//             cost_center: "",
//             category: "",
//             amount: "",
//             description: "",
//             expense_date: "",
//             receipt_url: "",
//             status: "pending",
//         })
//         setShowModal(true)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setSubmitting(true)
//         setError("")

//         try {
//             if (modalType === "budget") {
//                 if (editingItem) {
//                     await financeService.updateBudget(editingItem.id, budgetFormData)
//                 } else {
//                     await financeService.createBudget(budgetFormData)
//                 }
//             } else if (modalType === "costCenter") {
//                 if (editingItem) {
//                     await financeService.updateCostCenter(editingItem.id, costCenterFormData)
//                 } else {
//                     await financeService.createCostCenter(costCenterFormData)
//                 }
//             } else if (modalType === "expense") {
//                 if (editingItem) {
//                     await financeService.updateExpense(editingItem.id, expenseFormData)
//                 } else {
//                     await financeService.createExpense(expenseFormData)
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

//     const handleApproveExpense = async (id) => {
//         try {
//             await financeService.approveExpense(id)
//             await fetchData()
//         } catch (error) {
//             console.error("Failed to approve expense:", error)
//             setError("Failed to approve expense. Please try again.")
//         }
//     }

//     const handleRejectExpense = async (id) => {
//         try {
//             await financeService.rejectExpense(id)
//             await fetchData()
//         } catch (error) {
//             console.error("Failed to reject expense:", error)
//             setError("Failed to reject expense. Please try again.")
//         }
//     }

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//         }).format(amount || 0)
//     }

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A"
//         return new Date(dateString).toLocaleDateString()
//     }

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "active":
//             case "approved":
//                 return "bg-green-100 text-green-800"
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800"
//             case "rejected":
//             case "inactive":
//                 return "bg-red-100 text-red-800"
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
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance Management</h1>
//                     <p className="text-gray-600">Manage budgets, cost centers, and expense tracking</p>
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
//                                     onClick={() => setActiveTab("budgets")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "budgets"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Budgets
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("costCenters")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "costCenters"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Cost Centers
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("expenses")}
//                                     className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "expenses"
//                                         ? "border-indigo-500 text-indigo-600"
//                                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                                         }`}
//                                 >
//                                     Expenses
//                                 </button>
//                             </nav>
//                         </div>

//                         {/* Tab Content Header */}
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-semibold text-gray-900">
//                                 {activeTab === "budgets" && "Department Budgets"}
//                                 {activeTab === "costCenters" && "Cost Centers"}
//                                 {activeTab === "expenses" && "Expense Reports"}
//                             </h2>
//                             <button
//                                 onClick={() => {
//                                     if (activeTab === "budgets") handleCreateBudget()
//                                     else if (activeTab === "costCenters") handleCreateCostCenter()
//                                     else if (activeTab === "expenses") handleCreateExpense()
//                                 }}
//                                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 <PlusIcon className="h-5 w-5 mr-2" />
//                                 {activeTab === "budgets" && "Create Budget"}
//                                 {activeTab === "costCenters" && "Create Cost Center"}
//                                 {activeTab === "expenses" && "Add Expense"}
//                             </button>
//                         </div>

//                         {/* Budgets Tab */}
//                         {activeTab === "budgets" && (
//                             <div className="space-y-4">
//                                 {budgets.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No budgets found</div>
//                                         <button
//                                             onClick={handleCreateBudget}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Create First Budget
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     budgets.map((budget) => (
//                                         <div
//                                             key={budget.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(budget.status)}`}
//                                                         >
//                                                             {budget.status}
//                                                         </span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-3">{budget.description}</p>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                         <div>Department: {budget.department?.name || "N/A"}</div>
//                                                         <div>Fiscal Year: {budget.fiscal_year}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     <button className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
//                                                         <PencilIcon className="h-4 w-4 mr-1" />
//                                                         Edit
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             <div className="grid grid-cols-3 gap-4 mb-4">
//                                                 <div>
//                                                     <div className="text-sm text-gray-600">Allocated</div>
//                                                     <div className="text-lg font-semibold text-blue-600">
//                                                         {formatCurrency(budget.allocated_amount)}
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-sm text-gray-600">Spent</div>
//                                                     <div className="text-lg font-semibold text-red-600">
//                                                         {formatCurrency(budget.spent_amount)}
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-sm text-gray-600">Remaining</div>
//                                                     <div className="text-lg font-semibold text-green-600">
//                                                         {formatCurrency((budget.allocated_amount || 0) - (budget.spent_amount || 0))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* Budget Progress Bar */}
//                                             <div className="w-full bg-gray-200 rounded-full h-2">
//                                                 <div
//                                                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                                                     style={{
//                                                         width: `${Math.min(((budget.spent_amount || 0) / (budget.allocated_amount || 1)) * 100, 100)}%`,
//                                                     }}
//                                                 ></div>
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-1">
//                                                 {Math.round(((budget.spent_amount || 0) / (budget.allocated_amount || 1)) * 100)}% utilized
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}

//                         {/* Cost Centers Tab */}
//                         {activeTab === "costCenters" && (
//                             <div className="space-y-4">
//                                 {costCenters.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No cost centers found</div>
//                                         <button
//                                             onClick={handleCreateCostCenter}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Create First Cost Center
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     costCenters.map((costCenter) => (
//                                         <div
//                                             key={costCenter.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">{costCenter.name}</h3>
//                                                         <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
//                                                             {costCenter.code}
//                                                         </span>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${costCenter.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                                                                 }`}
//                                                         >
//                                                             {costCenter.is_active ? "Active" : "Inactive"}
//                                                         </span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-3">{costCenter.description}</p>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                         <div>Department: {costCenter.department?.name || "N/A"}</div>
//                                                         <div>
//                                                             Manager: {costCenter.manager?.first_name} {costCenter.manager?.last_name}
//                                                         </div>
//                                                         <div>Budget Limit: {formatCurrency(costCenter.budget_limit)}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
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

//                         {/* Expenses Tab */}
//                         {activeTab === "expenses" && (
//                             <div className="space-y-4">
//                                 {expenses.length === 0 ? (
//                                     <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                                         <ReceiptPercentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                                         <div className="text-gray-500 mb-4">No expenses found</div>
//                                         <button
//                                             onClick={handleCreateExpense}
//                                             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                         >
//                                             <PlusIcon className="h-5 w-5 mr-2" />
//                                             Add First Expense
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     expenses.map((expense) => (
//                                         <div
//                                             key={expense.id}
//                                             className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                                         >
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <div className="flex items-center gap-3 mb-2">
//                                                         <h3 className="text-lg font-semibold text-gray-900">
//                                                             {formatCurrency(expense.amount)} - {expense.category}
//                                                         </h3>
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(expense.status)}`}
//                                                         >
//                                                             {expense.status}
//                                                         </span>
//                                                     </div>
//                                                     <p className="text-gray-700 text-sm mb-3">{expense.description}</p>
//                                                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                         <div>
//                                                             Employee: {expense.employee?.first_name} {expense.employee?.last_name}
//                                                         </div>
//                                                         <div>Cost Center: {expense.cost_center?.name}</div>
//                                                         <div>Date: {formatDate(expense.expense_date)}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-2 ml-4">
//                                                     {expense.status === "pending" && (
//                                                         <>
//                                                             <button
//                                                                 onClick={() => handleApproveExpense(expense.id)}
//                                                                 className="inline-flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
//                                                             >
//                                                                 <CheckIcon className="h-4 w-4 mr-1" />
//                                                                 Approve
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => handleRejectExpense(expense.id)}
//                                                                 className="inline-flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
//                                                             >
//                                                                 <XMarkIcon className="h-4 w-4 mr-1" />
//                                                                 Reject
//                                                             </button>
//                                                         </>
//                                                     )}
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
//                     </div>

//                     {/* Right Sidebar - Statistics */}
//                     <div className="w-80">
//                         <div className="bg-white rounded-lg border border-gray-200 p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Finance Overview</h3>

//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Budget</div>
//                                         <div className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.totalBudget)}</div>
//                                     </div>
//                                     <div className="p-2 bg-blue-100 rounded-lg">
//                                         <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Total Expenses</div>
//                                         <div className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.totalExpenses)}</div>
//                                     </div>
//                                     <div className="p-2 bg-red-100 rounded-lg">
//                                         <ReceiptPercentIcon className="h-6 w-6 text-red-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Remaining Budget</div>
//                                         <div className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.remainingBudget)}</div>
//                                     </div>
//                                     <div className="p-2 bg-green-100 rounded-lg">
//                                         <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Cost Centers</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.totalCostCenters}</div>
//                                     </div>
//                                     <div className="p-2 bg-purple-100 rounded-lg">
//                                         <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <div className="text-sm text-gray-600">Pending Expenses</div>
//                                         <div className="text-2xl font-bold text-gray-900">{statistics.pendingExpenses}</div>
//                                     </div>
//                                     <div className="p-2 bg-yellow-100 rounded-lg">
//                                         <ReceiptPercentIcon className="h-6 w-6 text-yellow-600" />
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
//                                     {modalType === "budget" ? "Budget" : modalType === "costCenter" ? "Cost Center" : "Expense"}
//                                 </h3>
//                             </div>

//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 {/* Budget Form */}
//                                 {modalType === "budget" && (
//                                     <>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Budget Name *</label>
//                                             <input
//                                                 type="text"
//                                                 required
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={budgetFormData.name}
//                                                 onChange={(e) => setBudgetFormData({ ...budgetFormData, name: e.target.value })}
//                                                 placeholder="e.g. Marketing Q1 Budget"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                                             <textarea
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={budgetFormData.description}
//                                                 onChange={(e) => setBudgetFormData({ ...budgetFormData, description: e.target.value })}
//                                                 placeholder="Budget description..."
//                                             />
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={budgetFormData.department}
//                                                     onChange={(e) => setBudgetFormData({ ...budgetFormData, department: e.target.value })}
//                                                 >
//                                                     <option value="">Select Department</option>
//                                                     {departments.map((dept) => (
//                                                         <option key={dept.id} value={dept.id}>
//                                                             {dept.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year</label>
//                                                 <input
//                                                     type="number"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={budgetFormData.fiscal_year}
//                                                     onChange={(e) =>
//                                                         setBudgetFormData({ ...budgetFormData, fiscal_year: Number.parseInt(e.target.value) })
//                                                     }
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Allocated Amount *</label>
//                                                 <input
//                                                     type="number"
//                                                     step="0.01"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={budgetFormData.allocated_amount}
//                                                     onChange={(e) => setBudgetFormData({ ...budgetFormData, allocated_amount: e.target.value })}
//                                                     placeholder="0.00"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Spent Amount</label>
//                                                 <input
//                                                     type="number"
//                                                     step="0.01"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={budgetFormData.spent_amount}
//                                                     onChange={(e) => setBudgetFormData({ ...budgetFormData, spent_amount: e.target.value })}
//                                                     placeholder="0.00"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}

//                                 {/* Cost Center Form */}
//                                 {modalType === "costCenter" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Cost Center Name *</label>
//                                                 <input
//                                                     type="text"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={costCenterFormData.name}
//                                                     onChange={(e) => setCostCenterFormData({ ...costCenterFormData, name: e.target.value })}
//                                                     placeholder="e.g. Marketing Operations"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Cost Center Code *</label>
//                                                 <input
//                                                     type="text"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={costCenterFormData.code}
//                                                     onChange={(e) => setCostCenterFormData({ ...costCenterFormData, code: e.target.value })}
//                                                     placeholder="e.g. MKT-001"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                                             <textarea
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={costCenterFormData.description}
//                                                 onChange={(e) => setCostCenterFormData({ ...costCenterFormData, description: e.target.value })}
//                                                 placeholder="Cost center description..."
//                                             />
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={costCenterFormData.department}
//                                                     onChange={(e) => setCostCenterFormData({ ...costCenterFormData, department: e.target.value })}
//                                                 >
//                                                     <option value="">Select Department</option>
//                                                     {departments.map((dept) => (
//                                                         <option key={dept.id} value={dept.id}>
//                                                             {dept.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={costCenterFormData.manager}
//                                                     onChange={(e) => setCostCenterFormData({ ...costCenterFormData, manager: e.target.value })}
//                                                 >
//                                                     <option value="">Select Manager</option>
//                                                     {employees.map((emp) => (
//                                                         <option key={emp.id} value={emp.id}>
//                                                             {emp.first_name} {emp.last_name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit</label>
//                                             <input
//                                                 type="number"
//                                                 step="0.01"
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={costCenterFormData.budget_limit}
//                                                 onChange={(e) => setCostCenterFormData({ ...costCenterFormData, budget_limit: e.target.value })}
//                                                 placeholder="0.00"
//                                             />
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 id="is_active"
//                                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={costCenterFormData.is_active}
//                                                 onChange={(e) => setCostCenterFormData({ ...costCenterFormData, is_active: e.target.checked })}
//                                             />
//                                             <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
//                                                 Active Cost Center
//                                             </label>
//                                         </div>
//                                     </>
//                                 )}

//                                 {/* Expense Form */}
//                                 {modalType === "expense" && (
//                                     <>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.employee}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, employee: e.target.value })}
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
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Cost Center</label>
//                                                 <select
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.cost_center}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, cost_center: e.target.value })}
//                                                 >
//                                                     <option value="">Select Cost Center</option>
//                                                     {costCenters.map((cc) => (
//                                                         <option key={cc.id} value={cc.id}>
//                                                             {cc.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                                                 <select
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.category}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
//                                                 >
//                                                     <option value="">Select Category</option>
//                                                     <option value="travel">Travel</option>
//                                                     <option value="meals">Meals & Entertainment</option>
//                                                     <option value="office_supplies">Office Supplies</option>
//                                                     <option value="software">Software & Subscriptions</option>
//                                                     <option value="training">Training & Development</option>
//                                                     <option value="marketing">Marketing</option>
//                                                     <option value="other">Other</option>
//                                                 </select>
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
//                                                 <input
//                                                     type="number"
//                                                     step="0.01"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.amount}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
//                                                     placeholder="0.00"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//                                             <textarea
//                                                 required
//                                                 rows={3}
//                                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                 value={expenseFormData.description}
//                                                 onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
//                                                 placeholder="Expense description..."
//                                             />
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Expense Date *</label>
//                                                 <input
//                                                     type="date"
//                                                     required
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.expense_date}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, expense_date: e.target.value })}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">Receipt URL</label>
//                                                 <input
//                                                     type="url"
//                                                     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     value={expenseFormData.receipt_url}
//                                                     onChange={(e) => setExpenseFormData({ ...expenseFormData, receipt_url: e.target.value })}
//                                                     placeholder="https://..."
//                                                 />
//                                             </div>
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
import { financeService, departmentService, employeeService } from "../../lib/services"
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    CurrencyDollarIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
} from "@heroicons/react/24/outline"

export default function Finance() {
    const [activeTab, setActiveTab] = useState("overview")
    const [budgets, setBudgets] = useState([])
    const [costCenters, setCostCenters] = useState([])
    const [expenses, setExpenses] = useState([])
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [statistics, setStatistics] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState("budget") // budget, costCenter, expense
    const [editingItem, setEditingItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    // Form states
    const [budgetForm, setBudgetForm] = useState({
        name: "",
        department: "",
        fiscal_year: new Date().getFullYear(),
        allocated_amount: "",
        spent_amount: 0,
        description: "",
        status: "active",
    })

    const [costCenterForm, setCostCenterForm] = useState({
        name: "",
        code: "",
        department: "",
        manager: "",
        budget_limit: "",
        description: "",
        is_active: true,
    })

    const [expenseForm, setExpenseForm] = useState({
        employee: "",
        cost_center: "",
        category: "travel",
        amount: "",
        description: "",
        expense_date: "",
        receipt_url: "",
        status: "pending",
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [budgetsData, costCentersData, expensesData, departmentsData, employeesData, statsData] = await Promise.all(
                [
                    financeService.getBudgets(),
                    financeService.getCostCenters(),
                    financeService.getExpenses(),
                    departmentService.getDepartments(),
                    employeeService.getEmployees(1, 100),
                    financeService.getFinanceStatistics(),
                ],
            )

            setBudgets(budgetsData)
            setCostCenters(costCentersData)
            setExpenses(expensesData)
            setDepartments(departmentsData)
            setEmployees(employeesData.results || employeesData)
            setStatistics(statsData)
        } catch (error) {
            console.error("Failed to fetch finance data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let formData, service, updateMethod, createMethod

            switch (modalType) {
                case "budget":
                    formData = budgetForm
                    service = financeService
                    updateMethod = "updateBudget"
                    createMethod = "createBudget"
                    break
                case "costCenter":
                    formData = costCenterForm
                    service = financeService
                    updateMethod = "updateCostCenter"
                    createMethod = "createCostCenter"
                    break
                case "expense":
                    formData = expenseForm
                    service = financeService
                    updateMethod = "updateExpense"
                    createMethod = "createExpense"
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
        setBudgetForm({
            name: "",
            department: "",
            fiscal_year: new Date().getFullYear(),
            allocated_amount: "",
            spent_amount: 0,
            description: "",
            status: "active",
        })
        setCostCenterForm({
            name: "",
            code: "",
            department: "",
            manager: "",
            budget_limit: "",
            description: "",
            is_active: true,
        })
        setExpenseForm({
            employee: "",
            cost_center: "",
            category: "travel",
            amount: "",
            description: "",
            expense_date: "",
            receipt_url: "",
            status: "pending",
        })
    }

    const handleEdit = (item, type) => {
        setEditingItem(item)
        setModalType(type)

        switch (type) {
            case "budget":
                setBudgetForm({
                    name: item.name || "",
                    department: item.department?.id || "",
                    fiscal_year: item.fiscal_year || new Date().getFullYear(),
                    allocated_amount: item.allocated_amount || "",
                    spent_amount: item.spent_amount || 0,
                    description: item.description || "",
                    status: item.status || "active",
                })
                break
            case "costCenter":
                setCostCenterForm({
                    name: item.name || "",
                    code: item.code || "",
                    department: item.department?.id || "",
                    manager: item.manager?.id || "",
                    budget_limit: item.budget_limit || "",
                    description: item.description || "",
                    is_active: item.is_active !== undefined ? item.is_active : true,
                })
                break
            case "expense":
                setExpenseForm({
                    employee: item.employee?.id || "",
                    cost_center: item.cost_center?.id || "",
                    category: item.category || "travel",
                    amount: item.amount || "",
                    description: item.description || "",
                    expense_date: item.expense_date || "",
                    receipt_url: item.receipt_url || "",
                    status: item.status || "pending",
                })
                break
        }
        setShowModal(true)
    }

    const handleDelete = async (id, type) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                switch (type) {
                    case "budget":
                        await financeService.deleteBudget(id)
                        break
                    case "costCenter":
                        await financeService.deleteCostCenter(id)
                        break
                    case "expense":
                        await financeService.deleteExpense(id)
                        break
                }
                fetchData()
            } catch (error) {
                console.error("Failed to delete item:", error)
            }
        }
    }

    const handleExpenseAction = async (id, action) => {
        try {
            if (action === "approve") {
                await financeService.approveExpense(id)
            } else if (action === "reject") {
                await financeService.rejectExpense(id)
            }
            fetchData()
        } catch (error) {
            console.error(`Failed to ${action} expense:`, error)
        }
    }

    const openModal = (type) => {
        setModalType(type)
        setEditingItem(null)
        resetForms()
        setShowModal(true)
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount || 0)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
            case "approved":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "rejected":
            case "inactive":
                return "bg-red-100 text-red-800"
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
                    <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
                    <p className="mt-1 text-sm text-gray-600">Manage budgets, cost centers, and expenses</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CurrencyDollarIcon className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                                        <dd className="text-lg font-medium text-gray-900">{formatCurrency(statistics.totalBudget)}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <DocumentTextIcon className="h-8 w-8 text-red-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                                        <dd className="text-lg font-medium text-gray-900">{formatCurrency(statistics.totalExpenses)}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Cost Centers</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.totalCostCenters || 0}</dd>
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
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Expenses</dt>
                                        <dd className="text-lg font-medium text-gray-900">{statistics.pendingExpenses || 0}</dd>
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
                            { id: "budgets", name: "Budgets" },
                            { id: "costCenters", name: "Cost Centers" },
                            { id: "expenses", name: "Expenses" },
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
                        {/* Budget Overview */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Budget Overview</h3>
                                <div className="space-y-3">
                                    {budgets.slice(0, 5).map((budget) => (
                                        <div key={budget.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{budget.name}</p>
                                                <p className="text-sm text-gray-500">{budget.department?.name}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatCurrency(budget.spent_amount)} / {formatCurrency(budget.allocated_amount)}
                                                    </p>
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-indigo-600 h-2 rounded-full"
                                                            style={{
                                                                width: `${Math.min(
                                                                    ((budget.spent_amount || 0) / (budget.allocated_amount || 1)) * 100,
                                                                    100,
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Expenses */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Expenses</h3>
                                <div className="space-y-3">
                                    {expenses.slice(0, 5).map((expense) => (
                                        <div key={expense.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                                                <p className="text-sm text-gray-500">
                                                    {expense.employee?.first_name} {expense.employee?.last_name} • {expense.category}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-900">{formatCurrency(expense.amount)}</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(expense.status)}`}>
                                                    {expense.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "budgets" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search budgets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("budget")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Budget
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Budget Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Allocated
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Spent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Remaining
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
                                    {budgets
                                        .filter((budget) => budget.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((budget) => (
                                            <tr key={budget.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{budget.name}</div>
                                                        <div className="text-sm text-gray-500">FY {budget.fiscal_year}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {budget.department?.name || "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(budget.allocated_amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(budget.spent_amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency((budget.allocated_amount || 0) - (budget.spent_amount || 0))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(budget.status)}`}>
                                                        {budget.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(budget, "budget")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(budget.id, "budget")}
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

                {activeTab === "costCenters" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search cost centers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("costCenter")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Cost Center
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Manager
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Budget Limit
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
                                    {costCenters
                                        .filter((center) => center.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((center) => (
                                            <tr key={center.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{center.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{center.code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {center.department?.name || "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {center.manager?.first_name} {center.manager?.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(center.budget_limit)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${center.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {center.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(center, "costCenter")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(center.id, "costCenter")}
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

                {activeTab === "expenses" && (
                    <div>
                        <div className="sm:flex sm:items-center sm:justify-between mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Search expenses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <button
                                    onClick={() => openModal("expense")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Expense
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
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
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
                                    {expenses
                                        .filter((expense) => expense.description?.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((expense) => (
                                            <tr key={expense.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {expense.employee?.first_name} {expense.employee?.last_name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                        {expense.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatCurrency(expense.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(expense.status)}`}>
                                                        {expense.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {expense.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleExpenseAction(expense.id, "approve")}
                                                                className="text-green-600 hover:text-green-900 mr-2"
                                                                title="Approve"
                                                            >
                                                                <CheckCircleIcon className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleExpenseAction(expense.id, "reject")}
                                                                className="text-red-600 hover:text-red-900 mr-2"
                                                                title="Reject"
                                                            >
                                                                <XCircleIcon className="h-5 w-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleEdit(expense, "expense")}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(expense.id, "expense")}
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
                                    {modalType === "budget" && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Budget Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={budgetForm.name}
                                                    onChange={(e) => setBudgetForm({ ...budgetForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={budgetForm.department}
                                                        onChange={(e) => setBudgetForm({ ...budgetForm, department: e.target.value })}
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
                                                    <label className="block text-sm font-medium text-gray-700">Fiscal Year</label>
                                                    <input
                                                        type="number"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={budgetForm.fiscal_year}
                                                        onChange={(e) =>
                                                            setBudgetForm({ ...budgetForm, fiscal_year: Number.parseInt(e.target.value) })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Allocated Amount *</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={budgetForm.allocated_amount}
                                                        onChange={(e) => setBudgetForm({ ...budgetForm, allocated_amount: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={budgetForm.status}
                                                        onChange={(e) => setBudgetForm({ ...budgetForm, status: e.target.value })}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={budgetForm.description}
                                                    onChange={(e) => setBudgetForm({ ...budgetForm, description: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {modalType === "costCenter" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={costCenterForm.name}
                                                        onChange={(e) => setCostCenterForm({ ...costCenterForm, name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Code *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={costCenterForm.code}
                                                        onChange={(e) => setCostCenterForm({ ...costCenterForm, code: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={costCenterForm.department}
                                                        onChange={(e) => setCostCenterForm({ ...costCenterForm, department: e.target.value })}
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
                                                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={costCenterForm.manager}
                                                        onChange={(e) => setCostCenterForm({ ...costCenterForm, manager: e.target.value })}
                                                    >
                                                        <option value="">Select Manager</option>
                                                        {employees.map((emp) => (
                                                            <option key={emp.id} value={emp.id}>
                                                                {emp.first_name} {emp.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Budget Limit</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={costCenterForm.budget_limit}
                                                    onChange={(e) => setCostCenterForm({ ...costCenterForm, budget_limit: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        checked={costCenterForm.is_active}
                                                        onChange={(e) => setCostCenterForm({ ...costCenterForm, is_active: e.target.checked })}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Active</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    rows={3}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={costCenterForm.description}
                                                    onChange={(e) => setCostCenterForm({ ...costCenterForm, description: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {modalType === "expense" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Employee *</label>
                                                    <select
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.employee}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, employee: e.target.value })}
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
                                                    <label className="block text-sm font-medium text-gray-700">Cost Center</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.cost_center}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, cost_center: e.target.value })}
                                                    >
                                                        <option value="">Select Cost Center</option>
                                                        {costCenters.map((center) => (
                                                            <option key={center.id} value={center.id}>
                                                                {center.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                                    <select
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.category}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                                                    >
                                                        <option value="travel">Travel</option>
                                                        <option value="meals">Meals</option>
                                                        <option value="office_supplies">Office Supplies</option>
                                                        <option value="software">Software</option>
                                                        <option value="training">Training</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Amount *</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        required
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.amount}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description *</label>
                                                <textarea
                                                    rows={3}
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    value={expenseForm.description}
                                                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Expense Date</label>
                                                    <input
                                                        type="date"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.expense_date}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, expense_date: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Receipt URL</label>
                                                    <input
                                                        type="url"
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                        value={expenseForm.receipt_url}
                                                        onChange={(e) => setExpenseForm({ ...expenseForm, receipt_url: e.target.value })}
                                                    />
                                                </div>
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

