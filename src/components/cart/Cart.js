import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cartAddRemove } from '../../store/actions/CartAddRemove';

class Cart extends Component {
    render() {
        const { auth, profile, tshirts, cartAddRemove } = this.props;
        if(!auth.uid) return <Redirect to='/login' />
        let cartProducts = [];
        profile.cart.forEach(tshirtId => {
            cartProducts.push(tshirts.find(tshirt => tshirt.id === tshirtId))
        });
        let totalPrice = 0;
        console.log('totalPrice', totalPrice)
        cartProducts.forEach(tshirt => totalPrice+=tshirt.price);
        console.log('totalPrice', totalPrice)

        const handleRemoveClick = (e) => {
            e.preventDefault();
            let tshirtId = e.target.parentNode.parentNode.id;
            cartAddRemove(tshirtId);
        }

        return (
            <div className="cart container">
                <p className="your-cart">Твоята количка</p>
                <ul className="collection">
                    {cartProducts && cartProducts.map(tshirt => {
                        return (
                            <li className="collection-item avatar" id={tshirt.id} key={tshirt.id}>
                                <img src={tshirt.imgUrl} alt="" className="circle" />
                                <p>{tshirt.name} <br/>
                                    {tshirt.price}
                                </p>
                                <a href="#" className="secondary-content" onClick={handleRemoveClick}><i className="material-icons small">delete</i></a>
                            </li>
                        )
                    })}
                </ul>
                <div className="row">
                    <div className="col s12 m4">
                        <p className="total-price">Обща цена: {totalPrice}</p>
                    </div>
                    <div className="buy-button">
                        <button className="btn-large green lighten-1 buy-button">Купи</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        tshirts: state.firestore.ordered.tshirts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cartAddRemove: (tshirtId) => dispatch(cartAddRemove(tshirtId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'tshirts'  }
    ])
)(Cart);