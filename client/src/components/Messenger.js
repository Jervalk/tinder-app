import { useState } from "react"

const Messenger = () => {

    const [textArea, setTextArea] = useState(null)
    return (
        <div className="messenger">
            <textarea value={""} onChange={((e) => setTextArea(e.target.value))}/>
            <button className="confirm-log-btn">Envoyer</button>
        </div>

    )
}

export default Messenger