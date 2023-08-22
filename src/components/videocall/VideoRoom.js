import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import axiosInstance from '../../validations/AxiosInstance'

const Room = () => {
    const {roomId}=useParams();

//     const myMeeting = async(element)=>{
//         const appId=351359231;
//         const serverSecret = "abdbc282d9d8f923de12119e34841ab1";
//         const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId,Date.now().toString(),"Prachi K");
//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//               zp.joinRoom({
//               container: element,
//               sharedLinks: [
//               {
//                name: 'copy link',
//                url:`http://localhost:3000/room/${roomId}`
//               },
//        ],
//         scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//     },
//   });   
// }

const myMeeting = async (element) => {
    try {
      const response = await axiosInstance.post('/videoCall/generateToken', {
        roomId: roomId, // Pass the roomId from useParams()
        userId: 'Prachi K', // Set the user's ID here
      });
  
      if (response.status === 200) {
        const kitToken = response.data.kitToken;
        
        // Now, use the kitToken for your Zego video call setup
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: 'copy link',
              url: `http://localhost:3000/room/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      } else {
        console.error('Failed to fetch video call token:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching video call token:', error);
    }
  };
  




  return (
    <div>
     <div ref={myMeeting}/> 
    </div>
  )
}

export default Room
