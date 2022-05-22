import ApiRequest from "../utility/ApiRequest"

export default class CompanyProfile {
    getAll = async () => {
        return await ApiRequest.set("/sjph/company_profiles", "GET")
    }

    getById = async (company_profile_id) => {
        return await ApiRequest.set(`/sjph/company_profile/${company_profile_id}`, "GET")
    }

    createKebijakanHalal = async (body) => {
        return await ApiRequest.set(`/sjph/kebijakan_halal`, 'POST', body)
    }

}
