const errorResponse = (description: string) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" },
    },
  },
});

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "desafio1 API",
    version: "1.0.0",
    description:
      "Mock users: admin/admin123 (admin), pablo/pablo123 (user), maria/maria123 (user).",
  },
  servers: [{ url: "/api" }],
  paths: {
    "/login": {
      post: {
        tags: ["Auth"],
        summary: "Simulated login against mock credentials",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Authenticated user payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginPayload" },
              },
            },
          },
          "400": errorResponse("Missing username or password"),
          "401": errorResponse("Invalid credentials"),
        },
      },
    },
  },
  components: {
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "pablo" },
          password: { type: "string", example: "pablo123" },
        },
      },
      LoginPayload: {
        type: "object",
        properties: {
          sub: { type: "string", description: "User ID", example: "2" },
          role: { type: "string", enum: ["admin", "user"], example: "user" },
          rut: {
            type: "string",
            description: 'User rut, or "none" for admins',
            example: "12.345.678-9",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};
