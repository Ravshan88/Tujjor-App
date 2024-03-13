import './DashboardButton.css'
import {useNavigate} from "react-router-dom";

function DashboardButton(props) {
    const navigate = useNavigate();
    function navigateButtonFunc() {
        localStorage.setItem("sidebar_button", props.id)
        navigate(props.path)
    }


    return (
        <div className={props.class} onClick={()=> navigateButtonFunc()}>
            <button>
                {props.icon}
                <span>{props.title}</span>
            </button>
        </div>
    );
}

export default DashboardButton;