import { getFirebaseApp } from '../firebaseHelper'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { child, getDatabase, set, ref } from 'firebase/database'
import { authenticate } from '../../store/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserData } from './userActions'

export const signUp = (fullName, email, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp()
        const auth = getAuth(app)

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const { uid, stsTokenManager } = result.user
            const { accessToken, expirationTime } = stsTokenManager
            const expiryDate = new Date(expirationTime)
            const userData = await createUser(fullName, email, uid)
            dispatch(authenticate({ token: accessToken, userData }))
            saveToDataStorage(accessToken, uid, expiryDate)
        } catch (error) {
            const errorCode = error.code
            let message = 'Something went wrong'
            if (errorCode === 'auth/email-already-in-use') {
                message = 'This email is already in use'
            }
            throw new Error(message)
        }
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp()
        const auth = getAuth(app)

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const { uid, stsTokenManager } = result.user
            const { accessToken, expirationTime } = stsTokenManager
            const expiryDate = new Date(expirationTime)
       
            const userData = await getUserData(uid)
            dispatch(authenticate({ token: accessToken, userData }))

            saveToDataStorage(accessToken, uid, expiryDate)
            
        } catch (error) {
            console.log(error)
            const errorCode = error.code
            let message = 'Something went wrong'
            if (
                errorCode === 'auth/wrong-password' ||
                errorCode === 'auth/user-not-found'
            ) {
                message = 'Wrong email or password!'
            }
            throw new Error(message)
        }
    }
}

const createUser = async (fullName, email, userId) => {
    const userData = {
        fullName,
        email,
        userId,
        signUpDate: new Date().toISOString(),
    }

    const dbRef = ref(getDatabase())
    const childRef = child(dbRef, `users/${userId}`)
    await set(childRef, userData)
    return userData
}

const saveToDataStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate: expiryDate.toISOString(),
        })
    )
}

export { createUser, saveToDataStorage }