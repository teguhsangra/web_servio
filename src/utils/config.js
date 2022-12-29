let baseUrl = '';

// baseUrl = 'http://localhost:8080/api/';

baseUrl = 'https://servio.rakomsis.com/api/';

export const Login = baseUrl + 'login';
export const Logout = baseUrl + 'logout';
export const Contact = baseUrl + 'contacts/customers';
export const Location = baseUrl + 'contacts/locations';
export const ServiceType = baseUrl + 'contacts/service_types';
export const Rooms = baseUrl + 'contacts/rooms';
export const RoomAvailable = baseUrl + 'contacts/room_availabilities';
export const Compliment = baseUrl + 'contacts/customers/complimentaries';
export const Book = baseUrl + 'contacts/bookings';
export const MyBook = baseUrl + 'contacts/get_booking_by_customer';
export const MyBookingDetail = baseUrl + 'contacts/get_booking_by_id';
export const BookingActive = baseUrl + 'contacts/get_booking_active';

export const ForgotPassword = baseUrl + 'contacts/forget-password';
export const ResetPassword = baseUrl + 'contacts/reset-password';


export const UpdateProfile = baseUrl + 'contacts/update_profile';
export const Profile = baseUrl + 'contacts/me';

export const Period = baseUrl + 'contacts/setup_periode'; 