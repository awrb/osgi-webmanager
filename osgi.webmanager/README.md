## OSGi Web Manager

This is the backend for OSGi WebManager UI, providing a HTTP based, REST-like access to data inside an OSGi framework, such as the list of bundles,
logs and services. It also lets you publish new logs, events, stop/start/update bundles and even remotely call services. The project itself
is composed of a few bundles, intended to be deployed in Apache Karaf or similar container.

Besides providing the HTTP server, it also connects to an ActiveMQ broker and pushes data to it in real time, so that the client
can then use WebSockets or similar protocol to receive the data asynchronously. The data consists of logs, changes in bundle states, events and services.

For instance, to publish the logs, there is a bundle that connects to org.osgi.service.log.LogListener, and whenever the callback is invoked with a LogEntry object,
it will get serialized to JSON and pushed to a given ActiveMQ topic.
