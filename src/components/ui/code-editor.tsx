import { useEffect, useRef, useState, type ElementRef, type LegacyRef } from "react";
import { Textarea } from "./textarea"
import Prism from "prismjs"
import { Button } from "./button";
import { getWebContainerInstance } from "@/lib/web-container";
import type { WebContainer } from "@webcontainer/api";
import { useToast } from "./use-toast";
import { cn } from "@/lib/utils";


const CodeEditor = () => {

    const { toast } = useToast()

    const [code, setCode] = useState(`
export function solve(param){
    // PUT YOUR CODE HERE
}
`.trim()
    )

    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    const [isRunning, setIsRunning] = useState(false)
    const [isContainerReady, setIsContainerReady] = useState(false)
    const [textAreaHeight, setTextAreaHeight] = useState("40vh")


    const webContainer = useRef<WebContainer>()
    const highlightRef = useRef<LegacyRef<HTMLDivElement>>()

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
            toast({
                variant: "destructive",
                title: "Nope!!",
                description: "That's not the right answer, sorry mate!",
            })
        } else {
            toast({
                title: "Yayyy!!",
                description: "You nailed it, good job!",
            })
        }

        setIsRunning(false)
    }


    const autoGrow = (event: any) => {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
        setTextAreaHeight(event.target.scrollHeight + 'px')
    };

    return (
        <>
            <div className="h-[40vh] mb-2 relative overflow-auto border border-input">
                <Textarea
                    className="min-h-[40vh] h-full absolute z-10 bg-transparent text-xl resize-none text-transparent-only"
                    value={code}
                    onInput={autoGrow}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div
                    style={{ height: textAreaHeight }}
                    dangerouslySetInnerHTML={{ __html: html }}
                    className="h-full w-full absolute whitespace-pre-wrap px-3 py-2 text-xl overflow-auto"
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
