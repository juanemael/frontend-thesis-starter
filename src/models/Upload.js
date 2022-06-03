import ApiRequest from "../utility/ApiRequest";


export default class Upload {

    uploadImage = async (body) => {
        return await ApiRequest.setMultipart('/util/upload/file',"POST", body);
    }

}
