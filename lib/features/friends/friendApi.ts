import axios from "axios";

// A mock function to mimic making an async request for data
export const fetchFriends = async (id : number) => {
    // const session =  await getServerSession();
    const response = await axios.get(`/api/friends?userId=${id}&action=getFriendByUserId`)
    return response.data;
};
  