import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);
function App() {
  const[user, setUser] = useState({
    isSignIn : false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:false,
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSingIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const{ displayName,photoURL, email} = res.user
      const signInUser = {
        isSignIn:true,
        name:displayName,
        email: email,
        photo:photoURL
        
      }
      setUser(signInUser)
      // console.log(displayName,photoURL, email)
    })
    .catch(error => {
      console.log(error)
      console.log(error.message);
    })
  }
  const handleSingOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const singOutUser = {
        isSignIn : false,
        name: '',
        email:'',
        photo:''
      }
      setUser(singOutUser)
    })
    .catch(error => {
      console.log(error)
      console.log(error.message)

    })
// console.log('sing OUt')
  }
  // const handleSubmit = (e) =>{
    const handleSubmit = (e) =>{
      // console.log(user.email, user.password)
    if (user.email && user.password) {
// console.log('submited')
firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
.then(res => {
  const newUserInfo={...user};
  newUserInfo.error = '';
  newUserInfo.success= true; //for show success message
setUser(newUserInfo)
  // console.log(res)
})
.catch(error =>{
  // Handle Errors here.
  const newUserInfo= {...user} //error message show korar jonn.
  newUserInfo.error = error.message;
  newUserInfo.success= false; //for hidden success message
  // var errorMessage = error.message;
  // console.log(errorCode, errorMessage)
  setUser(newUserInfo)
  // ...
});
    }
    e.preventDefault()
    // e.preventDefault() ...reload na korar jonno use korte hobe
  }
  // handler blure for....??
  const handleonBlur = (e) => {
    // console.log(e.target.name,e.target.value)
    let isFildValid = true;
    if (e.target.name === 'email') {
       isFildValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password ') {
      const isPasswordValue = e.target.value.length > 6;
      const passwordHasValid = /\d{1}/.test(e.target.value)
     isFildValid=isPasswordValue && passwordHasValid
    }
    if (isFildValid) {
      const newUserInfo= {...user};
      newUserInfo [e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    
  }
  return (
    <div className="App">
     {
       user.isSignIn ? <button onClick={handleSingOut} >Sing out</button>:
      <button onClick={handleSingIn} >SignIn</button>
      }
      {
        user.isSignIn && <div className="">
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <img style={{borderRadius:"50%"}} src={user.photo} alt=""/>
          

        </div>
      }
        <h1>Our won authentication</h1>
        {/* <h2>Name:{user.name}</h2>
        <h3>Email:{user.email}</h3>
        <h3>Password:{user.password}</h3> */}
  
        <form onSubmit={handleSubmit}>
          <h3 style={{color:'orange'}}>Sign Up</h3>
            <input name= "name" type="text" onBlur= {handleonBlur} placeholder="Your name" required/>
            <br/>
            <br/>
            <input type="text" name="email" onBlur={handleonBlur} placeholder='Your Email' required/>
           <br/>
           <br/>
            <input type="password" name="password" onBlur = {handleonBlur} placeholder="Your password" required/>
            <br/>
           <br/>
            <input style={{cursor:'pointer',borderRadius:'8px',backgroundColor:'orange', padding:'10px 20px',border:'none'}} type="submit" value="submit"/>
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:'green'}}>user created successfully</p>}
          </form>
    </div>

    
  );
}

export default App;
