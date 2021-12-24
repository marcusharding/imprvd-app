// Firebase
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// Constants
export const UID = auth().currentUser.uid;
export const COLLECTION = `user-${UID}`;
export const PROFILE_IMAGE_FILENAME = auth().UID + '_' + 'profile_image';
export const PROFILE_IMAGE_REFERENCE = storage().ref(PROFILE_IMAGE_FILENAME);
export const EMAIL_VERIFICATION = auth().currentUser.emailVerified;
