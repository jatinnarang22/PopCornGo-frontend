import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface BookingDetails {
  movieTitle: string;
  theater: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
}

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get booking details from navigation state or URL params
    if (location.state) {
      setBookingDetails(location.state as BookingDetails);
    }
  }, [location]);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or profile
      navigate('/profile', { 
        state: { 
          message: 'Booking confirmed successfully!',
          bookingDetails 
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Booking Details Found</h2>
          <p className="text-gray-400 mb-6">Please select a movie and showtime first.</p>
          <button
            onClick={() => navigate('/movies')}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Confirm Your Booking</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Movie:</span>
                <span className="font-semibold">{bookingDetails.movieTitle}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Theater:</span>
                <span>{bookingDetails.theater}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span>{bookingDetails.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span>{bookingDetails.time}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Seats:</span>
                <span>{bookingDetails.seats.join(', ')}</span>
              </div>
              
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-red-500">₹{bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" defaultChecked />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" />
                <span>UPI</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-3" />
                <span>Net Banking</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition-colors"
            >
              Go Back
            </button>
            
            <button
              onClick={handleConfirmBooking}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
