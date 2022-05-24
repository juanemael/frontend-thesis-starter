import ApiRequest from "../utility/ApiRequest"

export default class CompanyProfile {
    getAll = async () => {
        return await ApiRequest.set("/sjph/company_profiles", "GET")
    }

    getById = async (company_profile_id) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "GET")
    }

    changePassword = async (company_profile_id, body) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "POST", body)
    }

    createCompanyProfile = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/company_profile/${sjph_id}`, 'POST', body)
    }

    editCompanyProfile = async (sjph_id,company_profile_id,body) => {
        return await ApiRequest.set(`/sjph/company_profile/${sjph_id}/${company_profile_id}`, 'PUT', body)
    }

}
