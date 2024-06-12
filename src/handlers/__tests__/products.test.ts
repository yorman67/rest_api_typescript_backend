import request from "supertest";
import server,{ conectDB } from "../../server";
import db from "../../config/db";

describe("POST /api/products", () => {

    test("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "mouse",
            price: 100,
            availability: true
        })

        expect(response.status).toBe(201)
        expect(response.body.data.name).toBe("mouse")
        expect(response.body.data.price).toBe(100)
        expect(response.body.data.availability).toBe(true)
    })

    test("should display validation error", async () => {
        const response = await request(server).post("/api/products").send({})
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(4)
    })

    test("price should be mayor than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "mouse",
            price: 0,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El precio debe ser mayor a 0")
    })

    test("price should be a number", async () => {
        const response = await request(server).post("/api/products").send({
            name: "mouse",
            price: "10",
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El precio debe ser un numero")
    })

})

describe("GET /api/products", () => {
    test(" GET /api/products should return all products", async () => {
        const res = await request(server).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveLength(1);
        expect(res.body).not.toHaveProperty("error");
    });
})

describe("GET /api/products/:id", () => {


    test(" GET /api/products/:id shouldn't return a product", async () => {

        const product = 2000
        const res = await request(server).get(`/api/products/${product}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Producto no encontrado");
    })

    test(" GET /api/products/:id should return a product", async () => {
        const res = await request(server).get("/api/products/1");
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.body).toHaveProperty("data");
        expect(res.body).not.toHaveProperty("message");
    })


})

describe("PUT /api/products/:id", () => {

    test("should duisplay validation error", async () => {
        const res = await request(server).put("/api/products/1").send({})
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toHaveLength(4);
        expect(res.body.errors).toBeTruthy();

    })
    test("should update a product", async () => {
        const res = await request(server).put("/api/products/1").send({
            name: "mouse actualizado",
            price: 100,
            availability: true
        })
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.body).toHaveProperty("data");
        expect(res.body).not.toHaveProperty("message");
    })

    test("should update price mayor than 0", async () => {
        const res = await request(server).put("/api/products/1").send({
            name: "mouse actualizado",
            price: 0,
            availability: true
        })
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toBe("El precio debe ser mayor a 0");
        expect(res.body.errors).toBeTruthy();

    })

    test("should return 404 when product not found", async () => {
        const res = await request(server).put("/api/products/2000").send({
            name: "mouse actualizado",
            price: 100,
            availability: true
        })
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Producto no encontrado");
    })
})

describe("PATCH /api/products/:id", () => {
    test("should update availability", async () => {
        const res = await request(server).patch("/api/products/1").send({
            availability: true
        })
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.body).toHaveProperty("data");
        expect(res.body).not.toHaveProperty("message");
    })
})

describe("DELETE /api/products/:id", () => {
    test("should delete a product", async () => {
        const res = await request(server).delete("/api/products/1")
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).not.toHaveProperty("message");
    })

    test("should check id is valid", async () => {
        const res = await request(server).delete("/api/products/2000")
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Producto no encontrado");
    })
})




