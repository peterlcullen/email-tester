this is a small job which sends html emails using your gmail account.  it's meant for testing...

```
$ git clone https://github.com/peterlcullen/email-tester
$ cd email-tester
$ npm install
$ cp config.js-dist config.js
$ mkdir emails
```

then....

- update config.js with your email info...
- add any html emails you want to send into the `emails/` folder

to run:
```
$ node app
```