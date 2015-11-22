module.exports = function() {
	console.log(process.env.NODE_ENV);
	switch(process.env.NODE_ENV)
	{
		case 'development':
			return {"title" : "Dev"};

		case 'production':
			return {"title" : "Production"};
	}
}