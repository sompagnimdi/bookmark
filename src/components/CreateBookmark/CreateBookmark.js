export default function CreateBookmark({
    createBookmark,
    bookmark,
    handleChange
}){
    return(
        <>
        <h2>Create A BookMarks</h2>
        <form onSubmit={(e) => {
            e.preventDefault()
            createBookmark()
        }}>
            <input type="text" value={bookmark.title} name="title" onChange={handleChange} placeholder={'Title'}></input>
            <input type="text" value={credential.url} name="url" onChange={handleChange} placeholder={'Url'}></input>
            <input type="submit" value="Create Bookmark"/>
        </form>
        </>
    )
}
