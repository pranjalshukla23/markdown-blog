import Head from 'next/head'
import Header from './Header'
import Search from '@/components/Search';

const Layout = ({title, keywords, description, children}) => {
  return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Search />
        <main className='container mx-auto my-7'>{children}</main>
      </div>
  )
}

//set default values for props
Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'development, coding, programming',
  description: 'The best info and news in development'
}
export default Layout
