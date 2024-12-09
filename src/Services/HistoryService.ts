import { ImageHistoryModel } from "../Models/ImageHistoryModel";

class HistoryService {
	private readonly STORAGE_KEY = "generated-images";

    public saveImage(image: ImageHistoryModel): void {
        const images = this.getImages();
        images.unshift(image);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(images));
    }

    public getImages(): ImageHistoryModel[] {
        const images = localStorage.getItem(this.STORAGE_KEY);
        return images ? JSON.parse(images) : [];
    }

    public clearHistory(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}

export const historyService = new HistoryService();
