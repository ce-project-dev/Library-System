let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();
var expect = chai.expect;
var assert = require("assert");

chai.use(chaiHttp);



describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /books", () => {
        it("It should have 200 status code : GET /books", (done) => {
            chai.request(server)
                .get("/books")
                .end((err, response) => {
                    response.should.have.status(200);   
                done();
                });
        });
    });
    
    describe("GET /books/id", () => {
        it("It should have 200 status code : GET /books/id", (done) => {
            chai.request(server)
                .get("/books/1")
                .end((err, response) => {
                    response.should.have.status(200); 
                    response.body.should.be.a('object');    
                done();
                });
        });
    });

    describe("GET /burrow", () => {
        it("It should have 400 status code. Burrow details cannot be get without authentication", (done) => {
            chai.request(server)
                .get("/burrow")
                .end((err, response) => {
                    response.should.have.status(400);   
                done();
                });
        });
    });

    describe("GET /burrow", () => {
        it("It should have 200 status code. Burrow details can be accessed by admin when logged", (done) => {
            chai.request(server)
                .get("/burrow")
                .end((err, response) => {
                    response.should.have.status(200);   
                done();
                });
        });
    });

    describe("GET /burrowed/id", () => {
        it("It should have 200 status code, credentials are used, now it has the authorization. : GET /burrowed/id", (done) => {
            chai.request(server)
                .get("/burrowed/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');    
                done();
                });
        });
    });


    


    describe("GET /copy", () => {
        it("It should have 400 status code. Copy details cannot get without logging", (done) => {
            chai.request(server)
                .get("/copy")
                .end((err, response) => {
                    response.should.have.status(400);
                    
                done();
                });
        });
    });

    describe("GET /copy with authorization", () => {
        it("It should have 200 status code, should return a object. Credentials are used. now Copy details can be gotten : GET /copy (with authorization) ", (done) => {
            chai.request(server)
                .get("/copy")
                .end((err, response) => {
                    response.should.have.status(200);
               
                done();
                });
        });
    });

    describe("GET /burrowedCopies/:id", () => {
        it("It should have 400 status code. borrowed copies details cannot get without logging", (done) => {
            chai.request(server)
                .get("/burrowedCopies/1")
                .end((err, response) => {
                    response.should.have.status(400);
                    
                done();
                });
        });
    });

    describe("GET /burrowedCopies/:id", () => {
        it("It should have 200 status code, should return an object. credentials are used, borrowed copies details can get now", (done) => {
            chai.request(server)
                .get("/burrowedCopies/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
    });


    describe("GET /byauthor/:id", () => {
        it("It should have 200 status code. Books can be searched by authors' name: GET /byauthor/:id", (done) => {
            chai.request(server)
                .get("/byauthor/admin9@test.com")
                .end((err, response) => {
                    response.should.have.status(200);
                    
                done();
                });
        });
    });
    
    describe("GET /byname/:id", () => {
        it("It should have 200 status code. books can be search by name anyone", (done) => {
            chai.request(server)
                .get("/byname/admin9@test.com")
                .end((err, response) => {
                    response.should.have.status(200);
                    
                done();
                });
        });
    });

    


    // //  /**
    // //  * Test the POST route
    // //  */
    
    describe('/register user', () => {
        it('it should POST the unique emai, enroll number and password to signup. Signup should pass. Expect 200 status', (done) => {
            

            let user = 
                {   
                    fname: "name1",
                    lname: "name2",
                    email:"admin9@test.com",
                    enroll : "12345",
                    password : "12345678",
                    role: "admin"
                    
                };

          chai.request(server)
              .post('/register')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.should.be.a('object');                  
                                      
                done();
              }).timeout(0);
        


        }).timeout(0);
  
    });
    
    describe('/register user', () => {
        it('it should POST the unique emai, enroll number and password to signup. Signup should fail, same credentials are used. Expect 400 status', (done) => {
            

            let user = 
                {   
                    fname: "name1",
                    lname: "name2",
                    email:"admin9@test.com",
                    enroll : "12345",
                    password : "1234567858",
                    role: "admin"
                    
                };

          chai.request(server)
              .post('/register')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(400); 
                    res.body.should.be.a('object');                  
                                    
                done();
              }).timeout(0);
        


        }).timeout(0);
  
    });

    describe('/login user', () => {
        it('it should POST the registered email and password to log. Expect 200 status', (done) => {
            

            let credentials = 
                {   
        
                    email:"admin9@test.com",
                    password : "12345678"
                    
                };

          chai.request(server)
              .post('/login')
              .send(credentials)
              .end((err, res) => {
                    res.should.have.status(200); 
               
                done();
              }).timeout(0);
       }).timeout(0);
  
    });
    
    describe('/login user', () => {
        it('it should POST the registered email and password to log. Expect 403 status because wrong password is inserted', (done) => {
            

            let credentials = 
                {   
        
                    email:"adn9@test.com",
                    password : "123ewer45678"
                    
                };

          chai.request(server)
              .post('/login')
              .send(credentials)
              .end((err, res) => {
                    res.should.have.status(403); 
                                 
                done();
              }).timeout(0);


         }).timeout(0);
  
    });

    describe('/book enterbook info', () => {
        it('it should POST a book to store details of the book in database. Expect 200 status', (done) => {
            

            let info = 
                {   
        
                
                    title: "The Hound of the Baskervilles 2",
                    author: "Sir Arthur Conan Doyle",
                    edition: "Special 1 Edition",
                    copies: "5",
                    tags: "sherlock,watson,holmes",
                    coverImageURL: "https://knoxvillechildrenstheatre.com/wp-content/uploads/2018/09/HOB-Featured-400.jpg"
                    
                
                    
                };

          chai.request(server)
              .post('/books')
              .send(info)
              .end((err, res) => {
                    res.should.have.status(200); 
                                      
                done();
              }).timeout(0);
        


        }).timeout(0);
  
    });

          
	  



});