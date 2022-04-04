import Navigation from "../components/Navigation"
import Authentication from "../components/Authentication"
import { useState } from "react"


const Homepage = () => {
    
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const authToken = false

    const handleClick = () =>{
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <>
        <div className="layer">
             <Navigation 
                minimal= {false} 
                //authToken={authToken} 
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>

             <div className="home">
                <h1 className="main-title">Swipe Right™</h1>
                <button 
                    className="primary-button" 
                    onClick={handleClick}>
                    {authToken ? 'Se déconnecter' : 'Créer un compte'}
                </button>

                {showModal && (
                    <Authentication 
                    setShowModal={setShowModal} 
                    setIsSignUp={setIsSignUp} 
                    isSignUp={isSignUp}/>
                )}
            </div>
        </div>
        
       
        </>
       
    )
}

export default Homepage