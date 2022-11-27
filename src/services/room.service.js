import axios from 'axios';
import authHeader from './auth-header';
import {
    Rooms,
    RoomAvailable
} from '../utils/config'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
class RoomService {
    getDetailRoom(id) {
        return axios.get(Rooms + '/' + id, { headers: authHeader() });
    }
    getRoomAvail(data) {
        return axios
            .post(RoomAvailable, {
                room_id: data.room_id,
                start_date: data.start_date,
                start_time: data.start_time,
                end_time: data.end_time
            }, { headers: authHeader() })
            .then(response => {
                var data = response.data.data;

                return data;
            });
    }

}

export default new RoomService();