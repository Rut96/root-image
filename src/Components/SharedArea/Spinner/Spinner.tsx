import "./Spinner.css";
import loading from "../../../assets/images/loading.webp"; 


export function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={loading} />
        </div>
    );
}
