import axios from "axios";

export default  axios.create({
    baseURL: 'https://react-quiz-8ddc5-default-rtdb.europe-west1.firebasedatabase.app/'
})