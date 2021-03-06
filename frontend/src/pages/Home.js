import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav'
import Log from "../components/Log";
import Thread from '../components/Thread';
import NewPostForm from "../components/Post/NewPostForm";

const Home = () => {

    const uid = useContext(UidContext);

    return (
        <div className='home'>
           <LeftNav />
           <div className="main">
                <div className="home-header">
                {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
           <Thread />
           </div>
        </div>
    );
};

export default Home;