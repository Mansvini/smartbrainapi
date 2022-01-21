
const handleRegister=(req, res, db, bcrypt)=>{
	const {name, email, password}=req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);

	return db.transaction(trx =>{
		trx.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({
				name:name,
				email:loginEmail[0].email,
				joined: new Date()
			})
				.then(response=> res.json(response[0]))
		})
			.then(trx.commit)
			.catch(trx.rollback)
	})
		.catch(err=>res.status(400).json('unable to register'))
}

export default handleRegister;