module.exports = {
    port: 3001,
    db : {
        database: process.env.DB_NAME || 'tabtracker',
        user:process.env.DB_USER || 'tabtracker',
        password: process.env.DB_USER || 'tabtracker',
        options:{
                dialect : process.env.DIALECT || 'sqlite',
                host : process.env.HOST || 'localhost',
                storage: './tabtracker.sqlite'
        }
    },
    authentication: {
        jwtSecret: 'secret'
    }
}