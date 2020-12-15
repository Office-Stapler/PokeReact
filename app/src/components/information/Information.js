import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import './information.css';

export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.pokeAPI = 'https://pokeapi.co/api/v2/';
    }

    render() {
        this.info = this.props.pokeInfo;
        if (this.props.pokeInfo != null) {
            this.stats = this.info.stats;
            return (
                <div className="info">
                    <div className="NameAndImage">
                        <h2>{this.getPokeName()}, id {this.info.id}</h2>
                        <div className="image">
                            <img src={this.info.sprites.other['official-artwork']['front_default']}></img>
                        </div>
                    </div>
                    <table className="stats">
                        <tbody>
                            <tr>
                                <th>Base Stats</th>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >HP</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[0]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[0]['base_stat'] / 255 * 100,
                                            backgroundColor: "green",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >Attack</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[2]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[2]['base_stat'] / 255 * 100,
                                            backgroundColor: "darkred",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >Defense</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[1]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[2]['base_stat'] / 255 * 100,
                                            backgroundColor: "darkblue",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >Sp. Attack</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[3]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[3]['base_stat'] / 255 * 100,
                                            backgroundColor: "red",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >Sp. Defense</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[4]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[4]['base_stat'] / 255 * 100,
                                            backgroundColor: "blue",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div 
                                    style={{
                                        float: "left"
                                    }}

                                    >Speed</div>
                                    <div style={{    
                                        float: "right"
                                    }}>{this.stats[5]['base_stat']}</div>
                                </td>
                                <td className="statLabel">
                                    <div className="statbar" style= {{
                                            width: this.stats[5]['base_stat'] / 255 * 100,
                                            backgroundColor: "yellow",
                                            border: "1px solid black",
                                            height: "20px"
                                        }
                                    }
                                    >
                                    </div>
                                </td>
                            </tr>
                    
                        </tbody>
                    </table>
                </div>
            )
        }
        return '';
    }

    getPokeName() {
        return this.capitalize(this.info.name);
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}