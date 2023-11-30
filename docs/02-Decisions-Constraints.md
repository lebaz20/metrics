## Decisions/Constraints

### Decisions:

1. **Serverless Functions:**
     - *Provider Selection:* Consider a serverless platform (AWS Lambda)
          - Abstract away much of the infrastructure management.
          - Scale automatically and efficiently based on demand while saving cost.
          - Microservice-friendly enabling independent development, deployment, and scaling.

2. **Streams:**
     - *Event Streaming:* Consider using event streaming services (e.g., AWS Kinesis, Apache Kafka) for real-time data processing and analytics.
     - *Stream Processing:* Choose a stream processing framework (e.g., AWS Kinesis Analytics, Apache Flink) if you need to perform real-time analytics on the streaming data.
          - Perform analytics on the streaming data in real-time aggregating average times.
          - Enforce a clear separation between client and downstream operations improving responsiveness.

3. **Time-Series Database:**
     - *Database Selection:* Consider a time-series database (Amazon TimeStream) based on scalability, performance, and compatibility with your chosen cloud provider.
     - *Data Model:* Design the time-series data model based on the specific metrics you are monitoring.
          - Time aggregate functions are best suited to the needed time-based analytics.
          - Horizontal scaling complements the scalability of the whole architecture.
          - Can enforce a clear separation between write and read operations following Command Query Responsibility Segregation (CQRS) to improve visualization performance.

4. **Programming Languages:**
     - *Node.js and React.js:* If your team is proficient in Node.js and React.js, these can be good choices for server-side and client-side development. Consider serverless frameworks for Node.js (e.g., Serverless Framework) to simplify deployment.
          - Consistent language across the entire stack, from front end to back end.
          - Node.js is known for its fast execution speed, which can be beneficial for serverless functions that need to start quickly and respond to requests rapidly.
          - We are running short-lived tasks without CPU-intensive tasks or High-memory demand, So single-threaded and relatively high-memory consuming Node.js is a good choice here.

5. **Authentication and Authorization:**
     - *User Authentication:* Decide on the authentication mechanism for users (e.g., OAuth, JWT).
     - *Authorization:* Implement proper authorization controls to ensure that users have access only to the metrics they are allowed to see.
          - Stateless serverless functions can make use of JWT authentication.
          - CSRF (Cross-Site Request Forgery) Protection:
               - Implement anti-CSRF tokens in forms to prevent malicious requests.
               - Set the `SameSite` attribute for cookies to prevent cross-site requests.
          - XSS (Cross-Site Scripting) Protection:
               - Validate and sanitize all user inputs on the server side.
               - Mark sensitive cookies as `HttpOnly` to prevent JavaScript access.

6. **COTS for Visualization:**
     - *Proven Functionality:* Developed and tested by experienced vendors, which means they often come with proven functionality and features that have been refined through extensive use.
          - Visualization requirements are pretty standard, so we don't need to re-invent the wheel saving us time and cover all needed features.
          - Features like **Single-sign-on** can control access to dashboards.
          - Features like **Real-Time Updates** can achieve real-time updates.

7. **UI/UX Design:**
     - *React.js Components:* Design reusable React.js components for displaying metrics and charts.
     - *User-Friendly Interface:* Create an intuitive and user-friendly interface for users to interact with metrics.
          - React's declarative syntax allows developers to describe the desired UI state, and React takes care of updating and rendering the UI efficiently. This simplifies the process of building and maintaining complex user interfaces.
          - React utilizes a virtual DOM to optimize the rendering process. Changes to the virtual DOM are batched and efficiently updated in the real DOM, reducing the number of manipulations and enhancing performance.
          - JSX is a syntax extension for JavaScript that allows developers to write UI components in a syntax similar to HTML. This makes the code more readable and expressive, enhancing the developer experience.
          - React extends its capabilities to mobile development with React Native. Developers can use React skills to build cross-platform mobile applications.
          - React is widely adopted. It has a large and vibrant community of developers and rich ecosystem. It is backed by a large tech company (Meta).

------

### Constraints:

1. **Cold Starts:**
     - *Serverless Cold Starts:* Be aware of potential cold start delays in serverless functions, especially if your application requires low-latency responses.
          - Traffic patterns contribute a lot to this phenomenon. Extreme spikes or low traffic increase the susceptibility to cold starts.
          - Warm-up solutions can essentially keep live instances to be ready for traffic.

2. **Data Consistency:**
     - *Eventual Consistency:* Understand and design for eventual consistency, especially when dealing with distributed systems and streaming data.
          - Streams, Time-series and CQRS pattern lead to eventual consistency in favor of fault-tolerance and availability (CAP theorem).
          - Metrics monitoring and visualization is expected to endure large traffic which would benefit from strong scalability and decoupling between different services.
          - The system prioritizes the patterns or trends in data rather than requiring exact, synchronized numbers. This is almost fine for metrics monitoring and visualization use case.

3. **Data Retention:**
     - *Data Retention Policies:* Define data retention policies for time-series data to manage storage costs and ensure relevant data is retained.
          - We can not keep data forever. Metrics can accumulate very fast and we need to remove data after certain periods to keep the system performant.

4. **Monitoring and Logging:**
     - *Logging:* Implement comprehensive logging to facilitate debugging and monitoring. Utilize cloud-native monitoring tools for serverless functions and time-series databases.
          - Tracing a message across all endpoints is a bit challenging in distributed systems and we need to rely on stuff like correlation identifiers.

5. **Cost:**
     - *Pay-as-you-go model:* Serverless model allows for paying for the actual traffic. However, there are still idle resources costs that need traffic to pass a certain threshold to make sense economically.
     - *Unanticipated Scaling Costs:* It's a rare occurrence, Still rapid or unexpected scaling due to bugs/ unhandled scenarios, not actual traffic spikes can result in higher-than-anticipated costs.
     - *Lower Environments:* Testing and development environments that mirror production can contribute to additional costs.
          - Configurable Provision and Teardown can save some cost although it's an extra complexity added.

6. **Vendor Lock-In:**
     - *Portability:* Depending heavily on specific cloud providers or services can lead to vendor lock-in, making it challenging to switch providers or services without significant effort and cost.
          - We need to separate vendor-specific configurations/ services in order to quantify the amount of needed changes needed to migrate.
          - We can start using multi-cloud strategies from the start according to the application sensitivity and the importance of exit strategies.
          - Avoid Proprietary Services although they can provide a lot more features that support our use case with less effort.

7. **Local Environment:**
     - *Serverless:* Although there are emulators. They still don't cover all services and it's a well-known limitation. We didn't want a server to manage. As a result, We don't have a container to run locally to exactly match the live environment.
     - *Proprietary services/ COTS:* Cloud-based services usually do not provide a solution for local development.
          - Lower environments can provide a workaround for that limitation. However, It can contribute to additional costs.
