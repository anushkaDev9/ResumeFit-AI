import React from 'react'
import * as motion from "motion/react-client"
import { Link } from 'react-router-dom';
const Card = ({title,subTitle,des,link}) => {
  return (
    <motion.div className='div-card'  whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.2 }}
            >
        <h3 className='title'>{title}</h3>
        <p className='subtitle'>{subTitle}</p>
        <p className='des'>{des}</p>
        <Link to={link} style={{ textDecoration: 'none' }}>
        <button className='btn'> 
         
          Try it out
          </button>
        </Link>
        
    </motion.div>
  )
}

export default Card 