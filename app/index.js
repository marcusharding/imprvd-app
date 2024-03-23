// FIREBASE
import { onAuthStateChanged, auth } from '../services/firebase';

// MODULES
import { useState } from 'react';

// COMPONENTS
import Home from './home';
import Signup from './signup';
import VerifyEmail from './verifyEmail';
import Loading from './ui/loading';
import Intro from './intro/intro';

// DATABASE
import { fetchSnapshot } from '../assets/js/user-database';

const Index = () => {

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(null);
    const [introPlayed, setIntroPlayed] = useState(false);

    const snap = async user => {

        const snapshot = await fetchSnapshot(user.uid);
        if ( snapshot ) setIntroPlayed(snapshot.data().intro_played);

        setLoading(false);
    }

    onAuthStateChanged(auth, user => {

        if ( user && user.emailVerified ) setLoggedIn(true);
        else setLoggedIn(false);

        snap(user);
    });
    
    if ( loading ) return <Loading spinner={true} />;
    if ( loggedIn && introPlayed ) return <Home />;
    if ( loggedIn && !introPlayed) return <Intro />;
    if ( auth.currentUser && !auth.currentUser.emailVerified ) return <VerifyEmail />;

    return <Signup />;
}

export default Index;