import axios from "axios"

const Repository = {
    fetchOrganizations: () => {
        return axios.get("https://tim9.smetkovodstvo.com/api/login");
    }
}

export default Repository;