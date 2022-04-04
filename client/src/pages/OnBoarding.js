import { useState } from "react"
import Navigation from "../components/Navigation"

const OnBoarding = () => {


    const [formData, setFormData] = useState({
        user_Id: '',
        firstname: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        display_gender: false,
        gender_identity: 'woman',
        gender_interest: 'man',
        email: '',
        url: '',
        about: '',
        matches: []
    })


    const handleSubmit = () => {
        console.log("Submited for now")
    }

    const handleChange = (e) => {
        console.log("e", e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    console.log(formData)

    return (
        <>
            <Navigation
                minimal={true}
                setShowModal={() => {}}
                showModal={false}
            /> 
            <div className="onboarding">
                <h2>Créer un compte!</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="firstnam">Prénom</label>
                        <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            placeholder="Prénom"
                            value={formData.firstname}
                            onChange={handleChange}
                            required={true}
                        />

                        <label htmlFor="dob-">Date de Naissance</label>
                        <div className="multiple-input-container">

                            <input
                                id="dob-day"
                                type="number"
                                name="dob_day"
                                placeholder="Jour"
                                value={formData.dob_day}
                                onChange={handleChange}
                                required={true}
                            />
                            <input
                                id="dob-month"
                                type="number"
                                name="dob_month"
                                placeholder="Mois"
                                value={formData.dob_month}
                                onChange={handleChange}
                                required={true}
                            />
                            <input
                                id="dob-year"
                                type="number"
                                name="dob_year"
                                placeholder="Année"
                                value={formData.dob_year}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>

                        <label>Genre</label>
                        <div className="multiple-input-container">
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            />
                            <label htmlFor="woman-gender-identity">Femme</label>
                             <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            />
                            <label htmlFor="man-gender-identity">Homme</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'more'}
                            />
                            <label htmlFor="more-gender-identity">Plus</label>
                        </div>  

                        <label className="display-gender">Afficher mon genre sur mon profil</label>
                        <input 
                             id="display-gender"
                             type="checkbox"
                             name="display_gender"
                             onChange={handleChange}
                             checked={formData.display_gender}
                        />

                        <label>Afficher</label>
                        <div className="multiple-input-container">
                            <input
                                id="woman-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'woman'}
                            />
                            <label htmlFor="woman-gender-interest">Femme</label>
                             <input
                                id="man-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'man'}
                            />
                            <label htmlFor="man-gender-interest">Homme</label>
                            <input
                                id="more-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'everyone'}
                            />
                        </div>

                        <label htmlFor="about">A Propos</label>
                            <input
                                id="about"
                                type="text"
                                name="about"
                                placeholder="J'aime la nature..."
                                value={formData.about}
                                onChange={handleChange}
                                required={true}
                            />
                            <input type="submit"/>
                    </section>

                    <section>
                        <label htmlFor="about">Profil</label>
                        <input
                            id="url"
                            type="url"
                            name="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="pictures-profil-container">
                            <img src={formData.url} alt="Profil img"/>
                        </div>
                    </section>
                  
                </form>
            </div>
        </>
    )
}

export default OnBoarding