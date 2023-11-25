[Metrics](#Metrics)
- [Requirements](#Requirements)
   - [Functional Requirements](#Functional%20Requirements)
   - [Non-Functional Requirements](#Non-Functional%20Requirements)
- [Architecture](#Architecture)
   - [Iteration-1: Monolith](#Iteration-1:%20Monolith)
		- [Which Database type?](#Which%20Database%20type?)
			- [Our pick](#Our%20pick:%20Time-series%20Database)
			- [Let’s dive more in the consistency aspect](#Let’s%20dive%20more%20in%20the%20consistency%20aspect)
   - [Iteration-2: Microserivces](#Iteration-2:%20Microserivces)
		- [Why Serverless?](#Why%20Serverless?)
   - [Iteration-3: Event-Driven](#Iteration-3:%20Event-Driven)
   - [Iteration-4: CQRS](#Iteration-4:%20CQRS)
		- [How to read data effectively?](#How%20to%20read%20data%20effectively?)
   - [Iteration-5: COTS](#Iteration-5:%20COTS)

# Metrics
A Frontend + Backend application that allows you to post and visualize metrics.

## Requirements
### Functional Requirements
- Post metrics with name, value and Timestamp.
- Visualize metrics in a timeline with averages per minute/hour/day.

### Non-Functional Requirements
- Scalability: Design for horizontal scalability to handle increasing data volumes.
- Cost Optimization: Optimize costs by selecting appropriate storage and processing solutions.

------------

## Architecture
### Iteration-1: Monolith
![](https://drive.google.com/uc?id=1QmQQNMKejtihh-PY9VIghNaOsuMGHYY_)

This is a **Monolith** architecture.

All components and features are tightly integrated and interdependent. It is a single, indivisible unit, often characterized by a unified codebase and a shared database. In a monolithic architecture, the entire application is typically deployed as a single executable or a set of tightly connected executables.

| **Pros** | **Cons** |
|-------------------------------------|--------------------------------------|
| **Simplicity:** Easier to develop, test, and deploy due to tight integration. | **Scalability Challenges:** Scaling the entire application, even for specific components, can be challenging. |
| **Easier Development and Testing:** Simplicity facilitates development and testing processes. | **Limited Technology Flexibility:** Adapting to new technologies can be difficult. |
| **Simplified Deployment:** Straightforward deployment with only one application. | **Difficult Maintenance:** Maintenance and making changes can become complex and risky as the application grows. |
| **Centralized Data Management:** Data management and querying can be more straightforward. | **Reduced Fault Isolation:** A failure in one part can impact the entire system. |
| **Simplified Debugging:** Debugging is often simpler in a monolith. | **Limited Team Independence:** Large teams may face challenges working independently. |
| **Development Speed:** Can lead to faster development cycles for small to medium-sized applications. | **Deployment Challenges:** Rolling out updates may require deploying the entire application. |
|                                     | **Difficult to Adopt Microservices:** Transitioning to microservices can be complex and require a complete rewrite. |
|                                     | **Potential for Code Bloat:** May accumulate unnecessary features and code over time. |

This solution is fine for low data volume and low traffic.

However, This is just the first of multiple iterations in order to achieve the requirements above (functional and non-functional).

------------

#### Which Database type?

One important aspect in the current state is the database. We need to pick up the type of database before moving forward as it will impact our following choices.

Here are the database types we can consider for the current use case:

| Feature                | SQL Databases                       | NoSQL Datatbases                    | Time-series Databases*                  |
|------------------------|------------------------------------|------------------------------------|------------------------------------|
| **Data Model**         | Structured                         | Flexible                           | Time-ordered                       |
| **Scalability**        | Vertical scaling                   | Horizontal scaling                 | Horizontal scaling                 |
| **Consistency**        | ACID properties                    | May vary (CAP theorem)             | Strong consistency for time series |
| **Query Language**     | SQL                                | Varies by database type            | SQL-like, optimized for time series |
| **Use Cases**          | General-purpose                    | Varied, including unstructured data | Time-ordered data analysis         |

**AWS TimeStream was used as a reference for time-series databases in the comparison above due to the high variance between different time-series databases.*

##### Our pick: Time-series Database

One critical functional requirement is showing averages per minute/hour/day. This is where time-series database shines compared to other types.

------------

##### Let's dive more in the consistency aspect

ACID properties are a set of properties that guarantee the reliable processing of database transactions. ACID is an acronym that stands for Atomicity, Consistency, Isolation, and Durability.

1. Atomicity (A):

	3. Atomicity ensures that a transaction is treated as a single, indivisible unit of work. Either all the changes made by the transaction are committed to the database, or none of them are.

	5. Example: In a banking transaction where funds are transferred from one account to another, either the entire transaction (debit from one account and credit to another) succeeds or fails as a whole.

7. Consistency (C):

	9. Consistency ensures that a transaction brings the database from one valid state to another. The database should satisfy all defined integrity constraints before and after the transaction.

	11. Example: If a database enforces a constraint that all account balances must be positive, a transaction attempting to set an account balance to a negative value would violate consistency.

13. Isolation (I):

	15. Isolation ensures that the execution of transactions concurrently does not result in a state that is equivalent to executing them sequentially. Each transaction should be isolated from the effects of other concurrent transactions until it is committed.

	17. Example: If two transactions are being executed concurrently, the outcome should be the same as if they were executed in some sequential order.

19. Durability (D):

	21. Durability guarantees that once a transaction is committed, its effects persist even in the event of a system failure. The changes made by the transaction are permanently stored in the database and survive subsequent system crashes or restarts.

	23. Example: If a user makes a purchase online and the transaction is confirmed, the information about the purchase should be durable, and the user should not lose their confirmation even if there is a system failure immediately after the confirmation.

Some NoSQL databases and distributed systems may relax these properties to achieve higher scalability and performance, introducing the concept of eventual consistency following the CAP theorem.
The CAP theorem is a concept in distributed systems that highlights the trade-offs between three desirable properties: Consistency, Availability, and Partition Tolerance.
The CAP theorem states that in a distributed system, you can achieve at most two out of the three properties simultaneously. Here's a brief explanation of each:

- Consistency (C):

	- All nodes in the distributed system see the same data at the same time. In other words, a read operation will return the most recent write.
- Availability (A):

	- Every request to the system receives a response, without guarantee that it contains the most recent version of the information. In other words, the system is always responsive, even if it returns stale data.
- Partition Tolerance (P):

	- The system continues to operate even when network partitions occur, meaning communication failures happen between nodes.

**Time-series database (AWS TimeStream in this case) makes a choice to apply strong consistency while following the CAP theorem.**

------------

### Iteration-2: Microserivces
![](https://drive.google.com/uc?id=1eJLBOFn4Y3DLGSI9h8iYTG0-_zdwK89H)

This is a **Microserivces** architecture using **Serverless** model.

An architectural style for developing software applications as a collection of small, independent services, each focused on a specific business capability. These services are designed to be modular, loosely coupled, and independently deployable.

| **Pros** | **Cons** |
|----------------------------------------|-----------------------------------------|
| **Scalability:** Each microservice can be scaled independently based on demand. | **Complexity:** Managing a distributed system introduces additional complexity. |
| **Technology Diversity:** Enables the use of diverse technologies for different microservices. | **Operational Overhead:** Increased operational overhead due to managing multiple services. |
| **Independence:** Teams can work independently on different microservices. | **Integration Challenges:** Requires robust mechanisms for service communication and integration. |
| **Fault Isolation:** Failures in one microservice don't necessarily impact the entire system. | **Development Overhead:** Development and deployment processes can become more complex. |
| **Rapid Development:** Easier to develop and deploy small, focused services. | **Learning Curve:** Requires a shift in mindset and additional learning for development teams. |
| **Flexibility:** Easier to adopt new technologies and make changes to individual services. | **Consistency:** Ensuring data consistency between microservices can be challenging. |
| **Improved Fault Tolerance:** Isolating failures improves overall system resilience. | **Deployment Challenges:** Coordinating deployments and updates across multiple services. |
| **Modularity:** Easier to understand and maintain due to modularity. | **Infrastructure Costs:** Increased infrastructure costs and resource consumption. |
| **Autonomous Teams:** Each microservice can be developed, deployed, and scaled independently. | **Data Management:** Handling data consistency and transactions across services can be complex. |
| **Elasticity:** Enables dynamic scaling of individual services based on demand. | **Service Discovery:** Requires a reliable service discovery mechanism. |
| **Continuous Delivery:** Supports continuous delivery and deployment practices. | **Monitoring and Tracing:** Requires advanced monitoring and tracing for visibility. |

------------

#### Why Serverless?

Serverless computing is a cloud computing execution model where cloud providers automatically manage the infrastructure, allowing developers to focus solely on writing code for their applications.

| **Pros**                     | **Cons**                             |
|------------------------------------------------------|------------------------------------------------------------|
| **Simplified Infrastructure Management:** Abstracts away much of the infrastructure management. However, it may introduce new considerations related to function monitoring, logging, and troubleshooting. | **Cold Start Latency:** May experience a latency known as "cold start" when they are invoked after a period of inactivity, impacting response times. |
| **Automatic Scaling:** Automatically scale functions based on demand, eliminating the need for manual scaling of individual microservices.  | **Limited Execution Time:** Often have execution time limits, restricting the use for long-running processes that might be suitable for microservices. |
| **Cost Efficiency:** Follows a pay-as-you-go model, potentially reducing costs for applications with variable workloads compared to the constant infrastructure costs of microservices. However, there are potential hidden costs | **Limited Language Support:** May have limitations on supported programming languages compared to the broader language support in microservices.|
| **Rapid Development:** Allows for rapid development of small, focused functions, making it easier to iterate on features and deploy updates quickly. However, Local development is often more complicated. | **Vendor Lock-In:** Transitioning to serverless may introduce dependencies on specific cloud providers, leading to vendor lock-in.  |
| **Focus on Code:** Developers can focus more on writing code and less on infrastructure concerns, accelerating development cycles. | **Statelessness:** Designed to be stateless, and managing state can be more challenging compared to microservices, where state management is more flexible.  |
| | **Integration Challenges:** Moving from microservices to serverless requires robust strategies for function communication and integration, especially when dealing with complex, interdependent services. |
| | **Learning Curve:** Adopting serverless may require a shift in mindset and additional learning for development teams accustomed to microservices. |

------------

### Iteration-3: Event-Driven
![](https://drive.google.com/uc?id=15ThIFJZQHlaZVpnxLorwyDDseH-wStMb)

This is now utilizaing **Event-Driven** architecture

An architectural pattern that emphasizes the production, detection, consumption, and reaction to events. In an event-driven system, events are used to represent significant changes or occurrences in the system, and components communicate by producing or consuming these events. This approach decouples different parts of the system, promoting modularity, scalability, and flexibility.

| **Pros**                     | **Cons**                             |
|------------------------------------------------------|------------------------------------------------------------|
| **Loose Coupling:** Enables decoupling of components, leading to greater flexibility and easier maintenance. | **Complexity:** Introduces complexity in designing and managing event flows, handlers, and subscribers. |
| **Scalability:** Supports independent evolution and scaling of components, allowing for better overall system scalability. | **Event Ordering:** Ensuring event ordering can be challenging, especially in a distributed system. |
| **Real-time Responsiveness:** Facilitates real-time processing and responsiveness to events, making it suitable for dynamic systems. | **Debugging:** Debugging can be more challenging as events are asynchronous and distributed. |
| **Flexibility:** Easier addition of new features or functionalities without disrupting the entire system. | **Inconsistency:** Achieving strong consistency across services can be challenging. |
| **Fault Tolerance:** Improves fault tolerance by allowing components to continue processing events independently. | **Learning Curve:** Developers may require time to adapt to the event-driven paradigm. |

------------

### Iteration-4: CQRS
![](https://drive.google.com/uc?id=1_JZidJslj4fKRBSItP6R9nG-akj5vkrP)

This is now utilizaing **CQRS** architecture.

Command Query Responsibility Segregation (CQRS) is an architectural pattern that separates the command (write) and query (read) responsibilities of a system into distinct components.

| **Pros**                             | **Cons**                                       |
|-----------------------------------------------|--------------------------------------------------------|
| **Separation of Concerns:** Enforces a clear separation between write and read operations, making the codebase more modular and easier to understand. | **Complexity:** Introduces additional complexity to the system, as developers need to manage separate models for read and write operations.     |
| **Optimized Read and Write Models:** Allows the optimization of data models for read and write operations independently, leading to better performance in specific use cases. | **Learning Curve:** Requires developers to understand and implement the concepts of command and query segregation, potentially increasing the learning curve.    |
| **Scalability:** Enables independent scaling of read and write components. Read-intensive and write-intensive parts of the system can be scaled separately. | **Synchronization Challenges:** Synchronization of data between read and write models can be challenging and may introduce latency or consistency issues.|
| **Flexibility in Data Storage:** Permits the use of different data storage mechanisms for read and write operations, optimizing each for its specific requirements.  | **Increased Development Time:** Developing and maintaining separate models for reads and writes can increase development time and effort. |
| **Event Sourcing Support:** Works well with event sourcing, where changes to the application state are captured as a series of events. | **Potential Consistency Issues:** In scenarios where eventual consistency is chosen, there might be periods when the read and write models are not perfectly in sync.|
| **Improved Performance:** Can lead to improved performance for read operations as the read model can be denormalized for faster query responses. | **Infrastructure Overhead:** Requires additional infrastructure to manage the complexity of separate models and data synchronization. |
| **Easier Implementation of Complex Queries:** Simplifies the implementation of complex queries by allowing the creation of dedicated read models tailored to specific query requirements. | **Not Always Necessary:** CQRS might introduce unnecessary complexity for smaller applications or scenarios where the benefits of separation are not realized. |

------------

#### How to read data effectively?
<img src="https://drive.google.com/uc?id=1NLNTvuGiaRuqdork6MLBqYcofDq8KYtd" width="70%"/>

One critical functional requirement is showing averages per minute/hour/day. This is where streams and time-series database shines compared to other solutions.

**Streams Processing**
- Real-Time Data Processing:
	- Designed for real-time data processing and analytics.
- Built-in Analytics:
	- Kinesis Data Analytics for instance enables you to process and analyze streaming data using SQL queries.
	- This will be used to generate average per minute analytics from raw data in a separate table for reading queries.

**Time-series Database**
- Use Timestream's capabilities for aggregating and downsampling data for query optimization.
	- Scheduled queries for instance can be used to process and analyze streaming data using SQL-like queries.
	- This will be used to generate average per hour analytics from average per minute data in a separate table for reading queries. Same for average per day using average per hour data optionally.

------------

### Iteration-5: COTS
![](https://drive.google.com/uc?id=1aEm-mb-e164g9aISS-t_khH987DvdPl0)

This is now utilizaing **COTS**.

COTS (Commercial Off-The-Shelf) refers to software or hardware products that are ready-made and available for purchase from third-party vendors. These products are designed to be used "as is" without the need for significant customization. 

| **Pros**                        | **Cons**                           |
|-----------------------------------------|-------------------------------------------|
| **Cost Savings:** Can be cost-effective as they often have lower upfront costs compared to custom-developed solutions. Licensing and maintenance costs are typically spread across multiple users.| **Limited Customization:** Designed to be generic and may not perfectly align with the specific needs and workflows of every organization. Customization options may be limited.                    |
| **Time Savings:** Can save time as they are ready-made and can be quickly deployed. This is particularly beneficial when time-to-market is critical. | **Vendor Dependence:** Organizations become dependent on the COTS vendor for updates, support, and maintenance. If the vendor goes out of business or discontinues support, it can pose challenges.                         |
| **Proven Functionality:** Developed and tested by experienced vendors, which means they often come with proven functionality and features that have been refined through extensive use.                   | **Integration Challenges:** Integrating COTS solutions with existing systems can be challenging, especially if there are compatibility issues or if the organization's needs are highly specific.|
| **Vendor Support:** Usually come with vendor support, including updates, patches, and documentation. This can reduce the burden on in-house support and maintenance teams.                         | **Security Concerns:** May pose security concerns if they are not regularly updated or if vulnerabilities are discovered. Organizations must rely on vendors to promptly address security issues.                         |
| **Scalability:** Designed to scale and adapt to the needs of different organizations. They can often accommodate a growing user base or increased workloads.                            | **Overhead for Unused Features:** Often come with a set of features that may not be applicable to all users. This can lead to unnecessary overhead and complexity.|
| **Interoperability:** Often built to industry standards, promoting interoperability with other systems and technologies. This can simplify integration with existing infrastructure.| **Lack of Competitive Advantage:** Using them may not provide a competitive advantage, especially in industries where differentiation is key.|
| **Focus on Core Competencies:** Allows organizations to focus their resources and efforts on their core competencies rather than spending time and resources on developing and maintaining software or systems.| **Upfront Costs for Licensing:** While the long-term costs may be lower, there can be significant upfront costs associated with licensing COTS solutions, depending on the number of users and features needed.               |
