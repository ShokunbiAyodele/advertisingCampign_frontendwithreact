import { useEffect, useState } from "react"
import Aside from "./Aside"
import { Link } from "react-router-dom"
import PageLink from "./PageLink"
import PreveiwModal from "./PreveiwModal"

const ReadCampaign = () => {
    const [campaigns, setCampaigns] = useState([])
    const [showImage, setShowImage] = useState(false)
    const [newId, setNewId] = useState('')
    const [images, setImages] = useState([])




    const getCampaign = async() => {
        const campaignData = await fetch('http://127.0.0.1:8000/api/getcampaign')
        const campaignResp = await campaignData.json()
        setCampaigns(campaignResp)
    }

    useEffect(()=> {
        getCampaign()
    },[])
    
    const HandldImagePreview = (e) => {
        setShowImage(!showImage)
        // const previewId = document.getElementById('previewId').dataset.image
        setNewId(e.target.id)
    }

    useEffect(()=> {
        if(showImage){
            const fetchImages =async() => {
             const data = await fetch('http://127.0.0.1:8000/api/loadimages/'+newId)

             const res = await data.json()
             setImages(res)
            //  console.log(res)
        }
        fetchImages()   
}},[newId])

   

    
  return (
    <div>
         <Aside link="Create Campaing Page" page='/'/>
           <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
            <h1 className="text-3xl font-medium text-gray-500">Campaign Records Table</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=" font-semibold text-gray-500 text-sm">
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    To
                </th>
                <th scope="col" class="px-6 py-3">
                    From
                </th>
                <th scope="col" class="px-6 py-3">
                    Daily Budget
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Budget
                </th>
                <th scope="col" class="px-6 py-3">
                    Edit
                </th>
                <th scope="col" class="px-6 py-3">
                    Preview Creative Upload
                </th>
            </tr>
        </thead>
        {campaigns.data?.map(campaign => (
                         <tbody>
                         <tr key={campaign.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                       
                             <td  class="px-6 py-4">
                                 {campaign.name}
                             </td>
                             <td key={campaign.id} class="px-6 py-4">
                                 {campaign.to}
                             </td>
                             <td  class="px-6 py-4">
                             {campaign.from}
                             </td>
                             <td  class="px-6 py-4">
                             {campaign.dailyBudget}
                             </td>
                             <td  class="px-6 py-4">
                             {campaign.totalBudget}
                             </td>
                             <td  class="px-6 py-4 text-left">
                                <PageLink action ='Edit' path={`/editCampaign/${campaign.id}`}/>
                             </td>
                             <td class="px-6 py-4 text-left">
                             <button data-modal-target="default-modal" id={campaign.id} onClick={HandldImagePreview} data-modal-toggle="default-modal" class="block text-white bg-gray-200 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                             <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
                            </svg>

                                </button>
                                </td>
                         </tr>
                     </tbody>
                    ))}
                  
                </table>
            </div>

            </div>
            </div>
            {
                showImage && <PreveiwModal HandldImagePreview={HandldImagePreview} images={images}/>
            }

    </div>
  )
}

export default ReadCampaign