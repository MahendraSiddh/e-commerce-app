import React from 'react'
import kidsData from '../content/kidsData'
import Card from '../components/common/Card'


const Kids = () => {
  return (
    <div>
      
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center' >
        {
           kidsData.map((card,index)=>(

            <div key={index} >
                <Card card={card} />
             </div>
           ))
        }
      </div>
    </div>
  )
}

export default Kids;