import { cyber } from "./cyber";

class AppConfig {
	public readonly dalleUrl = process.env.REACT_APP_DALLE_URL;
    private readonly cypherApiKey = process.env.REACT_APP_ROOT;

    public get apirKey():string {
        return cyber.decrypt(this.cypherApiKey);
    }
}

export const appConfig = new AppConfig();
