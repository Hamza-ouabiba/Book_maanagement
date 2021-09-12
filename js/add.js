var form = document.querySelector('form');
var small = document.querySelector('.text');
var user_cred = document.querySelector('header');
var image = document.getElementById('img')
var pattern = /^[A-Z0-9]{10,13}$/
//a function that returns a random number for the isbn : 
function isbn_gen()
{
   return Math.floor(Math.random() * 100000 );
}
//getting the profile name : 
firebase.auth().onAuthStateChanged(user => 
    {
         if(user)
         {
            let uid = user.uid;
            firebase.storage().ref('users/'+ uid + '/profile.jpg').getDownloadURL()
            .then(img => {
                 db.collection('users').doc (uid).get()
                .then(res =>
                {       
                    image.src = img;
                    let html = 
                    `
                    <img src=${image.src}>
                    <h4>${res.data().name}</h4>
                    `
                    user_cred.innerHTML = html;
                    //adding every book to a specific account : 
                })
            })
         }
    })
var button = document.querySelector('.button');
button.addEventListener('click',function(event)
{
     event.preventDefault();
     firebase.auth().signOut()
     .then(res => 
        {
             alert('log out succesfull');
             console.log("log out succesfull : ",res);
             document.location.href = "/Authentication/auth.html";
        })
        .catch(error => console.log(error));
})
form.addEventListener('submit',function(e) 
{
    //cancelling bubbling ;
    e.preventDefault();
    let book = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let date = document.getElementById('date').value;
        // db.collection('Book').get()
        // .then(function(books)
        // {
        //      for(let i=0;i<books.length;i++)
        //      {
        //           for(let j=i+1;j<books.length;j++)
        //           {
        //                if(books[i].data().isbn == books[i].data().isbn)
        //                {
        //                     console.log('you can not do iu');
        //                     break;
        //                }
        //           }
        //      }
        // })
        //creating an object :
      let Book_db = 
    {
       name: book,
       Author: author,
       Edition: date,
       ISBN: isbn_gen()
    };
    //taking values to the database :
    db.collection("Book").add(Book_db)
    .then(function () 
    {
        let html = 
        `
           <small>Book Added successfully</small>
        `
        small.innerHTML = html;
        small.setAttribute('class','success');
        setTimeout(function() 
        {
            small.innerHTML= ""
            small.setAttribute('class',' ');
            form.reset()
        },3000);
    })
    .catch(function()
    {
        let html = 
        `
           <small>ERROR !</small>
        `   
        small.innerHTML = html;
        small.setAttribute('class','error');
        form.reset() 
    })
})
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});