import people from './users.js'
let users = people

const UserController = (app) => {
   app.get('/api/users', findUsers); // map path pattern to handler function
   app.get('/api/users/:uid', findUserById); 
   app.post('/api/users', createUser); // map URL pattern to handler function
   app.delete('/api/users/:uid', deleteUser); // map URL pattern to handler function
   app.put('/api/users/:uid', updateUser);
}


const findUsers = (req, res) => {
    const type = req.query.type     // retrieve type parameter from query
    if(type) {                      // if type parameter in query
      const usersOfType = users     // find users of that type
        .filter(u => u.type === type)
      res.json(usersOfType)         // respond with users of that type
      return                        // return so it doesn't continue
    }
    res.json(users)                 // otherwise respond with all users
  }  


const findUserById = (req, res) => { // function called if URL matches pattern
    const userId = req.params.uid;  // get uid from request parameter map
    const user = users              // find user in users array whose _id
      .find(u => u._id === userId); // matches userId retrieved from params
    res.json(user);                 // respond to client with user found
}
  
const createUser = (req, res) => {            // function invoked if URL matches pattern
  const newUser = req.body;                   // extract new user from BODY in request
  newUser._id = (new Date()).getTime() + '';  // add an _id property with unique timestamp
  users.push(newUser);                        // append new user to users array
  res.json(newUser);                          // respond with new user to client
}

const deleteUser = (req, res) => {
  const userId = req.params['uid'];   // get user ID from path parameter uid
  users = users.filter(usr =>         // filter out the user
    usr._id !== userId);              // whose ID is the ID of the user we want to remove
  res.sendStatus(200);                // respond with success code
}

const updateUser = (req, res) => {  // handle PUT /api/users/:uid
  const userId = req.params['uid']; // get user ID from path
  const updates = req.body;         // BODY includes updated fields
  users = users.map((usr) =>        // create a new array of users
    usr._id === userId ?            // if current user's ID matches ID we want to update
      {...usr, ...updates} :        // merge old usr with new updates
      usr                           // otherwise keep the old user
  );
  res.sendStatus(200);              // return OK
 }
 


export default UserController