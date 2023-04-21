#!/usr/bin/env node

// node html\node-media-server-test\app.js -fp D:\Downloads\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe

const NodeMediaServer = require('node-media-server');

const path = require('path')

// const httpAssertAddr = __dirname
const httpAssertAddr = path.dirname(require.resolve('node-media-server')) + '/../bin'
// 
let argv = require('minimist')(process.argv.slice(2), {
    string: ['rtmp_port', 'http_port', 'https_port', 'ffmpeg_path'],
    alias: {
        'rtmp_port': 'r',
        'http_port': 'h',
        'https_port': 's',
        'ffmpeg_path': 'fp',
    },
    default: {
        'rtmp_port': 1935,
        'http_port': 8000,
        'https_port': 8443,
        'ffmpeg_path': '/usr/local/bin/ffmpeg',
    }
});

if (argv.help) {
    console.log('Usage:');
    console.log('  node-media-server --help // print help information');
    console.log('  node-media-server --rtmp_port 1935 or -r 1935');
    console.log('  node-media-server --http_port 8000 or -h 8000');
    console.log('  node-media-server --https_port 8443 or -s 8443');
    console.log('  node-media-server --ffmpeg_path /usr/local/bin/ffmpeg or -fp /usr/local/bin/ffmpeg');
    process.exit(0);
}

const config = {
    rtmp: {
        port: argv.rtmp_port,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
        // ssl: {
        //   port: 443,
        //   key: httpAssertAddr+'/privatekey.pem',
        //   cert: httpAssertAddr+'/certificate.pem',
        // }
    },
    http: {
        port: argv.http_port,
        mediaroot: httpAssertAddr + '/media',
        webroot: httpAssertAddr + '/www',
        allow_origin: '*',
        api: true
    },
    https: {
        port: argv.https_port,
        key: httpAssertAddr + '/privatekey.pem',
        cert: httpAssertAddr + '/certificate.pem',
    },
    auth: {
        api: true,
        api_user: 'admin',
        api_pass: 'admin',
        play: false,
        publish: false,
        secret: 'nodemedia2017privatekey'
    },
    trans: {
        ffmpeg: argv.ffmpeg_path,
        tasks: [{
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            hlsKeep: true, // to prevent hls file delete after end the stream
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            dashKeep: true // to prevent dash file delete after end the stream
        }]
    }
};


let nms = new NodeMediaServer(config);
nms.run();

nms.on('preConnect', (id, args) => {
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
});

nms.on('postConnect', (id, args) => {
    console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
    console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
