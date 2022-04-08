import {useEffect, useState} from "react"
import TinderCard from "react-tinder-card"
import Chat from "../components/Chat"
import axios from 'axios'
import {useCookies} from "react-cookie";

const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getGenderedUsers = async () =>{

        try{
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender : user?.gender_interest}
            })
            setGenderedUsers(response.data)
        }catch (err){
            console.log(err)
        }
    }

    useEffect( () => {
         getUser()
         getGenderedUsers()
    }, [user, genderedUsers])


    const updateMatches = async (matchedUserId) => {
        try{
            const response = await axios.put('http://localhost:8000/add', {
                userId,
                matchedUserId
            })
            setUser(response)
            getUser()
        }catch (e) {
            console.log(e)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if(direction === 'right'){
             updateMatches(swipedUserId)
        }
        console.log('removing: ' + swipedUserId)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            {user &&
                <div className="dashboard">
                    <Chat user={user}/>
                    <div className="swipe-container">
                        <div className="card-container">
                            {genderedUsers.map((character) =>
                                <TinderCard
                                    className='swipe'
                                    key={character.firstname}
                                    onSwipe={(dir) => swiped(dir, character.user_Id)}
                                    onCardLeftScreen={() => outOfFrame(character.firstname)}
                                >
                                    <div style={{backgroundImage: 'url(' + character.url + ')'}} className='card'>
                                        <h3>{character.firstname}</h3>
                                    </div>
                                </TinderCard>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection} </p> : <p/>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default Dashboard
