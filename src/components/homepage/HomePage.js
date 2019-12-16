import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tshirts } from '../tshirts/Data';

class HomePage extends Component {
    render() {
        const { auth } = this.props;
        console.log('props', this.props);
        
        return (
            <div className="homepage container">
                <div className="row">
                    {tshirts && tshirts.map(tshirt => {
                        return (
                            <Link to={'/tshirts/' + tshirt.id} key={tshirt.id}>
                                <div className="col s12 m3 one-tshirt">
                                    <img src={process.env.PUBLIC_URL + tshirt.imgPath} />
                                    <p>{tshirt.name} {tshirt.price}лв</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('redux bazata', state);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(HomePage);