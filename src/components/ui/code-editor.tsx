import { useEffect, useRef, useState } from "react";
import { Textarea } from "./textarea"
import Prism from "prismjs"
import { Button } from "./button";
import { getWebContainerInstance } from "@/lib/web-container";
import type { WebContainer } from "@webcontainer/api";


const CodeEditor = () => {
    const [code, setCode] = useState(`
export function solve(param){
    // PUT YOUR CODE HERE
}
`.trim()
    )

    const [isRunning, setIsRunning] = useState(false)
    const [isContainerReady, setIsContainerReady] = useState(false)
    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    const webContainer = useRef<WebContainer>()

    useEffect(() => {
        buildWebContainer()
    }, [])


    const buildWebContainer = async () => {

        webContainer.current = await getWebContainerInstance()


        await webContainer.current.mount({
            'solve.js': {
                file: {
                    contents: code,
                },
            },
            'index.js': {
                file: {
                    contents: `
                    import { solve } from "./solve.js"

                    const error = (msg) => { throw new Error(msg) }

                    if(solve(123) === false) error("Test failed")

                    `,
                },
            },
            'package.json': {
                file: {
                    contents: ` {
                      "name": "solve",
                      "type": "module",
                      "scripts": {
                        "start": "node index.js"
                      }
                    }
                    `.trim(),
                },
            }
        })
        setIsContainerReady(true)
    }

    const handleExecution = async () => {

        setIsRunning(true)

        console.log('🚀 Running the application!')

        await webContainer.current!.fs.writeFile("solve.js", code)

        const start = await webContainer.current!.spawn('npm', ['start'])

        start.output.pipeTo(
            new WritableStream({
                write(data) {
                    console.log(data)
                },
            }),
        )

        const error = await start.exit

        if (error > 0) {
            alert("You're wrong")
        } else {
            alert("That's is my good")
        }

        setIsRunning(false)
    }

    return (
        <>
            <div className="min-h-[40vh] mb-2 relative">
                <Textarea
                    className="h-full absolute z-10 bg-transparent text-xl resize-none text-transparent-only"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                    className="h-full absolute whitespace-pre-wrap px-3 py-2 text-xl overflow-auto"
                />
            </div>
            <Button
                disabled={!isContainerReady}
                variant="secondary"
                className="self-end"
                onClick={handleExecution}>{isRunning ? "Running" : "Send"}</Button>
        </>
    )
}

CodeEditor.displayName = "CodeEditor"

export { CodeEditor }
