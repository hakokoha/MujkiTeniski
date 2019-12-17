export const cartAddRemove = (tshirtId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const personId = getState().firebase.auth.uid;
        var newProductsInCart;
        newProductsInCart = profile.cart.length > 0 ? 
                      JSON.parse(JSON.stringify(profile.cart)) :
                      newProductsInCart = [];

        if(newProductsInCart.includes(tshirtId)) {
            newProductsInCart = newProductsInCart.filter(tshirt => tshirt !== tshirtId);
        } else {
            newProductsInCart.push(tshirtId);
        }

        
        firestore.collection('users').doc(`${personId}`).set({
            ...profile,
            cart: newProductsInCart
        }).then(() => {
            dispatch({ type: "CART_RENEWED" });
        }).catch((err) => {
            dispatch({ type: "CART_RENEWED_ERROR", err});
        });
    }
};