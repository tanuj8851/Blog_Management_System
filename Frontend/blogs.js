let api_url="http://localhost:9000/api";
let token= JSON.parse(localStorage.getItem("token"))
let blogData=[]

async function fetchData(){


    const response= await fetch(`${api_url}/blogs`,{
        post:"GET",
        headers:{
            Authorization:token
        }
    })

    if(response.ok){
        const data= await response.json()
        // blogData=data;
        console.log(data)
        renderlist(data)
    }
}


function renderlist(data){
let blogList= document.getElementById("blog-list")
blogList.innerHTML="";

data.forEach((blog)=>{
    let blogPost= document.createElement("div")
    blogPost.classList.add("blog-post")

    let title=document.createElement("h2")
    title.textContent=blog.title;

    let category= document.createElement("p")
    category.textContent=`Category :${blog.category}`

    let date=document.createElement("p")
    date.innerText=`Date: ${blog.date}`;

    let content= document.createElement("p")
    content= blog.content;

    let likeButton= document.createElement("button")
    likeButton.textContent="LIKE";

    likeButton.addEventListener("click",async(id)=>{
        likeBlog(blog._id);
    })

    let commentButton= document.createElement("button")
    commentButton.textContent="Comment";

    commentButton.addEventListener("click",async(id)=>{
        CommentBlog(blog._id);
    })

    blogPost.append(title,category,date,content,likeButton,commentButton)
    blogList.append(blogPost)
})
}


const likeBlog=async(id)=>{
try {
    
const response= await fetch(`${ap_url}/blogs/${id}/like`,{
    post:"GET",
    headers:{
        Authorization:token
    }
})

if(response.ok){
    const data= response.json()
    console.log(data)
    alert(data.msg)
}


} catch (error) {
    console.log(error)
}
}


const CommentBlog=async(id)=>{
    try {
        
    const response= await fetch(`${ap_url}/blogs/${id}/comment`,{
        post:"GET",
        headers:{
            Authorization:token
        }
    })
    
    if(response.ok){
        const data= response.json()
        console.log(data)
        alert(data.msg)
    }
    
    
    } catch (error) {
        console.log(error)
    }
    }
// renderlist()
fetchData()