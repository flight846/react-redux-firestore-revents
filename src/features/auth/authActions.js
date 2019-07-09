import { SubmissionError, reset } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = creds => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            console.log(error);
            throw new SubmissionError({
                _error: error.message
            });
        }
    };
};

export const registerUser = user => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);
        console.log(createdUser);
        await createdUser.user.updateProfile({
            displayName: user.displayName
        });
        let newUser = {
            displayName: user.displayName,
            createdAt: firestore.FieldValue.serverTimestamp()
        };
        await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
        dispatch(closeModal());
    } catch (error) {
        console.log(error);
        throw new SubmissionError({
            _error: error.message
        });
    }
};

export const updatePassword = (creds) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        try {
            await user.updatePassword(creds.newPassword1)
            await dispatch(reset('account'))
            toastr.success('Success', 'Your password has been updated')
        } catch (err) {
            throw new SubmissionError({
                _error: err.message
            })
        }
    }