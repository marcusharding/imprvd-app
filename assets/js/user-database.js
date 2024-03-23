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
            email: email,
            intro_played: false
        });
      
        console.log("User entry created with uid: ", uid);

    } catch (error) { console.error("Error adding document: ", error); }
};

/**
 * Fetch a querySnapshot of the users database, if database or user in question doesnt exist then create new entry.
 * @param { Object } currentUser
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
 * Fetch a user snapshot if it exists.
 * @param { String } uid
 * @return { Object }
*/
export const fetchSnapshot = async uid => {

    try {

        let snap = null;

        const userRef = doc(db, "users", uid);
        const snapshot = await getDoc(userRef);
    
        if ( snapshot.exists() ) snap = snapshot;
         
        return snap;

    } catch (error) { console.error("Error fetching user snapshot: ", error); }
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

        const snapshot = await fetchSnapshot(uid);
    
        if ( snapshot.exists() ) categories = snapshot.data().categories;
    
        return categories;

    } catch (error) { console.error("Error fetching categories: ", error); }
}

/**
 * Get the current categories array if it exists, else return an empty array ready to populate.
 * @return { Array }
*/
const createCategories = async uid => {

    try {

        let categories = await fetchCategories(uid);

        if ( !categories ) categories = [];
    
        return categories;

    } catch (error) { console.error("Error fetching categories: ", error); }
}

/**
 * Push a new benchmark to either a new categories array or the existing array pulled from the users database.
 * @return { Array }
*/
export const addBenchmark = async (selectedCategory, selectedBenchmark, value, uid) => {

    const categories = await createCategories(uid);

    if ( categories && categories.length > 0 ) {

        categories[index].benchmarks.push(
            {
                benchmark: selectedBenchmark,
                value: value
            }
        );
    }

    if ( categories.length === 0 ) {

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

    return categories;
}

/**
 * Modify a benchmark that already exists value
 * @return { Array }
*/
export const updateBenchmark = async (category, benchmark, uid, newValue) => {

    const categories = await fetchCategories(uid);

    if ( categories ) {

        const index = categories.findIndex(object => object.category === category);
        const benchmarkIndex = categories[index].benchmarks.findIndex(object => object.benchmark === benchmark);
    
        categories[index].benchmarks[benchmarkIndex].value = newValue;
    }

    return categories;
}

/**
 * Remove a benchmark from the array then replace the database
 * @return { Array }
*/
export const deleteBenchmark = async (category, benchmark, uid) => {

    const categories = await fetchCategories(uid);

    if ( categories ) {

        const index = categories.findIndex(object => object.category === category);
        const benchmarkIndex = categories[index].benchmarks.findIndex(object => object.benchmark === benchmark);
    
        categories[index].benchmarks.splice(benchmarkIndex, 1);
    
        if ( categories[index].benchmarks.length === 0 ) categories.splice(index, 1);
    }

    return categories;
}

export const benchmarkExists = async (category, benchmark, uid) => {

    let exists = false;

    const categories = await fetchCategories(uid);

    if ( categories ) {

        const index = categories.findIndex(object => object.category === category);

        if ( categories[index] ) {
    
            categories[index].benchmarks.map(currentBenchmark => {  if ( currentBenchmark.benchmark === benchmark ) exists = true; });
        }
    }

    return exists;
}