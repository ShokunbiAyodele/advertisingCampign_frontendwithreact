import React from 'react'

const PreveiwModal = ({HandldImagePreview,images}) => {
    // console.log(images)
  return (
    <div>
         <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex ">
     <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Gallery Preview
                </h3>
                <button onClick={HandldImagePreview} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-4 md:p-5 flex flex-wrap space-x-2 space-y-5">
            {
                images?.data?.map((image,index) => {
                    // console.log(image.path)
                    return <div className="flex items-center">
                      <img src={image.path} key={image.campaign_posts_id} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                      </div>
                })
            }
               
                
            </div>
        </div>
    </div>
   </div>
    </div>
  )
}

export default PreveiwModal