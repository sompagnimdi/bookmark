export default function CreateBookmark ({
  createBookmark,
  bookmark,
  handleChange
}) {
  return (
    <>
      <h2>Create A Bookmark</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        createBookmark()
      }}
      >
        <input type='text' value={bookmark.title} name='title' onChange={handleChange} placeholder='Title' />
        <input type='text' value={bookmark.url} name='url' onChange={handleChange} placeholder='URL' />
        <input type='submit' value='Create Bookmark' />
      </form>
    </>
  )
}
