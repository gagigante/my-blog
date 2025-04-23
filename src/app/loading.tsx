import styles from './loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.container}>
      <br />
      <br />
      <br />
      <br />
      {/* <div className={styles.hero}>
        <div className={`${styles.avatar} ${styles.loading}`} />

        <div className={`${styles.bio} ${styles.loading}`} />
      </div> */}

      <div className={styles.posts}>
        <div className={styles.post}>
          <div className={`${styles.metadata} ${styles.loading}`} />
          <div className={`${styles.title} ${styles.loading}`} />
          <div className={styles.tags}>
            <div className={styles.loading} />
            <div className={styles.loading} />
            <div className={styles.loading} />
          </div>
          <div className={`${styles.abstract} ${styles.loading}`} />
        </div>

        <div className={styles.post}>
          <div className={`${styles.metadata} ${styles.loading}`} />
          <div className={`${styles.title} ${styles.loading}`} />
          <div className={styles.tags}>
            <div className={styles.loading} />
            <div className={styles.loading} />
            <div className={styles.loading} />
          </div>
          <div className={`${styles.abstract} ${styles.loading}`} />
        </div>
      </div>

      <div className={styles.pagination}>
        <div className={styles.loading} />
        <div className={styles.loading} />
        <div className={styles.loading} />
        <div className={styles.loading} />
      </div>
    </div>
  )
}
