import supertest from "supertest";
import app from "./../server";
(async () => {
  const request = await supertest(app);
  describe("Express Application", () => {
    it("should get get test route", () => {
      request.get("/").expect(200);
    });
  });
})();
