import styles from './CreateBookmark.module.scss'
export default function CreateBookmark({
    createBookmark,
    bookmark,
    handleChange
}){
    return (
      <>
        <h2>Create A BookMarks</h2>
        <div className={styles.container}>
        <form 
        className={StyleSheet.form}
        onSubmit={(e) => {
            e.preventDefault()
            createBookmark()
        }}
        >
            <div>
            <label>Title<input type="text" value={bookmark.title} name="title" onChange={handleChange} placeholder={'Title'}/></label>
            <label>URL<input type="text" value={credential.url} name="url" onChange={handleChange} placeholder={'Url'}/></label>
            </div>
            <input className={styles.button} type="submit" value="Create Bookmark" />
        </form>
        </div>
      </>
    )
}
