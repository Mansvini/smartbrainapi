const handleProfileGet=(req, res, db)=>{
	const {id}=req.params;
	return db.select('*').from('users').where({id
		// id:id
	})
		.then(user=>{
			if(user.length){
				res.json(user[0]);
			} else{
				res.status(400).json('User not found');
			}
		})
		.catch(err=>res.status(400).json('error getting user'))
}

export default handleProfileGet;