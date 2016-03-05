#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const spotify = require('spotify-node-applescript');
const SpotifyWebApi = require('spotify-web-api-node');
const _ = require('lodash');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId : 'a69ee9ea93c8453899c7a0c062711f5c',
  clientSecret : 'a29842714cb9420b99da3505ca5069af'
});

program
  .version('0.0.1');

program.command('play')
        .action(function() {
          spotify.play()
        });

program.command('search <type> <string>')
        .action(function (type, string) {
          if (type === 'artist') {
            console.log('searching artist');
            spotifyApi.searchArtists(string).then(function(output) {
              _.each(output.body.artists.items, function(artist) {
                console.log(artist.name);
              });
            });
          }

          if (type === 'track') {
            console.log('searching tracks')
          }

          if (type === 'playlist') {
            console.log('searching playlist')
          }
        });


program.parse(process.argv);

