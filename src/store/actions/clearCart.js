export const clearCart = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const personId = getState().firebase.auth.uid;
        const newCart = [];
        console.log('cart cleared')

        firestore.collection('users').doc(`${personId}`).set({
            ...profile,
            cart: newCart
        }).then(() => {
            dispatch({ type: "CART_CLEARED" });
        }).catch((err) => {
            dispatch({ type: "CART_CLEARED_ERROR", err});
        });
    }
};