import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getPhotoURL = async (uid) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `userLogo/${uid}`);
    const photoURL = await getDownloadURL(storageRef);
    if (!photoURL) {
      return "";
    }
    return photoURL;
  } catch (error) {
    console.log(error);
    return "";
  }
};
