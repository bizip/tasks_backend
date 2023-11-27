import chai from "chai";
import chaiHttp from "chai-http";
import { welcomeController } from "../controllers/index.js";
const { describe, it } = require("mocha");

chai.use(chaiHttp);
chai.should();

describe("Welcome Controller", () => {
  describe("GET /welcome", () => {
    it("should return a welcome message", (done) => {
      const req = {};
      const res = {
        json: (response) => {
          response.should.have
            .property("message")
            .equal("Welcome to Bizimungu pascal's templete!");
          done();
        },
      };
      welcomeController(req, res);
    });
  });
});
