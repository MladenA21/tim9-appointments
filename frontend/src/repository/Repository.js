import axios from "../custom-axios/customAxios";

const Repository = {
    fetchOrganizations: () => {
        return axios.get("/api/organizations");
    }
}

export default Repository;