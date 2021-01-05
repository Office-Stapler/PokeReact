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
    }, [url]);
    if (!data)
        return (
            <tr>
                <td>
                    Is Loading....
                </td>
            </tr>)
    let image = process.env.PUBLIC_URL + `/types_images/${data.type.name}.png`
    return (
        <tr>
            <td>{capitalize(name)}</td>
            <td>{data.power || "--"}</td>
            <td>{(data.accuracy || "--") + "%"}</td>
            <td>
                <img style={{width:"70%", height:"auto"}} src={image} alt={"Type not found"}></img>
            </td>
        </tr>
    );
}

export default Move;