import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class HomePage extends Component {
    render() {
        const { auth, tshirts } = this.props;
        console.log('props', this.props);
        console.log('tshirts', tshirts);
        let tshirtsToDisplay = null;
        if(tshirts) {
            tshirtsToDisplay = tshirts.filter(tshirt => tshirt.id[tshirt.id.length-1] === 'M');
        }

        return (
            <div className="homepage container">
                <div className="row">
                    {tshirtsToDisplay && tshirtsToDisplay.map(tshirt => {
                        return (
                            <Link to={'/tshirts/' + tshirt.id} key={tshirt.id}>
                                <div className="col s12 m2 offset-m1 one-tshirt hoverable">
                                    <img src={tshirt.imgUrl} />
                                    <p className="tshirt-name">{tshirt.name}</p>
                                    <p className="tshirt-price right">{tshirt.price}лв</p>
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
        auth: state.firebase.auth,
        tshirts: state.firestore.ordered.tshirts
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'tshirts'  }
    ])
)(HomePage);