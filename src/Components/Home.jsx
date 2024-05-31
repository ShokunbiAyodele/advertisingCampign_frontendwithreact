import Aside from "./Aside"
import CreateCampaign from "./CreateCampaign"


const Home = () => {
    return (
        <div>
           <Aside link="Read Campaign Page" page='/readCampaign'/>
            <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
                <CreateCampaign/>
            </div>
            </div>

        </div>
    )
}
export default Home