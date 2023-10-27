## Gateways

[[_TOC_]]

---

:scroll: **START**


### Introduction

This sample project is managing gateways - master devices that control multiple peripheral devices.

---

### Task description

Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.

A **Gateway** has:
- unique serial number (string);
- human-readable name (string);
- IPv4 address (to be validated);
- multiple associated peripheral devices;

Each **Peripheral Device** has:
- UID (number);
- vendor (string);
- date created;
- status (online/offline).

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service should allow:
- storing a new gateway;
- displaying information about all stored gateways (and their devices);
- displaying details about a single gateway;
- adding and removing a peripheral device from a gateway;

> Feel free to make assumptions for the design approach.

---

### Requirements

While implementing your solution **please take care of the following requirements**:

#### Functional requirements

- There is no need for UI;
- Prevent the gateway from receiving more than 10 peripheral devices;

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Unit tests;
- Use a framework of your choice, but popular, up-to-date, and long-term support versions are recommended.

---

:scroll: **END** 
