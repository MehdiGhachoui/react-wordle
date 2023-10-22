import { keyboard } from "../helpers/data";

interface KeyboardProps {
    handleCorrect: () => void;
    handleDelete: () => void;
    handleAnswer: (letter: string) => void;
}

export default function Keyboard({ handleCorrect, handleDelete, handleAnswer, }: KeyboardProps) {
    return (
        <div className="keyboard">
            {keyboard.map((keys, rowIndex) => (
                <div key={rowIndex}>
                    {keys.map((key, keyIndex) => (
                        <button key={keyIndex} onClick={key === "Enter" ? () => handleCorrect() : key === "Delete" ? () => handleDelete() : () => handleAnswer(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}