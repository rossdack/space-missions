import axios from 'axios';

class DataSource {

    getLaunches() {
        return axios.get('http://localhost:8001/launches',
            {});
    }

    getPads() {
        return axios.get('http://localhost:8001/launchpads',
            {});
    }
}


export default DataSource;