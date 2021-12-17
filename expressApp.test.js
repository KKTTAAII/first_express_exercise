const express = require("express");
const request = require("supertest");

describe("Finding med/mod/mean app", () => {
  let server;
  beforeEach(function () {
    server = require("./expressApp");
  });
  afterEach(function () {
    server.close();
  });
  test("return mean", async () => {
    const res = await request(server).get("/mean?nums=2,5,8,9,7,5");
    expect(res.body.value).toEqual(6);
    expect(res.body.operation).toEqual("mean");
  });
  test("return mode", async () => {
    const res = await request(server).get("/mode?nums=2,5,8,9,7,5");
    expect(res.body.value).toEqual(5);
    expect(res.body.operation).toEqual("mode");
  });
  test("return median", async () => {
    const res = await request(server).get("/median?nums=2,5,8,9,7,5,10");
    expect(res.body.value).toEqual(7);
    expect(res.body.operation).toEqual("median");
  });
  test("return no num provided error", async () => {
    const res = await request(server).get("/mean");
    expect(res.status).toEqual(400);
    expect(res.text).toContain("Nums must be provided")
  });
  test("return invalid num error", async () => {
    const res = await request(server).get("/mean?nums=jfnfh,6,8,7");
    expect(res.status).toEqual(400);
    expect(res.text).toContain("jfnfh is not a number")
  });
});
