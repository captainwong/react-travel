# docker notes

## windows install

1. enable `Intel Virtualization Technology` in BIOS
2. enable `HyperV` in `windows features`
3. download docker-desktop from https://www.docker.com/ and install

## install centos 8 image

```bash
docker pull centos:latest
docker run -p 9999:80 --name web -i -t /bin/bash
```

then check centos version in the new shell:

```bash
cat /etc/centos-release
```

my output is:

```bash
CentOS Linux release 8.4.2105
```

when running `yum update`, it shows:

```
Error: Failed to download metadata for repo 'AppStream': Cannot prepare internal mirrorlist: No URLs in mirrorlist
```

based on this [article](https://yegorshytikov.medium.com/error-failed-to-download-metadata-for-repo-appstream-cannot-prepare-internal-mirrorlist-no-959768e5f8e5#:~:text=Fix%20Failed%20to%20download%20metadata%20for%20repo&text=that's%20means%20CentOS%208%20will,they%20will%20be%20archived%20permanently.&text=Go%20to%20the%20%2Fetc%2Fyum,repos.)

>CentOS Linux 8 had reached the End Of Life (EOL) on December 31st, 2021. that’s means CentOS 8 will no longer receive development resources from the official CentOS project.
>
>After Dec 31st, 2021, if you need to update your CentOS, you need to change the mirrors to vault.centos.org where they will be archived permanently.


do this to fix:

```bash
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
yum update
```

### install nginx

```bash
rpm -ivh https://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
# note that its `el7` with an `L` lowercase, not `e17` with an number `1`
yum install nginx -y
nginx
```

## build docker image

create `Dockfile`

run:

```bash
docker build -t react-travel-front-end .
```

check docker images:

```bash
docker images
```

there should be a `react-travel-front-end` image in the output.

start the image:

```bash
docker run -d -p 10080:80 react-travel-front-end
```

check if the image is running:

```
docker ps
```

