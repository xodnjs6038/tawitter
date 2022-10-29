import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Tweet from 'components/Tweet';

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    // const getTweets = async() => {
    //     const dbTweets = await getDocs(collection(dbService, "tweets"));
    //     dbTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id : document.id,
    //         }
    //         setTweets((prev) => [document.data(), ...prev])
    //     })
    // }

    useEffect(() => {
        const q = query(collection(dbService, "tweets"));
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray)
        });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        addDoc(collection(dbService, "tweets"), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placehorder="What's on your mind?" maxLength={120} />
                <input type="submit" value="tweet" />
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet 
                    key={tweet.id} 
                    tweetObj={tweet} 
                    isOwner={tweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Home