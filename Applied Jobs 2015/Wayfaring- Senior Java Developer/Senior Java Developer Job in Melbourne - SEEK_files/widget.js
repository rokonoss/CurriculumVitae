!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){"use strict";console&&console.log("CandidateComms: AppLoader: build v1.0.605, branch: master, hash: c2486f, date: 2015-10-30T01:54:10.897Z");var o=!1,r=location.search.indexOf("relpath=");~r&&"true"===location.search.substr(r+8,4)&&(o=!0);var i=document.getElementsByTagName("script")[0],a=document.createElement("script"),s=o?"":"//seekcdn.com/candidate-comms/desktop/",c=location.search.match(/commsversion=.*/),l=c?c[0].replace("commsversion=","").replace(/&.*/,""):null;l&&(s=s+l+("/"===l[l.length-1]?"":"/")),a.async=!0,a.src=s+"app.js",i.parentNode.insertBefore(a,i)}]);