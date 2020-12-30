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
    if (!data)
        return (<p>Is Loading....</p>)
    let image = process.env.PUBLIC_URL + `/types_images/${data.type.name}.png`
    return (
        <tr>
            <td>{capitalize(name)}</td>
            <td>{data.power || "Not Applicable"}</td>
            <td>
                <img src={image} alt={"Type not found"}></img>
            </td>
        </tr>
    );
}

export default Move;