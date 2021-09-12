## OSGi Web Manager

OSGi WebManager helps you remotely monitor and control what is happening inside an OSGi framework in real time with a web-based user interface.
Normally you would run your bundles in Apache Karaf or a similar container, and then execute commands such as `ld`, `la`, `stop` or `start` inside it. OSGi WebManager roughly does what these commands do (and much more), but lets you do so via an UI.

It consists of two modules:
- osgi.webmanager - a group of OSGi bundles providing HTTP and WebSocket based access to the data inside OSGi (logs, bundles, events etc.)
- osgi-webmanager-frontend - the actual interface, written in React

It can be started with the docker-compose file provided in osgi.webmanager (after building both modules with the included Dockerfiles).
