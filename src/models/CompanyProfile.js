import ApiRequest from "../utility/ApiRequest"

export default class CompanyProfile {
    getAll = async () => {
        return await ApiRequest.set("/sjph/company_profiles", "GET")
    }

    getById = async (company_profile_id) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "GET")
    }

    deleteUser = async (company_profile_id) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "DELETE")
    }

    updateUser = async (company_profile_id, body) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "PUT", body)
    }

    changePassword = async (company_profile_id, body) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "POST", body)
    }

    createCompanyProfile = async (body) => {
        return await ApiRequest.set(`/sjph/company_profile`, 'POST', body)
    }

}
