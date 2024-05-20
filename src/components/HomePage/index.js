import "./index.css"
import {Link} from 'react-router-dom';

export const HomePage = () => {
    return(
        <div className = "home-page">
            <h3>What are you looking for...</h3>
            <div className = "home-buttons">
                <Link to = "/formPage"><button className="home-button new-button">New Enrollement</button></Link>
                <Link to = "/view"><button className="home-button details-button">See Details of Patients</button></Link>
            </div>
        </div>
    )
}