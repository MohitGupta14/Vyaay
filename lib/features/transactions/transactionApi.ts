import axios from "axios";

// A mock function to mimic making an async request for data
export const fetchTransactions = async (id : number) => {
    // const session =  await getServerSession();
    const response = await axios.get(`/api/transactions?action=getTranactionByGroupId&groupId=${id}`)
    return response.data;
};
  