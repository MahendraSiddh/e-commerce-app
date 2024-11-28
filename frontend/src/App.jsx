import React from 'react'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/footer/Footer'
import footerContent from './content/footerContent.json'
const App = () => {
  return (
    <div className='flex flex-col'>
      <Navbar/>
      <div className='h-96 bg-slate-600'></div>
       
      <Footer content={footerContent}/>
    </div>
  )
}

export default App