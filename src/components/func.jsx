import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Markup} from 'interweave';

export default class Func extends Component {
    state = {
        username: '',
        data: [],
        image: [],
        isLoaded: false,
        description: [],
    };
    onChange = (event) => {
        this.setState({username: event.target.value});
    };
    handelSubmit = (event) => {
        const url = `https://api.coingecko.com/api/v3/coins/${this.state.username}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                image: data.image,
                description: data.description,
                isLoaded: true
            }), event.preventDefault())
            .catch(e => this.setState({isLoaded: false}));
        console.log(this.state.data);
    };

    render() {
        const isLoaded = this.state.isLoaded;
        return (
            <React.Fragment>
                {(() => {
                    if (!isLoaded) {
                        return (
                            <div className="container">
                                <h3 className="text-center mt-4">Crypto-Wiki</h3>
                                <form className="form-inline mb-4" onSubmit={this.handelSubmit}>
                                    <input type="text" className="form-control" value={this.username}
                                           onChange={this.onChange} name="Search" id="search"
                                           placeholder="Type and press Enter"/>
                                    <button className="btn btn-outline-success">Get info</button>
                                </form>
                                <span>Search for a Coin</span><br/>

                            </div>
                        )
                    } else if (isLoaded) {
                        return (
                            <div>
                                <div className="container">
                                    <h3 className="text-center mt-4">Crypto-Wiki</h3>
                                    <form className="form-inline mb-4" onSubmit={this.handelSubmit}>
                                        <input type="text" className="form-control" value={this.username}
                                               onChange={this.onChange} name="Search" id="search"
                                               placeholder="Type and press Enter"/>
                                        <button className="btn btn-outline-success">Get info</button>
                                    </form>
                                    <span>Search for a Coin</span>

                                </div>
                                <div className="container col" style={{backgroundColor: '#9214237'}}>
                                    <h5 align="center">{this.state.data.name} - {this.state.data.symbol}</h5>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={this.state.image.large} className="border border-dark"
                                                 width="150px" height="200px" alt="Crypto"/>
                                            <div className="border border-dark">
                                                <hp className="mt-2"><b>Country of
                                                    origin: </b><span>{this.state.data.country_origin}</span></hp>
                                                <br/><hp className="mt-2"><b>Date of
                                                    appearance: </b><span>{this.state.data.genesis_date}</span></hp>
                                                <br/> <hp className="mt-2"><b>Market cap
                                                    Rank: </b><span>{this.state.data.market_cap_rank}</span></hp>
                                                <br/><hp className="mt-2"><b>Coin Gecko
                                                    Rank:</b> <span>{this.state.data.coingecko_score}</span></hp>
                                                <br/>  <hp className="mt-2"><b>Coin Gecko
                                                    Score:</b> <span>{this.state.data.coingecko_score}</span></hp>
                                                <br/> <hp className="mt-2"><b>Developer
                                                    Score: </b><span>{this.state.data.developer_score}</span></hp>
                                                <br/> <hp className="mt-2"><b>Community
                                                    Score:</b> <span>{this.state.data.community_score}</span></hp>
                                                <br/><hp className="mt-2"><b>Liquidity
                                                    Score: </b><span>{this.state.data.liquidity_score}</span></hp>
                                                <br/>  <hp className="mt-2"><b>Public Interest Score
                                                    : </b><span>{this.state.data.public_interest_score}</span></hp>
                                            </div>

                                        </div>
                                        <div className="col-md-10">
                                            <Markup style={{fontFamily:'Verdana'}} content=
                                                        {this.state.description.en}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })()}
            </React.Fragment>

        );
    }
}
