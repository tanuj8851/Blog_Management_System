document.addEventListener("DOMContentLoaded",function(){




const form= document.getElementById("signUp-form");
const username= document.getElementById("username")
const email= document.getElementById("email")
const password= document.getElementById("password");
const btn= document.getElementById("signup-btn")

const api_url="https://blog-management-system.onrender.com/api";



form.addEventListener("submit",async(e)=>{
e.preventDefault()

let name=username.value;
let Email=email.value;
let Password=password.value;

try {

    const response= await fetch(`${api_url}/register`,{
        method:"POST",
        body:JSON.stringify({
            username:name,
            email:Email,
            password:Password
        }),
        headers:{
            'Content-Type':"applicaton/json"
        }
    })

    if(response.ok){
        console.log(response.data);

        alert("User Registration Successful")
        window.location.href="login.html";
    }else{
        alert("Failed registration");
    }
    
} catch (error) {
    console.log(error)
    alert("An error Occured while sign up")
}
})

})