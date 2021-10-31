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
        it("It should have 200 status code.", (done) => {
            chai.request(server)
                .get("/books")
                .end((err, response) => {
                    response.should.have.status(200);   
                done();
                }).timeout(0);
        }).timeout(0);
    });
    
    describe("GET /books/id", () => {
        it("It should have 200 status code.", (done) => {
            chai.request(server)
                .get("/books/1")
                .end((err, response) => {
                    response.should.have.status(200); 
                    response.body.should.be.a('object');    
                done();
                }).timeout(0);
        }).timeout(0);
    });

    describe("GET /burrow", () => {
        it("It should have 400 status code. Burrow details cannot be get without authentication", (done) => {
            chai.request(server)
                .get("/burrow")
                .end((err, response) => {
                    response.should.have.status(400);   
                done();
                }).timeout(0);
        }).timeout(0);
    });

    describe("GET /burrowed/id", () => {
        it("It should have 400 status code, authentication is needed get burrow details by id", (done) => {
            chai.request(server)
                .get("/burrowed/1")
                .end((err, response) => {
                    response.should.have.status(400);
                    
                done();
                }).timeout(0);
        }).timeout(0);
    });

    describe("GET /lenders", () => {
        it("It should have 200 status code", (done) => {
            chai.request(server)
                .get("/lenders")
                .end((err, response) => {
                    response.should.have.status(200);
                    
                done();
                }).timeout(0);
        }).timeout(0);
    });

    describe("GET /lenders/:id", () => {
        it("It should have 200 status code", (done) => {
            chai.request(server)
                .get("/lenders/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    
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

    describe("GET /byname/:id", () => {
        it("It should have 200 status code", (done) => {
            chai.request(server)
                .get("/byname/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    
                done();
                });
        });
    });
    
    describe("GET /byname/:id", () => {
        it("It should have 400 status code. borrowed copies details cannot get without logging", (done) => {
            chai.request(server)
                .get("/byname/1")
                .end((err, response) => {
                    response.should.have.status(400);
                    
                done();
                });
        });
    });

    


    //  /**
    //  * Test the POST route
    //  */
    
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
                    // res.body.should.have.property('errors');                   
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
                    // res.body.should.be.a('object');                  
                    // res.body.should.have.property('errors');                   
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
                    // res.body.should.be.a('object');                  
                    // res.body.should.have.property('errors');                   
                done();
              }).timeout(0);
        


        }).timeout(0);
  
    });

    // describe('/login user', () => {
    //     it('it should POST user credentials to login. Expect 200 status with a user object. After login get user device details', (done) => {
            

    //         let customer = {
    //             email: "thusharaweerasundara@gmail.com",
    //             password: "test12"
               
    //         };

    //       chai.request(server)
    //           .post('/login')
    //           .send(customer)
    //           .end((err, res) => {
    //                 res.should.have.status(200); 
    //                 res.body.should.have.property('user');  

    //                 expect(res).to.have.cookie('jwt');

    //                 chai.request(server)
	//                 .get("/tanks")
	//                 .end((err, response) => {
	//                 	response.should.have.status(200);                     
    //                 	response.should.be.a('object');               	           
	//                 });


    //             done();
    //           }).timeout(0);
        


    //     }).timeout(0);
  
    // });

    



});