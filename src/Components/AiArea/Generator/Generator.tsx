import { useForm } from "react-hook-form";
import "./Generator.css";
import { ParamsModel } from "../../../Models/ParamsModel";
import { generatorService } from "../../../Services/GeneratorService";
import { promptEngineeringService } from "../../../Services/PromptEngineeringService";
import { useState } from "react";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import { ImageHistoryModel } from "../../../Models/ImageHistoryModel";
import { historyService } from "../../../Services/HistoryService";
import { v4 as uuidv4 } from 'uuid';
import { Sidebar } from "../../LayoutArea/Sidebar/Sidebar";

export function Generator(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<ParamsModel>();
    const [imageUrl, setImageUrl] = useState<string>(null);
    const [images, setImages] = useState<ImageHistoryModel[]>(historyService.getImages());

    async function send(params: ParamsModel) {
        try {
            setImageUrl("");
            const prompt = promptEngineeringService.getPrompt(params);
            const imageUrl = await generatorService.generateImage(prompt);
            setImageUrl(imageUrl);

            // Save to history
            const newImage: ImageHistoryModel = {
                id: uuidv4(),
                url: imageUrl,
                description: params.description,
                style: params.style,
                timestamp: Date.now()
            };
            historyService.saveImage(newImage);
            setImages(historyService.getImages());

        } catch (err: any) {
            alert(err.message);
        }
    }

    function handleImageSelect(image: ImageHistoryModel) {
        setImageUrl(image.url);
        setValue("description", image.description);
        setValue("style", image.style);

    }

    return (
        <div className="Generator">
            <div className="generator-form-section">
                <form onSubmit={handleSubmit(send)}>
                    <label>Image Description</label>
                    <textarea {...register("description")}></textarea>

                    <label>Image Style</label>
                    {/* <input type="text" {...register("style")} /> */}
                    <input list="styles" type="text" {...register("style")} autoComplete="off" />
                    <datalist id="styles">
                        <option value="Realism" />
                        <option value="Impressionism" />
                        <option value="Expressionism" />
                        <option value="Cubism" />
                        <option value="Surrealism" />
                        <option value="Baroque" />
                        <option value="Renaissance" />
                        <option value="Abstract" />
                        <option value="Pop Art" />
                        <option value="3D" />
                        <option value="Art Nouveau" />
                        <option value="The Simpsons" />
                        <option value="Free Style" />
                    </datalist>

                    <button>Generate</button>
                </form>

                <div className="preview-area">
                    {imageUrl === "" && <Spinner />}
                    {imageUrl !== "" && <img src={imageUrl} />}
                </div>
            </div>

            <div className="history-section">
                <h2>Generated Images</h2>
                {images.length === 0 ? (
                    <div className="empty-state">
                        <p>No images generated yet. Try creating your first one!</p>
                    </div>
                ) : (
                    <div className="history-grid">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="history-card"
                                onClick={() => handleImageSelect(image)}
                            >
                                <img src={image.url} alt={image.description} />
                                <div className="history-card-info">
                                    <p className="description">{image.description}</p>
                                    <p className="style">{image.style}</p>
                                    <p className="timestamp">
                                        {new Date(image.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

