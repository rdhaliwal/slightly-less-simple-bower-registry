slightly-less-simple-bower-registry
=====================

A simple registry server compatible with bower 1.x.
Designed for those who want to host their own private registry,
but also need a simple web interface to browse through the bower packages.
[Scroll down a bit ](#differences-from-the-live-bower-registry) for more information
on the difference between [@wibblymats excellent simple-bower-registry](https://github.com/wibblymat/simple-bower-registry)
and this fork/spinoff project, slightly-less-simple-bower-registry

### Usage

Install with `npm install -g slightly-less-simple-bower-registry`.

Then you can run the server as `slightly-less-simple-bower-registry`. TODO: Fix this?

The server runs on port 3333.
By default the registry data is stored in a single file `./package-data.json`.
You can specify a different file as a command-line paramater,
e.g. `slightly-less-simple-bower-registry my-package-data.json`.

To use your server with bower, update (or create) a .bowerrc file
either in your home directory or in the directory for the package
you are working on that needs the private registry.
Create a key of `registry` and set it to the URL of the registry server, e.g.

```json
{
  "registry": "http://localhost:3333"
}
```

If you would like your setup to try searching your private registry,
then the normal public one, configure your .bowerrc file as such:

```json
{
    "registry" : {
          "search" : [ "http://localhost:3333","http://bower.herokuapp.com/" ],
          "register" : "http://localhost:3333"
    }
}
```


### Differences from the live bower registry

- If you make a mistake when registering a package, you can just submit it again
and it will overwrite the existing one.
- You can use any valid endpoint, not just `git://` URLs.
- There is no database to manage. The data is kept in
memory and persisted to a plain JSON file.

### Differences from simple-bower-registry

The original [simple-bower-registry](https://github.com/wibblymat/simple-bower-registry)
 by [@wibblymat](https://github.com/wibblymat) is beautifully simple and lightweight
 but when we started using it, there were some frequently asked for features.
Primarily, the ability to get a list and search through all the
packages on a registry, as well as learning all the available
versions and dependencies of a package.

So this fork is nowhere near as simple as the original,
but it now has the `/view` context path created, which
displays the list of packages neatly, as well as providing
more information to the users that want to dig deeper.

### This code is terrible!

Probably! Checkout my github page, it's pretty empty at the moment. I'm still
quite new at this, so please, let me know why the code is terrible
and how I can unterrible-ise it.
