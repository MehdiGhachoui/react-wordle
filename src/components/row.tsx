interface RowProps {
    boardState: {
        status: string;
        value: string;
    }[][];
}
export default function Row({ boardState }: RowProps) {
    return (
        <div className="board">
            {boardState.map((row, rowIndex) => (
                <div key={rowIndex} className="rows">
                    {row.map((cell, colIndex) => (
                        <span key={colIndex} className={`${cell.status}`}>
                            {cell.value}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}