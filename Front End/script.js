// const bookingForm = document.getElementById('bookingForm');
// const usersContainer = document.getElementById('usersContainer');

// // Function to create a new user
// const createUser = async (event) => {
//   event.preventDefault();

//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const phone = document.getElementById('phone').value;

//   try {
//     const response = await axios.post('http://localhost:3000/api/users', { name, email, phone });
//     const newUser = response.data;
//     console.log("response.data=");
//     displayUser(newUser,newUser.id);
//   } catch (error) {
//     console.log(error);
//   }

//   bookingForm.reset();
// };

// // Function to display a user
// const displayUser = (user, id) => {
//   const userLi = document.createElement('li');
//   userLi.innerHTML = `${user.name}:${user.email}:${user.phone}
//     <button onclick="editUser(${id})">Edit</button>
//     <button onclick="deleteUser(${id})">Delete</button>
//   `;
//   userLi.setAttribute('data-id',`${id}`);
//   usersContainer.appendChild(userLi);
// };

// // Function to delete a user
// const deleteUser = async (userId) => {
//   try {
//     console.log("userId=",userId);
//     await axios.delete(`http://localhost:3000/api/users/${userId}`);
//     const userLi = document.getElementById(`user-${userId}`);
//     console.log("userLi=", userLi);
//     userLi.remove();
//   } catch (error) {
//     console.log(error);
//   }
// };



// // Function to edit a user
// const editUser = async (userId) => {
//   // Retrieve the user details from the server
//   try {
//     const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
//     const user = response.data;
//     // Display the user details in edit fields
//     document.getElementById('name').value = user.name;
//     document.getElementById('email').value = user.email;
//     document.getElementById('phone').value = user.phone;
//     // Delete the user after editing
//     await axios.delete(`http://localhost:3000/api/users/${userId}`);
//     const userLi = document.getElementById(`user-${userId}`);
//     userLi.remove();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Fetch existing users on page load
// const fetchUsers = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/api/users');
//     const users = response.data;
//     users.forEach((user) => displayUser(user, user.id));
//   } catch (error) {
//     console.log(error);
//   }
// };

// bookingForm.addEventListener('submit', createUser);
// fetchUsers();



var form = document.getElementById("bookingForm");
var ul = document.getElementById("ullist");


form.addEventListener("submit", adding = function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone=document.getElementById("phone").value;

  let obj = {
    name: name,
    email: email,
    phone:phone
  };

  //console.log(obj)

  async function postData() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        obj
      );

      showOutput(obj, response.data.id);
      console.log("response.data=", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  postData();

});



document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/users"
    );

    for (let i = 0; i < response.data.length; i++) {
      showOutput(response.data[i], response.data[i].id);
    }
  } catch (error) {
    console.error(error);
  }
});


function showOutput(obj, obj_id) {

  var list = document.createElement("li");

  list.appendChild(document.createTextNode(obj.name + " - " + obj.email + "-" +obj.phone+ " "));

  var deletebtn = document.createElement("button");
  deletebtn.className = "delete";
  deletebtn.appendChild(document.createTextNode("Delete"));
  list.appendChild(deletebtn);

  var editbtn = document.createElement("button");
  editbtn.className = "edit";
  editbtn.appendChild(document.createTextNode("Edit"));
  list.appendChild(editbtn);


  list.setAttribute('data-id', obj_id);


  ul.appendChild(list);

}



ul.addEventListener('click', removeitem = function (e) {

  if (e.target.classList.contains('delete')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=", li);
    var id = li.getAttribute('data-id');
    console.log("id=", id);



    async function deleteData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`
        );

        //console.log(response.data);
        ul.removeChild(li);
      } catch (error) {
        console.log(error);
      }
    }

    deleteData();
  }

  if (e.target.classList.contains('edit')) {
    console.log(e.target);
    var li = e.target.parentNode;
    console.log("li=",li.textContent);
    let arr=li.textContent.split('-');
    console.log((arr));


    var id = li.getAttribute('data-id');
    console.log("id=", id);

    document.getElementById("name").value=arr[0];
    document.getElementById("email").value=arr[1];
    document.getElementById("phone").value=arr[2];

    async function editData() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`
        );

        //console.log(response.data);
        ul.removeChild(li);
      } catch (error) {
        console.log(error);
      }
    }

    editData();
  }

});



