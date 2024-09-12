### Operational Guidelines

**Before Thinking or Outputting Anything:**

1. **Check Configuration:**

   - Access the `./claude.config.ts` file located in the project root directory.

   **Example Output:**

   - "Checking `./claude.config.ts` for current configuration settings."

2. **Adhere to Rules:**

   - Follow all rules and meta information specified in this configuration file without exception.

   **Example Output:**

   - "Adhering to all rules and guidelines as defined in `claude.config.ts`."

3. **Reference Documentation:**

   - Prioritize using official documentation found in the docs section to ensure the accuracy of your responses.

   **Example Output:**

   - "Referencing official documentation in the docs section for accurate information."

4. **Direct File Updates:**

   - When updates to files are necessary, execute them immediately to save time. Do not display code or seek confirmation.

   **Example Output:**

   - "Executing necessary file updates directly without additional confirmation."

### Example Scenarios

**Scenario 1: Configuration File Reading**

**Problem:** How to read and use configuration information from `claude.config.ts` in the project?

- **Initialize Cache:**

  - Check if the content of `claude.config.ts` is already cached. If not, read and cache the file content.

  **Example Output:**

  - "Checking cache status... No cache found, reading `claude.config.ts` and caching content."

- **Monitor Updates:**

  - Implement a file monitoring mechanism to listen for modifications to `claude.config.ts`. Update cache if the file changes.

  **Example Output:**

  - "Starting file monitoring for changes in `claude.config.ts`."

- **Check Directory:**

  - Search the cache for files in the `docs` directory. Update cache with new file information if found.

  **Example Output:**

  - "Scanning cache for `docs` directory... New files added to cache."

- **Problem Handling:**

  - Use cached configuration information to answer questions, ensuring it is up-to-date.

  **Example Output:**

  - "Answering question using the latest cached information."

- **Reflection and Verification:**

  - Ensure answers accurately reflect the latest configuration in `claude.config.ts`.

  **Example Output:**

  - "Verification complete: Answer accurately reflects the latest configuration."

**Scenario 2: Dynamic Configuration Update**

**Problem:** How to ensure the application dynamically updates configuration at runtime?

- **Initialize Cache:**

  - Read `claude.config.ts` at startup and cache the content.

  **Example Output:**

  - "Reading `claude.config.ts` at startup and initializing cache."

- **Monitor Updates:**

  - Use a file system monitoring tool (e.g., `fs.watch`) to listen for changes in `claude.config.ts` and refresh cache on updates.

  **Example Output:**

  - "Using `fs.watch` to monitor configuration file changes and refresh cache."

- **Check Directory:**

  - Regularly scan the cache to identify new files in the `docs` directory.

  **Example Output:**

  - "Regularly scanning cache to update file information in `docs` directory."

- **Problem Handling:**

  - Implement dynamic loading logic in the application to ensure it uses the latest cached data.

  **Example Output:**

  - "Implementing dynamic loading logic to ensure application uses the latest configuration."

- **Reflection and Verification:**

  - Verify that the application correctly responds to dynamic configuration updates.

  **Example Output:**

  - "Verification complete: Application correctly responds to dynamic configuration updates."

### Response to Rule Recall Inquiry

- **If Remembered:**

  - **Example Output:**
    - "I remember the rules: Check configuration, adhere to rules, reference documentation, and update files directly. 😊"

- **If Not Remembered:**
  - **Example Output:**
    - "Could you please clarify the rules for me?"

---

Always keep these guidelines in mind to ensure your responses and actions are consistent and accurate.
