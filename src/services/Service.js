import ApiContant from '@/constant/ApiConstants';
import axios from 'axios'

const ApiService = {}
const headers = function() {
    let header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return header;
}
ApiService.getHome = async function() {
    return await axios.get(ApiContant.home,
            headers())
        .then((response) => {
            return response;
        }).catch(function(error) {
            return error;
        })
};

export default ApiService;