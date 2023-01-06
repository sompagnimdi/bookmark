import Bookmark from "../Bookmark/Bookmark";

export default function BookmarkList(
    bookmark,
    updateBookmark,
    deleteBookmark
){
    return(
        <ul>
        {
            bookmarkList.length ? bookmarkList.map(bookmark => (
                <Bookmark
                key={bookmark._id}
                bookmark={bookmark}
                updateBookmark={updateBookmark}
                deleteBookmark={deleteBookmark}
                />
            )):
            <>
                <h2>No Bookmarks Yet ... Add one in the Form Above</h2>
            </>
        }
        </ul>
    )
}
