import { atom, useAtomValue } from 'jotai'

export const attempsAtom = atom(0)

const AttemptIndicator = () => {

    const attemps = useAtomValue(attempsAtom)
    return <div className="flex flex-row gap-2">
        <div className={`h-6 w-6 rounded-[50%] ${attemps > 0 ? "bg-red-700" : "bg-gray-700"} `} />
        <div className={`h-6 w-6 rounded-[50%] ${attemps > 1 ? "bg-red-700" : "bg-gray-700"} `} />
        <div className={`h-6 w-6 rounded-[50%] ${attemps > 2 ? "bg-red-700" : "bg-gray-700"} `} />
    </div>
}

AttemptIndicator.displayName = "AttemptIndicator"

export { AttemptIndicator }

