import { Camera, Sparkles, Palette } from "lucide-react";
import "./Header.css";

export function Header(): JSX.Element {
    return (
        <header className="main-header">
            <div className="header-decoration left">
                <Palette className="icon palette" size={32} />
                <div className="decoration-line"></div>
            </div>

            <div className="header-content">
                <div className="title-wrapper">
                    <Camera className="icon camera" size={28} />
                    <h1>AI Image Generator</h1>
                    <Sparkles className="icon sparkles" size={28} />
                </div>
                <p className="subtitle">Transform your ideas into stunning visuals</p>
            </div>

            <div className="header-decoration right">
                <div className="decoration-line"></div>
                <Sparkles className="icon sparkles" size={32} />
            </div>
        </header>
    );
}