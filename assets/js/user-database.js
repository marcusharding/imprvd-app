// Firebase
import { db, collection, getDoc, getDocs, setDoc, doc } from '../../services/firebase';

/**
 * Create a new firestore database emtry for a user with a given uid.
 * @param { String } displayName
 * @param { String } email
*/
const createUserEntry = async ({ displayName, email, uid }) => {

    try {

        await setDoc(doc(db, "users", uid), {
            uid: uid,
            name: displayName,
            email: email
        });
      
        console.log("User entry created with uid: ", uid);

    } catch (error) { console.error("Error adding document: ", error); }
};

/**
 * Fetch a querySnapshot of the users database, if database or user in question doesnt exist then create new entry.
*/
export const userExists = async currentUser => {

    try {

        const querySnapshot = await getDocs(collection(db, "users"));
        let databaseExists = false;
    
        querySnapshot.forEach(doc => {
    
            if ( !databaseExists ) databaseExists = true;
    
            if ( currentUser.uid === doc.data().uid ) console.log('User entry exists');
            else createUserEntry(currentUser);
        });
    
        if ( !databaseExists ) createUserEntry(currentUser);

    } catch (error) { console.error("Error checking if user exists: ", error); }
}

/**
 * Fetch a user doc that can be used to update.
 * @return { Object }
*/
export const fetchUserDoc = async uid => { 

    const document = await doc(db, "users", uid);
     
    return document;
}

/**
 * Fetch a user doc that can be used to update.
 * @return { Boolean | Array }
*/
export const fetchCategories = async uid => {

    try {

        let categories = null;

        const userRef = await fetchUserDoc(uid);
        const snap = await getDoc(userRef);
    
        if ( snap.exists() ) categories = snap.data().categories;
    
        return categories;

    } catch (error) { console.error("Error fetching categories: ", error); }
}

/**
 * Get the current categories array if it exists, else return an empty array ready to populate.
 * @return { Array }
*/
const createCategories = async () => {

    try {

        let categories = await fetchCategories();

        if ( !categories ) categories = [];
    
        return categories;

    } catch (error) { console.error("Error fetching categories: ", error); }
}

/**
 * Push a new benchmark to either a new categories array or the existing array pulled from the users database.
 * @return { Array }
*/
export const addBenchmark = async (selectedCategory, selectedBenchmark, value) => {

    const categories = await createCategories();
    const index = categories.findIndex(object => object.category === selectedCategory);

    if ( categories.length === 0 || index === -1 ) {

        categories.push(
            {
                category: selectedCategory,
                benchmarks: [
                    {
                        benchmark: selectedBenchmark,
                        value: value
                    }
                ]
            }
        );
    }

    if ( categories.length > 0 && index !== -1 ) {

        categories[index].benchmarks.push(
            {
                benchmark: selectedBenchmark,
                value: value
            }
        );
    }

    return categories;
}