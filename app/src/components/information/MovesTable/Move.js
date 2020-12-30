import React from 'react';
import {capitalize} from '../../utils/stringUtils';
import "../information.css";
const Move = ({ url, name }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const getMove = async (url) => {
            setData(null);
            return await fetch(url).then((resp) => resp.json());
        };
        getMove(url)
            .then((result) => {
                setData(result);
            });
    }, []);

    return !data ? <p>Is Loading...</p> : (
        <tr>
            <td>{capitalize(name)}</td>
            <td>{data.power || "Not Applicable"}</td>
        </tr>
    );
}

export default Move;