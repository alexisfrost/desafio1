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
      "Mock users: admin/admin123 (admin), pablo/pablo123 (user), maria/maria123 (user). " +
      "Call POST /login, then click Authorize and paste the returned token.",
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
            description: "Signed JWT whose claims are sub, role and rut",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          "400": errorResponse("Missing username or password"),
          "401": errorResponse("Invalid credentials"),
        },
      },
    },
    "/score/{rut}": {
      get: {
        tags: ["Score"],
        summary: "Get the score for a rut",
        description: "Admins can query any rut; users can only query their own.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "rut",
            in: "path",
            required: true,
            description: "Rut with or without dots",
            schema: { type: "string", example: "12.345.678-9" },
          },
        ],
        responses: {
          "200": {
            description: "Score for the rut",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Score" },
              },
            },
          },
          "401": errorResponse("Missing, invalid or expired token"),
          "403": errorResponse("User is trying to access another user's rut"),
          "404": errorResponse("No score found for the rut"),
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "pablo" },
          password: { type: "string", example: "pablo123" },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string", description: "JWT signed with HS256" },
          tokenType: { type: "string", example: "Bearer" },
          expiresIn: { type: "string", example: "1h" },
        },
      },
      TokenPayload: {
        type: "object",
        description: "Claims inside the JWT (plus iat and exp)",
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
      Score: {
        type: "object",
        properties: {
          rut: { type: "string", example: "12.345.678-9" },
          score: { type: "number", minimum: 0, maximum: 100, example: 73 },
          fecha: { type: "string", format: "date-time", example: "2025-06-27T14:35:00Z" },
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
