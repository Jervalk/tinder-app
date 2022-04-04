import logo from "../utils/images/red-tinder-logo.png";
import coloredLogo from "../utils/images/white-tinder-logo.png" 

const Navigation = ({minimal, setShowModal, showModal, setIsSignUp}) => {

    const authToken = false

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    
    return (
        <nav>
            <div className="img-logo-container">
                <img className="logo" src={minimal ?  logo : coloredLogo}></img>
            </div>
            {!authToken &&  !minimal && 
                <button 
                    className="log-button"
                    onClick={handleClick}
                    disabled={showModal}
                >Connexion
                </button>
            }
        </nav>
    )
}

export default Navigation 