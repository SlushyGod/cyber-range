# Cyber Range

Modular platform for deploying CTF infrastructure. Developed for AWS, designed for integrating with most systems.

Also a learning project, wanted to learn more about OOP, design patterns, and cloud development.

Develop as a library, but can break things down into a microservice later.

## Deploy

[Steps for deploying with terraform]

TODO:
- [ ] Have a docker-compose file so that the project can exist on the current machine
- [ ] ChallengeRepo has Challenge which is a baseclass for creating things like AWSChallenge which is the interface for interacting with challenges, ChallengeRepository can be a base class for interacting with the database, so that way you can add challenges in a speicific way
