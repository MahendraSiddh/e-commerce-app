import React from 'react'

const Card = (props) => {
    const card = props.card;
  return (
    <div class="flex flex-col mt-4  shadow-md bg-clip-border rounded-xl w-80">
  <div
    className="h-56 overflow-hidden  shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
    <img
      src={card.img}
      alt="course-image" />
  </div>
  <div class="p-6 ">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {card.type}
    </h5>
    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
    {card.discription.length>150?(card.discription.substring(0,150)+"..."):(card.discription)}
    </p>
  </div>
  <div className="p-6 ">
    
  <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add to Bag</button>

  </div>
</div>  
  )
}
export default Card;