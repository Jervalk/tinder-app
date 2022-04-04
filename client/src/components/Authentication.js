import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Authentication = ({setShowModal, isSignUp}) => {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    let navigate = useNavigate();
    console.log(email, password, confirmPassword)


    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(isSignUp && (password!== confirmPassword)){
                setError("Password is not the same!")
                return
            }else {
                const res = await axios.post('http://localhost:8000/signup', {email, password})

                const success = res.status === 201

                if(success) navigate('/onboarding')
            }


        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div className="authentication-modal">
            <div className="close-modal" onClick={handleClick}>x</div>
            <h2>{isSignUp ? 'Créer un compte' : 'Connexion'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy.</p>
             <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-confirmed"
                    name="password-confirmed"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="confirm-log-btn" type="submit"/>
                <p>{error}</p>
             </form>
             <hr/>
             <h2>GET THE APP</h2>
        </div>
    )
}

export default Authentication
