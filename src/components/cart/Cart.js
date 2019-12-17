import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cartAddRemove } from '../../store/actions/CartAddRemove';
import { clearCart } from '../../store/actions/clearCart';

class Cart extends Component {
    state = {
        msgContent: ''
    }

    render() {
        const { auth, profile, tshirts, cartAddRemove, clearCart } = this.props;
        if(!auth.uid) return <Redirect to='/login' />
        let cartProducts = [];
        if(profile.cart) {
            profile.cart.forEach(tshirtId => {
                if(tshirts) {
                    cartProducts.push(tshirts.find(tshirt => tshirt.id === tshirtId))
                }
            });
        }
        
        let totalPrice = 0;
        cartProducts.forEach(tshirt => totalPrice+=tshirt.price);

        const handleRemoveClick = (e) => {
            e.preventDefault();
            let tshirtId = e.target.parentNode.parentNode.id;
            cartAddRemove(tshirtId);
        }

        const handleMakeOrder = (e) => {
            e.preventDefault();
            if(totalPrice !== 0)
            {
                this.setState({ msgContent: 'Поръчката беше успешно направена!' });
                setTimeout(() => this.setState({ msgContent: '' }), 5000);
                clearCart();
                cartProducts = [];
                totalPrice = 0;
            }
        }

        return (
            <div className="cart container">
                <p className="your-cart">Твоята количка</p>
                {this.state.msgContent !== '' ? <p className="order-made">{this.state.msgContent}</p> : null}
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
                        <button className="btn-large green lighten-1 buy-button" onClick={handleMakeOrder}>Купи</button>
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
        cartAddRemove: (tshirtId) => dispatch(cartAddRemove(tshirtId)),
        clearCart: () => dispatch(clearCart())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'tshirts'  }
    ])
)(Cart);