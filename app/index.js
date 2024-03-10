// FIREBASE
import { onAuthStateChanged, auth, user } from '../services/firebase';

// MODULES
import React from 'react';

// COMPONENTS
import Home from './home';
import Signup from './signup';
import VerifyEmail from './verifyEmail';
import Loading from './ui/loading';

const Index = () => {

    const [loggedIn, setLoggedIn] = React.useState(null);

    onAuthStateChanged(auth, user => {

        if ( user && user.emailVerified ) setLoggedIn(true);
        else setLoggedIn(false);

    });
    
    if ( loggedIn === null ) return <Loading spinner={false} />;
    if ( loggedIn ) return <Home />;
    if ( auth.currentUser && !auth.currentUser.emailVerified ) return <VerifyEmail />;

    return <Signup />;
}

export default Index;