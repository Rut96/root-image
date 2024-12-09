import { ImageHistoryModel } from "../../../Models/ImageHistoryModel";
import "./Sidebar.css";

interface SidebarProps {
    images: ImageHistoryModel[];
    onImageSelect: (image: ImageHistoryModel) => void;
}

export function Sidebar(props: SidebarProps): JSX.Element {
    return (
        <div className="Sidebar">
            <h2>History</h2>
            <div className="image-list">
                {props.images.map((image) => (
                    <div 
                        key={image.id} 
                        className="history-item"
                        onClick={() => props.onImageSelect(image)}
                    >
                        <img src={image.url} alt={image.description} />
                        <div className="history-item-info">
                            <p className="description">{image.description}</p>
                            <p className="style">{image.style}</p>
                            <p className="timestamp">
                                {new Date(image.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
