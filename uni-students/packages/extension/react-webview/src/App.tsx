import { useEffect, useState } from 'react'
import './App.css'

interface Model {
    students?: { name: string; age: number }[];
    disciplines?: { name: string }[];
    university?: { name: string }[];
}

function App() {
    const [model, setModel] = useState<Model | null>(null);
    function acquireVsCodeApi() {
      throw new Error('Function not implemented.');
    }


    useEffect(() => {
        const vscode = acquireVsCodeApi(); // VS Code API injected into webview
        const vscode_messenger = require("vscode-messenger-webview");
        const messenger = new vscode_messenger.Messenger(vscode);

        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === 'setModel') {
                setModel(message.payload);
            }
        });

        messenger.start(); // start listening for incoming events
    }, []);

    
    if (!model) return <div>Waiting for data...</div>;

    return (
        <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
            <h1>University Model</h1>

            <h2>Students</h2>
            <ul>
                {model.students?.map((s, i) => (
                    <li key={i}>
                        {s.name} ({s.age} years old)
                    </li>
                ))}
            </ul>

            <h2>Disciplines</h2>
            <ul>
                {model.disciplines?.map((d, i) => (
                    <li key={i}>{d.name}</li>
                ))}
            </ul>

            <h2>Universities</h2>
            <ul>
                {model.university?.map((u, i) => (
                    <li key={i}>{u.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default App

