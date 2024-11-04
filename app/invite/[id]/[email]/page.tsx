"use client";
import axios from "axios";
import { useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Box from "../../components/box";

interface Params {
  id: string;
  email: string;
}

const InviteFriends = () => {
  const { id, email } = useParams() as unknown as Params;
  const [userExist, setUserExist] = useState(false);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users?email=${email}`);
        setUserExist(!!response.data); 

        if (response.data) {
          await makeFriends();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  useEffect(() => {
    if(userExist) {
      router.push('/login')
    }
  }, [userExist])
  

  const makeFriends = async () => {
    try {
      const response = await axios.post('/api/inviteFriends', {
        mail: email,
        userId: id,
        action: "addFriend",
      });
      if(response.status === 200){
        toast.success(response.data.message)
      }
  
    } catch (error : any) {
      toast.error("something went wrong", error);
      console.error('Error inviting friend:', error);
    }
  };

  if (loading) return null; 

  return (
    <div>
      {userExist ? <p>User exists</p> : <Box mail={email} userId={id} />}
    </div>
  );
};

export default InviteFriends;