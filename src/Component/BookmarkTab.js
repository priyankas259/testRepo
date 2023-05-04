import './UserTab.css';
import CommonCode from './CommonCode';

const BookmarkTab = ({ users, setUsers, boookmark, setBookmark, itemOffset, setItemOffset }) => {

    const handlebookmark = (id) => {
        const usersarray = [...boookmark];
        const bookmarkItemIndex = usersarray?.findIndex((userItem) => userItem.id === id);
        const bookmarArray = (usersarray?.splice(bookmarkItemIndex, 1));
        setUsers([...users, bookmarArray?.[0]])
        setBookmark(usersarray)
        setItemOffset(0)
    }
    return (
        <CommonCode currentItemsData={boookmark} handlebookmarkId={handlebookmark} tab='bookmark' itemOffset={itemOffset}
            setItemOffset={setItemOffset} />
    );
}

export default BookmarkTab;