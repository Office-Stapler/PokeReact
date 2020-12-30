import "../information.css";
export const MovesTable = ({moves}) => {
    return (
        <table className="table2">
            <thead>
            <tr>
                <th>Move</th>
                <th>Power</th>
            </tr>
            </thead>
            <tbody>
                {moves}
            </tbody>
        </table>
    )
}