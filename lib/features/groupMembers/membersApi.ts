import axios from "axios";

// A mock function to mimic making an async request for data
export const fetchGroupMembers = async (id : number) => {
    // const session =  await getServerSession();
    const response = await axios.get(`/api/groups?action=getGroupById&groupId=${id}`)
    return response.data.members;
};
  