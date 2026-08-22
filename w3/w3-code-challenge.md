# Week 3 Challenge: The Custom Order Form

**Objective:**
Upgrade your Shopping Cart! You are moving from a simple button click to a fully functional **Order Form**. You will practice using **ES6 Modules**, **Objects**, and **Form Data extraction**.

**Scenario:**
The store now sells custom T-Shirts. Users can't just click "Add"; they need to specify the size and quantity. You need to refactor your code to split the logic into two files: one for handling the form data (Module) and one for running the app (Main).

---

## Step 1: The New HTML

In your public repo (ex riow-pub) create a new folder named w3, it will be at the same level as w2 from last week. Copy the ending files from the Shopping Cart Code Challenge.

Replace the body of your `index.html` with the following code.
Replace your `<body>` content with this new form. Notice we are using `<form>`, `<input>`, and types like `number`, `radio`, and `checkbox`.

**Note:**  In the HTML head section replace the existing script with this syntax `<script type="module" src="app.js"></script>` The `type="module"` is crucial! Update the title to be `The Custom Order Form`.

```html
<body>
    <h1>Custom T-Shirt Order</h1>
    
    <form id="order-form">
        
        <label>Quantity ($15 each): 
            <input type="number" id="qty" value="1" min="1">
        </label>
        <br><br>

        <label>Size:</label>
        <label><input type="radio" name="size" value="Small" checked> S</label>
        <label><input type="radio" name="size" value="Medium"> M</label>
        <label><input type="radio" name="size" value="Large"> L</label>
        <br><br>

        <label>
            <input type="checkbox" id="gift-wrap"> Add Gift Wrap?
        </label>
        <br><br>

        <button type="submit">Place Order</button>
    </form>

    <hr>
    
    <div id="order-summary">
        <p>Order Details will appear here...</p>
    </div>
</body>
```
### ✅ Step 1 Checkpoint
Once done, review your HTML carefully
Refresh the browser to ensure no errors appear
Before moving on to the next step, commit your changes using this message:
**Commit message:** `Step 1 Complete`

## Step 2: Create the Module (`order-handler.js`)
Create a new file named `order-handler.js`. This file's **only** job is to look at the form and return the data.

**Requirements for this file:**
1.  **Select your elements:** Get references to the Quantity input, the Gift Wrap checkbox, and the Size radio buttons (use `querySelectorAll` for radios).
2.  **Create a helper function:** Write a function (similar to `getSelectedRadioValue` in the lecture) to figure out which Size radio button is checked.
3.  **Export the Main Function:** Create and `export` a function named `getOrderInputs`.
    * It should return an **Object**.
    * The object should have keys for `qty`, `size`, and `giftWrap`.
    * *Hint: `qty` should be a Number (use `parseInt`), `size` should be a string, and `giftWrap` should be a boolean (`.checked`).*
---
### Step 2.5: Sanity Check (Test Your Logic)
Before building the full app, let's make sure your module works and finds the elements correctly.

1.  **Connect the file:** Open `app.js` and add this single line at the very top so the browser loads your new file:
    ```javascript
import * as orderForm from "./order-handler.js";
```

2.  **Add a test log:** In the `order-handler.js` add this temporary line at the very bottom of the file:
    ```javascript
    // TEMPORARY TEST:
    console.log(getOrderInputs());
    ```

3.  **Check the Console:** Save your files and look at the browser console.
    * **Success:** You should see an Object with the default values (e.g., `{qty: 1, size: "Small", ...}`).
    * **Failure:** If you see "null" or an error, check your selectors (IDs vs Names).

4.  **Cleanup:** Once it works, **delete the `console.log` line** from `order-handler.js`. You can leave the import in `app.js` for the next step.

### ✅ Step 2 Checkpoint
Test everything again and before moving on to the next step, commit your changes using this message:
**Commit message:** `Step 2 Complete`

## Step 3: Refactor the App (`app.js`)
Open your `app.js`. Clear out the old Week 2 code.

**Requirements for this file:**

1.  **Import:**
    * We did on Step 2*

2.  **Select Elements:**
    * Get a reference to the `<form>` (ID: `order-form`).
    * Get a reference to the `order-summary` div.

3.  **The Submit Function (`handleOrderSubmit`):**
    * Create a function named `handleOrderSubmit` that accepts the `event` as an argument.
    * **Stop the reload:** Call `event.preventDefault()`.
    * **Get Data:** Call `orderHandler.getOrderInputs()` to get the data object.
    * **Update the Page:** Update the `textContent` of the summary div to show the order details (e.g., *"Ordered 5 Large T-Shirts"*).

4.  **The Init Function:**
    * Create a function named `init`.
    * Inside it, attach the `'submit'` event listener to your form. When the form is submitted, run `handleOrderSubmit`.
    * Add a console log like "App Initialized" so you know it ran.

5.  **Start the App:**
    * Add an event listener to the `document` that listens for `'DOMContentLoaded'`.
    * When the DOM is ready, call your `init` function.

### ✅ Step 3 Checkpoint
Before moving on to the next step, commit your changes using this message:
**Commit message:** `Step 3 Complete`