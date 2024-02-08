import { useState } from "react";
import { Textarea } from "./textarea"
import Prism from "prismjs"
import { Button } from "./button";


const CodeEditor = () => {
    const [code, setCode] = useState(`
export function solve(param){
    // PUT YOUR CODE HERE
}
`.trim()
    )
    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    const handleExecution = () => {
        console.log({ code })
    }

    return (
        <>
            <div className="min-h-[30vh] mb-2 relative">
                <Textarea
                    className="h-full absolute z-10 bg-transparent text-xl resize-none"
                    style={{
                        "-webkit-text-fill-color": "transparent"
                    }}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className="h-full absolute whitespace-pre-wrap px-3 py-2 text-xl overflow-auto"
                />
            </div>
            <Button variant="secondary" className="self-end" onClick={handleExecution}>Send</Button>
        </>
    )
}

CodeEditor.displayName = "CodeEditor"

export { CodeEditor }
