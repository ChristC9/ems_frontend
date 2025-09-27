"use client"

import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import { benefitsService } from "../../lib/services"
import { HeartIcon, ShieldCheckIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

export default function Benefits() {
  const [benefitPlans, setBenefitPlans] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("plans")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [plansData, enrollmentsData] = await Promise.all([
        benefitsService.getBenefitPlans(),
        benefitsService.getEnrollments(),
      ])

      setBenefitPlans(plansData)
      setEnrollments(enrollmentsData)
    } catch (error) {
      console.error("Failed to fetch benefits data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Benefits Management</h1>
          <p className="mt-1 text-sm text-gray-600">Manage employee benefit plans and enrollments</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("plans")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "plans"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Benefit Plans
            </button>
            <button
              onClick={() => setActiveTab("enrollments")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "enrollments"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Benefit Enrollments
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "claims"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Benefit Claims
            </button>
          </nav>
        </div>

        {/* Benefit Plans Tab */}
        {activeTab === "plans" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefitPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <HeartIcon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{plan.name || "Health Plan"}</h3>
                      <p className="text-sm text-gray-500">{plan.type || "Medical"}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {plan.description || "Comprehensive health coverage for employees and their families."}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Monthly Premium</p>
                      <p className="text-lg font-bold text-indigo-600">${plan.total_cost || "299"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Coverage</p>
                      <p className="text-sm text-gray-600">{plan.coverage_details.coverage_level || "80%"}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    {/* <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      View Details
                    </button> */}
                  </div>
                </div>
              </div>
            ))}

            {/* Default plans if no data */}
            {benefitPlans.length === 0 && (
              <>
                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <HeartIcon className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Health Insurance</h3>
                        <p className="text-sm text-gray-500">Medical</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Comprehensive health coverage for employees and their families.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Monthly Premium</p>
                        <p className="text-lg font-bold text-indigo-600">$299</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Coverage</p>
                        <p className="text-sm text-gray-600">80%</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Dental Insurance</h3>
                        <p className="text-sm text-gray-500">Dental</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Complete dental care coverage including preventive and major services.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Monthly Premium</p>
                        <p className="text-lg font-bold text-green-600">$45</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Coverage</p>
                        <p className="text-sm text-gray-600">90%</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Life Insurance</h3>
                        <p className="text-sm text-gray-500">Life</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Term life insurance coverage for financial security.</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Monthly Premium</p>
                        <p className="text-lg font-bold text-purple-600">$25</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Coverage</p>
                        <p className="text-sm text-gray-600">$100K</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === "enrollments" && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Benefit Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Premium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-700">
                              {enrollment.employee?.first_name?.[0]}
                              {enrollment.employee?.last_name?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {enrollment.employee?.first_name} {enrollment.employee?.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{enrollment.employee?.position?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {enrollment.benefit_plan?.name || "Health Insurance"}
                      </div>
                      <div className="text-sm text-gray-500">{enrollment.benefit_plan?.type || "Medical"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enrollment.enrollment_date ? new Date(enrollment.enrollment_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${enrollment.monthly_premium || "299"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${enrollment.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {enrollment.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}
