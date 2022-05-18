
import apiConfig from "./ApiConfig"

export default class ApiRequest {
    static set = async (endpoint, method, body) => {

        const token = sessionStorage.token || localStorage.token

        // console.log('API ACCESS: ' + token);
        console.log('BODY', JSON.stringify(body))
        const request = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `bearer ${token}` : null,
                Accept: 'application/json'
            },
            body: JSON.stringify(body)
            // body: "afdadsf"

        }

        const response = await fetch(apiConfig.base_url + endpoint, request)

        if (response.ok) {
            return response.json()
        }

        const error = await response.json()
        console.log(error)
        console.log(error.msg)

        if (error.code === 'JWT_EXPIRED' || error.code === 'NO_TOKEN_PROVIDED' || error.code === 'INVALID_TOKEN' || error.code === 'BAD_TOKEN_FORMAT' || error.code === 'NO_SECRET_DEFINED' || error.error_message === 'JWT_MALFORMED' || error.error_message?.msg === 'JWT_MALFORMED' || error.error_message === 'JWT_EXPIRED' || error.code === "SUBSCRIPTION_EXPIRED") {
            delete sessionStorage.token
            delete localStorage.token
            // alert('Login timeout')
            window.location.reload()
            throw error
        }

        throw error
    }

    static setMultipart = async (endpoint, method, body) => {
        const token = sessionStorage.token || localStorage.token

        const response = await fetch(apiConfig.base_url + endpoint, {
            method,
            headers: {
                Authorization: token ? `bearer ${token}` : null,
                'Access-Control-Allow-Origin': '*'
            },
            body
            // body: "afdadsf"
        })

        if (response.ok) {
            console.log(response)

            return response.json()
        } else {

            const error = await response.json()

            console.log(error)

            throw error
        }
    }
}
