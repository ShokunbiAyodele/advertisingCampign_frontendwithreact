import { useEffect, useState } from "react"
import MessageAlert from "./MessageAlert"
import { useNavigate,useParams } from "react-router-dom"
import Aside from "./Aside"

const EditCampaign = ()=> {
    const [name,setName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [dailyBudget, setDailyBudget] = useState('')
    const [totalBudget, settotalBudget] = useState('')
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate()
    const { campaignId} = useParams();
    const [campaignData, setCampaignData] = useState(null);
    
    

    const HandleNameChanged =(event) => {
        setName(event.target.value)
    }

    const HandleFromChanged = (event) => {
        setFrom(event.target.value)
    }
    const HandleToChanged = (event) => {
        setTo(event.target.value)
    }
    const HandleDailyBudgetChanged = (event) => {
        setDailyBudget(event.target.value)
    }
    const HandleTotalBudgetChanged = (event) => {
        settotalBudget(event.target.value)
    }

    const handleFileChange = (event)=> {
        setFiles(event.target.files);
    }


     // Fetch campaign data or perform other logic using the ID
     useEffect(() => {
        // Replace with your actual data fetching logic
        const fetchCampaignData = async () => {
          // Example API call
          const response = await fetch(`http://127.0.0.1:8000/api/getcampaign/${campaignId}`);
          const data = await response.json();
          setCampaignData(data);
          setName(data?.name)
          setFrom(data?.from)
          setTo(data?.to)
          setDailyBudget(data?.dailyBudget)
          settotalBudget(data?.totalBudget)
        };
    
        fetchCampaignData();
      }, [campaignId]);


    const HandleSubmit = async(event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('from', from)
        formData.append('to',to)
        formData.append('dailyBudget', dailyBudget)
        formData.append('totalBudget', totalBudget)

        Array.from(files).forEach((file, index) => {
            formData.append(`files[${index}]`, file);
          });
          
        try {
            const updateCampaign = await fetch('http://127.0.0.1:8000/api/updatecampaign/'+campaignId,{
                method : 'POST',
                headers : {'Accept': 'application/json'},
                body :  formData
        }) 
        if(!updateCampaign.ok){
            throw new Error('Network response was not ok ' + updateCampaign.statusText);
        }
        const response = await updateCampaign.json()
        console.log(response)
        if(response.status == 'ok'){
            setMessage(true)
            setTimeout(() => {
                setMessage(false)
            }, 5000);
            navigate('/readCampaign')
        }

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
        
    }
    return (
        <div>
      <Aside link="Go to create campaign page" page='/'/>
         <div className="p-4 sm:ml-64">
         <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
         <div className="w-4/5 bg-gray-300 mx-auto text-2xl h-1/2 mb-20 translate-x-10 opacity-3 space-x-5 space-y-5">
            {message ? <MessageAlert message="campaign updated"/> : ''}
            <h1 className="text-3xl text-gray-500 text-center m-5 mt-10 space-x-4 space-y-2 font-medium">Edit Campaign</h1>
            <form onSubmit={HandleSubmit} encType="multipart/form-data" className="mt-20 mx-auto rounded-lg">
                <div className="grid gap-6 mb-6 md:grid-cols-3 font-semibold">
                    <div>
                        <label for="" className="block mb-2  text-gray-900 dark:text-white font-semibold text-2xl">Name</label>
                        <input type="text" onChange={HandleNameChanged} value={name}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-gray-900 dark:text-white font-semibold text-2xl">(Date)From</label>
                        <input type="date" onChange={HandleFromChanged} value={from} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="campaign start date"/>
                    </div>
                    <div>
                        <label for="company" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">(Date)To</label>
                        <input type="date" onChange={HandleToChanged} value={to}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="campaign end date"/>
                    </div>  
                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Daily Budget</label>
                        <input type="text" onChange={HandleDailyBudgetChanged} value={dailyBudget}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your daily budget"/>
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Total Budget</label>
                        <input type="text" onChange={HandleTotalBudgetChanged} value={totalBudget}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your total budget"/>
                    </div>

                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Image Upload</label>
                        <input type="file" onChange={handleFileChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple/>
                    </div>
                </div>
                <button type="submit" className="text-white bg-gray-700 hover:bg-gray-200 hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center uppercase dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 mb-2">Update</button>
            </form>
        </div>

         </div>
         </div>

     </div>
    )
}

export default EditCampaign