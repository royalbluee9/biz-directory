import { useState } from 'react';
import { Business, User } from '../types/Business';

interface AdminDashboardProps {
  businesses: Business[];
  users: User[];
  onVerifyBusiness: (businessId: string, approve: boolean) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  businesses,
  users,
  onVerifyBusiness,
  onClose,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'verifications'>(
    'overview'
  );

  const pendingVerifications = businesses.filter(
    (b) => b.verificationStatus === 'pending'
  );
  const verifiedBusinesses = businesses.filter((b) => b.isVerified);
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === 'admin');
  const regularUsers = users.filter((u) => u.role === 'user');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <p className="text-purple-100 text-sm mt-1">Manage users and verifications</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            👥 Users ({totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`flex-1 py-3 px-4 font-medium transition-colors relative ${
              activeTab === 'verifications'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ✅ Verifications
            {pendingVerifications.length > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingVerifications.length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{totalUsers}</div>
                  <div className="text-sm text-blue-800 mt-1">Total Users</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{businesses.length}</div>
                  <div className="text-sm text-green-800 mt-1">Total Businesses</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {verifiedBusinesses.length}
                  </div>
                  <div className="text-sm text-purple-800 mt-1">Verified Businesses</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {pendingVerifications.length}
                  </div>
                  <div className="text-sm text-orange-800 mt-1">Pending Verifications</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">User Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admin Users:</span>
                    <span className="font-semibold text-purple-600">{adminUsers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Regular Users:</span>
                    <span className="font-semibold text-blue-600">{regularUsers.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-3">
              {users.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No users found</div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className="space-y-4">
              {pendingVerifications.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No pending verification requests
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-lg">Pending Requests</h3>
                  {pendingVerifications.map((business) => (
                    <div key={business.id} className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{business.image}</span>
                            <div>
                              <div className="font-semibold text-gray-800">{business.name}</div>
                              <div className="text-sm text-gray-600">{business.category}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mb-3">{business.description}</div>
                      <div className="text-xs text-gray-500 mb-3">
                        Requested: {business.verificationRequestDate && new Date(business.verificationRequestDate).toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onVerifyBusiness(business.id, true)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => onVerifyBusiness(business.id, false)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {verifiedBusinesses.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg mt-6">Verified Businesses</h3>
                  {verifiedBusinesses.map((business) => (
                    <div key={business.id} className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{business.image}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{business.name}</span>
                            <span className="text-blue-600">✓</span>
                          </div>
                          <div className="text-sm text-gray-600">{business.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
