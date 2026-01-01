import React from "react";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "919930418261"; // +91 included
  const message = "Hello, I would like to get a quote.";

  return (
    <>
      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .whatsapp-tooltip {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Ping animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>

          {/* Button */}
          <div className="relative bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-green-500/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-12"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whatsapp-tooltip">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Chat with us on WhatsApp
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default WhatsAppButton;
