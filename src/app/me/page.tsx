import Image from 'next/image'
import { AiOutlineMail, AiOutlinePushpin } from 'react-icons/ai'

import styles from './page.module.scss'

// TODO: load infos from cms
export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src="https://avatars.githubusercontent.com/u/48386738?v=4"
          width={128}
          height={128}
          className={styles.avatar}
          alt="Picture of the author"
        />

        <h2>Gabriel Gigante</h2>

        <p className={styles.bio}>
          Desenvolvedor com mais de 5 anos de experiência no desenvolvimento de aplicações escaláveis e altamente
          disponíveis.
        </p>

        <div className={styles.contactInfo}>
          <p>
            <AiOutlinePushpin /> São Paulo, Brasil
          </p>
          <p>
            <AiOutlineMail /> gabrielgigante29@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
