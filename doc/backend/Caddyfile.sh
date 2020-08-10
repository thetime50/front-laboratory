
www.thetime50.com:80 {
    root /var/www/thetime50
    tls off

    proxy /rawgit https://cdn.rawgit.com {
        header_upstream Host {host}
        header_upstream X-Real-IP {remote}
        header_upstream X-Forwarded-For {remote}
        header_upstream X-Forwarded-Proto {scheme}
  }
}
thetime50.com:80 {
    root /var/www/thetime50
    tls off
}