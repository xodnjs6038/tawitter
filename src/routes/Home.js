import { dbService } from "fbase";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 

const Home = () => {
    const [Tweet, setTweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        addDoc(collection(dbService, "tweets"),{
            Tweet,
            createdAt: Date.now()

        });
        setTweet("");
    }
    const onChange = (event) => {
        const { 
            target : {value},
    } = event;
    setTweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={Tweet} onChange={onChange} type="text" placehorder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Tweet" />
            </form>
        </div>
    );
}

export default Home