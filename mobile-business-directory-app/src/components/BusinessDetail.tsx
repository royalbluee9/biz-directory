import { Business } from '../types/Business';

interface BusinessDetailProps {
  business: Business;
  onDelete: (id: string) => void;
  onClose: () => void;
  onChat: (businessId: string) => void;
  onRequestVerification?: (businessId: string) => void;
  currentUserId: string;
}

export default function BusinessDetail({ business, onDelete, onChat, onRequestVerification, currentUserId }: BusinessDetailProps) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${business.name}"?`)) {
      onDelete(business.id);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${business.countryCode}${business.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${business.email}`;
  };

  const handleWebsite = () => {
    let url = business.website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  const isOwner = business.ownerId === currentUserId;
  const canRequestVerification = isOwner && !business.isVerified && business.verificationStatus === 'none';

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl">
            {business.image}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">{business.name}</h2>
              {business.isVerified && (
                <span className="text-blue-500 text-2xl" title="Verified Business">
                  ✓
                </span>
              )}
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {business.category}
            </span>
            {business.verificationStatus === 'pending' && (
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  ⏳ Verification Pending
                </span>
              </div>
            )}
            {business.verificationStatus === 'rejected' && (
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  ❌ Verification Rejected
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-6">{business.description}</p>

        {/* Get Verified Button */}
        {canRequestVerification && onRequestVerification && (
          <div className="mb-4">
            <button
              onClick={() => onRequestVerification(business.id)}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>✓</span>
              Get Verified
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center py-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-xs font-medium">Call</span>
          </button>

          <button
            onClick={() => onChat(business.id)}
            className="flex flex-col items-center justify-center py-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium">Chat</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex flex-col items-center justify-center py-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">Email</span>
          </button>

          {business.website && (
            <button
              onClick={handleWebsite}
              className="flex flex-col items-center justify-center py-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-xs font-medium">Website</span>
            </button>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800 font-medium">{business.countryCode} {business.phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium break-all">{business.email}</p>
            </div>
          </div>

          {business.website && (
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="text-gray-800 font-medium break-all">{business.website}</p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-800 font-medium">{business.address}</p>
            </div>
          </div>

          {business.hours && (
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Business Hours</p>
                <p className="text-gray-800 font-medium">{business.hours}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button (Only for owner) */}
      {isOwner && (
        <button
          onClick={handleDelete}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Delete Business
        </button>
      )}
    </div>
  );
}
