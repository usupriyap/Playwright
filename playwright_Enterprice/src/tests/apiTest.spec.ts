import { test, expect } from "@playwright/test";

test("API test with existing context", async ({ page }) => {
  const context = page.request;

  const response = await (await context.get("/api/users?page=2")).json();
  console.log(response);
  expect(response).toHaveProperty("page");
  expect(response).toHaveProperty("per_page");
 
  
  // Assert data type and value for each property
  expect(typeof response.page).toBe("number");
  expect(response.page).toEqual(2);

  expect(typeof response.per_page).toBe("number");
  expect(response.per_page).toEqual(6);

  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toEqual(6);

  expect(typeof response.support).toBe("object");
  expect(typeof response.support.url).toBe("string");
  expect(typeof response.support.text).toBe("string");

  // Assert properties of each object in the "data" array
  for (const item of response.data) {
    expect(typeof item.id).toBe("number");
    expect(typeof item.email).toBe("string");
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(typeof item.avatar).toBe("string");
  }
});

test("API test with new context", async ({ playwright }) => {
  const apirequest = playwright.request;

  const newcontext = await apirequest.newContext({
    baseURL: "https://cat-fact.herokuapp.com",
  });

  try {
    const apiResponse = await newcontext.get("/facts/");
    
    // Check status code first
    expect(apiResponse.status()).toBe(200);
    
    const apiResponseJson = await apiResponse.json();
    expect(Array.isArray(apiResponseJson)).toBe(true);
    expect(apiResponseJson.length).toBeGreaterThan(0);
    
    for (const obj of apiResponseJson) {
      // Assert properties of each object
      expect(obj).toHaveProperty("status");
      expect(obj).toHaveProperty("_id");
      
      // Type checking
      expect(typeof obj._id).toBe("string");
      expect(typeof obj.text).toBe("string");
      if (obj.type) {
        expect(typeof obj.type).toBe("string");
      }
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  } finally {
    await newcontext.dispose();
  }
});


