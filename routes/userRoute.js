const fs = require('fs');

const {join} = require('path');

const filepath = join(__dirname, 'users.json');

const getUsers = () => {
    const data = fs.existsSync(filepath)
        ? fs.readFileSync(filepath)
        : []


    try {
        return JSON.parse(data);
    }catch(error){
        return [];
    }

}

const saveUser = (users) => fs.writeFileSync(filepath, JSON.stringify(users, null, '\t'));

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req,res)=>{
            const users = getUsers()
                res.send({users});
        })
        .post((req,res) =>{
            const users = getUsers();
            
                users.push(req.body);
                saveUser(users);

                res.status(201).send('OK');

        })
        .put((req,res) =>{
            
        })
}

module.exports = userRoute;