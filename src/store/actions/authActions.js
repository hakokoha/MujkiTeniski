export const login = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
}

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        });
    }
}

export const register = (userInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      firebase.auth().createUserWithEmailAndPassword(
        userInfo.email, 
        userInfo.password
      ).then(resp => {
        return firestore.collection('users').doc(resp.user.uid).set({
          name: userInfo.name,
          cart: []
        })
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
  }
//   export const participateInEvent = (eventId) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         // make async call to database
//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const personId = getState().firebase.auth.uid;
//         var personsEventsParticipating;
//         personsEventsParticipating = profile.eventsParticipating.length > 0 ? 
//                       JSON.parse(JSON.stringify(profile.eventsParticipating)) :
//                       personsEventsParticipating = [];

//         // eventId - current eventId
//         // personsEventsParticipating - all event the person is participating
//         const currEvent = getState().firestore.ordered.projects.find(anEvent => anEvent.id === eventId);
//         let newParticipantsNumber = currEvent.participantsNumber;
//         if(personsEventsParticipating.includes(eventId)) {
//           personsEventsParticipating = personsEventsParticipating.filter(event => event !== eventId);
//           newParticipantsNumber -= 1;
//         } else {
//           personsEventsParticipating.push(eventId);
//           newParticipantsNumber += 1;
//         }

        
//         firestore.collection('users').doc(`${personId}`).set({
//             ...profile,
//             eventsParticipating: personsEventsParticipating
//         }).then(() => {
//             firestore.collection('projects').doc(`${eventId}`).set({
//               ...currEvent,
//               participantsNumber: newParticipantsNumber
//             })
//         }).then(() => {
//             dispatch({ type: "PARTICIPATE_EVENT" });
//         }).catch((err) => {
//             dispatch({ type: "PARTICIPATE_EVENT_ERROR", err});
//         });

//         // tuka
//       //   const eventProperties = getState().
//       //   firestore.collection('projects').doc(`${eventId}`).set({
//       //     ...profile,
//       //     eventsParticipating: personsEventsParticipating
//       // }).then(() => {
//       //     dispatch({ type: "PARTICIPATE_EVENT" });
//       // }).catch((err) => {
//       //     dispatch({ type: "PARTICIPATE_EVENT_ERROR", err});
//       // });
//     }
// };