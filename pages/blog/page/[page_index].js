import Layout from '@/components/Layout'
import fs from 'fs'
import path from 'path'
import Post from '@/components/Post';
import {POSTS_PER_PAGE} from '@/config/index'
import Pagination from '@/components/Pagination';
import {getPosts} from '@/lib/posts';
import CategoryList from '@/components/CategoryList';


const BlogPage = ({posts, numPages, currentPage, categories}) => {
  return (
      <Layout>
        <div className="flex justify-between">
          <div className="w-3/4 mr-10">
            <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post,index) => (
                  <Post key={index} post={post} />
              ))}
            </div>
            <Pagination currentPage={currentPage} numPages={numPages}/>
          </div>
          <div className="w-1/4">
            <CategoryList categories={categories}/>
          </div>
        </div>
      </Layout>
  )
}

//If a page has Dynamic Routes and uses getStaticProps,
// it needs to define a list of paths to be statically generated.
//When you export a function called getStaticPaths (Static Site Generation)
// from a page that uses dynamic routes, Next.js will statically pre-render all
// the paths specified by getStaticPaths
export async function getStaticPaths(){

  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for(let i = 1; i <= numPages; i++){
    paths.push({
      params:{
        page_index: i.toString(),
      }
    })
  }
  console.log(paths)
  return {
    paths,
    fallback: false
  }

}


//If you export a function called getStaticProps (Static Site Generation)  from a page,
// Next.js will pre-render  this page at build time using the props returned
// by getStaticProps.
export async function getStaticProps({params}){

  const page = parseInt((params && params.page_index) || 1)

  const files = fs.readdirSync(path.join('posts'))

  const posts = getPosts()

  //Get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category)

  //get unique categories
  const uniqueCategories = [...new Set(categories)]



  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    props:{
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    }
  }

}

export default BlogPage
