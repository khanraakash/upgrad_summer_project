import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Markup} from 'interweave';

export default class Func extends Component {
    state = {
        username: '',
        data: [],
        image: null,
        isLoaded: false,
        isError: false,
        description: null,
    };

    onChange = (event) => {
        this.setState({username: event.target.value});
    };
    handelSubmit = (event) => {
        {
            this.setState({isError: false})
        }
        event.preventDefault();
        const url = `https://api.coingecko.com/api/v3/coins/${this.state.username}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => this.setState({
                            data,
                            image: data.image.large,
                            description: data.description.en,
                            isLoaded: true,
                        }),)
                } else {
                    this.setState({isError: true});
                    throw Error(`Request rejected with status ${response.status}`);
                }
            })
            .catch(e => console.log(e));
        console.log(this.state.data);
    };

    render() {
        const isLoaded = this.state.isLoaded;
        let isError = this.state.isError;
        return (
            <React.Fragment>
                {(() => {
                    if (!isLoaded && !isError) {
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
                    } else if (isLoaded && !isError) {
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
                                            <img src={this.state.image} className="border border-dark"
                                                 width="150px" height="200px" alt="Crypto"/>
                                            <div className="border border-dark">
                                                <p className="mt-2"><b>Country of
                                                    origin: </b><span>{this.state.data.country_origin}</span></p>
                                                <h5 className="mt-2"><b>Date of
                                                    appearance: </b><span>{this.state.data.genesis_date}</span></h5>
                                                <h5 className="mt-2"><b>Market cap
                                                    Rank: </b><span>{this.state.data.market_cap_rank}</span></h5>
                                                <h5 className="mt-2"><b>Coin Gecko
                                                    Rank:</b> <span>{this.state.data.coingecko_score}</span></h5>
                                                <h5 className="mt-2"><b>Coin Gecko
                                                    Score:</b> <span>{this.state.data.coingecko_score}</span></h5>
                                                <h5 className="mt-2"><b>Developer
                                                    Score: </b><span>{this.state.data.developer_score}</span></h5>
                                                <h5 className="mt-2"><b>Community
                                                    Score:</b> <span>{this.state.data.community_score}</span></h5>
                                                <h5 className="mt-2"><b>Liquidity
                                                    Score: </b><span>{this.state.data.liquidity_score}</span></h5>
                                                <h5 className="mt-2"><b>Public Interest Score
                                                    : </b><span>{this.state.data.public_interest_score}</span></h5>
                                            </div>

                                        </div>
                                        <div className="col-md-10">
                                            <Markup style={{fontFamily: 'Verdana'}} content=
                                                {this.state.description}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (isError) {
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
                                <div className="alert alert-danger" role="alert">
                                    Opps! maybe in future its avaliable!!!
                                </div>

                            </div>
                        )
                    }

                })()}
            </React.Fragment>

        );
    }
}
