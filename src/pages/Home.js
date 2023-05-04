import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import UserTab from '../Component/userTab';
import BookmarkTab from '../Component/BookmarkTab';
import _ from 'lodash';
import ReactPullToRefresh from 'react-pull-to-refresh';
import './Home.css';

const Home = () => {
    const [toggle, setToggle] = useState(1);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState([])
    const [value, setValue] = useState("");
    const [boookmark, setBookmark] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    
    const updateToggel = (index) => {
        setToggle(index);
    }
    useEffect(() => {
        axios.get("https://api.github.com/users")
            .then((res) => {
                setUsers(res.data)
                setRefresh(res.data)
            })
    }, []);

    const habndleChange = (e) => {
        setItemOffset(0)
        setValue(e.target.value);
        handleSearch(e.target.value, refresh);
    }

    const handleSearch = useRef(
        _.throttle((value, userData) => {
            if (value.length > 0) {
                console.log(value, 'val')
                const filteredArray = userData.filter((userData) => userData.login.toLowerCase().includes(value))
                setUsers(filteredArray)
            } else {
                setUsers(userData)
            }
        }, 3000),
    ).current;

    const handleRefresh = async () => {
        let { success, successData } = await refreshFunction();
        if (success) {
            setUsers(successData);
            setRefresh(successData);
        }
    }
    const refreshFunction = async () => {
        let success = false;
        let successData = [];
        await axios.get("https://api.github.com/users")
            .then((res) => {
                if (res.status === 200) {
                    success = true;
                    successData = res.data;
                }
            })
        return { success, successData };
    }
    return (
        <div className="Container">
            <input type='text' placeholder='search' value={value} onChange={habndleChange} className="ml-xl-106 mt-5" />
            <div className="col-8 tab p-4">
                <ul className='d-flex Justify-content-center'>
                    <li className="flex-fill p-3 w-24 bg-info m-5" onClick={() => updateToggel(1)} >Users</li>
                    <li className="flex-fill p-3 bg-info m-5" onClick={() => updateToggel(2)}>Bookmarked Users</li>
                </ul>
            </div>
            <ReactPullToRefresh onRefresh={handleRefresh}>
                <h3>Pull to Refresh</h3>
                {toggle === 1 && <UserTab users={users} setUsers={setUsers} boookmark={boookmark} setBookmark={setBookmark}
                    itemOffset={itemOffset}
                    setItemOffset={setItemOffset} />}
                {toggle === 2 && <BookmarkTab boookmark={boookmark} setBookmark={setBookmark} users={users} setUsers={setUsers}
                    itemOffset={itemOffset}
                    setItemOffset={setItemOffset}
                />}
            </ReactPullToRefresh>

        </div>

    )
}

export default Home;