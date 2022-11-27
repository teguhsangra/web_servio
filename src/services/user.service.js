import axios from 'axios';
import authHeader from './auth-header';
import {
    Contact,
    Location,
    ServiceType,
    Rooms,
    Compliment,
    Book,
    MyBook,
    MyBookingDetail,
    BookingActive,
    ForgotPassword,
    ResetPassword,
    UpdateProfile,
    Period
} from '../utils/config'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
class UserService {
    getDataContact() {
        return axios.get(Contact, { headers: authHeader() });
    }
    getDataLocations() {
        return axios.get(Location, { headers: authHeader() });
    }
    getDataServiceType() {
        return axios.get(ServiceType, { headers: authHeader() });
    }
    getDataRooms(location_id, room_category_id) {
        return axios.get(Rooms + '?location_id=' + location_id + '&room_category_id=' + room_category_id, { headers: authHeader() });
    }
    getDataCompliment(data) {
        return axios
            .post(Compliment, {
                customer_id: data.customer_id,
                start_date: data.start_date,
                room_category_id: data.room_category_id,
                price_type: 'hourly'
            }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }
    saveBooking(data) {
        return axios
            .post(Book, data, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }
    getDataBooking(data) {
        return axios.get(MyBook
            + '?location_id=' + data.location
            + '&room_category_id=' + data.service_type
            + '&customer_id=' + data.customer_id
            + '&start_date=' + data.date,
            { headers: authHeader() });
    }
    getDataBookingDetail(id) {
        return axios.get(MyBookingDetail + '/' + id,
            { headers: authHeader() });
    }
    getDataBookingActive(id) {
        return axios.get(BookingActive + '/' + id,
            { headers: authHeader() });
    }
    sendForgotPassword(data) {
        return axios
            .post(ForgotPassword, {
                email: data.email
            }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }
    sendResetPassword(data) {
        return axios
            .post(ResetPassword, {
                token: data.token,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword
            }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }
    updateProfile(data) {
        return axios
            .post(UpdateProfile, {
                user_id: data.user_id,
                name: data.name,
                mobile_phone: data.mobile_phone
            }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }

    setUpPeriod(type, data) {

        return axios.post(Period, {
            driven_by: type,
            price_type: "hourly",
            start_date: data.start_date,
            length_of_term: data.length_of_term,
            end_date: data.start_date,
            start_time: data.start_time,
            end_time: data.end_time,
            start_date_counted: "Y",
            date_format: ''
        }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });;
    }


}

export default new UserService();