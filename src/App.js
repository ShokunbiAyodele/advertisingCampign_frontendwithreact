import EditCampaign from "./Components/EditCampaign";
import Home from "./Components/Home";
import ReadCampaign from "./Components/ReadCampaign";
import {Routes, Route } from "react-router-dom";


function App() {
  return (   
    <div className="">
        <Routes>
                <Route path="/readCampaign/" element={<ReadCampaign/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/editCampaign/:campaignId" element={<EditCampaign/>}/>
         </Routes>

       
      {/* <CreateCampaign/> */}
       
    </div>
  );
}

export default App;
