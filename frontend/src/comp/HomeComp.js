import React from 'react'
import { GiCrystalGrowth } from "react-icons/gi";
import { Link } from 'react-router-dom';
const HomeComp = () => {
  return (
  <header className="navbar-glass">
  <div className="brand">
    <GiCrystalGrowth className="brand-icon" size={34} />
    <Link to="/"><h1 className="brand-text">ResumeFit AI</h1></Link>
  </div>
</header>
  )
}

export default HomeComp