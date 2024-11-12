import axios from "axios";

// A mock function to mimic making an async request for data
export const fetchSplits = async (id : number) => {
    // const session =  await getServerSession();
    const response = await axios.get(`/api/splits?action=getSpltByTranactionId&transactionId=${id}`)
    return response.data;
};
  