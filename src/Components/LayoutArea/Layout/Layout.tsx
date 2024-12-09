import { Generator } from "../../AiArea/Generator/Generator";
import { Header } from "../Header/Header";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className="layout-content">
                <Header />
                <main>
                    <Generator />
                </main>
            </div>
        </div>
    );
}
