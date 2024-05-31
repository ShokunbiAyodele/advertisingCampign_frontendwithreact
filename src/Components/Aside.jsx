
import React from 'react'
import PageLi from './PageLi'

export const Aside = ({link,page}) => {
  return (
    <div className='flex items-center justify-center '>
         <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium mt-20">
                 <PageLi pagetype={link} page={page}/>
                </ul>
            </div>
            </aside>
    </div>
  )
}

export default Aside
