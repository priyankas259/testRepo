import './UserTab.css';
import CommonCode from './CommonCode';

const UserTab = ({ users, setUsers, boookmark, setBookmark, itemOffset, setItemOffset }) => {

  const handlebookmark = (id) => {
    const usersarray = [...users];
    const bookmarkItemIndex = usersarray?.findIndex((item) => item.id === id);
    const bookmarArray = (usersarray?.splice(bookmarkItemIndex, 1));
    setBookmark([...boookmark, bookmarArray?.[0]])
    setUsers(usersarray)
  }

  return (
    <CommonCode currentItemsData={users} handlebookmarkId={handlebookmark} tab='user' itemOffset={itemOffset}
      setItemOffset={setItemOffset} />
  );
}

export default UserTab;