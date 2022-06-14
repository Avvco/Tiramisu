# Tiramisu_Laravel

## Note

Beacuse of Symbolic Links problem, we must run `npm install --no-bin-links` inside VM, which will download the dependencies successfully but cause the `bin` folder of `node_modules` not being set.

So we can't install npm dependencies inside VM, so we have to install it outside the VM.

Here is an approach to install npm dependencies:

```batch
docker run -it --rm -v %cd%:/tmp -w /tmp node npm install <your dependency>
```
