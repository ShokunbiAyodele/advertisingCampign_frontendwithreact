import { useState } from "react"
import MessageAlert from "./MessageAlert"
import { useNavigate} from "react-router-dom"

const CreateCampaign = ()=> {

    const [name,setName] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [dailyBudget, setDailyBudget] = useState('')
    const [totalBudget, settotalBudget] = useState('')
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate()

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
            const postCampaign = await fetch('http://127.0.0.1:8000/api/createcampaign',{
            method : 'POST',
            headers : {'Accept': 'application/json'},
            body :  formData
        })
        if(!postCampaign.ok){
            throw new Error('Network response was not ok ' + postCampaign.statusText);
        }
        const response = await postCampaign.json()
        if(response.status === 'ok'){
            setMessage(true)
            setTimeout(() => {
                setMessage(false)
            }, 10000);
            if(message ===false){
                navigate('/readCampaign')
            }
        }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
        
    }
    return (
        <div className="w-4/5 bg-gray-300 mx-auto text-2xl h-1/2 mb-20 translate-x-10 opacity-3 space-x-5 space-y-5">
            {message ? <MessageAlert message="campaign added"/> : ''}
            <h1 className="text-3xl text-gray-500 text-center m-5 mt-10 space-x-4 space-y-2 font-medium">Create Campaign</h1>
            <form onSubmit={HandleSubmit} encType="multipart/form-data" className="mt-20 mx-auto rounded-lg">
                <div className="grid gap-6 mb-6 md:grid-cols-3 font-semibold">
                    <div>
                        <label for="first_name" className="block mb-2  text-gray-900 dark:text-white font-semibold text-2xl">Name</label>
                        <input type="text" onChange={HandleNameChanged} value={name}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="campaign name" required />
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-gray-900 dark:text-white font-semibold text-2xl">(Date)From</label>
                        <input type="date" onChange={HandleFromChanged} value={from} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="campaign start date" required />
                    </div>
                    <div>
                        <label for="company" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">(Date)To</label>
                        <input type="date" onChange={HandleToChanged} value={to}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="campaign end date" required />
                    </div>  
                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Daily Budget</label>
                        <input type="number" pattern="[0-9]*" inputmode="numeric" onChange={HandleDailyBudgetChanged} value={dailyBudget}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your daily budget" required/>
                    </div>
                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Total Budget</label>
                        <input type="number" pattern="[0-9]*" inputmode="numeric" onChange={HandleTotalBudgetChanged} value={totalBudget}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your total budget in number" required/>
                    </div>

                    <div>
                        <label for="" className="block mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Image Upload</label>
                        <input type="file" onChange={handleFileChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple required/>
                    </div>
                </div>
        
                <button type="submit" className="text-white bg-gray-700 hover:bg-gray-200 hover:text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center uppercase dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 mb-2">Create</button>
            </form>
        </div>
    )
}



export default CreateCampaign