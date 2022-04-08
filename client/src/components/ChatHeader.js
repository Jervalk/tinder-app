import {useCookies} from "react-cookie";
import {useNavigate} from 'react-router-dom'


const ChatHeader = ({user}) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    let navigate = useNavigate();

    const logout = () =>{
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
        window.location.reload()

    }

    return (
        <div className="chat-header-container">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"Picture of " + user.firstname}/>
                </div>
                <h3>{user.firstname}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}

export default ChatHeader
