import "../information.css";
export const MovesTable = ({moves}) => {
    return (
        <table className="table2">
            <thead>
            <tr>
                <th>Name</th>
                <th>Power</th>
                <th>Accuracy</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>
                {moves}
            </tbody>
        </table>
    )
}