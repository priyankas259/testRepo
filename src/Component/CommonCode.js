import ReactPaginate from 'react-paginate';
import './UserTab.css';
const CommonCode = ({ currentItemsData, handlebookmarkId, tab, itemOffset, setItemOffset }) => {

    const itemsPerPage = 6;
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = currentItemsData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(currentItemsData.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % currentItemsData.length;
        setItemOffset(newOffset);
    };

    const handlebookmark = (id) => {
        handlebookmarkId(id)
    }

    return (
        <>
            <div>
                {currentItems.length === 0 ?
                    <p>No Record Found</p>
                    : currentItems?.map((userData, index) => {
                        return (
                            <>
                                <td key={index} className='p-5'>
                                    <tr>
                                        <img src={userData.avatar_url}></img>
                                    </tr>
                                    <tr>
                                        {userData.login}
                                    </tr>
                                    <tr>
                                        <i className={tab === 'user' ? "fa fa-bookmark-o" : "fa fa-bookmark"} onClick={() => handlebookmark(userData.id)}></i>
                                    </tr>
                                </td>
                            </>
                        )
                    })

                }
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={currentItemsData?.length / 6}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination_link"}
                nextLinkClassName={"pagination_link"}
                disabledClassName={"pagination_link--disabled"}
                activeClassName={"pagination_link--active"}
            />
        </>
    );
}

export default CommonCode;