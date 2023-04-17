import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const authSignInUser = createAsyncThunk(
  "auth/SignIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignUpUser = createAsyncThunk(
  "auth/SignUp",
  async ({ name, email, password, image }, thunkAPI) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const response = await fetch(image);
      const file = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `userLogo/${user.uid}`);

      const uploadBytesBd = await uploadBytes(storageRef, file);

      const logoUrl = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: logoUrl,
      });
      return {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateChangeUser = createAsyncThunk(
  "auth/Change",
  async (prop, thunkAPI) => {
    try {
      return { ...prop };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateSignOut = createAsyncThunk(
  "auth/SignOut",
  async (prop, thunkAPI) => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authAddPhotoURL = createAsyncThunk(
  "auth/AddPhotoURL",
  async ({ image, uid }, thunkAPI) => {
    try {
      const auth = getAuth();

      const response = await fetch(image);
      const file = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `userLogo/${uid}`);

      const uploadBytesBd = await uploadBytes(storageRef, file);

      const logoUrl = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, {
        photoURL: logoUrl,
      });

      return {
        photoURL: logoUrl,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
