import Api from "./Api"
import { GET_BARS } from "./EndPoints";

export const getBars = async () => {
    const res = await Api.get(GET_BARS);
    return res;
}