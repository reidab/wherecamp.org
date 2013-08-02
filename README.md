# [wherecamp.org](http://wherecamp.org)

The global WhereCamp website.

## What's a WhereCamp?

WhereCamps are [unconferences](http://en.wikipedia.org/wiki/Unconference) focused on the intersection of geography, technology, design, and culture. They aim to connect geo-enthusiasts, developers, social place hackers, artists, activists, grad students, geographers, earth scientists and anybody else who wants to "know their place".

Popular topics include social cartography, software and hardware, context awareness, mobile development, humanitarian mapping efforts, food webs and local food transparency, transit, psychogeography, geo games, paper maps, and place hacking.

Since 2007, over thirty WhereCamps have been independently organized in fifteen cities across four continents.

## Planning a WhereCamp?

That's awesome! We'd love to see it on [wherecamp.org](http://wherecamp.org)!

### How to add your event (the easy way)

The easiest way to get your event listed is to [open an issue](https://github.com/reidab/wherecamp.org/issues) with your event information.

However, since this is GitHub, we encourage you to add the event yourself following the instructions below. It gives you more control over how your event should appear and is *clearly* more fun. :grinning:

And so, we present…

### How to add your event (the fun GeoJSON way)

The list of events, along with their styling, site comes from a single [GeoJSON](http://geojson.org/geojson-spec.html) file: [wherecamps.geojson](wherecamps.geojson). This makes it easy to add new events as they pop up.

1. Fork this this repository, clone your fork to your computer, and open up **index.html** in your browser. You should see the WhereCamp site with all the events listed.

2. Edit **wherecamps.geojson** and add your event information. Events are expected to be point features with various bits of useful data stored as properties.

   Below, you'll find an example entry for [WhereCampPDX 6](http://wherecamppdx.org) that uses all of the recognized options. Only three fields are truly required (**eventName**, **startDate**, and **endDate**), but your listing will turn out nicer if you fill in the rest. Feel free to omit any you don't need, like venueExtendedAddress.

   The last three items control how your event will be styled on the WhereCamp site:

   * **color** is a hex color used to theme your event listing and as your marker color on the past events map
   * **mapTiles** describes a tileset to use when showing your event's location on its upcoming event map. This can be any of the [Stamen](http://maps.stamen.org) tilesets ("toner", "terrain", "watercolor", or their variants), any map ID on [MapBox](http://www.mapbox.com/) (like "wherecamppdx.map-ehuwy6kj" or the URL to some [TileJSON](http://www.mapbox.com/developers/tilejson/)), or a [tile URL temlate](http://leafletjs.com/reference.html#tilelayer) for [Leaflet](http://leafletjs.com).
   * **mapZoom** is the numeric zoom level to be used when initially displaying your upcoming event map

   The example:
   <code><pre>
     {
      "type": "Feature",
      "properties": {
        "eventName": "WhereCampPDX 6",
        "url": "http://wherecamppdx.org",
        "startDate": "2013-09-27",
        "endDate": "2013-09-29",
        "venueName": "Metro Regional Center",
        "venueStreetAddress": "600 NE Grand Ave",
        "venueExtendedAddress": "Main Floor",
        "venueLocality": "Portland",
        "venueRegion": "Oregon",
        "venuePostalCode": "97232",
        "venueCountry": "USA",
        "color": "#6544b2",
        "mapTiles": "toner",
        "mapZoom": 13
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.6602292060852,
          45.52727616343882
        ]
      }
    },
   </pre></code>

3. Reload the page in your browser and see how things look. Tweak and repeat until awesome.

   If all the events vanish, you've probably got a syntax error in your JSON. Try running it through [JSONLint](http://jsonlint.com/) to see what's wrong. (It's probably an errant comma.)

4. Push the code back to your fork on GitHub and submit a pull request. We'll review it shortly, merge it in, and probably give you commit access so you can add future events directly. Win!

## Colophon

* Background pattern is Cartographer by Sam Feyaerts via http://subtlepatterns.com/cartographer/
* Site title set in Kelly Slab by Denis Masharov via http://www.google.com/fonts/specimen/Kelly+Slab
* Favicon from FatCow's Farm-Fresh Web Icons: http://www.fatcow.com/free-icons

